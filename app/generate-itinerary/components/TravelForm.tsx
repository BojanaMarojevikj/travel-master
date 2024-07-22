"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import { Country, ItineraryDay } from '../../models';
import Select from 'react-select';
import ExampleCards from './ExampleCards';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import airplaneTravelImage from '../../../public/assets/airplane-travel.jpg'
import Image from "next/image";
import GeneratedItineraryCards from './GeneratedItineraryCards';
import '../styles/effects.css';


export default function TravelForm() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [minEndDate, setMinEndDate] = useState<Dayjs | undefined>(undefined);
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [fetchingItinerary, setFetchingItinerary] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate || !selectedCountry || !selectedCity) {
      setFormError('Please fill out all fields.');
      return;
    }

    setFetchingItinerary(true);

    const requestBody = {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `I am planning a vacation from ${startDate.format('MM/DD/YYYY')} to ${endDate.format('MM/DD/YYYY')} in ${selectedCity}, ${selectedCountry}. 
          Please generate a travel itinerary with activities and suggestions for each day. The returned string should represent a list of unnamed objects like: [{}, {}, {}]. 
          Each object should contain: {activities:[activity1, activity2, activity3], temperature, date}. Do not add any additional text or whitespaces.`
        }
      ]
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer {api-key}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      const responseContent = data.choices[0].message.content;
      console.log(responseContent)

      const itineraryData: ItineraryDay[] = JSON.parse(responseContent);
      console.log(itineraryData)
      setItinerary(itineraryData);

    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setFetchingItinerary(false);
    }

  };

  useEffect(() => {
    setFormError(null);
  }, [startDate, endDate, selectedCountry, selectedCity]);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const sortedCountries = data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country: selectedCountry }),
          });
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            setCities(data.data);
          } else {
            setCities([]);
            setShowModal(true);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (startDate) {
      setMinEndDate(startDate);
    } else {
      setMinEndDate(undefined);
    }
  }, [startDate]);

  const shortcuts = [
    { label: 'Today', getValue: () => dayjs() },
    { label: 'Tomorrow', getValue: () => dayjs().add(1, 'day') },
    { label: 'Next Weekend', getValue: () => dayjs().day(6).add(7, 'day') },
    { label: 'Christmas', getValue: () => dayjs().month(11).date(25) },
    { label: 'New Year', getValue: () => dayjs().month(0).date(1).add(1, 'year') }
  ];

  return (
    <div className="pt-4 lg:pt-10">
      <h2 className="text-center text-[32px] leading-[40px] font-medium text-[#172026] lg:text-[64px] lg:leading-[72px]">
        Enter Your Travel Information
      </h2>
      <form className="rounded px-8 pt-6" onSubmit={handleSubmit}>
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline"> {formError}</span>
          </div>
        )}
        <div className="flex flex-row gap-4 mb-4">
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  format="MM/DD/YYYY"
                  value={startDate}
                  onChange={(newValue: Dayjs | null) => setStartDate(newValue ? newValue.startOf('day') : null)}
                  className="custom-date-picker"
                  slotProps={
                    {
                      textField: {
                        className: "custom-date-picker",
                        size: "small",
                      },
                      calendarHeader : {
                        className: "custom-date-picker",
                      },
                      shortcuts: {
                        className: "custom-date-picker",
                        items: shortcuts,
                      },
                      monthButton : {
                        sx : {
                          fontFamily: '__Poppins_7ef1e4'
                        }
                      },
                      day : {
                        sx : {
                          fontFamily: '__Poppins_7ef1e4'
                        }
                      },
                      yearButton : {
                        sx : {
                          fontFamily: '__Poppins_7ef1e4'
                        }
                      }
                    }
                  }
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  format="MM/DD/YYYY"
                  value={endDate}
                  onChange={(newValue: Dayjs | null) => setEndDate(newValue ? newValue.startOf('day') : null)}
                  minDate={minEndDate}
                  className="custom-date-picker"
                  slotProps={
                    {
                      textField: {
                        className: "custom-date-picker",
                        size: "small",
                      },
                      calendarHeader : {
                        className: "custom-date-picker",
                      },
                      shortcuts: {
                        className: "custom-date-picker",
                        items: shortcuts
                      },
                      monthButton : {
                        sx : {
                          fontFamily: '__Poppins_7ef1e4'
                        }
                      },
                      day : {
                        sx : {
                          fontFamily: '__Poppins_7ef1e4'
                        }
                      },
                      yearButton : {
                        sx : {
                          fontFamily: '__Poppins_7ef1e4'
                        }
                      }
                    }
                  }
                />
              </Stack>
            </LocalizationProvider>
          </div>

          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <Select
              options={countries.map(country => ({ value: country.name.common, label: country.name.common }))}
              onChange={(option) => setSelectedCountry(option?.value || null)}
              isClearable
              placeholder="Select Country"
              className="w-full"
            />
          </div>

          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <Select
              options={cities.map(city => ({ value: city, label: city }))}
              onChange={(option) => setSelectedCity(option?.value || null)}
              isClearable
              placeholder="Select City"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Itinerary
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 w-full h-full absolute"></div>
          <div className="bg-white p-6 rounded shadow-lg z-10 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">No Cities Found</h2>
            <p>Sorry, no cities were found for the selected country.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div>
        <div>
          <Image src={airplaneTravelImage} alt="Airplane" className={`opacity-60 ${fetchingItinerary ? 'fade-animation' : ''}`} />
        </div>
        <div className="relative z-10 mt-[-100px]">
          {fetchingItinerary ? (
            <div className="mb-40">
              <h3 className="text-center text-[24px] leading-[30px] font-medium text-[#172026] lg:text-[32px] lg:leading-[40px]">
                Generating Itinerary...
              </h3>
            </div>
          ) : (
            itinerary ? (
              <GeneratedItineraryCards itinerary={itinerary} destination={`${selectedCity}, ${selectedCountry}`} />
            ) : (
              <ExampleCards />
            )
          )}
        </div>
      </div>
    </div>
  );
}

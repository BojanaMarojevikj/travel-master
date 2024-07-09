"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Country } from '../../model/models';
import Select from 'react-select';
import ExampleCards from './ExampleCards';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import airplaneTravelImage from '../../../public/assets/airplane-travel.jpg'
import Image from "next/image";



export default function TravelForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [minEndDate, setMinEndDate] = useState<Dayjs | undefined>(undefined);
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate || !selectedCountry || !selectedCity) {
      setFormError('Please fill out all fields.');
      return;
    }

    router.push(`/itinerary?startDate=${startDate?.format('YYYY-MM-DD')}&endDate=${endDate?.format('YYYY-MM-DD')}`);
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
                  slotProps={
                    {
                      layout: {
                        sx: {}
                      },
                      textField: {
                        size: "small",
                        sx: {
                          '& label': { color: '#ABABAB', fontFamily: '__Poppins_7ef1e4' },
                          '& label.Mui-focused': { color: '#DBEAFE', fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiInput-underline:after': { borderBottomColor: '0.5px solid #E8E8E8', fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: '0.5px solid #E8E8E8', boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.06)', fontFamily: '__Poppins_7ef1e4' },
                            '&:hover fieldset': { border: '0.5px solid #E8E8E8', fontFamily: '__Poppins_7ef1e4' },
                            '&.Mui-focused fieldset': { border: '2px solid #2684FF', fontFamily: '__Poppins_7ef1e4' },
                          },
                          '& .MuiInputBase-input': { fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiButtonBase-root': { fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiInputBase-root': { fontFamily: '__Poppins_7ef1e4' },
                          '% .MuiPickersCalendarHeader-label': { fontFamily: '__Poppins_7ef1e4' },
                          width: '100%',
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
                  slotProps={
                    {
                      layout: {
                        sx: {

                        }
                      },
                      textField: {
                        size: "small",
                        sx: {
                          '& label': { color: '#ABABAB', fontFamily: '__Poppins_7ef1e4' },
                          '& label.Mui-focused': { color: '#4DCCD6', fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiInput-underline:after': { borderBottomColor: '0.5px solid #E8E8E8', fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: '0.5px solid #E8E8E8', boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.06)', fontFamily: '__Poppins_7ef1e4' },
                            '&:hover fieldset': { border: '0.5px solid #E8E8E8', fontFamily: '__Poppins_7ef1e4' },
                            '&.Mui-focused fieldset': { border: '2px solid #2684FF', fontFamily: '__Poppins_7ef1e4' },
                          },
                          '& .MuiInputBase-input': { fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiButtonBase-root': { fontFamily: '__Poppins_7ef1e4' },
                          '& .MuiInputBase-root': { fontFamily: '__Poppins_7ef1e4' },
                          width: '100%',
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
        <Image src={airplaneTravelImage} alt="Airplane"/>
    </div>

    <div className="relative z-10">
        <ExampleCards />
    </div>
    </div>
  );
}

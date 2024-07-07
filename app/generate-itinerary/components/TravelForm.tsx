"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import {Country} from '../../model/models'
import Select from 'react-select';
import ExampleCards from './ExampleCards';


export default function TravelForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]); 
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/itinerary?startDate=${startDate}&endDate=${endDate}`);
  };

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

  return (
    <div className="pt-4 lg:pt-10">
      <h2 className="text-center text-[32px] leading-[40px] font-medium text-[#172026] lg:text-[64px] lg:leading-[72px]">
        Enter Your Travel Information
      </h2>
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4 mb-4">
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
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

        <div className="flex items-center justify-center">
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

      <ExampleCards/>
    </div>
  );
}
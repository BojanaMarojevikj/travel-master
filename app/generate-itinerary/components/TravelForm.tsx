"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function TravelForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/itinerary?startDate=${startDate}&endDate=${endDate}&destination=${destination}`);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const sortedCountries = data.sort((a: { name: { common: string; }; }, b: { name: { common: any; }; }) => a.name.common.localeCompare(b.name.common));
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
          setCities(data.data); 
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
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
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
    </div>
  );
}

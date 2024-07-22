import React from 'react';
import { ItineraryDay } from '../../models';
import { WbSunny, Cloud, AcUnit, LocationOn, DateRange, PictureAsPdf } from '@mui/icons-material'; 
import dayjs from 'dayjs';
import '../styles/effects.css';

interface GeneratedItineraryCardsProps {
  itinerary: ItineraryDay[];
  destination: string;
}

const GeneratedItineraryCards: React.FC<GeneratedItineraryCardsProps> = ({ itinerary, destination }) => {
  const getTemperatureIcon = (temperature: string) => {
    const numericTemperature = parseInt(temperature);
    if (numericTemperature >= 20) {
      return <WbSunny />; 
    } else if (numericTemperature < 20 && numericTemperature > 10) {
      return <Cloud />;
    } else {
      return <AcUnit />; 
    }
  };

  const formatDate = (date: string) => {
    return dayjs(date).format('MMMM D, YYYY');
  };

  return (
    <div className="fade-in">
      <h3 className="text-center text-[24px] leading-[30px] font-medium text-[#172026] lg:text-[32px] lg:leading-[40px]">
        Your Generated Itinerary
      </h3>
      <div className="flex items-center justify-center mt-6 mb-6 space-x-4">
        <div className="flex items-center">
          <LocationOn fontSize="large" />
          <p className="text-lg ml-2">{destination}</p>
        </div>
        <div className="flex items-center">
          <DateRange fontSize="large" />
          <p className="text-lg ml-2">
            {formatDate(itinerary[0].date)} - {formatDate(itinerary[itinerary.length - 1].date)}
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center"
        >
          <PictureAsPdf className="mr-2" />
          Download as PDF
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {itinerary.map((itineraryItem, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-blue-500 shadow-md ">
            <h4 className="text-lg font-semibold mb-2">Day {index + 1} - {formatDate(itineraryItem.date)}</h4>
            <p className="flex items-center mb-2">
              {getTemperatureIcon(itineraryItem.temperature)}
              <span className="ml-2">Temperature: {itineraryItem.temperature}</span>
            </p>
            <ul className="list-disc pl-5">
              {itineraryItem.activities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedItineraryCards;

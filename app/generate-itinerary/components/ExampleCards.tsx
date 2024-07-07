import React from 'react';
import { Itinerary } from '../../model/models';

const ExampleCards: React.FC = () => {
  const exampleItineraries: Itinerary[] = [
    {
      day: 1,
      activities: ['Visit the Eiffel Tower', 'Lunch at a Parisian café', 'Evening Seine River Cruise'],
      temperature: '25°C',
    },
    {
      day: 2,
      activities: ['Louvre Museum tour', 'Walk through the Tuileries Garden', 'Dinner in Montmartre'],
      temperature: '22°C',
    },
    {
        day: 3,
        activities: ['Visit the Eiffel Tower', 'Lunch at a Parisian café', 'Evening Seine River Cruise'],
        temperature: '25°C',
      },
  ];

  return (
    <div className="pt-8">
      <h3 className="text-center text-[24px] leading-[30px] font-medium text-[#172026] lg:text-[32px] lg:leading-[40px]">
        Example Itinerary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-6">
        {exampleItineraries.map((itinerary, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">Day {itinerary.day}</h4>
            <p className="mb-2">Temperature: {itinerary.temperature}</p>
            <ul className="list-disc pl-5">
              {itinerary.activities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleCards;

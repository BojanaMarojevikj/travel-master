# Travel Master

## Overview

Travel Master is a web application designed to help users plan their vacations by generating detailed itineraries based on selected destinations and dates. Users can choose a country and city, set travel dates, and receive a daily itinerary with suggested activities.

## Features

- **Location Selection:** Users can select their travel destination by choosing from a list of countries and cities.
- **Itinerary Generation:** Personalized travel itineraries are created using the OpenAI API, providing tailored daily plans based on user input.
- **Form Handling:** Robust form validation and error handling ensure a smooth user experience.
- **Responsive Design:** The app is designed to be mobile-friendly and visually appealing across various devices.

## Technologies Used

- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static types.
- **MUI (Material-UI)**: React components library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **OpenAI API**: Used for generating personalized travel itineraries.
- **REST Countries API**: Fetches a comprehensive list of countries.
- **CountriesNow API**: Provides city data for selected countries.

## Usage

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). In order for the itinerary generator to work you need to insert your own OpenAI API key in `app/generate-itinerary/TravelForm.tsx`.
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

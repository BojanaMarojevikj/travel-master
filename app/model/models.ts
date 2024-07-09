export interface Country {
    name: {
      common: string;
    };
}

export interface Itinerary {
    day: number;
    activities: string[];
    temperature: string; 
    destination: string;
    dates: string;
}
"use client"
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  
  const handleTryNowClick = () => {
    router.push('/generate-itinerary');
  };

  return (
    <div className="pt-4 lg:pt-10">
      <div className="px-[20px] lg:px-[280px]">
        <h1 className="text-center text-[32px] leading-[40px] font-medium text-[#172026] lg:text-[64px] lg:leading-[72px]">
          Travel Master
        </h1>
        <p className="text-center pt-6 text-[#36485C] lg:text-[18px] lg:leading-7">
          Welcome to our travel itinerary generator! Plan your dream vacation effortlessly by simply entering your departure and arrival dates, along with your desired location. Our innovative service powered by OpenAI creates personalized itineraries that include must-visit attractions, delicious dining options, and real-time weather updates. Whether you're exploring new destinations or revisiting favorites, let us help you make the most of your travel experience. Get started now and embark on unforgettable adventures!
        </p>

        <div className="flex w-full pt-8 justify-center gap-x-6">
          <button
            className="bg-[#4328EB] hover:bg-blue-400 w-1/2 py-4 px-8 text-white rounded-[4px] lg:w-fit focus:shadow-outline"
            onClick={handleTryNowClick}
          >
            Try it now
          </button>
        </div>
      </div>

    </div>
  );
}

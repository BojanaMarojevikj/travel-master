"use client";
import { useRouter } from "next/navigation";
import React from "react";
import ReactTypingEffect from 'react-typing-effect';

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
        <div className="text-center pt-6 text-[#36485C] lg:text-[18px] lg:leading-7">
          <ReactTypingEffect
            text={[
              "Welcome to our travel itinerary generator! Get started now and embark on unforgettable adventures!"
            ]}
            speed={50}
            eraseSpeed={0}
            typingDelay={200}
            eraseDelay={1000000}
            cursor={"|"}
            displayTextRenderer={(text, i) => {
              return (
                <p>
                  {text.split('').map((char, index) => {
                    return (
                      <span key={index}>{char}</span>
                    );
                  })}
                </p>
              );
            }}
          />
        </div>

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

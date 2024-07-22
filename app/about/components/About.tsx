"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Logo from "../../../public/assets/full-logo.png"
import CityImage from "../../../public/assets/city.png";
import BeachImage from "../../../public/assets/beach.png";
import MountainImage from "../../../public/assets/mountain.png";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../styles/swiper-custom.css"
import React from "react";

export function About() {
  const router = useRouter();

  const handleTryNowClick = () => {
    router.push('/generate-itinerary');
  };

  return (
    <div className="pt-4 lg:pt-10">
      <div className="px-[20px] lg:px-[280px]">
        <div className="relative h-[10vh] w-auto mx-auto">
          <Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
        </div>
        <p className="text-center pt-6 text-[#36485C] lg:text-[18px] lg:leading-7">
          Plan your dream vacation effortlessly by simply entering your departure and arrival dates, along with your desired location. Our innovative service powered by OpenAI creates personalized itineraries that include must-visit attractions, delicious dining options, and real-time weather updates. Whether you're exploring new destinations or revisiting favorites, let us help you make the most of your travel experience. Get started now and embark on unforgettable adventures!
        </p>

        <div className="flex w-full pt-8 justify-center gap-x-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-1/2 py-4 px-8 text-white rounded-[4px] lg:w-fit focus:shadow-outline mb-4"
            onClick={handleTryNowClick}
          >
            Try it now
          </button>
        </div>
      </div>

      <div className="relative flex justify-center mb-10 h-[40vh] w-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full lg:w-[60%] h-full"
        >
          <SwiperSlide>
            <div className="w-full h-full rounded-xl">
              <Image
                src={CityImage}
                alt="City Image"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full rounded-xl">
              <Image
                src={BeachImage}
                alt="Beach Image"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full rounded-xl">
              <Image
                src={MountainImage}
                alt="Mountain Image"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  );
}

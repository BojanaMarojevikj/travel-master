"use client"
import React from "react";
import { Faq } from "./components/Faq";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;

      setScrollY(scrollTop);
      setMaxScroll(documentHeight - windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollPercentage = (scrollY / maxScroll) * 100;

  return (
    <>
      <Navbar />
      <Hero />
      <div className="px-[20px] lg:container lg:px-20 mx-auto relative">
        <Features />
        <Faq />
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#DBEAFE] z-20">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>
      </div>
      <Footer />

      <div
        className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-10"
        style={{
          height: '30vh',
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${scrollY / 500}), rgba(255,255,255,0))`,
          zIndex: 5, 
        }}
      />
    </>
  );
}

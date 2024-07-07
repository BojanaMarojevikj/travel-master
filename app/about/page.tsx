"use client"
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { About } from "./components/About";
import { useEffect, useState } from "react";

export default function Page() {
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
      <About />
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

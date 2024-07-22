"use client"
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import Menu from "../../public/assets/Menu.svg";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Generate Itinerary", path: "/generate-itinerary" }
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex bg-blue-100 justify-center items-center">
      <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:px-20 bg-blue-100">
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" className="h-[4vh] w-auto" />
          <div className="hidden lg:flex pl-[56px] gap-x-[56px]">
            {navLinks.map((item, index) => (
              <Link href={item.path} key={index} className="text-[#36485C] font-medium hover:text-blue-500">
                <p className="hover:shadow-none hover:border-b-5 hover:border-blue-500 hover:font-semibold">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-x-5">
          <Link href="/register" className="hidden lg:block font-medium text-[#36485C] pr-[56px] hover:text-blue-500">
            <p className="hover:shadow-none hover:border-b-5 hover:border-blue-500 hover:font-semibold">Register</p>
          </Link>

          <div className="flex items-center gap-x-2">
            <Link href="/sign-in" className="hidden font-medium text-[#36485C] lg:block hover:text-blue-500">
              <p className="hover:shadow-none hover:border-b-5 hover:border-blue-500 hover:font-semibold">Sign In</p>
            </Link>
          </div>

          <div className="lg:hidden relative">
            <button onClick={toggleMenu}>
              <Image src={Menu} alt="Menu Button" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
                {navLinks.map((item, index) => (
                  <Link href={item.path} key={index} className="block px-4 py-2 text-[#36485C] hover:bg-blue-500 hover:text-white">
                    {item.name}
                  </Link>
                ))}
                <Link href="/register" className="block px-4 py-2 text-[#36485C] hover:bg-blue-500 hover:text-white">
                  Register
                </Link>
                <Link href="/sign-in" className="block px-4 py-2 text-[#36485C] hover:bg-blue-500 hover:text-white">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

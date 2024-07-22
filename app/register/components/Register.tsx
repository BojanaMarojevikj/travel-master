"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "../../../public/assets/full-logo.png";
import "../styles/auth-styles.css";

export function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    console.log('Register:', formData);
  };

  return (
    <div className="pt-4 lg:pt-10">
      <div className="px-[20px] lg:px-[280px]">
        <div className="relative h-[10vh] w-auto mx-auto">
          <Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
        </div>
        <div className="text-center">
          <h2 className="text-[#36485C] lg:text-[24px] lg:leading-7">Register</h2>
        </div>
        <form className="pt-6 space-y-4 flex flex-col items-center">
          <div className="w-full max-w-md">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full max-w-md">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 py-4 px-4 text-white rounded-[4px] focus:shadow-outline mt-4"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

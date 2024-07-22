"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "../../../public/assets/full-logo.png";
import "../styles/auth-styles.css";

export function SignIn() {
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
    <div className="pt-4 lg:pt-10 mb-20">
      <div className="px-[20px] lg:px-[280px]">
        <div className="relative h-[10vh] w-auto mx-auto">
          <Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
        </div>
        <div className="text-center">
          <h2 className="text-[#36485C] lg:text-[24px] lg:leading-7">Sign In</h2>
        </div>
        <form className="pt-6 space-y-4 flex flex-col items-center">
          <div className="w-full max-w-md">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

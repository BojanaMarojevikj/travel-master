"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../styles/auth-styles.css";

export function SignIn() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
  
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSignIn = () => {
      console.log('Sign In:', formData);
    };
  
    return (
      <div className="pt-4 lg:pt-10">
        <div className="px-[20px] lg:px-[280px]">
          <div className="text-center">
            <h2 className="text-[#36485C] lg:text-[24px] lg:leading-7">Sign In</h2>
          </div>
          <form className="pt-6 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 w-full py-4 text-white rounded-[4px] focus:shadow-outline"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
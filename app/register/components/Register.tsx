"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "../../../public/assets/full-logo.png";
import "../styles/auth-styles.css";

export function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    middleName: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    numbers: false,
    specialChars: false
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    const lengthValid = password.length >= 8;
    const numbersValid = /[0-9]/.test(password);
    const specialCharsValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValidations({
      length: lengthValid,
      numbers: numbersValid,
      specialChars: specialCharsValid
    });
  };

  const validateForm = () => {
    const { name, surname, email, password, repeatPassword } = formData;
    if (!name || !surname || !email || !password || !repeatPassword) {
      return 'Please fill in all fields.';
    }
    if (password !== repeatPassword) {
      return 'Passwords do not match.';
    }
    if (!passwordValidations.length || !passwordValidations.numbers || !passwordValidations.specialChars) {
      return 'Please ensure your password meets all the requirements.';
    }
    return '';
  };

  const handleRegister = () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('Registration successful! Redirecting to sign-in page...');
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000); 
    }
  };

  return (
    <div className="pt-4 lg:pt-10 mb-20">
      <div className="px-[20px] lg:px-[280px]">
        <div className="relative h-[10vh] w-auto mx-auto">
          <Image src={Logo} alt="Logo" layout="fill" objectFit="contain" />
        </div>
        <div className="text-center">
          <h2 className="text-[#36485C] lg:text-[24px] lg:leading-7">Register</h2>
        </div>
        <form className="pt-6 space-y-4 flex flex-col items-center">
          <div className="w-full max-w-md">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name"
              className="input-field w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name (Optional)</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              className="input-field w-full"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Last Name"
              className="input-field w-full"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
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
              id="password"
              name="password"
              placeholder="Password"
              className="input-field w-full"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="mt-2 space-y-1">
              <div className={`flex items-center ${passwordValidations.length ? 'text-green-500' : 'text-red-500'}`}>
                {passwordValidations.length ? '✔️' : '❌'} At least 8 characters
              </div>
              <div className={`flex items-center ${passwordValidations.numbers ? 'text-green-500' : 'text-red-500'}`}>
                {passwordValidations.numbers ? '✔️' : '❌'} Includes numbers
              </div>
              <div className={`flex items-center ${passwordValidations.specialChars ? 'text-green-500' : 'text-red-500'}`}>
                {passwordValidations.specialChars ? '✔️' : '❌'} Includes special characters
              </div>
            </div>
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat Password"
              className="input-field w-full"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
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

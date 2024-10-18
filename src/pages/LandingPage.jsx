import React from 'react'
import logo from "../assets/logo.png";
import landing from "../assets/landing.png";
import { NavLink } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
    {/* Status Bar */}
    {/* <div className="flex justify-between items-center px-5 py-2 bg-white">
      <span className="text-black text-sm font-medium">9:41</span>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-black rounded-sm"></div>
        <div className="w-4 h-4 bg-black rounded-sm"></div>
        <div className="w-4 h-4 bg-black rounded-sm"></div>
      </div>
    </div> */}

    {/* Main Content */}
    <div className="flex-1 flex flex-col items-center justify-between px-6 pt-8 pb-12">
      {/* Logo */}
      <div className="flex items-center my-3">
        <img className='w-8' src={logo} alt="logo" />
        <span className="text-[#DE5BA7] font-semibold">Safe Haven</span>
      </div>

      {/* Illustration */}
      <img src={landing} alt="Diverse group of people" className="w-full max-w-xs" />

      {/* App Name and Description */}
      <div className="text-center space-y-4">
        <h1 className="text-custom-pink text-3xl font-bold">Safe Haven</h1>
        <p className="text-gray-600 text-sm">
          Your safe space to report and combat gender-based violence in Kaduna State.
        </p>
      </div>

      {/* Get Started Button */}
      <NavLink to="/register" className="w-full block bg-custom-blue text-white py-3 rounded-full font-medium text-center  hover:bg-blue-800">
        Get Started
      </NavLink>
    </div>
  </div>
  )
}

export default LandingPage

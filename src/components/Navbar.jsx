import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For redirecting after logout
import { auth } from "../../firebase"; // Import the Firebase auth object
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/login"); // Redirect to the login page or landing page
    } catch (error) {
      console.error("Error logging out: ", error); // Log any errors if they occur
    }
  };


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* <svg className="h-8 w-8 text-custom-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#DE5BA7"/>
            </svg> */}
            <img width={40} src={logo} alt="safe haven logo" />
            <span className="text-xl font-bold text-custom-pink">Safe Haven</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-custom-blue hover:text-custom-dark-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-custom-blue"
            >
              <span className="sr-only">Toggle main menu</span>
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                  aria-hidden="true" 
                />
                <X 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                  }`} 
                  aria-hidden="true" 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-custom-blue text-white' 
                  : 'text-custom-blue hover:text-custom-dark-blue hover:bg-gray-100'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/report" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-custom-blue text-white' 
                  : 'text-custom-blue hover:text-custom-dark-blue hover:bg-gray-100'
              }`
            }
          >
            Report
          </NavLink>
          <NavLink 
            to="/meditate" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-custom-blue text-white' 
                  : 'text-custom-blue hover:text-custom-dark-blue hover:bg-gray-100'
              }`
            }
          >
           Meditate
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-custom-blue text-white' 
                  : 'text-custom-blue hover:text-custom-dark-blue hover:bg-gray-100'
              }`
            }
          >
            About
          </NavLink>
          <button 
            onClick={handleLogout} 
            className="block px-3 py-2 rounded-md text-base font-medium text-custom-blue hover:text-custom-dark-blue hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
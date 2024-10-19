import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../../firebase"; // Import Firestore
import { getDoc, doc } from "firebase/firestore"; // Firestore methods
import logo from "../assets/logo.png";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (passcode.length !== 4 || !/^\d+$/.test(passcode)) {
      setError("Passcode must be 4 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      // Retrieve the Firestore document for this username
      const querySnapshot = await getDoc(doc(db, 'users', username));

      if (!querySnapshot.exists()) {
        setError("No account found with this username");
        setLoading(false);
        return;
      }

      const userData = querySnapshot.data();
      
      // Compare passcodes
      if (userData.passcode !== passcode) {
        setError("Incorrect passcode");
        setLoading(false);
        return;
      }

      // Sign in anonymously and navigate to the home page
     // await signInAnonymously(auth);
      console.log("Logged in with username:", username);
      setLoading(false);
      navigate("/home");
     

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col py-5 mt-10 min-h-screen bg-white justify-center">
      <div className="flex-1 flex flex-col px-6 pt-8 pb-12">
        <div className="flex items-center justify-center mb-8">
          <img
            src={logo}
            alt="Safe Haven Logo"
            width={80}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-custom-pink font-semibold">Safe Haven</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Login to Safe Haven</h1>
        <p className="text-gray-600 text-sm mb-8">
          Your identity is protected. You can remain anonymous while using the
          platform.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter your anonymous username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition duration-200 bg-white"
              placeholder="Enter anonymous username"
            />
          </div>

          <div>
            <label
              htmlFor="passcode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter your 4-digit passcode
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              maxLength={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition duration-200 bg-white"
              placeholder="Enter your 4-digit passcode"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-custom-blue text-white py-3 rounded-full font-medium hover:bg-custom-dark-blue transition duration-200"
          >
          {loading? "Logging In......":" Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-custom-pink font-medium hover:underline transition duration-200"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase"; // Import Firestore
import { setDoc, doc, query, collection, where, getDocs } from "firebase/firestore"; // Firestore methods
import logo from "../assets/logo.png";
const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');
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
    if (passcode !== confirmPasscode) {
      setError("Passcodes do not match");
      return false;
    }
    return true;
  };

  const checkUsernameExists = async (username) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Returns true if the username exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); 

    if (!validateForm()) return;

    try {
      // 1. Check if the username already exists in the database
      const usernameTaken = await checkUsernameExists(username);
      if (usernameTaken) {
        setError('Username is already taken. Please try another one.');
        setLoading(false); 
        return;
      }

      // 2. Sign in anonymously
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // 3. Update the user's profile with the username
      await updateProfile(user, {
        displayName: username, // Use displayName for the username
      });

      // 4. Store the username and passcode in Firestore associated with the user's uid
      await setDoc(doc(db, 'users', username), {
        userId:user.uid,
        username,
        passcode,
      });

      console.log('Account created', { username, passcode, user });
      setLoading(false); 
      navigate("/home");
    } catch (error) {
      setError(error.message);
      setLoading(false); 
    }
  };


  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
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
        
        <h1 className="text-2xl font-bold text-center mb-2">Create an account</h1>
        <p className="text-center text-gray-600 mb-6">
          You can create an anonymous profile for better access to resources and reports. No personal information required
        </p>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Enter an anonymous username
            </label>
            <input
            
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue bg-white"
              placeholder="This can be anything, no email or phone number required"
            />
          </div>
          
          <div>
            <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-1">
              Create a 4-digit passcode
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              maxLength={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue bg-white"
              placeholder="Enter your 4-digit passcode"
            />
          </div>
          
          <div>
            <label htmlFor="confirm-passcode" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm passcode
            </label>
            <input
              type="password"
              id="confirm-passcode"
              value={confirmPasscode}
              onChange={(e) => setConfirmPasscode(e.target.value)}
              maxLength={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue bg-white"
              placeholder="Confirm your 4-digit passcode"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-custom-blue py-3 rounded-full font-medium hover:bg-custom-dark-blue transition duration-200 text-white"
          >
           {loading? "Creating..":" Create account"}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an anonymous account? <NavLink to="/login" className="text-custom-pink font-medium hover:underline transition duration-200">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
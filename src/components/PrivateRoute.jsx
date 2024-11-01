import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import SplashScreen from './SplashScreen'; // Import the SplashScreen

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // Loading state for splash screen
  const [user, setUser] = useState(null); // Store the user state
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if logged in
      setLoading(false); // Stop loading once we have the auth state
    });

    return () => unsubscribe();
  }, []);
  const handleSplashFinish = () => {
    setShowSplash(false);
  };


  if (loading) {
    return  <SplashScreen  />; // Show splash screen while checking auth
  }

  return user || localStorage.getItem("username") ? children : <Navigate to="/" />; // If authenticated, show the protected route, otherwise redirect to login
};

export default PrivateRoute;

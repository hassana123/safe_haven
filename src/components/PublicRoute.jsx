import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import SplashScreen from './SplashScreen';// Import the SplashScreen

const PublicRoute = ({ children }) => {
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
    return <SplashScreen  />;; // Show splash screen while checking auth
  }

  return !user ? children : <Navigate to="/home" />; // If not logged in, render the route, otherwise redirect to home
};

export default PublicRoute;

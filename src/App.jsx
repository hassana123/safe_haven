import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { auth } from "../firebase"; // Firebase auth import
import { onAuthStateChanged } from "firebase/auth"; // To listen for auth state changes
import SplashScreen from "./components/SplashScreen";
function App({router}) {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null); // To store the logged-in user



  useEffect(() => {
    // Set up an auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
      
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <React.StrictMode>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <RouterProvider router={router} />
      )}
    </React.StrictMode>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Pause, Play, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Meditate = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [breatheText, setBreatheText] = useState('Breathe in');

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (isActive) {
      const breatheInterval = setInterval(() => {
        setBreatheText((text) => (text === 'Breathe in' ? 'Breathe out' : 'Breathe in'));
      }, 4000); // Switch every 4 seconds
      return () => clearInterval(breatheInterval);
    }
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const stopAndReset = () => {
    setIsActive(false);
    setTime(300);
    setBreatheText('Breathe in');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 mt-10 px-4 py-5">
        <div className="items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl text-center font-semibold">Meditate</h1>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-6xl font-bold">{formatTime(time)}</div>
          
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-purple-200 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute inset-4 bg-purple-300 rounded-full opacity-50 animate-pulse animation-delay-200"></div>
            <div className="absolute inset-8 bg-purple-400 rounded-full opacity-50 animate-pulse animation-delay-400"></div>
          </div>

          <div className="text-2xl font-medium text-gray-600">{breatheText}</div>

          <div className="flex space-x-4">
            <button
              onClick={toggleTimer}
              className="flex-1 bg-custom-blue text-white py-3 px-6 rounded-full font-medium hover:bg-custom-dark-blue transition duration-300 flex items-center justify-center"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={stopAndReset}
              className="bg-gray-200 text-gray-800 py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditate;
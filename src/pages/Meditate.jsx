import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Pause, Play, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
i

const Meditate = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [breatheText, setBreatheText] = useState('Breathe in');
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  
  const backgroundAudioRef = useRef(null);
  const breatheInAudioRef = useRef(null);
  const breatheOutAudioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      stopAudio();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    let breatheInterval = null;
    if (isActive) {
      breatheInterval = setInterval(() => {
        setBreatheText((text) => {
          const newText = text === 'Breathe in' ? 'Breathe out' : 'Breathe in';
          setIsBreathingIn(newText === 'Breathe in');
          return newText;
        });
      }, 4000); // Switch every 4 seconds
    }
    return () => clearInterval(breatheInterval);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      playBackgroundAudio();
    } else {
      pauseBackgroundAudio();
    }
  };

  const stopAndReset = () => {
    setIsActive(false);
    setTime(300);
    setBreatheText('Breathe in');
    setIsBreathingIn(true);
    stopAudio();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const playBackgroundAudio = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.play();
    }
  };

  const pauseBackgroundAudio = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
    }
  };

  const stopAudio = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
     
      
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
            <div 
              className={`absolute inset-0 bg-purple-200 rounded-full opacity-50 transition-all duration-4000 ease-in-out ${
                isActive ? (isBreathingIn ? 'scale-100' : 'scale-75') : ''
              }`}
            ></div>
            <div 
              className={`absolute inset-4 bg-purple-300 rounded-full opacity-50 transition-all duration-4000 ease-in-out ${
                isActive ? (isBreathingIn ? 'scale-100' : 'scale-75') : ''
              }`}
            ></div>
            <div 
              className={`absolute inset-8 bg-purple-400 rounded-full opacity-50 transition-all duration-4000 ease-in-out ${
                isActive ? (isBreathingIn ? 'scale-100' : 'scale-75') : ''
              }`}
            ></div>
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

      {/* Audio elements */}
      <audio ref={backgroundAudioRef} loop>
        <source src="../src/assets/medi.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={breatheInAudioRef}>
        <source src="/audio/breathe-in.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={breatheOutAudioRef}>
        <source src="/audio/breathe-out.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Meditate;
import React,{useState, useEffect} from 'react'
import logo from "../assets/logo.png"
const SplashScreen = ({onFinish}) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 1800);
  
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 3000);
  
      return () => {
        clearTimeout(timer);
        clearTimeout(finishTimer);
      };
    }, [onFinish]);
  
    return (
      <div className={`fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-200 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-60 h-24">
          <img src={logo} alt="App Logo" className="w-full h-full object-contain" />
        </div>
      </div>
    );
}

export default SplashScreen

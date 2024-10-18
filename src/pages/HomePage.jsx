import React from "react";
import Greeting from "../components/Greeting";
import TrueStory from "../components/TrueStory";
import ActionGrid from "../components/ActionGrid";
import Navbar from "../components/Navbar";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
     <Navbar/>
      <Greeting />
      <TrueStory />
      <ActionGrid />
      {/* Bottom navigation bar placeholder */}
      {/* <div className=" w-[70%] h-5 mt-10 mx-auto rounded-lg bg-gray-500"></div> */}
    </div>
  );
};

export default HomePage;

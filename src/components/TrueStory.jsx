import React from "react";

const TrueStory = () => {
  return (
    <div className="bg-custom-blue text-white rounded-lg p-2 mx-3 mb-6">
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
        <h2 className="text-lg font-semibold">True Stories</h2>
        <span className="ml-auto text-sm">27th September, 2024</span>
      </div>
      <p className="mb-4 text-sm">
        It started with small things, like harsh words and silent treatments,
        but over time, it became much worse. I never thought it could happen to
        me, until the day I realized I was no longer in control of my own
        life....
      </p>
      <button className="bg-white text-custom-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition duration-200">
        Read My Story
      </button>
    </div>
  );
};

export default TrueStory;

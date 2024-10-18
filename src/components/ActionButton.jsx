import React from 'react';

const ActionButton = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="text-custom-blue mb-3">{icon}</div>
      <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
    </button>
  );
};

export default ActionButton;
import React from 'react';

const StorySuccessModal = ({ setCurrentView }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-green-600">Success!</h2>
          <button onClick={() => setCurrentView('list')} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="mb-6 text-gray-700">
          Your story has been submitted successfully! Thank you for sharing your experience.
        </p>
        <button
          onClick={() => setCurrentView('list')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Continue to homepage
        </button>
      </div>
    </div>
  );
};

export default StorySuccessModal;

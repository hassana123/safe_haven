import React from 'react';

const NavigationButtons = ({ step, isLoading, onPrev, onNext }) => (
  <div className="flex justify-between">
    {step > 1 && (
      <button
        type="button"
        onClick={onPrev}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        Previous
      </button>
    )}
    {step < 2 ? (
      <button
        type="button"
        onClick={onNext}
        className="px-4 py-2 text-sm font-medium text-white bg-custom-blue rounded-md hover:bg-custom-blue-dark"
      >
        Next
      </button>
    ) : (
      ""
    )}
  </div>
);

export default NavigationButtons;
import React from 'react';
import { X } from 'lucide-react';

export const SuccessModal = ({ setCurrentView }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Successful!</h2>
          <button onClick={() => setCurrentView('list')}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="mb-6 text-gray-700">
  Your journal entry has been submitted successfully! Thank you for expressing your thoughts and taking this step in your journey. If you'd like to share more or need assistance, our support team is here to help.
</p>

        <button
          onClick={() => setCurrentView('list')}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Continue to Journal
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X } from 'lucide-react';

const SendReportToActivist = ({loading, onClose, onSubmit }) => {
  const [selectedActivist, setSelectedActivist] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedActivist);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Send Report to Activist</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Choose an activist to send your report to.
        </p>
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            Note: After your report has been filed, your case will be reviewed and we will get back to you as soon as possible.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="activist" className="block text-sm font-medium text-gray-700 mb-1">
              Select an activist
            </label>
            <select
              id="activist"
              value={selectedActivist}
              onChange={(e) => setSelectedActivist(e.target.value)}
              className="w-full px-3 py-2 bg-white  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select an activist</option>
              <option value="foundation_gender_rights">Foundation of Gender rights</option>
              <option value="womens_rights_org">Women's Rights Organization</option>
              <option value="equality_now">Equality Now</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading? (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          '  Send Report'
        )}
          
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendReportToActivist;
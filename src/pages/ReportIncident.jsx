import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ReportIncident = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted:', { location, dateTime, details });
    // Navigate back or to a confirmation page
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Status Bar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex-1 px-4 py-5 mt-10">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-custom-blue" />
          </button>
          <h1 className="text-xl font-semibold">Report an Incident</h1>
        </div>

        <p className="text-gray-600 mb-6">
          Please provide details about the incident. Your report is completely anonymous.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Where did the incident happen?
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue focus:border-custom-blue bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 mb-1">
              When did it occur?
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue focus:border-custom-blue bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              What happened?
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Write in details what happened..."
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue focus:border-custom-blue bg-white"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-custom-blue text-white py-3 rounded-full font-medium hover:bg-custom-dark-blue transition duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSOSContacts from '../hooks/useSOSContacts';
import { CheckCircle, X, ArrowLeft } from 'lucide-react';
import FormField from '../components/FormField';

const SOSForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [remember, setRemember] = useState(false);
  const [customMessage, setCustomMessage] = useState(''); // New state for custom SOS message
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [conts, setCont] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addContact, loading } = useSOSContacts();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(number);
  };

  const formatNigerianNumber = (number) => {
    // Check if the number starts with "0" and has 11 digits (valid Nigerian number)
    if (/^0\d{10}$/.test(number)) {
      return `+234${number.slice(1)}`; // Replace the first "0" with "+234"
    }
    return number; // Return the number as is if it doesn't meet the criteria
  };

  const handleSubmit = async () => {
    console.log("Clicked");

    if (!name.trim()) {
      setError('Please enter a contact name');
      return;
    }

    // Format the number if it's a valid Nigerian number
    const formattedNumber = formatNigerianNumber(number);

    if (!validatePhoneNumber(formattedNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    const contactData = { name, number: formattedNumber, customMessage }; // Include formatted number
    const success = await addContact(contactData);

    if (success) {
      if (!remember) {
        setName('');
        setNumber('');
        setCustomMessage('');
      }
      setShowSuccessModal(true);
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    if (conts) {
      setShowSuccessModal(false);
      setName('');
      setNumber('');
      setCustomMessage('');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6 text-custom-blue" />
        </button>
        <button onClick={() => navigate('/home')} className="text-custom-blue">
          SKIP
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Emergency SOS</h1>
      <p className="text-gray-600 mb-6">Please provide the contact details of someone you trust.</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={(e) => {
        e.preventDefault();
        setCont(false);
        handleSubmit();
      }} className="space-y-8">
        <FormField
          label="Contact Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contact Name"
        />

        <FormField
          label="Contact Number"
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Valid phone number (e.g., 08060618637)"
        />

        {/* New FormField for Custom SOS Message */}
        <FormField
          label="Custom SOS Message (Optional)"
          type="textarea"
          name="customMessage"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Write your custom emergency message here..."
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 text-custom-blue focus:ring-custom-blue border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember this contact for future emergencies
          </label>
        </div>
        
        <div className='space-y-8'>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setCont(true);
              handleSubmit();
            }}
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-custom-blue bg-custom-blue bg-opacity-10 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save and add another contact to SOS'}
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Complete'}
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-end">
              <button onClick={() => setShowSuccessModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your Emergency contact has been successfully added to your SOS.
              </p>
              <button
                onClick={handleContinue}
                className="w-full py-2 px-4 bg-custom-blue text-white rounded-md hover:bg-custom-blue-dark transition duration-200"
              >
                {conts ? "Continue..." : "Continue to homepage"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSForm;

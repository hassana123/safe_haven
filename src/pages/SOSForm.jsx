import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSOSContacts from '../hooks/useSOSContacts';
import { CheckCircle, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
const SOSForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [remember, setRemember] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [conts,setCont]= useState(false)
  const navigate = useNavigate();
  const { addContact } = useSOSContacts();

  const handleSubmit = ()  => {
    if (name && number) {
      addContact({ name, number });
      if (!remember) {
        setName('');
        setNumber('');
      }
      setShowSuccessModal(true);
     
    }
  };

 
  const handleContinue = () => {
    setShowSuccessModal(false);
    if (conts === true) {
        setShowSuccessModal(false)
        setName('');
        setNumber('');
    }
    else{
        navigate('/home');
    }
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 relative">
      <div className="flex justify-between items-center mb-6">
      <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-custom-blue" />
          </button>
        <button onClick={() => navigate('/dashboard')} className="text-custom-blue">
          SKIP
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Emergency SOS</h1>
      <p className="text-gray-600 mb-6">Please provide the contact details of someone you trust.</p>
      
      <form onSubmit={(e)=>{
        e.preventDefault();
        setCont(false)
        handleSubmit()
      }} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md"
            placeholder="This can be anything, no email or phone number required"
            required
          />
        </div>
        
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md"
            placeholder="Valid phone Number"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 text-custom-blue  focus:ring-custom-blue border-gray-300 rounded "
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember this contact for future emergencies
          </label>
        </div>
        
      <div className='space-y-8'>
      <button
          type="button"
          onClick={(e)=>{
            e.preventDefault();
        setCont(true)
        handleSubmit()
          }}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-custom-blue bg-custom-blue bg-opacity-10 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
        >
          Save and add another contact to SOS
        </button>
        
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
        >
          Complete
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
                Your Emergency contacts have been successfully added to your SOS.
              </p>
              <button
                onClick={handleContinue}
                className="w-full py-2 px-4 bg-custom-blue text-white rounded-md hover:bg-custom-blue-dark transition duration-200"
              >
               {conts===true?" Continue..":" Continue to homepage"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSForm;
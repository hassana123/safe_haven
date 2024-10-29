import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, MoreVertical } from 'lucide-react';
import useSOSContacts from '../hooks/useSOSContacts';

const SOSContact = ({ contact, onSendAlert, onCall }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center">
      <div className="bg-gray-200 rounded-full p-2 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div>
        <p className="font-medium">{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.number}</p>
      </div>
    </div>
    <div className="flex space-x-2">
      <button onClick={onSendAlert} className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
        Send Alert
      </button>
      <button onClick={onCall} className="p-2 bg-green-100 text-green-600 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </button>
    </div>
  </div>
);

const SOSList = () => {
  const navigate = useNavigate();
  const { contacts } = useSOSContacts();
  const [filter, setFilter] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    if (filter === 'recent') return contact.recent;
    if (filter === 'favorites') return contact.favorite;
    return true;
  });

  const handleSendAlert = (contact) => {
    // Implement send alert functionality
    console.log('Sending alert to', contact);
  };

  const handleCall = (contact) => {
    // Implement call functionality
    console.log('Calling', contact);
  };
 

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">SOS Contacts</h1>
        <div className="flex space-x-2">
          <button className="p-2">
            <Search className="h-6 w-6" />
          </button>
          <button onClick={() => navigate('/sos-form')} className="p-2">
            <Plus className="h-6 w-6" />
          </button>
          <button className="p-2">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-custom-blue text-white' : 'bg-gray-100'}`}
        >
          All Contacts
        </button>
        <button
          onClick={() => setFilter('recent')}
          className={`px-4 py-2 rounded-full ${filter === 'recent' ? 'bg-custom-blue text-white' : 'bg-gray-100'}`}
        >
          Recent
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={`px-4 py-2 rounded-full ${filter === 'favorites' ? 'bg-custom-blue text-white' : 'bg-gray-100'}`}
        >
          Favorites
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <SOSContact
            key={index}
            contact={contact}
            onSendAlert={() => handleSendAlert(contact)}
            onCall={() => handleCall(contact)}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/sos-form')}
        className="fixed bottom-4 right-4 bg-custom-blue text-white p-4 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SOSList;
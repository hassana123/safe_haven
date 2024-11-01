import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, MoreVertical, Phone, AlertTriangle } from 'lucide-react';
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
      <button 
        onClick={onSendAlert} 
        className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm flex items-center"
      >
        <AlertTriangle className="w-4 h-4 mr-1" />
        Send Alert
      </button>
      <button 
        onClick={onCall} 
        className="p-2 bg-green-100 text-green-600 rounded-full"
      >
        <Phone className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const SOSList = () => {
  const navigate = useNavigate();
  const { contacts, loading, error, toggleFavorite } = useSOSContacts();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [sendingAlert, setSendingAlert] = useState(false);

  const filteredContacts = contacts
    .filter(contact => {
      if (searchTerm) {
        return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               contact.number.includes(searchTerm);
      }
      if (filter === 'all') return true;
      if (filter === 'recent') return contact.recent;
      if (filter === 'favorites') return contact.favorite;
      return true;
    });

    const handleSendAlert = async (contact) => {
      console.log(contact);
      
      try {
        setSendingAlert(true);
        const response = await fetch('https://safe-haven-backend.vercel.app//incoming-messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            text: contact.customMessage|| 'Emergency! Please assist immediately.',
            from: contact.number
            , // Replace this with the sender's number or your app's identifier
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to send alert');
        }
  
        console.log('Alert sent successfully to:', contact);
        alert(`Alert sent to ${contact.name}`);
      } catch (error) {
        console.error('Error sending alert:', error);
        alert('Failed to send alert. Please try again.');
      } finally {
        setSendingAlert(false);
      }
    };
  
    const handleCall = (contact) => {
      window.location.href = `tel:${contact.number}`;
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
          <button onClick={() => 

 navigate('/sos-form')} className="p-2">
            <Plus className="h-6 w-6" />
          </button>
          <button className="p-2">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

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

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-blue"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No contacts found. Add your first emergency contact.
            </div>
          ) : (
            filteredContacts.map((contact, index) => (
              <SOSContact
                key={`${contact.name}-${contact.number}-${index}`}
                contact={contact}
                onSendAlert={() => handleSendAlert(contact)}
                onCall={() => handleCall(contact)}
              />
            ))
          )}
        </div>
      )}

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
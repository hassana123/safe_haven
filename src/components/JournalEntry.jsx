import React, { useState } from 'react';
import { ChevronLeft, Edit3 } from 'lucide-react';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import FormField from '../components/FormField';

export const JournalEntry = ({ setCurrentView }) => {
  const [journalEntry, setJournalEntry] = useState({ title: '', content: '', date: new Date().toLocaleDateString() });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournalEntry((prev) => ({ ...prev, [name]: value }));

    // Remove validation error as user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (journalEntry.title.trim() === '') {
      errors.title = 'Title is required.';
    }
    if (journalEntry.content.trim() === '') {
      errors.content = 'Content is required.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  console.log(username);
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

   

    if (!userId && !username) {
      alert('User not found. Please login again.');
      return;
    }

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', username); // Referencing the user's document by username
      await updateDoc(userDocRef, {
        journalEntries: arrayUnion(journalEntry),
      });
      setLoading(false);
      setCurrentView('success');
    } catch (error) {
      console.error('Error adding journal entry:', error);
      setLoading(false);
      alert('Failed to add journal entry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 ">
      <header className="flex items-center mb-4">
        <button onClick={() => setCurrentView('list')} className="mr-2">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">MyJournal</h1>
      </header>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <FormField
            label="Title"
            type="text"
            name="title"
            value={journalEntry.title}
            onChange={handleChange}
            placeholder="Title"
          />
          {validationErrors.title && <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>}
          <Edit3 className="w-5 h-5 text-gray-600" />
        </div>
        <p className="text-sm text-gray-500 mb-4">{journalEntry.date}</p>
        <FormField
          label="Content"
          type="textarea"
          name="content"
          value={journalEntry.content}
          onChange={handleChange}
          placeholder="Write something..."
        />
        {validationErrors.content && <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>}
        <button
          onClick={handleSubmit}
          className={`mt-4 w-full py-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;

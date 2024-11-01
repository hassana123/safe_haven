import React, { useState, useEffect } from 'react';
import { PlusCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const JournalList = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      const username = localStorage.getItem('username');

      if (!username) {
        console.error('User not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', username);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          // Sort journal entries by date in descending order
          const sortedEntries = (data.journalEntries || []).sort((a, b) => new Date(b.date) - new Date(a.date));
          setJournalEntries(sortedEntries);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">MyJournal</h1>
      </header>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">All</h2>
        <button onClick={() => setCurrentView('entry')} className="p-2 rounded-full bg-purple-500 text-white">
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {journalEntries.length > 0 ? (
            journalEntries.map((entry, index) => (
              <div key={index} className="flex items-center space-x-6 border-b border-gray-200 py-2">
                <div className="flex-none text-purple-500 text-3xl font-semibold">
                  {new Date(entry.date).getDate().toString().padStart(2, '0')}
                </div>
                <div className="ml-4">
                  <h3 className="text-md font-medium">{entry.title}</h3>
                  <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  <p className="text-sm text-gray-500">{entry.content.substring(0, 30)}...</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No journal entries found. Start by adding a new entry.</p>
          )}
        </div>
      )}
    </div>
  );
};

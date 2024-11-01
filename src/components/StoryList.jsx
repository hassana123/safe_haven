import React, { useEffect, useState } from 'react';
import { PlusCircle, ChevronLeft } from 'lucide-react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const StoryList = ({ setCurrentView }) => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const userDocRef = doc(db, 'users', username);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setStories(userDoc.data().stories || []);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    if (username) {
      fetchStories();
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">My Stories</h1>
      </header>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">All</h2>
        <button onClick={() => setCurrentView('entry')} className="p-2 rounded-full bg-purple-500 text-white">
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        {stories.length > 0 ? (
          stories.map((story, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <h3 className="text-md font-medium">{story.title}</h3>
              <p className="text-sm text-gray-600">{story.date}</p>
              <p className="text-sm text-gray-500 truncate">{story.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No stories found. Start by adding one!</p>
        )}
      </div>
    </div>
  );
};

export default StoryList;

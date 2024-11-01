import React, { useState } from 'react';
import { ChevronLeft, Edit3, BookOpen } from 'lucide-react';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, setDoc, collection  } from 'firebase/firestore';
import FormField from '../components/FormField';

const StoryEntryForm = ({ setCurrentView }) => {
  const [storyEntry, setStoryEntry] = useState({ title: '', content: '', date: new Date().toLocaleDateString() });
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePublic = () => {
    setIsPublic((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (storyEntry.title.trim() === '' || storyEntry.content.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    if (!userId && !username) {
      alert('User not found. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', username);
      // Add the story to the user's document
      await updateDoc(userDocRef, {
        stories: arrayUnion({ ...storyEntry, isPublic }),
      });

      // If the user chooses to share the story publicly, add it to the 'trueStories' collection
      if (isPublic) {
        const publicStory = {
          ...storyEntry,
          username,
          userId,
          isPublic: true,
        };
        const trueStoriesRef = collection(db, 'trueStories');
        await setDoc(doc(trueStoriesRef), publicStory);
      }

      setLoading(false);
      setCurrentView('success');
    } catch (error) {
      console.error('Error submitting story:', error);
      setLoading(false);
      alert('Failed to submit your story. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 my-10">
      <header className="flex items-center mb-4 justify-between">
       <div className='flex'>
       <button onClick={() => setCurrentView('list')} className="mr-2">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">Share Your Story</h1>
       </div>
        <BookOpen onClick={()=> setCurrentView("list")}/ >
      </header>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <FormField
            label="Title"
            type="text"
            name="title"
            value={storyEntry.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <Edit3 className="w-5 h-5 text-gray-600" />
        </div>
        <p className="text-sm text-gray-500 mb-4">{storyEntry.date}</p>
        <FormField
          label="Content"
          type="textarea"
          name="content"
          value={storyEntry.content}
          onChange={handleChange}
          placeholder="Tell us your story here..."
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="publicToggle"
            checked={isPublic}
            onChange={handleTogglePublic}
            className="mr-2"
          />
          <label htmlFor="publicToggle" className="text-sm text-gray-700">Share this story with the public</label>
        </div>
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

export default StoryEntryForm;

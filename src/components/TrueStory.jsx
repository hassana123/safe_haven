import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const TrueStory = () => {
  const [latestStory, setLatestStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestStory = async () => {
      try {
        const trueStoriesRef = collection(db, 'trueStories');
        const q = query(trueStoriesRef, orderBy('date', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const storyData = querySnapshot.docs[0].data();
          // Convert the date to a readable format
          if (storyData.date) {
            const date = new Date(storyData.date);
            storyData.formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(date);
          }
          setLatestStory(storyData);
        }
      } catch (error) {
        console.error('Error fetching the latest story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestStory();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!latestStory) {
    return <div className="text-center p-4">No stories available yet.</div>;
  }

  return (
    <div className="bg-custom-blue text-white rounded-lg p-2 mx-3 mb-6">
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
        <h2 className="text-lg font-semibold">True Stories</h2>
        <span className="ml-auto text-sm">{latestStory.formattedDate}</span>
      </div>
      <p className="mb-4 text-sm">
        {latestStory.content.length > 150
          ? `${latestStory.content.slice(0, 150)}...`
          : latestStory.content}
      </p>
      <button className="bg-white text-custom-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition duration-200">
        Read My Story
      </button>
    </div>
  );
};

export default TrueStory;

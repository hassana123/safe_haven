import React, { useState } from 'react';
import StoryEntryForm from '../components/StoryEntry';
import StorySuccessModal from '../components/StorySuccesModal';
import StoryList from '../components/StoryList';

const StoryPage = () => {
  const [currentView, setCurrentView] = useState('list');

  return (
    <div>
      {currentView === 'list' && <StoryList setCurrentView={setCurrentView} />}
      {currentView === 'entry' && <StoryEntryForm setCurrentView={setCurrentView} />}
      {currentView === 'success' && <>
        <StoryList setCurrentView={setCurrentView} />
        <StorySuccessModal setCurrentView={setCurrentView} />
      </>}
    
    </div>
  );
};

export default StoryPage;

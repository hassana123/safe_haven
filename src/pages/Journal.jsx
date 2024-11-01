import React, { useState } from 'react';
import { JournalList } from '../components/JournalList';
import { JournalEntry } from '../components/JournalEntry';
import { SuccessModal } from '../components/SuccessModal';

const JournalPage = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'entry', or 'success'

  return (
    <section className='my-10'>
      {currentView === 'list' && <JournalList setCurrentView={setCurrentView} />}
      {currentView === 'entry' && <JournalEntry  setCurrentView={setCurrentView} />}
      {currentView === 'success' && <>
        <JournalList setCurrentView={setCurrentView} /><SuccessModal setCurrentView={setCurrentView} />
      </>}
    </section>
  );
};

export default JournalPage;

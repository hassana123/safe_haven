import React from 'react';
import ActionButton from './ActionButton';
import { FileText, Brain, Share2, BookOpen, Users, Lock } from 'lucide-react';

const ActionGrid = () => {
  const actions = [
    { icon: <FileText className="w-8 h-8" />, label: 'Report an Incident' , link:"/report"},
    { icon: <Brain className="w-8 h-8" />, label: 'Self-Therapy', link:"/self-therapy"},
    { icon: <Share2 className="w-8 h-8" />, label: 'Share Your Story', link:"/share-story"},
    { icon: <BookOpen className="w-8 h-8" />, label: 'Support & Education', link:"/support"},
    { icon: <Users className="w-8 h-8" />, label: 'Consult an Activist or Therapist' , link:""},
    { icon: <Lock className="w-8 h-8" />, label: 'Share Your Story Anonymously',link:"" },
  ];

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6 mx-4 my-8">
      <h2 className="text-2xl font-bold text-custom-dark-blue mb-6 text-center">How can we help?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <ActionButton key={index} icon={action.icon} label={action.label}  link={action.link}/>
        ))}
      </div>
    </div>
  );
};

export default ActionGrid;
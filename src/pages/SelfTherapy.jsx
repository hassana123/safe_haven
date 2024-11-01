// SelfTherapy.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import medi from "../assets/medi.png"
import love from "../assets/love.png"
import crea from "../assets/crea.png"
import { Heart, SunDim, Music2, ChevronLeft, ArrowLeftIcon } from 'lucide-react';

const therapyOptions = [
  {
    id: 1,
    title: 'Affirmations & Positive Self-Talk',
    description: 'Empower yourself with uplifting affirmations and positive self-talk to strengthen your mind and spirit.',
    path: '/self-therapy/affirmations',
    backgroundColor: 'bg-pink-50',
    imgSrc:love,
  },
  {
    id: 2,
    title: 'Meditation & Breathing Exercises',
    description: 'Calm your mind and regain control with breathing exercises designed to ease stress and support healing.',
    path: '/self-therapy/meditation',
    backgroundColor: 'bg-green-50',
    imgSrc: medi,
  },
  {
    id: 3,
    title: 'Creative Expression',
    description: 'Express your feelings freely through art, writing, and creativity as a step toward healing and self-discovery.',
    path: '/self-therapy/creative-expression',
    backgroundColor: 'bg-orange-50',
    imgSrc: crea,
  }
];

const SelfTherapy = () => {
    const navigate= useNavigate()
  return (
    <div className="min-h-screen bg-white p-4">
        <header className="flex items-center space-x-2 my-10">
        <button
          onClick={() => navigate(-1)}
          className=" hover:bg-gray-100 rounded-full"
          aria-label="Go back"
        >
          <ArrowLeftIcon  />
        </button>
        <h1 className="text-2xl font-semibold  ">Self Therapy</h1>
      </header>
     
      <div className="space-y-4">
        {therapyOptions.map((option) => (
          <NavLink key={option.id} to={option.path} className={`block p-4 rounded-lg shadow-sm ${option.backgroundColor}`}>
            <div className="flex items-center gap-4">
              <img src={option.imgSrc} alt={option.title} className="w-16 h-16 rounded-lg" />
              <div>
                <h2 className="text-lg font-bold">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SelfTherapy;

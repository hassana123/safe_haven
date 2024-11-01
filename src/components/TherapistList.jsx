import React from 'react';
import { Mail, Phone } from 'lucide-react';

const therapists = [
  {
    id: 1,
    name: 'James Jones',
    availability: 'Available 9am–6pm',
    image: 'https://via.placeholder.com/150', // Replace with actual image URLs
  },
  {
    id: 2,
    name: 'Hope Moses',
    availability: 'Available 7am–4pm',
    image: 'https://via.placeholder.com/150', // Replace with actual image URLs
  },
  {
    id: 3,
    name: 'Jane Smith',
    availability: 'Available 9am–6pm',
    image: 'https://via.placeholder.com/150', // Replace with actual image URLs
  },
];

const TherapistList = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="flex justify-center mb-6">
        <button className="px-4 py-2 text-gray-600 border-b-2 border-transparent hover:border-gray-400">
          Activists
        </button>
        <button className="px-4 py-2 font-semibold border-b-2 border-black">
          Therapists
        </button>
      </div>
      
      <div className="space-y-4">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm"
          >
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{therapist.name}</h2>
              <p className="text-sm text-gray-500">{therapist.availability}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-red-500">
                <Mail className="w-5 h-5" />
              </button>
              <button className="text-green-500">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistList;

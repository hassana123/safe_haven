import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ReportLayout = ({ title, onBack, children }) => (
  <div className="flex flex-col min-h-screen bg-white p-4">
    <div className="flex items-center mb-6">
      <button onClick={onBack} className="mr-4">
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    {children}
  </div>
);

export default ReportLayout;
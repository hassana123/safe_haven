import { useState } from 'react';

export const useFormData = () => {
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    description: '',
    attachments: [],
    responseMethod: '',
    anonymityPreference: '',
    consentToShare: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevData => ({
      ...prevData,
      attachments: [...prevData.attachments, ...files]
    }));
  };

  return { formData, setFormData, handleInputChange, handleFileUpload };
};
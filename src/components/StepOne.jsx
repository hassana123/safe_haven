import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import { Search } from 'lucide-react';

const LOCATIONIQ_API_KEY = 'pk.4c9cd87815d4243140d4d74887a89ba8'; // Replace with your actual API key

const StepOne = ({ formData, handleInputChange }) => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShowOtherInput(formData.category === 'other');
  }, [formData.category]);

  const fetchLocationSuggestions = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
          query
        )}+Kaduna&limit=5&countrycodes=ng&dedupe=1`
      );
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      return data.map((item) => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = async (e) => {
    const { value } = e.target;
    handleInputChange(e);

    if (value.length > 2) {
      const suggestions = await fetchLocationSuggestions(value);
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleInputChange({
      target: { name: 'location', value: suggestion.name },
    });
    handleInputChange({
      target: { name: 'latitude', value: suggestion.lat },
    });
    handleInputChange({
      target: { name: 'longitude', value: suggestion.lon },
    });
    setLocationSuggestions([]);
  };

  return (
    <section className='space-y-5'>
      <FormField
        label="Select Incident Category"
        name="category"
        type="select"
        value={formData.category}
        onChange={handleInputChange}
        options={[
          { value: "", label: "Select category" },
          { value: "physical_abuse", label: "Physical Abuse" },
          { value: "emotional_abuse", label: "Emotional Abuse" },
          { value: "sexual_harassment", label: "Sexual Harassment/Assault" },
          { value: "financial_abuse", label: "Financial Abuse" },
          { value: "other", label: "Others (Specify)" },
        ]}
      />

      {showOtherInput && (
        <FormField
          label="Specify Other Category"
          name="otherCategory"
          type="text"
          value={formData.otherCategory || ''}
          onChange={handleInputChange}
          placeholder="Please specify the incident category"
        />
      )}

      <div className="relative mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location of Incident
        </label>
        <div className="relative">
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            placeholder="Start typing to search for locations in Kaduna"
            className="w-full px-3 py-2 border bg-white  border-gray-300 rounded-md pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        {isLoading && (
          <p className="text-sm text-gray-500 mt-1">Loading suggestions...</p>
        )}
        {locationSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
            {locationSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <FormField
        label="Describe What Happened"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Please provide details about the incident. You can share as much or as little as you are comfortable with."
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Do You Need Immediate Help?</p>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="needsImmediateHelp"
              value="yes"
              checked={formData.needsImmediateHelp === 'yes'}
              onChange={handleInputChange}
              className="form-radio text-custom-blue"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="needsImmediateHelp"
              value="no"
              checked={formData.needsImmediateHelp === 'no'}
              onChange={handleInputChange}
              className="form-radio text-custom-blue"
            />
            <span>No</span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
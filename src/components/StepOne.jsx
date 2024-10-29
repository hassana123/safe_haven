import React from 'react';
import FormField from './FormField';

const StepOne = ({ formData, handleInputChange }) => (
  <>
    <FormField
      label="Select Incident Category"
      name="category"
      type="select"
      value={formData.category}
      onChange={handleInputChange}
      options={[
        { value: "", label: "Select category" },
        { value: "physical_abuse", label: "Physical Abuse" },
        { value: "sexual_abuse", label: "Sexual Abuse" },
        { value: "emotional_abuse", label: "Emotional Abuse" },
        { value: "other", label: "Other" },
      ]}
    />
    <FormField
      label="Location of Incident"
      name="location"
      type="text"
      value={formData.location}
      onChange={handleInputChange}
      placeholder="Street/City/State"
    />
    <FormField
      label="Describe What Happened"
      name="description"
      type="textarea"
      value={formData.description}
      onChange={handleInputChange}
      placeholder="Please provide details about the incident. You can share as much or as little as you are comfortable with."
    />
  </>
);

export default StepOne;
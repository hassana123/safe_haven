import React from 'react';
import FileUpload from './FileUpload';
import FormField from './FormField';

const StepTwo = ({ isLoading,formData, handleInputChange, handleFileUpload }) => {
  const onFileUpload = (event) => {
    const files = Array.from(event.target.files);
    handleFileUpload(files);
  };

  return (
    <>
      <FileUpload handleFileUpload={onFileUpload} />
      <FormField
        label="Preferred Response Method"
        name="responseMethod"
        type="select"
        value={formData.responseMethod}
        onChange={handleInputChange}
        options={[
          { value: "", label: "Select response method" },
          { value: "phone", label: "Phone" },
          { value: "email", label: "Email" },
          { value: "in_person", label: "In Person" },
        ]}
      />
      <FormField
        label="Anonymity Preference"
        name="anonymityPreference"
        type="select"
        value={formData.anonymityPreference}
        onChange={handleInputChange}
        options={[
          { value: "", label: "Select preference" },
          { value: "anonymous", label: "Remain Anonymous" },
          { value: "share_details", label: "Share My Details" },
        ]}
      />
      <FormField
        label="I consent to share this report with relevant authorities"
        name="consentToShare"
        type="checkbox"
        checked={formData.consentToShare}
        onChange={handleInputChange}
      />
    
    </>
  );
};

export default StepTwo;
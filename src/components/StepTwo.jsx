import React from 'react';
import FileUpload from './FileUpload';
import FormField from './FormField';

const StepTwo = ({ isLoading, formData, handleInputChange, handleFileUpload }) => {
  const renderContactMethodInput = () => {
    switch (formData.preferredContactMethod) {
      case 'text':
      case 'call':
        return (
          <FormField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        );
      case 'email':
        return (
          <FormField
            label="Email Address"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <FileUpload handleFileUpload={handleFileUpload} formData={formData} />
      
      <div className="space-y-4 mb-6">
        <p className="text-sm font-medium text-gray-700">Anonymity Preference</p>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="isAnonymous"
              value="anonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="form-radio text-custom-blue"
            />
            <span>I prefer to remain completely anonymous.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="isAnonymous"
              value="share"
              checked={!formData.isAnonymous}
              onChange={handleInputChange}
              className="form-radio text-custom-blue"
            />
            <span>I am comfortable sharing my personal and contact details to allow outreach outside the app.</span>
          </label>
        </div>
      </div>

      <FormField
        label="Preferred Contact Method"
        name="preferredContactMethod"
        type="select"
        value={formData.preferredContactMethod}
        onChange={handleInputChange}
        options={[
          { value: "", label: "Select preferred contact method" },
          { value: "text", label: "Text Message" },
          { value: "call", label: "Phone Call" },
          { value: "email", label: "Email" },
          { value: "none", label: "No Response Needed" },
        ]}
      />

      {renderContactMethodInput()}

      {!formData.isAnonymous && (
        <div className="space-y-4">
          <h3 className="font-medium">Personal Information</h3>
          <p className="text-sm text-gray-600">Please provide the following details to help us better assist you.</p>
          
          <FormField
            label="Your name"
            name="contactName"
            type="text"
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          
          <FormField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
          />

          <FormField
            label="Gender"
            name="gender"
            type="select"
            value={formData.gender}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select your gender" },
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "non-binary", label: "Non-binary" },
              { value: "other", label: "Other" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]}
          />

          <FormField
            label="Marital Status"
            name="maritalStatus"
            type="select"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select your marital status" },
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
              { value: "other", label: "Other" },
            ]}
          />

          <FormField
            label="Occupation"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="Enter your occupation"
          />

          <FormField
            label="Do you have any dependents?"
            name="hasDependents"
            type="select"
            value={formData.hasDependents}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select an option" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {formData.hasDependents === 'yes' && (
            <FormField
              label="Number of dependents"
              name="numberOfDependents"
              type="number"
              value={formData.numberOfDependents}
              onChange={handleInputChange}
              placeholder="Enter the number of dependents"
            />
          )}

          <FormField
            label="Have you experienced similar incidents before?"
            name="hasPriorIncidents"
            type="select"
            value={formData.hasPriorIncidents}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select an option" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {formData.hasPriorIncidents === 'yes' && (
            <FormField
              label="Brief description of prior incidents"
              name="priorIncidentsDescription"
              type="textarea"
              value={formData.priorIncidentsDescription}
              onChange={handleInputChange}
              placeholder="Please provide a brief description of prior incidents"
            />
          )}
        </div>
      )}
    </>
  );
};

export default StepTwo;
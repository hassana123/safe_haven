import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportLayout from '../components/ReportLayout';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import NavigationButtons from '../components/Navigation';
import { useFormData } from '../hooks/useFormData';
import SendReportToActivist from '../components/SendReportToActivist';
const ReportIncident = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { formData, handleInputChange, handleFileUpload, submitReport, setShowSendToActivist, validateForm, sendReportToActivist, showSendToActivist, successFinal, success,loading , validationErrors, error} = useFormData();
  //const [isLoading, setIsLoading] = useState(false);
  //const [isSuccess, setIsSuccess] = useState(false);
  //const [errorMessage, setErrorMessage] = useState('');
  console.log('ReportIncident component rendering');

  const handleNextStep = () => {
    validateForm()
    setStep(prevStep => prevStep + 1)
  }
  const handlePrevStep =  () => setStep(prevStep => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitReport();
    console.log("done");  
};
  const handleSendToActivist = async (selectedActivist) => {
   await sendReportToActivist(selectedActivist)
  // console.log(successFinal);
    console.log('Sent report to activist:', selectedActivist);
     
   
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <StepTwo isLoading={loading} formData={formData} handleInputChange={handleInputChange} handleFileUpload={handleFileUpload} />;
      default:
        return null;
    }
  };

  return (
    <ReportLayout title="Report an Incident" onBack={() => navigate(-1)}>
       {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      {validationErrors.category && <p className="text-red-500 text-sm">{validationErrors.category}</p>}


      {successFinal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Successful!</h2>
            <p className="mb-6">Your report has been filed successfully. A specialist will reach out to you soon.</p>
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue to homepage
            </button>
          </div>
        </div>
      )}

     
        <>
        <p className="text-gray-600 mb-6">
        Please provide details about the incident. Your report is completely anonymous.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderStep()}
        <NavigationButtons
          step={step}
          isLoading={loading}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
        />
        {step === 2&&(  <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-custom-blue rounded-md hover:bg-custom-blue-dark"
        disabled={loading}
      >
        {loading? (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          'Submit Report'
        )}
      </button>)}
      </form>
        </>
   
       {showSendToActivist &&  (
        <SendReportToActivist
        loading={loading}
          onClose={() => setShowSendToActivist(false)}
          onSubmit={handleSendToActivist}
        />
      )}
    </ReportLayout>
  );
};

export default ReportIncident;
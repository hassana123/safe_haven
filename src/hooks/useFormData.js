import { useState } from 'react';
import { storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, setDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export const useFormData = () => {
  const initialFormData = {
    category: '',
    otherCategory: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    needsImmediateHelp: null,
    attachments: [],
    responseMethod: '',
    isAnonymous: true,
    contactName: '',
    phoneNumber: '',
    emailAddress: '',
    preferredContactMethod: '',
    age: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    hasDependents: '',
    numberOfDependents: '',
    hasPriorIncidents: '',
    priorIncidentsDescription: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successFinal, setSuccessFinal] = useState(false);
  const [showSendToActivist, setShowSendToActivist] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  console.log(formData);

  const validateForm = () => {
    const errors = {};
    if (!formData.category) errors.category = 'Incident category is required.';
    if (formData.category === 'other' && !formData.otherCategory) {
      errors.otherCategory = 'Please specify the incident category.';
    }
    if (!formData.location) errors.location = 'Location is required.';
    if (!formData.description) errors.description = 'Description is required.';
    if (formData.needsImmediateHelp === null) {
      errors.needsImmediateHelp = 'Please indicate if you need immediate help.';
    }
    if (!formData.isAnonymous) {
      if (!formData.contactName) errors.contactName = 'Contact name is required.';
      if (formData.preferredContactMethod === 'text' || formData.preferredContactMethod === 'call') {
        if (!formData.phoneNumber) {
          errors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
          errors.phoneNumber = 'Invalid phone number format.';
        }
      }
      if (formData.preferredContactMethod === 'email') {
        if (!formData.emailAddress) {
          errors.emailAddress = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
          errors.emailAddress = 'Invalid email format.';
        }
      }
      if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
        errors.age = 'Valid age is required.';
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio' && name === 'isAnonymous') {
      setFormData(prevData => ({
        ...prevData,
        isAnonymous: value === 'anonymous'
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFileUpload = async (newFiles, currentAttachments = []) => {
    setLoading(true);
    setError(null);
    
    try {
      const uploadPromises = newFiles.map(async (file) => {
        const storageRef = ref(storage, `reports/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      setFormData(prevData => ({
        ...prevData,
        attachments: [...currentAttachments, ...uploadedUrls]
      }));
    } catch (err) {
      console.error('Error uploading files:', err);
      setError('Failed to upload files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitReport = async () => {
    if (!validateForm()) {
      setError('Please fix the highlighted errors before submitting.');
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const username = localStorage.getItem('username');
      const userId = localStorage.getItem('userId');
      if (!username) {
        throw new Error('User not authenticated');
      }
  
      const reportData = {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
  
      const userDocRef = doc(db, 'reports', username);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const existingReports = userDocSnap.data().reports || [];
  
        const isDuplicate = existingReports.some(
          report => 
            report.description === reportData.description &&
            report.location === reportData.location
        );
  
        if (!isDuplicate) {
          await updateDoc(userDocRef, {
            reports: arrayUnion(reportData)
          });
        } else {
          setError('This report is a duplicate and was not added.');
          setLoading(false);
          return;
        }
      } else {
        await setDoc(userDocRef, { reports: [reportData], username, userId });
      }
  
      setSuccess(true);
      console.log("Report saved successfully");
  
      // Schedule the showing of the 'Send to Activist' component
      setTimeout(() => {
        setShowSendToActivist(true);
      }, 1000);

      // Clear the form data
    
  
    } catch (err) {
      console.error('Error submitting report:', err);
      setSuccess(false);
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendReportToActivist = async (activistId) => {
    setLoading(true);
    setError(null);

    try {
      const reportData = {
        ...formData,
        forwardedAt: new Date().toISOString(),
        forwardedBy: localStorage.getItem('username')
      };

      // Create or reference the specific collection for the activist/organization
      const activistCollectionRef = collection(db, `activistReports/${activistId}/reports`);
      const reportDocRef = doc(activistCollectionRef, `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`);

      await setDoc(reportDocRef, reportData);

      setSuccessFinal(true);
      console.log('Report successfully forwarded to the activist.');

      // Clear form data and close the Send to Activist component after success
      setFormData(initialFormData);
      setTimeout(() => {
        setShowSendToActivist(false);
      }, 2000);
      setFormData(initialFormData);
      
    } catch (err) {
      console.error('Error forwarding report to activist:', err);
      setError('Failed to forward report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { 
    success,
    successFinal,
    loading,
    formData, 
    error, 
    validationErrors,
    showSendToActivist,
    handleInputChange,
    setShowSendToActivist,
    handleFileUpload,
    submitReport,
    sendReportToActivist,
    validateForm,
  };
};

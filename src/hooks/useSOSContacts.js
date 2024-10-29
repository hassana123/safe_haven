import { useState, useEffect } from 'react';

const useSOSContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('sosContacts') || '[]');
    setContacts(storedContacts);
  }, []);

  const addContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('sosContacts', JSON.stringify(updatedContacts));
  };

  const removeContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem('sosContacts', JSON.stringify(updatedContacts));
  };

  return { contacts, addContact, removeContact };
};

export default useSOSContacts;
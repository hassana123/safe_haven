import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';

const useSOSContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the current user's username from localStorage
  const username = localStorage.getItem('username');
  //console.log(username);
  

  // Fetch contacts on mount
  useEffect(() => {
    const fetchContacts = async () => {
      if (!username) return;
      
      try {
        setLoading(true);
        const userDoc = await getDoc(doc(db, 'users', username));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setContacts(userData.sosContacts || []);
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [username]);

  const addContact = async (newContact) => {
    if (!username) {
      setError('User not found');
      return false;
    }

    try {
      setLoading(true);
      console.log("hey");
      
      const userRef = doc(db, 'users', username);
      console.log(userRef);
      
      
      // Add timestamp to the contact
      const contactWithTimestamp = {
        ...newContact,
        createdAt: new Date().toISOString(),
        recent: true,
        favorite: false
      };

      // Add the contact to Firestore
      await updateDoc(userRef, {
        sosContacts: arrayUnion(contactWithTimestamp)
      });

      // Update local state
      setContacts(prev => [...prev, contactWithTimestamp]);
      return true;
    } catch (err) {
      console.error('Error adding contact:', err);
      setError('Failed to add contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeContact = async (contactToRemove) => {
    if (!username) {
      setError('User not found');
      return false;
    }

    try {
      setLoading(true);
      const userRef = doc(db, 'users', username);
      
      // Remove the contact from Firestore
      await updateDoc(userRef, {
        sosContacts: arrayRemove(contactToRemove)
      });

      // Update local state
      setContacts(prev => prev.filter(contact => 
        contact.name !== contactToRemove.name || 
        contact.number !== contactToRemove.number
      ));
      return true;
    } catch (err) {
      console.error('Error removing contact:', err);
      setError('Failed to remove contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (contact) => {
    if (!username) {
      setError('User not found');
      return false;
    }

    try {
      setLoading(true);
      const userRef = doc(db, 'users', username);
      
      // Remove old contact
      await updateDoc(userRef, {
        sosContacts: arrayRemove(contact)
      });

      // Add updated contact
      const updatedContact = { ...contact, favorite: !contact.favorite };
      await updateDoc(userRef, {
        sosContacts: arrayUnion(updatedContact)
      });

      // Update local state
      setContacts(prev => prev.map(c => 
        (c.name === contact.name && c.number === contact.number) 
          ? updatedContact 
          : c
      ));
      return true;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Failed to update contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    contacts, 
    loading, 
    error, 
    addContact, 
    removeContact, 
    toggleFavorite 
  };
};

export default useSOSContacts;
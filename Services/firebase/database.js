import { database } from './config';
import { ref, set, get, update, remove, onValue, off } from 'firebase/database';

// Create or update user data
export const saveUserData = async (userId, userData) => {
  try {
    await set(ref(database, `users/${userId}`), userData);
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

// Get user data once
export const getUserData = async (userId) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Update specific user data fields
export const updateUserData = async (userId, updates) => {
  try {
    await update(ref(database, `users/${userId}`), updates);
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

// Subscribe to user data changes
export const subscribeToUserData = (userId, callback) => {
  const userRef = ref(database, `users/${userId}`);
  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
  
  // Return unsubscribe function
  return () => off(userRef);
};
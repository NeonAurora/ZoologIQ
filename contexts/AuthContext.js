import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { login, getUserInfo, logout } from "@/services/AuthService";
import { getUserData, saveUserData, updateUserData } from "@/services/firebase/database";

export const AuthContext = createContext();

// Helper for cross-platform storage (keep your existing code)
const tokenStorage = {
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  getItem: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  removeItem: async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [firebaseData, setFirebaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize or get user data from Firebase
  const initializeUserData = async (authUser) => {
    if (!authUser || !authUser.sub) return null;
    
    try {
      // Get Auth0 user ID
      const userId = authUser.sub;
      
      // Check if user exists in Firebase
      let userData = await getUserData(userId);
      
      if (!userData) {
        // Create new user record if it doesn't exist
        userData = {
          email: authUser.email,
          name: authUser.name || authUser.email,
          picture: authUser.picture,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          // Add any other default user properties
        };
        await saveUserData(userId, userData);
      } else {
        // Update last login time
        await updateUserData(userId, {
          lastLogin: new Date().toISOString(),
          // Update user picture if changed
          picture: authUser.picture || userData.picture
        });
      }
      
      setFirebaseData(userData);
      return userData;
    } catch (error) {
      console.error('Error initializing user data:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check for stored token on startup
    const loadToken = async () => {
      try {
        const token = await tokenStorage.getItem('auth_token');
        if (token) {
          const userInfo = await getUserInfo(token);
          setUser(userInfo);
          
          // Initialize user data in Firebase
          await initializeUserData(userInfo);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const token = await login();
      if (token) {
        await tokenStorage.setItem('auth_token', token);
        const userInfo = await getUserInfo(token);
        setUser(userInfo);
        
        // Initialize user data in Firebase
        await initializeUserData(userInfo);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await tokenStorage.removeItem('auth_token');
      await logout();
      setUser(null);
      setFirebaseData(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Method to update user data in Firebase
  const updateUserFirebaseData = async (updates) => {
    if (!user || !user.sub) return false;
    
    try {
      const success = await updateUserData(user.sub, updates);
      if (success) {
        // Update local state
        setFirebaseData(prev => ({
          ...prev,
          ...updates
        }));
      }
      return success;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      firebaseData,
      loading, 
      signIn, 
      signOut,
      updateUserData: updateUserFirebaseData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
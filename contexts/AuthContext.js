import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { login, getUserInfo, logout } from "@/services/auth0";
import { 
  getUserData, 
  saveUserData, 
  updateUserData 
} from "@/services/supabase/database"; // Updated import

export const AuthContext = createContext();

// Helper for cross-platform storage (keep existing code)
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
  const [supabaseData, setSupabaseData] = useState(null); // Changed from firebaseData
  const [loading, setLoading] = useState(true);

  // Initialize or get user data from Supabase
  const initializeUserData = async (authUser) => {
    if (!authUser || !authUser.sub) return null;
    
    try {
      // Get Auth0 user ID
      const userId = authUser.sub;
      
      // Check if user exists in Supabase
      let userData = await getUserData(userId);
      
      if (!userData) {
        // Create new user record
        const newUserData = {
          email: authUser.email,
          name: authUser.name || authUser.email,
          picture: authUser.picture,
          role: 'user', // Default role
        };
        
        const success = await saveUserData(userId, newUserData);
        if (success) {
          userData = await getUserData(userId); // Fetch the created user
        }
      } else {
        // Update last login and picture
        await updateUserData(userId, {
          last_login: new Date().toISOString(),
          picture: authUser.picture || userData.picture
        });
        userData = await getUserData(userId); // Get updated data
      }
      
      setSupabaseData(userData);
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
          if (userInfo) {
            setUser(userInfo);
            await initializeUserData(userInfo);
          }
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
        if (userInfo) {
          setUser(userInfo);
          await initializeUserData(userInfo);
        }
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
      setSupabaseData(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Method to update user data in Supabase
  const updateUserSupabaseData = async (updates) => {
    if (!user || !user.sub) return false;
    
    try {
      const success = await updateUserData(user.sub, updates);
      if (success) {
        // Refresh local state
        const updatedData = await getUserData(user.sub);
        setSupabaseData(updatedData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      supabaseData, // Changed from firebaseData
      loading, 
      signIn, 
      signOut,
      updateUserData: updateUserSupabaseData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
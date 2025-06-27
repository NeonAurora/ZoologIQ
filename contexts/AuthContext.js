// contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { login, getUserInfo, logout } from "@/services/auth0";
import { getUserData, saveUserData } from "@/services/supabase";

export const AuthContext = createContext();

// Helper for cross-platform storage
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
  const [supabaseData, setSupabaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 SIMPLIFIED: Only check if user exists, don't auto-update
  const checkUserExists = async (authUser) => {
    if (!authUser || !authUser.sub) return null;
    
    try {
      const userId = authUser.sub;
      console.log('🔍 Checking if user exists in database:', userId);
      
      // Check if user exists in Supabase
      let userData = await getUserData(userId);
      
      if (!userData) {
        // Create minimal user record only if doesn't exist
        console.log('🆕 Creating new user record');
        const newUserData = {
          email: authUser.email,
          name: authUser.name || authUser.email,
          picture: authUser.picture,
          role: 'user',
          onboarding_completed: false // 🔥 NEW: Set to false initially
        };
        
        const success = await saveUserData(userId, newUserData);
        if (success) {
          userData = await getUserData(userId);
        }
      }
      
      setSupabaseData(userData);
      return userData;
    } catch (error) {
      console.error('Error checking user:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await tokenStorage.getItem('auth_token');
        if (token) {
          const userInfo = await getUserInfo(token);
          if (userInfo) {
            setUser(userInfo);
            await checkUserExists(userInfo);
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
          await checkUserExists(userInfo);
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

  // 🔥 NEW: Method to refresh user data (called after profile updates)
  const refreshUserData = async () => {
    if (!user?.sub) return;
    
    try {
      const updatedData = await getUserData(user.sub);
      setSupabaseData(updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      supabaseData,
      loading, 
      signIn, 
      signOut,
      refreshUserData // 🔥 NEW: Expose refresh method
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
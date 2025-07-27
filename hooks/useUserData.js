// hooks/useUserData.js
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserData, subscribeToUserData } from '@/services/supabase';

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user || !user.sub) {
      setUserData(null);
      setLoading(false);
      return;
    }
    
    const fetchAndSubscribe = async () => {
      setLoading(true);
      
      try {
        // 🔥 FIRST: Fetch existing data
        console.log('Fetching initial user data for:', user.sub);
        const initialData = await getUserData(user.sub);
        
        if (initialData) {
          console.log('Initial user data loaded:', initialData);
          setUserData(initialData);
        } else {
          console.log('No user data found in database');
          setUserData(null);
        }
        
        setLoading(false);
        
        // 🔥 THEN: Set up subscription for future changes
        const unsubscribe = subscribeToUserData(user.sub, (data) => {
          console.log('User data updated via subscription:', data);
          if (data) {
            setUserData(data);
          }
        });
        
        return unsubscribe;
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
        setLoading(false);
      }
    };
    
    const unsubscribe = fetchAndSubscribe();
    
    // Cleanup subscription
    return () => {
      if (unsubscribe && typeof unsubscribe.then === 'function') {
        unsubscribe.then(cleanup => cleanup && cleanup());
      } else if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [user]);
  
  return { userData, loading };
}
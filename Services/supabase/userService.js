import { supabase } from './config';

// ==================================
// USER DATA OPERATIONS
// ==================================

export const saveUserData = async (userId, userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({ 
        auth0_user_id: userId, 
        ...userData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error saving user:', error);
      return false;
    }
    
    console.log('User data saved successfully:', data);
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

export const getUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth0_user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Supabase error getting user:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const updateUserData = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString() 
      })
      .eq('auth0_user_id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error updating user:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

// Real-time subscription for user data changes
export const subscribeToUserData = (userId, callback) => {
  const subscription = supabase
    .channel(`user_${userId}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'users',
        filter: `auth0_user_id=eq.${userId}`
      }, 
      (payload) => {
        console.log('User data changed:', payload);
        callback(payload.new || payload.old);
      }
    )
    .subscribe();

  // Return unsubscribe function (compatible with Firebase format)
  return () => supabase.removeChannel(subscription);
};
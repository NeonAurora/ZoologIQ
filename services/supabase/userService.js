// Services/supabase/userService.js
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
    console.log('🔄 Updating user data for:', userId);
    console.log('📝 Update data:', updates);
    
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
    
    console.log('✅ User data updated successfully:', data);
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

// ==================================
// PRE-ASSESSMENT OPERATIONS
// ==================================

/**
 * Mark pre-assessment as completed for a specific topic
 * @param {string} userId - Auth0 user ID
 * @param {string} topic - Topic name (tiger, tapir, turtle)
 * @param {boolean} completed - Completion status (default: true)
 * @returns {Promise<boolean>} Success status
 */
export const updatePreAssessmentStatus = async (userId, topic, completed = true) => {
  try {
    console.log(`🎯 Marking pre-assessment ${completed ? 'completed' : 'incomplete'} for topic: ${topic}`);
    
    // First get current pre-assessment data
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('pre_assessment_completed')
      .eq('auth0_user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user pre-assessments:', fetchError);
      return false;
    }

    // Update the specific topic
    const currentData = user.pre_assessment_completed || {};
    const updatedData = {
      ...currentData,
      [topic]: completed
    };

    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        pre_assessment_completed: updatedData,
        updated_at: new Date().toISOString()
      })
      .eq('auth0_user_id', userId);

    if (updateError) {
      console.error('Error updating pre-assessment status:', updateError);
      return false;
    }

    console.log(`✅ Pre-assessment ${completed ? 'completed' : 'reset'} for topic: ${topic}`);
    return true;
  } catch (error) {
    console.error('Error in updatePreAssessmentStatus:', error);
    return false;
  }
};

/**
 * Get all pre-assessment completion status for a user
 * @param {string} userId - Auth0 user ID
 * @returns {Promise<object>} Object with completion status for each topic
 */
export const getPreAssessmentStatus = async (userId) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('pre_assessment_completed')
      .eq('auth0_user_id', userId)
      .single();

    if (error) {
      console.error('Error getting pre-assessment status:', error);
      return { tiger: false, tapir: false, turtle: false };
    }

    const defaultStatus = { tiger: false, tapir: false, turtle: false };
    return { ...defaultStatus, ...(user.pre_assessment_completed || {}) };
  } catch (error) {
    console.error('Error in getPreAssessmentStatus:', error);
    return { tiger: false, tapir: false, turtle: false };
  }
};

/**
 * Check if user has completed pre-assessment for a specific topic
 * @param {string} userId - Auth0 user ID
 * @param {string} topic - Topic name (tiger, tapir, turtle)
 * @returns {Promise<boolean>} Completion status
 */
export const hasCompletedPreAssessment = async (userId, topic) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('pre_assessment_completed')
      .eq('auth0_user_id', userId)
      .single();

    if (error) {
      console.error('Error checking pre-assessment completion:', error);
      return false;
    }

    return user.pre_assessment_completed?.[topic] === true;
  } catch (error) {
    console.error('Error in hasCompletedPreAssessment:', error);
    return false;
  }
};

/**
 * Get list of completed topics for a user
 * @param {string} userId - Auth0 user ID
 * @returns {Promise<string[]>} Array of completed topic names
 */
export const getCompletedTopics = async (userId) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('pre_assessment_completed')
      .eq('auth0_user_id', userId)
      .single();

    if (error) {
      console.error('Error getting completed topics:', error);
      return [];
    }

    const completedData = user.pre_assessment_completed || {};
    return Object.keys(completedData).filter(topic => completedData[topic] === true);
  } catch (error) {
    console.error('Error in getCompletedTopics:', error);
    return [];
  }
};

// ==================================
// POST-ASSESSMENT OPERATIONS
// ==================================

/**
 * Mark post-assessment as completed for a specific topic
 */
export const updatePostAssessmentStatus = async (userId, topic, completed = true) => {
  try {
    console.log(`🎯 Marking post-assessment ${completed ? 'completed' : 'incomplete'} for topic: ${topic}`);
    
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('post_assessment_completed')
      .eq('auth0_user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user post-assessments:', fetchError);
      return false;
    }

    const currentData = user.post_assessment_completed || {};
    const updatedData = {
      ...currentData,
      [topic]: completed
    };

    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        post_assessment_completed: updatedData,
        updated_at: new Date().toISOString()
      })
      .eq('auth0_user_id', userId);

    if (updateError) {
      console.error('Error updating post-assessment status:', updateError);
      return false;
    }

    console.log(`✅ Post-assessment ${completed ? 'completed' : 'reset'} for topic: ${topic}`);
    return true;
  } catch (error) {
    console.error('Error in updatePostAssessmentStatus:', error);
    return false;
  }
};

/**
 * Check topic accessibility based on completion sequence
 */
export const getTopicAccessibility = async (userId) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('pre_assessment_completed, post_assessment_completed')
      .eq('auth0_user_id', userId)
      .single();

    if (error) {
      console.error('Error checking topic accessibility:', error);
      return { tiger: true, tapir: false, turtle: false };
    }

    const preCompleted = user.pre_assessment_completed || {};
    const postCompleted = user.post_assessment_completed || {};

    // Tiger is always accessible
    const tigerAccessible = true;
    
    // Tapir accessible if tiger fully completed
    const tapirAccessible = preCompleted.tiger === true && postCompleted.tiger === true;
    
    // Turtle accessible if tapir fully completed
    const turtleAccessible = preCompleted.tapir === true && postCompleted.tapir === true;

    return {
      tiger: tigerAccessible,
      tapir: tapirAccessible,
      turtle: turtleAccessible
    };
  } catch (error) {
    console.error('Error in getTopicAccessibility:', error);
    return { tiger: true, tapir: false, turtle: false };
  }
};
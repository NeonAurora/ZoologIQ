import { supabase } from './config';

// ==================================
// UTILITY FUNCTIONS
// ==================================

export const getQuizStats = async (quizId) => {
  try {
    const { data, error } = await supabase
      .rpc('get_quiz_stats', { p_quiz_id: quizId });
    
    if (error) {
      console.error('Error fetching quiz stats:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching quiz stats:', error);
    return null;
  }
};

export const getUserCategoryProgress = async (userId, categoryId) => {
  try {
    const { data, error } = await supabase
      .rpc('get_user_category_progress', { 
        p_user_id: userId, 
        p_category_id: categoryId 
      });
    
    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
};

// Legacy study session functions (if still needed)
export const createStudySession = async (userId, categoryId) => {
  try {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: userId,
        category_id: categoryId,
        study_started_at: new Date().toISOString(),
        session_status: 'started'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating study session:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating study session:', error);
    return null;
  }
};

export const updateStudySession = async (sessionId, updates) => {
  try {
    const { data, error } = await supabase
      .from('study_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating study session:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating study session:', error);
    return null;
  }
};
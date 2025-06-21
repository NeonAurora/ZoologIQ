import { supabase } from './config';

// ==================================
// LEARNING SESSION OPERATIONS
// ==================================

/**
 * Create a new learning session for a topic
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID  
 * @param {string} quizId - The quiz ID to use for both pre and post
 * @returns {Promise<object>} Created session data
 */
export const createLearningSession = async (userId, categoryId, quizId) => {
  try {
    console.log('Creating learning session:', { userId, categoryId, quizId });
    
    const { data: session, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: userId,
        category_id: categoryId,
        pre_study_quiz_id: quizId,
        post_study_quiz_id: quizId, // Same quiz for pre and post
        session_status: 'started'
      })
      .select(`
        *,
        quiz_categories(name, slug),
        pre_study_quiz:quizzes!pre_study_quiz_id(id, title, difficulty)
      `)
      .single();
    
    if (error) {
      console.error('Error creating learning session:', error);
      return null;
    }
    
    console.log('Learning session created successfully:', session);
    return session;
  } catch (error) {
    console.error('Error creating learning session:', error);
    return null;
  }
};

/**
 * Get active learning session for user and topic
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID
 * @returns {Promise<object>} Active session or null
 */
export const getActiveLearningSession = async (userId, categoryId) => {
  try {
    const { data: session, error } = await supabase
      .from('study_sessions')
      .select(`
        *,
        quiz_categories(name, slug),
        pre_study_quiz:quizzes!pre_study_quiz_id(id, title, difficulty),
        post_study_quiz:quizzes!post_study_quiz_id(id, title, difficulty),
        pre_study_result:quiz_results!pre_study_result_id(id, score, completed_at),
        post_study_result:quiz_results!post_study_result_id(id, score, completed_at)
      `)
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .neq('session_status', 'post_quiz_completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error getting active session:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error getting active session:', error);
    return null;
  }
};

/**
 * Get learning session by ID
 * @param {string} sessionId - Session UUID
 * @returns {Promise<object>} Session data or null
 */
export const getLearningSession = async (sessionId) => {
  try {
    const { data: session, error } = await supabase
      .from('study_sessions')
      .select(`
        *,
        quiz_categories(name, slug),
        pre_study_quiz:quizzes!pre_study_quiz_id(id, title, difficulty),
        post_study_quiz:quizzes!post_study_quiz_id(id, title, difficulty),
        pre_study_result:quiz_results!pre_study_result_id(*),
        post_study_result:quiz_results!post_study_result_id(*)
      `)
      .eq('id', sessionId)
      .single();
    
    if (error) {
      console.error('Error getting learning session:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error getting learning session:', error);
    return null;
  }
};

/**
 * Update learning session after pre-quiz completion
 * @param {string} sessionId - Session UUID
 * @param {string} quizResultId - Quiz result ID
 * @returns {Promise<boolean>} Success status
 */
export const completePreQuiz = async (sessionId, quizResultId) => {
  try {
    console.log('Completing pre-quiz for session:', sessionId);
    
    const { data, error } = await supabase
      .from('study_sessions')
      .update({
        pre_study_result_id: quizResultId,
        session_status: 'pre_quiz_completed'
      })
      .eq('id', sessionId)
      .select()
      .single();
    
    if (error) {
      console.error('Error completing pre-quiz:', error);
      return false;
    }
    
    console.log('Pre-quiz completed successfully');
    return true;
  } catch (error) {
    console.error('Error completing pre-quiz:', error);
    return false;
  }
};

/**
 * Update learning session when lesson starts
 * @param {string} sessionId - Session UUID
 * @returns {Promise<boolean>} Success status
 */
export const startLesson = async (sessionId) => {
  try {
    console.log('Starting lesson for session:', sessionId);
    
    const { data, error } = await supabase
      .from('study_sessions')
      .update({
        study_started_at: new Date().toISOString(),
        session_status: 'studying'
      })
      .eq('id', sessionId)
      .select()
      .single();
    
    if (error) {
      console.error('Error starting lesson:', error);
      return false;
    }
    
    console.log('Lesson started successfully');
    return true;
  } catch (error) {
    console.error('Error starting lesson:', error);
    return false;
  }
};

/**
 * Update learning session when lesson completes
 * @param {string} sessionId - Session UUID
 * @param {number} timeSpentMinutes - Optional time spent in lesson
 * @returns {Promise<boolean>} Success status
 */
export const completeLesson = async (sessionId, timeSpentMinutes = null) => {
  try {
    console.log('Completing lesson for session:', sessionId);
    
    const updateData = {
      study_completed_at: new Date().toISOString(),
      session_status: 'study_completed'
    };
    
    if (timeSpentMinutes) {
      updateData.lesson_time_spent_minutes = timeSpentMinutes;
    }
    
    const { data, error } = await supabase
      .from('study_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single();
    
    if (error) {
      console.error('Error completing lesson:', error);
      return false;
    }
    
    console.log('Lesson completed successfully');
    return true;
  } catch (error) {
    console.error('Error completing lesson:', error);
    return false;
  }
};

/**
 * Update learning session after post-quiz completion
 * @param {string} sessionId - Session UUID
 * @param {string} quizResultId - Quiz result ID
 * @returns {Promise<boolean>} Success status
 */
export const completePostQuiz = async (sessionId, quizResultId) => {
  try {
    console.log('Completing post-quiz for session:', sessionId);
    
    const { data, error } = await supabase
      .from('study_sessions')
      .update({
        post_study_result_id: quizResultId,
        session_status: 'post_quiz_completed'
      })
      .eq('id', sessionId)
      .select()
      .single();
    
    if (error) {
      console.error('Error completing post-quiz:', error);
      return false;
    }
    
    console.log('Post-quiz completed successfully');
    return true;
  } catch (error) {
    console.error('Error completing post-quiz:', error);
    return false;
  }
};

/**
 * Get all learning sessions for a user
 * @param {string} userId - Auth0 user ID
 * @param {number} limit - Number of sessions to fetch
 * @returns {Promise<array>} Array of sessions
 */
export const getUserLearningSessions = async (userId, limit = 10) => {
  try {
    const { data: sessions, error } = await supabase
      .from('study_sessions')
      .select(`
        *,
        quiz_categories(name, slug),
        pre_study_result:quiz_results!pre_study_result_id(score, completed_at),
        post_study_result:quiz_results!post_study_result_id(score, completed_at)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error getting user sessions:', error);
      return [];
    }
    
    return sessions || [];
  } catch (error) {
    console.error('Error getting user sessions:', error);
    return [];
  }
};

/**
 * Get completed learning sessions with improvement data
 * @param {string} userId - Auth0 user ID
 * @returns {Promise<array>} Array of completed sessions with analytics
 */
export const getCompletedLearningSessions = async (userId) => {
  try {
    const { data: sessions, error } = await supabase
      .from('study_sessions')
      .select(`
        *,
        quiz_categories(name, slug),
        pre_study_result:quiz_results!pre_study_result_id(*),
        post_study_result:quiz_results!post_study_result_id(*)
      `)
      .eq('user_id', userId)
      .eq('session_status', 'post_quiz_completed')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting completed sessions:', error);
      return [];
    }
    
    return sessions || [];
  } catch (error) {
    console.error('Error getting completed sessions:', error);
    return [];
  }
};

/**
 * Check if user can start a new session for a topic
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID
 * @returns {Promise<object>} Status and any active session
 */
export const checkSessionAvailability = async (userId, categoryId) => {
  try {
    const activeSession = await getActiveLearningSession(userId, categoryId);
    
    return {
      canStartNew: !activeSession,
      activeSession: activeSession,
      nextAction: activeSession ? getNextAction(activeSession.session_status) : 'start_session'
    };
  } catch (error) {
    console.error('Error checking session availability:', error);
    return { canStartNew: true, activeSession: null, nextAction: 'start_session' };
  }
};

/**
 * Get the next action based on session status
 * @param {string} sessionStatus - Current session status
 * @returns {string} Next action to take
 */
export const getNextAction = (sessionStatus) => {
  const actionMap = {
    'started': 'take_pre_quiz',
    'pre_quiz_completed': 'start_lesson',
    'studying': 'continue_lesson',
    'study_completed': 'take_post_quiz',
    'post_quiz_completed': 'view_results'
  };
  
  return actionMap[sessionStatus] || 'start_session';
};

/**
 * Get learning analytics for admin dashboard
 * @returns {Promise<object>} Learning analytics data
 */
export const getLearningAnalytics = async () => {
  try {
    const { data: analytics, error } = await supabase
      .from('learning_flow_overview')
      .select('*')
      .order('session_started', { ascending: false });
    
    if (error) {
      console.error('Error getting learning analytics:', error);
      return null;
    }
    
    // Calculate summary statistics
    const totalSessions = analytics.length;
    const completedSessions = analytics.filter(s => s.session_status === 'post_quiz_completed').length;
    const averageImprovement = analytics
      .filter(s => s.improvement_percentage !== null)
      .reduce((sum, s) => sum + s.improvement_percentage, 0) / 
      analytics.filter(s => s.improvement_percentage !== null).length || 0;
    
    return {
      summary: {
        totalSessions,
        completedSessions,
        completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
        averageImprovement: averageImprovement.toFixed(2)
      },
      sessions: analytics
    };
  } catch (error) {
    console.error('Error getting learning analytics:', error);
    return null;
  }
};

/**
 * Delete/Reset a learning session (for testing or admin purposes)
 * @param {string} sessionId - Session UUID
 * @returns {Promise<boolean>} Success status
 */
export const resetLearningSession = async (sessionId) => {
  try {
    console.log('Resetting learning session:', sessionId);
    
    const { data, error } = await supabase
      .from('study_sessions')
      .delete()
      .eq('id', sessionId);
    
    if (error) {
      console.error('Error resetting session:', error);
      return false;
    }
    
    console.log('Session reset successfully');
    return true;
  } catch (error) {
    console.error('Error resetting session:', error);
    return false;
  }
};
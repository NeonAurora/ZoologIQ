// Services/supabase/quizResultService.js
import { supabase } from './config';
import { updatePreAssessmentStatus } from './userService';

// ==================================
// QUIZ RESULTS OPERATIONS
// ==================================

export const saveQuizResult = async (resultData) => {
  try {
    console.log('Saving quiz result:', resultData);
    
    // Get quiz and category info
    const { data: quiz } = await supabase
      .from('quizzes')
      .select('category_id, quiz_categories(name, slug)')
      .eq('id', resultData.quiz_id)
      .single();
    
    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: resultData.user_id,
        quiz_id: resultData.quiz_id,
        category_id: quiz?.category_id,
        quiz_title: resultData.quiz_title,
        category_name: typeof quiz?.quiz_categories?.name === 'object' 
          ? (quiz.quiz_categories.name.en || quiz.quiz_categories.name) 
          : (quiz?.quiz_categories?.name || 'General'),
        total_questions: resultData.answers?.length || 0,
        correct_answers: resultData.correct_answers || 0,
        score: resultData.score || 0,
        max_possible_score: resultData.max_score || 0,
        user_answers: resultData.answers || [],
        time_taken_seconds: resultData.time_taken_seconds,
        session_type: resultData.session_type || 'regular',
        completed_at: resultData.completed_at || new Date().toISOString(),
        started_at: resultData.started_at || new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving quiz result:', error);
      return null;
    }

    // 🔥 NEW: If this is a pre-lesson quiz, mark pre-assessment as completed
    if (resultData.session_type === 'pre_study') {
      const topicSlug = quiz?.quiz_categories?.slug;
      if (topicSlug && ['tiger', 'tapir', 'turtle'].includes(topicSlug)) {
        console.log(`🎯 Marking pre-assessment completed for topic: ${topicSlug}`);
        await updatePreAssessmentStatus(resultData.user_id, topicSlug, true);
      }
    }
    
    console.log('Quiz result saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return null;
  }
};

export const getUserQuizResults = async (userId, quizId = null) => {
  try {
    let query = supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });
    
    if (quizId) {
      query = query.eq('quiz_id', quizId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching quiz results:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return [];
  }
};

// ==================================
// NEW PRE-ASSESSMENT SPECIFIC FUNCTIONS
// ==================================

/**
 * Get pre-test score for a specific topic (for post-test comparison)
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID
 * @returns {Promise<object|null>} Pre-test result or null
 */
export const getPreTestScore = async (userId, categoryId) => {
  try {
    const { data: result, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .eq('session_type', 'pre_study')
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error getting pre-test score:', error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error in getPreTestScore:', error);
    return null;
  }
};

/**
 * Save post-test result with improvement calculation
 * @param {object} resultData - Quiz result data
 * @returns {Promise<object|null>} Saved result with improvement data
 */
export const savePostTestResult = async (resultData) => {
  try {
    console.log('Saving post-test result with improvement calculation');
    
    // Save the regular quiz result first
    const savedResult = await saveQuizResult({
      ...resultData,
      session_type: 'post_study'
    });

    if (!savedResult) {
      return null;
    }

    // Get the pre-test score for comparison
    const preTestResult = await getPreTestScore(resultData.user_id, savedResult.category_id);
    
    if (preTestResult) {
      // Calculate improvement
      const preScore = preTestResult.score;
      const postScore = savedResult.score;
      const maxScore = savedResult.max_possible_score;
      
      const prePercentage = (preScore / maxScore) * 100;
      const postPercentage = (postScore / maxScore) * 100;
      const improvement = postPercentage - prePercentage;
      
      console.log(`📊 Improvement calculation: ${prePercentage.toFixed(1)}% → ${postPercentage.toFixed(1)}% (${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%)`);
      
      // Add improvement data to result
      savedResult.improvement_data = {
        pre_score: preScore,
        post_score: postScore,
        pre_percentage: prePercentage,
        post_percentage: postPercentage,
        improvement_percentage: improvement,
        improved: improvement > 0
      };
    }

    return savedResult;
  } catch (error) {
    console.error('Error saving post-test result:', error);
    return null;
  }
};

/**
 * Get all quiz results by session type
 * @param {string} userId - Auth0 user ID
 * @param {string} sessionType - 'pre_study', 'post_study', or 'regular'
 * @param {string} categoryId - Optional category filter
 * @returns {Promise<array>} Array of quiz results
 */
export const getQuizResultsByType = async (userId, sessionType, categoryId = null) => {
  try {
    let query = supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('session_type', sessionType)
      .order('completed_at', { ascending: false });
    
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching quiz results by type:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching quiz results by type:', error);
    return [];
  }
};

/**
 * Get all post-test attempts for a specific topic
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID
 * @returns {Promise<array>} Array of post-test results
 */
export const getAllPostTestAttempts = async (userId, categoryId) => {
  try {
    return await getQuizResultsByType(userId, 'post_study', categoryId);
  } catch (error) {
    console.error('Error getting post-test attempts:', error);
    return [];
  }
};

/**
 * Get best post-test score for a specific topic
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID
 * @returns {Promise<object|null>} Best post-test result
 */
export const getBestPostTestScore = async (userId, categoryId) => {
  try {
    const { data: result, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .eq('session_type', 'post_study')
      .order('percentage', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error getting best post-test score:', error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error in getBestPostTestScore:', error);
    return null;
  }
};

/**
 * Get improvement data comparing pre-test vs best post-test
 * @param {string} userId - Auth0 user ID
 * @param {string} categoryId - Quiz category ID
 * @returns {Promise<object|null>} Improvement analysis
 */
export const getImprovementData = async (userId, categoryId) => {
  try {
    const preTestResult = await getPreTestScore(userId, categoryId);
    const bestPostTestResult = await getBestPostTestScore(userId, categoryId);
    
    if (!preTestResult) {
      return { error: 'No pre-test found' };
    }

    if (!bestPostTestResult) {
      return { 
        pre_test: preTestResult,
        post_test: null,
        improvement: null,
        message: 'No post-tests completed yet'
      };
    }

    const prePercentage = preTestResult.percentage;
    const postPercentage = bestPostTestResult.percentage;
    const improvement = postPercentage - prePercentage;

    return {
      pre_test: preTestResult,
      post_test: bestPostTestResult,
      improvement: {
        percentage_change: improvement,
        improved: improvement > 0,
        points_gained: bestPostTestResult.score - preTestResult.score,
        performance_level: getPerformanceLevel(improvement)
      }
    };
  } catch (error) {
    console.error('Error getting improvement data:', error);
    return null;
  }
};

/**
 * Helper function to categorize performance improvement
 * @param {number} improvementPercentage - Percentage improvement
 * @returns {string} Performance level
 */
const getPerformanceLevel = (improvementPercentage) => {
  if (improvementPercentage >= 20) return 'Excellent';
  if (improvementPercentage >= 10) return 'Good';
  if (improvementPercentage >= 5) return 'Fair';
  if (improvementPercentage > 0) return 'Slight';
  if (improvementPercentage === 0) return 'Same';
  return 'Decreased';
};
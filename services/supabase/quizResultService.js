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
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('category_id, quiz_categories(name, slug)')
      .eq('id', resultData.quiz_id)
      .single();

    if (quizError) {
      console.error('Error fetching quiz info:', quizError);
      return null;
    }

    if (!quiz || !quiz.category_id) {
      console.error('Quiz or category_id not found:', quiz);
      return null;
    }
    
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

    // 🔥 FIXED: Now checks for 'pre-lesson' instead of 'pre_study'
    if (resultData.session_type === 'pre-lesson') {
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
// PRE-ASSESSMENT SPECIFIC FUNCTIONS - UPDATED
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
      .eq('session_type', 'pre-lesson') // 🔥 FIXED: Changed from 'pre_study'
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
    
    // 🔥 FIXED: Direct save without changing session_type
    const savedResult = await saveQuizResult(resultData);

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
 * @param {string} sessionType - 'pre-lesson', 'post-lesson', or 'regular'
 * @param {string} categoryId - Optional category filter
 * @returns {Promise<array>} Array of quiz results
 */
export const getQuizResultsByType = async (userId, sessionType, categoryId = null) => {
  try {
    let query = supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('session_type', sessionType) // Now expects 'pre-lesson', 'post-lesson', 'regular'
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
    return await getQuizResultsByType(userId, 'post-lesson', categoryId); // 🔥 FIXED: Changed from 'post_study'
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
      .eq('session_type', 'post-lesson') // 🔥 FIXED: Changed from 'post_study'
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
    const bestPostResult = await getBestPostTestScore(userId, categoryId);
    
    if (!preTestResult || !bestPostResult) {
      return null;
    }
    
    const improvement = bestPostResult.score - preTestResult.score;
    const improvementPercentage = preTestResult.score > 0 
      ? ((improvement / preTestResult.score) * 100) 
      : 0;
    
    return {
      pre_test: preTestResult,
      best_post_test: bestPostResult,
      improvement_score: improvement,
      improvement_percentage: improvementPercentage,
      has_improved: improvement > 0
    };
  } catch (error) {
    console.error('Error getting improvement data:', error);
    return null;
  }
};

// ==================================
// ANALYTICS FUNCTIONS
// ==================================

/**
 * Get user's quiz performance summary
 * @param {string} userId - Auth0 user ID
 * @returns {Promise<object>} Performance summary
 */
export const getUserPerformanceSummary = async (userId) => {
  try {
    const { data: results, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error getting performance summary:', error);
      return null;
    }
    
    const preTests = results.filter(r => r.session_type === 'pre-lesson');
    const postTests = results.filter(r => r.session_type === 'post-lesson');
    const regularQuizzes = results.filter(r => r.session_type === 'regular');
    
    return {
      total_attempts: results.length,
      pre_assessments: preTests.length,
      post_assessments: postTests.length,
      regular_quizzes: regularQuizzes.length,
      average_score: results.length > 0 
        ? results.reduce((sum, r) => sum + r.percentage, 0) / results.length 
        : 0,
      categories_attempted: [...new Set(results.map(r => r.category_id))].length
    };
  } catch (error) {
    console.error('Error getting performance summary:', error);
    return null;
  }
};
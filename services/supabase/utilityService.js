// Services/supabase/utilityService.js
import { supabase } from './config';
import { getPreAssessmentStatus } from './userService';

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

// ==================================
// NEW PRE-ASSESSMENT UTILITY FUNCTIONS
// ==================================

/**
 * Get comprehensive user progress across all topics
 * @param {string} userId - Auth0 user ID
 * @returns {Promise<object>} Complete progress overview
 */
export const getUserOverallProgress = async (userId) => {
  try {
    console.log('Getting overall progress for user:', userId);
    
    // Get pre-assessment status
    const preAssessmentStatus = await getPreAssessmentStatus(userId);
    
    // Get quiz results summary
    const { data: results, error } = await supabase
      .from('quiz_results')
      .select(`
        category_id,
        session_type,
        percentage,
        completed_at,
        quiz_categories(name, slug)
      `)
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    // Process results by topic
    const topicProgress = {};
    const topics = ['tiger', 'tapir', 'turtle'];
    
    topics.forEach(topic => {
      topicProgress[topic] = {
        topic_name: topic,
        pre_assessment_completed: preAssessmentStatus[topic] || false,
        pre_test_score: null,
        post_test_count: 0,
        best_post_test_score: null,
        latest_post_test_score: null,
        improvement: null
      };
    });

    // Fill in quiz data
    results?.forEach(result => {
      const topicSlug = result.quiz_categories?.slug;
      if (!topicSlug || !topicProgress[topicSlug]) return;

      if (result.session_type === 'pre_study') {
        topicProgress[topicSlug].pre_test_score = result.percentage;
      } else if (result.session_type === 'post_study') {
        topicProgress[topicSlug].post_test_count += 1;
        
        // Update best score
        if (!topicProgress[topicSlug].best_post_test_score || 
            result.percentage > topicProgress[topicSlug].best_post_test_score) {
          topicProgress[topicSlug].best_post_test_score = result.percentage;
        }
        
        // Update latest score (first in ordered results)
        if (!topicProgress[topicSlug].latest_post_test_score) {
          topicProgress[topicSlug].latest_post_test_score = result.percentage;
        }
      }
    });

    // Calculate improvements
    Object.keys(topicProgress).forEach(topic => {
      const progress = topicProgress[topic];
      if (progress.pre_test_score && progress.best_post_test_score) {
        progress.improvement = progress.best_post_test_score - progress.pre_test_score;
      }
    });

    const completedTopics = Object.values(topicProgress)
      .filter(p => p.pre_assessment_completed).length;

    return {
      overall_stats: {
        total_topics: 3,
        topics_unlocked: completedTopics,
        completion_rate: Math.round((completedTopics / 3) * 100)
      },
      topic_progress: topicProgress
    };

  } catch (error) {
    console.error('Error getting overall progress:', error);
    return null;
  }
};

/**
 * Get topic access information for navigation
 * @param {string} userId - Auth0 user ID
 * @returns {Promise<object>} Topic access status
 */
export const getTopicAccessStatus = async (userId) => {
  try {
    const preAssessmentStatus = await getPreAssessmentStatus(userId);
    
    const topics = [
      {
        id: 'tiger',
        name: 'Malayan Tiger',
        slug: 'tiger',
        unlocked: preAssessmentStatus.tiger || false,
        icon: 'pets'
      },
      {
        id: 'tapir', 
        name: 'Malayan Tapir',
        slug: 'tapir',
        unlocked: preAssessmentStatus.tapir || false,
        icon: 'forest'
      },
      {
        id: 'turtle',
        name: 'Green Sea Turtle', 
        slug: 'turtle',
        unlocked: preAssessmentStatus.turtle || false,
        icon: 'waves'
      }
    ];

    return {
      topics,
      unlocked_count: topics.filter(t => t.unlocked).length,
      locked_count: topics.filter(t => !t.unlocked).length
    };

  } catch (error) {
    console.error('Error getting topic access status:', error);
    return null;
  }
};

/**
 * Get quiz attempts summary for a specific topic
 * @param {string} userId - Auth0 user ID 
 * @param {string} categoryId - Category ID
 * @returns {Promise<object>} Quiz attempts summary
 */
export const getTopicQuizSummary = async (userId, categoryId) => {
  try {
    const { data: results, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching topic quiz summary:', error);
      return null;
    }

    const preTests = results.filter(r => r.session_type === 'pre_study');
    const postTests = results.filter(r => r.session_type === 'post_study');
    
    const summary = {
      pre_test: preTests[0] || null,
      post_tests: {
        count: postTests.length,
        attempts: postTests,
        best_score: postTests.length > 0 ? Math.max(...postTests.map(t => t.percentage)) : null,
        latest_score: postTests[0]?.percentage || null,
        average_score: postTests.length > 0 ? 
          Math.round(postTests.reduce((sum, t) => sum + t.percentage, 0) / postTests.length) : null
      },
      improvement: null
    };

    // Calculate improvement
    if (summary.pre_test && summary.post_tests.best_score) {
      summary.improvement = summary.post_tests.best_score - summary.pre_test.percentage;
    }

    return summary;

  } catch (error) {
    console.error('Error getting topic quiz summary:', error);
    return null;
  }
};

/**
 * Check if user can access a specific feature
 * @param {string} userId - Auth0 user ID
 * @param {string} feature - Feature to check ('lesson', 'post-test')
 * @param {string} topic - Topic slug (tiger, tapir, turtle)
 * @returns {Promise<object>} Access status and reason
 */
export const checkFeatureAccess = async (userId, feature, topic) => {
  try {
    const preAssessmentStatus = await getPreAssessmentStatus(userId);
    const hasCompletedPreTest = preAssessmentStatus[topic] || false;

    switch (feature) {
      case 'lesson':
      case 'post-test':
        return {
          allowed: hasCompletedPreTest,
          reason: hasCompletedPreTest ? 
            'Access granted' : 
            `Complete the ${topic} pre-assessment to unlock this feature`
        };
      
      case 'pre-test':
        return {
          allowed: !hasCompletedPreTest,
          reason: hasCompletedPreTest ? 
            'Pre-assessment already completed for this topic' : 
            'Ready to take pre-assessment'
        };

      default:
        return {
          allowed: false,
          reason: 'Unknown feature'
        };
    }

  } catch (error) {
    console.error('Error checking feature access:', error);
    return {
      allowed: false,
      reason: 'Error checking access'
    };
  }
};

/**
 * Get category ID by topic slug
 * @param {string} topicSlug - Topic slug (tiger, tapir, turtle)
 * @returns {Promise<string|null>} Category ID
 */
export const getCategoryIdBySlug = async (topicSlug) => {
  try {
    const { data: category, error } = await supabase
      .from('quiz_categories')
      .select('id')
      .eq('slug', topicSlug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error getting category ID:', error);
      return null;
    }

    return category?.id || null;
  } catch (error) {
    console.error('Error getting category ID:', error);
    return null;
  }
};
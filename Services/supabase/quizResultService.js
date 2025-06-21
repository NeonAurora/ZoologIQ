import { supabase } from './config';

// ==================================
// QUIZ RESULTS OPERATIONS
// ==================================

export const saveQuizResult = async (resultData) => {
  try {
    console.log('Saving quiz result:', resultData);
    
    // Get quiz and category info
    const { data: quiz } = await supabase
      .from('quizzes')
      .select('category_id, quiz_categories(name)')
      .eq('id', resultData.quiz_id)
      .single();
    
    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: resultData.user_id,
        quiz_id: resultData.quiz_id,
        category_id: quiz?.category_id,
        quiz_title: resultData.quiz_title,
        category_name: quiz?.quiz_categories?.name || 'General',
        total_questions: resultData.answers?.length || 0,
        correct_answers: resultData.correct_answers || 0,
        score: resultData.score || 0,
        max_possible_score: resultData.max_score || 0,
        user_answers: resultData.answers || [],
        time_taken_seconds: resultData.time_taken_seconds,
        session_type: resultData.session_type || 'regular',
        completed_at: resultData.completed_at || new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving quiz result:', error);
      return null;
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
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

// ==================================
// QUIZ OPERATIONS
// ==================================

export const getAllQuizzes = async () => {
  try {
    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_categories(name, slug),
        quiz_questions(*)
      `)
      .eq('is_published', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error fetching quizzes:', error);
      return {};
    }
    
    // Convert to Firebase-compatible format: { id: quizData, id2: quizData2, ... }
    const quizzesObject = {};
    
    quizzes.forEach(quiz => {
      // Convert normalized questions back to the old format your components expect
      quiz.questions = quiz.quiz_questions
        .sort((a, b) => a.question_order - b.question_order)
        .map(q => ({
          question: q.question_text,
          answer: q.correct_answer,
          options: q.options,
          points: q.points,
          penalty: q.penalty,
          image: q.question_image_url
        }));
      
      // Add backward compatibility fields
      quiz.category = quiz.quiz_categories?.name || 'General';
      quiz.grade = quiz.quiz_categories?.name || 'General'; // Your old field name
      quiz.createdBy = quiz.created_by;
      quiz.createdAt = quiz.created_at;
      
      // Clean up the response
      delete quiz.quiz_questions;
      delete quiz.quiz_categories;
      delete quiz.category_id; // Internal field
      delete quiz.created_by; // Use createdBy instead
      delete quiz.created_at; // Use createdAt instead
      delete quiz.updated_at;
      delete quiz.is_published;
      delete quiz.is_active;
      
      quizzesObject[quiz.id] = quiz;
    });
    
    console.log(`Fetched ${Object.keys(quizzesObject).length} quizzes from Supabase`);
    return quizzesObject;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return {};
  }
};

export const getQuizById = async (quizId) => {
  try {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_categories(name, slug),
        quiz_questions(*)
      `)
      .eq('id', quizId)
      .single();
    
    if (error) {
      console.error('Supabase error fetching quiz:', error);
      return null;
    }
    
    // Convert to the format your components expect
    quiz.questions = quiz.quiz_questions
      .sort((a, b) => a.question_order - b.question_order)
      .map(q => ({
        question: q.question_text,
        answer: q.correct_answer,
        options: q.options,
        points: q.points,
        penalty: q.penalty,
        image: q.question_image_url
      }));
    
    // Backward compatibility fields
    quiz.category = quiz.quiz_categories?.name || 'General';
    quiz.grade = quiz.quiz_categories?.name || 'General';
    quiz.createdBy = quiz.created_by;
    quiz.createdAt = quiz.created_at;
    
    // Clean up
    delete quiz.quiz_questions;
    delete quiz.quiz_categories;
    delete quiz.category_id;
    delete quiz.created_by;
    delete quiz.created_at;
    delete quiz.updated_at;
    delete quiz.is_published;
    delete quiz.is_active;
    
    return quiz;
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    return null;
  }
};

export const saveQuiz = async (quizData) => {
  try {
    console.log('Saving quiz to Supabase:', quizData);
    
    // Step 1: Handle category (create if doesn't exist)
    let categoryId = null;
    if (quizData.category) {
      // Check if category exists
      const { data: existingCategory } = await supabase
        .from('quiz_categories')
        .select('id')
        .eq('name', quizData.category)
        .single();
      
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        // Create new category
        const { data: newCategory, error: categoryError } = await supabase
          .from('quiz_categories')
          .insert({
            name: quizData.category,
            slug: quizData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: `Questions about ${quizData.category}`,
            created_by: quizData.created_by || quizData.createdBy
          })
          .select()
          .single();
        
        if (categoryError) {
          console.error('Error creating category:', categoryError);
          throw categoryError;
        }
        
        categoryId = newCategory.id;
        console.log('Created new category:', newCategory);
      }
    }
    
    // Step 2: Create the quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        category_id: categoryId,
        title: quizData.title,
        description: quizData.description,
        instructions: quizData.instructions,
        difficulty: quizData.difficulty || 'Medium',
        is_published: true,
        is_active: true,
        created_by: quizData.created_by || quizData.createdBy
      })
      .select()
      .single();
    
    if (quizError) {
      console.error('Error creating quiz:', quizError);
      throw quizError;
    }
    
    console.log('Created quiz:', quiz);
    
    // Step 3: Insert questions
    if (quizData.questions && quizData.questions.length > 0) {
      const questionsToInsert = quizData.questions.map((q, index) => ({
        quiz_id: quiz.id,
        question_text: q.question,
        question_image_url: q.image,
        options: q.options,
        correct_answer: q.answer,
        points: q.points || 10,
        penalty: q.penalty || 0,
        explanation: q.explanation,
        question_order: index + 1
      }));
      
      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(questionsToInsert);
      
      if (questionsError) {
        console.error('Error inserting questions:', questionsError);
        throw questionsError;
      }
      
      console.log(`Inserted ${questionsToInsert.length} questions`);
    }
    
    // Return quiz data in the format your components expect
    return {
      id: quiz.id,
      title: quiz.title,
      category: quizData.category,
      difficulty: quiz.difficulty,
      createdBy: quiz.created_by,
      createdAt: quiz.created_at
    };
    
  } catch (error) {
    console.error('Error saving quiz:', error);
    return null;
  }
};

// Real-time subscription for quiz changes
export const subscribeToQuizzes = (callback) => {
  let isSubscribed = true;
  
  const fetchAndNotify = async () => {
    if (!isSubscribed) return;
    const quizzes = await getAllQuizzes();
    callback(quizzes);
  };
  
  const subscription = supabase
    .channel('quizzes_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'quizzes' }, 
      () => {
        console.log('Quiz data changed, fetching latest...');
        fetchAndNotify();
      }
    )
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'quiz_questions' }, 
      () => {
        console.log('Quiz questions changed, fetching latest...');
        fetchAndNotify();
      }
    )
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'quiz_categories' }, 
      () => {
        console.log('Quiz categories changed, fetching latest...');
        fetchAndNotify();
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    isSubscribed = false;
    supabase.removeChannel(subscription);
  };
};

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

// ==================================
// STUDY SESSIONS OPERATIONS
// ==================================

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

// ==================================
// CATEGORY OPERATIONS
// ==================================

export const getAllCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('quiz_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

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
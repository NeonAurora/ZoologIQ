// Services/supabase/quizService.js
import { supabase } from './config';
import { createCategory, findCategoryByName } from './categoryService';

// ==================================
// QUIZ OPERATIONS
// ==================================

export const getAllQuizzes = async () => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_categories(name, slug),
        quiz_questions(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error fetching quizzes:', error);
      return {};
    }
    
    // Convert array to object grouped by category
    const quizzesObject = {};
    data?.forEach(quiz => {
      const categoryName = quiz.quiz_categories?.name?.en || 'General';
      if (!quizzesObject[categoryName]) {
        quizzesObject[categoryName] = [];
      }
      
      // Format quiz data
      quiz.questions = quiz.quiz_questions
        ?.sort((a, b) => a.question_order - b.question_order)
        ?.map(q => ({
          question: q.question_text,
          answer: q.correct_answer,
          options: q.options,
          points: q.points,
          penalty: q.penalty,
          image: q.question_image_url,
          explanation: q.explanation
        })) || [];
      
      // Add backward compatibility fields
      quiz.category = categoryName;
      quiz.grade = categoryName;
      quiz.createdBy = quiz.created_by;
      quiz.createdAt = quiz.created_at;
      
      // Clean up
      delete quiz.quiz_questions;
      delete quiz.quiz_categories;
      
      quizzesObject[categoryName].push(quiz);
    });
    
    console.log(`✅ Loaded ${Object.keys(quizzesObject).length} categories with quizzes from Supabase`);
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
        image: q.question_image_url,
        explanation: q.explanation
      }));
    
    // Backward compatibility fields
    quiz.category = quiz.quiz_categories?.name?.en || 'General';
    quiz.grade = quiz.quiz_categories?.name?.en || 'General';
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

// 🔥 UPDATED: Handle bilingual quiz creation
export const saveQuiz = async (quizData) => {
  try {
    console.log('Saving bilingual quiz to Supabase:', quizData);
    
    // Step 1: Handle category (create if doesn't exist)
    let categoryId = null;
    if (quizData.category) {
      // First try to find existing category by name
      let existingCategory = await findCategoryByName(quizData.category);
      
      if (existingCategory) {
        categoryId = existingCategory.id;
        console.log('Found existing category:', existingCategory);
      } else {
        // Create new bilingual category
        console.log('Creating new bilingual category for:', quizData.category);
        const newCategory = await createCategory({
          name: quizData.category, // Will be converted to bilingual in createCategory
          created_by: quizData.created_by || quizData.createdBy
        });
        
        if (!newCategory) {
          throw new Error('Failed to create category');
        }
        
        categoryId = newCategory.id;
        console.log('Created new bilingual category:', newCategory);
      }
    }
    
    // Step 2: Ensure quiz data is in bilingual format
    let title = quizData.title;
    let description = quizData.description;
    
    // Convert to bilingual if needed
    if (typeof title === 'string') {
      title = { en: title, ms: title }; // For now, keep same - admin can update later
    }
    
    if (typeof description === 'string') {
      description = { en: description, ms: description }; // For now, keep same - admin can update later
    }
    
    // Step 3: Create the quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        category_id: categoryId,
        title: title,
        description: description,
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
    
    console.log('Created bilingual quiz:', quiz);
    
    // Step 4: Insert bilingual questions
    if (quizData.questions && quizData.questions.length > 0) {
      const questionsToInsert = quizData.questions.map((q, index) => {
        // Ensure question data is in correct format
        let questionText = q.question_text || q.question;
        let options = q.options;
        let explanation = q.explanation;
        
        // Convert string fields to bilingual if needed (backward compatibility)
        if (typeof questionText === 'string') {
          questionText = { en: questionText, ms: questionText };
        }
        
        if (Array.isArray(options)) {
          options = { en: options, ms: options };
        }
        
        if (typeof explanation === 'string') {
          explanation = { en: explanation, ms: explanation };
        }

        // 🔥 UPDATED: Handle correct_answer - could be index or text
        let correctAnswer = q.correct_answer || q.answer;
        const englishOptions = options.en;
        
        console.log(`🔍 Processing Question ${index + 1} correct_answer:`, {
          received_correct_answer: correctAnswer,
          type: typeof correctAnswer,
          english_options: englishOptions
        });

        // 🔥 NEW: Check if correct_answer is already an index or if it's text
        if (typeof correctAnswer === 'string') {
          // Try to parse as number first (could be index like "1")
          const parsedIndex = parseInt(correctAnswer, 10);
          
          // If it's a valid index (0, 1, 2, 3, etc.) and within bounds
          if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < englishOptions.length) {
            console.log(`✅ Question ${index + 1}: Received valid index "${correctAnswer}"`);
            correctAnswer = correctAnswer; // Keep as string index
          } else {
            // It's text, find its index
            const answerIndex = englishOptions.findIndex(opt => opt === correctAnswer);
            if (answerIndex === -1) {
              console.error(`❌ Question ${index + 1}: Correct answer "${correctAnswer}" not found in English options:`, englishOptions);
              throw new Error(`Question ${index + 1}: Correct answer "${correctAnswer}" not found in options`);
            }
            correctAnswer = answerIndex.toString(); // Convert to string index
            console.log(`✅ Question ${index + 1}: Converted text "${q.correct_answer}" to index "${correctAnswer}"`);
          }
        } else if (typeof correctAnswer === 'number') {
          // Convert number to string
          if (correctAnswer >= 0 && correctAnswer < englishOptions.length) {
            correctAnswer = correctAnswer.toString();
            console.log(`✅ Question ${index + 1}: Converted number index ${q.correct_answer} to string "${correctAnswer}"`);
          } else {
            throw new Error(`Question ${index + 1}: Index ${correctAnswer} is out of bounds for options array`);
          }
        } else {
          throw new Error(`Question ${index + 1}: Invalid correct_answer type: ${typeof correctAnswer}`);
        }
        
        // 🔥 VALIDATE: Ensure the index is valid for both language arrays
        const finalIndex = parseInt(correctAnswer, 10);
        if (finalIndex < 0 || finalIndex >= englishOptions.length || finalIndex >= options.ms.length) {
          throw new Error(`Question ${index + 1}: Index ${finalIndex} is out of bounds (EN: ${englishOptions.length}, MS: ${options.ms.length})`);
        }

        console.log(`🔍 Question ${index + 1} final validation:`, {
          final_index: correctAnswer,
          english_option_at_index: englishOptions[finalIndex],
          malay_option_at_index: options.ms[finalIndex],
          english_options_count: englishOptions.length,
          malay_options_count: options.ms.length
        });
        
        return {
          quiz_id: quiz.id,
          question_text: questionText,
          question_image_url: q.image,
          options: options,
          correct_answer: correctAnswer, // INDEX as string: "0", "1", "2", "3"
          explanation: explanation,
          points: q.points || 10,
          penalty: q.penalty || 0,
          question_order: index + 1
        };
      });
      
      console.log('🔍 All questions converted to index-based correct answers:', questionsToInsert.map((q, i) => ({
        question: i + 1,
        correct_answer_index: q.correct_answer,
        english_option: q.options.en[parseInt(q.correct_answer, 10)],
        malay_option: q.options.ms[parseInt(q.correct_answer, 10)]
      })));
      
      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(questionsToInsert);
      
      if (questionsError) {
        console.error('Error inserting bilingual questions:', questionsError);
        throw questionsError;
      }
      
      console.log(`✅ Inserted ${questionsToInsert.length} bilingual questions with index-based correct answers`);
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
    console.error('Error saving bilingual quiz:', error);
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
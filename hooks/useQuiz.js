import { useState, useEffect } from 'react';
import { getQuizById } from '@/services/supabase'; // Updated import

export const useQuiz = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quizId) {
      setError("No quiz ID provided");
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const quizData = await getQuizById(quizId);
        
        if (quizData) {
          // Ensure questions array exists (backward compatibility)
          if (!quizData.questions) {
            quizData.questions = [];
          }
          setQuiz(quizData);
        } else {
          setError("Quiz not found");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Failed to load quiz: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  return { quiz, loading, error };
};
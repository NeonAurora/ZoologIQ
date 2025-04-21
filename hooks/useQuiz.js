// hooks/useQuiz.js
import { useState, useEffect } from 'react';
import { database } from '@/services/firebase/config';
import { ref, onValue, off } from 'firebase/database';

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

    const quizRef = ref(database, `quizzes/${quizId}`);
    
    const unsubscribe = onValue(quizRef, 
      (snapshot) => {
        if (snapshot.exists()) {
          const quizData = snapshot.val();
          // Ensure questions array exists
          if (!quizData.questions) {
            quizData.questions = [];
          }
          setQuiz(quizData);
          setError(null);
        } else {
          setQuiz(null);
          setError("Quiz not found");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching quiz:", error);
        setError("Failed to load quiz: " + error.message);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => off(quizRef);
  }, [quizId]);

  return { quiz, loading, error };
};
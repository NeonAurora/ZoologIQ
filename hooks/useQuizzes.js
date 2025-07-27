import { useState, useEffect } from "react";
import { getAllQuizzes, subscribeToQuizzes } from '@/services/supabase'; // Updated import

export const useQuizzes = ({ realTime = true } = {}) => {
    const [quizzes, setQuizzes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        
        if (realTime) {
            // Use real-time subscriptions
            unsubscribe = subscribeToQuizzes((data) => {
                console.log('Quizzes updated via subscription:', Object.keys(data).length);
                setQuizzes(data);
                setLoading(false);
            });
            
            // Also fetch initial data
            getAllQuizzes().then((data) => {
                setQuizzes(data);
                setLoading(false);
            });
        } else {
            // Just fetch once
            getAllQuizzes().then((data) => {
                setQuizzes(data);
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [realTime]);

    return { quizzes, loading };
};
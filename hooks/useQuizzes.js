import { useState, useEffect } from "react";
import { getAllQuizzes, subscribeToQuizzes } from '../services/firebase/database';

export const useQuizzes = ({realTime = true} = {}) => {
    const [quizzes, setQuizzes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        if(realTime) {
            unsubscribe = subscribeToQuizzes((data) => {
                setQuizzes(data);
                setLoading(false);
            });
        } else {
            getAllQuizzes().then((data) => {
                setQuizzes(data);
                setLoading(false);
            })
        }

        return () => unsubscribe && unsubscribe();
    }, [realTime]);

    return { quizzes, loading };
}
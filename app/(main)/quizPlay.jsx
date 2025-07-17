// app/(main)/quizPlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from '@/hooks/useQuiz';
import { Colors } from '@/constants/Colors';
import { completePreQuiz, completePostQuiz, startStudyPhase, saveQuizResult } from '@/services/supabase';

// Import our new components
import QuizHeader from '@/components/quiz/QuizHeader';
import QuizContent from '@/components/quiz/QuizContent';
import QuizResults from '@/components/quiz/QuizResults';

export default function QuizPlayPage() {
  const { quizId, sessionId, type, fresh } = useLocalSearchParams();
  const router = useRouter();
  const { user, supabaseData } = useAuth();
  const { quiz, loading, error } = useQuiz(quizId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const mountedRef = useRef(true);
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStartTime] = useState(new Date());
  const [isSavingResult, setIsSavingResult] = useState(false);
  
  // 🔥 NEW: Language state (starts with user's preferred language)
  const [currentLanguage, setCurrentLanguage] = useState(
    supabaseData?.preferred_language || 'en'
  );

  // Helper function for bilingual text
  const getBilingualText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[currentLanguage] || textObj.en || fallback;
  };

  // Bilingual content for alerts and messages
  const content = {
    en: {
      authRequired: 'Authentication Required',
      signInToTakeQuiz: 'Please sign in to take quizzes',
      ok: 'OK',
      error: 'Error',
      goBack: 'Go Back',
      loadingQuiz: 'Loading quiz...',
      noQuestions: 'This quiz has no questions',
      preAssessment: {
        title: 'Pre-Assessment',
        subtitle: 'Test your current knowledge',
        description: 'This quiz will help us understand what you already know about the topic.'
      },
      postAssessment: {
        title: 'Post-Assessment', 
        subtitle: 'Show what you\'ve learned',
        description: 'Let\'s see how much you\'ve improved after the lesson!'
      },
      knowledgeQuiz: {
        title: 'Knowledge Quiz',
        subtitle: 'Test your understanding', 
        description: 'Challenge yourself with this quiz.'
      }
    },
    ms: {
      authRequired: 'Pengesahan Diperlukan',
      signInToTakeQuiz: 'Sila log masuk untuk mengambil kuiz',
      ok: 'OK',
      error: 'Ralat',
      goBack: 'Kembali',
      loadingQuiz: 'Sedang memuatkan kuiz...',
      noQuestions: 'Kuiz ini tiada soalan',
      preAssessment: {
        title: 'Pra-Penilaian',
        subtitle: 'Uji pengetahuan semasa anda',
        description: 'Kuiz ini akan membantu kami memahami apa yang anda sudah ketahui tentang topik ini.'
      },
      postAssessment: {
        title: 'Pasca-Penilaian',
        subtitle: 'Tunjukkan apa yang anda pelajari', 
        description: 'Mari lihat sejauh mana anda telah bertambah baik selepas pelajaran!'
      },
      knowledgeQuiz: {
        title: 'Kuiz Pengetahuan',
        subtitle: 'Uji pemahaman anda',
        description: 'Cabaran diri anda dengan kuiz ini.'
      }
    }
  };

  const text = content[currentLanguage] || content.en;

  // Update language when user's preference changes
  useEffect(() => {
    if (supabaseData?.preferred_language) {
      setCurrentLanguage(supabaseData.preferred_language);
    }
  }, [supabaseData?.preferred_language]);

  // CLEANUP ON UNMOUNT
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // RESET STATE WHEN FRESH PARAMETER CHANGES
  useEffect(() => {
    if (fresh === 'true') {
      console.log('🧹 Fresh quiz requested - resetting all state');
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setScore(0);
      setQuizCompleted(false);
      setIsSavingResult(false);
    }
  }, [fresh]);

  // RESET STATE FOR POST-LESSON QUIZZES
  useEffect(() => {
    if (type === 'post-lesson') {
      console.log('🧹 Post-lesson quiz - ensuring fresh state');
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setQuizCompleted(false);
      setIsSavingResult(false);
    }
  }, [type]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      Alert.alert(
        text.authRequired,
        text.signInToTakeQuiz,
        [{ text: text.ok, onPress: () => router.replace('/') }]
      );
    }
  }, [user, loading, text]);

  // Initialize answers array when quiz loads
  useEffect(() => {
    if (quiz && quiz.questions && mountedRef.current) {
      console.log('🔧 Initializing answers array for', quiz.questions.length, 'questions');
      setAnswers(Array(quiz.questions.length).fill(null));
    }
  }, [quiz]);

  // Handle errors
  useEffect(() => {
    if (error) {
      Alert.alert(text.error, error, [
        { text: text.goBack, onPress: () => router.back() }
      ]);
    }
  }, [error, text]);

  // Get quiz type information with bilingual support
  const getQuizTypeInfo = () => {
    if (sessionId && type === 'pre-lesson') {
      return {
        title: text.preAssessment.title,
        subtitle: text.preAssessment.subtitle,
        icon: '📝',
        color: isDark ? '#FF9800' : '#FF6B35',
        description: text.preAssessment.description
      };
    } else if (sessionId && type === 'post-lesson') {
      return {
        title: text.postAssessment.title,
        subtitle: text.postAssessment.subtitle,
        icon: '🎯',
        color: isDark ? '#4CAF50' : '#2E7D32',
        description: text.postAssessment.description
      };
    } else {
      return {
        title: text.knowledgeQuiz.title,
        subtitle: text.knowledgeQuiz.subtitle,
        icon: '🧠',
        color: isDark ? '#2196F3' : '#1976D2',
        description: text.knowledgeQuiz.description
      };
    }
  };

  // Quiz logic functions
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const goToNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex + 1]);
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < quiz.questions.length) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
      
      setCurrentQuestionIndex(index);
      setSelectedAnswer(newAnswers[index]);
    }
  };
  
  const calculateQuizStats = (finalAnswers) => {
    let correctCount = 0;
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    const detailedAnswers = finalAnswers.map((userAnswer, index) => {
      const question = quiz.questions[index];
      
      // Get correct answer from bilingual data
      let correctAnswer = question.correct_answer || question.answer;
      if (typeof correctAnswer === 'number' || !isNaN(correctAnswer)) {
        // If it's an index, get the actual option text
        const options = question.options?.[currentLanguage] || question.options?.en || question.options || [];
        if (Array.isArray(options) && options[correctAnswer]) {
          correctAnswer = options[correctAnswer];
        }
      }
      
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect) {
        correctCount++;
        totalScore += question.points || 10;
      } else if (question.penalty && question.penalty > 0) {
        totalScore -= question.penalty;
      }
      
      maxPossibleScore += question.points || 10;
      
      return {
        question_index: index,
        question_text: getBilingualText(question.question_text || question.question, 'Question'),
        user_answer: userAnswer,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
        points_earned: isCorrect ? (question.points || 10) : 0,
        penalty_applied: (!isCorrect && question.penalty) ? question.penalty : 0
      };
    });
    
    return {
      correct_answers: correctCount,
      total_score: Math.max(0, totalScore),
      max_possible_score: maxPossibleScore,
      detailed_answers: detailedAnswers
    };
  };
  
  const handleNextOrFinish = async () => {
    // Update answers array with selected answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    // If this is the last question, finish the quiz
    if (currentQuestionIndex === quiz.questions.length - 1) {
      const stats = calculateQuizStats(newAnswers);
      setScore(stats.total_score);
      
      console.log('🎯 Quiz completed, finalizing results');
      setQuizCompleted(true);
      await saveQuizResultToDatabase(newAnswers);
    } else {
      // Go to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex + 1] || null);
    }
  };
  
  const saveQuizResultToDatabase = async (finalAnswers) => {
    if (!user?.sub || isSavingResult || !mountedRef.current) return;
    
    setIsSavingResult(true);
    
    try {
      const quizEndTime = new Date();
      const timeTakenSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
      
      const stats = calculateQuizStats(finalAnswers);
      
      const getSessionType = (type, hasSession) => {
        if (!hasSession) return 'regular';
        
        switch (type) {
          case 'pre-lesson':
            return 'pre_study';
          case 'post-lesson':
            return 'post_study';
          default:
            return 'regular';
        }
      };
      
      const resultData = {
        user_id: user.sub,
        quiz_id: quizId,
        quiz_title: getBilingualText(quiz.title, quiz.title),
        total_questions: quiz.questions.length,
        correct_answers: stats.correct_answers,
        score: stats.total_score,
        max_score: stats.max_possible_score,
        answers: stats.detailed_answers,
        time_taken_seconds: timeTakenSeconds,
        session_type: getSessionType(type, !!sessionId),
        completed_at: quizEndTime.toISOString()
      };
      
      console.log('💾 Saving quiz result:', {
        score: stats.total_score,
        maxScore: stats.max_possible_score,
        sessionType: resultData.session_type,
        hasSession: !!sessionId
      });
      
      const savedResult = await saveQuizResult(resultData);
      
      if (savedResult && sessionId && mountedRef.current) {
        console.log('🔄 Updating learning session based on quiz type:', type);
        
        if (type === 'pre-lesson') {
          console.log('📝 Completing pre-quiz phase');
          await completePreQuiz(sessionId, savedResult.id);
          await startStudyPhase(sessionId);
        } else if (type === 'post-lesson') {
          console.log('🎯 Completing post-quiz phase');
          await completePostQuiz(sessionId, savedResult.id);
        }
      }
      
      if (savedResult) {
        console.log("✅ Quiz result saved successfully");
      } else {
        console.error("❌ Failed to save quiz result");
      }
    } catch (error) {
      console.error('❌ Error saving quiz result:', error);
    } finally {
      if (mountedRef.current) {
        setIsSavingResult(false);
      }
    }
  };
  
  const handleReturnToQuizzes = () => {
    if (sessionId && type === 'pre-lesson') {
      const topic = getTopic();
      console.log('📚 Navigating to lesson:', topic);
      router.replace(`/${topic}Lesson?sessionId=${sessionId}&quizId=${quizId}`);
    } else if (sessionId && type === 'post-lesson') {
      console.log('📊 Navigating to learning results');
      router.replace(`/learningResults?sessionId=${sessionId}`);
    } else {
      console.log('🏠 Returning to quizzes');
      router.replace('/quizzes');
    }
  };

  const getTopic = () => {
    const categorySlugMap = {
      'tiger': 'tiger',
      'tapir': 'tapir', 
      'turtle': 'turtle'
    };
    return categorySlugMap[quiz?.category?.toLowerCase()] || 'tiger';
  };
  
  const handleRetakeQuiz = () => {
    console.log('🔄 Retaking quiz - resetting state');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers(Array(quiz.questions.length).fill(null));
    setScore(0);
    setQuizCompleted(false);
    setIsSavingResult(false);
  };

  // 🔥 NEW: Language toggle handler
  const handleLanguageChange = (newLanguage) => {
    console.log('🌐 Language changed to:', newLanguage);
    setCurrentLanguage(newLanguage);
  };

  const quizTypeInfo = getQuizTypeInfo();
  
  // Loading state
  if (loading || !quiz) {
    return (
      <ThemedView style={styles.container}>
        <QuizHeader 
          title={text.loadingQuiz}
          onBack={() => router.back()}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={styles.loadingText}>{text.loadingQuiz}</ThemedText>
        </View>
      </ThemedView>
    );
  }
  
  // Results state
  if (quizCompleted) {
    const finalStats = calculateQuizStats(answers);
    
    return (
      <ThemedView style={styles.container}>
        <QuizHeader 
          title={text.results || 'Results'}
          onBack={() => router.back()}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          showResults={true}
        />
        
        <QuizResults
          quiz={quiz}
          finalStats={finalStats}
          currentLanguage={currentLanguage}
          quizTypeInfo={quizTypeInfo}
          sessionId={sessionId}
          isSavingResult={isSavingResult}
          onRetakeQuiz={handleRetakeQuiz}
          onReturnToQuizzes={handleReturnToQuizzes}
        />
      </ThemedView>
    );
  }
  
  // No questions state
  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <QuizHeader 
          title={quizTypeInfo.title}
          onBack={() => router.back()}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <View style={styles.center}>
          <ThemedText style={styles.errorIcon}>⚠️</ThemedText>
          <ThemedText style={[
            styles.errorText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.noQuestions}
          </ThemedText>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} 
            onPress={() => router.back()}
          >
            <ThemedText style={styles.primaryButtonText}>
              {text.goBack}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }
  
  // Main quiz interface
  return (
    <ThemedView style={styles.container}>
      <QuizHeader 
        title={quizTypeInfo.title}
        onBack={() => router.back()}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <QuizContent
        quiz={quiz}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswer={selectedAnswer}
        answers={answers}
        currentLanguage={currentLanguage}
        quizTypeInfo={quizTypeInfo}
        onSelectAnswer={handleSelectAnswer}
        onPreviousQuestion={goToPreviousQuestion}
        onNextQuestion={goToNextQuestion}
        onGoToQuestion={goToQuestion}
        onNextOrFinish={handleNextOrFinish}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
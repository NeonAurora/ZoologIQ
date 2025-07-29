// app/(main)/quizPlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useCertificate } from '@/contexts/CertificateContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from '@/hooks/useQuiz';
import { Colors } from '@/constants/Colors';
import { 
  saveQuizResult, 
  getPreTestScore, 
  savePostTestResult, 
  updatePreAssessmentStatus, 
  getCategoryIdBySlug 
} from '@/services/supabase';

// Import our quiz components
import QuizHeader from '@/components/quiz/QuizHeader';
import QuizContent from '@/components/quiz/QuizContent';
import QuizResults from '@/components/quiz/QuizResults';

export default function QuizPlayPage() {
  const { quizId, topic, type, fresh, t } = useLocalSearchParams();
  const router = useRouter();
  const { user, supabaseData } = useAuth();
  const { updateCertificateStatus } = useCertificate();
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
  const [preTestScore, setPreTestScore] = useState(null);
  const [improvementData, setImprovementData] = useState(null);
  
  // Language state (starts with user's preferred language)
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
      unlockingLesson: 'Unlocking lesson content...',
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
      unlockingLesson: 'Membuka kandungan pelajaran...',
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

  // 🔥 ENHANCED: More thorough state reset function
  const resetQuizState = () => {
    console.log('🧹 Performing complete state reset...');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setIsSavingResult(false);
    setPreTestScore(null);
    setImprovementData(null);
    
    // Force re-initialization of answers array on next quiz load
    // This ensures we start with a completely fresh state
    console.log('✅ State reset completed');
  };

  // ALL useEffect hooks must be at the top level - same order as original
  
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

  // 🔥 CONSOLIDATED STATE RESET - handles all cases with single effect
  useEffect(() => {
    // Create a unique key for this quiz session
    const sessionKey = `${quizId}-${type}-${topic}-${fresh}-${t}`;
    console.log('🧹 Quiz session started:', sessionKey);
    
    // Always reset state when any of these key parameters change
    if (quizId) {
      console.log('🧹 Resetting state for new quiz session:', {
        quizId,
        type,
        topic,
        fresh,
        timestamp: t
      });
      resetQuizState();
    }
  }, [quizId, type, topic, fresh, t]); // Consolidated dependencies

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

  // 🔥 IMPROVED: Initialize answers array when quiz loads with better safety checks
  useEffect(() => {
    if (quiz && quiz.questions && mountedRef.current) {
      console.log('🔧 Initializing answers array for', quiz.questions.length, 'questions');
      
      // Only initialize if we don't already have the correct array length
      // This prevents re-initialization mid-quiz
      if (answers.length !== quiz.questions.length) {
        console.log('🔧 Creating new answers array (length mismatch)');
        const freshAnswers = Array(quiz.questions.length).fill(null);
        setAnswers(freshAnswers);
      }
      
      // Safety check: ensure quiz isn't marked as completed for fresh quiz
      if (quizCompleted && (fresh === 'true' || !answers.some(a => a !== null))) {
        console.log('🧹 Resetting completion status for fresh quiz');
        setQuizCompleted(false);
      }
    }
  }, [quiz, fresh]); // Added fresh as dependency

  // Handle errors
  useEffect(() => {
    if (error) {
      Alert.alert(text.error, error, [
        { text: text.goBack, onPress: () => router.back() }
      ]);
    }
  }, [error, text]);

  // Auto-navigate to lesson after pre-test (moved here to maintain hook order)
  useEffect(() => {
    if (quizCompleted && type === 'pre-lesson' && !isSavingResult) {
      const timer = setTimeout(() => {
        handleReturnToQuizzes();
      }, 2000); // 2 second delay to show loading message
      
      return () => clearTimeout(timer);
    }
  }, [quizCompleted, type, isSavingResult]);

  // Get quiz type information with bilingual support
  const getQuizTypeInfo = () => {
    if (type === 'pre-lesson') {
      return {
        title: text.preAssessment.title,
        subtitle: text.preAssessment.subtitle,
        icon: '📝',
        color: isDark ? '#FF9800' : '#FF6B35',
        description: text.preAssessment.description
      };
    } else if (type === 'post-lesson') {
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
      
      // Get correct answer (should be index-based)
      let correctAnswer = question.correct_answer || question.answer;
      
      // Convert correct answer to number for comparison
      const correctAnswerIndex = parseInt(correctAnswer);
      
      // Compare indices directly (userAnswer is now an index from QuestionCard)
      const isCorrect = userAnswer === correctAnswerIndex;
      
      if (isCorrect) {
        correctCount++;
        totalScore += question.points || 10;
      } else if (question.penalty && question.penalty > 0) {
        totalScore -= question.penalty;
      }
      
      maxPossibleScore += question.points || 10;
      
      // Get option texts for display
      const options = question.options?.[currentLanguage] || question.options?.en || question.options || [];
      const userAnswerText = Array.isArray(options) && options[userAnswer] ? options[userAnswer] : `Option ${userAnswer}`;
      const correctAnswerText = Array.isArray(options) && options[correctAnswerIndex] ? options[correctAnswerIndex] : `Option ${correctAnswerIndex}`;

      return {
        question_index: index,
        question_text: getBilingualText(question.question_text || question.question, 'Question'),
        user_answer: userAnswerText,
        correct_answer: correctAnswerText,
        user_answer_index: userAnswer,
        correct_answer_index: correctAnswerIndex,
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
      
      // Get category ID if not available in quiz object
      let categoryId = quiz.category_id;
      if (!categoryId && topic) {
        categoryId = await getCategoryIdBySlug(topic);
      }
      
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
        session_type: type,
        category_id: categoryId,
        completed_at: quizEndTime.toISOString(),
        started_at: quizStartTime.toISOString()
      };
      
      console.log('💾 Saving quiz result:', {
        score: stats.total_score,
        maxScore: stats.max_possible_score,
        sessionType: type,
        quizType: type
      });
      
      let savedResult;
      
      if (type === 'pre-lesson') {
        // Save pre-assessment result and mark pre-assessment complete
        savedResult = await saveQuizResult(resultData);
        if (savedResult && topic) {
          await updatePreAssessmentStatus(user.sub, topic, true);
          console.log('✅ Pre-assessment completed for topic:', topic);
        }
      } else if (type === 'post-lesson') {
        // For post-tests, save with improvement calculation
        savedResult = await savePostTestResult(resultData);
        
        // 🎓 UPDATE CERTIFICATE STATUS AFTER POST-ASSESSMENT COMPLETION
        if (savedResult) {
          console.log('🎓 Post-assessment completed - updating certificate eligibility...');
          try {
            const certificateEligible = await updateCertificateStatus(user.sub);
            console.log('🎓 Certificate eligibility updated:', certificateEligible);
          } catch (certError) {
            console.error('❌ Error updating certificate status:', certError);
            // Don't throw error here, as quiz result was saved successfully
          }
        }
        
        // Get pre-test score for comparison
        if (categoryId) {
          console.log('🔍 Getting pre-test score for categoryId:', categoryId);
          const preScore = await getPreTestScore(user.sub, categoryId);
          if (preScore) {
            console.log('📊 Pre-test score found:', preScore.score);
            console.log('📊 Current post-test score:', stats.total_score);
            setPreTestScore(preScore.score);
            const improvement = stats.total_score - preScore.score;
            const maxScore = stats.max_possible_score;
            const improvementData = {
              preScore: preScore.score,
              postScore: stats.total_score,
              improvement: improvement,
              improvementPercentage: preScore.score > 0 ? ((improvement / preScore.score) * 100) : 0,
              prePercentage: (preScore.score / maxScore) * 100,
              postPercentage: (stats.total_score / maxScore) * 100
            };
            console.log('📈 Improvement data calculated:', improvementData);
            setImprovementData(improvementData);
          } else {
            console.log('❌ No pre-test score found for categoryId:', categoryId);
          }
        } else {
          console.log('❌ No categoryId available for improvement calculation');
        }
      } else {
        // Regular quiz
        savedResult = await saveQuizResult(resultData);
      }
      
      if (savedResult) {
        console.log("✅ Quiz result saved successfully");
      } else {
        console.error("❌ Failed to save quiz result");
      }
    } catch (error) {
      console.error('❌ Error saving quiz result:', error);
      Alert.alert('Database Error', `Session type error: ${error.message}`);
    } finally {
      if (mountedRef.current) {
        setIsSavingResult(false);
      }
    }
  };
  
  const handleReturnToQuizzes = () => {
    if (type === 'pre-lesson' && topic) {
      console.log('📚 Navigating to lesson after pre-test:', topic);
      // Navigate to appropriate lesson based on topic
      const lessonRoutes = {
        'tiger': '/tigerLesson',
        'tapir': '/tapirLesson', 
        'turtle': '/turtleLesson'
      };
      const lessonRoute = lessonRoutes[topic.toLowerCase()] || '/tigerLesson';
      router.replace(lessonRoute);
    } else {
      console.log('🏠 Returning to home');
      router.replace('/');
    }
  };
  
  const handleRetakeQuiz = () => {
    console.log('🔄 Retaking quiz - navigating to fresh instance');
    // Instead of just resetting state, navigate to a completely fresh instance
    const timestamp = Date.now();
    router.replace(`/quizPlay?quizId=${quizId}&type=${type}&topic=${topic}&fresh=true&t=${timestamp}`);
  };

  // Language toggle handler
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
  
  // For pre-tests, navigate directly to lesson without showing results
  // This follows the business rule: "Pre-test completion should navigate directly to lesson (no results shown)"
  if (quizCompleted && type === 'pre-lesson' && !isSavingResult) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={styles.loadingText}>{text.unlockingLesson}</ThemedText>
        </View>
      </ThemedView>
    );
  }
  
  // Results state for post-tests and regular quizzes
  if (quizCompleted && type !== 'pre-lesson') {
    const finalStats = calculateQuizStats(answers);
    
    return (
      <ThemedView style={styles.container}>
        <QuizHeader 
          title="Results"
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
          preTestScore={preTestScore}
          improvementData={improvementData}
          isSavingResult={isSavingResult}
          onRetakeQuiz={type === 'post-lesson' ? handleRetakeQuiz : null}
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
  
  // Main quiz interface with unique key to force remounting when needed
  const sessionKey = `${quizId}-${type}-${topic}-${t}`;
  
  return (
    <ThemedView key={sessionKey} style={styles.container}>
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
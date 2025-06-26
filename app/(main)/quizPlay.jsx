// /app/(main)/quizPlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  ActivityIndicator,
  Alert,
  Dimensions,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

// Component imports
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from '@/hooks/useQuiz';
import { Colors } from '@/constants/Colors';
import { completePreQuiz, completePostQuiz, startStudyPhase, saveQuizResult } from '@/services/supabase';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function QuizPlayPage() {
  const { quizId, sessionId, type, fresh } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { quiz, loading, error } = useQuiz(quizId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const mountedRef = useRef(true);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStartTime] = useState(new Date());
  const [isSavingResult, setIsSavingResult] = useState(false);
  
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
        'Authentication Required',
        'Please sign in to take quizzes',
        [
          { text: 'OK', onPress: () => router.replace('/') }
        ]
      );
    }
  }, [user, loading]);

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
      Alert.alert('Error', error, [
        { text: 'Go Back', onPress: () => router.back() }
      ]);
    }
  }, [error]);

  // Get quiz type information
  const getQuizTypeInfo = () => {
    if (sessionId && type === 'pre-lesson') {
      return {
        title: 'Pre-Assessment',
        subtitle: 'Test your current knowledge',
        icon: '📝',
        color: isDark ? '#FF9800' : '#FF6B35',
        description: 'This quiz will help us understand what you already know about the topic.'
      };
    } else if (sessionId && type === 'post-lesson') {
      return {
        title: 'Post-Assessment',
        subtitle: 'Show what you\'ve learned',
        icon: '🎯',
        color: isDark ? '#4CAF50' : '#2E7D32',
        description: 'Let\'s see how much you\'ve improved after the lesson!'
      };
    } else {
      return {
        title: 'Knowledge Quiz',
        subtitle: 'Test your understanding',
        icon: '🧠',
        color: isDark ? '#2196F3' : '#1976D2',
        description: 'Challenge yourself with this quiz.'
      };
    }
  };

  // Get current question
  const currentQuestion = quiz?.questions?.[currentQuestionIndex] || null;
  
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  // Navigation functions
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]); // Restore previous answer
    }
  };

  const goToNextQuestion = () => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex + 1]); // Load next answer if exists
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < quiz.questions.length) {
      // Save current answer first
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
      
      setCurrentQuestionIndex(index);
      setSelectedAnswer(newAnswers[index]); // Load answer for target question
    }
  };
  
  const calculateQuizStats = (finalAnswers) => {
    let correctCount = 0;
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    const detailedAnswers = finalAnswers.map((userAnswer, index) => {
      const question = quiz.questions[index];
      const isCorrect = userAnswer === question.answer;
      
      if (isCorrect) {
        correctCount++;
        totalScore += question.points || 10;
      } else if (question.penalty && question.penalty > 0) {
        totalScore -= question.penalty;
      }
      
      maxPossibleScore += question.points || 10;
      
      return {
        question_index: index,
        question_text: question.question,
        user_answer: userAnswer,
        correct_answer: question.answer,
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
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer', 'You must choose an answer before continuing.');
      return;
    }
    
    // Update answers array with selected answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    // If this is the last question, finish the quiz
    if (currentQuestionIndex === quiz.questions.length - 1) {
      // Calculate final score
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
      
      // Calculate final stats
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
        quiz_title: quiz.title,
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
        
        // Update learning session based on quiz type
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
      // Navigate to lesson after pre-quiz
      const topic = getTopic();
      console.log('📚 Navigating to lesson:', topic);
      router.replace(`/${topic}Lesson?sessionId=${sessionId}&quizId=${quizId}`);
    } else if (sessionId && type === 'post-lesson') {
      // Navigate to results after post-quiz
      console.log('📊 Navigating to learning results');
      router.replace(`/learningResults?sessionId=${sessionId}`);
    } else {
      // Regular quiz flow
      console.log('🏠 Returning to quizzes');
      router.replace('/quizzes');
    }
  };

  // Helper function to get topic from category
  const getTopic = () => {
    const categorySlugMap = {
      'tiger': 'tiger',
      'tapir': 'tapir', 
      'turtle': 'turtle'
    };
    return categorySlugMap[quiz?.category?.toLowerCase()] || 'tiger';
  };

  const getCompletionButtonText = () => {
    if (sessionId && type === 'pre-lesson') {
      return '📚 Start Lesson';
    } else if (sessionId && type === 'post-lesson') {
      return '📊 View Results';
    } else {
      return '🌟 More Quizzes';
    }
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

  // Helper function to get option letter
  const getOptionLetter = (questionIndex, answer) => {
    const question = quiz.questions[questionIndex];
    const optionIndex = question.options.indexOf(answer);
    return optionIndex !== -1 ? String.fromCharCode(65 + optionIndex) : '-';
  };

  const quizTypeInfo = getQuizTypeInfo();
  
  if (loading || !quiz) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar 
          barStyle={isDark ? 'light-content' : 'dark-content'} 
          backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={styles.loadingText}>Loading quiz...</ThemedText>
        </View>
      </ThemedView>
    );
  }
  
  if (quizCompleted) {
    const finalStats = calculateQuizStats(answers);
    const percentage = Math.round((finalStats.total_score / finalStats.max_possible_score) * 100);
    
    return (
      <ThemedView style={styles.container}>
        <StatusBar 
          barStyle={isDark ? 'light-content' : 'dark-content'} 
          backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
        />
        
        {/* Custom Header Results */}
        <View style={[
          styles.customHeader,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={[
              styles.backButtonText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              ←
            </ThemedText>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <ThemedText style={[
              styles.headerTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Results
            </ThemedText>
          </View>
          
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quiz Title and Subtitle */}
          <View style={styles.titleSection}>
            <ThemedText style={[
              styles.quizTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {quiz.title}
            </ThemedText>
            <ThemedText style={[
              styles.quizSubtitle,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {quizTypeInfo.subtitle}
            </ThemedText>
          </View>
          
          {/* Score Card */}
          <View style={[
            styles.scoreCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            }
          ]}>
            <View style={styles.scoreHeader}>
              <ThemedText style={[
                styles.scoreLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Your Score
              </ThemedText>
              <View style={[
                styles.scoreBadge,
                { backgroundColor: quizTypeInfo.color + '20' }
              ]}>
                <ThemedText style={[
                  styles.scoreBadgeText,
                  { color: quizTypeInfo.color }
                ]}>
                  {quizTypeInfo.title}
                </ThemedText>
              </View>
            </View>
            
            <ThemedText style={[
              styles.scoreValue,
              { color: quizTypeInfo.color }
            ]}>
              {finalStats.total_score}/{finalStats.max_possible_score}
            </ThemedText>
            
            <View style={[
              styles.percentageContainer,
              { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }
            ]}>
              <View 
                style={[
                  styles.percentageFill, 
                  { 
                    width: `${percentage}%`,
                    backgroundColor: quizTypeInfo.color
                  }
                ]} 
              />
            </View>
            
            <ThemedText style={[
              styles.percentageText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {percentage}%
            </ThemedText>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <ThemedText style={[
                  styles.statValue,
                  { color: '#4CAF50' }
                ]}>
                  {finalStats.correct_answers}
                </ThemedText>
                <ThemedText style={[
                  styles.statLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  Correct
                </ThemedText>
              </View>
              
              <View style={styles.statItem}>
                <ThemedText style={[
                  styles.statValue,
                  { color: '#FF5722' }
                ]}>
                  {quiz.questions.length - finalStats.correct_answers}
                </ThemedText>
                <ThemedText style={[
                  styles.statLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  Incorrect
                </ThemedText>
              </View>
              
              <View style={styles.statItem}>
                <ThemedText style={[
                  styles.statValue,
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  {quiz.questions.length}
                </ThemedText>
                <ThemedText style={[
                  styles.statLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  Total
                </ThemedText>
              </View>
            </View>
          </View>
          
          {/* 🔥 NEW: Answer Analysis Section */}
          <View style={[
            styles.analysisCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            }
          ]}>
            <ThemedText style={[
              styles.analysisTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              📋 Answer Analysis
            </ThemedText>
            
            <View style={styles.analysisHeader}>
              <ThemedText style={[styles.analysisHeaderText, { flex: 0.8 }]}>Q#</ThemedText>
              <ThemedText style={[styles.analysisHeaderText, { flex: 2 }]}>Your Answer</ThemedText>
              <ThemedText style={[styles.analysisHeaderText, { flex: 2 }]}>Correct Answer</ThemedText>
              <ThemedText style={[styles.analysisHeaderText, { flex: 1 }]}>Result</ThemedText>
            </View>
            
            {finalStats.detailed_answers.map((answer, index) => (
              <View 
                key={index}
                style={[
                  styles.analysisRow,
                  {
                    backgroundColor: answer.is_correct 
                      ? (isDark ? '#4CAF5020' : '#4CAF5015')
                      : (isDark ? '#F4433620' : '#F4433615'),
                    borderLeftColor: answer.is_correct ? '#4CAF50' : '#F44336'
                  }
                ]}
              >
                <View style={[styles.analysisCell, { flex: 0.8 }]}>
                  <ThemedText style={[
                    styles.analysisCellText,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {index + 1}
                  </ThemedText>
                </View>
                
                <View style={[styles.analysisCell, { flex: 2 }]}>
                  <View style={styles.answerContainer}>
                    <View style={[
                      styles.answerLetter,
                      { backgroundColor: answer.is_correct ? '#4CAF5030' : '#F4433630' }
                    ]}>
                      <ThemedText style={[
                        styles.answerLetterText,
                        { color: answer.is_correct ? '#4CAF50' : '#F44336' }
                      ]}>
                        {getOptionLetter(index, answer.user_answer)}
                      </ThemedText>
                    </View>
                    <ThemedText style={[
                      styles.answerText,
                      { color: isDark ? Colors.dark.text : Colors.light.text }
                    ]} numberOfLines={2}>
                      {answer.user_answer || 'No answer'}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={[styles.analysisCell, { flex: 2 }]}>
                  <View style={styles.answerContainer}>
                    <View style={[
                      styles.answerLetter,
                      { backgroundColor: '#4CAF5030' }
                    ]}>
                      <ThemedText style={[
                        styles.answerLetterText,
                        { color: '#4CAF50' }
                      ]}>
                        {getOptionLetter(index, answer.correct_answer)}
                      </ThemedText>
                    </View>
                    <ThemedText style={[
                      styles.answerText,
                      { color: isDark ? Colors.dark.text : Colors.light.text }
                    ]} numberOfLines={2}>
                      {answer.correct_answer}
                    </ThemedText>
                  </View>
                </View>
                
                <View style={[styles.analysisCell, { flex: 1 }]}>
                  <ThemedText style={[
                    styles.resultIcon,
                    { color: answer.is_correct ? '#4CAF50' : '#F44336' }
                  ]}>
                    {answer.is_correct ? '✓' : '✗'}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            {!sessionId && (
              <TouchableOpacity 
                style={[
                  styles.actionButton, 
                  styles.secondaryButton,
                  { 
                    borderColor: isDark ? Colors.dark.tint : Colors.light.tint,
                    backgroundColor: 'transparent'
                  }
                ]} 
                onPress={handleRetakeQuiz}
              >
                <ThemedText style={[
                  styles.secondaryButtonText,
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  🔄 Retake Quiz
                </ThemedText>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.primaryButton,
                { 
                  backgroundColor: quizTypeInfo.color,
                  flex: sessionId ? 1 : 1
                }
              ]} 
              onPress={handleReturnToQuizzes}
              disabled={isSavingResult}
            >
              <ThemedText style={styles.primaryButtonText}>
                {isSavingResult ? '⏳ Saving...' : getCompletionButtonText()}
              </ThemedText>
            </TouchableOpacity>
          </View>
          
          {isSavingResult && (
            <View style={styles.savingIndicator}>
              <ActivityIndicator size="small" color={quizTypeInfo.color} />
              <ThemedText style={[
                styles.savingText,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Saving your results...
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </ThemedView>
    );
  }
  
  // Handle case where quiz has no questions
  if (!currentQuestion || !quiz.questions || quiz.questions.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <StatusBar 
          barStyle={isDark ? 'light-content' : 'dark-content'} 
          backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
        />
        <View style={styles.center}>
          <ThemedText style={styles.errorIcon}>⚠️</ThemedText>
          <ThemedText style={[
            styles.errorText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            This quiz has no questions
          </ThemedText>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} 
            onPress={() => router.back()}
          >
            <ThemedText style={styles.primaryButtonText}>
              Go Back
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }
  
  return (
    <ThemedView style={styles.container}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
      />
      
      {/* Custom Header */}
      <View style={[
        styles.customHeader,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={[
            styles.backButtonText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            ←
          </ThemedText>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <ThemedText style={[
            styles.headerTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {quizTypeInfo.title}
          </ThemedText>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Quiz Title and Subtitle */}
        <View style={styles.titleSection}>
          <ThemedText style={[
            styles.quizTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {quiz.title}
          </ThemedText>
          <ThemedText style={[
            styles.quizSubtitle,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {quizTypeInfo.subtitle}
          </ThemedText>
        </View>

        {/* Question Navigation */}
        <View style={styles.navigationContainer}>
          {/* Previous Chevron */}
          <TouchableOpacity
            style={[
              styles.chevronButton,
              currentQuestionIndex === 0 && styles.chevronDisabled
            ]}
            onPress={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ThemedText style={[
              styles.chevronText,
              { color: currentQuestionIndex === 0 
                ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                : quizTypeInfo.color
              }
            ]}>
              ‹
            </ThemedText>
          </TouchableOpacity>

          {/* Question Dots (show up to 5) */}
          <View style={styles.questionDots}>
            {quiz.questions.slice(0, 5).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.questionDot,
                  {
                    backgroundColor: currentQuestionIndex === index
                      ? quizTypeInfo.color
                      : (answers[index] !== null && answers[index] !== undefined)
                        ? quizTypeInfo.color + '40'
                        : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
                  }
                ]}
                onPress={() => goToQuestion(index)}
              >
                <ThemedText style={[
                  styles.questionDotText,
                  {
                    color: currentQuestionIndex === index
                      ? '#fff'
                      : (answers[index] !== null && answers[index] !== undefined)
                        ? quizTypeInfo.color
                        : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                  }
                ]}>
                  {index + 1}
                </ThemedText>
              </TouchableOpacity>
            ))}
            
            {/* Show more indicator if more than 5 questions */}
            {quiz.questions.length > 5 && (
              <View style={[
                styles.moreIndicator,
                { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
              ]}>
                <ThemedText style={[
                  styles.moreIndicatorText,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  +{quiz.questions.length - 5}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Next Chevron */}
          <TouchableOpacity
            style={[
              styles.chevronButton,
              currentQuestionIndex === quiz.questions.length - 1 && styles.chevronDisabled
            ]}
            onPress={goToNextQuestion}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            <ThemedText style={[
              styles.chevronText,
              { color: currentQuestionIndex === quiz.questions.length - 1
                ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                : quizTypeInfo.color
              }
            ]}>
              ›
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        {/* Question Section */}
        <View style={[
          styles.questionSection,
          { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
        ]}>
          <ThemedText style={[
            styles.questionText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {currentQuestion.question}
          </ThemedText>
          
          {/* Question image if exists */}
          {currentQuestion.image && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: currentQuestion.image }} 
                style={styles.questionImage}
                resizeMode="cover"
              />
            </View>
          )}
          
          {/* Points indicator */}
          <View style={styles.pointsContainer}>
            <View style={[
              styles.pointsBadge,
              { backgroundColor: quizTypeInfo.color + '20' }
            ]}>
              <ThemedText style={[
                styles.pointsText,
                { color: quizTypeInfo.color }
              ]}>
                +{currentQuestion.points || 10} points
              </ThemedText>
            </View>
            {currentQuestion.penalty > 0 && (
              <View style={[
                styles.penaltyBadge,
                { backgroundColor: '#FF572220' }
              ]}>
                <ThemedText style={[
                  styles.penaltyText,
                  { color: '#FF5722' }
                ]}>
                  -{currentQuestion.penalty} penalty
                </ThemedText>
              </View>
            )}
          </View>
        </View>
        
        {/* Answer Options */}
        <View style={styles.optionsSection}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { 
                  borderColor: selectedAnswer === option 
                    ? quizTypeInfo.color
                    : (isDark ? Colors.dark.border : Colors.light.border),
                  backgroundColor: selectedAnswer === option 
                    ? quizTypeInfo.color + '15'
                    : (isDark ? Colors.dark.surface : Colors.light.surface),
                }
              ]}
              onPress={() => handleSelectAnswer(option)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionLetter,
                  { 
                    backgroundColor: selectedAnswer === option 
                      ? quizTypeInfo.color
                      : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                    borderColor: selectedAnswer === option 
                      ? quizTypeInfo.color
                      : 'transparent'
                  }
                ]}>
                  <ThemedText style={[
                    styles.optionLetterText,
                    { 
                      color: selectedAnswer === option 
                        ? '#fff'
                        : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                    }
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </ThemedText>
                </View>
                <ThemedText style={[
                  styles.optionText,
                  { 
                    color: isDark ? Colors.dark.text : Colors.light.text,
                    fontWeight: selectedAnswer === option ? '500' : 'normal'
                  }
                ]}>
                  {option}
                </ThemedText>
                {selectedAnswer === option && (
                  <ThemedText style={[
                    styles.selectedIcon,
                    { color: quizTypeInfo.color }
                  ]}>
                    ✓
                  </ThemedText>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Fixed Bottom Button */}
      <View style={[
        styles.bottomButtonContainer,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <TouchableOpacity 
          style={[
            styles.bottomButton,
            { 
              backgroundColor: selectedAnswer === null 
                ? (isDark ? Colors.dark.backgroundSecondary : '#E0E0E0')
                : quizTypeInfo.color
            }
          ]}
          onPress={handleNextOrFinish}
          disabled={selectedAnswer === null}
          activeOpacity={0.8}
        >
          <ThemedText style={[
            styles.bottomButtonText,
            { 
              color: selectedAnswer === null 
                ? (isDark ? Colors.dark.textMuted : '#999')
                : '#fff'
            }
          ]}>
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
          </ThemedText>
        </TouchableOpacity>
      </View>
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
  
  // Custom Header
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 35, // 🔥 ADDED: 35px margin top
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'left',
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerIconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignContent: 'left',
  },
  headerSpacer: {
    width: 40,
  },
  
  // Content
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 100, // Space for fixed button
  },
  
  // Title Section
  titleSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  // Navigation Container
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  chevronButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronDisabled: {
    opacity: 0.3,
  },
  chevronText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  questionDots: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  questionDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  questionDotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  moreIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  moreIndicatorText: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Question Section
  questionSection: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  questionImage: {
    width: '100%',
    height: 180,
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  pointsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  penaltyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  penaltyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Options Section
  optionsSection: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
  },
  selectedIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Bottom Button
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  bottomButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Results Content
  resultsContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  resultsHeader: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  completionMessage: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  
  // Score Card
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  percentageContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  percentageFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  
  // 🔥 NEW: Answer Analysis Section
  analysisCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  analysisHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
  },
  analysisRow: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  analysisCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisCellText: {
    fontSize: 14,
    fontWeight: '600',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  answerLetter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerLetterText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 13,
    flex: 1,
  },
  resultIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    // backgroundColor set dynamically
  },
  secondaryButton: {
    borderWidth: 1.5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  
  // Saving Indicator
  savingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  savingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
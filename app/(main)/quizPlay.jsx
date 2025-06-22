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
  
  // USE REF TO TRACK COMPONENT MOUNT STATE
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
  
  const handleNextQuestion = async () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer', 'You must choose an answer before continuing.');
      return;
    }
    
    // Update answers array with selected answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    // Calculate score for this question
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + (currentQuestion.points || 10));
    } else if (currentQuestion.penalty) {
      setScore(prev => Math.max(0, prev - (currentQuestion.penalty || 0)));
    }
    
    // Clear selected answer
    setSelectedAnswer(null);
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < (quiz.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed - finalize and save
      console.log('🎯 Quiz completed, finalizing results');
      setQuizCompleted(true);
      await saveQuizResultToDatabase(newAnswers);
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

  const getCompletionTitle = () => {
    if (sessionId && type === 'pre-lesson') {
      return '✅ Pre-Assessment Complete!';
    } else if (sessionId && type === 'post-lesson') {
      return '🎯 Post-Assessment Complete!';
    } else {
      return '🎉 Quiz Completed!';
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
        <ScrollView 
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Results Header */}
          <View style={[
            styles.resultsHeader,
            { backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary }
          ]}>
            <ThemedText style={styles.resultsIcon}>
              {quizTypeInfo.icon}
            </ThemedText>
            <ThemedText type="title" style={styles.resultTitle}>
              {getCompletionTitle()}
            </ThemedText>
            
            {sessionId && (
              <ThemedText style={[
                styles.completionMessage,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {type === 'pre-lesson' 
                  ? "Great job! Now let's dive into the lesson to learn more about this topic."
                  : "Excellent! Let's see how much you've improved after the lesson."
                }
              </ThemedText>
            )}
          </View>
          
          {/* Score Card */}
          <View style={[
            styles.scoreCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              shadowColor: isDark ? '#000' : '#000',
              shadowOpacity: isDark ? 0.3 : 0.1,
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
      
      {/* Quiz Header */}
      <View style={[
        styles.quizHeader,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <View style={styles.headerContent}>
          <View style={styles.quizTypeContainer}>
            <ThemedText style={[styles.quizTypeIcon, { color: quizTypeInfo.color }]}>
              {quizTypeInfo.icon}
            </ThemedText>
            <View style={styles.quizTypeInfo}>
              <ThemedText style={[
                styles.quizTypeTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {quizTypeInfo.title}
              </ThemedText>
              <ThemedText style={[
                styles.quizTypeSubtitle,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {quizTypeInfo.subtitle}
              </ThemedText>
            </View>
          </View>
          
          <ThemedText style={[
            styles.quizTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {quiz.title}
          </ThemedText>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Section */}
        <View style={[
          styles.progressSection,
          { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
        ]}>
          <View style={styles.progressHeader}>
            <ThemedText style={[
              styles.progressLabel,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </ThemedText>
            <ThemedText style={[
              styles.progressPercentage,
              { color: quizTypeInfo.color }
            ]}>
              {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%
            </ThemedText>
          </View>
          
          <View style={[
            styles.progressBar,
            { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }
          ]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                  backgroundColor: quizTypeInfo.color
                }
              ]} 
            />
          </View>
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
                  shadowColor: selectedAnswer === option ? quizTypeInfo.color : '#000',
                  shadowOpacity: selectedAnswer === option ? 0.2 : (isDark ? 0.3 : 0.1),
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
                    color: selectedAnswer === option 
                      ? (isDark ? Colors.dark.text : Colors.light.text)
                      : (isDark ? Colors.dark.text : Colors.light.text),
                    fontWeight: selectedAnswer === option ? '600' : 'normal'
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
            styles.nextButton,
            { 
              backgroundColor: selectedAnswer === null 
                ? (isDark ? Colors.dark.backgroundSecondary : '#E0E0E0')
                : quizTypeInfo.color
            }
          ]}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
          activeOpacity={0.8}
        >
          <ThemedText style={[
            styles.nextButtonText,
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
  
  // Quiz Header
  quizHeader: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    gap: 12,
  },
  quizTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quizTypeIcon: {
    fontSize: 24,
  },
  quizTypeInfo: {
    flex: 1,
  },
  quizTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizTypeSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Content
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Space for fixed button
    gap: 20,
  },
  
  // Progress Section
  progressSection: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  // Question Section
  questionSection: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  questionImage: {
    width: '100%',
    height: 200,
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  pointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  penaltyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  penaltyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Options Section
  optionsSection: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  optionLetterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  selectedIcon: {
    fontSize: 20,
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
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Results Content
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 24,
  },
  resultsHeader: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  resultTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  completionMessage: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  
  // Score Card
  scoreCard: {
    borderRadius: 20,
    padding: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  percentageContainer: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  percentageFill: {
    height: '100%',
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  
  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    // backgroundColor set dynamically
  },
  secondaryButton: {
    borderWidth: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Saving Indicator
  savingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  savingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
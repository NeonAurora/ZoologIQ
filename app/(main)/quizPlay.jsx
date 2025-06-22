// /app/(main)/quizPlay.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

// Updated imports - using centralized services
import { saveQuizResult } from '@/services/supabase';

// Component imports
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from '@/hooks/useQuiz';
import { Colors } from '@/constants/Colors';
import { completePreQuiz, completePostQuiz } from '@/services/supabase';

const windowWidth = Dimensions.get('window').width;

export default function QuizPlayPage() {
  const { quizId, sessionId, type } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { quiz, loading, error } = useQuiz(quizId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStartTime] = useState(new Date());
  const [isSavingResult, setIsSavingResult] = useState(false);
  
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
    if (quiz && quiz.questions) {
      setAnswers(Array(quiz.questions.length || 0).fill(null));
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

  useEffect(() => {
    if (type === 'post-lesson') {
      // Reset all state for fresh post-quiz
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setQuizCompleted(false);
      setIsSavingResult(false);
      // Answers will be reset when quiz loads
    }
  }, [type]);

  // Get current question
  const currentQuestion = quiz?.questions?.[currentQuestionIndex] || null;
  
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };
  
  const calculateQuizStats = () => {
    let correctCount = 0;
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    const detailedAnswers = answers.map((userAnswer, index) => {
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
      total_score: Math.max(0, totalScore), // Don't allow negative scores
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
      // Quiz completed - calculate final stats and save
      const finalAnswers = [...newAnswers];
      setAnswers(finalAnswers);
      setQuizCompleted(true);
      
      // Save result with complete data
      await saveQuizResultToDatabase(finalAnswers);
    }
  };
  
  // In your quizPlay.jsx, update this part:
  const saveQuizResultToDatabase = async (finalAnswers) => {
    if (!user?.sub || isSavingResult) return;
    
    setIsSavingResult(true);
    
    try {
      const quizEndTime = new Date();
      const timeTakenSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
      
      // Calculate final stats
      const stats = calculateQuizStats();
      
      // 🔥 FIX: Map URL parameter values to database values
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
        session_type: getSessionType(type, !!sessionId), // 🔥 FIXED
        completed_at: quizEndTime.toISOString()
      };
      
      console.log('Saving quiz result:', resultData);
      
      const savedResult = await saveQuizResult(resultData);
      
      if (savedResult && sessionId) {
        // Update learning session based on quiz type
        if (type === 'pre-lesson') {
          await completePreQuiz(sessionId, savedResult.id);
        } else if (type === 'post-lesson') {
          await completePostQuiz(sessionId, savedResult.id);
        }
      }
      
      if (savedResult) {
        console.log("Quiz result saved successfully:", savedResult);
      } else {
        console.error("Failed to save quiz result");
      }
    } catch (error) {
      console.error('Error saving quiz result:', error);
    } finally {
      setIsSavingResult(false);
    }
  };
  
  // Modify the result screen navigation
  const handleReturnToQuizzes = () => {
    if (sessionId && type === 'pre-lesson') {
      // Navigate to lesson after pre-quiz
      router.replace(`/${getTopic()}Lesson?sessionId=${sessionId}&quizId=${quizId}`);
    } else if (sessionId && type === 'post-lesson') {
      // Navigate to results after post-quiz
      router.replace(`/learningResults?sessionId=${sessionId}`);
    } else {
      // Regular quiz flow
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
      return '📚 Take a Brief Lesson';
    } else if (sessionId && type === 'post-lesson') {
      return '📊 View Your Progress';
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
    // Reset all state
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers(Array(quiz.questions.length).fill(null));
    setScore(0);
    setQuizCompleted(false);
  };
  
  if (loading || !quiz) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={styles.loadingText}>Loading quiz...</ThemedText>
      </ThemedView>
    );
  }
  
  if (quizCompleted) {
    const finalStats = calculateQuizStats();
    const percentage = Math.round((finalStats.total_score / finalStats.max_possible_score) * 100);
    
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="title" style={styles.resultTitle}>
            {getCompletionTitle()}
          </ThemedText>

          {sessionId && type === 'pre-lesson' && (
            <ThemedText style={[
              styles.completionMessage,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Great job! Now let's dive into the lesson to learn more about this topic.
            </ThemedText>
          )}
          
          {sessionId && type === 'post-lesson' && (
            <ThemedText style={[
              styles.completionMessage,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Excellent! Let's see how much you've improved after the lesson.
            </ThemedText>
          )}
          
          <View style={[
            styles.scoreCard,
            { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
          ]}>
            <ThemedText style={[
              styles.scoreLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Your Score
            </ThemedText>
            <ThemedText style={[
              styles.scoreValue,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
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
                  { width: `${percentage}%` },
                  percentage < 50 ? styles.percentageLow :
                  percentage < 75 ? styles.percentageMedium :
                  styles.percentageHigh
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
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
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
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
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
          
          <View style={styles.buttonRow}>
            {/* 🔥 UPDATE: Show retake only for non-session quizzes */}
            {!sessionId && (
              <TouchableOpacity 
                style={[
                  styles.button, 
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
                  Retake Quiz
                </ThemedText>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.primaryButton,
                { 
                  backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
                  flex: sessionId ? 1 : 1 // Full width if no retake button
                }
              ]} 
              onPress={handleReturnToQuizzes}
            >
              <ThemedText style={styles.primaryButtonText}>
                {getCompletionButtonText()} {/* 🔥 UPDATED */}
              </ThemedText>
            </TouchableOpacity>
          </View>
          
          {isSavingResult && (
            <View style={styles.savingIndicator}>
              <ActivityIndicator size="small" color={isDark ? Colors.dark.tint : Colors.light.tint} />
              <ThemedText style={[
                styles.savingText,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Saving result...
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
      <ThemedView style={styles.center}>
        <ThemedText style={[
          styles.errorText,
          { color: isDark ? Colors.dark.error : Colors.light.error }
        ]}>
          This quiz has no questions
        </ThemedText>
        <TouchableOpacity 
          style={[
            styles.button,
            { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }
          ]} 
          onPress={() => router.back()}
        >
          <ThemedText style={[
            styles.buttonText,
            { color: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}>
            Go Back
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={[
            styles.progressBar,
            { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }
          ]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                  backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint
                }
              ]} 
            />
          </View>
          <ThemedText style={[
            styles.progressText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {currentQuestionIndex + 1} of {quiz.questions.length}
          </ThemedText>
        </View>
        
        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText style={[
            styles.questionText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {currentQuestion.question}
          </ThemedText>
          
          {/* Question image if exists */}
          {currentQuestion.image && (
            <Image 
              source={{ uri: currentQuestion.image }} 
              style={styles.questionImage}
              resizeMode="cover"
            />
          )}
          
          {/* Points indicator */}
          <View style={styles.pointsIndicator}>
            <ThemedText style={[
              styles.pointsText,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}>
              {currentQuestion.points || 10} points
            </ThemedText>
            {currentQuestion.penalty > 0 && (
              <ThemedText style={[
                styles.penaltyText,
                { color: isDark ? Colors.dark.error : Colors.light.error }
              ]}>
                -{currentQuestion.penalty} for wrong answer
              </ThemedText>
            )}
          </View>
        </View>
        
        {/* Answer options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { 
                  borderColor: selectedAnswer === option 
                    ? (isDark ? Colors.dark.tint : Colors.light.tint)
                    : (isDark ? Colors.dark.border : Colors.light.border),
                  backgroundColor: selectedAnswer === option 
                    ? (isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary)
                    : (isDark ? Colors.dark.surface : Colors.light.surface)
                }
              ]}
              onPress={() => handleSelectAnswer(option)}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionLetter,
                  { 
                    backgroundColor: selectedAnswer === option 
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
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
                    fontWeight: selectedAnswer === option ? '600' : 'normal'
                  }
                ]}>
                  {option}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Next button */}
        <TouchableOpacity 
          style={[
            styles.nextButton,
            { 
              backgroundColor: selectedAnswer === null 
                ? (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
                : (isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary)
            }
          ]}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          <ThemedText style={[
            styles.nextButtonText,
            { 
              color: selectedAnswer === null 
                ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                : (isDark ? Colors.dark.tint : Colors.light.tint)
            }
          ]}>
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
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
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 60,
  },
  
  // Question
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 28,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  pointsIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  penaltyText: {
    fontSize: 14,
  },
  
  // Options
  optionsContainer: {
    marginBottom: 24,
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  
  // Buttons
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Results page
  resultTitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 10,
  },
  percentageContainer: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  percentageFill: {
    height: '100%',
  },
  percentageLow: {
    backgroundColor: '#e74c3c',
  },
  percentageMedium: {
    backgroundColor: '#f39c12',
  },
  percentageHigh: {
    backgroundColor: '#2ecc71',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    // backgroundColor is set dynamically
  },
  secondaryButton: {
    borderWidth: 2,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  savingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  savingText: {
    fontSize: 14,
  },
  completionMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
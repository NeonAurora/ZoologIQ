// app/(main)/quiz/[id]/play.jsx
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
import { database } from '@/services/firebase/database';
import { ref, push, set } from 'firebase/database';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/hooks/useQuiz';

const windowWidth = Dimensions.get('window').width;

export default function QuizPlayPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { quiz, loading, error } = useQuiz(id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      Alert.alert('Please sign in to take quizzes');
      router.replace('/');
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
      Alert.alert('Error', error);
      router.back();
    }
  }, [error]);
  
  // Get current question
  const currentQuestion = quiz?.questions?.[currentQuestionIndex] || null;
  
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };
  
  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer before continuing');
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
      setScore(prev => prev - (currentQuestion.penalty || 0));
    }
    
    // Clear selected answer
    setSelectedAnswer(null);
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < (quiz.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      saveQuizResult();
    }
  };
  
  const saveQuizResult = async () => {
    try {
      if (!user?.sub) return;
      
      const resultRef = push(ref(database, `results/${user.sub}`));
      const resultData = {
        quizId: id,
        quizTitle: quiz.title,
        score: score,
        maxScore: quiz.questions.reduce((total, q) => total + (q.points || 10), 0),
        answers: answers,
        completedAt: new Date().toISOString(),
      };
      
      await set(resultRef, resultData);
      console.log("Quiz result saved successfully");
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };
  
  const handleReturnToQuizzes = () => {
    router.replace('/quizzes');
  };
  
  if (loading || !quiz) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading quiz...</ThemedText>
      </ThemedView>
    );
  }
  
  if (quizCompleted) {
    // Calculate percentage and max possible score
    const maxScore = quiz.questions.reduce((total, q) => total + (q.points || 10), 0);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="title" style={styles.resultTitle}>Quiz Completed!</ThemedText>
          
          <View style={styles.scoreCard}>
            <ThemedText style={styles.scoreLabel}>Your Score</ThemedText>
            <ThemedText style={styles.scoreValue}>{score}/{maxScore}</ThemedText>
            <View style={styles.percentageContainer}>
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
            <ThemedText style={styles.percentageText}>{percentage}%</ThemedText>
          </View>
          
          <TouchableOpacity 
            style={styles.returnButton} 
            onPress={handleReturnToQuizzes}
          >
            <ThemedText style={styles.returnButtonText}>Return to Quizzes</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    );
  }
  
  // Handle case where quiz has no questions
  if (!currentQuestion || !quiz.questions || quiz.questions.length === 0) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.errorText}>This quiz has no questions</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(currentQuestionIndex / quiz.questions.length) * 100}%` }
              ]} 
            />
          </View>
          <ThemedText style={styles.progressText}>
            {currentQuestionIndex + 1}/{quiz.questions.length}
          </ThemedText>
        </View>
        
        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText style={styles.questionText}>{currentQuestion.question}</ThemedText>
          
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
            <ThemedText style={styles.pointsText}>
              {currentQuestion.points || 10} points
            </ThemedText>
            {currentQuestion.penalty > 0 && (
              <ThemedText style={styles.penaltyText}>
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
                selectedAnswer === option && styles.selectedOption
              ]}
              onPress={() => handleSelectAnswer(option)}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionLetter}>
                  <ThemedText style={styles.optionLetterText}>
                    {String.fromCharCode(65 + index)}
                  </ThemedText>
                </View>
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Next button */}
        <TouchableOpacity 
          style={[
            styles.nextButton,
            selectedAnswer === null && styles.disabledButton
          ]}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          <ThemedText style={styles.nextButtonText}>
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
    color: '#e74c3c',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0a7ea4',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
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
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  penaltyText: {
    fontSize: 14,
    color: '#e74c3c',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  selectedOption: {
    borderColor: '#0a7ea4',
    backgroundColor: '#e1f5fe',
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
    backgroundColor: '#eee',
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
  },
  nextButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Results page styles
  resultTitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: '#f5f8ff',
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
    opacity: 0.7,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 16,
  },
  percentageContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
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
  },
  returnButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  returnButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
// components/learning/LearningSessionStarter.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { 
  checkSessionAvailability, 
  createLearningSession, 
  getNextAction 
} from '@/services/supabase/learningSessionService';
import { getCategoryBySlug } from '@/services/supabase/categoryService';

export default function LearningSessionStarter({ topic, quizId }) {
  const { user } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [sessionState, setSessionState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (user && topic) {
      checkExistingSession();
    }
  }, [user, topic]);

  const checkExistingSession = async () => {
    try {
      setLoading(true);
      
      // Get category info
      const categoryData = await getCategoryBySlug(topic);
      setCategory(categoryData);
      
      // Check for existing session
      const availability = await checkSessionAvailability(user.sub, categoryData.id);
      setSessionState(availability);
    } catch (error) {
      console.error('Error checking session availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewSession = async () => {
    try {
      const session = await createLearningSession(user.sub, category.id, quizId);
      
      if (session) {
        // Navigate to pre-quiz
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}`);
      } else {
        Alert.alert('Error', 'Could not create learning session. Please try again.');
      }
    } catch (error) {
      console.error('Error starting session:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleContinueSession = () => {
    const session = sessionState.activeSession;
    const nextAction = sessionState.nextAction;
    
    switch (nextAction) {
      case 'take_pre_quiz':
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}`);
        break;
      case 'start_lesson':
        router.push(`/${topic}Lesson?sessionId=${session.id}`);
        break;
      case 'continue_lesson':
        router.push(`/${topic}Lesson?sessionId=${session.id}`);
        break;
      case 'take_post_quiz':
        router.push(`/quizPlay?sessionId=${session.id}&type=post-lesson&quizId=${quizId}`);
        break;
      case 'view_results':
        router.push(`/learningResults?sessionId=${session.id}`);
        break;
      default:
        handleStartNewSession();
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[
          styles.loadingText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Loading...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText 
        type="title"
        style={[
          styles.title,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}
      >
        Learn About {category?.name || topic}
      </ThemedText>
      
      {sessionState?.canStartNew ? (
        <View style={[
          styles.newSessionCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
          }
        ]}>
          <ThemedText style={[
            styles.description,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Start a complete learning journey with pre-quiz, lesson, and post-quiz to track your improvement!
          </ThemedText>
          
          <TouchableOpacity 
            style={[
              styles.startButton,
              { backgroundColor: isDark ? '#45a049' : '#4CAF50' }
            ]} 
            onPress={handleStartNewSession}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>
              🚀 Start Learning Journey
            </ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[
          styles.continueSessionCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
          }
        ]}>
          <ThemedText style={[
            styles.description,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            You have an active learning session. Continue where you left off:
          </ThemedText>
          
          <SessionProgressIndicator session={sessionState.activeSession} isDark={isDark} />
          
          <TouchableOpacity 
            style={[
              styles.continueButton,
              { backgroundColor: isDark ? '#1976D2' : '#2196F3' }
            ]} 
            onPress={handleContinueSession}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>
              ▶️ Continue Learning
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
}

// Helper component for session progress
function SessionProgressIndicator({ session, isDark }) {
  const getStepStatus = (status) => {
    const steps = ['started', 'pre_quiz_completed', 'studying', 'study_completed', 'post_quiz_completed'];
    const currentIndex = steps.indexOf(status);
    
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const steps = getStepStatus(session.session_status);
  
  return (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => (
        <View key={step.step} style={styles.progressStep}>
          <View style={[
            styles.progressDot,
            { 
              backgroundColor: isDark ? Colors.dark.backgroundTertiary : '#e0e0e0'
            },
            step.completed && {
              backgroundColor: isDark ? '#45a049' : '#4CAF50'
            },
            step.active && {
              backgroundColor: isDark ? '#1976D2' : '#2196F3'
            }
          ]} />
          <ThemedText style={[
            styles.progressLabel,
            { 
              color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary 
            },
            step.completed && {
              color: isDark ? Colors.dark.text : Colors.light.text,
              fontWeight: 'bold'
            }
          ]}>
            {getStepLabel(step.step)}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

function getStepLabel(status) {
  const labels = {
    'started': 'Pre-Quiz',
    'pre_quiz_completed': 'Lesson',
    'studying': 'Lesson',
    'study_completed': 'Post-Quiz',
    'post_quiz_completed': 'Results'
  };
  return labels[status] || status;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  newSessionCard: {
    padding: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueSessionCard: {
    padding: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  startButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 60,
  },
});
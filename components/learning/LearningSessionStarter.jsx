import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { 
  checkSessionAvailability, 
  createLearningSession, 
  getNextAction,
  getUserCompletedSessions,
  abandonSession
} from '@/services/supabase/learningSessionService';
import { getCategoryBySlug } from '@/services/supabase/categoryService';

export default function LearningSessionStarter({ topic, quizId }) {
  const { user } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [sessionState, setSessionState] = useState(null);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // 🔥 REF TO TRACK IF WE SHOULD SKIP FOCUS RELOAD
  const skipNextFocusReload = useRef(false);

  const loadSessionData = useCallback(async () => {
    if (!user || !topic || isNavigating) return;
    
    try {
      setLoading(true);
      console.log('🔄 Refreshing session data for topic:', topic);
      
      // Get category info
      const categoryData = await getCategoryBySlug(topic);
      setCategory(categoryData);
      
      if (categoryData) {
        // Check for existing session
        const availability = await checkSessionAvailability(user.sub, categoryData.id);
        setSessionState(availability);
        
        // Get completed sessions for this topic
        const completed = await getUserCompletedSessions(user.sub, categoryData.id);
        setCompletedSessions(completed);
        
        console.log('✅ Session data refreshed:', {
          canStartNew: availability.canStartNew,
          activeSession: !!availability.activeSession,
          completedCount: completed.length
        });
      }
    } catch (error) {
      console.error('Error loading session data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, topic, isNavigating]);

  // 🔥 SMARTER FOCUS EFFECT - SKIP AFTER NAVIGATION
  useFocusEffect(
    useCallback(() => {
      // 🔥 CHECK IF WE SHOULD SKIP THIS RELOAD
      if (skipNextFocusReload.current) {
        console.log('🚫 Skipping focus reload - just navigated');
        skipNextFocusReload.current = false;
        return;
      }

      if (isNavigating) {
        console.log('🚫 Skipping focus reload - currently navigating');
        return;
      }

      console.log('🎯 LearningSessionStarter focused - loading fresh data');
      loadSessionData();
    }, [loadSessionData, isNavigating])
  );

  // 🔥 INITIAL LOAD
  useEffect(() => {
    if (user && topic && !isNavigating) {
      console.log('🚀 Initial mount - loading session data');
      loadSessionData();
    }
  }, [user, topic, loadSessionData, isNavigating]);

  const handleStartNewSession = async (shouldAbandonCurrent = false) => {
    try {
      setIsNavigating(true);
      
      // If there's an active session and user wants to start new, abandon it
      if (shouldAbandonCurrent && sessionState?.activeSession) {
        await abandonSession(sessionState.activeSession.id);
      }
      
      const session = await createLearningSession(user.sub, category.id, quizId);
      
      if (session) {
        // 🔥 CLEAR SESSION STATE TO PREVENT INTERFERENCE
        setSessionState(null);
        
        // 🔥 SET FLAG TO SKIP NEXT FOCUS RELOAD
        skipNextFocusReload.current = true;
        
        const timestamp = Date.now();
        console.log('🚀 Navigating to FRESH pre-quiz with timestamp:', timestamp);
        console.log('🧹 Cleared session state to prevent interference');
        
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}&t=${timestamp}&fresh=true`);
      } else {
        setIsNavigating(false);
        Alert.alert('Error', 'Could not create learning session. Please try again.');
      }
    } catch (error) {
      setIsNavigating(false);
      console.error('Error starting session:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleContinueSession = () => {
    setIsNavigating(true);
    
    const session = sessionState.activeSession;
    const nextAction = sessionState.nextAction;
    const timestamp = Date.now();
    
    console.log('🚀 Continuing session with action:', nextAction, 'timestamp:', timestamp);
    
    // 🔥 SET FLAG TO SKIP NEXT FOCUS RELOAD
    skipNextFocusReload.current = true;
    
    switch (nextAction) {
      case 'take_pre_quiz':
        console.log('🧹 Starting pre-quiz - ensuring fresh state');
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}&t=${timestamp}&fresh=true`);
        break;
      case 'start_lesson':
        router.push(`/${topic}Lesson?sessionId=${session.id}&t=${timestamp}`);
        break;
      case 'continue_lesson':
        router.push(`/${topic}Lesson?sessionId=${session.id}&t=${timestamp}`);
        break;
      case 'take_post_quiz':
        console.log('🧹 Starting post-quiz - ensuring fresh state');
        router.push(`/quizPlay?sessionId=${session.id}&type=post-lesson&quizId=${quizId}&t=${timestamp}&fresh=true`);
        break;
      case 'view_results':
        router.push(`/learningResults?sessionId=${session.id}&t=${timestamp}`);
        break;
      default:
        handleStartNewSession();
        return;
    }
  };

  const handleStartNewWithAbandon = () => {
    Alert.alert(
      'Start New Session',
      'You have an incomplete session. Starting a new session will abandon your current progress. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Start New', 
          style: 'destructive',
          onPress: () => handleStartNewSession(true)
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[
          styles.loadingText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          {isNavigating ? 'Navigating...' : 'Loading...'}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText 
          type="title"
          style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          Learn About {category?.name || topic}
        </ThemedText>
        
        {/* Active Session Section */}
        {!sessionState?.canStartNew && sessionState?.activeSession && (
          <View style={[
            styles.activeSessionCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            }
          ]}>
            <ThemedText style={[
              styles.cardTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              📚 Continue Your Journey
            </ThemedText>
            
            <ThemedText style={[
              styles.description,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              You have an active learning session. Continue where you left off:
            </ThemedText>
            
            <SessionProgressIndicator session={sessionState.activeSession} isDark={isDark} />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[
                  styles.continueButton,
                  { backgroundColor: isDark ? '#1976D2' : '#2196F3' }
                ]} 
                onPress={handleContinueSession}
                activeOpacity={0.8}
                disabled={isNavigating}
              >
                <ThemedText style={styles.buttonText}>
                  {isNavigating ? '⏳ Loading...' : '▶️ Continue Learning'}
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.newSessionButton,
                  { backgroundColor: isDark ? '#FF6B35' : '#FF9800' }
                ]} 
                onPress={handleStartNewWithAbandon}
                activeOpacity={0.8}
                disabled={isNavigating}
              >
                <ThemedText style={styles.buttonText}>
                  🔄 Start Fresh
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* New Session Section */}
        {sessionState?.canStartNew && (
          <View style={[
            styles.newSessionCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            }
          ]}>
            <ThemedText style={[
              styles.cardTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              🚀 Start Learning Journey
            </ThemedText>
            
            <ThemedText style={[
              styles.description,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Start a complete learning journey with pre-quiz, lesson, and post-quiz to track your improvement!
            </ThemedText>
            
            <TouchableOpacity 
              style={[
                styles.startButton,
                { backgroundColor: isDark ? '#45a049' : '#4CAF50' }
              ]} 
              onPress={() => handleStartNewSession(false)}
              activeOpacity={0.8}
              disabled={isNavigating}
            >
              <ThemedText style={styles.buttonText}>
                {isNavigating ? '⏳ Starting...' : '🚀 Start Learning Journey'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
        
        {/* History Section */}
        <View style={[
          styles.historyCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
          }
        ]}>
          <TouchableOpacity 
            style={styles.historyHeader}
            onPress={() => setShowHistory(!showHistory)}
          >
            <ThemedText style={[
              styles.cardTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              📊 Learning History ({completedSessions.length})
            </ThemedText>
            <ThemedText style={[
              styles.expandIcon,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {showHistory ? '▼' : '▶'}
            </ThemedText>
          </TouchableOpacity>
          
          {showHistory && (
            <View style={styles.historyContent}>
              {completedSessions.length > 0 ? (
                completedSessions.slice(0, 5).map((session, index) => (
                  <View key={session.id} style={[
                    styles.historyItem,
                    { borderBottomColor: isDark ? Colors.dark.border : Colors.light.border }
                  ]}>
                    <View style={styles.historyItemHeader}>
                      <ThemedText style={[
                        styles.historyDate,
                        { color: isDark ? Colors.dark.text : Colors.light.text }
                      ]}>
                        {formatDate(session.created_at)}
                      </ThemedText>
                      <View style={styles.improvementBadge}>
                        <ThemedText style={[
                          styles.improvementText,
                          { 
                            color: session.improvement.improvement >= 0 ? '#4CAF50' : '#FF5722'
                          }
                        ]}>
                          {session.improvement.improvement >= 0 ? '+' : ''}{session.improvement.improvementPercentage.toFixed(1)}%
                        </ThemedText>
                      </View>
                    </View>
                    <ThemedText style={[
                      styles.historyScore,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}>
                      {session.improvement.preScore} → {session.improvement.postScore} points
                    </ThemedText>
                  </View>
                ))
              ) : (
                <ThemedText style={[
                  styles.noHistoryText,
                  { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
                ]}>
                  No completed sessions yet. Start your first learning journey!
                </ThemedText>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
// Helper component for session progress (unchanged)
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
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  activeSessionCard: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newSessionCard: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyCard: {
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newSessionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  expandIcon: {
    fontSize: 18,
  },
  historyContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  improvementBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  improvementText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyScore: {
    fontSize: 14,
  },
  noHistoryText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    paddingVertical: 20,
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
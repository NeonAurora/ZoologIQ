import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform, Modal } from 'react-native';
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
  getUserCompletedSessions,
  abandonSession,
  cleanupIncompleteSessionsForCategory
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
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showConfirmDialog = (title, message, onConfirm) => {
    if (Platform.OS === 'web') {
      setShowConfirmModal({
        title,
        message,
        onConfirm,
        onCancel: () => setShowConfirmModal(false)
      });
    } else {
      Alert.alert(
        title,
        message,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Start New', 
            style: 'destructive',
            onPress: onConfirm
          }
        ]
      );
    }
  };

  const loadSessionData = useCallback(async () => {
    if (!user || !topic) {
      console.log('❌ Missing user or topic, skipping load');
      return;
    }
    
    try {
      console.log('🔄 Loading session data for topic:', topic);
      
      const categoryData = await getCategoryBySlug(topic);
      if (!categoryData) {
        console.error('❌ Category not found for topic:', topic);
        setLoading(false);
        return;
      }
      
      setCategory(categoryData);
      
      const [availability, completed] = await Promise.all([
        checkSessionAvailability(user.sub, categoryData.id),
        getUserCompletedSessions(user.sub, categoryData.id)
      ]);
      
      setSessionState(availability);
      setCompletedSessions(completed);
      
      console.log('✅ Session data loaded:', {
        canStartNew: availability.canStartNew,
        hasActiveSession: !!availability.activeSession,
        activeSessionStatus: availability.activeSession?.session_status,
        completedCount: completed.length
      });
      
    } catch (error) {
      console.error('❌ Error loading session data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, topic]);

  useFocusEffect(
    useCallback(() => {
      console.log('🎯 LearningSessionStarter focused - refreshing data');
      setLoading(true);
      loadSessionData();
    }, [loadSessionData])
  );

  useEffect(() => {
    if (user && topic) {
      console.log('🚀 Initial mount - loading session data');
      loadSessionData();
    }
  }, [user, topic, loadSessionData]);

  const handleStartNewSession = async (shouldAbandonCurrent = false) => {
    if (isCreatingSession) return;
    
    try {
      setIsCreatingSession(true);
      console.log('🚀 Starting new learning session');
      
      await cleanupIncompleteSessionsForCategory(user.sub, category.id);
      
      const session = await createLearningSession(user.sub, category.id, quizId);
      
      if (session) {
        console.log('✅ Session created, navigating to pre-quiz');
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}&fresh=true`);
      } else {
        if (Platform.OS === 'web') {
          alert('Error: Could not create learning session. Please try again.');
        } else {
          Alert.alert('Error', 'Could not create learning session. Please try again.');
        }
      }
    } catch (error) {
      console.error('❌ Error starting session:', error);
      if (Platform.OS === 'web') {
        alert('Error: Something went wrong. Please try again.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setIsCreatingSession(false);
    }
  };

  const handleContinueSession = () => {
    if (isCreatingSession) return;
    
    const session = sessionState.activeSession;
    const nextAction = sessionState.nextAction;
    
    console.log('🚀 Continuing session with action:', nextAction);
    
    switch (nextAction) {
      case 'take_pre_quiz':
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}&fresh=true`);
        break;
      case 'start_lesson':
      case 'continue_lesson':
        router.push(`/${topic}Lesson?sessionId=${session.id}&quizId=${quizId}`);
        break;
      case 'take_post_quiz':
        router.push(`/quizPlay?sessionId=${session.id}&type=post-lesson&quizId=${quizId}&fresh=true`);
        break;
      case 'view_results':
        router.push(`/learningResults?sessionId=${session.id}`);
        break;
      default:
        console.log('⚠️ Unknown action, starting new session');
        handleStartNewSession();
        break;
    }
  };

  const handleStartNewWithAbandon = () => {
    showConfirmDialog(
      'Start New Session',
      'You have an incomplete session. Starting a new session will abandon your current progress. Continue?',
      () => handleStartNewSession(true)
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
        <View style={styles.loadingContainer}>
          <ThemedText style={[
            styles.loadingText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {isCreatingSession ? 'Creating session...' : 'Loading...'}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText 
            type="title"
            style={[
              styles.title,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {category?.name || topic}
          </ThemedText>
          <ThemedText style={[
            styles.subtitle,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            Learning Session
          </ThemedText>
        </View>
        
        {/* Active Session Section */}
        {sessionState && !sessionState.canStartNew && sessionState.activeSession && (
          <View style={[
            styles.sessionCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderLeftColor: '#2196F3',
            }
          ]}>
            <View style={styles.cardHeader}>
              <View style={[styles.statusIcon, { backgroundColor: '#2196F3' + '20' }]}>
                <ThemedText style={[styles.statusIconText, { color: '#2196F3' }]}>
                  ■
                </ThemedText>
              </View>
              <View style={styles.cardHeaderText}>
                <ThemedText style={[
                  styles.cardTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  Continue Session
                </ThemedText>
                <ThemedText style={[
                  styles.cardDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  Resume where you left off
                </ThemedText>
              </View>
            </View>
            
            <SessionProgressIndicator session={sessionState.activeSession} isDark={isDark} />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[
                  styles.primaryButton,
                  { backgroundColor: '#2196F3' }
                ]} 
                onPress={handleContinueSession}
                activeOpacity={0.8}
                disabled={isCreatingSession}
              >
                <ThemedText style={styles.buttonText}>
                  {isCreatingSession ? 'Loading...' : 'Continue'}
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.secondaryButton,
                  { 
                    borderColor: isDark ? Colors.dark.border : Colors.light.border,
                    backgroundColor: 'transparent'
                  }
                ]} 
                onPress={handleStartNewWithAbandon}
                activeOpacity={0.8}
                disabled={isCreatingSession}
              >
                <ThemedText style={[
                  styles.secondaryButtonText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  Start Fresh
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* New Session Section */}
        {sessionState && sessionState.canStartNew && (
          <View style={[
            styles.sessionCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderLeftColor: '#4CAF50',
            }
          ]}>
            <View style={styles.cardHeader}>
              <View style={[styles.statusIcon, { backgroundColor: '#4CAF50' + '20' }]}>
                <ThemedText style={[styles.statusIconText, { color: '#4CAF50' }]}>
                  ■
                </ThemedText>
              </View>
              <View style={styles.cardHeaderText}>
                <ThemedText style={[
                  styles.cardTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  Start Learning
                </ThemedText>
                <ThemedText style={[
                  styles.cardDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  Begin with assessment and lesson
                </ThemedText>
              </View>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.primaryButton,
                { backgroundColor: '#4CAF50' }
              ]} 
              onPress={() => handleStartNewSession(false)}
              activeOpacity={0.8}
              disabled={isCreatingSession}
            >
              <ThemedText style={styles.buttonText}>
                {isCreatingSession ? 'Starting...' : 'Begin Session'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
        
        {/* History Section */}
        <View style={[
          styles.historyCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderLeftColor: '#FF9800',
          }
        ]}>
          <TouchableOpacity 
            style={styles.historyHeader}
            onPress={() => setShowHistory(!showHistory)}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.statusIcon, { backgroundColor: '#FF9800' + '20' }]}>
                <ThemedText style={[styles.statusIconText, { color: '#FF9800' }]}>
                  ■
                </ThemedText>
              </View>
              <View style={styles.cardHeaderText}>
                <ThemedText style={[
                  styles.cardTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  History ({completedSessions.length})
                </ThemedText>
                <ThemedText style={[
                  styles.cardDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  Previous sessions
                </ThemedText>
              </View>
            </View>
            <ThemedText style={[
              styles.expandIcon,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {showHistory ? '−' : '+'}
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
                      <View style={[
                        styles.improvementBadge,
                        { 
                          backgroundColor: session.improvement.improvement >= 0 
                            ? '#4CAF50' + '20'
                            : '#FF5722' + '20'
                        }
                      ]}>
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
                  No completed sessions yet
                </ThemedText>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Custom Confirmation Modal for Web */}
      {Platform.OS === 'web' && showConfirmModal && (
        <Modal
          transparent={true}
          visible={!!showConfirmModal}
          animationType="fade"
          onRequestClose={() => setShowConfirmModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[
              styles.confirmModal,
              { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
            ]}>
              <ThemedText style={[
                styles.modalTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {showConfirmModal.title}
              </ThemedText>
              
              <ThemedText style={[
                styles.modalMessage,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {showConfirmModal.message}
              </ThemedText>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    { borderColor: isDark ? Colors.dark.border : Colors.light.border }
                  ]}
                  onPress={() => setShowConfirmModal(false)}
                >
                  <ThemedText style={[
                    styles.cancelButtonText,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.modalButton,
                    styles.confirmButton,
                    { backgroundColor: '#FF5722' }
                  ]}
                  onPress={() => {
                    setShowConfirmModal(false);
                    showConfirmModal.onConfirm();
                  }}
                >
                  <ThemedText style={styles.confirmButtonText}>
                    Start New
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
              backgroundColor: isDark ? Colors.dark.backgroundTertiary : '#E0E0E0'
            },
            step.completed && {
              backgroundColor: '#4CAF50'
            },
            step.active && {
              backgroundColor: '#2196F3'
            }
          ]} />
          <ThemedText style={[
            styles.progressLabel,
            { 
              color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary 
            },
            step.completed && {
              color: isDark ? Colors.dark.text : Colors.light.text,
              fontWeight: '600'
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  sessionCard: {
    marginVertical: 12,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 20,
  },
  historyCard: {
    marginVertical: 12,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
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
    marginBottom: 6,
  },
  historyDate: {
    fontSize: 15,
    fontWeight: '500',
  },
  improvementBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  improvementText: {
    fontSize: 13,
    fontWeight: '600',
  },
  historyScore: {
    fontSize: 14,
  },
  noHistoryText: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 16,
    fontStyle: 'italic',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    textAlign: 'center',
    maxWidth: 60,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmModal: {
    borderRadius: 16,
    padding: 24,
    minWidth: 300,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  confirmButton: {
    // backgroundColor set above
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
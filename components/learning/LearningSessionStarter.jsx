// components/learning/LearningSessionStarter.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

// Component imports
import SessionHeader from './SessionHeader';
import ActiveSessionCard from './ActiveSessionCard';
import NewSessionCard from './NewSessionCard';
import HistoryCard from './HistoryCard';
import ConfirmationModal from './ConfirmationModal';

// Service imports
import { 
  checkSessionAvailability, 
  createLearningSession, 
  getUserCompletedSessions,
  cleanupIncompleteSessionsForCategory
} from '@/services/supabase/learningSessionService';
import { getCategoryBySlug } from '@/services/supabase/categoryService';

export default function LearningSessionStarter({ topic, quizId }) {
  const { user, supabaseData } = useAuth();
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

  // 🔥 NEW: Language state management
  const [currentLanguage, setCurrentLanguage] = useState(
    supabaseData?.preferred_language || 'en'
  );

  // Update language when user's preference changes
  useEffect(() => {
    if (supabaseData?.preferred_language) {
      setCurrentLanguage(supabaseData.preferred_language);
    }
  }, [supabaseData?.preferred_language]);

  // 🔥 NEW: Bilingual content
  const content = {
    en: {
      loading: 'Loading...',
      creatingSession: 'Creating session...',
      startNewSession: 'Start New Session',
      abandonCurrentProgress: 'You have an incomplete session. Starting a new session will abandon your current progress. Continue?',
      error: 'Error',
      couldNotCreateSession: 'Could not create learning session. Please try again.',
      somethingWentWrong: 'Something went wrong. Please try again.',
      cancel: 'Cancel',
      startNew: 'Start New'
    },
    ms: {
      loading: 'Sedang memuatkan...',
      creatingSession: 'Sedang mencipta sesi...',
      startNewSession: 'Mulakan Sesi Baru',
      abandonCurrentProgress: 'Anda mempunyai sesi yang tidak lengkap. Memulakan sesi baru akan meninggalkan kemajuan semasa anda. Teruskan?',
      error: 'Ralat',
      couldNotCreateSession: 'Tidak dapat mencipta sesi pembelajaran. Sila cuba lagi.',
      somethingWentWrong: 'Sesuatu tidak kena. Sila cuba lagi.',
      cancel: 'Batal',
      startNew: 'Mula Baru'
    }
  };

  const text = content[currentLanguage] || content.en;

  // 🔥 NEW: Language change handler
  const handleLanguageChange = (newLanguage) => {
    console.log('🌐 Language changed to:', newLanguage);
    setCurrentLanguage(newLanguage);
  };

  // 🔥 UPDATED: Bilingual date formatter
  const formatDate = (dateString, language = currentLanguage) => {
    const locale = language === 'ms' ? 'ms-MY' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 🔥 UPDATED: Bilingual alert/confirmation handler
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
          { text: text.cancel, style: 'cancel' },
          { 
            text: text.startNew, 
            style: 'destructive',
            onPress: onConfirm
          }
        ]
      );
    }
  };

  // In LearningSessionStarter.jsx - UPDATE loadSessionData
  const loadSessionData = useCallback(async () => {
    if (!user || !topic) return;
    
    try {
      console.log('🔄 Loading session data for topic:', topic);
      
      // ✅ Force fresh data fetch
      const categoryData = await getCategoryBySlug(topic);
      if (!categoryData) {
        console.error('❌ Category not found for topic:', topic);
        setLoading(false);
        return;
      }
      
      setCategory(categoryData);
      
      // ✅ Add timestamp to force fresh data
      const timestamp = Date.now();
      const [availability, completed] = await Promise.all([
        checkSessionAvailability(user.sub, categoryData.id, timestamp),  // Pass timestamp
        getUserCompletedSessions(user.sub, categoryData.id)
      ]);
      
      // ✅ Validate the data consistency
      if (availability.activeSession?.session_status === 'post_quiz_completed') {
        console.warn('⚠️ Active session is actually completed, cleaning up');
        await cleanupIncompleteSessionsForCategory(user.sub, categoryData.id);
        // Reload after cleanup
        const freshAvailability = await checkSessionAvailability(user.sub, categoryData.id);
        setSessionState(freshAvailability);
      } else {
        setSessionState(availability);
      }
      
      setCompletedSessions(completed);
      
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
          alert(`${text.error}: ${text.couldNotCreateSession}`);
        } else {
          Alert.alert(text.error, text.couldNotCreateSession);
        }
      }
    } catch (error) {
      console.error('❌ Error starting session:', error);
      if (Platform.OS === 'web') {
        alert(`${text.error}: ${text.somethingWentWrong}`);
      } else {
        Alert.alert(text.error, text.somethingWentWrong);
      }
    } finally {
      setIsCreatingSession(false);
    }
  };

  // In LearningSessionStarter.jsx - UPDATE handleContinueSession
  const handleContinueSession = () => {
    if (isCreatingSession) return;
    
    const session = sessionState.activeSession;
    const nextAction = sessionState.nextAction;
    
    console.log('🚀 Continuing session with action:', nextAction);
    console.log('🔍 Session status:', session?.session_status);
    
    // ✅ DEFENSIVE CHECK: Don't continue completed sessions
    if (session?.session_status === 'post_quiz_completed') {
      console.warn('⚠️ Attempted to continue completed session, starting fresh');
      handleStartNewSession();
      return;
    }
    
    // ✅ ADDITIONAL CHECK: Validate nextAction makes sense
    if (nextAction === 'view_results' && session?.session_status !== 'post_quiz_completed') {
      console.warn('⚠️ Invalid action for session status, starting fresh');
      handleStartNewSession();
      return;
    }
    
    switch (nextAction) {
      case 'take_pre_quiz':
        router.push(`/quizPlay?sessionId=${session.id}&type=pre-lesson&quizId=${quizId}&fresh=true`);
        break;
      case 'start_lesson':
      case 'continue_lesson':
        router.push(`/${topic}Lesson?sessionId=${session.id}&quizId=${quizId}&fresh=true`);
        break;
      case 'take_post_quiz':
        router.push(`/quizPlay?sessionId=${session.id}&type=post-lesson&quizId=${quizId}&fresh=true`);
        break;
      case 'view_results':
        // ✅ ONLY navigate if truly completed
        if (session?.session_status === 'post_quiz_completed') {
          router.push(`/learningResults?sessionId=${session.id}&fresh=true`);
        } else {
          console.warn('⚠️ view_results action for incomplete session, starting fresh');
          handleStartNewSession();
        }
        break;
      default:
        console.log('⚠️ Unknown action, starting new session');
        handleStartNewSession();
        break;
    }
  };

  const handleStartNewWithAbandon = () => {
    showConfirmDialog(
      text.startNewSession,
      text.abandonCurrentProgress,
      () => handleStartNewSession(true)
    );
  };

  // Helper function to get bilingual category name
  const getBilingualCategoryName = () => {
    if (!category) return topic;
    
    if (typeof category.name === 'object') {
      return category.name[currentLanguage] || category.name.en || category.name;
    }
    
    return category.name;
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText style={[
            styles.loadingText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {isCreatingSession ? text.creatingSession : text.loading}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <SessionHeader 
          categoryName={getBilingualCategoryName()}
          topic={topic}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
        
        {/* Active Session Section */}
        {sessionState && !sessionState.canStartNew && sessionState.activeSession && (
          <ActiveSessionCard
            sessionState={sessionState}
            currentLanguage={currentLanguage}
            isCreatingSession={isCreatingSession}
            onContinueSession={handleContinueSession}
            onStartNewWithAbandon={handleStartNewWithAbandon}
          />
        )}
        
        {/* New Session Section */}
        {sessionState && sessionState.canStartNew && (
          <NewSessionCard
            currentLanguage={currentLanguage}
            isCreatingSession={isCreatingSession}
            onStartNewSession={handleStartNewSession}
          />
        )}
        
        {/* History Section */}
        <HistoryCard
          completedSessions={completedSessions}
          currentLanguage={currentLanguage}
          showHistory={showHistory}
          onToggleHistory={() => setShowHistory(!showHistory)}
          formatDate={formatDate}
        />
      </ScrollView>

      {/* Custom Confirmation Modal for Web */}
      <ConfirmationModal
        visible={!!showConfirmModal}
        title={showConfirmModal?.title}
        message={showConfirmModal?.message}
        currentLanguage={currentLanguage}
        onConfirm={showConfirmModal?.onConfirm}
        onCancel={() => setShowConfirmModal(false)}
      />
    </ThemedView>
  );
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
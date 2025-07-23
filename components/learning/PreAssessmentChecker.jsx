// components/learning/PreAssessmentChecker.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getPreAssessmentStatus } from '@/services/supabase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PreAssessmentChecker({ topic, quizId }) {
  const { user, supabaseData } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [preAssessmentCompleted, setPreAssessmentCompleted] = useState(null);
  const [loading, setLoading] = useState(true);

  // Language state management
  const [currentLanguage, setCurrentLanguage] = useState(
    supabaseData?.preferred_language || 'en'
  );

  // Update language when user's preference changes
  useEffect(() => {
    if (supabaseData?.preferred_language) {
      setCurrentLanguage(supabaseData.preferred_language);
    }
  }, [supabaseData?.preferred_language]);

  // Topic configuration
  const topicConfig = {
    tiger: {
      emoji: '🐅',
      title: { en: 'Malayan Tiger', ms: 'Harimau Malaya' },
      color: '#FF6B35'
    },
    tapir: {
      emoji: '🦏',
      title: { en: 'Malayan Tapir', ms: 'Tapir Malaya' },
      color: '#4CAF50'
    },
    turtle: {
      emoji: '🐢',
      title: { en: 'Green Sea Turtle', ms: 'Penyu Agar' },
      color: '#2196F3'
    }
  };

  const currentTopicConfig = topicConfig[topic] || topicConfig.tiger;

  // Bilingual content
  const content = {
    en: {
      loading: 'Loading...',
      preAssessmentRequired: 'Pre-Assessment Required',
      preAssessmentDescription: 'Complete a brief assessment to unlock the lesson content.',
      takePreAssessment: 'Take Pre-Assessment',
      accessGranted: 'Access Granted',
      accessDescription: 'You have completed the pre-assessment. Access the lesson content.',
      viewLesson: 'View Lesson',
      takePostAssessment: 'Take Post-Assessment',
      error: 'Error',
      failedToLoad: 'Failed to load assessment status. Please try again.',
      retry: 'Retry'
    },
    ms: {
      loading: 'Sedang memuatkan...',
      preAssessmentRequired: 'Pra-Penilaian Diperlukan',
      preAssessmentDescription: 'Lengkapkan penilaian ringkas untuk membuka kandungan pelajaran.',
      takePreAssessment: 'Ambil Pra-Penilaian',
      accessGranted: 'Akses Diberikan',
      accessDescription: 'Anda telah melengkapkan pra-penilaian. Akses kandungan pelajaran.',
      viewLesson: 'Lihat Pelajaran',
      takePostAssessment: 'Ambil Pasca-Penilaian',
      error: 'Ralat',
      failedToLoad: 'Gagal memuatkan status penilaian. Sila cuba lagi.',
      retry: 'Cuba Lagi'
    }
  };

  const text = content[currentLanguage] || content.en;

  // Load pre-assessment status
  useEffect(() => {
    const loadPreAssessmentStatus = async () => {
      if (!user?.sub || !topic) return;
      
      try {
        setLoading(true);
        const status = await getPreAssessmentStatus(user.sub);
        setPreAssessmentCompleted(status?.[topic] || false);
      } catch (error) {
        console.error('Error loading pre-assessment status:', error);
        Alert.alert(text.error, text.failedToLoad);
      } finally {
        setLoading(false);
      }
    };

    loadPreAssessmentStatus();
  }, [user?.sub, topic, text.error, text.failedToLoad]);

  const handleTakePreAssessment = () => {
    if (!quizId) {
      Alert.alert(text.error, 'Quiz ID not found');
      return;
    }
    
    router.push(`/quizPlay?quizId=${quizId}&type=pre-lesson&topic=${topic}`);
  };

  const handleViewLesson = () => {
    router.push(`/${topic}Lesson`);
  };

  const handleTakePostAssessment = () => {
    if (!quizId) {
      Alert.alert(text.error, 'Quiz ID not found');
      return;
    }
    
    router.push(`/quizPlay?quizId=${quizId}&type=post-lesson&topic=${topic}`);
  };

  const handleRetry = () => {
    setLoading(true);
    setPreAssessmentCompleted(null);
    // Trigger re-load
    setTimeout(() => {
      if (user?.sub && topic) {
        const loadStatus = async () => {
          try {
            const status = await getPreAssessmentStatus(user.sub);
            setPreAssessmentCompleted(status?.[topic] || false);
          } catch (error) {
            console.error('Error loading pre-assessment status:', error);
            Alert.alert(text.error, text.failedToLoad);
          } finally {
            setLoading(false);
          }
        };
        loadStatus();
      }
    }, 100);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.loadingText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.loading}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (preAssessmentCompleted === null) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons 
            name="error-outline" 
            size={48} 
            color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
          />
          <ThemedText style={[
            styles.errorText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.failedToLoad}
          </ThemedText>
          <TouchableOpacity 
            style={[
              styles.retryButton,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}
            onPress={handleRetry}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.retryButtonText}>
              {text.retry}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Topic Header */}
        <View style={[
          styles.topicHeader,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={[
            styles.topicIcon,
            { backgroundColor: `${currentTopicConfig.color}20` }
          ]}>
            <ThemedText style={styles.topicEmoji}>
              {currentTopicConfig.emoji}
            </ThemedText>
          </View>
          <View style={styles.topicInfo}>
            <ThemedText style={[
              styles.topicTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {currentTopicConfig.title[currentLanguage] || currentTopicConfig.title.en}
            </ThemedText>
            <ThemedText style={[
              styles.topicSubtitle,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Learning Module
            </ThemedText>
          </View>
        </View>

        {/* Status Card */}
        <View style={[
          styles.statusCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: preAssessmentCompleted 
              ? '#4CAF50' 
              : (isDark ? Colors.dark.border : Colors.light.border),
            borderLeftColor: preAssessmentCompleted ? '#4CAF50' : '#FF9800'
          }
        ]}>
          <View style={styles.statusHeader}>
            <MaterialIcons 
              name={preAssessmentCompleted ? 'check-circle' : 'quiz'} 
              size={24} 
              color={preAssessmentCompleted ? '#4CAF50' : '#FF9800'} 
            />
            <ThemedText style={[
              styles.statusTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {preAssessmentCompleted ? text.accessGranted : text.preAssessmentRequired}
            </ThemedText>
          </View>
          
          <ThemedText style={[
            styles.statusDescription,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {preAssessmentCompleted ? text.accessDescription : text.preAssessmentDescription}
          </ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {!preAssessmentCompleted ? (
            <TouchableOpacity 
              style={[
                styles.primaryButton,
                { 
                  backgroundColor: '#FF9800',
                  shadowColor: isDark ? Colors.dark.text : Colors.light.text 
                }
              ]}
              onPress={handleTakePreAssessment}
              activeOpacity={0.8}
            >
              <MaterialIcons name="quiz" size={20} color="#fff" />
              <ThemedText style={styles.primaryButtonText}>
                {text.takePreAssessment}
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity 
                style={[
                  styles.primaryButton,
                  { 
                    backgroundColor: currentTopicConfig.color,
                    shadowColor: isDark ? Colors.dark.text : Colors.light.text 
                  }
                ]}
                onPress={handleViewLesson}
                activeOpacity={0.8}
              >
                <MaterialIcons name="book" size={20} color="#fff" />
                <ThemedText style={styles.primaryButtonText}>
                  {text.viewLesson}
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
                onPress={handleTakePostAssessment}
                activeOpacity={0.8}
              >
                <MaterialIcons 
                  name="assignment" 
                  size={20} 
                  color={isDark ? Colors.dark.text : Colors.light.text} 
                />
                <ThemedText style={[
                  styles.secondaryButtonText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {text.takePostAssessment}
                </ThemedText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Topic Header
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicEmoji: {
    fontSize: 24,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  topicSubtitle: {
    fontSize: 14,
  },
  
  // Status Card
  statusCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  
  // Actions
  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
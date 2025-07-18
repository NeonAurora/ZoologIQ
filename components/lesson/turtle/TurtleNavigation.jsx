// components/lesson/turtle/TurtleNavigation.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { completeLesson } from '@/services/supabase/learningSessionService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleNavigation({ 
  currentIndex, 
  totalSections, 
  onNext, 
  onPrevious,
  quizId,
  sessionId,
  isNavigating = false
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
  // 🔥 NEW: Language detection
  const { supabaseData } = useAuth();
  const preferredLanguage = supabaseData?.preferred_language || 'en';

  // 🔥 NEW: Bilingual content
  const content = {
    en: {
      of: 'of',
      error: 'Error',
      lessonCompleteError: 'There was an issue completing the lesson. Would you like to continue to the quiz anyway?',
      cancel: 'Cancel',
      continue: 'Continue'
    },
    ms: {
      of: 'daripada',
      error: 'Ralat',
      lessonCompleteError: 'Terdapat masalah semasa melengkapkan pelajaran. Adakah anda ingin meneruskan ke kuiz?',
      cancel: 'Batal',
      continue: 'Teruskan'
    }
  };

  const text = content[preferredLanguage] || content.en;
  
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;
  
  const handleFinish = async () => {
    if (isNavigating) {
      console.log('Navigation in progress, ignoring finish click');
      return;
    }

    try {
      if (sessionId) {
        console.log('Completing lesson for session:', sessionId);
        await completeLesson(sessionId);
        
        const timestamp = Date.now();
        router.replace(`/quizPlay?sessionId=${sessionId}&type=post-lesson&quizId=${quizId}&t=${timestamp}`);
      } else {
        if (quizId) {
          router.push(`/quizPlay?quizId=${quizId}&type=post-lesson`);
        } else {
          router.push('/quizzes');
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      Alert.alert(
        text.error, 
        text.lessonCompleteError,
        [
          { text: text.cancel, style: 'cancel' },
          { 
            text: text.continue, 
            onPress: () => {
              const timestamp = Date.now();
              if (sessionId && quizId) {
                router.replace(`/quizPlay?sessionId=${sessionId}&type=post-lesson&quizId=${quizId}&t=${timestamp}`);
              } else {
                router.push('/quizzes');
              }
            }
          }
        ]
      );
    }
  };

  // Progress dots
  const renderProgressDots = () => {
    const dots = [];
    for (let i = 0; i < totalSections; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.progressDot,
            {
              backgroundColor: i <= currentIndex 
                ? (isDark ? Colors.dark.tint : Colors.light.tint)
                : (isDark ? Colors.dark.backgroundTertiary : '#E0E0E0')
            }
          ]}
        />
      );
    }
    return dots;
  };
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderTopColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[
          styles.navButton,
          (isFirst || isNavigating) && styles.buttonDisabled,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}
        onPress={onPrevious}
        disabled={isFirst || isNavigating}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="chevron-left" 
          size={20} 
          color={(isFirst || isNavigating) 
            ? (isDark ? Colors.dark.textMuted : '#CCCCCC')
            : (isDark ? Colors.dark.text : Colors.light.text)
          } 
        />
      </TouchableOpacity>
      
      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        <View style={styles.dotsContainer}>
          {renderProgressDots()}
        </View>
        <ThemedText style={[
          styles.progressText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {currentIndex + 1} {text.of} {totalSections}
        </ThemedText>
      </View>
      
      {/* Next/Finish Button */}
      <TouchableOpacity
        style={[
          styles.navButton,
          isNavigating && styles.buttonDisabled,
          { 
            backgroundColor: isNavigating 
              ? (isDark ? Colors.dark.backgroundSecondary : '#CCCCCC')
              : (isDark ? Colors.dark.tint : Colors.light.tint)
          }
        ]}
        onPress={isLast ? handleFinish : onNext}
        disabled={isNavigating}
        activeOpacity={0.7}
      >
        {isNavigating ? (
          <MaterialIcons name="hourglass-empty" size={16} color="#999999" />
        ) : (
          <>
            {isLast ? (
              <MaterialIcons name="quiz" size={16} color="#ffffff" />
            ) : (
              <MaterialIcons name="chevron-right" size={20} color="#ffffff" />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
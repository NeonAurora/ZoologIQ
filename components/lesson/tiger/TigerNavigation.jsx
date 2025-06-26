// components/lesson/tiger/TigerNavigation.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { completeLesson } from '@/services/supabase/learningSessionService';

export default function TigerNavigation({ 
  currentIndex, 
  totalSections, 
  onNext, 
  onPrevious,
  quizId,
  sessionId,
  isNavigating = false // 🔥 NEW: Add navigation state prop
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
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
        'Error', 
        'There was an issue completing the lesson. Would you like to continue to the quiz anyway?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Continue', 
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
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
        borderTopColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.secondaryButton,
          (isFirst || isNavigating) && styles.buttonDisabled,
          { borderColor: isDark ? Colors.dark.border : Colors.light.border }
        ]}
        onPress={onPrevious}
        disabled={isFirst || isNavigating} // 🔥 NEW: Disable during navigation
      >
        <ThemedText style={[
          styles.buttonText,
          (isFirst || isNavigating) && styles.buttonTextDisabled,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          ← Previous
        </ThemedText>
      </TouchableOpacity>
      
      {/* Progress */}
      <View style={styles.progressContainer}>
        <ThemedText style={[
          styles.progressText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          {currentIndex + 1} of {totalSections}
        </ThemedText>
        <View style={[
          styles.progressBar,
          { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }
        ]}>
          <View style={[
            styles.progressFill,
            { 
              width: `${((currentIndex + 1) / totalSections) * 100}%`,
              backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint
            }
          ]} />
        </View>
      </View>
      
      {/* Next/Finish Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          isNavigating && styles.buttonDisabled, // 🔥 NEW: Disable during navigation
          { backgroundColor: isNavigating 
            ? (isDark ? Colors.dark.backgroundSecondary : '#CCCCCC')
            : (isDark ? Colors.dark.tint : Colors.light.tint) 
          }
        ]}
        onPress={isLast ? handleFinish : onNext}
        disabled={isNavigating} // 🔥 NEW: Disable during navigation
      >
        <ThemedText style={[
          styles.primaryButtonText,
          { color: isNavigating ? '#999999' : '#ffffff' }
        ]}>
          {isNavigating 
            ? 'Loading...'
            : (isLast ? '🧠 Test Your Knowledge' : 'Next →')
          }
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButton: {
    // backgroundColor set dynamically above
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
  progressContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
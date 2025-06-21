import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function TigerNavigation({ 
  currentIndex, 
  totalSections, 
  onNext, 
  onPrevious,
  quizId 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;
  
  const handleFinish = () => {
    // Navigate to post-lesson quiz or back to quizzes
    if (quizId) {
      router.push(`/quizPlay?quizId=${quizId}&type=post-lesson`);
    } else {
      router.push('/quizzes');
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
          isFirst && styles.buttonDisabled,
          { borderColor: isDark ? Colors.dark.border : Colors.light.border }
        ]}
        onPress={onPrevious}
        disabled={isFirst}
      >
        <ThemedText style={[
          styles.buttonText,
          isFirst && styles.buttonTextDisabled
        ]}>
          ← Previous
        </ThemedText>
      </TouchableOpacity>
      
      {/* Progress */}
      <View style={styles.progressContainer}>
        <ThemedText style={styles.progressText}>
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
          { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint },
          { borderColor: isDark ? Colors.dark.border : Colors.light.border }
        ]}
        onPress={isLast ? handleFinish : onNext}
      >
        <ThemedText style={styles.primaryButtonText}>
          {isLast ? 'Finish Lesson' : 'Next →'}
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
    borderWidth: 1,
    backgroundColor: 'transparent',
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
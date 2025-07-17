// components/quiz/QuizNavigation.jsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function QuizNavigation({ 
  currentIndex, 
  totalQuestions, 
  answers, 
  onPrevious, 
  onNext, 
  onGoToQuestion,
  quizColor 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      {/* Previous Chevron */}
      <TouchableOpacity
        style={[
          styles.chevron,
          currentIndex === 0 && styles.chevronDisabled
        ]}
        onPress={onPrevious}
        disabled={currentIndex === 0}
      >
        <ThemedText style={[
          styles.chevronText,
          { color: currentIndex === 0 
            ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
            : quizColor
          }
        ]}>
          ‹
        </ThemedText>
      </TouchableOpacity>

      {/* Question Dots */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: Math.min(totalQuestions, 5) }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index
                  ? quizColor
                  : (answers[index] !== null && answers[index] !== undefined)
                    ? quizColor + '40'
                    : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
              }
            ]}
            onPress={() => onGoToQuestion(index)}
          >
            <ThemedText style={[
              styles.dotText,
              {
                color: currentIndex === index
                  ? '#fff'
                  : (answers[index] !== null && answers[index] !== undefined)
                    ? quizColor
                    : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
              }
            ]}>
              {index + 1}
            </ThemedText>
          </TouchableOpacity>
        ))}
        
        {/* More indicator */}
        {totalQuestions > 5 && (
          <View style={[
            styles.moreIndicator,
            { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
          ]}>
            <ThemedText style={[
              styles.moreText,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              +{totalQuestions - 5}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Next Chevron */}
      <TouchableOpacity
        style={[
          styles.chevron,
          currentIndex === totalQuestions - 1 && styles.chevronDisabled
        ]}
        onPress={onNext}
        disabled={currentIndex === totalQuestions - 1}
      >
        <ThemedText style={[
          styles.chevronText,
          { color: currentIndex === totalQuestions - 1
            ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
            : quizColor
          }
        ]}>
          ›
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  chevron: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronDisabled: {
    opacity: 0.3,
  },
  chevronText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  dot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  dotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  moreIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  moreText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
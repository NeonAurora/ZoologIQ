// components/lesson/tapir/TapirNavigation.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { QUIZ_IDS } from '@/constants/QuizIds';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirNavigation({ 
  currentIndex, 
  totalSections, 
  currentLanguage = 'en',
  onNext, 
  onPrevious,
  onComplete,
  isNavigating = false,
  topic = 'tapir'
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
  const content = {
    en: {
      of: 'of'
    },
    ms: {
      of: 'daripada'
    }
  };

  const text = content[currentLanguage] || content.en;
  
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;
  
  const handleFinish = () => {
    if (isNavigating) {
      console.log('Navigation in progress, ignoring finish click');
      return;
    }

    console.log('Tapir lesson completed');
    if (onComplete) {
      onComplete();
    }
    const quizId = QUIZ_IDS[topic];
    router.replace(`/startLearning?topic=${topic}&quizId=${quizId}`);
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
              <MaterialIcons name="quiz" size={16} color="white" />
            ) : (
              <MaterialIcons name="chevron-right" size={20} color="white" />
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
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
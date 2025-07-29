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

  const textMap = {
    en: { of: 'of', finish: 'Finish' },
    ms: { of: 'daripada', finish: 'Selesai' }
  };
  const text = textMap[currentLanguage] || textMap.en;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;

  const handleFinish = () => {
    if (isNavigating) return;
    onComplete?.();
    const quizId = QUIZ_IDS[topic];
    router.replace(`/startLearning?topic=${topic}&quizId=${quizId}`);
  };

  const renderProgressDots = () =>
    Array.from({ length: totalSections }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.progressDot,
          {
            backgroundColor:
              i <= currentIndex
                ? isDark
                  ? Colors.dark.tint
                  : Colors.light.tint
                : isDark
                ? Colors.dark.backgroundTertiary
                : '#E0E0E0'
          }
        ]}
      />
    ));

  // Colors for next/finish backgrounds
  const nextBg = isDark ? Colors.dark.tint : Colors.light.tint;
  const disabledBg = isDark
    ? Colors.dark.backgroundSecondary
    : Colors.light.backgroundSecondary;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.dark.surface
            : Colors.light.surface,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}
    >
      {/* Previous */}
      <TouchableOpacity
        onPress={onPrevious}
        disabled={isFirst || isNavigating}
        style={[
          styles.navButton,
          {
            backgroundColor: disabledBg,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          },
          (isFirst || isNavigating) && styles.buttonDisabled
        ]}
      >
        <MaterialIcons
          name="chevron-left"
          size={20}
          color={
            isFirst || isNavigating
              ? isDark
                ? Colors.dark.textMuted
                : '#CCCCCC'
              : isDark
              ? Colors.dark.text
              : Colors.light.text
          }
        />
      </TouchableOpacity>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.dotsContainer}>{renderProgressDots()}</View>
        <ThemedText
          style={[
            styles.progressText,
            {
              color: isDark
                ? Colors.dark.textSecondary
                : Colors.light.textSecondary
            }
          ]}
        >
          {currentIndex + 1} {text.of} {totalSections}
        </ThemedText>
      </View>

      {/* Next or Finish */}
      {isLast ? (
        <TouchableOpacity
          onPress={handleFinish}
          disabled={isNavigating}
          style={[
            styles.finishButton,
            { backgroundColor: nextBg },
            isNavigating && styles.buttonDisabled
          ]}
        >
          {isNavigating ? (
            <MaterialIcons
              name="hourglass-empty"
              size={16}
              color="#999999"
            />
          ) : (
            <ThemedText style={styles.finishText}>
              {text.finish}
            </ThemedText>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onNext}
          disabled={isNavigating}
          style={[
            styles.navButton,
            {
              backgroundColor: nextBg,
              borderColor: 'transparent'
            },
            isNavigating && styles.buttonDisabled
          ]}
        >
          {isNavigating ? (
            <MaterialIcons
              name="hourglass-empty"
              size={16}
              color="#999999"
            />
          ) : (
            <MaterialIcons
              name="chevron-right"
              size={20}
              color="#ffffff"
            />
          )}
        </TouchableOpacity>
      )}
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
    borderTopWidth: 1
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  finishButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  buttonDisabled: {
    opacity: 0.5
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 4
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500'
  },
  finishText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600'
  }
});

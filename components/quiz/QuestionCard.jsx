// components/quiz/QuestionCard.jsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onSelectAnswer, 
  currentLanguage,
  quizColor 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Helper function for bilingual text
  const getBilingualText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[currentLanguage] || textObj.en || fallback;
  };

  const questionText = getBilingualText(question.question_text || question.question, 'Question text not available');
  const options = question.options?.[currentLanguage] || question.options?.en || question.options || [];

  return (
    <View style={styles.container}>
      {/* Question Section */}
      <View style={[
        styles.questionSection,
        { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
      ]}>
        <ThemedText style={[
          styles.questionText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          {questionText}
        </ThemedText>
        
        {/* Question image if exists */}
        {question.image && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: question.image }} 
              style={styles.questionImage}
              resizeMode="cover"
            />
          </View>
        )}
        
        {/* Points indicator */}
        <View style={styles.pointsContainer}>
          <View style={[
            styles.pointsBadge,
            { backgroundColor: quizColor + '20' }
          ]}>
            <ThemedText style={[
              styles.pointsText,
              { color: quizColor }
            ]}>
              +{question.points || 10} points
            </ThemedText>
          </View>
          {question.penalty > 0 && (
            <View style={[
              styles.penaltyBadge,
              { backgroundColor: '#FF572220' }
            ]}>
              <ThemedText style={[
                styles.penaltyText,
                { color: '#FF5722' }
              ]}>
                -{question.penalty} penalty
              </ThemedText>
            </View>
          )}
        </View>
      </View>
      
      {/* Answer Options */}
      <View style={styles.optionsSection}>
        {Array.isArray(options) && options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              { 
                borderColor: selectedAnswer === option 
                  ? quizColor
                  : (isDark ? Colors.dark.border : Colors.light.border),
                backgroundColor: selectedAnswer === option 
                  ? quizColor + '15'
                  : (isDark ? Colors.dark.surface : Colors.light.surface),
              }
            ]}
            onPress={() => onSelectAnswer(option)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.optionLetter,
                { 
                  backgroundColor: selectedAnswer === option 
                    ? quizColor
                    : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                  borderColor: selectedAnswer === option 
                    ? quizColor
                    : 'transparent'
                }
              ]}>
                <ThemedText style={[
                  styles.optionLetterText,
                  { 
                    color: selectedAnswer === option 
                      ? '#fff'
                      : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                  }
                ]}>
                  {String.fromCharCode(65 + index)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.optionText,
                { 
                  color: isDark ? Colors.dark.text : Colors.light.text,
                  fontWeight: selectedAnswer === option ? '500' : 'normal'
                }
              ]}>
                {option}
              </ThemedText>
              {selectedAnswer === option && (
                <ThemedText style={[
                  styles.selectedIcon,
                  { color: quizColor }
                ]}>
                  ✓
                </ThemedText>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  questionSection: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  questionImage: {
    width: '100%',
    height: 180,
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  pointsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  penaltyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  penaltyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  optionsSection: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
  },
  selectedIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
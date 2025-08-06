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

  // 🔥 NEW: Helper function to process question text with italic ranges
  const parseQuestionText = (questionText) => {
    if (!questionText || typeof questionText !== 'string') {
      return [{ text: questionText || '', isItalic: false }];
    }

    const segments = [];
    let currentIndex = 0;
    let isItalic = false;
    
    // Split by opening and closing italic tokens
    const parts = questionText.split(/(\{i\}|\{\/i\})/);
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (part === '{i}') {
        // Start italic section
        isItalic = true;
      } else if (part === '{/i}') {
        // End italic section
        isItalic = false;
      } else if (part.length > 0) {
        // Add text segment with current italic state
        segments.push({
          text: part,
          isItalic: isItalic,
          key: `segment-${i}` // For React key prop
        });
      }
    }
    
    // If no segments found, return the original text
    if (segments.length === 0) {
      return [{ text: questionText, isItalic: false, key: 'single' }];
    }
    
    return segments;
  };

  // 🔥 NEW: Helper function to process option text (unchanged from before)
  const processOptionText = (optionText) => {
    if (!optionText || typeof optionText !== 'string') {
      return { text: optionText || '', isItalic: false };
    }
    
    // Check if option starts with {i} prefix
    if (optionText.startsWith('{i}')) {
      return {
        text: optionText.substring(3), // Remove {i} prefix
        isItalic: true
      };
    }
    
    return {
      text: optionText,
      isItalic: false
    };
  };

  // 🔥 NEW: Render question text with mixed formatting
  const renderQuestionText = () => {
    const questionText = getBilingualText(question.question_text || question.question, 'Question text not available');
    const segments = parseQuestionText(questionText);
    
    return (
      <ThemedText style={[
        styles.questionText,
        { color: isDark ? Colors.dark.text : Colors.light.text }
      ]}>
        {segments.map((segment) => (
          <ThemedText
            key={segment.key}
            style={[
              {
                fontStyle: segment.isItalic ? 'italic' : 'normal',
                color: segment.isItalic 
                  ? (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                  : (isDark ? Colors.dark.text : Colors.light.text)
              }
            ]}
          >
            {segment.text}
          </ThemedText>
        ))}
      </ThemedText>
    );
  };

  const options = question.options?.[currentLanguage] || question.options?.en || question.options || [];

  return (
    <View style={styles.container}>
      {/* Question Section */}
      <View style={[
        styles.questionSection,
        { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
      ]}>
        {/* 🔥 UPDATED: Use new question text renderer */}
        {renderQuestionText()}
        
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
        {Array.isArray(options) && options.map((option, index) => {
          // Process each option for italic formatting (unchanged)
          const processedOption = processOptionText(option);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { 
                  borderColor: selectedAnswer === index 
                    ? quizColor
                    : (isDark ? Colors.dark.border : Colors.light.border),
                  backgroundColor: selectedAnswer === index 
                    ? quizColor + '15'
                    : (isDark ? Colors.dark.surface : Colors.light.surface),
                }
              ]}
              onPress={() => onSelectAnswer(index)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionLetter,
                  { 
                    backgroundColor: selectedAnswer === index 
                      ? quizColor
                      : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                    borderColor: selectedAnswer === index 
                      ? quizColor
                      : 'transparent'
                  }
                ]}>
                  <ThemedText style={[
                    styles.optionLetterText,
                    { 
                      color: selectedAnswer === index 
                        ? '#fff'
                        : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                    }
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </ThemedText>
                </View>
                
                {/* Option text with conditional italic styling */}
                <ThemedText style={[
                  styles.optionText,
                  { 
                    color: isDark ? Colors.dark.text : Colors.light.text,
                    fontWeight: selectedAnswer === index ? '500' : 'normal',
                    fontStyle: processedOption.isItalic ? 'italic' : 'normal',
                  }
                ]}>
                  {processedOption.text}
                </ThemedText>
                
                {/* Scientific name indicator */}
                {processedOption.isItalic && (
                  <View style={[
                    styles.scientificBadge,
                    { backgroundColor: quizColor + '15' }
                  ]}>
                    <ThemedText style={[
                      styles.scientificBadgeText,
                      { color: quizColor }
                    ]}>
                      Scientific
                    </ThemedText>
                  </View>
                )}
                
                {selectedAnswer === index && (
                  <ThemedText style={[
                    styles.selectedIcon,
                    { color: quizColor }
                  ]}>
                    ✓
                  </ThemedText>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
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
  scientificBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
  },
  scientificBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selectedIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
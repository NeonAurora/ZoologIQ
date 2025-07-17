// components/createQuiz/QuestionCard.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

export default function QuestionCard({ 
  // 🔥 UPDATED: Bilingual question data
  questionText = { en: '', ms: '' }, 
  correctAnswer = '', 
  options = { en: [], ms: [] }, 
  points = 10, 
  penalty = 0, 
  image = null,
  explanation = { en: '', ms: '' },
  
  // Display properties
  questionNumber = 1,
  isDark,
  
  // Action handlers
  onEdit,
  onDelete,
}) {
  const colorScheme = useColorScheme();
  const isThemeDark = isDark ?? (colorScheme === 'dark');
  const [currentLang, setCurrentLang] = useState('en'); // Language toggle state

  const handleDelete = () => {
    console.log('Delete button pressed for question:', questionNumber);
    
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Are you sure you want to delete question ${questionNumber}? This action cannot be undone.`);
      if (confirmed) {
        console.log('✅ Delete CONFIRMED for question:', questionNumber);
        onDelete && onDelete();
      } else {
        console.log('❌ Delete CANCELLED');
      }
    } else {
      Alert.alert(
        "Delete Question",
        `Are you sure you want to delete question ${questionNumber}? This action cannot be undone.`,
        [
          { text: "Cancel", style: "cancel", onPress: () => console.log('❌ Delete CANCELLED') },
          { text: "Delete", style: "destructive", onPress: () => {
            console.log('✅ Delete CONFIRMED for question:', questionNumber);
            onDelete && onDelete();
          }}
        ]
      );
    }
  };

  // 🔥 UPDATED: Handle bilingual data safely
  const getQuestionText = () => {
    if (typeof questionText === 'string') return questionText;
    return questionText[currentLang] || questionText.en || '';
  };

const getCorrectAnswerIndex = () => {
  // If correctAnswer is already a number or string number, use it
  if (typeof correctAnswer === 'number') {
    return correctAnswer;
  }
  
  if (typeof correctAnswer === 'string') {
    // Try to parse as index first
    const indexValue = parseInt(correctAnswer, 10);
    if (!isNaN(indexValue)) {
      return indexValue;
    }
    
    // If not a number, try to find text in English options (backward compatibility)
    const englishOptions = getOptions('en');
    return englishOptions.findIndex(opt => opt === correctAnswer);
  }
  
  return 0;
};
  

  const getOptions = (lang = currentLang) => {
    if (Array.isArray(options)) return options;
    return options[lang] || options.en || [];
  };

  const getExplanation = () => {
    if (!explanation) return '';
    if (typeof explanation === 'string') return explanation;
    return explanation[currentLang] || explanation.en || '';
  };

  const safeOptions = getOptions();
  const correctIndex = getCorrectAnswerIndex();
  const displayQuestionText = getQuestionText();
  const displayExplanation = getExplanation();

  return (
    <View style={[
      styles.card, 
      { 
        backgroundColor: isThemeDark ? Colors.dark.card : Colors.light.card,
        borderColor: isThemeDark ? Colors.dark.border : Colors.light.border,
        shadowOpacity: isThemeDark ? 0.3 : 0.1,
      }
    ]}>
      {/* Header with question number and actions */}
      <View style={styles.cardHeader}>
        <View style={[
          styles.questionNumberContainer,
          { backgroundColor: isThemeDark ? Colors.dark.backgroundTertiary : '#e1f5fe' }
        ]}>
          <Text style={[
            styles.questionNumber,
            { color: isThemeDark ? Colors.dark.tint : Colors.light.tint }
          ]}>
            Q{questionNumber}
          </Text>
        </View>
        
        {/* 🔥 NEW: Language Toggle */}
        <View style={styles.languageToggle}>
          <TouchableOpacity
            style={[
              styles.langButton,
              currentLang === 'en' && styles.activeLangButton,
              { 
                backgroundColor: currentLang === 'en' 
                  ? (isThemeDark ? Colors.dark.tint : Colors.light.tint)
                  : 'transparent',
                borderColor: isThemeDark ? Colors.dark.border : Colors.light.border
              }
            ]}
            onPress={() => setCurrentLang('en')}
          >
            <Text style={[
              styles.langButtonText,
              { color: currentLang === 'en' ? '#fff' : (isThemeDark ? Colors.dark.text : Colors.light.text) }
            ]}>
              EN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.langButton,
              currentLang === 'ms' && styles.activeLangButton,
              { 
                backgroundColor: currentLang === 'ms' 
                  ? (isThemeDark ? Colors.dark.tint : Colors.light.tint)
                  : 'transparent',
                borderColor: isThemeDark ? Colors.dark.border : Colors.light.border
              }
            ]}
            onPress={() => setCurrentLang('ms')}
          >
            <Text style={[
              styles.langButtonText,
              { color: currentLang === 'ms' ? '#fff' : (isThemeDark ? Colors.dark.text : Colors.light.text) }
            ]}>
              MS
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerActions}>
          <View style={styles.pointsContainer}>
            <Text style={[
              styles.pointsText,
              { 
                color: '#fff',
                backgroundColor: isThemeDark ? Colors.dark.success : Colors.light.success 
              }
            ]}>
              +{points}
            </Text>
            {penalty > 0 && (
              <Text style={[
                styles.penaltyText,
                { color: isThemeDark ? '#FF6B6B' : '#e74c3c' }
              ]}>
                -{penalty}
              </Text>
            )}
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: isThemeDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }]}
              onPress={onEdit}
            >
              <Text style={[styles.editButtonText, { color: isThemeDark ? Colors.dark.tint : Colors.light.tint }]}>✏️</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.deleteButton, { backgroundColor: isThemeDark ? 'rgba(255, 107, 107, 0.15)' : 'rgba(231, 76, 60, 0.1)' }]}
              onPress={handleDelete}
            >
              <Text style={[styles.deleteButtonText, { color: isThemeDark ? '#FF6B6B' : '#e74c3c' }]}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Question Text */}
      <Text style={[
        styles.questionText,
        { color: isThemeDark ? Colors.dark.text : Colors.light.text }
      ]}>
        {displayQuestionText}
      </Text>

      {/* Question Image */}
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.questionImage}
          resizeMode="cover"
        />
      )}

      {/* Options */}
      <View style={styles.optionsContainer}>
        {safeOptions.map((opt, idx) => (
          <View key={`opt-${idx}`} style={styles.optionRow}>
            <View style={[
              styles.optionLetter,
              { 
                backgroundColor: idx === correctIndex // 🔥 UPDATED: Compare with index
                  ? (isThemeDark ? Colors.dark.success : Colors.light.success)
                  : (isThemeDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
              }
            ]}>
              <Text style={[
                styles.optionLetterText,
                { 
                  color: idx === correctIndex // 🔥 UPDATED: Compare with index
                    ? '#fff' 
                    : (isThemeDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                }
              ]}>
                {String.fromCharCode(65 + idx)}
              </Text>
            </View>
            
            <Text style={[
              styles.optionText,
              { 
                color: idx === correctIndex // 🔥 UPDATED: Compare with index
                  ? (isThemeDark ? Colors.dark.success : Colors.light.success)
                  : (isThemeDark ? Colors.dark.text : Colors.light.text)
              },
              idx === correctIndex && styles.correctOptionText // 🔥 UPDATED: Compare with index
            ]}>
              {opt}
            </Text>
            
            {idx === correctIndex && ( // 🔥 UPDATED: Compare with index
              <Text style={[styles.checkIcon, { color: Colors.light.success }]}>✓</Text>
            )}
          </View>
        ))}
      </View>

      {/* Explanation */}
      {displayExplanation && (
        <View style={[
          styles.explanationContainer,
          { 
            backgroundColor: isThemeDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderLeftColor: isThemeDark ? Colors.dark.tint : Colors.light.tint
          }
        ]}>
          <Text style={[
            styles.explanationLabel,
            { color: isThemeDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            Explanation:
          </Text>
          <Text style={[
            styles.explanationText,
            { color: isThemeDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {displayExplanation}
          </Text>
        </View>
      )}

      {/* Question stats */}
      <View style={[
        styles.questionStats,
        { borderTopColor: isThemeDark ? Colors.dark.border : Colors.light.border }
      ]}>
        <View style={styles.statItem}>
          <Text style={[
            styles.statLabel,
            { color: isThemeDark ? Colors.dark.textMuted : Colors.light.textMuted }
          ]}>
            Options: {safeOptions.length}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[
            styles.statLabel,
            { color: isThemeDark ? Colors.dark.textMuted : Colors.light.textMuted }
          ]}>
            Type: {image ? 'Image Question' : 'Text Question'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionNumberContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // 🔥 NEW: Language Toggle Styles
  languageToggle: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  activeLangButton: {
    // Styling handled via backgroundColor in component
  },
  langButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  penaltyText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 22,
  },
  questionImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  correctOptionText: {
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  explanationContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  explanationLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 18,
  },
  questionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
  },
});
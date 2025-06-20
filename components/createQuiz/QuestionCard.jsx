// /components/createQuiz/QuestionCard.jsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

export default function QuestionCard({ 
  // Core question data
  question = '', 
  answer = '', 
  options = [], 
  points = 10, 
  penalty = 0, 
  image = null,
  explanation = null,
  
  // Display properties
  questionNumber = 1,
  isDark,
  
  // Action handlers
  onEdit,
  onDelete,
  
  // Additional props spread from question object
  ...additionalProps
}) {
  const colorScheme = useColorScheme();
  const isThemeDark = isDark ?? (colorScheme === 'dark');

  const handleDelete = () => {
    console.log('Delete button pressed for question:', questionNumber);
    console.log('Platform:', Platform.OS);
    
    if (Platform.OS === 'web') {
      // Web-compatible confirmation
      const confirmed = window.confirm(`Are you sure you want to delete question ${questionNumber}? This action cannot be undone.`);
      if (confirmed) {
        console.log('✅ Delete CONFIRMED for question:', questionNumber);
        onDelete && onDelete();
      } else {
        console.log('❌ Delete CANCELLED');
      }
    } else {
      // Native Alert for mobile (when you test on Android later)
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
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];

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
        
        <View style={styles.headerActions}>
          <View style={styles.pointsContainer}>
            <Text style={[
              styles.pointsText,
              { 
                color: isThemeDark ? Colors.dark.tint : Colors.light.tint,
                backgroundColor: isThemeDark ? 'rgba(255, 255, 255, 0.1)' : '#e1f5fe'
              }
            ]}>
              {points} pts
            </Text>
            {penalty > 0 && (
              <Text style={[styles.penaltyText, { color: Colors.light.error }]}>
                -{penalty}
              </Text>
            )}
          </View>
          
          {/* Action buttons */}
          <View style={styles.actionButtons}>
            {onEdit && (
              <TouchableOpacity 
                style={[
                  styles.editButton,
                  { backgroundColor: isThemeDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
                ]} 
                onPress={onEdit}
              >
                <Text style={styles.editButtonText}>✏️</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity 
                style={[
                  styles.deleteButton,
                  { backgroundColor: isThemeDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
                ]} 
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Question text */}
      <Text style={[
        styles.questionText,
        { color: isThemeDark ? Colors.dark.text : Colors.light.text }
      ]}>
        {question}
      </Text>

      {/* Question image */}
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
          <View key={idx} style={styles.optionRow}>
            <View style={[
              styles.optionLetter,
              { 
                backgroundColor: opt === answer 
                  ? Colors.light.success 
                  : (isThemeDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
              }
            ]}>
              <Text style={[
                styles.optionLetterText,
                { 
                  color: opt === answer 
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
                color: opt === answer 
                  ? (isThemeDark ? Colors.dark.success : Colors.light.success)
                  : (isThemeDark ? Colors.dark.text : Colors.light.text)
              },
              opt === answer && styles.correctOptionText
            ]}>
              {opt}
            </Text>
            
            {opt === answer && (
              <Text style={[styles.checkIcon, { color: Colors.light.success }]}>✓</Text>
            )}
          </View>
        ))}
      </View>

      {/* Explanation */}
      {explanation && (
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
            {explanation}
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
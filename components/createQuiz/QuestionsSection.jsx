// /components/createQuiz/QuestionsSection.jsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import QuestionCard from './QuestionCard';
import Colors from '@/constants/Colors';

export default function QuestionsSection({ questions, onAddPress, onEditQuestion, onDeleteQuestion }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getTotalPoints = () => {
    return questions.reduce((total, q) => total + (q.points || 10), 0);
  };

  const getAverageDifficulty = () => {
    if (questions.length === 0) return 'N/A';
    
    const avgPoints = getTotalPoints() / questions.length;
    if (avgPoints <= 5) return 'Easy';
    if (avgPoints <= 15) return 'Medium';
    return 'Hard';
  };

  return (
    <View style={[
      styles.section, 
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        shadowColor: isDark ? '#000' : '#000',
        shadowOpacity: isDark ? 0.3 : 0.1,
      }
    ]}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerLeft}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Questions
          </Text>
          <Text style={[
            styles.questionCount,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {questions.length} {questions.length === 1 ? 'question' : 'questions'}
          </Text>
        </View>
        
        {questions.length > 0 && (
          <View style={styles.headerRight}>
            <View style={styles.statItem}>
              <Text style={[
                styles.statLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Total Points
              </Text>
              <Text style={[
                styles.statValue,
                { color: isDark ? Colors.dark.tint : Colors.light.tint }
              ]}>
                {getTotalPoints()}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[
                styles.statLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Avg. Difficulty
              </Text>
              <Text style={[
                styles.statValue,
                { color: isDark ? Colors.dark.tint : Colors.light.tint }
              ]}>
                {getAverageDifficulty()}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Render saved questions as cards */}
      {questions.length > 0 ? (
        <ScrollView 
          style={styles.questionsContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {questions.map((q, idx) => (
            <QuestionCard
              key={`question-${idx}`}
              // Core question data
              question={q.question || ''}
              answer={q.answer || ''}
              options={q.options || []}
              points={q.points || 10}
              penalty={q.penalty || 0}
              image={q.image || null}
              explanation={q.explanation || null}
              
              // Display properties
              questionNumber={idx + 1}
              isDark={isDark}
              
              // Action handlers
              onEdit={() => onEditQuestion && onEditQuestion(idx)}
              onDelete={() => {
                console.log('QuestionsSection onDelete called for index:', idx);
                console.log('onDeleteQuestion exists in QuestionsSection:', !!onDeleteQuestion);
                if (onDeleteQuestion) {
                  console.log('About to call onDeleteQuestion with index:', idx);
                  onDeleteQuestion(idx);
                } else {
                  console.error('onDeleteQuestion is undefined in QuestionsSection!');
                }
              }}

              
              // Any additional properties from the question object
              {...(q.additionalProps || {})}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>❓</Text>
          <Text style={[
            styles.emptyStateText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            No questions added yet
          </Text>
          <Text style={[
            styles.emptyStateSubtext,
            { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
          ]}>
            Click the button below to add your first question and start building your quiz.
          </Text>
        </View>
      )}

      <Pressable
        style={[
          styles.addButton,
          { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
        ]}
        onPress={onAddPress}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>
          {questions.length === 0 ? 'Add First Question' : 'Add Another Question'}
        </Text>
      </Pressable>
      
      {/* Validation hint */}
      {questions.length > 0 && questions.length < 3 && (
        <View style={[
          styles.hintContainer,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
          }
        ]}>
          <Text style={[
            styles.hintText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            💡 Consider adding at least 3-5 questions for a good quiz experience
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionsContainer: {
    maxHeight: 400, // Limit height to prevent excessive scrolling
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
  },
  hintContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 18,
  },
});
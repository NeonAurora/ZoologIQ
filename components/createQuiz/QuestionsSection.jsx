import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import QuestionCard from './QuestionCard';

export default function QuestionsSection({ questions, onAddPress }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.section, isDark && styles.sectionDark]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Questions</Text>
        <Text style={[styles.questionCount, isDark && styles.textLight]}>
          {questions.length} {questions.length === 1 ? 'question' : 'questions'}
        </Text>
      </View>

      {/* Render saved questions as cards */}
      {questions.length > 0 ? (
        questions.map((q, idx) => (
          <QuestionCard
            key={idx}
            question={q.question}
            answer={q.answer}
            options={q.options}
            points={q.points}
            penalty={q.penalty}
            image={q.image}
          />
        ))
      ) : (
        <Text style={[styles.emptyState, isDark && styles.textLight]}>
          No questions added yet. Click the button below to add your first question.
        </Text>
      )}

      <Pressable
        style={styles.addButton}
        onPress={onAddPress}
      >
        <Text style={styles.addButtonText}>+ Add Question</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionDark: {
    backgroundColor: '#252525',
    shadowColor: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
  },
  questionCount: {
    fontSize: 14,
    color: '#666',
  },
  textLight: { 
    color: '#eee', 
  },
  emptyState: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
  },
});
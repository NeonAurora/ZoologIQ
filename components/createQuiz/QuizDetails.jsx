import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';

export default function QuizDetailsSection({ 
  category, 
  grade, 
  difficulty, 
  onCategoryChange, 
  onGradeChange, 
  onDifficultyChange 
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.section, isDark && styles.sectionDark]}>
      <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Quiz Details</Text>
      
      <Text style={[styles.label, isDark && styles.textLight]}>Category</Text>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter category (e.g. Mathematics, Science)"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={category}
        onChangeText={onCategoryChange}
      />
      
      <Text style={[styles.label, isDark && styles.textLight]}>Grade Level</Text>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter grade level (e.g. 5th grade, High School)"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={grade}
        onChangeText={onGradeChange}
      />
      
      <Text style={[styles.label, isDark && styles.textLight]}>Difficulty</Text>
      <View style={styles.difficultySelector}>
        {['Easy', 'Medium', 'Hard'].map(level => (
          <TouchableOpacity 
            key={level}
            style={[
              styles.difficultyOption,
              difficulty === level && 
              (level === 'Easy' ? styles.easySelected : 
               level === 'Medium' ? styles.mediumSelected : 
               styles.hardSelected)
            ]}
            onPress={() => onDifficultyChange(level)}
          >
            <Text style={[
              styles.difficultyText,
              difficulty === level && styles.selectedDifficultyText
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 16,
  },
  textLight: { 
    color: '#eee', 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '500',
    marginBottom: 8, 
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  inputDark: { 
    borderColor: '#444', 
    backgroundColor: '#333', 
    color: '#eee' 
  },
  difficultySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  difficultyText: {
    color: '#555',
    fontWeight: '500',
  },
  easySelected: {
    backgroundColor: '#a8e6cf',
    borderColor: '#88d7bb',
  },
  mediumSelected: {
    backgroundColor: '#fdffb6',
    borderColor: '#e6e89f',
  },
  hardSelected: {
    backgroundColor: '#ffcfd2',
    borderColor: '#f0b6bb',
  },
  selectedDifficultyText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
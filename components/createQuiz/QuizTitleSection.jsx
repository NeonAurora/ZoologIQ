// components/createQuiz/QuizTitleSection.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export default function QuizTitleSection({ title, onTitleChange }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.section, isDark && styles.sectionDark]}>
      <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Quiz Title</Text>
      
      {/* English Title */}
      <View style={styles.languageGroup}>
        <Text style={[styles.languageLabel, isDark && styles.textLight]}>
          🇺🇸 English Title *
        </Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Enter quiz title in English"
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={title.en || ''}
          onChangeText={(text) => onTitleChange({ ...title, en: text })}
          maxLength={100}
        />
      </View>

      {/* Malay Title */}
      <View style={styles.languageGroup}>
        <Text style={[styles.languageLabel, isDark && styles.textLight]}>
          🇲🇾 Malay Title *
        </Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Enter quiz title in Malay"
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={title.ms || ''}
          onChangeText={(text) => onTitleChange({ ...title, ms: text })}
          maxLength={100}
        />
      </View>

      {/* Helper text */}
      <Text style={[styles.helperText, isDark && styles.textLight]}>
        Both English and Malay titles are required
      </Text>
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
  languageGroup: {
    marginBottom: 12,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  inputDark: { 
    borderColor: '#444', 
    backgroundColor: '#333', 
    color: '#eee' 
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
});
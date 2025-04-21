import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export default function QuizTitleSection({ title, onTitleChange }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.section, isDark && styles.sectionDark]}>
      <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Quiz Title</Text>
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter quiz title"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={title}
        onChangeText={onTitleChange}
      />
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
    marginBottom: 12,
  },
  textLight: { 
    color: '#eee', 
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
});
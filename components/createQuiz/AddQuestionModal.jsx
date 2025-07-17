// components/createQuiz/AddQuestionModal.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  ScrollView, 
  Pressable, 
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { useColorScheme } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-paper';

import { uploadImage } from '@/services/supabase';
import ImagePicker from './ImagePicker';
import PointsControl from './PointsControl';

export default function AddQuestionModal({ visible, onClose, onSubmit, editingData, isEditing }) {
  // Bilingual question data structure
  const [questionData, setQuestionData] = useState({
    question_text: { en: '', ms: '' },
    options: { en: ['', '', '', ''], ms: ['', '', '', ''] },
    explanation: { en: '', ms: '' },
    correct_answer: '',
    points: 10,
    penalty: 0,
    image: null,
  });
  
  const [optionsCount, setOptionsCount] = useState('4');
  const [isUploading, setIsUploading] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Load editing data when modal opens
  useEffect(() => {
    if (visible && editingData) {
      setQuestionData({
        question_text: editingData.question_text || { en: '', ms: '' },
        options: editingData.options || { en: ['', '', '', ''], ms: ['', '', '', ''] },
        explanation: editingData.explanation || { en: '', ms: '' },
        correct_answer: editingData.correct_answer || '',
        points: editingData.points || 10,
        penalty: editingData.penalty || 0,
        image: editingData.image || null,
      });
      
      // 🔥 NEW: Set correct answer index based on existing data
      if (editingData.correct_answer && editingData.options?.en) {
        const index = editingData.options.en.findIndex(opt => opt === editingData.correct_answer);
        setCorrectAnswerIndex(index >= 0 ? index : 0);
      }
      
      setOptionsCount(String(editingData.options?.en?.length || 4));
    } else if (visible && !editingData) {
      resetForm();
    }
  }, [visible, editingData]);

  const resetForm = () => {
    setQuestionData({
      question_text: { en: '', ms: '' },
      options: { en: ['', '', '', ''], ms: ['', '', '', ''] },
      explanation: { en: '', ms: '' },
      correct_answer: '',
      points: 10,
      penalty: 0,
      image: null,
    });
    setOptionsCount('4');
    setCorrectAnswerIndex(0); // 🔥 NEW: Reset index
  };

  const handleOptionsCountChange = useCallback((text) => {
    const num = parseInt(text, 10);
    setOptionsCount(text);
    if (!isNaN(num) && num >= 2 && num <= 8) {
      setQuestionData(prev => ({
        ...prev,
        options: {
          en: Array.from({ length: num }, (_, i) => prev.options.en[i] || ''),
          ms: Array.from({ length: num }, (_, i) => prev.options.ms[i] || ''),
        }
      }));
    }
  }, []);

  const handleQuestionTextChange = (language, text) => {
    setQuestionData(prev => ({
      ...prev,
      question_text: {
        ...prev.question_text,
        [language]: text
      }
    }));
  };

  const handleOptionChange = (language, index, text) => {
    setQuestionData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [language]: prev.options[language].map((opt, i) => i === index ? text : opt)
      }
    }));
  };

  const handleExplanationChange = (language, text) => {
    setQuestionData(prev => ({
      ...prev,
      explanation: {
        ...prev.explanation,
        [language]: text
      }
    }));
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Please allow access to your photos to add images to questions.");
        return;
      }
    
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [16, 9],
      });
    
      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        setQuestionData(prev => ({
          ...prev,
          image: imageUri,
          imageIsLocal: true
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleRemoveImage = () => {
    setQuestionData(prev => ({
      ...prev,
      image: null,
      imageIsLocal: false
    }));
  };

  // Validation
  const isFormValid = () => {
    const hasEnglishQuestion = questionData.question_text.en.trim().length > 0;
    const hasMalayQuestion = questionData.question_text.ms.trim().length > 0;
    const hasValidEnglishOptions = questionData.options.en.every(opt => opt.trim().length > 0);
    const hasValidMalayOptions = questionData.options.ms.every(opt => opt.trim().length > 0);
    const hasCorrectAnswer = correctAnswerIndex >= 0 && correctAnswerIndex < questionData.options.en.length; // 🔥 UPDATED
    
    return hasEnglishQuestion && hasMalayQuestion && hasValidEnglishOptions && hasValidMalayOptions && hasCorrectAnswer;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Validation Error', 'Please fill in all required fields for both languages.');
      return;
    }

    // 🔥 CRITICAL FIX: Ensure correct_answer exactly matches the option text
    const englishOptions = questionData.options.en;
    const correctAnswerText = englishOptions[correctAnswerIndex]?.trim(); // Trim whitespace

    // Validate that the correct answer exists in the options
    if (!correctAnswerText || !englishOptions.includes(correctAnswerText)) {
      Alert.alert('Error', 'Please select a valid correct answer option.');
      return;
    }

    // Format data for submission
    const submissionData = {
      question_text: questionData.question_text,
      options: questionData.options,
      explanation: questionData.explanation,
      correct_answer: correctAnswerText, // 🔥 GUARANTEED to match an option
      correct_answer_index: correctAnswerIndex,
      points: questionData.points,
      penalty: questionData.penalty,
      image: questionData.image,
      imageIsLocal: questionData.imageIsLocal
    };

    console.log('🔍 Submitting question data:', {
      correct_answer: correctAnswerText,
      english_options: englishOptions,
      selected_index: correctAnswerIndex
    });

    onSubmit(submissionData);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          isDark ? styles.modalContentDark : styles.modalContentLight
        ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.modalTitle, isDark && styles.textLight]}>
              {isEditing ? 'Edit Question' : 'Add New Question'}
            </Text>

            {/* Question Text - English */}
            <Text style={[styles.label, isDark && styles.textLight]}>🇺🇸 Question Text (English) *</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Enter your question in English..."
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={questionData.question_text.en}
              onChangeText={(text) => handleQuestionTextChange('en', text)}
              multiline
              maxLength={300}
            />

            {/* Question Text - Malay */}
            <Text style={[styles.label, isDark && styles.textLight]}>🇲🇾 Question Text (Malay) *</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Enter your question in Malay..."
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={questionData.question_text.ms}
              onChangeText={(text) => handleQuestionTextChange('ms', text)}
              multiline
              maxLength={300}
            />

            {/* Question Image */}
            <Text style={[styles.label, isDark && styles.textLight]}>Question Image (Optional)</Text>
            <ImagePicker
              image={questionData.image}
              onPickImage={handlePickImage}
              onRemoveImage={handleRemoveImage}
              isUploading={isUploading}
            />

            {/* Number of Options */}
            <View style={styles.optionsCountRow}>
              <Text style={[styles.optionsCountLabel, isDark && styles.textLight]}>Number of options:</Text>
              <TextInput
                style={[styles.optionsCountInput, isDark && styles.inputDark]}
                placeholder="4"
                placeholderTextColor={isDark ? '#aaa' : '#888'}
                value={optionsCount}
                onChangeText={handleOptionsCountChange}
                keyboardType="numeric"
                maxLength={1}
              />
            </View>

            {/* Options - English */}
            {questionData.options.en.length > 0 && (
              <View style={styles.optionsGrid}>
                <Text style={[styles.label, isDark && styles.textLight]}>🇺🇸 Answer Options (English) *</Text>
                {questionData.options.en.map((opt, idx) => (
                  <View key={`en-${idx}`} style={styles.optionContainer}>
                    <Text style={[styles.optionLabel, isDark && styles.textLight]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                    <TextInput
                      style={[styles.input, styles.optionInput, isDark && styles.inputDark]}
                      placeholder={`Option ${String.fromCharCode(65 + idx)} in English`}
                      placeholderTextColor={isDark ? '#aaa' : '#888'}
                      value={opt}
                      onChangeText={(text) => handleOptionChange('en', idx, text)}
                      maxLength={200}
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Options - Malay */}
            {questionData.options.ms.length > 0 && (
              <View style={styles.optionsGrid}>
                <Text style={[styles.label, isDark && styles.textLight]}>🇲🇾 Answer Options (Malay) *</Text>
                {questionData.options.ms.map((opt, idx) => (
                  <View key={`ms-${idx}`} style={styles.optionContainer}>
                    <Text style={[styles.optionLabel, isDark && styles.textLight]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                    <TextInput
                      style={[styles.input, styles.optionInput, isDark && styles.inputDark]}
                      placeholder={`Option ${String.fromCharCode(65 + idx)} in Malay`}
                      placeholderTextColor={isDark ? '#aaa' : '#888'}
                      value={opt}
                      onChangeText={(text) => handleOptionChange('ms', idx, text)}
                      maxLength={200}
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Correct Answer Selection */}
            <Text style={[styles.label, isDark && styles.textLight]}>Correct Answer *</Text>
            <View style={[styles.answerSelector, isDark && styles.answerSelectorDark]}>
              {questionData.options.en.map((opt, idx) => (
                (opt.trim() && questionData.options.ms[idx]?.trim()) ? (
                  <TouchableOpacity
                    key={`ans-${idx}`}
                    style={[
                      styles.answerOption,
                      idx === correctAnswerIndex && styles.selectedAnswerOption // 🔥 UPDATED: Compare with index
                    ]}
                    onPress={() => setCorrectAnswerIndex(idx)} // 🔥 UPDATED: Set index instead of text
                  >
                    <Text style={[
                      styles.answerOptionText,
                      idx === correctAnswerIndex && styles.selectedAnswerText // 🔥 UPDATED: Compare with index
                    ]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </TouchableOpacity>
                ) : null
              ))}
            </View>

            {/* Explanation - English */}
            <Text style={[styles.label, isDark && styles.textLight]}>🇺🇸 Explanation (English, Optional)</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Explain why this answer is correct in English..."
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={questionData.explanation.en}
              onChangeText={(text) => handleExplanationChange('en', text)}
              multiline
              maxLength={300}
            />

            {/* Explanation - Malay */}
            <Text style={[styles.label, isDark && styles.textLight]}>🇲🇾 Explanation (Malay, Optional)</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Explain why this answer is correct in Malay..."
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={questionData.explanation.ms}
              onChangeText={(text) => handleExplanationChange('ms', text)}
              multiline
              maxLength={300}
            />

            {/* Points and Penalty Controls */}
            <PointsControl
              label="Points for correct answer"
              value={questionData.points}
              onChange={(value) => setQuestionData(prev => ({ ...prev, points: value }))}
              min={1}
              max={50}
              isDark={isDark}
            />

            <PointsControl
              label="Penalty for wrong answer"
              value={questionData.penalty}
              onChange={(value) => setQuestionData(prev => ({ ...prev, penalty: value }))}
              min={0}
              max={questionData.points}
              isDark={isDark}
              color="#e74c3c"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[
                  styles.submitButton,
                  (!isFormValid() || isUploading) && styles.disabledButton
                ]}
                onPress={handleSubmit}
                disabled={!isFormValid() || isUploading}
              >
                {isUploading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.submitButtonText}>Processing...</Text>
                  </View>
                ) : (
                  <Text style={styles.submitButtonText}>
                    {isEditing ? 'Update Question' : 'Add Question'}
                  </Text>
                )}
              </Pressable>
              
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  resetForm();
                  onClose();
                }}
                disabled={isUploading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  modalContent: { 
    width: '100%', 
    maxHeight: '90%',
    borderRadius: 12, 
    padding: 20,
    maxWidth: Platform.OS === 'web' ? 600 : undefined,
  },
  modalContentLight: { 
    backgroundColor: '#fff' 
  },
  modalContentDark: { 
    backgroundColor: '#252525' 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center', 
    color: '#333' 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600',
    marginBottom: 8, 
    color: '#555',
    marginTop: 8,
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
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  textAreaInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputDark: { 
    borderColor: '#444', 
    backgroundColor: '#333', 
    color: '#eee' 
  },
  optionsCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionsCountLabel: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  optionsCountInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'center',
  },
  optionsGrid: { 
    marginBottom: 16 
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    width: 25,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  optionInput: { 
    flex: 1,
    marginBottom: 8,
  },
  answerSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },
  answerSelectorDark: {
    backgroundColor: '#333',
  },
  answerOption: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedAnswerOption: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  answerOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedAnswerText: {
    color: '#fff',
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  submitButton: { 
    flex: 1, 
    backgroundColor: '#0a7ea4', 
    paddingVertical: 12, 
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: { 
    flex: 1, 
    backgroundColor: '#f1f1f1', 
    paddingVertical: 12, 
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: { 
    color: '#333', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
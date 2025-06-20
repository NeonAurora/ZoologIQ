import React, { useState, useCallback } from 'react';
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

// Updated imports - using centralized services
import { uploadImage } from '@/services/supabase/storage';
import ImagePicker from './ImagePicker';
import PointsControl from './PointsControl';

export default function AddQuestionModal({ visible, onClose, onSubmit }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [optionsCount, setOptionsCount] = useState('4');
  const [optionsInputs, setOptionsInputs] = useState(['', '', '', '']);
  const [questionPoints, setQuestionPoints] = useState(10);
  const [questionPenalty, setQuestionPenalty] = useState(0);
  const [questionImage, setQuestionImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [explanation, setExplanation] = useState('');

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const resetForm = () => {
    setNewQuestion('');
    setNewAnswer('');
    setOptionsCount('4');
    setOptionsInputs(['', '', '', '']);
    setQuestionPoints(10);
    setQuestionPenalty(0);
    setQuestionImage(null);
    setExplanation('');
  };

  const handleOptionsCountChange = useCallback((text) => {
    const num = parseInt(text, 10);
    setOptionsCount(text);
    if (!isNaN(num) && num >= 2 && num <= 8) {
      setOptionsInputs((prev) => Array.from({ length: num }, (_, i) => prev[i] || ''));
    } else {
      setOptionsInputs([]);
    }
  }, []);

  const handleOptionChange = useCallback((text, idx) => {
    setOptionsInputs((prev) => {
      const newArr = [...prev];
      newArr[idx] = text;
      return newArr;
    });
  }, []);

  const handlePickImage = async () => {
    try {
      // Request permissions
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required", 
          "Please allow access to your photos to add images to questions."
        );
        return;
      }
    
      // Launch picker
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
        aspect: [16, 9],
      });
    
      // Handle selection
      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Image selected:', imageUri);
        
        // Set the local image URI (will be uploaded when question is saved)
        setQuestionImage(imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleRemoveImage = () => {
    setQuestionImage(null);
  };

  const handleSubmit = async () => {
    // Validate form
    if (!newQuestion.trim()) {
      Alert.alert("Error", "Please enter a question.");
      return;
    }

    if (!newAnswer.trim()) {
      Alert.alert("Error", "Please select a correct answer.");
      return;
    }

    if (optionsInputs.some(opt => !opt.trim())) {
      Alert.alert("Error", "Please fill in all answer options.");
      return;
    }

    if (!optionsInputs.includes(newAnswer)) {
      Alert.alert("Error", "The correct answer must be one of the provided options.");
      return;
    }

    try {
      let finalImageUrl = null;

      // If there's an image, upload it now
      if (questionImage) {
        setIsUploading(true);
        console.log('Uploading image...');
        
        finalImageUrl = await uploadImage(questionImage);
        
        if (!finalImageUrl) {
          Alert.alert(
            "Image Upload Failed", 
            "The image could not be uploaded. Do you want to continue without the image?",
            [
              { text: "Cancel", style: "cancel" },
              { 
                text: "Continue", 
                onPress: () => submitQuestion(null)
              }
            ]
          );
          setIsUploading(false);
          return;
        }
        
        console.log('Image uploaded successfully:', finalImageUrl);
      }

      submitQuestion(finalImageUrl);
    } catch (error) {
      console.error('Error submitting question:', error);
      Alert.alert("Error", "Failed to save question. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const submitQuestion = (imageUrl) => {
    const questionData = {
      question: newQuestion.trim(),
      answer: newAnswer,
      options: optionsInputs.map(opt => opt.trim()),
      points: questionPoints,
      penalty: questionPenalty,
      image: imageUrl,
      explanation: explanation.trim() || null,
      imageIsLocal: false // Since we've already uploaded it
    };
    
    console.log('Submitting question:', questionData);
    onSubmit(questionData);
    resetForm();
    onClose();
  };

  const num = parseInt(optionsCount, 10);
  const showOptionsError = optionsCount !== '' && (isNaN(num) || num < 2 || num > 8);
  
  // Form validation
  const isSubmitDisabled = !newQuestion.trim() || 
                          !newAnswer.trim() || 
                          showOptionsError || 
                          optionsInputs.some(opt => !opt.trim()) ||
                          !optionsInputs.includes(newAnswer) ||
                          isUploading;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            isDark ? styles.modalContentDark : styles.modalContentLight
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.modalTitle, isDark && styles.textLight]}>
              Add New Question
            </Text>

            {/* Question Text */}
            <Text style={[styles.label, isDark && styles.textLight]}>Question *</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Enter your question"
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline
              maxLength={500}
            />

            {/* Question Image */}
            <Text style={[styles.label, isDark && styles.textLight]}>Image (Optional)</Text>
            <ImagePicker
              image={questionImage}
              onPickImage={handlePickImage}
              onRemoveImage={handleRemoveImage}
              isUploading={isUploading}
            />

            {/* Options */}
            <Text style={[styles.label, isDark && styles.textLight]}>Answer Options *</Text>
            <View style={styles.optionsCountRow}>
              <Text style={[styles.optionsCountLabel, isDark && styles.textLight]}>
                Number of options:
              </Text>
              <TextInput
                style={[styles.optionsCountInput, isDark && styles.inputDark]}
                value={optionsCount}
                onChangeText={handleOptionsCountChange}
                keyboardType="numeric"
                maxLength={1}
              />
            </View>
            
            {showOptionsError && (
              <Text style={styles.errorText}>
                Please enter a number between 2 and 8
              </Text>
            )}

            {optionsInputs.length > 0 && (
              <View style={styles.optionsGrid}>
                {optionsInputs.map((opt, idx) => (
                  <View key={`opt-${idx}`} style={styles.optionContainer}>
                    <Text style={[styles.optionLabel, isDark && styles.textLight]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                    <TextInput
                      style={[styles.input, styles.optionInput, isDark && styles.inputDark]}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      placeholderTextColor={isDark ? '#aaa' : '#888'}
                      value={opt}
                      onChangeText={(text) => handleOptionChange(text, idx)}
                      maxLength={200}
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Correct Answer */}
            <Text style={[styles.label, isDark && styles.textLight]}>Correct Answer *</Text>
            <View style={[styles.answerSelector, isDark && styles.answerSelectorDark]}>
              {optionsInputs.map((opt, idx) => (
                opt.trim() ? (
                  <TouchableOpacity
                    key={`ans-${idx}`}
                    style={[
                      styles.answerOption,
                      opt === newAnswer && styles.selectedAnswerOption
                    ]}
                    onPress={() => setNewAnswer(opt)}
                  >
                    <Text style={[
                      styles.answerOptionText,
                      opt === newAnswer && styles.selectedAnswerText
                    ]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </TouchableOpacity>
                ) : null
              ))}
            </View>

            {/* Explanation */}
            <Text style={[styles.label, isDark && styles.textLight]}>Explanation (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Explain why this answer is correct..."
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={explanation}
              onChangeText={setExplanation}
              multiline
              maxLength={300}
            />

            {/* Points and Penalty Controls */}
            <PointsControl
              label="Points for correct answer"
              value={questionPoints}
              onChange={setQuestionPoints}
              min={1}
              max={50}
              isDark={isDark}
            />

            <PointsControl
              label="Penalty for wrong answer"
              value={questionPenalty}
              onChange={setQuestionPenalty}
              min={0}
              max={questionPoints}
              isDark={isDark}
              color="#e74c3c"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[
                  styles.submitButton,
                  isSubmitDisabled && styles.disabledButton
                ]}
                onPress={handleSubmit}
                disabled={isSubmitDisabled}
              >
                {isUploading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.submitButtonText}>Uploading...</Text>
                  </View>
                ) : (
                  <Text style={styles.submitButtonText}>Add Question</Text>
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
    maxWidth: Platform.OS === 'web' ? 500 : undefined,
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
    fontWeight: '500',
    marginBottom: 8, 
    color: '#555',
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
    marginBottom: 8,
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
  errorText: { 
    color: '#e74c3c', 
    fontSize: 14, 
    marginBottom: 8 
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
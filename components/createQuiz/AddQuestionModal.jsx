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
  Platform
} from 'react-native';
import { useColorScheme } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import ImagePicker from '@/components/createQuiz/ImagePicker';
import PointsControl from './PointsControl';

export default function AddQuestionModal({ visible, onClose, onSubmit }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [optionsCount, setOptionsCount] = useState('4');
  const [optionsInputs, setOptionsInputs] = useState(['', '', '', '']);
  const [questionPoints, setQuestionPoints] = useState(10);
  const [questionPenalty, setQuestionPenalty] = useState(0);
  const [questionImage, setQuestionImage] = useState(null);

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
    // 1) Request permissions
    const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please allow access to your photos.");
      return;
    }
  
    // 2) Launch picker (note the `await` and string mediaTypes)
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',  // use literal string to avoid the deprecated enum
      quality: 0.7,
    });
  
    // 3) Log it so you can see exactly what shape it has
    console.log("Picker result:", result);
  
    // 4) New API has `canceled` and an `assets` array
    if (!result.cancelled && result.assets?.length > 0) {
      console.log("Picked URI:", result.assets[0].uri);
      setQuestionImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const questionData = {
      question: newQuestion,
      answer: newAnswer,
      options: optionsInputs,
      points: questionPoints,
      penalty: questionPenalty,
      image: questionImage
    };
    
    onSubmit(questionData);
    resetForm();
    onClose();
  };

  const num = parseInt(optionsCount, 10);
  const showOptionsError = optionsCount !== '' && (isNaN(num) || num < 2 || num > 8);
  
  // Form validation
  const isSubmitDisabled = !newQuestion || 
                          !newAnswer || 
                          showOptionsError || 
                          optionsInputs.some(opt => !opt) ||
                          !optionsInputs.includes(newAnswer);

  const SimplePointsControl = ({ label, value, onChange, min = 0, max = 20, textColor = '#333' }) => (
    <View style={styles.pointsControlContainer}>
      <Text style={[styles.label, isDark && styles.textLight, { color: textColor }]}>
        {label}: {value}
      </Text>
      <View style={styles.pointsControls}>
        <Pressable 
          style={styles.pointsButton} 
          onPress={() => onChange(Math.max(min, value - 1))}
        >
          <Text style={styles.pointsButtonText}>-</Text>
        </Pressable>
        <Text style={[styles.pointsValue, isDark && styles.textLight]}>
          {value}
        </Text>
        <Pressable 
          style={styles.pointsButton} 
          onPress={() => onChange(Math.min(max, value + 1))}
        >
          <Text style={styles.pointsButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );

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
            <Text style={[styles.modalTitle, isDark && styles.textLight]}>Add New Question</Text>

            {/* Question Text */}
            <Text style={[styles.label, isDark && styles.textLight]}>Question</Text>
            <TextInput
              style={[styles.input, styles.textAreaInput, isDark && styles.inputDark]}
              placeholder="Enter your question"
              placeholderTextColor={isDark ? '#aaa' : '#888'}
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline
            />

            {/* Question Image */}
            <Text style={[styles.label, isDark && styles.textLight]}>Image (Optional)</Text>
            <ImagePicker
              image={questionImage}
              onPickImage={handlePickImage}
            />

            {/* Options */}
            <Text style={[styles.label, isDark && styles.textLight]}>Options</Text>
            <View style={styles.optionsCountRow}>
              <Text style={[styles.optionsCountLabel, isDark && styles.textLight]}>
                Number of options:
              </Text>
              <TextInput
                style={[styles.optionsCountInput, isDark && styles.inputDark]}
                value={optionsCount}
                onChangeText={handleOptionsCountChange}
                keyboardType="numeric"
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
                      placeholder={`Option ${idx + 1}`}
                      placeholderTextColor={isDark ? '#aaa' : '#888'}
                      value={opt}
                      onChangeText={(text) => handleOptionChange(text, idx)}
                    />
                  </View>
                ))}
              </View>
            )}

            <Text style={[styles.label, isDark && styles.textLight]}>Correct Answer</Text>
            <View style={[styles.answerSelector, isDark && styles.answerSelectorDark]}>
              {optionsInputs.map((opt, idx) => (
                opt ? (
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

            {/* Points and Penalty Controls */}
            <SimplePointsControl
              label="Points"
              value={questionPoints}
              onChange={setQuestionPoints}
              min={1}
              max={20}
            />

            <SimplePointsControl
              label="Penalty for wrong answer"
              value={questionPenalty}
              onChange={setQuestionPenalty}
              max={questionPoints}
              textColor="#e74c3c"
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
                <Text style={styles.submitButtonText}>Add Question</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  resetForm();
                  onClose();
                }}
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
  // Image picker styles
  imageSelector: {
    height: 160,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  imageSelectorDark: {
    borderColor: '#444',
    backgroundColor: '#333',
  },
  imagePickerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#888',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  // Points control styles
  pointsControlContainer: {
    marginBottom: 16,
  },
  pointsControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0a7ea4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pointsValue: {
    width: 60,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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
    margin: 4,
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
  },
  submitButton: { 
    flex: 1, 
    backgroundColor: '#0a7ea4', 
    paddingVertical: 12, 
    borderRadius: 8, 
    marginRight: 8 
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
    marginLeft: 8 
  },
  cancelButtonText: { 
    color: '#333', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16,
  },
});
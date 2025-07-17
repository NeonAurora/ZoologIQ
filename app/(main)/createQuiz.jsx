// app/(main)/createQuiz.jsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';

import { saveQuiz } from '@/services/supabase';
import { uploadImage } from '@/services/supabase';

import QuizTitleSection from '@/components/createQuiz/QuizTitleSection';
import QuestionsSection from '@/components/createQuiz/QuestionsSection';
import QuizDetailsSection from '@/components/createQuiz/QuizDetails';
import AddQuestionModal from '@/components/createQuiz/AddQuestionModal';

export default function CreateQuizPage() {
  const { user } = useAuth();
  const userId = user?.sub || "guest_user";
  
  // 🔥 UPDATED: Bilingual quiz metadata
  const [quizTitle, setQuizTitle] = useState({ en: '', ms: '' });
  const [quizCategory, setQuizCategory] = useState('');
  const [quizGrade, setQuizGrade] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('Medium');
  const [savedQuestions, setSavedQuestions] = useState([]);
  
  // Modal and editing state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [editingQuestionData, setEditingQuestionData] = useState(null);
  
  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  
  const scrollViewRef = useRef();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleDeleteQuestion = (index) => {
    console.log('handleDeleteQuestion called with index:', index);
    setSavedQuestions(prev => {
      const newQuestions = prev.filter((_, idx) => idx !== index);
      console.log('Questions after deletion:', newQuestions.length);
      return newQuestions;
    });
    console.log(`Question ${index + 1} deleted successfully`);
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = savedQuestions[index];
    setEditingQuestionData(questionToEdit);
    setEditingQuestionIndex(index);
    setModalVisible(true);
  };

  const handleAddOrUpdateQuestion = (questionData) => {
    if (editingQuestionIndex !== null) {
      // Update existing question
      setSavedQuestions(prev => {
        const updated = [...prev];
        updated[editingQuestionIndex] = questionData;
        return updated;
      });
      
      console.log(`Question ${editingQuestionIndex + 1} updated successfully`);
      
      // Reset editing state
      setEditingQuestionIndex(null);
      setEditingQuestionData(null);
    } else {
      // Add new question
      setSavedQuestions(prev => [...prev, questionData]);
      
      console.log('New question added successfully');
      
      // Scroll to bottom to show newly added question
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingQuestionIndex(null);
    setEditingQuestionData(null);
  };

  const handleAddNewQuestion = () => {
    setEditingQuestionIndex(null);
    setEditingQuestionData(null);
    setModalVisible(true);
  };

  const saveQuizToDatabase = async () => {
    // 🔥 UPDATED: Validation for bilingual content
    if (!quizTitle.en?.trim() || !quizTitle.ms?.trim() || savedQuestions.length === 0) {
      alert("Please add both English and Malay titles and at least one question");
      return;
    }

    setIsSaving(true);

    try {
      console.log('Starting bilingual quiz save process...');
      
      // Process questions and upload images if needed
      const processedQuestions = await Promise.all(
        savedQuestions.map(async (question, index) => {
          console.log(`Processing question ${index + 1}...`);
          
          // 🔥 DEBUGGING: Log the raw question data
          console.log(`🔍 Raw question ${index + 1} data:`, {
            correct_answer: question.correct_answer,
            english_options: question.options?.en,
            malay_options: question.options?.ms,
            question_text: question.question_text
          });
          
          let finalImageUrl = question.image;
          
          // Upload image if it's local
          if (question.image && question.imageIsLocal) {
            console.log(`Uploading image for question ${index + 1}...`);
            const imageUrl = await uploadImage(question.image);
            
            if (!imageUrl) {
              console.error("Failed to upload image for question:", question.question_text);
              alert(`Failed to upload image for question ${index + 1}. Continuing without image.`);
              finalImageUrl = null;
            } else {
              console.log(`Image uploaded successfully for question ${index + 1}`);
              finalImageUrl = imageUrl;
            }
          }

          // 🔥 VALIDATE: Ensure we have proper bilingual data
          if (!question.question_text || !question.question_text.en || !question.question_text.ms) {
            throw new Error(`Question ${index + 1}: Missing bilingual question text`);
          }

          if (!question.options || !question.options.en || !question.options.ms) {
            throw new Error(`Question ${index + 1}: Missing bilingual options`);
          }

          // 🔥 CLEAN AND VALIDATE OPTIONS
          const englishOptions = question.options.en.map(opt => opt?.trim()).filter(opt => opt);
          const malayOptions = question.options.ms.map(opt => opt?.trim()).filter(opt => opt);

          // 🔥 VALIDATE: Ensure both language options are properly filled
          if (englishOptions.length === 0) {
            throw new Error(`Question ${index + 1}: No valid English options provided`);
          }

          if (malayOptions.length === 0) {
            throw new Error(`Question ${index + 1}: No valid Malay options provided`);
          }

          // 🔥 VALIDATE: Ensure same number of options in both languages
          if (englishOptions.length !== malayOptions.length) {
            throw new Error(`Question ${index + 1}: English (${englishOptions.length}) and Malay (${malayOptions.length}) options must have the same number of items`);
          }

          // 🔥 UPDATED: Handle index-based correct answer validation
          const correctAnswerText = question.correct_answer?.trim();
          
          if (!correctAnswerText) {
            throw new Error(`Question ${index + 1}: No correct answer selected`);
          }

          // Find the index of correct answer in English options
          const correctAnswerIndex = englishOptions.findIndex(opt => opt === correctAnswerText);
          
          if (correctAnswerIndex === -1) {
            console.error(`❌ Question ${index + 1}: Correct answer "${correctAnswerText}" not found in English options:`, englishOptions);
            throw new Error(`Question ${index + 1}: Correct answer "${correctAnswerText}" must be one of the provided English options: ${englishOptions.join(', ')}`);
          }

          // 🔥 NEW: Validate that the corresponding Malay option exists and is valid
          const correspondingMalayOption = malayOptions[correctAnswerIndex];
          if (!correspondingMalayOption || correspondingMalayOption.trim() === '') {
            throw new Error(`Question ${index + 1}: The Malay option at position ${correctAnswerIndex + 1} (corresponding to correct English answer "${correctAnswerText}") is empty or invalid`);
          }

          console.log(`🔍 Question ${index + 1} validation:`, {
            correct_answer_text: correctAnswerText,
            correct_answer_index: correctAnswerIndex,
            english_options: englishOptions,
            malay_options: malayOptions,
            corresponding_malay_option: correspondingMalayOption,
            english_count: englishOptions.length,
            malay_count: malayOptions.length
          });

          // 🔥 UPDATED: Return bilingual question structure with index-based correct answer
          const result = {
            question_text: question.question_text, // { en: "...", ms: "..." }
            options: {
              en: englishOptions, // Cleaned English options
              ms: malayOptions    // Cleaned Malay options
            },
            correct_answer: correctAnswerIndex.toString(), // 🔥 NEW: Store index as string ("0", "1", "2", "3")
            correct_answer_text: correctAnswerText, // 🔥 NEW: Keep text for reference/debugging
            explanation: question.explanation || { en: '', ms: '' }, // { en: "...", ms: "..." }
            points: question.points || 10,
            penalty: question.penalty || 0,
            image: finalImageUrl,
            imageIsLocal: undefined // Remove this flag
          };

          // 🔥 FINAL VALIDATION: Ensure index is within bounds for both languages
          const finalIndex = parseInt(result.correct_answer, 10);
          if (finalIndex < 0 || finalIndex >= result.options.en.length || finalIndex >= result.options.ms.length) {
            console.error(`❌ FINAL VALIDATION FAILED for Question ${index + 1}:`, {
              correct_answer_index: finalIndex,
              english_options_length: result.options.en.length,
              malay_options_length: result.options.ms.length
            });
            throw new Error(`Question ${index + 1}: Final validation failed - index ${finalIndex} is out of bounds`);
          }

          // 🔥 FINAL VALIDATION: Ensure both options at the index are valid
          if (!result.options.en[finalIndex] || !result.options.ms[finalIndex]) {
            throw new Error(`Question ${index + 1}: Final validation failed - options at index ${finalIndex} are invalid`);
          }

          console.log(`✅ Question ${index + 1} validated successfully:`, {
            index: finalIndex,
            english_option: result.options.en[finalIndex],
            malay_option: result.options.ms[finalIndex]
          });
          
          return result;
        })
      );

      console.log('All images processed and questions validated, creating bilingual quiz...');
      console.log('🔍 Processed questions summary:', processedQuestions.map((q, i) => ({
        question: i + 1,
        correct_answer_index: q.correct_answer,
        correct_answer_text: q.correct_answer_text,
        english_options_count: q.options.en.length,
        malay_options_count: q.options.ms.length,
        english_correct: q.options.en[parseInt(q.correct_answer, 10)],
        malay_correct: q.options.ms[parseInt(q.correct_answer, 10)]
      })));

      // 🔥 UPDATED: Create bilingual quiz data
      const quizData = {
        title: quizTitle, // { en: "...", ms: "..." }
        description: {
          en: `A quiz about ${quizCategory || 'various topics'}`,
          ms: `Kuiz tentang ${quizCategory || 'pelbagai topik'}`
        },
        category: quizCategory || 'General',
        grade: quizGrade,
        difficulty: quizDifficulty,
        questions: processedQuestions,
        created_by: userId,
        createdBy: userId,
      };

      console.log('Saving bilingual quiz data:', quizData);

      // Save quiz using our service
      const savedQuiz = await saveQuiz(quizData);
      
      if (savedQuiz) {
        console.log("✅ Bilingual quiz saved successfully:", savedQuiz);
        alert("Bilingual quiz saved successfully!");
        resetForm();
      } else {
        throw new Error("Failed to save quiz - no data returned");
      }
      
    } catch (error) {
      console.error("❌ Failed to save bilingual quiz:", error);
      
      // More specific error messages for common issues
      let errorMessage = error.message || 'Please try again.';
      
      if (errorMessage.includes('must be one of the provided options')) {
        errorMessage = 'There was an issue with the correct answer selection. Please check that you have selected a valid option for each question.';
      } else if (errorMessage.includes('Missing bilingual')) {
        errorMessage = 'Please ensure all questions have both English and Malay text filled in.';
      } else if (errorMessage.includes('same number of items')) {
        errorMessage = 'Please ensure each question has the same number of options in both English and Malay.';
      } else if (errorMessage.includes('No valid English options')) {
        errorMessage = 'Please ensure all English options are filled in and not empty.';
      } else if (errorMessage.includes('No valid Malay options')) {
        errorMessage = 'Please ensure all Malay options are filled in and not empty.';
      } else if (errorMessage.includes('corresponding to correct English answer')) {
        errorMessage = 'There is a problem with the Malay options. Please ensure the Malay option corresponding to your correct answer is properly filled in.';
      }
      
      alert(`Error saving quiz: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 🔥 UPDATED: Reset form with bilingual structure
  const resetForm = () => {
    setQuizTitle({ en: '', ms: '' });
    setQuizCategory('');
    setQuizGrade('');
    setQuizDifficulty('Medium');
    setSavedQuestions([]);
    setEditingQuestionIndex(null);
    setEditingQuestionData(null);
  };

  // 🔥 UPDATED: Form validation for bilingual content
  const isFormValid = quizTitle.en?.trim() && quizTitle.ms?.trim() && savedQuestions.length > 0;
  const isEditing = editingQuestionIndex !== null;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>  
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Bilingual Quiz Title Section */}
        <QuizTitleSection 
          title={quizTitle} 
          onTitleChange={setQuizTitle} 
        />
        
        <QuestionsSection 
          questions={savedQuestions}
          onAddPress={handleAddNewQuestion}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
        
        <QuizDetailsSection 
          category={quizCategory}
          grade={quizGrade}
          difficulty={quizDifficulty}
          onCategoryChange={setQuizCategory}
          onGradeChange={setQuizGrade}
          onDifficultyChange={setQuizDifficulty}
        />

        {/* Save Quiz Button */}
        <TouchableOpacity 
          style={[
            styles.saveQuizButton,
            (!isFormValid || isSaving) && styles.saveQuizButtonDisabled
          ]}
          disabled={!isFormValid || isSaving}
          onPress={saveQuizToDatabase}
        >
          {isSaving ? (
            <View style={styles.savingContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.saveQuizButtonText}>Saving Bilingual Quiz...</Text>
            </View>
          ) : (
            <Text style={styles.saveQuizButtonText}>
              Save Bilingual Quiz ({savedQuestions.length} question{savedQuestions.length !== 1 ? 's' : ''})
            </Text>
          )}
        </TouchableOpacity>
        
        {/* Form validation helper */}
        {!isFormValid && (
          <Text style={styles.validationText}>
            {(!quizTitle.en?.trim() || !quizTitle.ms?.trim()) 
              ? 'Please add quiz titles in both English and Malay' 
              : 'Please add at least one question'}
          </Text>
        )}

        {/* Development helper */}
        {__DEV__ && isEditing && (
          <Text style={styles.debugText}>
            Currently editing question {editingQuestionIndex + 1}
          </Text>
        )}
      </ScrollView>

      {/* Bilingual Question Modal */}
      <AddQuestionModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSubmit={handleAddOrUpdateQuestion}
        editingData={editingQuestionData}
        isEditing={isEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  containerDark: { 
    backgroundColor: '#121212' 
  },
  scroll: { 
    padding: 16,
    paddingBottom: 40
  },
  saveQuizButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  saveQuizButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  saveQuizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  validationText: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  debugText: {
    color: '#0a7ea4',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
});
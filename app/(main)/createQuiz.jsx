// /app/(main)/createQuiz.jsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';

// Updated imports - using centralized services
import { saveQuiz } from '@/services/supabase';
import { uploadImage } from '@/services/supabase';

// Component imports
import QuizTitleSection from '@/components/createQuiz/QuizTitleSection';
import QuestionsSection from '@/components/createQuiz/QuestionsSection';
import QuizDetailsSection from '@/components/createQuiz/QuizDetails';
import AddQuestionModal from '@/components/createQuiz/AddQuestionModal';

export default function CreateQuizPage() {
  const { user } = useAuth();
  const userId = user?.sub || "guest_user";
  
  // Quiz metadata
  const [quizTitle, setQuizTitle] = useState('');
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
    console.log('Current questions length:', savedQuestions.length);
    console.log('Question to delete:', savedQuestions[index]);
    
    setSavedQuestions(prev => {
      const newQuestions = prev.filter((_, idx) => idx !== index);
      console.log('Questions after deletion:', newQuestions.length);
      return newQuestions;
    });
    
    console.log(`Question ${index + 1} deleted successfully`);
  };

  // Edit function
  const handleEditQuestion = (index) => {
    const questionToEdit = savedQuestions[index];
    setEditingQuestionData(questionToEdit);
    setEditingQuestionIndex(index);
    setModalVisible(true);
  };

  // Modified add/update question function
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

  // Reset editing state when modal closes
  const handleModalClose = () => {
    setModalVisible(false);
    setEditingQuestionIndex(null);
    setEditingQuestionData(null);
  };

  // Open modal for adding new question
  const handleAddNewQuestion = () => {
    // Ensure we're not in editing mode when adding new
    setEditingQuestionIndex(null);
    setEditingQuestionData(null);
    setModalVisible(true);
  };

  const saveQuizToDatabase = async () => {
    if (!quizTitle || savedQuestions.length === 0) {
      alert("Please add a title and at least one question");
      return;
    }

    setIsSaving(true);

    try {
      console.log('Starting quiz save process...');
      
      // Process questions and upload images if needed
      const processedQuestions = await Promise.all(
        savedQuestions.map(async (question, index) => {
          console.log(`Processing question ${index + 1}...`);
          
          // If question has no image or image is already a URL, return as is
          if (!question.image || !question.imageIsLocal) {
            return {
              ...question,
              imageIsLocal: undefined // Remove this flag
            };
          }

          console.log(`Uploading image for question ${index + 1}...`);
          
          // Upload image and get URL
          const imageUrl = await uploadImage(question.image);
          
          if (!imageUrl) {
            console.error("Failed to upload image for question:", question.question);
            alert(`Failed to upload image for question ${index + 1}. Continuing without image.`);
            
            // Return question without image if upload failed
            return { 
              ...question, 
              image: null, 
              imageIsLocal: undefined 
            };
          }

          console.log(`Image uploaded successfully for question ${index + 1}`);
          
          // Return question with uploaded image URL
          return { 
            ...question, 
            image: imageUrl,
            imageIsLocal: undefined // Remove this flag
          };
        })
      );

      console.log('All images processed, creating quiz...');

      // Create quiz data in the format expected by our service
      const quizData = {
        title: quizTitle,
        description: `A quiz about ${quizCategory || 'various topics'}`,
        category: quizCategory || 'General',
        grade: quizGrade,
        difficulty: quizDifficulty,
        questions: processedQuestions,
        created_by: userId,
        createdBy: userId, // Backward compatibility
      };

      // Save quiz using our new service
      const savedQuiz = await saveQuiz(quizData);
      
      if (savedQuiz) {
        console.log("Quiz saved successfully:", savedQuiz);
        alert("Quiz saved successfully!");
        
        // Reset form
        resetForm();
      } else {
        throw new Error("Failed to save quiz - no data returned");
      }
      
    } catch (error) {
      console.error("Failed to save quiz:", error);
      alert(`Error saving quiz: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset entire form
  const resetForm = () => {
    setQuizTitle('');
    setQuizCategory('');
    setQuizGrade('');
    setQuizDifficulty('Medium');
    setSavedQuestions([]);
    setEditingQuestionIndex(null);
    setEditingQuestionData(null);
  };

  const isFormValid = quizTitle.trim() && savedQuestions.length > 0;
  const isEditing = editingQuestionIndex !== null;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>  
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <QuizTitleSection 
          title={quizTitle} 
          onTitleChange={setQuizTitle} 
        />
        
        <QuestionsSection 
          questions={savedQuestions}
          onAddPress={handleAddNewQuestion}
          onEditQuestion={handleEditQuestion}  // Pass the edit function
          onDeleteQuestion={handleDeleteQuestion}  // Pass the delete function
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
              <Text style={styles.saveQuizButtonText}>Saving Quiz...</Text>
            </View>
          ) : (
            <Text style={styles.saveQuizButtonText}>
              Save Quiz ({savedQuestions.length} question{savedQuestions.length !== 1 ? 's' : ''})
            </Text>
          )}
        </TouchableOpacity>
        
        {/* Form validation helper */}
        {!isFormValid && (
          <Text style={styles.validationText}>
            {!quizTitle.trim() ? 'Please add a quiz title' : 'Please add at least one question'}
          </Text>
        )}

        {/* Development helper - shows current editing state */}
        {__DEV__ && isEditing && (
          <Text style={styles.debugText}>
            Currently editing question {editingQuestionIndex + 1}
          </Text>
        )}
      </ScrollView>

      {/* Question Modal with editing support */}
      <AddQuestionModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSubmit={handleAddOrUpdateQuestion}
        editingData={editingQuestionData}  // Pass existing data for editing
        isEditing={isEditing}  // Pass editing state
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
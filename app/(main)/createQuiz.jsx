import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import QuizTitleSection from '@/components/createQuiz/QuizTitleSection';
import QuestionsSection from '@/components/createQuiz/QuestionsSection';
import QuizDetailsSection from '@/components/createQuiz/QuizDetails';
import AddQuestionModal from '@/components/createQuiz/AddQuestionModal';
import { database } from '@/services/firebase/config';
import { ref, push, set } from 'firebase/database';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImage } from '@/services/supabase/storage';
import { ActivityIndicator } from 'react-native-paper';

export default function CreateQuizPage() {

  const { user } = useAuth();
  const userId = user?.sub || "guest_user";
  // Quiz metadata
  const [quizTitle, setQuizTitle] = useState('');
  const [quizCategory, setQuizCategory] = useState('');
  const [quizGrade, setQuizGrade] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('Medium');
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const scrollViewRef = useRef();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleAddQuestion = (newQuestion) => {
    setSavedQuestions(prev => [...prev, newQuestion]);
    
    // Scroll to the bottom to show the newly added question
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const saveQuiz = async () => {
    if (!quizTitle || savedQuestions.length === 0) return;
  
    // Show loading state
    setIsSaving(true);
  
    try {
      // Process questions and upload images if needed
      const processedQuestions = await Promise.all(
        savedQuestions.map(async (question) => {
          // If question has no image or image is already a URL, return as is
          if (!question.image || !question.imageIsLocal) {
            return question;
          }
  
          // Upload image and get URL
          const imageUrl = await uploadImage(question.image);
          
          if (!imageUrl) {
            console.error("Failed to upload image for question:", question.question);
            // Return question without image if upload failed
            return { ...question, image: null, imageIsLocal: false };
          }
  
          // Return question with uploaded image URL
          return { 
            ...question, 
            image: imageUrl,
            imageIsLocal: false
          };
        })
      );
  
      // Create quiz reference
      const quizRef = push(ref(database, "quizzes"));
      const quizData = {
        id: quizRef.key,
        title: quizTitle,
        category: quizCategory,
        grade: quizGrade,
        difficulty: quizDifficulty,
        questions: processedQuestions,
        createdBy: userId,
        createdAt: new Date().toString(),
      }
  
      // Save quiz to Firebase
      await set(quizRef, quizData);
      alert("Quiz Saved");
      console.log("Saved Quiz. Data: ", quizData);
      
      // Reset form or navigate away
      // resetForm(); // If you want to reset after saving
      
    } catch (error) {
      console.error("Failed to save quiz", error);
      alert("Error saving quiz. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

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
          onAddPress={() => setModalVisible(true)}
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
            (isSaving || !quizTitle || savedQuestions.length === 0) && styles.saveQuizButtonDisabled
          ]}
          disabled={isSaving || !quizTitle || savedQuestions.length === 0}
          onPress={saveQuiz}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveQuizButtonText}>Save Quiz</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Question Modal */}
      <AddQuestionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddQuestion}
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
    marginBottom: 40,
  },
  saveQuizButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  saveQuizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
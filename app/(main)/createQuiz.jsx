import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import QuizTitleSection from '@/components/createQuiz/QuizTitleSection';
import QuestionsSection from '@/components/createQuiz/QuestionsSection';
import QuizDetailsSection from '@/components/createQuiz/QuizDetails';
import AddQuestionModal from '@/components/createQuiz/AddQuestionModal';

export default function CreateQuizPage() {
  // Quiz metadata
  const [quizTitle, setQuizTitle] = useState('');
  const [quizCategory, setQuizCategory] = useState('');
  const [quizGrade, setQuizGrade] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('Medium');

  // Questions state
  const [savedQuestions, setSavedQuestions] = useState([]);
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  
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

  const saveQuiz = () => {
    // Implement quiz saving functionality
    alert('Quiz saved!');
    console.log({
      title: quizTitle,
      category: quizCategory,
      grade: quizGrade,
      difficulty: quizDifficulty,
      questions: savedQuestions
    });
  };

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
            (!quizTitle || savedQuestions.length === 0) && styles.saveQuizButtonDisabled
          ]}
          disabled={!quizTitle || savedQuestions.length === 0}
          onPress={saveQuiz}
        >
          <Text style={styles.saveQuizButtonText}>Save Quiz</Text>
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
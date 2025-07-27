// components/quiz/QuizContent.jsx
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import QuizNavigation from './QuizNavigation';
import QuestionCard from './QuestionCard';

export default function QuizContent({
  quiz,
  currentQuestionIndex,
  selectedAnswer,
  answers,
  currentLanguage,
  quizTypeInfo,
  onSelectAnswer,
  onPreviousQuestion,
  onNextQuestion,
  onGoToQuestion,
  onNextOrFinish
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Helper function for bilingual text
  const getBilingualText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[currentLanguage] || textObj.en || fallback;
  };

  // Bilingual content
  const content = {
    en: {
      finishQuiz: 'Finish Quiz',
      nextQuestion: 'Next Question',
      selectAnswer: 'Please select an answer',
      selectAnswerMessage: 'You must choose an answer before continuing.'
    },
    ms: {
      finishQuiz: 'Selesaikan Kuiz',
      nextQuestion: 'Soalan Seterusnya',
      selectAnswer: 'Sila pilih jawapan',
      selectAnswerMessage: 'Anda mesti memilih jawapan sebelum meneruskan.'
    }
  };

  const text = content[currentLanguage] || content.en;
  const currentQuestion = quiz?.questions?.[currentQuestionIndex] || null;

  const handleNextOrFinish = () => {
    if (selectedAnswer === null) {
      alert(text.selectAnswerMessage);
      return;
    }
    onNextOrFinish();
  };

  if (!currentQuestion) {
    return (
      <View style={styles.center}>
        <ThemedText style={[
          styles.errorText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Question not found
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Quiz Title and Subtitle */}
        <View style={styles.titleSection}>
          <ThemedText style={[
            styles.quizTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {getBilingualText(quiz.title, quiz.title)}
          </ThemedText>
          <ThemedText style={[
            styles.quizSubtitle,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {quizTypeInfo.subtitle}
          </ThemedText>
        </View>

        {/* Question Navigation */}
        <QuizNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          answers={answers}
          onPrevious={onPreviousQuestion}
          onNext={onNextQuestion}
          onGoToQuestion={onGoToQuestion}
          quizColor={quizTypeInfo.color}
        />
        
        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          currentLanguage={currentLanguage}
          quizColor={quizTypeInfo.color}
        />
      </ScrollView>
      
      {/* Fixed Bottom Button */}
      <View style={[
        styles.bottomButtonContainer,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <TouchableOpacity 
          style={[
            styles.bottomButton,
            { 
              backgroundColor: selectedAnswer === null 
                ? (isDark ? Colors.dark.backgroundSecondary : '#E0E0E0')
                : quizTypeInfo.color
            }
          ]}
          onPress={handleNextOrFinish}
          disabled={selectedAnswer === null}
          activeOpacity={0.8}
        >
          <ThemedText style={[
            styles.bottomButtonText,
            { 
              color: selectedAnswer === null 
                ? (isDark ? Colors.dark.textMuted : '#999')
                : '#fff'
            }
          ]}>
            {currentQuestionIndex === quiz.questions.length - 1 
              ? `${text.finishQuiz} →` 
              : `${text.nextQuestion} →`
            }
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 100, // Space for fixed button
  },
  titleSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  bottomButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
// components/quiz/QuizResults.jsx
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function QuizResults({
  quiz,
  finalStats,
  currentLanguage,
  quizTypeInfo,
  sessionId,
  isSavingResult,
  onRetakeQuiz,
  onReturnToQuizzes
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
      results: 'Results',
      yourScore: 'Your Score',
      correct: 'Correct',
      incorrect: 'Incorrect',
      total: 'Total',
      answerAnalysis: 'Answer Analysis',
      question: 'Q#',
      yourAnswer: 'Your Answer',
      correctAnswer: 'Correct Answer',
      result: 'Result',
      noAnswer: 'No answer',
      retakeQuiz: 'Retake Quiz',
      startLesson: 'Start Lesson',
      viewResults: 'View Results',
      moreQuizzes: 'More Quizzes',
      saving: 'Saving...',
      savingResults: 'Saving your results...'
    },
    ms: {
      results: 'Keputusan',
      yourScore: 'Markah Anda',
      correct: 'Betul',
      incorrect: 'Salah',
      total: 'Jumlah',
      answerAnalysis: 'Analisis Jawapan',
      question: 'S#',
      yourAnswer: 'Jawapan Anda',
      correctAnswer: 'Jawapan Betul',
      result: 'Keputusan',
      noAnswer: 'Tiada jawapan',
      retakeQuiz: 'Ulang Kuiz',
      startLesson: 'Mulakan Pelajaran',
      viewResults: 'Lihat Keputusan',
      moreQuizzes: 'Lebih Kuiz',
      saving: 'Menyimpan...',
      savingResults: 'Menyimpan keputusan anda...'
    }
  };

  const text = content[currentLanguage] || content.en;
  const percentage = Math.round((finalStats.total_score / finalStats.max_possible_score) * 100);

  // Helper function to get option letter
  const getOptionLetter = (questionIndex, answer) => {
    const question = quiz.questions[questionIndex];
    const options = question.options?.[currentLanguage] || question.options?.en || question.options || [];
    const optionIndex = Array.isArray(options) ? options.indexOf(answer) : -1;
    return optionIndex !== -1 ? String.fromCharCode(65 + optionIndex) : '-';
  };

  const getCompletionButtonText = () => {
    if (sessionId && quiz.type === 'pre-lesson') {
      return `📚 ${text.startLesson}`;
    } else if (sessionId && quiz.type === 'post-lesson') {
      return `📊 ${text.viewResults}`;
    } else {
      return `🌟 ${text.moreQuizzes}`;
    }
  };

  return (
    <ScrollView 
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
      
      {/* Score Card */}
      <View style={[
        styles.scoreCard,
        { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
      ]}>
        <View style={styles.scoreHeader}>
          <ThemedText style={[
            styles.scoreLabel,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.yourScore}
          </ThemedText>
          <View style={[
            styles.scoreBadge,
            { backgroundColor: quizTypeInfo.color + '20' }
          ]}>
            <ThemedText style={[
              styles.scoreBadgeText,
              { color: quizTypeInfo.color }
            ]}>
              {quizTypeInfo.title}
            </ThemedText>
          </View>
        </View>
        
        <ThemedText style={[
          styles.scoreValue,
          { color: quizTypeInfo.color }
        ]}>
          {finalStats.total_score}/{finalStats.max_possible_score}
        </ThemedText>
        
        <View style={[
          styles.percentageContainer,
          { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }
        ]}>
          <View 
            style={[
              styles.percentageFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: quizTypeInfo.color
              }
            ]} 
          />
        </View>
        
        <ThemedText style={[
          styles.percentageText,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          {percentage}%
        </ThemedText>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <ThemedText style={[
              styles.statValue,
              { color: '#4CAF50' }
            ]}>
              {finalStats.correct_answers}
            </ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.correct}
            </ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <ThemedText style={[
              styles.statValue,
              { color: '#FF5722' }
            ]}>
              {quiz.questions.length - finalStats.correct_answers}
            </ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.incorrect}
            </ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <ThemedText style={[
              styles.statValue,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}>
              {quiz.questions.length}
            </ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.total}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {/* Answer Analysis Section */}
      <View style={[
        styles.analysisCard,
        { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
      ]}>
        <ThemedText style={[
          styles.analysisTitle,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          📋 {text.answerAnalysis}
        </ThemedText>
        
        <View style={styles.analysisHeader}>
          <ThemedText style={[styles.analysisHeaderText, { flex: 0.8 }]}>{text.question}</ThemedText>
          <ThemedText style={[styles.analysisHeaderText, { flex: 2 }]}>{text.yourAnswer}</ThemedText>
          <ThemedText style={[styles.analysisHeaderText, { flex: 2 }]}>{text.correctAnswer}</ThemedText>
          <ThemedText style={[styles.analysisHeaderText, { flex: 1 }]}>{text.result}</ThemedText>
        </View>
        
        {finalStats.detailed_answers.map((answer, index) => (
          <View 
            key={index}
            style={[
              styles.analysisRow,
              {
                backgroundColor: answer.is_correct 
                  ? (isDark ? '#4CAF5020' : '#4CAF5015')
                  : (isDark ? '#F4433620' : '#F4433615'),
                borderLeftColor: answer.is_correct ? '#4CAF50' : '#F44336'
              }
            ]}
          >
            <View style={[styles.analysisCell, { flex: 0.8 }]}>
              <ThemedText style={[
                styles.analysisCellText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {index + 1}
              </ThemedText>
            </View>
            
            <View style={[styles.analysisCell, { flex: 2 }]}>
              <View style={styles.answerContainer}>
                <View style={[
                  styles.answerLetter,
                  { backgroundColor: answer.is_correct ? '#4CAF5030' : '#F4433630' }
                ]}>
                  <ThemedText style={[
                    styles.answerLetterText,
                    { color: answer.is_correct ? '#4CAF50' : '#F44336' }
                  ]}>
                    {getOptionLetter(index, answer.user_answer)}
                  </ThemedText>
                </View>
                <ThemedText style={[
                  styles.answerText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]} numberOfLines={2}>
                  {answer.user_answer || text.noAnswer}
                </ThemedText>
              </View>
            </View>
            
            <View style={[styles.analysisCell, { flex: 2 }]}>
              <View style={styles.answerContainer}>
                <View style={[
                  styles.answerLetter,
                  { backgroundColor: '#4CAF5030' }
                ]}>
                  <ThemedText style={[
                    styles.answerLetterText,
                    { color: '#4CAF50' }
                  ]}>
                    {getOptionLetter(index, answer.correct_answer)}
                  </ThemedText>
                </View>
                <ThemedText style={[
                  styles.answerText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]} numberOfLines={2}>
                  {answer.correct_answer}
                </ThemedText>
              </View>
            </View>
            
            <View style={[styles.analysisCell, { flex: 1 }]}>
              <ThemedText style={[
                styles.resultIcon,
                { color: answer.is_correct ? '#4CAF50' : '#F44336' }
              ]}>
                {answer.is_correct ? '✓' : '✗'}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        {!sessionId && (
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              styles.secondaryButton,
              { 
                borderColor: isDark ? Colors.dark.tint : Colors.light.tint,
                backgroundColor: 'transparent'
              }
            ]} 
            onPress={onRetakeQuiz}
          >
            <ThemedText style={[
              styles.secondaryButtonText,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}>
              🔄 {text.retakeQuiz}
            </ThemedText>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            styles.primaryButton,
            { 
              backgroundColor: quizTypeInfo.color,
              flex: sessionId ? 1 : 1
            }
          ]} 
          onPress={onReturnToQuizzes}
          disabled={isSavingResult}
        >
          <ThemedText style={styles.primaryButtonText}>
            {isSavingResult ? `⏳ ${text.saving}` : getCompletionButtonText()}
          </ThemedText>
        </TouchableOpacity>
      </View>
      
      {isSavingResult && (
        <View style={styles.savingIndicator}>
          <ActivityIndicator size="small" color={quizTypeInfo.color} />
          <ThemedText style={[
            styles.savingText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.savingResults}
          </ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
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
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  percentageContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  percentageFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  analysisCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  analysisHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
  },
  analysisRow: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  analysisCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisCellText: {
    fontSize: 14,
    fontWeight: '600',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  answerLetter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerLetterText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 13,
    flex: 1,
  },
  resultIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    // backgroundColor set dynamically
  },
  secondaryButton: {
    borderWidth: 1.5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  savingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  savingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
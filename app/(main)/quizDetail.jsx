// /app/(main)/quizDetail.jsx
import React from 'react';
import { 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  View,
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useQuiz } from '@/hooks/useQuiz';
import { Colors } from '@/constants/Colors';

export default function QuizDetailPage() {
  const { quizId } = useLocalSearchParams();
  const router = useRouter();
  const { user, supabaseData } = useAuth();
  const { quiz, loading, error } = useQuiz(quizId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // 🔥 NEW: Get user's preferred language
  const preferredLanguage = supabaseData?.preferred_language || 'en';
  const isEnglish = preferredLanguage === 'en';

  // 🔥 NEW: Bilingual text content
  const content = {
    en: {
      loadingQuiz: 'Loading quiz...',
      unableToLoad: 'Unable to load quiz',
      goBack: 'Go Back',
      signInRequired: 'Sign In Required',
      signInMessage: 'Please sign in to take this quiz',
      cancel: 'Cancel',
      signIn: 'Sign In',
      questions: 'Questions',
      totalPoints: 'Total Points',
      category: 'Category:',
      gradeLevel: 'Grade Level:',
      whatToExpected: 'What to Expect',
      quizContains: 'This quiz contains',
      questionsAbout: 'questions covering various aspects of',
      theTopic: 'the topic',
      difficultyLevel: 'The difficulty level is',
      canEarn: 'You can earn up to',
      points: 'points',
      sampleQuestion: 'Sample Question:',
      createdBy: 'Created by:',
      quizAdministrator: 'Quiz Administrator',
      noQuestionsAvailable: 'No Questions Available',
      startQuiz: 'Start Quiz',
    },
    ms: {
      loadingQuiz: 'Sedang memuatkan kuiz...',
      unableToLoad: 'Tidak dapat memuatkan kuiz',
      goBack: 'Kembali',
      signInRequired: 'Log Masuk Diperlukan',
      signInMessage: 'Sila log masuk untuk mengambil kuiz ini',
      cancel: 'Batal',
      signIn: 'Log Masuk',
      questions: 'Soalan',
      totalPoints: 'Jumlah Mata',
      category: 'Kategori:',
      gradeLevel: 'Tahap Gred:',
      whatToExpected: 'Apa Yang Dijangkakan',
      quizContains: 'Kuiz ini mengandungi',
      questionsAbout: 'soalan yang merangkumi pelbagai aspek',
      theTopic: 'topik ini',
      difficultyLevel: 'Tahap kesukaran adalah',
      canEarn: 'Anda boleh memperoleh sehingga',
      points: 'mata',
      sampleQuestion: 'Contoh Soalan:',
      createdBy: 'Dicipta oleh:',
      quizAdministrator: 'Pentadbir Kuiz',
      noQuestionsAvailable: 'Tiada Soalan Tersedia',
      startQuiz: 'Mula Kuiz',
    }
  };

  const text = content[preferredLanguage] || content.en;

  // 🔥 NEW: Helper functions for bilingual content
  const getBilingualText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[preferredLanguage] || textObj.en || fallback;
  };

  const startQuiz = () => {
    if (!user) {
      Alert.alert(
        text.signInRequired,
        text.signInMessage,
        [
          { text: text.cancel, style: 'cancel' },
          { 
            text: text.signIn, 
            onPress: () => {
              router.push('/');
            }
          }
        ]
      );
      return;
    }
    
    const timestamp = Date.now();
    router.push(`/quizPlay?quizId=${quizId}&type=regular&fresh=true&t=${timestamp}`);
  };
  
  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={styles.loadingText}>{text.loadingQuiz}</ThemedText>
      </ThemedView>
    );
  }
  
  if (error || !quiz) {
    return (
      <ThemedView style={styles.center}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorIcon}>⚠️</ThemedText>
          <ThemedText style={[
            styles.errorText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {error || text.unableToLoad}
          </ThemedText>
          <TouchableOpacity 
            style={[
              styles.button,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} 
            onPress={() => router.back()}
          >
            <ThemedText style={styles.buttonText}>{text.goBack}</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }
  
  const totalPoints = quiz.questions?.reduce((total, q) => total + (q.points || 10), 0) || 0;
  
  // 🔥 NEW: Get bilingual quiz data
  const quizTitle = getBilingualText(quiz.title, 'Quiz');
  const quizDescription = getBilingualText(quiz.description, '');
  const quizCategory = quiz.category || '';
  
  // 🔥 NEW: Get sample question in preferred language
  const getSampleQuestion = () => {
    if (!quiz.questions || quiz.questions.length === 0) return '';
    const firstQuestion = quiz.questions[0];
    return getBilingualText(firstQuestion.question || firstQuestion.question_text, '');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>{quizTitle}</ThemedText>
        
        {quizDescription && (
          <ThemedText style={[
            styles.description,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {quizDescription}
          </ThemedText>
        )}
        
        {/* Quiz info cards */}
        <View style={styles.infoCards}>
          <View style={[
            styles.infoCard,
            { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
          ]}>
            <ThemedText style={[
              styles.infoValue,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}>
              {quiz.questions?.length || 0}
            </ThemedText>
            <ThemedText style={[
              styles.infoLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.questions}
            </ThemedText>
          </View>
          
          <View style={[
            styles.infoCard,
            { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
          ]}>
            <ThemedText style={[
              styles.infoLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.difficulty}
            </ThemedText>
          </View>
          
          <View style={[
            styles.infoCard,
            { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
          ]}>
            <ThemedText style={[
              styles.infoValue,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}>
              {totalPoints}
            </ThemedText>
            <ThemedText style={[
              styles.infoLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.totalPoints}
            </ThemedText>
          </View>
        </View>
        
        {/* Category and additional info */}
        <View style={styles.detailsSection}>
          {quizCategory && (
            <View style={styles.detailRow}>
              <ThemedText style={[
                styles.detailLabel,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {text.category}
              </ThemedText>
              <View style={[
                styles.tag,
                { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary }
              ]}>
                <ThemedText style={[
                  styles.tagText,
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  {quizCategory}
                </ThemedText>
              </View>
            </View>
          )}
          
          {quiz.grade && quiz.grade !== quiz.category && (
            <View style={styles.detailRow}>
              <ThemedText style={[
                styles.detailLabel,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {text.gradeLevel}
              </ThemedText>
              <View style={[
                styles.tag,
                { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary }
              ]}>
                <ThemedText style={[
                  styles.tagText,
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  {quiz.grade}
                </ThemedText>
              </View>
            </View>
          )}
        </View>
        
        {/* Quiz preview */}
        <View style={[
          styles.previewSection,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderWidth: isDark ? 1 : 0,
            borderColor: isDark ? Colors.dark.border : 'transparent'
          }
        ]}>
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.whatToExpected}
          </ThemedText>
          <ThemedText style={[
            styles.previewText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.quizContains} {quiz.questions?.length || 0} {text.questionsAbout} {quizCategory || text.theTopic}.
            {quiz.difficulty && ` ${text.difficultyLevel} ${getDifficultyText(quiz.difficulty).toLowerCase()}.`}
            {totalPoints > 0 && ` ${text.canEarn} ${totalPoints} ${text.points}.`}
          </ThemedText>
          
          {quiz.questions && quiz.questions.length > 0 && getSampleQuestion() && (
            <View style={styles.questionPreview}>
              <ThemedText style={[
                styles.previewLabel,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                {text.sampleQuestion}
              </ThemedText>
              <ThemedText style={[
                styles.sampleQuestion,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                "{getSampleQuestion()}"
              </ThemedText>
            </View>
          )}
        </View>
        
        {/* Author info */}
        {quiz.createdBy && (
          <View style={styles.authorSection}>
            <ThemedText style={[
              styles.authorLabel,
              { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
            ]}>
              {text.createdBy}
            </ThemedText>
            <ThemedText style={[
              styles.authorName,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.quizAdministrator}
            </ThemedText>
            {quiz.createdAt && (
              <ThemedText style={[
                styles.dateText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                {new Date(quiz.createdAt).toLocaleDateString(
                  isEnglish ? 'en-US' : 'ms-MY'
                )}
              </ThemedText>
            )}
          </View>
        )}
        
        {/* Start Quiz Button */}
        <TouchableOpacity 
          style={[
            styles.startButton,
            { 
              backgroundColor: (!quiz.questions || quiz.questions.length === 0) 
                ? (isDark ? Colors.dark.backgroundSecondary : '#cccccc')
                : (isDark ? Colors.dark.tint : Colors.light.tint)
            }
          ]} 
          onPress={startQuiz}
          disabled={!quiz.questions || quiz.questions.length === 0}
        >
          <ThemedText style={[
            styles.startButtonText,
            { 
              color: (!quiz.questions || quiz.questions.length === 0)
                ? (isDark ? Colors.dark.textMuted : '#999')
                : '#fff'
            }
          ]}>
            {(!quiz.questions || quiz.questions.length === 0) ? text.noQuestionsAvailable : text.startQuiz}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
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
  loadingText: {
    marginTop: 16,
  },
  errorContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  infoCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 24,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  previewSection: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  previewText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  questionPreview: {
    gap: 8,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  sampleQuestion: {
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  authorSection: {
    marginBottom: 32,
    gap: 4,
  },
  authorLabel: {
    fontSize: 14,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
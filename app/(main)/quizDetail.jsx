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
  const { user } = useAuth();
  const { quiz, loading, error } = useQuiz(quizId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const startQuiz = () => {
    if (!user) {
      Alert.alert(
        'Sign In Required',
        'Please sign in to take this quiz',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Sign In', 
            onPress: () => {
              router.push('/');
            }
          }
        ]
      );
      return;
    }
    
    router.push(`/quizPlay?quizId=${quizId}`);
  };
  
  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={styles.loadingText}>Loading quiz...</ThemedText>
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
            {error || "Unable to load quiz"}
          </ThemedText>
          <TouchableOpacity 
            style={[
              styles.button,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} 
            onPress={() => router.back()}
          >
            <ThemedText style={styles.buttonText}>Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }
  
  const totalPoints = quiz.questions?.reduce((total, q) => total + (q.points || 10), 0) || 0;
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>{quiz.title}</ThemedText>
        
        {quiz.description && (
          <ThemedText style={[
            styles.description,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {quiz.description}
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
              Questions
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
              {quiz.difficulty || 'Medium'}
            </ThemedText>
            <ThemedText style={[
              styles.infoLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Difficulty
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
              Total Points
            </ThemedText>
          </View>
        </View>
        
        {/* Category and additional info */}
        <View style={styles.detailsSection}>
          {quiz.category && (
            <View style={styles.detailRow}>
              <ThemedText style={[
                styles.detailLabel,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                Category:
              </ThemedText>
              <View style={[
                styles.tag,
                { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary }
              ]}>
                <ThemedText style={[
                  styles.tagText,
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  {quiz.category}
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
                Grade Level:
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
            What to Expect
          </ThemedText>
          <ThemedText style={[
            styles.previewText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            This quiz contains {quiz.questions?.length || 0} questions covering various aspects of {quiz.category || 'the topic'}.
            {quiz.difficulty && ` The difficulty level is ${quiz.difficulty.toLowerCase()}.`}
            {totalPoints > 0 && ` You can earn up to ${totalPoints} points.`}
          </ThemedText>
          
          {quiz.questions && quiz.questions.length > 0 && (
            <View style={styles.questionPreview}>
              <ThemedText style={[
                styles.previewLabel,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                Sample Question:
              </ThemedText>
              <ThemedText style={[
                styles.sampleQuestion,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                "{quiz.questions[0].question}"
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
              Created by:
            </ThemedText>
            <ThemedText style={[
              styles.authorName,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Quiz Administrator
            </ThemedText>
            {quiz.createdAt && (
              <ThemedText style={[
                styles.dateText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                {new Date(quiz.createdAt).toLocaleDateString()}
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
                : (isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary)
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
                : (isDark ? Colors.dark.tint : Colors.light.tint)
            }
          ]}>
            {(!quiz.questions || quiz.questions.length === 0) ? 'No Questions Available' : 'Start Quiz'}
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
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
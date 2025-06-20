// app/(main)/quiz/[id].jsx
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
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useQuiz } from '@/hooks/useQuiz';

export default function QuizDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { quiz, loading, error } = useQuiz(id);
  
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
    
    router.push(`/quiz/${id}/play`);
  };
  
  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading quiz...</ThemedText>
      </ThemedView>
    );
  }
  
  if (error || !quiz) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.errorText}>{error || "Unable to load quiz"}</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>{quiz.title}</ThemedText>
        
        {/* Quiz info cards */}
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoValue}>{quiz.questions?.length || 0}</ThemedText>
            <ThemedText style={styles.infoLabel}>Questions</ThemedText>
          </View>
          
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoValue}>
              {quiz.difficulty || 'Medium'}
            </ThemedText>
            <ThemedText style={styles.infoLabel}>Difficulty</ThemedText>
          </View>
          
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoValue}>
              {getTotalPoints(quiz.questions || [])}
            </ThemedText>
            <ThemedText style={styles.infoLabel}>Total Points</ThemedText>
          </View>
        </View>
        
        {/* Category and grade level */}
        {(quiz.category || quiz.grade) && (
          <View style={styles.tagsContainer}>
            {quiz.category && (
              <View style={styles.tag}>
                <ThemedText style={styles.tagText}>{quiz.category}</ThemedText>
              </View>
            )}
            
            {quiz.grade && (
              <View style={styles.tag}>
                <ThemedText style={styles.tagText}>{quiz.grade}</ThemedText>
              </View>
            )}
          </View>
        )}
        
        {/* Quiz description */}
        <ThemedText style={styles.description}>
          This quiz contains {quiz.questions?.length || 0} questions of varying difficulty.
          {quiz.category ? ` It focuses on ${quiz.category}.` : ''}
          {quiz.grade ? ` Suitable for ${quiz.grade} students.` : ''}
        </ThemedText>
        
        {/* Author info */}
        <View style={styles.authorSection}>
          <ThemedText style={styles.authorLabel}>Created by:</ThemedText>
          <ThemedText style={styles.authorName}>{quiz.createdBy || 'Anonymous'}</ThemedText>
          <ThemedText style={styles.dateText}>
            {new Date(quiz.createdAt || Date.now()).toLocaleDateString()}
          </ThemedText>
        </View>
        
        {/* Start Quiz Button */}
        <TouchableOpacity 
          style={[
            styles.startButton,
            quiz.questions?.length === 0 && styles.disabledButton
          ]} 
          onPress={startQuiz}
          disabled={quiz.questions?.length === 0}
        >
          <ThemedText style={styles.startButtonText}>
            {quiz.questions?.length === 0 ? 'No Questions Available' : 'Start Quiz'}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

// Helper function to calculate total points
function getTotalPoints(questions) {
    return questions.reduce((total, q) => total + (q.points || 0), 0);
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
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0a7ea4',
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
    marginBottom: 24,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#f5f8ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 8,
  },
  tag: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  authorSection: {
    marginBottom: 32,
  },
  authorLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
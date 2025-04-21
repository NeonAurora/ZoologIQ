// app/(main)/quizzes.jsx - Improved version
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
} from 'react-native';
import { useQuizzes } from '@/hooks/useQuizzes';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function QuizzesListPage() {
  const { quizzes, loading } = useQuizzes();
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>Loading quizzes...</ThemedText>
      </ThemedView>
    );
  }

  // convert { id: {…}, … } → [{ id, …quizData }, …]
  const data = Object.entries(quizzes || {}).map(([id, quiz]) => ({
    id,
    ...quiz,
  }));

  if (data.length === 0) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.noQuizzesText}>
          No quizzes available.
        </ThemedText>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/createQuiz')}
        >
          <ThemedText style={styles.createButtonText}>
            Create your first quiz
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.headerText}>
        Available Quizzes
      </ThemedText>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, isDark && styles.cardDark]}
            onPress={() => router.push(`/quiz/${item.id}`)}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.title}>
                  {item.title}
                </ThemedText>
                <View style={[
                  styles.difficultyBadge, 
                  item.difficulty === 'Easy' ? styles.easyBadge :
                  item.difficulty === 'Hard' ? styles.hardBadge :
                  styles.mediumBadge
                ]}>
                  <Text style={styles.difficultyText}>
                    {item.difficulty || 'Medium'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>
                    {item.questions?.length || 0}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>
                    {item.questions?.length === 1 ? 'Question' : 'Questions'}
                  </ThemedText>
                </View>
                
                {item.category && (
                  <View style={styles.categoryBadge}>
                    <ThemedText style={styles.categoryText}>
                      {item.category}
                    </ThemedText>
                  </View>
                )}
              </View>
              
              <View style={styles.footerRow}>
                <ThemedText style={styles.authorText}>
                  by {item.createdBy || 'Anonymous'}
                </ThemedText>
                <ThemedText style={styles.dateText}>
                  {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  noQuizzesText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDark: {
    backgroundColor: '#252525',
  },
  cardContent: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: '#a8e6cf',
  },
  mediumBadge: {
    backgroundColor: '#fdffb6',
  },
  hardBadge: {
    backgroundColor: '#ffcfd2',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
  },
  categoryBadge: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#0a7ea4',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  authorText: {
    fontSize: 12,
    opacity: 0.7,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
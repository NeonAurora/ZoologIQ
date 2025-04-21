import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useQuizzes } from '@/hooks/useQuizzes';
import { useRouter } from 'expo-router';

export default function QuizzesListPage() {
  const { quizzes, loading } = useQuizzes();
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  if (loading) {
    return (
      <View style={[styles.center, isDark && styles.centerDark]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // convert { id: {…}, … } → [{ id, …quizData }, …]
  const data = Object.entries(quizzes).map(([id, quiz]) => ({
    id,
    ...quiz,
  }));

  if (data.length === 0) {
    return (
      <View style={[styles.center, isDark && styles.centerDark]}>
        <Text style={isDark ? styles.textLight : styles.textDark}>
          No quizzes available.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, isDark && styles.cardDark]}
          onPress={() => router.push(`/quiz/${item.id}`)}
        >
          <Text style={[styles.title, isDark && styles.textLight]}>
            {item.title}
          </Text>
          <Text style={isDark ? styles.textLight : styles.textDark}>
            {item.questions.length} question
            {item.questions.length === 1 ? '' : 's'}
          </Text>
          <Text style={isDark ? styles.textLight : styles.textDark}>
            by {item.createdBy}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  centerDark: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textDark: {
    color: '#333',
  },
  textLight: {
    color: '#eee',
  },
});

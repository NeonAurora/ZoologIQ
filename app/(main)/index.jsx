import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { FAB } from 'react-native-paper';
import React, { useState } from 'react';
import LearningTopicCard from '@/components/learning/LearningTopicCard';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [fabOpen, setFabOpen] = useState(false);

  const actions = [
    {
      icon: 'alpha-a',
      label: 'Button1',
      onPress: () => router.push('/createQuiz'),
    },
    {
      icon: 'alpha-b',
      label: 'Button2',
      onPress: () => router.push('/quizzes'),
    },
    {
      icon: 'alpha-c',
      label: 'Button3',
      onPress: () => router.push('/'),
    },
    {
      icon: 'alpha-d',
      label: 'Button4',
      onPress: () => router.push('/'),
    },
  ];
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Learning Paths
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Choose your learning journey
        </ThemedText>
      </View>

      <View style={styles.learningSection}>
        <LearningTopicCard 
          topic="tiger"
          title="Malayan Tiger"
          description="Conservation and habitat study"
          icon="■"
          color="#FF6B35"
          quizId="744a1763-0b1b-4b60-913e-cf74df153746"
        />
        
        <LearningTopicCard 
          topic="tapir"
          title="Malayan Tapir" 
          description="Species behavior and ecology"
          icon="■"
          color="#4CAF50"
          quizId="your-tapir-quiz-id"
          disabled={true}
        />
        
        <LearningTopicCard 
          topic="turtle"
          title="Hawksbill Turtle"
          description="Marine conservation research"
          icon="■"
          color="#2196F3"
          quizId="your-turtle-quiz-id"
          disabled={true}
        />
      </View>

      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? 'close' : 'plus'}
        actions={actions}
        onStateChange={({ open }) => setFabOpen(open)}
        style={styles.fab}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 28,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '400',
  },
  learningSection: {
    flex: 1,
    gap: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
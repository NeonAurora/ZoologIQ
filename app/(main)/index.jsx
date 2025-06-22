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
      icon: 'alpha-a',           // any MaterialCommunityIcon name
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
      <ThemedText type="title">Welcome to Home Page</ThemedText>
      
      {user ? (
        <ThemedText style={styles.welcomeText}>
          Hello, {user.name || user.email || 'User'}! You are signed in.
        </ThemedText>
      ) : (
        <ThemedText style={styles.welcomeText}>
          Sign in using the button in the header to access your profile.
        </ThemedText>
      )}

      <View style={styles.learningSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🎓 Start Learning Journey
        </ThemedText>
        
        <LearningTopicCard 
          topic="tiger"
          title="Malayan Tiger"
          description="Learn about endangered Malayan Tigers"
          icon="🐅"
          color="#FF6B35"
          quizId="744a1763-0b1b-4b60-913e-cf74df153746" // Replace with actual quiz ID
        />
        
        <LearningTopicCard 
          topic="tapir"
          title="Malayan Tapir" 
          description="Discover the Asian Tapir"
          icon="🦌"
          color="#4CAF50"
          quizId="your-tapir-quiz-id" // Replace with actual quiz ID
          disabled={true} // Remove when implemented
        />
        
        <LearningTopicCard 
          topic="turtle"
          title="Hawksbill Turtle"
          description="Explore marine turtle conservation"
          icon="🐢"
          color="#2196F3"
          quizId="your-turtle-quiz-id" // Replace with actual quiz ID
          disabled={true} // Remove when implemented
        />
      </View>

      {/* FAB Group in bottom‑right */}
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
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcomeText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
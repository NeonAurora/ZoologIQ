// app/(main)/tigerLesson.jsx
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Alert } from 'react-native';
import TigerLessonLayout from '@/components/lesson/tiger/TigerLessonLayout';

export default function TigerLessonPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Authentication check
  React.useEffect(() => {
    if (!user) {
      Alert.alert(
        'Authentication Required',
        'Please sign in to access the Tiger lesson',
        [{ text: 'OK', onPress: () => router.replace('/') }]
      );
    }
  }, [user]);

  if (!user) return null;

  return (
    <ThemedView style={{ flex: 1 }}>
      <TigerLessonLayout />
    </ThemedView>
  );
}
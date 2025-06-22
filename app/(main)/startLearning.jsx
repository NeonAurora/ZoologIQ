// app/(main)/startLearning.jsx
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import LearningSessionStarter from '@/components/learning/LearningSessionStarter';

export default function StartLearningPage() {
  const { topic, quizId } = useLocalSearchParams();
  
  return <LearningSessionStarter topic={topic} quizId={quizId} />;
}
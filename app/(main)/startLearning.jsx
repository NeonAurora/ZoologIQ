// app/(main)/startLearning.jsx
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import PreAssessmentChecker from '@/components/learning/PreAssessmentChecker';

export default function StartLearningPage() {
  const { topic, quizId } = useLocalSearchParams();
  
  return <PreAssessmentChecker topic={topic} quizId={quizId} />;
}
// components/learning/SessionProgressIndicator.jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function SessionProgressIndicator({ session, isDark, currentLanguage }) {
  // Bilingual step labels
  const stepLabels = {
    en: {
      'started': 'Pre-Quiz',
      'pre_quiz_completed': 'Lesson',
      'studying': 'Lesson',
      'study_completed': 'Post-Quiz',
      'post_quiz_completed': 'Results'
    },
    ms: {
      'started': 'Pra-Kuiz',
      'pre_quiz_completed': 'Pelajaran',
      'studying': 'Pelajaran',
      'study_completed': 'Pasca-Kuiz',
      'post_quiz_completed': 'Keputusan'
    }
  };

  const labels = stepLabels[currentLanguage] || stepLabels.en;

  const getStepStatus = (status) => {
    const steps = ['started', 'pre_quiz_completed', 'studying', 'study_completed', 'post_quiz_completed'];
    const currentIndex = steps.indexOf(status);
    
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const steps = getStepStatus(session.session_status);
  
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step.step} style={styles.progressStep}>
          <View style={[
            styles.progressDot,
            { 
              backgroundColor: isDark ? Colors.dark.backgroundTertiary : '#E0E0E0'
            },
            step.completed && {
              backgroundColor: '#4CAF50'
            },
            step.active && {
              backgroundColor: '#2196F3'
            }
          ]} />
          <ThemedText style={[
            styles.progressLabel,
            { 
              color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary 
            },
            step.completed && {
              color: isDark ? Colors.dark.text : Colors.light.text,
              fontWeight: '600'
            }
          ]}>
            {labels[step.step] || step.step}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    textAlign: 'center',
    maxWidth: 60,
  },
});
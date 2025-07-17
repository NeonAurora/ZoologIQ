// components/learning/NewSessionCard.jsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function NewSessionCard({ 
  currentLanguage,
  isCreatingSession, 
  onStartNewSession 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Bilingual content
  const content = {
    en: {
      startLearning: 'Start Learning',
      beginWithAssessment: 'Begin with assessment and lesson',
      beginSession: 'Begin Session',
      starting: 'Starting...'
    },
    ms: {
      startLearning: 'Mula Pembelajaran',
      beginWithAssessment: 'Mulakan dengan penilaian dan pelajaran',
      beginSession: 'Mulakan Sesi',
      starting: 'Sedang memulakan...'
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <View style={[
      styles.sessionCard,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderLeftColor: '#4CAF50',
      }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.statusIcon, { backgroundColor: '#4CAF50' + '20' }]}>
          <ThemedText style={[styles.statusIconText, { color: '#4CAF50' }]}>
            ✦
          </ThemedText>
        </View>
        <View style={styles.cardHeaderText}>
          <ThemedText style={[
            styles.cardTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.startLearning}
          </ThemedText>
          <ThemedText style={[
            styles.cardDescription,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.beginWithAssessment}
          </ThemedText>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.primaryButton,
          { backgroundColor: '#4CAF50' }
        ]} 
        onPress={() => onStartNewSession(false)}
        activeOpacity={0.8}
        disabled={isCreatingSession}
      >
        <ThemedText style={styles.buttonText}>
          {isCreatingSession ? text.starting : text.beginSession}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionCard: {
    marginVertical: 12,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
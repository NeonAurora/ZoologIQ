// components/learning/ActiveSessionCard.jsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import SessionProgressIndicator from './SessionProgressIndicator';

export default function ActiveSessionCard({ 
  sessionState, 
  currentLanguage,
  isCreatingSession, 
  onContinueSession, 
  onStartNewWithAbandon 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Bilingual content
  const content = {
    en: {
      continueSession: 'Continue Session',
      resumeWhereLeftOff: 'Resume where you left off',
      continue: 'Continue',
      startFresh: 'Start Fresh',
      loading: 'Loading...'
    },
    ms: {
      continueSession: 'Sambung Sesi',
      resumeWhereLeftOff: 'Sambung dari tempat anda berhenti',
      continue: 'Sambung',
      startFresh: 'Mula Semula',
      loading: 'Sedang memuatkan...'
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <View style={[
      styles.sessionCard,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderLeftColor: '#2196F3',
      }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[styles.statusIcon, { backgroundColor: '#2196F3' + '20' }]}>
          <ThemedText style={[styles.statusIconText, { color: '#2196F3' }]}>
            ▶
          </ThemedText>
        </View>
        <View style={styles.cardHeaderText}>
          <ThemedText style={[
            styles.cardTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.continueSession}
          </ThemedText>
          <ThemedText style={[
            styles.cardDescription,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.resumeWhereLeftOff}
          </ThemedText>
        </View>
      </View>
      
      <SessionProgressIndicator 
        session={sessionState.activeSession} 
        isDark={isDark} 
        currentLanguage={currentLanguage}
      />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[
            styles.primaryButton,
            { backgroundColor: '#2196F3' }
          ]} 
          onPress={onContinueSession}
          activeOpacity={0.8}
          disabled={isCreatingSession}
        >
          <ThemedText style={styles.buttonText}>
            {isCreatingSession ? text.loading : text.continue}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.secondaryButton,
            { 
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
              backgroundColor: 'transparent'
            }
          ]} 
          onPress={onStartNewWithAbandon}
          activeOpacity={0.8}
          disabled={isCreatingSession}
        >
          <ThemedText style={[
            styles.secondaryButtonText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.startFresh}
          </ThemedText>
        </TouchableOpacity>
      </View>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
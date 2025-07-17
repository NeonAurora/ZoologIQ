// components/learning/HistoryCard.jsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function HistoryCard({ 
  completedSessions,
  currentLanguage,
  showHistory,
  onToggleHistory,
  formatDate
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Bilingual content
  const content = {
    en: {
      history: 'History',
      previousSessions: 'Previous sessions',
      noCompletedSessions: 'No completed sessions yet',
      points: 'points'
    },
    ms: {
      history: 'Sejarah',
      previousSessions: 'Sesi sebelumnya',
      noCompletedSessions: 'Belum ada sesi yang selesai',
      points: 'mata'
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <View style={[
      styles.historyCard,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderLeftColor: '#FF9800',
      }
    ]}>
      <TouchableOpacity 
        style={styles.historyHeader}
        onPress={onToggleHistory}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.statusIcon, { backgroundColor: '#FF9800' + '20' }]}>
            <ThemedText style={[styles.statusIconText, { color: '#FF9800' }]}>
              📊
            </ThemedText>
          </View>
          <View style={styles.cardHeaderText}>
            <ThemedText style={[
              styles.cardTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.history} ({completedSessions.length})
            </ThemedText>
            <ThemedText style={[
              styles.cardDescription,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.previousSessions}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={[
          styles.expandIcon,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {showHistory ? '−' : '+'}
        </ThemedText>
      </TouchableOpacity>
      
      {showHistory && (
        <View style={styles.historyContent}>
          {completedSessions.length > 0 ? (
            completedSessions.slice(0, 5).map((session, index) => (
              <View key={session.id} style={[
                styles.historyItem,
                { borderBottomColor: isDark ? Colors.dark.border : Colors.light.border }
              ]}>
                <View style={styles.historyItemHeader}>
                  <ThemedText style={[
                    styles.historyDate,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {formatDate(session.created_at, currentLanguage)}
                  </ThemedText>
                  <View style={[
                    styles.improvementBadge,
                    { 
                      backgroundColor: session.improvement.improvement >= 0 
                        ? '#4CAF50' + '20'
                        : '#FF5722' + '20'
                    }
                  ]}>
                    <ThemedText style={[
                      styles.improvementText,
                      { 
                        color: session.improvement.improvement >= 0 ? '#4CAF50' : '#FF5722'
                      }
                    ]}>
                      {session.improvement.improvement >= 0 ? '+' : ''}{session.improvement.improvementPercentage.toFixed(1)}%
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={[
                  styles.historyScore,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {session.improvement.preScore} → {session.improvement.postScore} {text.points}
                </ThemedText>
              </View>
            ))
          ) : (
            <ThemedText style={[
              styles.noHistoryText,
              { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
            ]}>
              {text.noCompletedSessions}
            </ThemedText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  historyCard: {
    marginVertical: 12,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  expandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  historyContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  historyDate: {
    fontSize: 15,
    fontWeight: '500',
  },
  improvementBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  improvementText: {
    fontSize: 13,
    fontWeight: '600',
  },
  historyScore: {
    fontSize: 14,
  },
  noHistoryText: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 16,
    fontStyle: 'italic',
  },
});
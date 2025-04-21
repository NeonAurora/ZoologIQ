import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useColorScheme } from 'react-native';

export default function QuestionCard({ question, answer, options, points = 10, penalty = 0, image = null }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.headerRow}>
        <Text style={[styles.questionText, isDark && styles.textLight]}>{question}</Text>
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsText, isDark && styles.pointsTextDark]}>
            {points} pts
          </Text>
          {penalty > 0 && (
            <Text style={styles.penaltyText}>-{penalty}</Text>
          )}
        </View>
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.questionImage} resizeMode="cover" />
      )}
      
      <View style={styles.optionsContainer}>
        {options.map((opt, idx) => (
          <View key={idx} style={styles.optionRow}>
            <Text style={[styles.optionLetter, isDark && styles.textLight]}>
              {String.fromCharCode(65 + idx)}
            </Text>
            <Text style={[
              styles.optionText, 
              isDark && styles.textLight,
              opt === answer && styles.correctOption
            ]}>
              {opt}
            </Text>
            {opt === answer && (
              <Text style={styles.checkIcon}>✓</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#333',
    borderColor: '#444',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a7ea4',
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsTextDark: {
    backgroundColor: 'rgba(10, 126, 164, 0.2)',
  },
  penaltyText: {
    fontSize: 12,
    color: '#e74c3c',
    marginTop: 4,
  },
  questionImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionsContainer: {
    marginLeft: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLetter: {
    width: 24,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  correctOption: {
    fontWeight: 'bold',
  },
  checkIcon: {
    marginLeft: 8,
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#eee',
  },
});
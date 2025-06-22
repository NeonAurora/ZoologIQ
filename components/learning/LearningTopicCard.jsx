// components/learning/LearningTopicCard.jsx
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function LearningTopicCard({ 
  topic, 
  title, 
  description, 
  icon, 
  color, 
  quizId, 
  disabled = false 
}) {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    if (!disabled) {
      router.push(`/startLearning?topic=${topic}&quizId=${quizId}`);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          borderLeftColor: color,
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          shadowColor: isDark ? '#000' : '#000',
          shadowOpacity: isDark ? 0.3 : 0.1,
        },
        disabled && styles.cardDisabled
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={styles.cardHeader}>
        <ThemedText style={styles.icon}>{icon}</ThemedText>
        <View style={styles.cardContent}>
          <ThemedText style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {title}
          </ThemedText>
          <ThemedText style={[
            styles.description,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {description}
          </ThemedText>
        </View>
        <ThemedText style={[
          styles.arrow,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {disabled ? '🚧' : '▶️'}
        </ThemedText>
      </View>
      
      {disabled && (
        <ThemedText style={[
          styles.comingSoon,
          { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
        ]}>
          Coming Soon
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor removed - now set dynamically
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    // color removed - now set dynamically
  },
  description: {
    fontSize: 14,
    // opacity removed - now using theme colors
  },
  arrow: {
    fontSize: 20,
    // color added dynamically
  },
  comingSoon: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
    // opacity removed - now using theme colors
  },
});
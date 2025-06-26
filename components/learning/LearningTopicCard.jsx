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
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          shadowColor: isDark ? '#000' : '#000',
          shadowOpacity: isDark ? 0.3 : 0.1,
          borderLeftColor: disabled ? '#E0E0E0' : color,
        },
        disabled && styles.cardDisabled
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={styles.cardContent}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: disabled ? '#F5F5F5' : color + '15' }
        ]}>
          <ThemedText style={[
            styles.icon,
            { color: disabled ? '#BDBDBD' : color }
          ]}>
            {icon}
          </ThemedText>
        </View>
        
        <View style={styles.textContainer}>
          <ThemedText style={[
            styles.title,
            { 
              color: disabled 
                ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                : (isDark ? Colors.dark.text : Colors.light.text)
            }
          ]}>
            {title}
          </ThemedText>
          <ThemedText style={[
            styles.description,
            { 
              color: disabled 
                ? (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
            }
          ]}>
            {description}
          </ThemedText>
        </View>
        
        <View style={styles.actionContainer}>
          <View style={[
            styles.arrow,
            { backgroundColor: disabled ? '#F0F0F0' : color + '20' }
          ]}>
            <ThemedText style={[
              styles.arrowText,
              { color: disabled ? '#BDBDBD' : color }
            ]}>
              {disabled ? '●' : '→'}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {disabled && (
        <View style={styles.comingSoonContainer}>
          <ThemedText style={[
            styles.comingSoon,
            { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
          ]}>
            Coming Soon
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardDisabled: {
    opacity: 0.6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    minHeight: 80,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
  },
  actionContainer: {
    marginLeft: 12,
  },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  comingSoonContainer: {
    position: 'absolute',
    bottom: 8,
    right: 20,
  },
  comingSoon: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
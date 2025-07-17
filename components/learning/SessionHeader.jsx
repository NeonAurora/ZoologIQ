// components/learning/SessionHeader.jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import LanguageToggle from '@/components/quiz/LanguageToggle';

export default function SessionHeader({ 
  categoryName, 
  topic, 
  currentLanguage, 
  onLanguageChange,
  showLanguageToggle = true 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Bilingual content
  const content = {
    en: {
      learningSession: 'Learning Session'
    },
    ms: {
      learningSession: 'Sesi Pembelajaran'
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <ThemedText 
          type="title"
          style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          {categoryName || topic}
        </ThemedText>
        <ThemedText style={[
          styles.subtitle,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {text.learningSession}
        </ThemedText>
      </View>
      
      {showLanguageToggle && (
        <View style={styles.languageToggleContainer}>
          <LanguageToggle 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            size="compact"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.7,
  },
  languageToggleContainer: {
    marginTop: 8,
  },
});
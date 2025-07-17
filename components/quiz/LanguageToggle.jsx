// components/quiz/LanguageToggle.jsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function LanguageToggle({ currentLanguage, onLanguageChange, size = 'normal' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const isCompact = size === 'compact';
  
  return (
    <View style={[
      styles.container,
      isCompact && styles.compactContainer,
      { 
        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
        borderColor: isDark ? Colors.dark.border : Colors.light.border 
      }
    ]}>
      <TouchableOpacity
        style={[
          styles.option,
          isCompact && styles.compactOption,
          currentLanguage === 'en' && [
            styles.activeOption,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]
        ]}
        onPress={() => onLanguageChange('en')}
        activeOpacity={0.7}
      >
        <ThemedText style={[
          styles.optionText,
          isCompact && styles.compactText,
          currentLanguage === 'en' && styles.activeText
        ]}>
          EN
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.option,
          isCompact && styles.compactOption,
          currentLanguage === 'ms' && [
            styles.activeOption,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]
        ]}
        onPress={() => onLanguageChange('ms')}
        activeOpacity={0.7}
      >
        <ThemedText style={[
          styles.optionText,
          isCompact && styles.compactText,
          currentLanguage === 'ms' && styles.activeText
        ]}>
          MS
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 2,
  },
  compactContainer: {
    borderRadius: 16,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    minWidth: 40,
    alignItems: 'center',
  },
  compactOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    minWidth: 32,
  },
  activeOption: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  compactText: {
    fontSize: 10,
  },
  activeText: {
    color: '#fff',
  },
});
// components/quiz/QuizHeader.jsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import LanguageToggle from '@/components/quiz/LanguageToggle';

export default function QuizHeader({ 
  title, 
  onBack, 
  currentLanguage, 
  onLanguageChange,
  showResults = false 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
      />
      <View style={[
        styles.header,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <ThemedText style={[
            styles.backButtonText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            ←
          </ThemedText>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <ThemedText style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {title}
          </ThemedText>
        </View>
        
        <View style={styles.rightSection}>
          <LanguageToggle 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            size="compact"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 35,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  rightSection: {
    width: 70,
    alignItems: 'flex-end',
  },
});
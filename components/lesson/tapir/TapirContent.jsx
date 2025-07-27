// components/lesson/tapir/TapirContent.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import LanguageToggle from '@/components/quiz/LanguageToggle';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Manual imports for Tapir sections only
import TapirIntroduction from './sections/TapirIntroduction';
import TapirPhysiology from './sections/TapirPhysiology';
import TapirEcology from './sections/TapirEcology';
import TapirConservation from './sections/TapirConservation';
import TapirPopulation from './sections/TapirPopulation';
import TapirFunFacts from './sections/TapirFunFacts';

// Component mapping
const TAPIR_COMPONENTS = {
  TapirIntroduction,
  TapirPhysiology,
  TapirEcology,
  TapirConservation,
  TapirPopulation,
  TapirFunFacts,
};

export default function TapirContent({ 
  section, 
  currentLanguage = 'en', // 🔥 NEW: Language prop
  onLanguageChange, // 🔥 NEW: Language change handler
  onToggleSidebar, 
  sidebarVisible 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // 🔥 NEW: Bilingual content
  const content = {
    en: {
      malayanTapir: 'Malayan Tapir',
      sectionNotFound: 'Tapir section not found',
      menu: 'Menu'
    },
    ms: {
      malayanTapir: 'Tapir Malaya',
      sectionNotFound: 'Bahagian Tapir tidak dijumpai',
      menu: 'Menu'
    }
  };

  const text = content[currentLanguage] || content.en;
  
  const SectionComponent = TAPIR_COMPONENTS[section.component];
  
  if (!SectionComponent) {
    return (
      <View style={styles.container}>
        <View style={[
          styles.errorContainer,
          { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
        ]}>
          <MaterialIcons 
            name="error-outline" 
            size={48} 
            color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
          />
          <ThemedText style={[
            styles.errorText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.sectionNotFound}: {section.component}
          </ThemedText>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        {/* Menu Button */}
        {!sidebarVisible && (
          <TouchableOpacity 
            onPress={onToggleSidebar} 
            style={styles.menuButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={text.menu}
          >
            <MaterialIcons 
              name="menu" 
              size={24} 
              color={isDark ? Colors.dark.text : Colors.light.text} 
            />
          </TouchableOpacity>
        )}
        
        {/* Header Content */}
        <View style={styles.headerContent}>
          <ThemedText style={styles.lessonEmoji}>🦌</ThemedText>
          <View style={styles.headerTextContainer}>
            <ThemedText style={[
              styles.headerTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {section.title}
            </ThemedText>
            <ThemedText style={[
              styles.lessonName,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.malayanTapir}
            </ThemedText>
          </View>
        </View>

        {/* 🔥 NEW: Language Toggle */}
        {onLanguageChange && (
          <View style={styles.languageToggleContainer}>
            <LanguageToggle 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              size="compact"
            />
          </View>
        )}
      </View>
      
      {/* Section Content */}
      <View style={styles.sectionContainer}>
        {/* 🔥 UPDATED: Pass language to section component */}
        <SectionComponent currentLanguage={currentLanguage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
  lessonName: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
  },
  languageToggleContainer: {
    marginLeft: 12,
  },
  sectionContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
});
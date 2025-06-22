// components/lesson/tiger/TigerSidebar.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function TigerSidebar({ 
  sections, 
  currentSection, 
  completedSections,
  onSectionSelect 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[
      styles.sidebar,
      { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
    ]}>
      <ThemedText style={[
        styles.sidebarTitle,
        { color: isDark ? Colors.dark.text : Colors.light.text }
      ]}>
        Lesson Sections
      </ThemedText>
      
      {sections.map((section, index) => (
        <TouchableOpacity
          key={section.id}
          style={[
            styles.sectionItem,
            {
              backgroundColor: currentSection === index 
                ? (isDark ? Colors.dark.tint : Colors.light.tint)
                : 'transparent'
            }
          ]}
          onPress={() => onSectionSelect(index)}
        >
          <View style={styles.sectionContent}>
            {/* 🔥 ADD: Completion indicator */}
            <View style={[
              styles.completionDot,
              {
                backgroundColor: completedSections.has(index)
                  ? '#4CAF50'
                  : (isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary)
              }
            ]}>
              {completedSections.has(index) && (
                <ThemedText style={styles.checkmark}>✓</ThemedText>
              )}
            </View>
            
            <ThemedText style={[
              styles.sectionTitle,
              {
                color: currentSection === index 
                  ? '#fff'
                  : (isDark ? Colors.dark.text : Colors.light.text)
              }
            ]}>
              {section.title}
            </ThemedText>
          </View>
        </TouchableOpacity>
      ))}
      
      {/* 🔥 ADD: Progress summary */}
      <View style={styles.progressSummary}>
        <ThemedText style={[
          styles.progressText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          Progress: {completedSections.size}/{sections.length} sections
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    flex: 1,
  },
  progressSummary: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
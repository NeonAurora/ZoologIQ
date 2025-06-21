import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerSidebar({ 
  sections, 
  currentSectionIndex, 
  onSectionSelect,
  onToggle 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={[
      styles.sidebar,
      { 
        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
        borderRightColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <View style={styles.header}>
        <View style={styles.lessonTitle}>
          <ThemedText style={styles.lessonEmoji}>🐅</ThemedText>
          <View>
            <ThemedText type="subtitle" style={styles.headerText}>
              Malayan Tiger
            </ThemedText>
            <ThemedText style={styles.lessonSubtitle}>
              Lesson Chapters
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity onPress={onToggle} style={styles.toggleButton}>
          <ThemedText style={styles.toggleText}>✕</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.sectionsList}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionItem,
              index === currentSectionIndex && {
                backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary
              }
            ]}
            onPress={() => onSectionSelect(index)}
          >
            <View style={styles.sectionContent}>
              <View style={[
                styles.sectionNumber,
                { 
                  backgroundColor: index === currentSectionIndex 
                    ? (isDark ? Colors.dark.tint : Colors.light.tint)
                    : (isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary)
                }
              ]}>
                <ThemedText style={[
                  styles.sectionNumberText,
                  index === currentSectionIndex && { color: 'white' }
                ]}>
                  {index + 1}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.sectionTitle,
                index === currentSectionIndex && styles.sectionTitleActive
              ]}>
                {section.title}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 320,
    borderRightWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 15,
  },
  lessonTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 2,
  },
  lessonSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  toggleButton: {
    padding: 5,
    marginLeft: 10,
  },
  toggleText: {
    fontSize: 18,
  },
  sectionsList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionItem: {
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  sectionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitleActive: {
    fontWeight: 'bold',
  },
});
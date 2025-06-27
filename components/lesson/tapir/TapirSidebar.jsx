// components/lesson/tapir/TapirSidebar.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirSidebar({ 
  sections, 
  currentSection, 
  completedSections, 
  onSectionSelect, 
  onClose,
  slideAnim 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Animated.View style={[
      styles.sidebarOverlay,
      { 
        transform: [{ translateX: slideAnim }],
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderRightColor: isDark ? Colors.dark.border : Colors.light.border
      }
    ]}>
      <View style={styles.sidebar}>
        {/* Header */}
        <View style={[
          styles.sidebarHeader,
          { borderBottomColor: isDark ? Colors.dark.border : Colors.light.border }
        ]}>
          <ThemedText style={[
            styles.sidebarTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            🦌 Malayan Tapir
          </ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons 
              name="close" 
              size={20} 
              color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Sections List */}
        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionItem,
                {
                  backgroundColor: currentSection === index 
                    ? (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
                    : 'transparent'
                }
              ]}
              onPress={() => onSectionSelect(index)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionContent}>
                <View style={[
                  styles.progressDot,
                  {
                    backgroundColor: completedSections.has(index) || currentSection === index
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.backgroundTertiary : '#E0E0E0')
                  }
                ]} />
                
                <ThemedText style={[
                  styles.sectionTitle,
                  {
                    color: isDark ? Colors.dark.text : Colors.light.text,
                    fontWeight: currentSection === index ? '600' : 'normal'
                  }
                ]}>
                  {section.title}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Progress Summary */}
        <View style={[
          styles.progressSummary,
          { borderTopColor: isDark ? Colors.dark.border : Colors.light.border }
        ]}>
          <ThemedText style={[
            styles.progressText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            Progress: {completedSections.size}/{sections.length} completed
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 240,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16,
  },
  sidebar: {
    flex: 1,
    borderRightWidth: 1,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  sectionsContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  sectionItem: {
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  progressSummary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
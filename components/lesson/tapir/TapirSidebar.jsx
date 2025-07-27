// components/lesson/tapir/TapirSidebar.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirSidebar({ 
  sections, 
  currentSection, 
  completedSections, 
  currentLanguage = 'en', // 🔥 NEW: Language prop
  onSectionSelect, 
  onClose,
  slideAnim 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Bilingual content
  const content = {
    en: {
      lessonContents: 'Lesson Contents',
      malayanTapir: 'Malayan Tapir',
      progress: 'Progress',
      completed: 'completed'
    },
    ms: {
      lessonContents: 'Kandungan Pelajaran',
      malayanTapir: 'Tapir Malaya',
      progress: 'Kemajuan',
      completed: 'selesai'
    }
  };

  const text = content[currentLanguage] || content.en;

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
          <View style={styles.headerContent}>
            <ThemedText style={styles.sidebarEmoji}>🦌</ThemedText>
            <View style={styles.headerText}>
              <ThemedText style={[
                styles.sidebarTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {text.lessonContents}
              </ThemedText>
              <ThemedText style={[
                styles.sidebarSubtitle,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.malayanTapir}
              </ThemedText>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons 
              name="close" 
              size={20} 
              color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Sections List */}
        <ScrollView style={styles.sectionsContainer} showsVerticalScrollIndicator={false}>
          {sections.map((section, index) => {
            const isActive = currentSection === index;
            const isCompleted = completedSections.has(index);
            
            return (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.sectionItem,
                  isActive && [
                    styles.activeSectionItem,
                    { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                  ]
                ]}
                onPress={() => onSectionSelect(index)}
                activeOpacity={0.7}
              >
                <View style={styles.sectionContent}>
                  <View style={[
                    styles.sectionNumber,
                    { 
                      backgroundColor: isCompleted 
                        ? '#4CAF50' 
                        : isActive 
                          ? (isDark ? Colors.dark.tint : Colors.light.tint)
                          : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary)
                    }
                  ]}>
                    {isCompleted ? (
                      <MaterialIcons name="check" size={12} color="#fff" />
                    ) : (
                      <ThemedText style={[
                        styles.sectionNumberText,
                        { 
                          color: isActive 
                            ? '#fff' 
                            : (isDark ? Colors.dark.textSecondary : Colors.light.textSecondary)
                        }
                      ]}>
                        {index + 1}
                      </ThemedText>
                    )}
                  </View>
                  
                  <ThemedText style={[
                    styles.sectionTitle,
                    { 
                      color: isActive 
                        ? (isDark ? Colors.dark.tint : Colors.light.tint)
                        : (isDark ? Colors.dark.text : Colors.light.text)
                    },
                    isActive && styles.activeSectionTitle
                  ]} numberOfLines={2}>
                    {section.title}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        {/* Progress Summary */}
        <View style={[
          styles.progressSummary,
          { borderTopColor: isDark ? Colors.dark.border : Colors.light.border }
        ]}>
          <View style={styles.progressContent}>
            <View style={styles.progressInfo}>
              <MaterialIcons 
                name="trending-up" 
                size={16} 
                color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
              />
              <ThemedText style={[
                styles.progressLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.progress}:
              </ThemedText>
            </View>
            
            <ThemedText style={[
              styles.progressText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {completedSections.size}/{sections.length} {text.completed}
            </ThemedText>
          </View>
          
          {/* Progress Bar */}
          <View style={[
            styles.progressBar,
            { backgroundColor: isDark ? Colors.dark.backgroundTertiary : '#E0E0E0' }
          ]}>
            <View 
              style={[
                styles.progressFill,
                { 
                  width: `${(completedSections.size / sections.length) * 100}%`,
                  backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint
                }
              ]} 
            />
          </View>
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
    minHeight: 56,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sidebarEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  sidebarSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  sectionsContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  sectionItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
  },
  activeSectionItem: {
    borderRadius: 8,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  sectionNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionNumberText: {
    fontSize: 10,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  activeSectionTitle: {
    fontWeight: '600',
  },
  progressSummary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
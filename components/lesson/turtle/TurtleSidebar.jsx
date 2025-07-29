// components/lesson/turtle/TurtleSidebar.jsx

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Bilingual labels
const LABELS = {
  en: {
    header: 'Lesson Sections',
    progress: 'Progress',
    completed: 'completed'
  },
  ms: {
    header: 'Bahagian Pelajaran',
    progress: 'Kemajuan',
    completed: 'selesai'
  }
};

export default function TurtleSidebar({
  sections,
  currentSection,
  completedSections,
  onSectionSelect,
  onClose,
  slideAnim
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // language from auth context
  const { supabaseData } = useAuth();
  const lang = supabaseData?.preferred_language || 'en';
  const { header, progress: progressLabel, completed: completedLabel } = LABELS[lang] || LABELS.en;

  // theme shortcuts
  const bgSurface = isDark ? Colors.dark.surface : Colors.light.surface;
  const bdColor   = isDark ? Colors.dark.border  : Colors.light.border;
  const text      = isDark ? Colors.dark.text    : Colors.light.text;
  const textSec   = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
  const tint      = isDark ? Colors.dark.tint    : Colors.light.tint;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ translateX: slideAnim }],
          backgroundColor: bgSurface,
          borderRightColor: bdColor
        }
      ]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: bdColor }]}>
          <View style={styles.headerContent}>
            <MaterialIcons name="menu-book" size={20} color={tint} style={styles.headerIcon} />
            <ThemedText style={[styles.headerText, { color: text }]}>
              {header}
            </ThemedText>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <MaterialIcons name="close" size={20} color={textSec} />
          </TouchableOpacity>
        </View>

        {/* Section List */}
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {sections.map((sec, idx) => {
            const isActive    = idx === currentSection;
            const isCompleted = completedSections.has(idx);
            return (
              <TouchableOpacity
                key={sec.id}
                style={[
                  styles.item,
                  isActive && { backgroundColor: tint + '20' }
                ]}
                onPress={() => onSectionSelect(idx)}
                activeOpacity={0.7}
              >
                <View style={styles.itemContent}>
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: isCompleted
                          ? '#4CAF50'
                          : isActive
                            ? tint
                            : bgSurface
                      }
                    ]}
                  >
                    {isCompleted ? (
                      <MaterialIcons name="check" size={12} color="#fff" />
                    ) : (
                      <ThemedText
                        style={[
                          styles.badgeText,
                          { color: isActive ? '#fff' : textSec }
                        ]}
                      >
                        {idx + 1}
                      </ThemedText>
                    )}
                  </View>
                  <ThemedText
                    style={[
                      styles.itemText,
                      { color: isActive ? tint : text },
                      isActive && styles.itemTextActive
                    ]}
                    numberOfLines={2}
                  >
                    {sec.title}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer / Progress */}
        <View style={[styles.footer, { borderTopColor: bdColor }]}>
          <View style={styles.progressRow}>
            <MaterialIcons name="trending-up" size={16} color={textSec} />
            <ThemedText style={[styles.progressLabel, { color: textSec }]}>
              {progressLabel}:
            </ThemedText>
            <ThemedText style={[styles.progressCount, { color: text }]}>
              {completedSections.size}/{sections.length} {completedLabel}
            </ThemedText>
          </View>
          <View
            style={[
              styles.progressBarBg,
              { backgroundColor: isDark ? Colors.dark.backgroundTertiary : '#E0E0E0' }
            ]}
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${(completedSections.size / sections.length) * 100}%`,
                  backgroundColor: tint
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
  overlay: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: 240, zIndex: 1000,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16
  },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1
  },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginRight: 8 },
  headerText: { fontSize: 14, fontWeight: '600' },
  closeBtn: { padding: 4 },

  list: { flex: 1, paddingVertical: 8 },
  item: { marginHorizontal: 8, marginVertical: 2, borderRadius: 8 },
  itemContent: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  badge: {
    width: 20, height: 20, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12
  },
  badgeText: { fontSize: 10, fontWeight: '600' },
  itemText: { fontSize: 13, flex: 1, lineHeight: 18 },
  itemTextActive: { fontWeight: '600' },

  footer: { padding: 16, borderTopWidth: 1 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  progressLabel: { fontSize: 12, fontWeight: '500' },
  progressCount: { fontSize: 12, fontWeight: '600' },
  progressBarBg: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 2 }
});

// components/lesson/tiger/TigerSidebar.jsx

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Bilingual labels
const TIGER_LABELS = {
  en: {
    header: 'Lesson Sections',
    subheader: 'Malayan Tiger',
    progress: 'Progress',
    completed: 'completed'
  },
  ms: {
    header: 'Bahagian Pelajaran',
    subheader: 'Harimau Malaya',
    progress: 'Kemajuan',
    completed: 'selesai'
  }
};

export default function TigerSidebar({
  sections,
  currentSection,
  completedSections,
  currentLanguage = 'en',
  onSectionSelect,
  onClose,
  slideAnim
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    header,
    subheader,
    progress: progressLabel,
    completed: completedLabel
  } = TIGER_LABELS[currentLanguage] || TIGER_LABELS.en;

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
          transform:      [{ translateX: slideAnim }],
          backgroundColor: bgSurface,
          borderRightColor: bdColor
        }
      ]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: bdColor }]}>
          <ThemedText style={[styles.title, { color: text }]}>
            {header}
          </ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <MaterialIcons
              name="chevron-left"
              size={24}
              color={textSec}
            />
          </TouchableOpacity>
        </View>
        <ThemedText style={[styles.subheader, { color: textSec }]}>
          {subheader}
        </ThemedText>

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
                  {/* Numbered badge instead of dot */}
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
                      <MaterialIcons
                        name="check"
                        size={12}
                        color="#fff"
                      />
                    ) : (
                      <ThemedText
                        style={[
                          styles.badgeText,
                          {
                            color: isActive
                              ? '#fff'
                              : textSec
                          }
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
          <ThemedText style={[styles.progressText, { color: textSec }]}>
            {progressLabel}: {completedSections.size}/{sections.length} {completedLabel}
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position:    'absolute',
    top:         0,
    left:        0,
    bottom:      0,
    width:       240,
    zIndex:      1000,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 16
  },
  container:       { flex: 1 },
  header:          {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    padding:        16,
    borderBottomWidth: 1
  },
  title:           { fontSize: 16, fontWeight: '600' },
  closeBtn:        { padding: 4 },
  subheader:       { paddingHorizontal: 16, paddingBottom: 8, fontSize: 12 },
  list:            { flex: 1, paddingVertical: 8 },
  item:            { marginHorizontal: 12, marginVertical: 2, borderRadius: 8 },
  itemContent:     { flexDirection: 'row', alignItems: 'center', padding: 12 },

  // numbered badge
  badge:           {
    width:        20,
    height:       20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems:   'center',
    marginRight:  12
  },
  badgeText:      { fontSize: 10, fontWeight: '600' },

  itemText:       { fontSize: 14, flex: 1, lineHeight: 18 },
  itemTextActive: { fontWeight: '600' },
  footer:         { padding: 16, borderTopWidth: 1 },
  progressText:   { fontSize: 12, textAlign: 'center' }
});

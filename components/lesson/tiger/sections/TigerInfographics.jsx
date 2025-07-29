// components/lesson/tiger/sections/TigerInfographics.jsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  useWindowDimensions
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerInfographics() {
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // theme colors
  const bgSurface   = isDark ? Colors.dark.surface   : Colors.light.surface;
  const bdColor     = isDark ? Colors.dark.border    : Colors.light.border;
  const bgSecondary = isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary;
  const tint        = isDark ? Colors.dark.tint     : Colors.light.tint;
  const txtPrimary  = isDark ? Colors.dark.text     : Colors.light.text;
  const txtSecondary= isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
  const txtMuted    = isDark ? Colors.dark.textMuted : Colors.light.textMuted;

  // layout
  const cardMaxWidth = Math.min(width * 0.9, 600);
  const imageHeight  = cardMaxWidth * 0.75; // maintain 4:3 aspect

  const infographics = [
    {
      id: 1,
      title: 'Tiger Anatomy & Physical Characteristics',
      description: 'Detailed visual guide showing the unique physical features and anatomical structure of the Malayan Tiger.',
      image: require('@/assets/images/Tiger1.png'),
      caption: 'Visual breakdown of tiger anatomy including distinctive stripe patterns, muscle structure, and key physical measurements.'
    },
    {
      id: 2,
      title: 'Tiger Habitat & Territory Range',
      description: 'Comprehensive map and habitat analysis showing the current and historical range of Malayan Tigers in Southeast Asia.',
      image: require('@/assets/images/Tiger2.png'),
      caption: 'Geographic distribution, preferred habitats, and territory size requirements for tiger populations in Malaysia.'
    },
    {
      id: 3,
      title: 'Conservation Status & Population Data',
      description: 'Statistical overview of current tiger populations, threats, and conservation efforts across their range.',
      image: require('@/assets/images/Tiger3.png'),
      caption: 'Population trends, conservation milestones, and key statistics about Malayan Tiger recovery programs.'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={[styles.header, { backgroundColor: bgSurface, borderBottomColor: bdColor }]}>
        <MaterialIcons name="auto-awesome" size={24} color={tint} />
        <ThemedText style={[styles.title, { color: txtPrimary }]}>Infographics</ThemedText>
      </ThemedView>

      {/* Intro */}
      <ThemedView style={[styles.intro, { backgroundColor: bgSecondary, borderLeftColor: tint }]}>
        <MaterialIcons name="info" size={20} color={tint} />
        <ThemedText style={[styles.introText, { color: txtSecondary }]}>
          Explore these detailed visual guides that illustrate key concepts about the Malayan Tiger.
          Each infographic provides comprehensive information in an easy-to-understand format.
        </ThemedText>
      </ThemedView>

      {/* Cards */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {infographics.map(item => (
          <View
            key={item.id}
            style={[
              styles.card,
              {
                width: cardMaxWidth,
                backgroundColor: bgSurface,
                borderColor: bdColor,
                shadowColor: txtPrimary
              }
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.numberBadge, { backgroundColor: tint }]}>
                <ThemedText style={[styles.numberText, { color: bgSurface }]}>
                  {item.id}
                </ThemedText>
              </View>
              <View style={styles.headerText}>
                <ThemedText style={[styles.cardTitle, { color: txtPrimary }]}>
                  {item.title}
                </ThemedText>
                <ThemedText style={[styles.cardDesc, { color: txtSecondary }]}>
                  {item.description}
                </ThemedText>
              </View>
            </View>

            <Image
              source={item.image}
              style={[
                styles.image,
                {
                  width: cardMaxWidth - 32,  // account for padding
                  height: imageHeight,
                  borderColor: bdColor
                }
              ]}
              resizeMode="contain"
            />

            <View style={[styles.caption, { backgroundColor: bgSecondary }]}>
              <MaterialIcons name="image" size={16} color={txtMuted} />
              <ThemedText style={[styles.captionText, { color: txtMuted }]}>
                {item.caption}
              </ThemedText>
            </View>
          </View>
        ))}

        {/* Completion */}
        <View
          style={[
            styles.card,
            styles.completion,
            {
              width: cardMaxWidth,
              backgroundColor: bgSecondary,
              borderColor: bdColor
            }
          ]}
        >
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <ThemedText style={[styles.completionText, { color: txtPrimary }]}>
            You’ve viewed all tiger infographics! These visual guides complement the
            detailed information covered in the previous sections. Continue to the
            references section for additional reading materials.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  header:       { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, gap: 12 },
  title:        { fontSize: 22, fontWeight: '600' },
  intro:        { flexDirection: 'row', alignItems: 'flex-start', margin: 16, padding: 16, borderRadius: 12, borderLeftWidth: 4, gap: 12 },
  introText:    { flex: 1, fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  scrollContent:{ alignItems: 'center', paddingVertical: 20, gap: 20 },

  card:         {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    paddingBottom: 16
  },
  cardHeader:   { flexDirection: 'row', alignItems: 'flex-start', padding: 20, gap: 16 },
  numberBadge:  { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  numberText:   { fontSize: 16, fontWeight: 'bold' },
  headerText:   { flex: 1 },
  cardTitle:    { fontSize: 18, fontWeight: '700', marginBottom: 8, lineHeight: 24 },
  cardDesc:     { fontSize: 14, lineHeight: 20 },

  image:        { borderRadius: 12, borderWidth: 1, marginHorizontal: 16, marginBottom: 16 },
  caption:      { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  captionText:  { flex: 1, fontSize: 13, lineHeight: 18, fontStyle: 'italic' },

  completion:   { flexDirection: 'row', alignItems: 'flex-start', padding: 20, borderRadius: 12, borderWidth: 1, gap: 12, marginTop: 8 },
  completionText:{ flex: 1, fontSize: 15, lineHeight: 22, fontWeight: '500' }
});

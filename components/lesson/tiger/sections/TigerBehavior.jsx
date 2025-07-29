// components/lesson/tiger/sections/TigerBehavior.jsx
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerBehavior({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      funFactsTitle:     'Fun Facts About Malayan Tigers',
      funFactsCards:     [
        { title: 'Striped Uniqueness', description: 'No two Malayan tigers have the same stripe pattern—just like human fingerprints!', icon: 'fingerprint' },
        { title: 'Mini but Mighty',      description: 'Smallest mainland tiger subspecies yet can leap over 5 meters in one jump',        icon: 'speed' },
        { title: 'Night Vision Pros',    description: 'Eyes glow in the dark due to a reflective layer, helping them hunt at night',     icon: 'visibility' },
        { title: 'Chatty Cats',          description: 'Communicate with roars, growls, and \'chuffing\' sounds for friendly greeting',    icon: 'mic' }
      ],
      reproductionTitle: 'Reproduction & Family Life',
      reproductionCards: [
        { title: 'Slow Breeders', description: 'Females give birth to 2–4 cubs every 2–3 years after 3–4 month pregnancy', icon: 'schedule' },
        { title: 'Super Moms',     description: 'Cubs stay with mothers for 18–24 months to learn hunting skills',                 icon: 'school' },
        { title: 'Dad\'s Role',    description: 'Males don\'t raise cubs but protect territory from rival tigers',                  icon: 'security' }
      ],
      physiologyTitle:   'Physiology & Adaptations',
      physiologyCards:   [
        { title: 'Powerful Bite',    description: 'Jaw strength of 1,000 psi can crush bones with ease',                           icon: 'fitness-center' },
        { title: 'Swimming Stars',   description: 'Unlike most cats, they love water and swim to cool off or hunt',                 icon: 'pool' },
        { title: 'Camouflage Kings', description: 'Orange-and-black stripes blend perfectly with sunlight and forest shadows',     icon: 'palette' }
      ],
      behaviorTitle:     'Behavior & Intelligence',
      behaviorCards:     [
        { title: 'Territorial Markers', description: 'Spray urine and scratch trees to mark their territory',         icon: 'place' },
        { title: 'Solo Travelers',       description: 'Adults live alone, needing 50–150 km² of territory',            icon: 'person' },
        { title: 'Smart Hunters',        description: 'Mimic prey calls like deer sounds to lure them closer',           icon: 'psychology' }
      ]
    },
    ms: {
      funFactsTitle:     'Fakta Menarik Tentang Harimau Malaya', 
      funFactsCards:     [
        { title: 'Belang Unik',           description: 'Tiada dua harimau Malaya yang mempunyai corak belang yang sama - seperti cap jari manusia!', icon: 'fingerprint' },
        { title: 'Kecil tapi Gagah',       description: 'Subspesies harimau terkecil tetapi mampu melompat lebih 5 meter dalam satu lompatan',    icon: 'speed' },
        { title: 'Pakar Penglihatan Malam',description: 'Mata bersinar dalam gelap membantu mereka memburu pada waktu malam',                    icon: 'visibility' },
        { title: 'Kucing Bercakap-cakap',  description: 'Berkomunikasi dengan raungan, geraman, dan bunyi \'chuffing\' untuk sapaan mesra',     icon: 'mic' }
      ],
      reproductionTitle: 'Pembiakan & Kehidupan Keluarga',
      reproductionCards: [
        { title: 'Pembiak Lambat', description: 'Betina melahirkan 2-4 anak setiap 2-3 tahun selepas mengandung 3-4 bulan',  icon: 'schedule' },
        { title: 'Ibu yang Hebat',  description: 'Anak harimau tinggal dengan ibu 18-24 bulan untuk belajar memburu',          icon: 'school' },
        { title: 'Peranan Bapa',     description: 'Jantan tidak membesarkan anak tetapi melindungi wilayah dari saingan',    icon: 'security' }
      ],
      physiologyTitle:   'Fisiologi & Adaptasi',
      physiologyCards:   [
        { title: 'Gigitan Kuat',    description: 'Kekuatan rahang 1,000 psi mampu mematahkan tulang dengan mudah',    icon: 'fitness-center' },
        { title: 'Perenang Handal', description: 'Tidak seperti kebanyakan kucing, mereka suka air dan berenang',    icon: 'pool' },
        { title: 'Raja Penyamaran', description: 'Belang oren-hitam menyamai sempurna dengan cahaya dan bayang hutan', icon: 'palette' }
      ],
      behaviorTitle:     'Tingkah Laku & Kecerdasan',
      behaviorCards:     [
        { title: 'Penanda Wilayah', description: 'Menyembur air kencing dan mencakar pokok untuk menanda wilayah', icon: 'place' },
        { title: 'Pengembara Solo', description: 'Harimau dewasa hidup bersendirian, memerlukan wilayah 50-150 km²',   icon: 'person' },
        { title: 'Pemburu Bijak',   description: 'Meniru panggilan mangsa seperti bunyi rusa untuk memikat mangsa', icon: 'psychology' }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  // Define each section’s header icon, title, cards array, and an optional card‐icon color override:
  const sections = [
    {
      title: text.funFactsTitle,
      headerIcon: 'lightbulb',
      cards: text.funFactsCards,
      cardColor: '#FF9800'
    },
    {
      title: text.reproductionTitle,
      headerIcon: 'child-care',
      cards: text.reproductionCards,
      cardColor: '#E91E63'
    },
    {
      title: text.physiologyTitle,
      headerIcon: 'science',
      cards: text.physiologyCards,
      cardColor: '#2196F3'
    },
    {
      title: text.behaviorTitle,
      headerIcon: 'psychology',
      cards: text.behaviorCards,
      cardColor: '#9C27B0'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {sections.map(({ title, headerIcon, cards, cardColor }, si) => (
        <View key={si} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons
              name={headerIcon}
              size={20}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
            />
            <ThemedText
              style={[
                styles.sectionTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
              {title}
            </ThemedText>
          </View>

          <View style={styles.cardsGrid}>
            {cards.map((c, i) => (
              <View
                key={i}
                style={[
                  styles.card,
                  {
                    backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                    borderColor:    isDark ? Colors.dark.border  : Colors.light.border
                  }
                ]}>
                <MaterialIcons
                  name={c.icon}
                  size={24}
                  color={cardColor}
                  style={styles.cardIcon}
                />
                <View style={styles.cardContent}>
                  <ThemedText
                    style={[
                      styles.cardTitle,
                      { color: isDark ? Colors.dark.text : Colors.light.text }
                    ]}>
                    {c.title}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}>
                    {c.description}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1 },
  content:       { padding: 16, paddingBottom: 32 },

  section:       { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTitle:  { fontSize: 18, fontWeight: '600' },

  cardsGrid:     { gap: 12 },
  card:          {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon:      { marginRight: 16 },
  cardContent:   { flex: 1 },
  cardTitle:     { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDescription:{ fontSize: 13, lineHeight: 18 }
});

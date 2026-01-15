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
      funFactsTitle: 'Fun Facts About Malayan Tigers',
      funFactsCards: [
        { 
          title: 'Striped Uniqueness', 
          description: 'No two tigers have the same stripe pattern, so researchers can identify individual Malayan tigers from their stripes, like using fingerprints for people (EndangeredTigers.org, 2021)', 
          icon: 'fingerprint' 
        },
        { 
          title: 'Mini but Mighty', 
          description: 'Malayan tigers are the smallest of the mainland tiger subspecies, yet they are still powerful cats capable of making long jumps when chasing prey (MyBIS, 2021; EndangeredTigers.org, 2021)', 
          icon: 'speed' 
        },
        { 
          title: 'Night Vision Pros', 
          description: 'Their eyes seem to glow in the dark because of a reflective layer called the tapetum lucidum, which helps them see better and hunt in low light', 
          icon: 'visibility' 
        }
      ],
      reproductionTitle: 'Reproduction & Family Life',
      reproductionCards: [
        { 
          title: 'Slow Reproduction', 
          description: 'Female tigers reproduce slowly: they usually have 2-4 cubs after a pregnancy of about 3-3½ months, and they usually only have one new litter every 2-3 years as the cubs remain with their mothers for two years (Myers et al., 2025)', 
          icon: 'child-care' 
        }
      ],
      behaviorTitle: 'Behavior & Intelligence',
      behaviorCards: [
        { 
          title: 'Territorial Markers', 
          description: 'Tigers mark their territory by spraying urine and scratching trees, leaving both scent and visual signs for other tigers', 
          icon: 'place' 
        },
        { 
          title: 'Solitary Lifestyle', 
          description: 'They generally live and hunt alone, except when the mother is raising cubs', 
          icon: 'person' 
        },
        { 
          title: 'Active Hours', 
          description: 'They are most active at night or in cool mornings and late evenings', 
          icon: 'schedule' 
        },
        { 
          title: 'Stealth Hunters', 
          description: 'They move silently on soft paws and use cover to hide before attacking their prey', 
          icon: 'visibility-off' 
        },
        { 
          title: 'Teaching Young', 
          description: 'Mother tigers teach their cubs to hunt, which shows that young tigers learn skills over time', 
          icon: 'school' 
        }
      ]
    },
    ms: {
      funFactsTitle: 'Fakta Menarik Tentang Harimau Malaya',
      funFactsCards: [
        { 
          title: 'Belang Unik', 
          description: 'Tiada dua harimau yang mempunyai corak belang yang sama, jadi penyelidik boleh mengenal pasti harimau Malaya individu daripada belang mereka, seperti menggunakan cap jari untuk manusia (EndangeredTigers.org, 2021)', 
          icon: 'fingerprint' 
        },
        { 
          title: 'Kecil tapi Gagah', 
          description: 'Harimau Malaya adalah yang terkecil daripada subspesies harimau daratan, namun mereka masih kucing yang kuat yang mampu membuat lompatan jauh ketika mengejar mangsa (MyBIS, 2021; EndangeredTigers.org, 2021)', 
          icon: 'speed' 
        },
        { 
          title: 'Pakar Penglihatan Malam', 
          description: 'Mata mereka kelihatan bercahaya dalam gelap kerana lapisan reflektif yang dipanggil tapetum lucidum, yang membantu mereka melihat dengan lebih baik dan memburu dalam cahaya rendah', 
          icon: 'visibility' 
        }
      ],
      reproductionTitle: 'Pembiakan & Kehidupan Keluarga',
      reproductionCards: [
        { 
          title: 'Pembiakan Perlahan', 
          description: 'Harimau betina membiak dengan perlahan: mereka biasanya mempunyai 2-4 anak selepas mengandung kira-kira 3-3½ bulan, dan mereka biasanya hanya mempunyai satu kelahiran baru setiap 2-3 tahun kerana anak kekal dengan ibu mereka selama dua tahun (Myers et al., 2025)', 
          icon: 'child-care' 
        }
      ],
      behaviorTitle: 'Tingkah Laku & Kecerdasan',
      behaviorCards: [
        { 
          title: 'Penanda Wilayah', 
          description: 'Harimau menandakan wilayah mereka dengan menyembur air kencing dan mencakar pokok, meninggalkan tanda bau dan visual untuk harimau lain', 
          icon: 'place' 
        },
        { 
          title: 'Gaya Hidup Bersendirian', 
          description: 'Mereka umumnya hidup dan memburu bersendirian, kecuali ketika ibu sedang membesarkan anak', 
          icon: 'person' 
        },
        { 
          title: 'Waktu Aktif', 
          description: 'Mereka paling aktif pada waktu malam atau pada pagi yang sejuk dan petang lewat', 
          icon: 'schedule' 
        },
        { 
          title: 'Pemburu Senyap', 
          description: 'Mereka bergerak secara senyap dengan tapak yang lembut dan menggunakan perlindungan untuk bersembunyi sebelum menyerang mangsa mereka', 
          icon: 'visibility-off' 
        },
        { 
          title: 'Mengajar Anak', 
          description: 'Ibu harimau mengajar anak mereka untuk memburu, yang menunjukkan bahawa harimau muda belajar kemahiran dari masa ke masa', 
          icon: 'school' 
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

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
                    borderColor: isDark ? Colors.dark.border : Colors.light.border
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
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },

  cardsGrid: { gap: 12 },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon: { marginRight: 16, marginTop: 2 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 13, lineHeight: 18 }
});
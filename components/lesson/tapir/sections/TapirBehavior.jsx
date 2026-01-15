// components/lesson/tapir/sections/TapirBehavior.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirBehavior({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      // ==================== REPRODUCTION & FAMILY LIFE (EN) ====================
      reproductionTitle: "Reproduction & Family Life of the Malayan Tapir",
      reproductionData: [
        {
          title: "Gestation Period",
          description: "The female Malayan tapir has a gestation period of approximately 13 months, reported to be approximately 380-405 days before the birth of a calf (Kuehn, 1978).",
          icon: "schedule"
        },
        {
          title: "Birth Pattern",
          description: "Malayan tapirs generally give birth to a single calf per pregnancy, and captive breeding records indicate that births can occur in any month of the year, with no apparent breeding season (Pukazhenthi et al., 2013).",
          icon: "child-care"
        },
        {
          title: "Sexual Maturity & Reproduction Rate",
          description: "Malayan tapirs generally reach sexual maturity between about 2.5 and 4 years of age, and captive breeding records show an average calving interval of about 18-24 months (about 2 years), so even in good conditions females usually produce only one calf every 2-3 years and population growth is slow (Pukazhenthi et al., 2013).",
          icon: "trending-up"
        }
      ],

      // ==================== BEHAVIOR & INTELLIGENCE (EN) ====================
      behaviorTitle: "Behavior & Intelligence of the Malayan Tapir",
      behaviorData: [
        {
          title: "Communication",
          description: "Malayan tapirs use high-pitched whistles, screams, and clicking sounds to communicate with each other, and they also rely heavily on scent-related behaviors such as urine spraying, sniffing urine and feces, and the Flehmen response to gather information about identity and reproductive status (Walb et al., 2021).",
          icon: "volume-up"
        },
        {
          title: "Adaptability",
          description: "Studies of captive Malayan tapirs show that when management is consistent and based on shared best practice across collections they can adapt to zookeeping routines and enclosure conditions (Rose & Roffey, 2011).",
          icon: "psychology"
        }
      ]
    },

    ms: {
      // ==================== REPRODUCTION & FAMILY LIFE (MS) ====================
      reproductionTitle: "Pembiakan & Kehidupan Keluarga Tapir Malaya",
      reproductionData: [
        {
          title: "Tempoh Mengandung",
          description: "Tapir Malaya betina mempunyai tempoh mengandung kira-kira 13 bulan, dilaporkan kira-kira 380-405 hari sebelum kelahiran anak (Kuehn, 1978).",
          icon: "schedule"
        },
        {
          title: "Corak Kelahiran",
          description: "Tapir Malaya umumnya melahirkan satu anak setiap kehamilan, dan rekod pembiakan dalam kurungan menunjukkan bahawa kelahiran boleh berlaku pada mana-mana bulan dalam tahun, tanpa musim pembiakan yang jelas (Pukazhenthi et al., 2013).",
          icon: "child-care"
        },
        {
          title: "Kematangan Seksual & Kadar Pembiakan",
          description: "Tapir Malaya umumnya mencapai kematangan seksual antara kira-kira 2.5 dan 4 tahun, dan rekod pembiakan dalam kurungan menunjukkan selang kelahiran purata kira-kira 18-24 bulan (kira-kira 2 tahun), jadi walaupun dalam keadaan yang baik, betina biasanya hanya menghasilkan satu anak setiap 2-3 tahun dan pertumbuhan populasi adalah perlahan (Pukazhenthi et al., 2013).",
          icon: "trending-up"
        }
      ],

      // ==================== BEHAVIOR & INTELLIGENCE (MS) ====================
      behaviorTitle: "Tingkah Laku & Kecerdasan Tapir Malaya",
      behaviorData: [
        {
          title: "Komunikasi",
          description: "Tapir Malaya menggunakan siulan bernada tinggi, jeritan, dan bunyi klik untuk berkomunikasi antara satu sama lain, dan mereka juga sangat bergantung pada tingkah laku berkaitan bau seperti menyembur air kencing, menghidu air kencing dan najis, dan tindak balas Flehmen untuk mengumpul maklumat tentang identiti dan status pembiakan (Walb et al., 2021).",
          icon: "volume-up"
        },
        {
          title: "Kebolehsuaian",
          description: "Kajian terhadap tapir Malaya dalam kurungan menunjukkan bahawa apabila pengurusan konsisten dan berdasarkan amalan terbaik yang dikongsi merentasi koleksi, mereka boleh menyesuaikan diri dengan rutin penjagaan zoo dan keadaan kandang (Rose & Roffey, 2011).",
          icon: "psychology"
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const Card = ({ icon, title, children }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
      <MaterialIcons
        name={icon}
        size={24}
        color={isDark ? Colors.dark.tint : Colors.light.tint}
        style={styles.cardIcon}
      />
      <View style={styles.cardContent}>
        <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          {title}
        </ThemedText>
        {typeof children === 'string' ? (
          <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Reproduction & Family Life */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="family-restroom" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.reproductionTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.reproductionData.map((item, idx) => (
            <Card key={idx} icon={item.icon} title={item.title}>
              {item.description}
            </Card>
          ))}
        </View>
      </View>

      {/* Behavior & Intelligence */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="psychology" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.behaviorTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.behaviorData.map((item, idx) => (
            <Card key={idx} icon={item.icon} title={item.title}>
              {item.description}
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },

  cardsGrid: { gap: 12 },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: { marginRight: 16, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20 },
});
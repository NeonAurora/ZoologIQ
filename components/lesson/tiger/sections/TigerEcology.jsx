// components/lesson/tiger/sections/TigerEcology.jsx
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerEcology({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      ecologyTitle: "Malayan Tiger's Role in Biodiversity:",
      biodiversityCards: [
        { title: "Ecosystem Balance",      description: "Controls prey populations, preventing overgrazing and habitat degradation", icon: "balance" },
        { title: "Species Protection",     description: "Safeguards countless other species that share its rainforest ecosystem", icon: "forest" },
        { title: "Health Indicator",       description: "Their presence signals intact, biodiverse forests; decline reflects ecosystem stress", icon: "health-and-safety" },
        { title: "Forest Regeneration",    description: "Influences herbivore behavior, which shapes plant distribution", icon: "nature" },
        { title: "National Symbol",        description: "Ecotourism centered on tigers supports local livelihoods", icon: "flag" },
        { title: "Climate Action",         description: "Preserving tiger habitats mitigates climate change by storing carbon", icon: "cloud" }
      ],
      importanceTitle: "Why Malayan Tigers Matter:",
      importanceCards: [
        { title: "Apex Predator Role",      description: "Regulate prey populations, prevent overgrazing, maintain forest health", icon: "restaurant" },
        { title: "Biodiversity Indicator",  description: "Their presence indicates a thriving, biodiverse ecosystem", icon: "nature" },
        { title: "Cultural Heritage",       description: "Featured on Malaysia's coat of arms and currency, representing strength and heritage", icon: "museum" },
        { title: "Indigenous Folklore",     description: "Deeply rooted in Indigenous tales of Harimau Jadian—were-tigers", icon: "book" },
        { title: "Economic Value",          description: "Ecotourism generates income for local communities", icon: "payments" },
        { title: "Environmental Services",  description: "Healthy tiger habitats support agriculture and clean water sources", icon: "opacity" },
        { title: "Climate Storage",         description: "Tiger forests store carbon—Malaysia's rainforests absorb ~1.2 billion tons annually", icon: "forest" },
        { title: "Evolutionary Uniqueness",description: "1 of 6 surviving tiger subspecies, with distinct DNA. Losing them erases a unique lineage", icon: "biotech" }
      ]
    },
    ms: {
      ecologyTitle: "Peranan Harimau Malaya dalam Kepelbagaian Biologi:",
      biodiversityCards: [
        { title: "Keseimbangan Ekosistem", description: "Mengawal populasi mangsa, mengelakkan overgrazing dan kemerosotan habitat", icon: "balance" },
        { title: "Perlindungan Spesies",   description: "Menyelamatkan banyak spesies lain yang berkongsi ekosistem hutan hujan", icon: "forest" },
        { title: "Petunjuk Kesihatan",     description: "Kehadiran mereka menandakan hutan yang sihat dan biodiversiti yang kaya", icon: "health-and-safety" },
        { title: "Pemulihan Hutan",        description: "Mempengaruhi tingkah laku haiwan herbivor, membentuk taburan tumbuhan", icon: "nature" },
        { title: "Simbol Kebangsaan",      description: "Ekopelancongan berpusatkan harimau menyokong pendapatan komuniti tempatan", icon: "flag" },
        { title: "Tindakan Iklim",         description: "Habitat harimau menyimpan karbon, membantu mitigasi perubahan iklim", icon: "cloud" }
      ],
      importanceTitle: "Mengapa Harimau Malaya Penting:",
      importanceCards: [
        { title: "Peranan Pemangsa Puncak",description: "Mengawal populasi mangsa, mencegah overgrazing, mengekalkan kesihatan hutan", icon: "restaurant" },
        { title: "Petunjuk Biodiversiti", description: "Kehadiran mereka menandakan ekosistem yang sihat dan kaya dengan biodiversiti", icon: "nature" },
        { title: "Warisan Budaya",        description: "Dipaparkan pada jata negara dan mata wang Malaysia, melambangkan kekuatan", icon: "museum" },
        { title: "Cerita Rakyat Tempatan",description: "Berakar umbi dalam cerita rakyat tempatan seperti legenda Harimau Jadian", icon: "book" },
        { title: "Nilai Ekonomi",         description: "Ekopelancongan menjana pendapatan untuk komuniti tempatan", icon: "payments" },
        { title: "Perkhidmatan Alam",     description: "Habitat harimau yang sihat menyokong pertanian dan sumber air bersih", icon: "opacity" },
        { title: "Penyimpanan Iklim",     description: "Hutan harimau menyimpan karbon - hutan hujan Malaysia menyerap ~1.2 bilion tan setiap tahun", icon: "forest" },
        { title: "Keunikan Evolusi",      description: "Salah satu daripada 6 subspesies harimau yang masih wujud, dengan DNA unik", icon: "biotech" }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const Section = ({ icon, title, data }) => (
    <View style={styles.section}>
      <View style={styles.header}>
        <MaterialIcons
          name={icon}
          size={20}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
        />
        <ThemedText
          style={[
            styles.headerText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          {title}
        </ThemedText>
      </View>
      <View style={styles.grid}>
        {data.map(({ icon, title, description }, i) => (
          <View
            key={i}
            style={[
              styles.card,
              {
                backgroundColor: isDark
                  ? Colors.dark.surface
                  : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
          >
            <MaterialIcons
              name={icon}
              size={24}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
              style={styles.cardIcon}
            />
            <View style={styles.cardContent}>
              <ThemedText
                style={[
                  styles.cardTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}
              >
                {title}
              </ThemedText>
              <ThemedText
                style={[
                  styles.cardDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}
              >
                {description}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section
        icon="eco"
        title={text.ecologyTitle}
        data={text.biodiversityCards}
      />
      <Section
        icon="star"
        title={text.importanceTitle}
        data={text.importanceCards}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  headerText: { fontSize: 18, fontWeight: '600' },

  grid: { gap: 12 },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon: { marginRight: 16 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 13, lineHeight: 18 }
});

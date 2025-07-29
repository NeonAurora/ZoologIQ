// components/lesson/turtle/sections/TurtleBiodiversity.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Icon lookup for biodiversity aspects
const getBiodiversityIcon = (aspect) => {
  const t = aspect.toLowerCase();
  if (t.includes('seagrass maintenance')    || t.includes('penyelenggaraan rumpai laut'))       return 'spa';
  if (t.includes('coral reef health')       || t.includes('kesihatan terumbu karang'))         return 'water';
  if (t.includes('nutrient cycling')        || t.includes('kitaran nutrien'))                  return 'autorenew';
  if (t.includes('food web dynamics')       || t.includes('dinamik rangkaian makanan'))        return 'restaurant';
  if (t.includes('biodiversity support')    || t.includes('sokongan kepelbagaian biologi'))    return 'groups';
  if (t.includes('indicator species')       || t.includes('spesies penunjuk'))                  return 'analytics';
  return 'eco';
};

// Icons for the “Why … Matters” cards
const getWhyIcon = (index) => {
  switch (index) {
    case 0: return 'spa';          // seagrass
    case 1: return 'water';        // coral reef
    case 2: return 'autorenew';    // nutrient cycling
    case 3: return 'restaurant';   // food web
    case 4: return 'park';         // seagrass beds habitat
    case 5: return 'analytics';    // indicator species
    default: return 'lightbulb';
  }
};

export default function TurtleBiodiversity({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      roleTitle: 'Role of Chelonia mydas in Biodiversity',
      roleData: [
        { aspect: 'Seagrass Maintenance',  description: 'Grazing keeps seagrass meadows healthy, promoting growth and preventing overgrowth.' },
        { aspect: 'Coral Reef Health',     description: 'Controls algae on coral reefs, letting corals thrive and maintain reef ecosystems.' },
        { aspect: 'Nutrient Cycling',      description: 'Movement between nesting beaches and feeding grounds distributes nutrients, enriching ecosystems.' },
        { aspect: 'Food Web Dynamics',     description: 'Eggs and hatchlings serve as food for predators like crabs, birds, and fish.' },
        { aspect: 'Biodiversity Support',  description: 'Seagrass beds and coral reefs, supported by turtles, provide habitats for diverse marine life.' },
        { aspect: 'Indicator Species',     description: 'Acts as a biological indicator of ocean health due to sensitivity to habitat changes.' }
      ],
      whyTitle: 'Why the Green Sea Turtle Matters',
      whyData: [
        'Keeps seagrass meadows healthy, preventing overgrowth and fostering biodiversity. (Bjorndal, 1997)',
        'Controls algae on coral reefs, promoting balanced environments for corals and marine life. (Lutz & Musick, 1997)',
        'Transports nutrients between nesting and feeding sites, enriching distant ecosystems. (NOAA, 2023)',
        'Provides vital food for predators through eggs and hatchlings. (Spotila, 2004)',
        'Maintains seagrass beds that serve as habitats for numerous marine organisms. (IUCN, 2023)',
        'Reflects marine ecosystem health as an indicator species. (NOAA, 2023)'
      ]
    },
    ms: {
      roleTitle: 'Peranan Chelonia mydas dalam Kepelbagaian Biologi',
      roleData: [
        { aspect: 'Penyelenggaraan Rumpai Laut',   description: 'Pemakanan mengekalkan padang rumpai laut yang sihat, menggalakkan pertumbuhan dan mencegah pertumbuhan berlebihan.' },
        { aspect: 'Kesihatan Terumbu Karang',      description: 'Mengawal alga di terumbu karang, membolehkan karang hidup subur dan mengekalkan ekosistem terumbu.' },
        { aspect: 'Kitaran Nutrien',               description: 'Pergerakan antara pantai penetasan dan kawasan makan mengedarkan nutrien, memperkayakan ekosistem.' },
        { aspect: 'Dinamik Rangkaian Makanan',      description: 'Telur dan anak penyu menjadi sumber makanan kepada pemangsa seperti ketam, burung, dan ikan.' },
        { aspect: 'Sokongan Kepelbagaian Biologi',  description: 'Padang rumpai laut dan terumbu karang yang disokong penyu menyediakan habitat untuk pelbagai hidupan marin.' },
        { aspect: 'Spesies Penunjuk',               description: 'Bertindak sebagai penunjuk biologi terhadap kesihatan laut kerana kepekaannya terhadap perubahan habitat.' }
      ],
      whyTitle: 'Mengapa Penyu Agar Penting',
      whyData: [
        'Mengekalkan padang rumpai laut yang sihat, mencegah pertumbuhan berlebihan dan menyokong biodiversiti. (Bjorndal, 1997)',
        'Mengawal alga di terumbu karang, mewujudkan persekitaran seimbang untuk karang dan hidupan laut. (Lutz & Musick, 1997)',
        'Mengangkut nutrien di antara tapak penetasan dan kawasan makan, memperkayakan ekosistem. (NOAA, 2023)',
        'Menjadi sumber makanan penting melalui telur dan anak penyu. (Spotila, 2004)',
        'Mengekalkan padang rumpai laut yang menjadi habitat pelbagai organisma marin. (IUCN, 2023)',
        'Mencerminkan kesihatan ekosistem marin sebagai spesies penunjuk. (NOAA, 2023)'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Role in Biodiversity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="eco"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.roleTitle}
          </ThemedText>
        </View>
        {text.roleData.map((item, i) => (
          <View
            key={`role-${i}`}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor:      isDark ? Colors.dark.border  : Colors.light.border
              }
            ]}
          >
            <MaterialIcons
              name={getBiodiversityIcon(item.aspect)}
              size={24}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
              style={styles.cardIcon}
            />
            <View style={styles.cardContent}>
              <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                {item.aspect}
              </ThemedText>
              <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                {item.description}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      {/* Why It Matters */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="lightbulb"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.whyTitle}
          </ThemedText>
        </View>
        {text.whyData.map((line, i) => (
          <View
            key={`why-${i}`}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor:      isDark ? Colors.dark.border  : Colors.light.border
              }
            ]}
          >
            <MaterialIcons
              name={getWhyIcon(i)}
              size={24}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
              style={styles.cardIcon}
            />
            <View style={styles.cardContent}>
              <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                {line}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { padding: 16, paddingBottom: 32 },

  section: {},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16   // extra gap before cards
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600'
  },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon:       { marginRight: 16, marginTop: 4 },
  cardContent:    { flex: 1 },
  cardTitle:      { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription:{ fontSize: 14, lineHeight: 20 }
});

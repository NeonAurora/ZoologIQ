// components/lesson/tiger/sections/TigerIntroduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerIntroduction({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    const scientificNamePattern = /(Panthera tigris(?:\s+jacksoni)?)/g;
    const parts = text.split(scientificNamePattern);
    
    return (
      <ThemedText style={style}>
        {parts.map((part, index) => {
          // Check if this part is a scientific name
          if (scientificNamePattern.test(part)) {
            return (
              <ThemedText
                key={index}
                style={[
                  style,
                  { 
                    fontStyle: 'italic',
                    color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
                  }
                ]}
              >
                {part}
              </ThemedText>
            );
          }
          return part;
        })}
      </ThemedText>
    );
  };

  // 🔥 NEW: Helper function to check if a taxonomy rank should have italic scientific name
  const shouldItalicizeScientificName = (rank) => {
    return rank === 'Species' || rank === 'Subspecies';
  };

  const content = {
    en: {
      heroTitle: "Malayan Tiger:",
      heroDescription: "The Malayan Tiger (Panthera tigris jacksoni) is Malaysia's critically endangered national symbol, with fewer than 150 remaining in the wild. These apex predators maintain healthy forests by controlling prey populations, while their habitats provide clean water and store carbon. Threatened by habitat loss, poaching, and human conflict, their survival depends on immediate conservation action. Everyone in Malaysia can help protect these iconic stripes for future generations.",
      factSheetTitle: "Malayan Tiger (Panthera tigris jacksoni) Fact Sheet:",
      factSheet: [
        { category: 'Scientific Name', value: 'Panthera tigris jacksoni', icon: 'science' },
        { category: 'Conservation Status', value: 'Critically Endangered (IUCN Red List)', icon: 'warning' },
        { category: 'Population', value: 'Fewer than 150 individuals in the wild (2023 estimate)', icon: 'groups' },
        { category: 'Habitat', value: 'Tropical rainforests of Peninsular Malaysia', icon: 'forest' },
        { category: 'Size', value: 'Males: 2.5–2.8 m long, 120–130 kg | Females: ~2.3 m, 80–100 kg', icon: 'straighten' },
        { category: 'Diet', value: 'Carnivorous (deer, wild boar, sun bears, occasionally livestock)', icon: 'restaurant' },
        { category: 'Lifespan', value: '15–20 years in the wild; up to 25 years in captivity', icon: 'schedule' },
        { category: 'Unique Features', value: 'Darker orange coat with black stripes, smallest mainland tiger subspecies', icon: 'star' },
        { category: 'Threats', value: 'Habitat loss, poaching, human-wildlife conflict, roadkill incidents', icon: 'warning' },
        { category: 'Conservation Efforts', value: 'Protected areas, anti-poaching patrols, public awareness campaigns', icon: 'security' },
        { category: 'Ecological Role', value: 'Apex predator; maintains ecosystem balance by controlling prey populations', icon: 'nature' }
      ],
      taxonomicTitle: "Taxonomic Classification of the Malayan Tiger",
      taxonomyCards: [
        { rank: 'Kingdom', scientific: 'Animalia', common: 'Animals', icon: 'pets' },
        { rank: 'Phylum', scientific: 'Chordata', common: 'Vertebrates', icon: 'share' },
        { rank: 'Class', scientific: 'Mammalia', common: 'Mammals', icon: 'baby-changing-station' },
        { rank: 'Order', scientific: 'Carnivora', common: 'Carnivores', icon: 'restaurant' },
        { rank: 'Family', scientific: 'Felidae', common: 'Cats', icon: 'pets' },
        { rank: 'Genus', scientific: 'Panthera', common: 'Big Cats', icon: 'mood' },
        { rank: 'Species', scientific: 'Panthera tigris', common: 'Tiger', icon: 'pets' },
        { rank: 'Subspecies', scientific: 'Panthera tigris jacksoni', common: 'Malayan Tiger', icon: 'star' }
      ]
    },
    ms: {
      heroTitle: "Harimau Malaya:",
      heroDescription: "Harimau Malaya (Panthera tigris jacksoni) adalah simbol kebangsaan Malaysia yang kini berada dalam keadaan kritikal terancam, dengan kurang daripada 150 ekor yang masih tinggal di hutan. Predator puncak ini mengekalkan kesihatan hutan dengan mengawal populasi mangsa, sementara habitat mereka menyediakan air bersih dan menyimpan karbon. Terancam oleh kehilangan habitat, pemburuan haram, dan konflik dengan manusia, kelangsungan hidup mereka bergantung pada tindakan pemuliharaan segera. Setiap rakyat Malaysia boleh membantu melindungi belang ikonik ini untuk generasi akan datang.",
      factSheetTitle: "Borang Fakta Harimau Malaya (Panthera tigris jacksoni):",
      factSheet: [
        { category: 'Nama Saintifik', value: 'Panthera tigris jacksoni', icon: 'science' },
        { category: 'Status Pemuliharaan', value: 'Kritikal Terancam (Senarai Merah IUCN)', icon: 'warning' },
        { category: 'Populasi', value: 'Kurang daripada 150 individu di hutan (anggaran 2023)', icon: 'groups' },
        { category: 'Habitat', value: 'Hutan hujan tropika di Semenanjung Malaysia', icon: 'forest' },
        { category: 'Saiz', value: 'Jantan: 2.5–2.8 m panjang, 120–130 kg | Betina: ~2.3 m, 80–100 kg', icon: 'straighten' },
        { category: 'Diet', value: 'Karnivor (rusa, babi hutan, beruang matahari, kadang-kadang ternakan)', icon: 'restaurant' },
        { category: 'Jangka Hayat', value: '15–20 tahun di hutan; sehingga 25 tahun dalam kurungan', icon: 'schedule' },
        { category: 'Ciri Unik', value: 'Bulu oren gelap dengan belang hitam, subspesies harimau terkecil di tanah besar', icon: 'star' },
        { category: 'Ancaman', value: 'Kehilangan habitat, pemburuan haram, konflik manusia-hidupan liar', icon: 'warning' },
        { category: 'Usaha Pemuliharaan', value: 'Kawasan perlindungan, patroli anti-pemburuan haram, kempen kesedaran', icon: 'security' },
        { category: 'Peranan Ekologi', value: 'Predator puncak; mengekalkan keseimbangan ekosistem', icon: 'nature' }
      ],
      taxonomicTitle: "Klasifikasi Taksonomi Harimau Malaya",
      taxonomyCards: [
        { rank: 'Kingdom', scientific: 'Animalia', common: 'Haiwan', icon: 'pets' },
        { rank: 'Phylum', scientific: 'Chordata', common: 'Vertebrat', icon: 'share' },
        { rank: 'Class', scientific: 'Mammalia', common: 'Mamalia', icon: 'baby-changing-station' },
        { rank: 'Order', scientific: 'Carnivora', common: 'Karnivor', icon: 'restaurant' },
        { rank: 'Family', scientific: 'Felidae', common: 'Kucing', icon: 'pets' },
        { rank: 'Genus', scientific: 'Panthera', common: 'Kucing Besar', icon: 'mood' },
        { rank: 'Species', scientific: 'Panthera tigris', common: 'Harimau', icon: 'pets' },
        { rank: 'Subspecies', scientific: 'Panthera tigris jacksoni', common: 'Harimau Malaya', icon: 'star' }
      ]
    }
  };
  const text = content[currentLanguage];

  const Section = ({ icon, title, children }) => (
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
      {children}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View
        style={[
          styles.hero,
          {
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}
      >
        <View style={styles.heroHeader}>
          <ThemedText style={styles.heroEmoji}>🐅</ThemedText>
          <ThemedText
            style={[
              styles.heroTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {text.heroTitle}
          </ThemedText>
        </View>
        
        {/* 🔥 UPDATED: Hero description with scientific names in italic */}
        {renderTextWithScientificNames(
          text.heroDescription,
          [
            styles.heroDesc,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]
        )}
      </View>

      {/* Fact Sheet */}
      <Section icon="info" title={text.factSheetTitle}>
        {text.factSheet.map(({ icon, category, value }, i) => (
          <View
            key={i}
            style={[
              styles.infoCard,
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
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <ThemedText
                style={[
                  styles.infoTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}
              >
                {category}
              </ThemedText>
              
              {/* 🔥 UPDATED: Fact sheet values with scientific names in italic */}
              {category === 'Scientific Name' || category === 'Nama Saintifik' ? 
                renderTextWithScientificNames(
                  value,
                  [
                    styles.infoValue,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]
                ) : (
                  <ThemedText
                    style={[
                      styles.infoValue,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}
                  >
                    {value}
                  </ThemedText>
                )
              }
            </View>
          </View>
        ))}
      </Section>

      {/* Taxonomy */}
      <Section icon="science" title={text.taxonomicTitle}>
        {text.taxonomyCards.map(({ icon, rank, scientific, common }, i) => (
          <View
            key={i}
            style={[
              styles.infoCard,
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
              size={28}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <ThemedText
                style={[
                  styles.infoTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}
              >
                {rank}
              </ThemedText>
              
              {/* 🔥 UPDATED: Scientific names in italic for Species and Subspecies only */}
              <ThemedText
                style={[
                  styles.infoValue,
                  { 
                    color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
                    fontStyle: shouldItalicizeScientificName(rank) ? 'italic' : 'normal'
                  }
                ]}
              >
                {scientific}
              </ThemedText>
              
              <ThemedText
                style={[
                  styles.infoValue,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}
              >
                {common}
              </ThemedText>
            </View>
          </View>
        ))}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  // Hero
  hero: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  heroHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  heroEmoji: { fontSize: 32, marginRight: 12 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', flex: 1 },
  heroDesc: { fontSize: 16, lineHeight: 24 },

  // Section wrapper
  section: { marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  headerText: { fontSize: 18, fontWeight: '600' },

  // Info cards (fact + taxonomy)
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  infoIcon: { marginRight: 12, marginTop: 2 },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  infoValue: { fontSize: 14, lineHeight: 20 }
});
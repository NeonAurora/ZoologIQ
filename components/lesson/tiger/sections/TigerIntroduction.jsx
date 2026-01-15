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

  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const scientificNamePattern = /(Panthera tigris(?:\s+jacksoni)?)/g;
    const parts = text.split(scientificNamePattern);
    
    return (
      <ThemedText style={style}>
        {parts.map((part, index) => {
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

  const shouldItalicizeScientificName = (rank) => {
    return rank === 'Species' || rank === 'Subspecies';
  };

  const renderTigerScientificName = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const fullSubspeciesPattern = /Panthera tigris jacksoni/g;
    if (fullSubspeciesPattern.test(text)) {
      const parts = text.split(fullSubspeciesPattern);
      
      return (
        <ThemedText style={style}>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <ThemedText>
                  <ThemedText style={[
                    style,
                    { 
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'solid'
                    }
                  ]}>
                    Panthera
                  </ThemedText>
                  <ThemedText style={style}> </ThemedText>
                  <ThemedText style={[
                    style,
                    { 
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'solid'
                    }
                  ]}>
                    tigris
                  </ThemedText>
                  <ThemedText style={[
                    style,
                    { fontStyle: 'italic' }
                  ]}>
                    {' (jacksoni)'}
                  </ThemedText>
                </ThemedText>
              )}
            </React.Fragment>
          ))}
        </ThemedText>
      );
    }
    
    const speciesPattern = /Panthera tigris(?!\s+jacksoni)/g;
    if (speciesPattern.test(text)) {
      const parts = text.split(speciesPattern);
      
      return (
        <ThemedText style={style}>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <ThemedText>
                  <ThemedText style={[
                    style,
                    { 
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'solid'
                    }
                  ]}>
                    Panthera
                  </ThemedText>
                  <ThemedText style={style}> </ThemedText>
                  <ThemedText style={[
                    style,
                    { 
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'solid'
                    }
                  ]}>
                    tigris
                  </ThemedText>
                </ThemedText>
              )}
            </React.Fragment>
          ))}
        </ThemedText>
      );
    }

    return renderTextWithScientificNames(text, style);
  };

  const content = {
    en: {
      heroTitle: "Malayan Tiger",
      heroDescription: "The Malayan tiger (Panthera tigris jacksoni) is Malaysia's critically endangered national symbol, with fewer than 200 individuals remaining in the wild according to Malaysia's National Tiger Survey and related reports (DWNP, 2016-2018), and it is listed as Critically Endangered on the IUCN Red List of Threatened Species (Goodrich et al., 2022). As top predators, Malayan tigers regulate herbivore populations and maintain forest health (Estes et al., 2011). Threatened by habitat loss, poaching, and human conflict, their survival depends on immediate conservation action. Everyone in Malaysia can help protect these iconic stripes for future generations.",
      factSheetTitle: "Malayan Tiger Fact Sheet",
      factSheet: [
        { category: 'Scientific Name', value: 'Panthera tigris jacksoni', icon: 'science' },
        { category: 'Conservation Status', value: 'Critically Endangered (IUCN Red List)', icon: 'warning' },
        { category: 'Habitat', value: 'Tropical rainforests of Peninsular Malaysia', icon: 'forest' },
        { category: 'Size', value: 'Males: 2.5-2.8 m (8-9 ft) long, 120-130 kg (265-290 lbs) | Females: Smaller, ~2.3 m (7.5 ft), 80-100 kg (175-220 lbs)', icon: 'straighten' },
        { category: 'Diet', value: 'Carnivorous (deer, wild boar, sun bears, occasionally livestock)', icon: 'restaurant' },
        { category: 'Lifespan', value: '15-20 years in the wild; up to 25 years in captivity', icon: 'schedule' },
        { category: 'Unique Features', value: 'Darker orange coat with black stripes | Smallest mainland tiger subspecies | Solitary and territorial', icon: 'star' },
        { category: 'Threats', value: 'Habitat loss (deforestation for agriculture/logging) | Poaching (illegal trade for skins, bones) | Human-wildlife conflict | Roadkill incidents', icon: 'warning' },
        { category: 'Conservation Efforts', value: 'Protected areas (e.g., Taman Negara) | Anti-poaching patrols | Public awareness campaigns (e.g., WWF-Malaysia)', icon: 'security' },
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
      heroTitle: "Harimau Malaya",
      heroDescription: "Harimau Malaya (Panthera tigris jacksoni) adalah simbol kebangsaan Malaysia yang sangat terancam, dengan kurang daripada 200 individu yang tinggal di alam liar menurut Tinjauan Harimau Nasional Malaysia dan laporan berkaitan (DWNP, 2016-2018), dan ia disenaraikan sebagai Sangat Terancam dalam Senarai Merah Spesies Terancam IUCN (Goodrich et al., 2022). Sebagai pemangsa puncak, harimau Malaya mengawal populasi herbivor dan mengekalkan kesihatan hutan (Estes et al., 2011). Terancam oleh kehilangan habitat, pemburuan haram, dan konflik manusia, kelangsungan hidup mereka bergantung pada tindakan pemuliharaan segera. Setiap orang di Malaysia boleh membantu melindungi jalur ikonik ini untuk generasi akan datang.",
      factSheetTitle: "Lembaran Fakta Harimau Malaya",
      factSheet: [
        { category: 'Nama Saintifik', value: 'Panthera tigris jacksoni', icon: 'science' },
        { category: 'Status Pemuliharaan', value: 'Sangat Terancam (Senarai Merah IUCN)', icon: 'warning' },
        { category: 'Habitat', value: 'Hutan hujan tropika Semenanjung Malaysia', icon: 'forest' },
        { category: 'Saiz', value: 'Jantan: 2.5-2.8 m (8-9 kaki) panjang, 120-130 kg (265-290 paun) | Betina: Lebih kecil, ~2.3 m (7.5 kaki), 80-100 kg (175-220 paun)', icon: 'straighten' },
        { category: 'Diet', value: 'Karnivor (rusa, babi hutan, beruang matahari, kadang-kadang ternakan)', icon: 'restaurant' },
        { category: 'Jangka Hayat', value: '15-20 tahun di alam liar; sehingga 25 tahun dalam kurungan', icon: 'schedule' },
        { category: 'Ciri Unik', value: 'Bulu oren gelap dengan jalur hitam | Subspesies harimau daratan terkecil | Bersendirian dan wilayah', icon: 'star' },
        { category: 'Ancaman', value: 'Kehilangan habitat (penebangan hutan untuk pertanian/pembalakan) | Pemburuan haram (perdagangan haram untuk kulit, tulang) | Konflik manusia-hidupan liar | Insiden kemalangan jalan raya', icon: 'warning' },
        { category: 'Usaha Pemuliharaan', value: 'Kawasan dilindungi (cth. Taman Negara) | Rondaan anti-pemburuan haram | Kempen kesedaran awam (cth. WWF-Malaysia)', icon: 'security' },
        { category: 'Peranan Ekologi', value: 'Pemangsa puncak; mengekalkan keseimbangan ekosistem dengan mengawal populasi mangsa', icon: 'nature' }
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
        {renderTigerScientificName(
          title,
          [
            styles.headerText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]
        )}
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
        
        {renderTigerScientificName(
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
              
              {(category === 'Scientific Name' || category === 'Nama Saintifik') ? 
                renderTigerScientificName(
                  value,
                  [
                    styles.infoValue,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]
                ) : (
                  renderTextWithScientificNames(
                    value,
                    [
                      styles.infoValue,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]
                  )
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
              
              {shouldItalicizeScientificName(rank) ? 
                renderTigerScientificName(
                  scientific,
                  [
                    styles.infoValue,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]
                ) : (
                  <ThemedText
                    style={[
                      styles.infoValue,
                      { 
                        color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
                        fontStyle: 'normal'
                      }
                    ]}
                  >
                    {scientific}
                  </ThemedText>
                )
              }
                            
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

  section: { marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  headerText: { fontSize: 18, fontWeight: '600' },

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
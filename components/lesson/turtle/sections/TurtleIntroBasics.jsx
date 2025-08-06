// components/lesson/turtle/sections/TurtleIntroBasics.jsx

import React from 'react';
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Lookup for category icons (unchanged)
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'scientific name':
    case 'nama saintifik':           return 'science';
    case 'common name':
    case 'nama biasa':               return 'label';
    case 'habitat':                  return 'forest';
    case 'physical features':
    case 'ciri fizikal':             return 'texture';
    case 'diet':                     return 'restaurant';
    case 'reproduction':
    case 'pembiakan':                return 'egg';
    case 'lifespan':
    case 'jangka hayat':             return 'schedule';
    case 'conservation status':
    case 'status pemuliharaan':      return 'warning';
    default:                         return 'info';
  }
};

export default function TurtleIntroBasics({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { width } = useWindowDimensions();

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    // This will match "Chelonia mydas" and other turtle scientific names
    const scientificNamePattern = /(Chelonia\s+mydas|Chelonia\s+\w+)/g;
    const parts = text.split(scientificNamePattern);
    
    if (parts.length === 1) {
      // No scientific names found, return normal text
      return <ThemedText style={style}>{text}</ThemedText>;
    }
    
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
    return rank === 'Species' || rank === 'Spesies';
  };

  const content = {
    en: {
      heroTitle: 'Meet the Green Sea Turtle (Chelonia mydas):',
      heroBullets: [
        'A gentle giant of the ocean, named for the green fat beneath its shell from a seagrass diet.',
        'Found in warm coastal waters and coral reefs; can grow up to 1 m and weigh 160 kg.',
        'Crucial for ocean health—grazes seagrass/algae, prevents overgrowth, and spreads nutrients via migration.',
        'Lives 60–70 years but endangered by habitat loss, pollution, fishing nets & climate change.',
        'Global conservation efforts—from Malaysia to Costa Rica—are giving them a fighting chance.',
        'You can help: protect beaches, reduce plastic, and support eco‑friendly tourism.'
      ],
      basicInfoTitle: 'Green Sea Turtle (Chelonia mydas) Basic Information:',
      basicInfoData: [
        { category: 'Common Name',         info: 'Green Sea Turtle' },
        { category: 'Scientific Name',     info: 'Chelonia mydas' },
        { category: 'Habitat',             info: 'Warm oceans, coastal areas & coral reefs.' },
        { category: 'Physical Features',   info: 'Smooth greenish shell; up to 160 kg & ~1 m length.' },
        { category: 'Diet',                info: 'Mainly seagrasses and algae.' },
        { category: 'Reproduction',        info: 'Lays 80–120 eggs per clutch on sandy beaches.' },
        { category: 'Lifespan',            info: 'About 60–70 years.' },
        { category: 'Conservation Status', info: 'Endangered (fishing, pollution, habitat loss).' }
      ],
      taxonomyTitle: 'Taxonomic Classification of Green Sea Turtle:',
      taxonomyData: [
        { rank: 'Kingdom', classification: 'Animalia' },
        { rank: 'Phylum',  classification: 'Chordata' },
        { rank: 'Class',   classification: 'Reptilia' },
        { rank: 'Order',   classification: 'Testudines' },
        { rank: 'Family',  classification: 'Cheloniidae' },
        { rank: 'Genus',   classification: 'Chelonia' },
        { rank: 'Species', classification: 'Chelonia mydas' }
      ]
    },
    ms: {
      heroTitle: 'Kenali Penyu Agar (Chelonia mydas):',
      heroBullets: [
        'Gergasi lembut lautan, dinamakan atas lemak hijau di bawah cengkerang hasil diet rumpai laut.',
        'Ditemui di perairan pantai hangat & terumbu karang; boleh mencapai 1 m dan 160 kg.',
        'Pemakan rumpai laut/alga: cegah pertumbuhan berlebihan & sebarkan nutrien melalui migrasi.',
        'Hidup 60–70 tahun tetapi terancam oleh kehilangan habitat, pencemaran, jaring & perubahan iklim.',
        'Usaha pemuliharaan global—dari Malaysia ke Costa Rica—memberi peluang untuk terus hidup.',
        'Anda boleh membantu: lindungi pantai, kurangkan plastik & sokong pelancongan mesra alam.'
      ],
      basicInfoTitle: 'Maklumat Asas Penyu Agar (Chelonia mydas):',
      basicInfoData: [
        { category: 'Nama Biasa',          info: 'Penyu Agar' },
        { category: 'Nama Saintifik',      info: 'Chelonia mydas' },
        { category: 'Habitat',             info: 'Lautan tropika, kawasan pantai & terumbu karang.' },
        { category: 'Ciri Fizikal',        info: 'Cengkerang kehijauan licin; sehingga 160 kg & ~1 m panjang.' },
        { category: 'Diet',                info: 'Terutamanya rumpai laut dan alga.' },
        { category: 'Pembiakan',           info: 'Bertelur 80–120 telur setiap sarang di pantai berpasir.' },
        { category: 'Jangka Hayat',        info: 'Sekitar 60–70 tahun.' },
        { category: 'Status Pemuliharaan', info: 'Terancam (penangkapan ikan, pencemaran, kehilangan habitat).' }
      ],
      taxonomyTitle: 'Klasifikasi Taksonomi Penyu Agar:',
      taxonomyData: [
        { rank: 'Kingdom', classification: 'Animalia' },
        { rank: 'Filum',   classification: 'Chordata' },
        { rank: 'Kelas',   classification: 'Reptilia' },
        { rank: 'Order',   classification: 'Testudines' },
        { rank: 'Famili',  classification: 'Cheloniidae' },
        { rank: 'Genus',   classification: 'Chelonia' },
        { rank: 'Spesies', classification: 'Chelonia mydas' }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero block */}
      <View style={[styles.heroCard, {
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderColor:       isDark ? Colors.dark.border  : Colors.light.border
      }]}>
        <View style={styles.heroHeader}>
          <MaterialIcons
            name="public"
            size={28}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
            style={styles.heroIcon}
          />
          
          {/* 🔥 UPDATED: Hero title with scientific names in italic */}
          {renderTextWithScientificNames(
            text.heroTitle,
            [
              styles.heroTitle,
              {
                color: isDark ? Colors.dark.text : Colors.light.text,
                maxWidth: width - 72
              }
            ]
          )}
        </View>
        {text.heroBullets.map((line, i) => (
          <View key={i} style={styles.bulletRow}>
            <ThemedText style={[styles.bulletSymbol, {
              color: isDark ? Colors.dark.text : Colors.light.text
            }]}>
              •
            </ThemedText>
            
            {/* 🔥 UPDATED: Bullet text with scientific names in italic */}
            {renderTextWithScientificNames(
              line,
              [
                styles.bulletText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]
            )}
          </View>
        ))}
      </View>

      {/* Basic Info cards */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="info"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          
          {/* 🔥 UPDATED: Section title with scientific names in italic */}
          {renderTextWithScientificNames(
            text.basicInfoTitle,
            [
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]
          )}
        </View>
        <View style={styles.cardsGrid}>
          {text.basicInfoData.map((item, idx) => (
            <View key={idx} style={[styles.card, {
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor:       isDark ? Colors.dark.border  : Colors.light.border
            }]}>
              <MaterialIcons
                name={getCategoryIcon(item.category)}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText style={[styles.cardTitle, {
                  color: isDark ? Colors.dark.text : Colors.light.text
                }]}>
                  {item.category}
                </ThemedText>
                
                {/* 🔥 UPDATED: Card descriptions with scientific names in italic */}
                {item.category === 'Scientific Name' || item.category === 'Nama Saintifik' ? 
                  renderTextWithScientificNames(
                    item.info,
                    [
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]
                  ) : (
                    renderTextWithScientificNames(
                      item.info,
                      [
                        styles.cardDescription,
                        { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                      ]
                    )
                  )
                }
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Taxonomy table */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="account-tree"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText style={[styles.sectionTitle, {
            color: isDark ? Colors.dark.text : Colors.light.text
          }]}>
            {text.taxonomyTitle}
          </ThemedText>
        </View>
        <View style={[styles.table, {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor:       isDark ? Colors.dark.border  : Colors.light.border
        }]}>
          {text.taxonomyData.map((row, i) => (
            <View
              key={i}
              style={[styles.tableRow, i < text.taxonomyData.length - 1 && {
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
                borderBottomWidth: 1
              }]}>
              <ThemedText style={[styles.tableCellRank, {
                color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
              }]}>
                {row.rank}
              </ThemedText>
              
              {/* 🔥 UPDATED: Taxonomy classification with conditional italic styling */}
              <ThemedText style={[
                styles.tableCellValue, 
                {
                  color: isDark ? Colors.dark.text : Colors.light.text,
                  fontStyle: shouldItalicizeScientificName(row.rank) ? 'italic' : 'italic' // Keep default italic but enhance species
                }
              ]}>
                {row.classification}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  content:        { padding: 16, paddingBottom: 32 },

  // Hero
  heroCard:       {
    borderRadius:    12,
    borderWidth:     1,
    padding:         16,
    marginBottom:    24,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.1,
    shadowRadius:    4,
    elevation:       3
  },
  heroHeader:     {
    flexDirection:   'row',
    alignItems:      'center',
    marginBottom:    12,
    flexWrap:        'wrap'
  },
  heroIcon:       { marginRight: 12 },
  heroTitle:      {
    fontSize:        20,
    fontWeight:      '600',
    flexShrink:      1,
    lineHeight:      26
  },
  bulletRow:      {
    flexDirection:   'row',
    alignItems:      'flex-start',
    marginBottom:    8,
    flexWrap:        'wrap'
  },
  bulletSymbol:   {
    fontSize:        12,
    lineHeight:      20,
    marginRight:     8
  },
  bulletText:     {
    flex:            1,
    fontSize:        15,
    lineHeight:      22,
    textAlign:       'justify'
  },

  // Sections
  section:        { marginBottom: 24 },
  sectionHeader:  {
    flexDirection:   'row',
    alignItems:      'center',
    gap:             8,
    marginBottom:    12
  },
  sectionTitle:   {
    fontSize:        18,
    fontWeight:      '600'
  },

  // Cards grid
  cardsGrid:      { gap: 12 },
  card:           {
    flexDirection:  'row',
    alignItems:     'flex-start',
    padding:        12,
    borderRadius:   12,
    borderWidth:    1,
    shadowColor:    '#000',
    shadowOffset:   { width: 0, height: 1 },
    shadowOpacity:  0.05,
    shadowRadius:   2,
    elevation:      2
  },
  cardIcon:       { marginRight: 12, marginTop: 4 },
  cardContent:    { flex: 1 },
  cardTitle:      {
    fontSize:        16,
    fontWeight:      '600',
    marginBottom:    4
  },
  cardDescription:{
    fontSize:        14,
    lineHeight:      20,
    textAlign:       'justify'
  },

  // Taxonomy table
  table:          {
    borderRadius:   12,
    borderWidth:    1,
    overflow:       'hidden',
    shadowColor:    '#000',
    shadowOffset:   { width: 0, height: 1 },
    shadowOpacity:  0.05,
    shadowRadius:   2,
    elevation:      2
  },
  tableRow:       {
    flexDirection:  'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems:     'center'
  },
  tableCellRank:  {
    flex:           1,
    fontSize:       14,
    fontWeight:     '600'
  },
  tableCellValue: {
    flex:           1.5,
    fontSize:       14,
    fontStyle:      'italic'
  }
});
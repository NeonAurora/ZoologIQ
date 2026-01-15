// components/lesson/turtle/sections/TurtleIntroBasics.jsx

import React from 'react';
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

  const shouldItalicizeScientificName = (rank) => {
    return rank === 'Species' || rank === 'Spesies';
  };

  const renderTurtleScientificName = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const scientificPattern = /Chelonia mydas/g;
    
    if (!scientificPattern.test(text)) {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    scientificPattern.lastIndex = 0;
    const parts = text.split(scientificPattern);
    
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
                  Chelonia
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
                  mydas
                </ThemedText>
              </ThemedText>
            )}
          </React.Fragment>
        ))}
      </ThemedText>
    );
  };

  const content = {
    en: {
      heroTitle: 'Meet the Green Sea Turtle',
      heroDescription: 'The Green Sea turtle is a gentle giant of the ocean, named not for its shell but for the green fat beneath it, thanks to its seagrass diet! Found in warm coastal waters and coral reefs, this turtle can grow up to 1 meter and weigh as much as 160 kg (USFWS, 2022). These fantastic creatures play a crucial role in maintaining the ocean\'s health. By munching on seagrass and algae, they prevent overgrowth and allow marine ecosystems to thrive. Their long migrations—from feeding spots to nesting beaches—also help spread nutrients across the seas. Green Sea turtles live for 60-70 years, but they face many threats like habitat loss, plastic pollution, fishing nets, and climate change. Despite being endangered, conservation efforts around the world—from Malaysia to Costa Rica—are giving them a fighting chance. By protecting beaches, reducing plastic use, and supporting eco-friendly tourism, we can help save this ancient mariner—and the vibrant world it supports.',
      basicInfoTitle: 'Green Sea Turtle Basic Information',
      basicInfoData: [
        { category: 'Common Name', info: 'Green Sea turtle' },
        { category: 'Scientific Name', info: 'Chelonia mydas' },
        { category: 'Habitat', info: 'Found in warm oceans, coastal areas, and coral reefs.' },
        { category: 'Physical Features', info: 'It has a smooth, greenish shell; adults weigh up to 160 kg and grow ~1 meter.' },
        { category: 'Diet', info: 'Eat mainly seagrasses and algae.' },
        { category: 'Reproduction', info: 'Lays eggs on sandy beaches; each clutch has 80-120 eggs.' },
        { category: 'Lifespan', info: 'Lives about 60-70 years.' },
        { category: 'Conservation Status', info: 'Endangered due to fishing, pollution, and habitat loss.' }
      ],
      taxonomyTitle: 'Taxonomic Classification of Green Sea Turtle',
      taxonomyData: [
        { rank: 'Kingdom', classification: 'Animalia' },
        { rank: 'Phylum', classification: 'Chordata' },
        { rank: 'Class', classification: 'Reptilia' },
        { rank: 'Order', classification: 'Testudines' },
        { rank: 'Family', classification: 'Cheloniidae' },
        { rank: 'Genus', classification: 'Chelonia' },
        { rank: 'Species', classification: 'Chelonia mydas' }
      ]
    },
    ms: {
      heroTitle: 'Kenali Penyu Agar',
      heroDescription: 'Penyu Agar adalah gergasi lembut lautan, dinamakan bukan kerana cengkerangnya tetapi kerana lemak hijau di bawahnya, hasil daripada diet rumpai laut! Ditemui di perairan pantai hangat dan terumbu karang, penyu ini boleh membesar sehingga 1 meter dan seberat 160 kg (USFWS, 2022). Makhluk hebat ini memainkan peranan penting dalam mengekalkan kesihatan lautan. Dengan memakan rumpai laut dan alga, mereka menghalang pertumbuhan berlebihan dan membolehkan ekosistem marin berkembang. Migrasi jarak jauh mereka—dari tempat makan ke pantai bersarang—juga membantu menyebarkan nutrien merentas laut. Penyu Agar hidup selama 60-70 tahun, tetapi mereka menghadapi banyak ancaman seperti kehilangan habitat, pencemaran plastik, jaring ikan, dan perubahan iklim. Walaupun terancam, usaha pemuliharaan di seluruh dunia—dari Malaysia ke Costa Rica—memberi mereka peluang untuk terus hidup. Dengan melindungi pantai, mengurangkan penggunaan plastik, dan menyokong pelancongan mesra alam, kita boleh membantu menyelamatkan pelaut purba ini—dan dunia yang cergas yang disokongnya.',
      basicInfoTitle: 'Maklumat Asas Penyu Agar',
      basicInfoData: [
        { category: 'Nama Biasa', info: 'Penyu Agar' },
        { category: 'Nama Saintifik', info: 'Chelonia mydas' },
        { category: 'Habitat', info: 'Ditemui di lautan hangat, kawasan pantai, dan terumbu karang.' },
        { category: 'Ciri Fizikal', info: 'Mempunyai cengkerang licin kehijauan; dewasa seberat sehingga 160 kg dan membesar ~1 meter.' },
        { category: 'Diet', info: 'Makan terutamanya rumpai laut dan alga.' },
        { category: 'Pembiakan', info: 'Bertelur di pantai berpasir; setiap sarang mengandungi 80-120 telur.' },
        { category: 'Jangka Hayat', info: 'Hidup kira-kira 60-70 tahun.' },
        { category: 'Status Pemuliharaan', info: 'Terancam kerana penangkapan ikan, pencemaran, dan kehilangan habitat.' }
      ],
      taxonomyTitle: 'Klasifikasi Taksonomi Penyu Agar',
      taxonomyData: [
        { rank: 'Kingdom', classification: 'Animalia' },
        { rank: 'Filum', classification: 'Chordata' },
        { rank: 'Kelas', classification: 'Reptilia' },
        { rank: 'Order', classification: 'Testudines' },
        { rank: 'Famili', classification: 'Cheloniidae' },
        { rank: 'Genus', classification: 'Chelonia' },
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
        borderColor: isDark ? Colors.dark.border : Colors.light.border
      }]}>
        <View style={styles.heroHeader}>
          <MaterialIcons
            name="public"
            size={28}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
            style={styles.heroIcon}
          />
          <ThemedText style={[
            styles.heroTitle,
            {
              color: isDark ? Colors.dark.text : Colors.light.text,
              maxWidth: width - 72
            }
          ]}>
            {text.heroTitle}
          </ThemedText>
        </View>
        
        <ThemedText style={[
          styles.heroDescription,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          {text.heroDescription}
        </ThemedText>
      </View>

      {/* Basic Info cards */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="info"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.basicInfoTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.basicInfoData.map((item, idx) => (
            <View key={idx} style={[styles.card, {
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
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
                
                {(item.category === 'Scientific Name' || item.category === 'Nama Saintifik') ? 
                  renderTurtleScientificName(
                    item.info,
                    [
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]
                  ) : (
                    <ThemedText style={[styles.cardDescription, {
                      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
                    }]}>
                      {item.info}
                    </ThemedText>
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
          borderColor: isDark ? Colors.dark.border : Colors.light.border
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
              
              {shouldItalicizeScientificName(row.rank) ? 
                renderTurtleScientificName(
                  row.classification,
                  [
                    styles.tableCellValue,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]
                ) : (
                  <ThemedText style={[
                    styles.tableCellValue, 
                    {
                      color: isDark ? Colors.dark.text : Colors.light.text,
                      fontStyle: 'normal'
                    }
                  ]}>
                    {row.classification}
                  </ThemedText>
                )
              }
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  heroCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap'
  },
  heroIcon: { marginRight: 12 },
  heroTitle: {
    fontSize: 20,
    fontWeight: '600',
    flexShrink: 1,
    lineHeight: 26
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify'
  },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    flexShrink: 1
  },

  cardsGrid: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon: { marginRight: 12, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify'
  },

  table: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  tableCellRank: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600'
  },
  tableCellValue: {
    flex: 1.5,
    fontSize: 14,
  }
});
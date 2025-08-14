// components/lesson/tapir/sections/TapirIntroduction.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Lookup for category icons
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'scientific name':
    case 'nama saintifik':           return 'science';
    case 'common name':
    case 'nama biasa':               return 'label';
    case 'appearance':
    case 'penampilan':               return 'palette';
    case 'habitat':                  return 'forest';
    case 'conservation status':
    case 'status pemuliharaan':      return 'warning';
    case 'ecological role':
    case 'peranan ekologi':          return 'eco';
    case 'diet':                     return 'restaurant';
    case 'lifespan':
    case 'jangka hayat':             return 'schedule';
    case 'behavior':
    case 'tingkah laku':             return 'pets';
    case 'threats':
    case 'ancaman':                  return 'dangerous';
    case 'human-wildlife conflict':
    case 'konflik manusia-hidupan liar': return 'warning';
    case 'conservation efforts':
    case 'usaha pemuliharaan':       return 'security';
    case 'interesting fact':
    case 'fakta menarik':            return 'lightbulb';
    default:                         return 'info';
  }
};

export default function TapirIntroduction({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    // This will match "Tapirus indicus" and other binomial names
    const scientificNamePattern = /(Tapirus\s+indicus|Tapirus\s+\w+)/g;
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

  // 🔥 NEW: Helper function to render species with separate underlines
    const renderSpeciesWithUnderlines = (text, style) => {
      if (!shouldItalicizeScientificName) return <ThemedText style={style}>{text}</ThemedText>;
      
      // Split "Chelonia mydas" into parts
      const parts = text.trim().split(/\s+/);
      
      if (parts.length < 2) {
        // Not a proper species format, return as italic
        return <ThemedText style={[style, { fontStyle: 'italic' }]}>{text}</ThemedText>;
      }
      
      return (
        <ThemedText style={style}>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <ThemedText style={[
                style,
                { 
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid'
                }
              ]}>
                {part}
              </ThemedText>
              {index < parts.length - 1 && ' '}
            </React.Fragment>
          ))}
        </ThemedText>
      );
    };

  const content = {
    en: {
      // Hero
      heroTitle: "Meet the Malayan Tapir: Malaysia's Gentle Forest Guardian:",
      heroDescription:
        "With its striking black-and-white \"panda-like\" coloring and shy personality, the Malayan tapir (Tapirus indicus) is one of Southeast Asia's most unique and ancient mammals. Often called the \"forest gardener\", this elusive creature plays a crucial role in maintaining healthy rainforests by spreading seeds as it roams quietly through the night.",
      criticalStatus:
        "Sadly, fewer than 2,500 individuals remain in the wild, with Malaysia being its stronghold. Habitat destruction, roadkills, and human encroachment are pushing this endangered species closer to extinction every year (Ng et al., 2022; IUCN, 2023).",
      goodNews:
        "But here's the good news: knowing more about the Malayan tapir can help save it. By learning and sharing, you're already part of the solution.",

      // Basic Information cards
      basicInfoTitle: "Basic Information on the Malayan Tapir (Tapirus indicus):",
      basicInfoData: [
        { category: "Scientific Name", info: "Tapirus indicus" },
        { category: "Common Name", info: "Malayan Tapir" },
        {
          category: "Appearance",
          info:
            "Distinctive black and white coloration (black front and back, white midsection).\n\n" +
            "Long, flexible snout (used like a short trunk).\n\n" +
            "Largest among the tapir species."
        },
        {
          category: "Habitat",
          info:
            "Dense tropical rainforests of Peninsular Malaysia, southern Thailand, and Sumatra.\n\n" +
            "Prefers lowland forests near water sources."
        },
        {
          category: "Conservation Status",
          info:
            "Endangered (IUCN Red List)\n\n" +
            "Fewer than 2,500 individuals are estimated in the wild"
        },
        {
          category: "Ecological Role",
          info:
            "Key seed disperser in tropical forests\n\n" +
            "Helps maintain forest regeneration and biodiversity"
        },
        {
          category: "Diet",
          info: "Herbivorous: eats leaves, twigs, fruits, and aquatic plants"
        },
        { category: "Lifespan", info: "About 25–30 years in the wild" },
        {
          category: "Behavior",
          info:
            "Solitary and shy\n\n" +
            "Nocturnal: most active at night\n\n" +
            "Excellent swimmer"
        },
        {
          category: "Threats",
          info:
            "Habitat Loss & Fragmentation: Due to deforestation for agriculture, logging, and infrastructure development\n\n" +
            "Roadkill: Frequently killed while crossing roads and highways\n\n" +
            "Human Encroachment: Development pushes them closer to settlements\n\n" +
            "Poaching: Although less common than with tigers, it is still a threat."
        },
        {
          category: "Human-Wildlife Conflict",
          info:
            "As natural habitats shrink, tapirs wander into human areas, causing unintentional conflicts."
        },
        {
          category: "Conservation Efforts",
          info:
            "Protected under Malaysian law.\n\n" +
            "Conservation programs focus on habitat preservation, road-crossing mitigation, and public education."
        },
        {
          category: "Interesting Fact",
          info:
            "Despite its pig-like body, the tapir is more closely related to horses and rhinoceroses!"
        }
      ],

      // Taxonomy
      taxonomyTitle: "Taxonomic Classification of the Malayan Tapir:",
      taxonomyData: [
        { rank: "Kingdom", classification: "Animalia" },
        { rank: "Phylum", classification: "Chordata" },
        { rank: "Class", classification: "Mammalia" },
        { rank: "Order", classification: "Perissodactyla" },
        { rank: "Family", classification: "Tapiridae" },
        { rank: "Genus", classification: "Tapirus" },
        { rank: "Species", classification: "Tapirus indicus" },
        { rank: "Common Name", classification: "Malayan Tapir" }
      ]
    },
    ms: {
      // Hero (Malay)
      heroTitle:
        "Temuilah Tapir Malaya: Sang Penjaga Hutan Malaysia yang Lembut",
      heroDescription:
        "Dengan warna hitam-putihnya yang mencolok seperti panda dan sifat pemalu, tapir Malaya (Tapirus indicus) adalah salah satu mamalia paling unik dan purba di Asia Tenggara. Sering dijuluki \"tukang kebun hutan\", makhluk misterius ini memainkan peranan penting dalam mengekalkan kesihatan hutan hujan dengan menyebarkan biji benih ketika ia menjelajah sunyi pada waktu malam.",
      criticalStatus:
        "Malangnya, kurang daripada 2,500 ekor tapir Malaya masih tinggal di alam liar, dengan Malaysia menjadi kubu terakhirnya. Kemusnahan habitat, kemalangan jalan raya, dan pencerobohan manusia semakin mendorong spesies terancam ini ke ambang kepupusan setiap tahun (Ng et al., 2022; IUCN, 2023).",
      goodNews:
        "Namun, ada berita baik: memahami tapir Malaya dengan lebih mendalam boleh membantu menyelamatkannya. Dengan belajar dan berkongsi pengetahuan, anda sudah menjadi sebahagian daripada penyelesaian.",

      // Basic Information (Malay)
      basicInfoTitle: "MAKLUMAT ASAS TAPIR MALAYA (Tapirus indicus)",
      basicInfoData: [
        { category: "Nama Saintifik", info: "Tapirus indicus" },
        { category: "Nama Biasa", info: "Tapir Malaya" },
        {
          category: "Penampilan",
          info:
            "Warna hitam-putih tersendiri (bahagian depan & belakang hitam, bahagian tengah putih)\n\n" +
            "Muncung panjang dan fleksibel (digunakan seperti belalai pendek)\n\n" +
            "Spesies tapir terbesar"
        },
        {
          category: "Habitat",
          info:
            "Hutan hujan tropika tebal di Semenanjung Malaysia, selatan Thailand dan Sumatera\n\n" +
            "Lebih gemar hutan tanah rendah berhampiran sumber air"
        },
        {
          category: "Status Pemuliharaan",
          info:
            "Terancam (Senarai Merah IUCN)\n\n" +
            "Dianggarkan kurang daripada 2,500 ekor di alam liar"
        },
        {
          category: "Peranan Ekologi",
          info:
            "Penyebar biji benih utama dalam hutan tropika\n\n" +
            "Membantu mengekalkan pertumbuhan semula hutan dan biodiversiti"
        },
        {
          category: "Diet",
          info: "Herbivor: memakan daun, ranting, buah, dan tumbuhan akuatik"
        },
        { category: "Jangka Hayat", info: "Kira-kira 25–30 tahun di alam liar" },
        {
          category: "Tingkah Laku",
          info:
            "Bersendirian dan pemalu\n\n" +
            "Nokturnal: paling aktif pada waktu malam\n\n" +
            "Perenang yang handal"
        },
        {
          category: "Ancaman",
          info:
            "Kehilangan Habitat & Fragmentasi: Disebabkan pembukaan hutan untuk pertanian, pembalakan dan pembangunan infrastruktur\n\n" +
            "Kemalangan Jalan Raya: Sering terbunuh ketika melintas jalan\n\n" +
            "Pencerobohan Manusia: Pembangunan mendorong mereka lebih dekat ke kawasan penempatan\n\n" +
            "Pemburuan Haram: Walaupun kurang berbanding harimau, ia tetap menjadi ancaman"
        },
        {
          category: "Konflik Manusia-Hidupan Liar",
          info:
            "Apabila habitat semula jadi mengecil, tapir berkeliaran ke kawasan manusia menyebabkan konflik tidak sengaja"
        },
        {
          category: "Usaha Pemuliharaan",
          info:
            "Dilindungi di bawah undang-undang Malaysia\n\n" +
            "Program pemuliharaan memberi tumpuan kepada pemeliharaan habitat, mitigasi lintasan jalan, dan pendidikan awam"
        },
        {
          category: "Fakta Menarik",
          info:
            "Walaupun badannya seperti babi, tapir sebenarnya lebih rapat hubungannya dengan kuda dan badak!"
        }
      ],

      // Taxonomy (Malay)
      taxonomyTitle: "Klasifikasi Taksonomi Tapir Malaya:",
      taxonomyData: [
        { rank: "Kingdom", classification: "Animalia" },
        { rank: "Filum", classification: "Chordata" },
        { rank: "Kelas", classification: "Mammalia" },
        { rank: "Order", classification: "Perissodactyla" },
        { rank: "Keluarga", classification: "Tapiridae" },
        { rank: "Genus", classification: "Tapirus" },
        { rank: "Spesies", classification: "Tapirus indicus" },
        { rank: "Nama Biasa", classification: "Tapir Malaya" }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View
        style={[
          styles.heroCard,
          {
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
        <View style={styles.heroHeader}>
          <ThemedText style={styles.heroEmoji}>🦌</ThemedText>
          <View style={styles.heroTitleContainer}>
            <ThemedText
              style={[
                styles.heroTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
              {text.heroTitle}
            </ThemedText>
          </View>
        </View>
        
        {/* 🔥 UPDATED: Hero description with scientific names in italic */}
        {renderTextWithScientificNames(
          text.heroDescription,
          [
            styles.heroDescription,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]
        )}
        
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: isDark ? '#B71C1C20' : '#FFEBEE',
              borderLeftColor: '#F44336'
            }
          ]}>
          <MaterialIcons name="warning" size={20} color="#F44336" />
          <ThemedText
            style={[
              styles.alertText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
            {text.criticalStatus}
          </ThemedText>
        </View>
        <View
          style={[
            styles.goodNewsBox,
            {
              backgroundColor: isDark ? '#1B5E2020' : '#E8F5E8',
              borderLeftColor: '#4CAF50'
            }
          ]}>
          <MaterialIcons name="lightbulb" size={20} color="#4CAF50" />
          <ThemedText
            style={[
              styles.goodNewsText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
            {text.goodNews}
          </ThemedText>
        </View>
      </View>

      {/* Basic Information Cards */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="biotech"
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
            <View
              key={idx}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}>
              <MaterialIcons
                name={getCategoryIcon(item.category)}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText
                  style={[
                    styles.cardTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                  {item.category}
                </ThemedText>
                
                {/* 🔥 UPDATED: Card descriptions with scientific names in italic */}
                {item.info
                  .split('\n\n')
                  .filter(line => line.trim())
                  .map((line, bIdx) => {
                    const cleanLine = line.replace(/^•\s*/, '');
                    // Special handling for Scientific Name field
                    if (item.category === 'Scientific Name' || item.category === 'Nama Saintifik') {
                      return renderTextWithScientificNames(
                        `• ${cleanLine}`,
                        [
                          styles.cardDescription,
                          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                        ]
                      );
                    } else {
                      return renderTextWithScientificNames(
                        `• ${cleanLine}`,
                        [
                          styles.cardDescription,
                          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                        ]
                      );
                    }
                  })}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Taxonomic Classification */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="account-tree"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
            {text.taxonomyTitle}
          </ThemedText>
        </View>
        <View
          style={[
            styles.taxonomyTable,
            {
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
          {text.taxonomyData.map((tax, tIdx) => (
            <View
              key={tIdx}
              style={[
                styles.taxonomyRow,
                tIdx !== text.taxonomyData.length - 1 && {
                  borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
                  borderBottomWidth: 1
                }
              ]}>
              <ThemedText
                style={[
                  styles.taxonomyRank,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                {tax.rank}
              </ThemedText>
              
              {/* 🔥 UPDATED: Taxonomy classification with conditional italic styling */}
              {shouldItalicizeScientificName(tax.rank) ? 
                renderSpeciesWithUnderlines(
                  tax.classification,
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
                    {tax.classification}
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

  // Hero styles
  heroCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  heroHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  heroEmoji: { fontSize: 32, marginRight: 16 },
  heroTitleContainer: { flex: 1 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  heroDescription: { fontSize: 16, lineHeight: 24, marginBottom: 16 },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 12
  },
  alertText: { fontSize: 14, lineHeight: 20, marginLeft: 8, flex: 1 },
  goodNewsBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4
  },
  goodNewsText: { fontSize: 14, lineHeight: 20, marginLeft: 8, flex: 1 },

  // Section styles
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },

  // CardsGrid & Card
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
  cardIcon: { marginRight: 16, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20, marginBottom: 4 },

  // Taxonomy styles
  taxonomyTable: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  taxonomyRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  taxonomyRank: { fontSize: 13, fontWeight: '600', flex: 1 },
  taxonomyName: { fontSize: 13, flex: 1.5 }
});
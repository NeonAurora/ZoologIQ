// components/lesson/tapir/sections/TapirConservation.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Icon lookup for biodiversity aspects
const getBiodiversityIcon = (aspect) => {
  switch (aspect.toLowerCase()) {
    case 'seed dispersal':
    case 'penyebaran benih':       return 'eco';
    case 'forest ecosystem health':
    case 'kesihatan ekosistem hutan':    return 'forest';
    case 'keystone herbivore':
    case 'herbivor utama':              return 'stars';
    case 'biodiversity indicator':
    case 'penunjuk kepelbagaian biologi': return 'analytics';
    case 'supports other wildlife':
    case 'menyokong hidupan liar lain':  return 'pets';
    case 'cultural & ecotourism value':
    case 'nilai budaya & ekopelancongan': return 'photo-camera';
    default:                             return 'nature';
  }
};

// Icon lookup for "Why Tapirs Matter" facts
const getFactIcon = (index) => {
  const icons = ['emoji-nature', 'water', 'child-care', 'nightlight', 'warning', 'park'];
  return icons[index % icons.length];
};

// Icon lookup for threats
const getThreatIcon = (threat) => {
  if (/habitat loss|kehilangan habitat/i.test(threat))    return 'forest';
  if (/roadkill|kemalangan/i.test(threat))                return 'traffic';
  if (/poaching|pemburuan/i.test(threat))                 return 'dangerous';
  if (/conflict|konflik/i.test(threat))                   return 'home';
  return 'warning';
};

export default function TapirConservation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const scientificNamePattern = /(Tapirus\s+indicus|Tapirus\s+\w+)/g;
    const parts = text.split(scientificNamePattern);
    
    if (parts.length === 1) {
      return <ThemedText style={style}>{text}</ThemedText>;
    }
    
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

  const content = {
    en: {
      // ==================== BIODIVERSITY ROLE SECTION (EN) ====================
      biodiversityTitle: "Malayan Tapir's Role in Biodiversity",
      biodiversityData: [
        { 
          aspect: "Seed Dispersal", 
          description: "Malayan tapirs play a vital role as seed dispersers. By eating fruits and defecating in different areas, they help new plants grow, maintaining forest diversity and regeneration." 
        },
        { 
          aspect: "Forest Ecosystem Health", 
          description: "Tapirs contribute to the natural cycling of nutrients and vegetation structure by browsing on plants, which can reduce overgrowth and promote diverse plant communities." 
        },
        { 
          aspect: "Keystone Herbivore", 
          description: "As a keystone species, their feeding behavior influences which plants dominate, helping maintain balance in the forest ecosystem." 
        },
        { 
          aspect: "Biodiversity Indicator", 
          description: "The presence of healthy tapir populations often indicates a well-functioning ecosystem, since they require significant, undisturbed habitats." 
        },
        { 
          aspect: "Supports Other Wildlife", 
          description: "By opening forest paths and maintaining diverse plant life, tapirs indirectly benefit other species, such as birds, insects, and smaller mammals." 
        },
        { 
          aspect: "Cultural & Ecotourism Value", 
          description: "Their unique appearance makes them a flagship species for conservation and ecotourism, helping raise awareness and funding for biodiversity protection." 
        }
      ],

      // ==================== FACTS ABOUT MALAYAN TAPIR (EN) ====================
      whyMattersTitle: "Facts About the Malayan Tapir",
      whyMattersData: [
        "They are the largest of all tapir species and are the only tapir found in Asia.",
        "Their nose and upper lip form a short trunk (a proboscis) that they use to grab leaves and fruits or as a snorkel when swimming.",
        "Baby Malayan tapirs are brown with white stripes and spots, looking like little watermelons, and they only get the black-and-white pattern as they grow up.",
        "They are primarily active at night (nocturnal) and spend the day resting in dense vegetation near water.",
        "Malayan tapirs are listed as Endangered, with only a few thousand left in the wild because of habitat loss and roadkill."
      ],

      // ==================== THREATS SECTION (EN) ====================
      threatsTitle: "Threats to the Malayan Tapir",
      threatsData: [
        {
          threat: "Habitat Loss",
          description: "Forests within the Malayan tapir's range are being cleared and fragmented for palm oil and other agriculture, as well as the expansion of road networks and other development, leading to the loss and degradation of much of this species' habitat (Traeholt et al., 2016)."
        },
        {
          threat: "Roadkill",
          description: "Malayan tapirs are largely nocturnal and must cross roads to move between fragmented forest areas, leading to the deaths of several individuals by vehicles on Malaysian highways, with the majority of recorded collisions occurring at night (Maginton et al., 2021; Shabbudin et al., 2025)."
        },
        {
          threat: "Poaching",
          description: "Although Malayan tapirs are not targeted as intensively as high-value species like tigers, they are still taken in some areas for meat and hides, and occasionally killed or caught in snares set for other animals (Shwe et al., 2012; Campbell et al., 2019)."
        },
        {
          threat: "Human Conflict",
          description: "Where forests have been cleared or fragmented for farms and settlements, tapirs are increasingly being recorded near farms and villages, and displaced animals that attack crops or enter communities are sometimes injured or killed in the resulting conflicts (Fifth International Tapir Symposium, 2011)."
        }
      ]
    },

    ms: {
      // ==================== BIODIVERSITY ROLE SECTION (MS) ====================
      biodiversityTitle: "Peranan Tapir Malaya dalam Kepelbagaian Biologi",
      biodiversityData: [
        { 
          aspect: "Penyebaran Benih", 
          description: "Tapir Malaya memainkan peranan penting sebagai penyebar benih. Dengan memakan buah-buahan dan membuang najis di kawasan yang berbeza, mereka membantu pertumbuhan tumbuhan baru, mengekalkan kepelbagaian dan pertumbuhan semula hutan." 
        },
        { 
          aspect: "Kesihatan Ekosistem Hutan", 
          description: "Tapir menyumbang kepada kitaran semula jadi nutrien dan struktur vegetasi dengan memakan tumbuhan, yang boleh mengurangkan pertumbuhan berlebihan dan menggalakkan komuniti tumbuhan yang pelbagai." 
        },
        { 
          aspect: "Herbivor Utama", 
          description: "Sebagai spesies utama, tingkah laku pemakanan mereka mempengaruhi tumbuhan mana yang dominan, membantu mengekalkan keseimbangan dalam ekosistem hutan." 
        },
        { 
          aspect: "Penunjuk Kepelbagaian Biologi", 
          description: "Kehadiran populasi tapir yang sihat sering menunjukkan ekosistem yang berfungsi dengan baik, kerana mereka memerlukan habitat yang luas dan tidak terganggu." 
        },
        { 
          aspect: "Menyokong Hidupan Liar Lain", 
          description: "Dengan membuka laluan hutan dan mengekalkan kehidupan tumbuhan yang pelbagai, tapir secara tidak langsung memberi manfaat kepada spesies lain, seperti burung, serangga, dan mamalia yang lebih kecil." 
        },
        { 
          aspect: "Nilai Budaya & Ekopelancongan", 
          description: "Penampilan unik mereka menjadikan mereka spesies utama untuk pemuliharaan dan ekopelancongan, membantu meningkatkan kesedaran dan pembiayaan untuk perlindungan kepelbagaian biologi." 
        }
      ],

      // ==================== FACTS ABOUT MALAYAN TAPIR (MS) ====================
      whyMattersTitle: "Fakta Mengenai Tapir Malaya",
      whyMattersData: [
        "Mereka adalah yang terbesar antara semua spesies tapir dan merupakan satu-satunya tapir yang ditemui di Asia.",
        "Hidung dan bibir atas mereka membentuk belalai pendek (probosis) yang mereka gunakan untuk menggenggam daun dan buah-buahan atau sebagai snorkel semasa berenang.",
        "Anak tapir Malaya berwarna coklat dengan jalur dan bintik putih, kelihatan seperti tembikai kecil, dan mereka hanya mendapat corak hitam-putih apabila membesar.",
        "Mereka terutamanya aktif pada waktu malam (nokturnal) dan menghabiskan siang hari berehat dalam vegetasi tebal berhampiran air.",
        "Tapir Malaya disenaraikan sebagai Terancam, dengan hanya beberapa ribu yang tinggal di alam liar kerana kehilangan habitat dan kemalangan jalan raya."
      ],

      // ==================== THREATS SECTION (MS) ====================
      threatsTitle: "Ancaman terhadap Tapir Malaya",
      threatsData: [
        {
          threat: "Kehilangan Habitat",
          description: "Hutan dalam julat tapir Malaya sedang ditebang dan dipecah-pecahkan untuk minyak sawit dan pertanian lain, serta pengembangan rangkaian jalan dan pembangunan lain, membawa kepada kehilangan dan kemerosotan sebahagian besar habitat spesies ini (Traeholt et al., 2016)."
        },
        {
          threat: "Kemalangan Jalan Raya",
          description: "Tapir Malaya sebahagian besarnya nokturnal dan mesti melintas jalan untuk bergerak antara kawasan hutan yang berpecah-belah, menyebabkan kematian beberapa individu oleh kenderaan di lebuh raya Malaysia, dengan majoriti perlanggaran yang direkodkan berlaku pada waktu malam (Maginton et al., 2021; Shabbudin et al., 2025)."
        },
        {
          threat: "Pemburuan Haram",
          description: "Walaupun tapir Malaya tidak disasarkan seintensif spesies bernilai tinggi seperti harimau, mereka masih ditangkap di sesetengah kawasan untuk daging dan kulit, dan kadang-kadang dibunuh atau terperangkap dalam jerat yang dipasang untuk haiwan lain (Shwe et al., 2012; Campbell et al., 2019)."
        },
        {
          threat: "Konflik Manusia",
          description: "Di mana hutan telah ditebang atau dipecah-pecahkan untuk ladang dan penempatan, tapir semakin direkodkan berhampiran ladang dan kampung, dan haiwan yang dipindahkan yang menyerang tanaman atau memasuki komuniti kadang-kadang cedera atau dibunuh dalam konflik yang terhasil (Fifth International Tapir Symposium, 2011)."
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Role in Biodiversity as cards */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="eco" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.biodiversityTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.biodiversityData.map((item, i) => (
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
                name={getBiodiversityIcon(item.aspect)}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  {item.aspect}
                </ThemedText>
                {renderTextWithScientificNames(
                  item.description,
                  [styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Facts About the Malayan Tapir */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="info" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.whyMattersTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.whyMattersData.map((fact, i) => (
            <View
              key={i}
              style={[
                styles.factCard,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}>
              <MaterialIcons
                name={getFactIcon(i)}
                size={20}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.factIcon}
              />
              {renderTextWithScientificNames(
                fact,
                [styles.factText, { color: isDark ? Colors.dark.text : Colors.light.text }]
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Threats to the Malayan Tapir */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="warning" size={20} color="#F44336" />
          {renderTextWithScientificNames(
            text.threatsTitle,
            [styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]
          )}
        </View>
        <View style={styles.cardsGrid}>
          {text.threatsData.map((item, i) => (
            <View
              key={i}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderLeftColor: '#F44336',
                  borderColor: isDark ? Colors.dark.border : Colors.light.border,
                  borderLeftWidth: 4
                }
              ]}>
              <MaterialIcons
                name={getThreatIcon(item.threat)}
                size={24}
                color="#F44336"
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  {item.threat}
                </ThemedText>
                {renderTextWithScientificNames(
                  item.description,
                  [styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]
                )}
              </View>
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

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
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
  cardIcon: { marginRight: 16, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20 },

  factCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  factIcon: { marginRight: 12, marginTop: 2 },
  factText: { fontSize: 14, lineHeight: 20, flex: 1 }
});
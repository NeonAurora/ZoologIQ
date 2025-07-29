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
    case 'penyebaran bijih benih':       return 'eco';
    case 'forest ecosystem health':
    case 'kesihatan ekosistem hutan':    return 'forest';
    case 'keystone herbivore':
    case 'herbivor kunci':              return 'key';
    case 'biodiversity indicator':
    case 'petunjuk kepelbagaian biologi': return 'analytics';
    case 'supports other wildlife':
    case 'menyokong hidupan liar lain':  return 'pets';
    case 'cultural & ecotourism value':
    case 'nilai budaya & eko-pelancongan': return 'photo-camera';
    default:                             return 'nature';
  }
};

// Icon lookup for "Why Tapirs Matter"
const getImportanceIcon = (title) => {
  switch (title.toLowerCase()) {
    case 'forest gardener':
    case 'tukang kebun hutan':         return 'local-florist';
    case 'balances nature':
    case 'penyeimbang alam':           return 'balance';
    case 'sign of a healthy forest':
    case 'petanda hutan sihat':        return 'health-and-safety';
    case 'ancient and unique':
    case 'purba dan unik':             return 'history';
    case 'threatened by humans':
    case 'terancam oleh manusia':      return 'warning';
    case 'cultural icon':
    case 'ikon budaya':                return 'museum';
    case 'boosts ecotourism':
    case 'meningkatkan eko-pelancongan': return 'travel-explore';
    case 'inspires conservation':
    case 'inspirasi pemuliharaan':     return 'favorite';
    default:                           return 'star';
  }
};

// Icon lookup for threats
const getThreatIcon = (threat) => {
  if (/habitat loss/i.test(threat))           return 'forest';
  if (/roadkill/i.test(threat))                return 'traffic';
  if (/fragment/i.test(threat))                return 'call-split';
  if (/poaching/i.test(threat))                return 'gps-off';
  if (/conflict/i.test(threat))                return 'home';
  if (/ignorance/i.test(threat))               return 'help-outline';
  if (/climate change/i.test(threat))          return 'thermostat';
  if (/weak laws/i.test(threat))               return 'gavel';
  return 'dangerous';
};

export default function TapirConservation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      biodiversityTitle: "Malayan Tapir's Role in Biodiversity:",
      biodiversityData: [
        { aspect: "Seed Dispersal",          description: "Malayan tapirs play a vital role as seed dispersers. By eating fruits and defecating in different areas, they help new plants grow, maintaining forest diversity and regeneration." },
        { aspect: "Forest Ecosystem Health", description: "Tapirs contribute to nutrient cycling and vegetation structure by browsing, reducing overgrowth and promoting diverse plant communities." },
        { aspect: "Keystone Herbivore",      description: "As a keystone species, their feeding influences plant dominance, maintaining balance in the forest." },
        { aspect: "Biodiversity Indicator",  description: "Healthy tapir populations indicate well-functioning, undisturbed habitats." },
        { aspect: "Supports Other Wildlife", description: "By opening forest paths and maintaining plant diversity, they benefit birds, insects, and mammals." },
        { aspect: "Cultural & Ecotourism Value", description: "Their unique look makes them flagship species, raising awareness and funding for conservation." }
      ],
      whyMattersTitle: "Why the Malayan Tapir Matters:",
      whyMattersData: [
        { title: "Forest Gardener",           description: "Tapirs eat fruits and spread seeds through their droppings, fostering forest regeneration." },
        { title: "Balances Nature",           description: "By browsing, they prevent overgrowth and maintain ecosystem health." },
        { title: "Sign of a Healthy Forest",  description: "Thriving tapir populations signal intact, biodiverse forests." },
        { title: "Ancient and Unique",        description: "As Asia’s only tapir, protecting them preserves a distinct evolutionary lineage." },
        { title: "Threatened by Humans",      description: "Deforestation, roads, and hunting endanger their survival; urgent action is needed." },
        { title: "Cultural Icon",             description: "In Malaysia, they symbolize conservation and appear in public education." },
        { title: "Boosts Ecotourism",         description: "Their rarity attracts tourists, supporting local economies." },
        { title: "Inspires Conservation",     description: "Their gentle nature helps raise awareness for endangered wildlife." }
      ],
      threatsTitle: "Threats to the Malayan Tapir (Tapirus indicus):",
      threatsData: [
        { threat: "Habitat Loss",          description: "Forests cleared for plantations and infrastructure destroy tapir habitats." },
        { threat: "Roadkill",              description: "Tapirs crossing roads at night are frequently struck by vehicles." },
        { threat: "Fragmented Forests",    description: "Isolated patches prevent breeding and reduce genetic diversity." },
        { threat: "Poaching",              description: "Though less targeted than tigers, tapirs are still illegally killed." },
        { threat: "Human Conflict",        description: "Expansion of farms and settlements leads to dangerous encounters." },
        { threat: "Ignorance",             description: "Lack of public awareness limits support for their protection." },
        { threat: "Climate Change",        description: "Droughts and extreme weather threaten their food and water sources." },
        { threat: "Weak Laws",             description: "Insufficient enforcement allows illegal logging and low penalties." }
      ]
    },
    ms: {
      biodiversityTitle: "Peranan Tapir Malaya dalam Kepelbagaian Biologi:",
      biodiversityData: [
        { aspect: "Penyebaran Bijih Benih",          description: "Tapir Malaya membantu penyebaran bijih benih, menyokong pertumbuhan tumbuhan baru dan regenerasi hutan." },
        { aspect: "Kesihatan Ekosistem Hutan",       description: "Melalui aktiviti makan, tapir menyumbang kepada kitaran nutrien dan struktur tumbuhan, mengawal pertumbuhan berlebihan." },
        { aspect: "Herbivor Kunci",                  description: "Sebagai spesies kunci, tingkah laku pemakanan mereka mempengaruhi dominasi tumbuhan." },
        { aspect: "Petunjuk Biodiversiti",           description: "Populasi tapir yang sihat menunjukkan habitat yang terpelihara." },
        { aspect: "Menyokong Hidupan Liar Lain",      description: "Dengan membuka laluan dan mengekalkan kepelbagaian tumbuhan, mereka membantu spesies lain." },
        { aspect: "Nilai Budaya & Eko-pelancongan",  description: "Penampilan unik mereka menarik minat pelancong dan sokongan pembiayaan pemuliharaan." }
      ],
      whyMattersTitle: "Mengapa Tapir Malaya Penting:",
      whyMattersData: [
        { title: "Tukang Kebun Hutan",         description: "Memakan buah dan menyebar bijih benih melalui najis, membantu pertumbuhan hutan." },
        { title: "Penyeimbang Alam",           description: "Aktiviti makan mereka mengawal pertumbuhan tumbuhan berlebihan." },
        { title: "Petanda Hutan Sihat",        description: "Populasi tapir yang berkembang menandakan habitat terpelihara." },
        { title: "Purba dan Unik",             description: "Spesies tapir Asia satu-satunya; melindungi mereka mengekalkan evolusi unik." },
        { title: "Terancam oleh Manusia",      description: "Pembalakan, jalan raya, dan pemburuan mengancam kelangsungan mereka." },
        { title: "Ikon Budaya",                description: "Simbol pemuliharaan dalam kempen pendidikan awam." },
        { title: "Meningkatkan Eko-pelancongan", description: "Menarik pelancong, menyokong ekonomi tempatan." },
        { title: "Inspirasi Pemuliharaan",     description: "Sifat lemah lembut mendorong kesedaran tentang spesies terancam." }
      ],
      threatsTitle: "Ancaman terhadap Tapir Malaya:",
      threatsData: [
        { threat: "Kehilangan Habitat",      description: "Penebangan hutan untuk pertanian dan infrastruktur merosakkan habitat tapir." },
        { threat: "Kemalangan Jalan Raya",   description: "Tapir yang melintas pada waktu malam sering dilanggar kenderaan." },
        { threat: "Hutan Terfragmentasi",    description: "Pecahan habitat menyukarkan pembiakan dan mengurangkan kepelbagaian genetik." },
        { threat: "Pemburuan Haram",         description: "Walaupun kurang diburu, tapir masih disasarkan untuk daging." },
        { threat: "Konflik dengan Manusia",  description: "Pertanian dan penempatan menyebabkan pertembungan berbahaya." },
        { threat: "Kurang Kesedaran",        description: "Ketiadaan maklumat menghalang sokongan untuk pemuliharaan." },
        { threat: "Perubahan Iklim",         description: "Kemarau dan cuaca ekstrem menjejaskan sumber makanan dan air." },
        { threat: "Undang-undang Lemah",     description: "Penguatkuasaan longgar membenarkan pembalakan haram." }
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
                <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  {item.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Why the Malayan Tapir Matters */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="star" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.whyMattersTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.whyMattersData.map((item, i) => (
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
                name={getImportanceIcon(item.title)}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  {item.title}
                </ThemedText>
                <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  {item.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Threats to the Malayan Tapir */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="warning" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.threatsTitle}
          </ThemedText>
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
                  {item.threat.replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}]/u, '').trim()}
                </ThemedText>
                <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  {item.description}
                </ThemedText>
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
  cardDescription: { fontSize: 14, lineHeight: 20, marginBottom: 0 }
});

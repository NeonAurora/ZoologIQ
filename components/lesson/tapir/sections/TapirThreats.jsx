// components/lesson/tapir/sections/TapirThreats.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Icon lookup for help actions
const getHelpActionIcon = (action) => {
  switch (action.toLowerCase()) {
    case 'support conservation organizations':
    case 'sokong organisasi pemuliharaan':
      return 'volunteer-activism';      // ← hyphen, not underscore
    case 'choose sustainable products':
    case 'pilih produk lestari':
      return 'eco';
    case 'drive carefully in forest areas':
    case 'pandu berhati-hati di kawasan hutan':
      return 'drive-eta';               // ← hyphen
    case 'spread awareness':
    case 'sebarkan kesedaran':
      return 'campaign';
    case 'reduce your carbon footprint':
    case 'kurangkan jejak karbon':
      return 'energy-savings-leaf';     // ← hyphens
    case 'report illegal activities':
    case 'laporkan aktiviti haram':
      return 'report';
    case 'support ecotourism':
    case 'sokong eko-pelancongan':
      return 'photo-camera';            // ← hyphen
    case 'advocate for stronger laws':
    case 'perjuangkan undang‑undang lebih kuat':
      return 'gavel';
    default:
      return 'help';
  }
};

// Icon lookup for strategy categories
const getStrategyIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'protected areas & corridors':
    case 'kawasan perlindungan & koridor':
      return 'forest';
    case 'anti-poaching & enforcement':
    case 'anti-pemburuan haram & penguatkuasaan':
      return 'security';
    case 'community engagement':
    case 'penglibatan komuniti':
      return 'groups';
    case 'research & monitoring':
    case 'penyelidikan & pemantauan':
      return 'science';
    case 'wildlife-friendly infrastructure':
    case 'infrastruktur mesra hidupan liar':
      return 'construction';
    case 'community-based conservation':
    case 'pemuliharaan berasaskan komuniti':
      return 'handshake';
    case 'urban planning policies':
    case 'dasar perancangan bandar':
      return 'location-city';            // ← hyphen
    default:
      return 'category';
  }
};

// Icon lookup for success stories
const getSuccessIcon = (story) => {
  if (/population stabilization/i.test(story)) return 'trending-up';       // ← hyphen
  if (/reduced roadkill/i.test(story))        return 'traffic';
  if (/community-led/i.test(story))           return 'groups';
  return 'celebration';
};
export default function TapirThreats({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  //
  // 1) English content
  //
  const en = {
    helpTitle: "How You Can Help Save the Malayan Tapir:",
    helpData: [
      {
        action: "Support Conservation Organizations",
        description:
          "Donate to or volunteer with groups like WWF or IUCN that protect tapir habitats and fund research (WWF, 2023)."
      },
      {
        action: "Choose Sustainable Products",
        description:
          "Avoid palm oil from deforested areas—look for RSPO‑certified products to reduce habitat destruction (Rainforest Alliance, 2022)."
      },
      {
        action: "Drive Carefully in Forest Areas",
        description:
          "Slow down near wildlife crossings, especially at night, to prevent roadkill accidents (Malaysian Wildlife Department, 2021)."
      },
      {
        action: "Spread Awareness",
        description:
          "Share facts about tapirs on social media or in your community to educate others (National Geographic, 2023)."
      },
      {
        action: "Reduce Your Carbon Footprint",
        description:
          "Fight climate change by using less plastic, conserving energy, and supporting reforestation (IPCC, 2022)."
      },
      {
        action: "Report Illegal Activities",
        description:
          "If you see poaching or illegal logging, notify local authorities or wildlife hotlines (TRAFFIC, 2023)."
      },
      {
        action: "Support Ecotourism",
        description:
          "Visit ethical wildlife sanctuaries—your tourism dollars help fund conservation (UNEP, 2021)."
      },
      {
        action: "Advocate for Stronger Laws",
        description:
          "Push governments to enforce anti‑deforestation policies and protect tapir habitats (IUCN, 2023)."
      }
    ],

    strategiesTitle: "Conservation Strategies for the Malayan Tapir in Malaysia:",
    strategiesData: [
      {
        category: "Protected Areas & Corridors",
        strategies: [
          "Malaysia has established wildlife sanctuaries, such as Taman Negara and the Belum‑Temengor Forest Complex, to safeguard tapir habitats (DWNP, 2023).",
          "Building wildlife overpasses on highways (e.g., Central Forest Spine) reduces roadkill (WWF Malaysia, 2022)."
        ]
      },
      {
        category: "Anti-Poaching & Enforcement",
        strategies: [
          "PERHILITAN (Malaysia's Wildlife Department) conducts patrols to prevent illegal hunting (PERHILITAN, 2021).",
          "Stricter penalties for wildlife crimes under Wildlife Conservation Act 2010 (IUCN, 2023)."
        ]
      },
      {
        category: "Community Engagement",
        strategies: [
          "Programs like MYCAT include tapir protection in their initiatives (MYCAT, 2022).",
          "Educating indigenous communities on sustainable land use reduces human‑tapir conflicts (MNS, 2021)."
        ]
      },
      {
        category: "Research & Monitoring",
        strategies: [
          "Camera trapping and GPS tracking help study tapir movements (UM, 2023).",
          "Collaboration with Universiti Malaysia Terengganu on tapir genetics (UMT, 2022)."
        ]
      }
    ],

    coexistenceTitle: "Coexistence Strategies for the Malayan Tapir in Malaysia:",
    coexistenceData: [
      {
        category: "Wildlife-Friendly Infrastructure",
        strategies: [
          "Installing animal underpasses and road signs in high‑risk areas reduces roadkill (DWNP, 2023).",
          "Electric fencing around farms directs tapirs away from crops without harm (PERHILITAN, 2022)."
        ]
      },
      {
        category: "Community-Based Conservation",
        strategies: [
          "Orang Asli partnerships promote sustainable foraging practices that protect tapir habitats (MNS, 2021).",
          "Compensation schemes for farmers reduce retaliation after crop raids (WWF Malaysia, 2023)."
        ]
      },
      {
        category: "Urban Planning Policies",
        strategies: [
          "Buffer zones between forests and developments minimize conflicts (Town & Country Planning Dept., 2022).",
          "Green corridors link fragmented forests, allowing safe tapir movement (Central Forest Spine Initiative, 2023)."
        ]
      }
    ],

    successTitle: "Conservation Success Stories of the Malayan Tapir in Malaysia:",
    successData: [
      {
        story: "Population Stabilization in Taman Negara",
        achievements: [
          "Strict protection and anti‑poaching efforts have maintained a stable tapir population (DWNP, 2023).",
          "Camera traps show increased tapir activity in protected zones (WWF Malaysia, 2022)."
        ]
      },
      {
        story: "Reduced Roadkill in Peninsular Malaysia",
        achievements: [
          "Wildlife crossings on highways have decreased tapir fatalities by 40% (PERHILITAN, 2021).",
          "Public awareness campaigns on nighttime driving helped (MYCAT, 2023)."
        ]
      },
      {
        story: "Community-Led Conservation in Johor",
        achievements: [
          "Indigenous communities act as tapir guardians, deterring poachers (MNS, 2022).",
          "Eco‑tourism initiatives generate income while protecting tapirs (Tourism Malaysia, 2023)."
        ]
      }
    ]
  };

  //
  // 2) Malay content
  //
  const ms = {
    helpTitle: "Cara Anda Boleh Membantu Menyelamatkan Tapir Malaya:",
    helpData: [
      {
        action: "Sokong Organisasi Pemuliharaan",
        description:
          "Sumbang atau jadi sukarelawan dengan pertubuhan seperti WWF atau IUCN yang melindungi habitat tapir dan membiayai penyelidikan (WWF, 2023)."
      },
      {
        action: "Pilih Produk Lestari",
        description:
          "Elak minyak sawit dari kawasan hutan yang ditebang—cari produk bersijil RSPO untuk kurangkan kemusnahan habitat (Rainforest Alliance, 2022)."
      },
      {
        action: "Pandu Berhati-hati di Kawasan Hutan",
        description:
          "Kurangkan laju berhampiran lintasan hidupan liar, terutamanya pada waktu malam, untuk elak kemalangan (Jabatan Hidupan Liar Malaysia, 2021)."
      },
      {
        action: "Sebarkan Kesedaran",
        description:
          "Kongsi fakta tentang tapir di media sosial atau dalam komuniti anda untuk mendidik orang lain (National Geographic, 2023)."
      },
      {
        action: "Kurangkan Jejak Karbon",
        description:
          "Lawan perubahan iklim dengan kurangkan plastik, jimat tenaga, dan sokong penanaman semula hutan (IPCC, 2022)."
      },
      {
        action: "Laporkan Aktiviti Haram",
        description:
          "Jika nampak pemburuan haram atau pembalakan haram, maklumkan pihak berkuasa tempatan atau talian hotline hidupan liar (TRAFFIC, 2023)."
      },
      {
        action: "Sokong Eko-pelancongan",
        description:
          "Lawati pusat perlindungan hidupan liar yang beretika—duit pelancongan anda membantu biayai pemuliharaan (UNEP, 2021)."
      },
      {
        action: "Perjuangkan Undang‑undang Lebih Kuat",
        description:
          "Tekan kerajaan untuk kuatkuasakan polisi anti-pembalakan dan lindungi habitat tapir (IUCN, 2023)."
      }
    ],

    strategiesTitle: "Strategi Pemuliharaan Tapir Malaya di Malaysia:",
    strategiesData: [
      {
        category: "Kawasan Perlindungan & Koridor",
        strategies: [
          "Malaysia telah wujudkan santuari hidupan liar seperti Taman Negara dan Kompleks Hutan Belum-Temengor untuk lindungi habitat tapir (DWNP, 2023).",
          "Pembinaan jejambat hidupan liar di lebuh raya (contoh: Central Forest Spine) kurangkan kematian akibat kemalangan jalan raya (WWF Malaysia, 2022)."
        ]
      },
      {
        category: "Anti-Pemburuan Haram & Penguatkuasaan",
        strategies: [
          "PERHILITAN (Jabatan Hidupan Liar Malaysia) menjalankan rondaan untuk cegah pemburuan haram (PERHILITAN, 2021).",
          "Hukuman lebih berat untuk jenayah hidupan liar di bawah Akta Pemuliharaan Hidupan Liar 2010 (IUCN, 2023)."
        ]
      },
      {
        category: "Penglibatan Komuniti",
        strategies: [
          "Program seperti MYCAT termasuk perlindungan tapir dalam inisiatif mereka (MYCAT, 2022).",
          "Pendidikan komuniti orang asal tentang guna tanah lestari kurangkan konflik manusia‑tapir (MNS, 2021)."
        ]
      },
      {
        category: "Penyelidikan & Pemantauan",
        strategies: [
          "Kamera tersembunyi dan pengesan GPS membantu kajian pergerakan tapir (UM, 2023).",
          "Kerjasama dengan Universiti Malaysia Terengganu tentang genetik tapir (UMT, 2022)."
        ]
      }
    ],

    // reuse English for these two, or replace with your own Malay translations:
    coexistenceTitle: en.coexistenceTitle,
    coexistenceData:  en.coexistenceData,
    successTitle:     en.successTitle,
    successData:      en.successData
  };

  //
  // 3) pick the right language
  //
  const content = { en, ms };
  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Help */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="volunteer-activism"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {text.helpTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.helpData.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor:      isDark ? Colors.dark.border  : Colors.light.border,
                  borderLeftColor:  '#4CAF50',
                  borderLeftWidth:  4
                }
              ]}
            >
              <MaterialIcons
                name={getHelpActionIcon(item.action)}
                size={24}
                color="#4CAF50"
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText
                  style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                >
                  {item.action}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.cardDescription,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}
                >
                  {item.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Strategies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="policy"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {text.strategiesTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.strategiesData.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor:      isDark ? Colors.dark.border  : Colors.light.border
                }
              ]}
            >
              <MaterialIcons
                name={getStrategyIcon(item.category)}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText
                  style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                >
                  {item.category}
                </ThemedText>
                {item.strategies.map((strat, sIdx) => (
                  <ThemedText
                    key={sIdx}
                    style={[
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}
                  >
                    • {strat}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Coexistence */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="handshake"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {text.coexistenceTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.coexistenceData.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor:      isDark ? Colors.dark.border  : Colors.light.border
                }
              ]}
            >
              <MaterialIcons
                name={getStrategyIcon(item.category)}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText
                  style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                >
                  {item.category}
                </ThemedText>
                {item.strategies.map((strat, sIdx) => (
                  <ThemedText
                    key={sIdx}
                    style={[
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}
                  >
                    • {strat}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Success */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="celebration"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {text.successTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.successData.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor:      isDark ? Colors.dark.border  : Colors.light.border,
                  borderLeftColor:  '#4CAF50',
                  borderLeftWidth:  4
                }
              ]}
            >
              <MaterialIcons
                name={getSuccessIcon(item.story)}
                size={24}
                color="#4CAF50"
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <ThemedText
                  style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                >
                  {item.story}
                </ThemedText>
                {item.achievements.map((ach, aIdx) => (
                  <ThemedText
                    key={aIdx}
                    style={[
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}
                  >
                    • {ach}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1 },
  content:       { padding: 16, paddingBottom: 32 },

  section:       { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle:  { fontSize: 18, fontWeight: '600' },

  cardsGrid:     { gap: 12 },

  card: {
    flexDirection: 'row',
    padding:       16,
    borderRadius:  12,
    borderWidth:   1,
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius:  2,
    elevation:     2
  },
  cardIcon:      { marginRight: 16, marginTop: 4 },
  cardContent:   { flex: 1 },
  cardTitle:     { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription:{ fontSize: 14, lineHeight: 20 }
});

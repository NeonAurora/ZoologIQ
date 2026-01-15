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
      return 'volunteer-activism';
    case 'drive carefully in forest areas':
    case 'memandu dengan berhati-hati di kawasan hutan':
      return 'drive-eta';
    case 'spread awareness':
    case 'sebarkan kesedaran':
      return 'campaign';
    case 'support ecotourism':
    case 'sokong ekopelancongan':
      return 'photo-camera';
    default:
      return 'help';
  }
};

// Icon lookup for strategy categories
const getStrategyIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'protected areas & corridors':
    case 'kawasan dilindungi & koridor':
      return 'forest';
    case 'anti-poaching & enforcement':
    case 'anti-pemburuan & penguatkuasaan':
      return 'security';
    case 'international cooperation':
    case 'kerjasama antarabangsa':
      return 'public';
    case 'zoos & captive breeding':
    case 'zoo & pembiakan dalam kurungan':
      return 'pets';
    case 'community-based conservation':
    case 'pemuliharaan berasaskan komuniti':
      return 'handshake';
    default:
      return 'category';
  }
};

// Icon lookup for success stories
const getSuccessIcon = (story) => {
  if (/matcap|pelan tindakan/i.test(story)) return 'assignment';
  if (/operasi|enforcement/i.test(story)) return 'verified';
  return 'celebration';
};

export default function TapirThreats({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      // ==================== HOW YOU CAN HELP (EN) ====================
      helpTitle: "How You Can Help Save the Malayan Tapir",
      helpData: [
        {
          action: "Support Conservation Organizations",
          description: "To mitigate these conflicts and help tapir conservation, it is essential to maintain and restore forest habitat, secure movement corridors between remaining forest blocks, and work with local communities to protect crops using non-lethal methods and raise awareness of the ecological importance of the species (Pérez-Flores et al., 2021; Fifth International Tapir Symposium, 2011)."
        },
        {
          action: "Drive Carefully in Forest Areas",
          description: "Drivers are urged to slow down, obey speed limits and be cautious when passing through wildlife crossing areas, especially at night, as most wildlife-vehicle collisions in Malaysia occur in low-light conditions on roads passing through forest habitats (The Straits Times, 2025)."
        },
        {
          action: "Spread Awareness",
          description: "Sharing reliable information and engaging stories about tapirs through social media, schools, or community events can help raise awareness and support for their conservation (AZA Tapir Tracks Curriculum, 2014; Tapir Specialist Group, 2017)."
        },
        {
          action: "Support Ecotourism",
          description: "Choosing well-managed, conservation-focused wildlife tourism operators can help ensure that a portion of your spending supports protected areas, local livelihoods and biodiversity conservation (CBD/UNWTO, 2015)."
        }
      ],

      // ==================== CONSERVATION STRATEGIES IN MALAYSIA (EN) ====================
      strategiesTitle: "Conservation Strategies for the Malayan Tapir in Malaysia",
      strategiesData: [
        {
          category: "Protected Areas & Corridors",
          strategies: [
            "Major protected forest landscapes in Peninsular Malaysia, including Taman Negara and the Belum-Temengor forest complex (which includes the Royal Belum State Park and the Temengor Forest Reserve), provide important habitat for Malayan tapirs and are recognized as priority areas in national tapir conservation work (Wong, 2019)."
          ]
        },
        {
          category: "Anti-Poaching & Enforcement",
          strategies: [
            "Perhilitan (Malaysia's Department of Wildlife and National Parks) conducts regular law-enforcement and anti-poaching patrols, including through its Wildlife Crime Unit and joint operations such as Operasi Bersepadu Khazanah, to prevent poaching and other wildlife crimes in protected areas and forest reserves (Abdul Kadir et al., 2024)."
          ]
        }
      ],

      // ==================== GLOBAL CONSERVATION STRATEGIES (EN) ====================
      globalStrategiesTitle: "Conservation Strategies in Other Parts of the World",
      globalStrategiesData: [
        {
          category: "International Cooperation",
          strategies: [
            "The ASEAN Wildlife Enforcement Network (ASEAN-WEN) coordinates law-enforcement efforts among Southeast Asian countries to combat illegal wildlife trade in CITES-listed species, working closely with partners such as TRAFFIC and WWF (ASEAN-WEN/TRAFFIC, 2010)."
          ]
        },
        {
          category: "Zoos & Captive Breeding",
          strategies: [
            "European zoos, such as Copenhagen Zoo and Nuremberg Zoo, participate in the EAZA Ex Situ Program (EEP) for the Malayan tapir to maintain a demographically and genetically viable insurance population supporting global tapir conservation (Holst et al., 2021; EAZA, 2023)."
          ]
        }
      ],

      // ==================== COEXISTENCE STRATEGIES (EN) ====================
      coexistenceTitle: "Coexistence Strategies for the Malayan Tapir in Malaysia",
      coexistenceData: [
        {
          category: "Community-Based Conservation",
          strategies: [
            "Conservation work in landscapes such as the Belum-Temengor Forest Complex is increasingly recognizing that partnering with Orang Asli communities and respecting their traditional forest-use practices is vital to the sustainable management of forests in areas that are also core habitat for Malayan tapirs (Morrison, 2025; Maginton et al., 2024)."
          ]
        }
      ],

      // ==================== SUCCESS STORIES (EN) ====================
      successTitle: "Conservation Success Stories in Malaysia",
      successData: [
        {
          story: "National Action Plan (MATCAP 2021-2030)",
          achievements: [
            "Malaysia established the Malayan Tapir Conservation Action Plan (MATCAP) 2021-2030, which sets clear goals to coordinate government and partner actions to protect habitat, reduce road deaths and human-tapir conflict, and secure the long-term survival of the species in Peninsular Malaysia (DWNP, 2024)."
          ]
        },
        {
          story: "Enforcement Recognition: Operasi Bersepadu Khazanah",
          achievements: [
            "Malaysia's Operasi Bersepadu Khazanah (OBK) anti-poaching taskforce, led by the DWNP and the Royal Malaysia Police, received the 2020 Asia Environment Enforcement Award for its impact in increasing patrols and reducing poaching in key tiger and tapir habitats, strengthening protections for the Malayan tapir and other wildlife (UN, 2021)."
          ]
        }
      ]
    },

    ms: {
      // ==================== HOW YOU CAN HELP (MS) ====================
      helpTitle: "Bagaimana Anda Boleh Membantu Menyelamatkan Tapir Malaya",
      helpData: [
        {
          action: "Sokong Organisasi Pemuliharaan",
          description: "Untuk mengurangkan konflik ini dan membantu pemuliharaan tapir, adalah penting untuk mengekalkan dan memulihkan habitat hutan, mengamankan koridor pergerakan antara blok hutan yang tinggal, dan bekerjasama dengan komuniti tempatan untuk melindungi tanaman menggunakan kaedah tidak mematikan dan meningkatkan kesedaran tentang kepentingan ekologi spesies ini (Pérez-Flores et al., 2021; Fifth International Tapir Symposium, 2011)."
        },
        {
          action: "Memandu dengan Berhati-hati di Kawasan Hutan",
          description: "Pemandu digesa untuk memperlahankan kelajuan, mematuhi had laju dan berhati-hati ketika melalui kawasan lintasan hidupan liar, terutamanya pada waktu malam, kerana kebanyakan perlanggaran kenderaan-hidupan liar di Malaysia berlaku dalam keadaan cahaya rendah di jalan yang melalui habitat hutan (The Straits Times, 2025)."
        },
        {
          action: "Sebarkan Kesedaran",
          description: "Berkongsi maklumat yang boleh dipercayai dan cerita menarik tentang tapir melalui media sosial, sekolah, atau acara komuniti boleh membantu meningkatkan kesedaran dan sokongan untuk pemuliharaan mereka (AZA Tapir Tracks Curriculum, 2014; Tapir Specialist Group, 2017)."
        },
        {
          action: "Sokong Ekopelancongan",
          description: "Memilih pengendali pelancongan hidupan liar yang diurus dengan baik dan berfokuskan pemuliharaan boleh membantu memastikan sebahagian daripada perbelanjaan anda menyokong kawasan yang dilindungi, mata pencarian tempatan dan pemuliharaan kepelbagaian biologi (CBD/UNWTO, 2015)."
        }
      ],

      // ==================== CONSERVATION STRATEGIES IN MALAYSIA (MS) ====================
      strategiesTitle: "Strategi Pemuliharaan untuk Tapir Malaya di Malaysia",
      strategiesData: [
        {
          category: "Kawasan Dilindungi & Koridor",
          strategies: [
            "Landskap hutan dilindungi utama di Semenanjung Malaysia, termasuk Taman Negara dan kompleks hutan Belum-Temengor (yang merangkumi Taman Negara Diraja Belum dan Hutan Simpan Temengor), menyediakan habitat penting untuk tapir Malaya dan diiktiraf sebagai kawasan keutamaan dalam kerja pemuliharaan tapir nasional (Wong, 2019)."
          ]
        },
        {
          category: "Anti-Pemburuan & Penguatkuasaan",
          strategies: [
            "Perhilitan (Jabatan Perlindungan Hidupan Liar dan Taman Negara Malaysia) menjalankan rondaan penguatkuasaan undang-undang dan anti-pemburuan secara berkala, termasuk melalui Unit Jenayah Hidupan Liarnya dan operasi bersama seperti Operasi Bersepadu Khazanah, untuk mencegah pemburuan dan jenayah hidupan liar lain di kawasan dilindungi dan hutan simpan (Abdul Kadir et al., 2024)."
          ]
        }
      ],

      // ==================== GLOBAL CONSERVATION STRATEGIES (MS) ====================
      globalStrategiesTitle: "Strategi Pemuliharaan di Bahagian Lain Dunia",
      globalStrategiesData: [
        {
          category: "Kerjasama Antarabangsa",
          strategies: [
            "Rangkaian Penguatkuasaan Hidupan Liar ASEAN (ASEAN-WEN) menyelaras usaha penguatkuasaan undang-undang di kalangan negara-negara Asia Tenggara untuk memerangi perdagangan hidupan liar haram dalam spesies yang disenaraikan CITES, bekerjasama rapat dengan rakan kongsi seperti TRAFFIC dan WWF (ASEAN-WEN/TRAFFIC, 2010)."
          ]
        },
        {
          category: "Zoo & Pembiakan dalam Kurungan",
          strategies: [
            "Zoo Eropah, seperti Zoo Copenhagen dan Zoo Nuremberg, mengambil bahagian dalam Program Ex Situ EAZA (EEP) untuk tapir Malaya untuk mengekalkan populasi insurans yang berdaya maju secara demografi dan genetik yang menyokong pemuliharaan tapir global (Holst et al., 2021; EAZA, 2023)."
          ]
        }
      ],

      // ==================== COEXISTENCE STRATEGIES (MS) ====================
      coexistenceTitle: "Strategi Kewujudan Bersama untuk Tapir Malaya di Malaysia",
      coexistenceData: [
        {
          category: "Pemuliharaan Berasaskan Komuniti",
          strategies: [
            "Kerja pemuliharaan dalam landskap seperti Kompleks Hutan Belum-Temengor semakin mengiktiraf bahawa bekerjasama dengan komuniti Orang Asli dan menghormati amalan penggunaan hutan tradisional mereka adalah penting untuk pengurusan hutan yang mampan di kawasan yang juga merupakan habitat teras untuk tapir Malaya (Morrison, 2025; Maginton et al., 2024)."
          ]
        }
      ],

      // ==================== SUCCESS STORIES (MS) ====================
      successTitle: "Kisah Kejayaan Pemuliharaan di Malaysia",
      successData: [
        {
          story: "Pelan Tindakan Nasional (MATCAP 2021-2030)",
          achievements: [
            "Malaysia menubuhkan Pelan Tindakan Pemuliharaan Tapir Malaya (MATCAP) 2021-2030, yang menetapkan matlamat yang jelas untuk menyelaras tindakan kerajaan dan rakan kongsi untuk melindungi habitat, mengurangkan kematian di jalan raya dan konflik manusia-tapir, dan menjamin kelangsungan jangka panjang spesies ini di Semenanjung Malaysia (DWNP, 2024)."
          ]
        },
        {
          story: "Pengiktirafan Penguatkuasaan: Operasi Bersepadu Khazanah",
          achievements: [
            "Pasukan petugas anti-pemburuan Operasi Bersepadu Khazanah (OBK) Malaysia, yang diketuai oleh DWNP dan Polis Diraja Malaysia, menerima Anugerah Penguatkuasaan Alam Sekitar Asia 2020 untuk kesannya dalam meningkatkan rondaan dan mengurangkan pemburuan di habitat harimau dan tapir utama, mengukuhkan perlindungan untuk tapir Malaya dan hidupan liar lain (UN, 2021)."
          ]
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* How You Can Help */}
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
                  borderColor: isDark ? Colors.dark.border : Colors.light.border,
                  borderLeftColor: '#4CAF50',
                  borderLeftWidth: 4
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

      {/* Conservation Strategies in Malaysia */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="forest"
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
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
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
                    {strat}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Global Conservation Strategies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons
            name="public"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {text.globalStrategiesTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.globalStrategiesData.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
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
                    {strat}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Coexistence Strategies */}
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
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
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
                    {strat}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Success Stories */}
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
                  borderColor: isDark ? Colors.dark.border : Colors.light.border,
                  borderLeftColor: '#4CAF50',
                  borderLeftWidth: 4
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
                    {ach}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardIcon: { marginRight: 16, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20, marginBottom: 8 }
});
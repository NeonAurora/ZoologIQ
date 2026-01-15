// components/lesson/tiger/sections/TigerThreats.jsx
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerThreats({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      threatsTitle: 'Threats to Malayan Tigers',
      threatCards: [
        { 
          title: 'Habitat Loss & Fragmentation', 
          description: 'Deforestation and land-use change have already eliminated large areas of Malayan tiger habitat and left many remaining forests fragmented into smaller, isolated blocks (WWF-Malaysia, 2021)', 
          icon: 'landscape' 
        },
        { 
          title: 'Roads & Highways', 
          description: 'Roads and highways fragment forests, increasing roadkill risks', 
          icon: 'directions-car' 
        },
        { 
          title: 'Poaching & Illegal Wildlife Trade', 
          description: 'Recent investigations detail how smuggling networks exploit migrant debt to fuel tiger poaching (Mongabay, 2025; TRAFFIC, 2023)', 
          icon: 'block' 
        },
        { 
          title: 'Weak Enforcement & Corruption', 
          description: 'Limited anti-poaching enforcement capacity and corruption allow illegal tiger hunting and trade to persist, undermining conservation efforts (TRAFFIC, 2023)', 
          icon: 'security' 
        }
      ],
      helpTitle: 'How Can You Help?',
      helpCards: [
        { 
          title: 'Donate to Organizations', 
          description: 'Donate to reputable organizations like WWF-Malaysia to fund anti-poaching patrols and habitat restoration', 
          icon: 'favorite' 
        },
        { 
          title: 'Volunteer', 
          description: 'Volunteer for wildlife surveys, camera trap monitoring, or awareness campaigns', 
          icon: 'handshake' 
        },
        { 
          title: 'Adopt a Tiger', 
          description: 'Adopt a Tiger symbolically through conservation NGOs to support long-term protection', 
          icon: 'pets' 
        },
        { 
          title: 'Report Sightings', 
          description: 'Report tiger sightings to authorities to prevent accidental conflicts (DWNP, 2008)', 
          icon: 'visibility' 
        },
        { 
          title: 'Support Wildlife Corridors', 
          description: 'Advocate for wildlife corridors to connect fragmented forests (Lynam et al., 2012)', 
          icon: 'route' 
        },
        { 
          title: 'Report Poaching', 
          description: 'Report poaching via hotlines (TRAFFIC, 2023)', 
          icon: 'phone' 
        },
        { 
          title: 'Avoid Tiger Products', 
          description: 'Avoid tiger-derived products (traditional medicines, souvenirs) and educate others to protect Malayan tigers', 
          icon: 'cancel' 
        },
        { 
          title: 'Educate Children', 
          description: 'Educate the children through school programs or zoo visits', 
          icon: 'school' 
        }
      ],
      coexistenceTitle: 'Coexistence Strategies for Malayan Tigers',
      coexistenceCards: [
        { 
          title: 'Secure Livestock', 
          description: 'Put cows, goats, and chickens in strong, closed pens from evening to morning so tigers are less tempted to come near the house', 
          icon: 'agriculture' 
        },
        { 
          title: 'Use Safe Grazing Areas', 
          description: 'Use open areas or fields closer to the village instead of dense forest edges where tigers hunt', 
          icon: 'grass' 
        },
        { 
          title: 'Clear Vegetation', 
          description: 'Cut tall grass and bushes near houses and livestock pens so tigers and prey animals have fewer hiding spots close to people', 
          icon: 'park' 
        },
        { 
          title: 'Travel Safely', 
          description: 'When walking near forest edges, plantations, or rivers, go in a group, make some noise, and avoid going out at dawn, dusk, or late at night', 
          icon: 'groups' 
        },
        { 
          title: 'Report Tiger Signs', 
          description: 'If you see tiger tracks, scratches, or hear roars near your village, report to PERHILITAN or the state wildlife office so they can respond before conflict happens', 
          icon: 'report' 
        },
        { 
          title: 'Use Deterrents', 
          description: 'Bright lights, noise (whistles, metal banging), and dogs can help warn both people and tigers that humans are nearby', 
          icon: 'lightbulb' 
        },
        { 
          title: 'Support Village Patrols', 
          description: 'Support or volunteer with village patrols, RELA, or NGO community teams that help monitor forests and remove snares', 
          icon: 'group' 
        },
        { 
          title: 'Seek Compensation', 
          description: 'Encourage and apply for government or NGO compensation when livestock is lost to tigers, so people are less likely to retaliate', 
          icon: 'payments' 
        },
        { 
          title: 'Buy Certified Products', 
          description: 'Buy palm oil and timber products with responsible certifications when you can, to reduce pressure on forests where tigers live', 
          icon: 'eco' 
        }
      ],
      successTitle: 'Malayan Tiger: Conservation Success Stories',
      successCards: [
        { 
          title: 'Royal Belum State Park', 
          description: 'Royal Belum State Park has become one of the major strongholds for Malayan tigers in Peninsular Malaysia, where increased patrolling and joint enforcement by the Perhilitan, military and NGO partners has helped reduce poaching pressure and make the forest safe for the tigers and their prey (Ryan and Linkie, 2015)', 
          icon: 'forest' 
        },
        { 
          title: 'Kenyir Wildlife Corridor', 
          description: 'The Kenyir Wildlife Corridor initiative focuses on restoring and safeguarding forest between Taman Negara and Tasik Kenyir to keep this landscape as an important passage for tigers and other wildlife. Through reforestation activities, strengthened patrolling, and community participation, the corridor is being managed to maintain connectivity so tigers can move more safely between key habitats (Kenyir For Life, 2022; MPOGCF, 2025)', 
          icon: 'nature' 
        }
      ]
    },
    ms: {
      threatsTitle: 'Ancaman Terhadap Harimau Malaya',
      threatCards: [
        { 
          title: 'Kehilangan & Pemecahan Habitat', 
          description: 'Penebangan hutan dan perubahan guna tanah telah menghapuskan kawasan habitat harimau Malaya yang luas dan meninggalkan banyak hutan yang tinggal terpecah-pecah menjadi blok yang lebih kecil dan terpencil (WWF-Malaysia, 2021)', 
          icon: 'landscape' 
        },
        { 
          title: 'Jalan Raya & Lebuh Raya', 
          description: 'Jalan raya dan lebuh raya memecah-belahkan hutan, meningkatkan risiko kemalangan jalan raya', 
          icon: 'directions-car' 
        },
        { 
          title: 'Pemburuan Haram & Perdagangan Hidupan Liar', 
          description: 'Siasatan terkini memperincikan bagaimana rangkaian penyeludupan mengeksploitasi hutang pendatang untuk memacu pemburuan harimau (Mongabay, 2025; TRAFFIC, 2023)', 
          icon: 'block' 
        },
        { 
          title: 'Penguatkuasaan Lemah & Rasuah', 
          description: 'Kapasiti penguatkuasaan anti-pemburuan haram yang terhad dan rasuah membenarkan pemburuan dan perdagangan harimau haram berterusan, menjejaskan usaha pemuliharaan (TRAFFIC, 2023)', 
          icon: 'security' 
        }
      ],
      helpTitle: 'Bagaimana Anda Boleh Membantu?',
      helpCards: [
        { 
          title: 'Derma kepada Organisasi', 
          description: 'Derma kepada organisasi bereputasi seperti WWF-Malaysia untuk membiayai rondaan anti-pemburuan haram dan pemulihan habitat', 
          icon: 'favorite' 
        },
        { 
          title: 'Menjadi Sukarelawan', 
          description: 'Menjadi sukarelawan untuk tinjauan hidupan liar, pemantauan perangkap kamera, atau kempen kesedaran', 
          icon: 'handshake' 
        },
        { 
          title: 'Adopsi Harimau', 
          description: 'Mengadopsi harimau secara simbolik melalui NGO pemuliharaan untuk menyokong perlindungan jangka panjang', 
          icon: 'pets' 
        },
        { 
          title: 'Laporkan Pemerhatian', 
          description: 'Laporkan pemerhatian harimau kepada pihak berkuasa untuk mengelakkan konflik yang tidak disengajakan (DWNP, 2008)', 
          icon: 'visibility' 
        },
        { 
          title: 'Sokong Koridor Hidupan Liar', 
          description: 'Memperjuangkan koridor hidupan liar untuk menghubungkan hutan yang terpecah (Lynam et al., 2012)', 
          icon: 'route' 
        },
        { 
          title: 'Laporkan Pemburuan Haram', 
          description: 'Laporkan pemburuan haram melalui talian hotline (TRAFFIC, 2023)', 
          icon: 'phone' 
        },
        { 
          title: 'Elakkan Produk Harimau', 
          description: 'Elakkan produk berasaskan harimau (ubat tradisional, cenderahati) dan mendidik orang lain untuk melindungi harimau Malaya', 
          icon: 'cancel' 
        },
        { 
          title: 'Didik Kanak-kanak', 
          description: 'Mendidik kanak-kanak melalui program sekolah atau lawatan zoo', 
          icon: 'school' 
        }
      ],
      coexistenceTitle: 'Strategi Bersama untuk Harimau Malaya',
      coexistenceCards: [
        { 
          title: 'Kandang Selamat', 
          description: 'Letakkan lembu, kambing, dan ayam dalam kandang yang kuat dan tertutup dari petang hingga pagi supaya harimau kurang tergoda untuk datang ke rumah', 
          icon: 'agriculture' 
        },
        { 
          title: 'Gunakan Kawasan Ragut Selamat', 
          description: 'Gunakan kawasan terbuka atau padang yang lebih dekat dengan kampung berbanding pinggir hutan padat di mana harimau memburu', 
          icon: 'grass' 
        },
        { 
          title: 'Bersihkan Tumbuhan', 
          description: 'Potong rumput tinggi dan semak berhampiran rumah dan kandang ternakan supaya harimau dan haiwan mangsa mempunyai lebih sedikit tempat persembunyian berhampiran manusia', 
          icon: 'park' 
        },
        { 
          title: 'Berjalan dengan Selamat', 
          description: 'Apabila berjalan berhampiran pinggir hutan, ladang, atau sungai, pergi berkumpulan, buat bunyi, dan elakkan keluar pada waktu subuh, senja, atau lewat malam', 
          icon: 'groups' 
        },
        { 
          title: 'Laporkan Tanda Harimau', 
          description: 'Jika anda melihat jejak harimau, cakaran, atau mendengar auman berhampiran kampung anda, laporkan kepada PERHILITAN atau pejabat hidupan liar negeri supaya mereka dapat bertindak sebelum konflik berlaku', 
          icon: 'report' 
        },
        { 
          title: 'Gunakan Pencegah', 
          description: 'Lampu terang, bunyi (wisel, hentakan logam), dan anjing boleh membantu memberi amaran kepada manusia dan harimau bahawa manusia berdekatan', 
          icon: 'lightbulb' 
        },
        { 
          title: 'Sokong Rondaan Kampung', 
          description: 'Sokong atau menjadi sukarelawan dengan rondaan kampung, RELA, atau pasukan komuniti NGO yang membantu memantau hutan dan mengeluarkan jerat', 
          icon: 'group' 
        },
        { 
          title: 'Dapatkan Pampasan', 
          description: 'Galakkan dan mohon pampasan kerajaan atau NGO apabila ternakan hilang kepada harimau, supaya orang ramai kurang berkemungkinan untuk membalas dendam', 
          icon: 'payments' 
        },
        { 
          title: 'Beli Produk Bersijil', 
          description: 'Beli produk minyak sawit dan kayu dengan pensijilan yang bertanggungjawab apabila anda boleh, untuk mengurangkan tekanan terhadap hutan di mana harimau tinggal', 
          icon: 'eco' 
        }
      ],
      successTitle: 'Harimau Malaya: Kisah Kejayaan Pemuliharaan',
      successCards: [
        { 
          title: 'Taman Negeri Royal Belum', 
          description: 'Taman Negeri Royal Belum telah menjadi salah satu kubu utama untuk harimau Malaya di Semenanjung Malaysia, di mana peningkatan rondaan dan penguatkuasaan bersama oleh Perhilitan, tentera dan rakan NGO telah membantu mengurangkan tekanan pemburuan haram dan menjadikan hutan selamat untuk harimau dan mangsa mereka (Ryan and Linkie, 2015)', 
          icon: 'forest' 
        },
        { 
          title: 'Koridor Hidupan Liar Kenyir', 
          description: 'Inisiatif Koridor Hidupan Liar Kenyir memberi tumpuan kepada pemulihan dan perlindungan hutan antara Taman Negara dan Tasik Kenyir untuk mengekalkan landskap ini sebagai laluan penting untuk harimau dan hidupan liar lain. Melalui aktiviti penanaman semula, rondaan yang diperkukuh, dan penyertaan komuniti, koridor sedang diuruskan untuk mengekalkan hubungan supaya harimau boleh bergerak dengan lebih selamat antara habitat utama (Kenyir For Life, 2022; MPOGCF, 2025)', 
          icon: 'nature' 
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const sections = [
    { title: text.threatsTitle, icon: 'warning', cards: text.threatCards, iconColor: '#F44336' },
    { title: text.helpTitle, icon: 'help-outline', cards: text.helpCards },
    { title: text.coexistenceTitle, icon: 'people', cards: text.coexistenceCards },
    { title: text.successTitle, icon: 'celebration', cards: text.successCards, iconColor: '#4CAF50' }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {sections.map(({ title, icon, cards, iconColor }, si) => (
        <View key={si} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons
              name={icon}
              size={20}
              color={isDark ? Colors.dark.tint : Colors.light.tint}
            />
            <ThemedText
              style={[
                styles.sectionTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
              {title}
            </ThemedText>
          </View>

          <View style={styles.cardsGrid}>
            {cards.map((c, i) => (
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
                  name={c.icon}
                  size={24}
                  color={iconColor ?? (isDark ? Colors.dark.tint : Colors.light.tint)}
                  style={styles.cardIcon}
                />
                <View style={styles.cardContent}>
                  <ThemedText
                    style={[
                      styles.cardTitle,
                      { color: isDark ? Colors.dark.text : Colors.light.text }
                    ]}>
                    {c.title}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.cardDescription,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}>
                    {c.description}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
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
  cardIcon: { marginRight: 16, marginTop: 2 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 13, lineHeight: 18 }
});
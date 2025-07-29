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
      threatsTitle:    'Threats to Malayan Tigers:',
      threatCards:     [
        { title: 'Habitat Destruction',    description: 'Deforestation for palm oil, logging, and urban expansion destroys tiger habitats',            icon: 'landscape' },
        { title: 'Forest Fragmentation',    description: 'Roads and highways fragment forests, increasing roadkill risks',                                    icon: 'construction' },
        { title: 'Illegal Poaching',        description: 'Hunted for skins, bones used in traditional medicine, and trophies',                                icon: 'block' },
        { title: 'Weak Enforcement',       description: 'Poor law enforcement allows smuggling networks to thrive',                                          icon: 'security' },
        { title: 'Human-Wildlife Conflict',description: 'Tigers attack livestock when prey is scarce, leading to retaliatory killings',                      icon: 'error' },
        { title: 'Territory Encroachment', description: 'Human encroachment into tiger territories raises attack risks',                                    icon: 'warning' },
        { title: 'Prey Depletion',         description: 'Overhunting of deer and wild boar reduces tigers\' food supply',                                   icon: 'trending-down' },
        { title: 'Ecosystem Changes',      description: 'Forest ecosystem alterations affect tiger prey availability',                                     icon: 'nature' },
        { title: 'Climate Change',         description: 'Rising temperatures may reduce suitable habitats',                                                 icon: 'thermostat' },
        { title: 'Conservation Challenges',description: 'Limited anti-poaching patrols and corruption hinder conservation',                                 icon: 'block' }
      ],
      helpTitle:       'How can you Help?',
      helpCards:       [
        { title: 'Support Organizations', description: 'Donate to WWF‑Malaysia, MYCAT, or Rimba for anti‑poaching patrols and habitat restoration', icon: 'favorite' },
        { title: 'Volunteer',            description: 'Join wildlife surveys, camera trap monitoring, or awareness campaigns',                          icon: 'handshake' },
        { title: 'Adopt a Tiger',        description: 'Symbolically adopt a tiger through conservation NGOs for long‑term protection',                    icon: 'favorite' },
        { title: 'Farmer Protection',    description: 'Use guard animals, reinforced fencing, and early warning systems for livestock',                  icon: 'agriculture' },
        { title: 'Report Sightings',     description: 'Report tiger sightings to authorities to prevent accidental conflicts',                          icon: 'visibility' },
        { title: 'Support Corridors',    description: 'Advocate for wildlife corridors to connect fragmented forests',                                   icon: 'directions' },
        { title: 'Report Poaching',      description: 'Report poaching via hotlines like MYCAT\'s 1-800-88-5151',                                       icon: 'phone' },
        { title: 'Avoid Tiger Products', description: 'Avoid tiger‑derived products and educate others about the trade',                                icon: 'block' },
        { title: 'Support Legislation',  description: 'Sign petitions for stronger wildlife protection policies',                                      icon: 'ballot' },
        { title: 'Choose Sustainable',   description: 'Choose deforestation‑free products like RSPO‑certified palm oil',                                icon: 'nature' },
        { title: 'Reduce Plastic',       description: 'Reduce plastic use as pollution harms tiger prey and ecosystems',                                icon: 'recycling' },
        { title: 'Ecotourism',           description: 'Visit tiger‑friendly reserves to boost conservation funding',                                    icon: 'camera' }
      ],
      coexistenceTitle:'Coexistence Strategies for Malayan Tigers:',
      coexistenceCards:[
        { title: 'Guardian Dogs',           description: 'Livestock guardian dogs reduce tiger attacks on farms',           icon: 'pets' },
        { title: 'Compensation Schemes',    description: 'Financial compensation for farmers who lose livestock to tigers', icon: 'payments' },
        { title: 'Wildlife Corridors',      description: 'Link fragmented forests for safe tiger movement',                icon: 'route' },
        { title: 'Eco-friendly Infrastructure',description: 'Wildlife crossings on highways for safe animal passage',      icon: 'construction' },
        { title: 'SMS Alerts',              description: 'Notify villagers of nearby tiger sightings for safety',         icon: 'sms' },
        { title: 'Predator-proof Enclosures',description: 'Secure livestock enclosures to prevent tiger attacks',         icon: 'security' },
        { title: 'Ecotourism Jobs',         description: 'Create alternative livelihoods to forest exploitation',         icon: 'work' },
        { title: 'Non-timber Products',     description: 'Wild honey and other products reduce logging dependence',       icon: 'eco' },
        { title: 'Education Programs',      description: 'Teach children tiger safety and conservation',                  icon: 'school' },
        { title: 'Community Patrols',       description: 'Local patrol units monitor tigers and deter poachers',          icon: 'group' },
        { title: 'Law Enforcement',         description: 'Strict enforcement of anti-poaching laws',                      icon: 'gavel' },
        { title: 'Land-use Planning',       description: 'Prioritize tiger habitats in development planning',            icon: 'map' }
      ],
      successTitle:    'Malayan Tiger: Conservation Success Stories',
      successCards:    [
        { title: 'Kenyir Wildlife Corridor',description: 'Reforestation reconnected habitats between Taman Negara and Kenyir Lake',  icon: 'forest' },
        { title: 'Royal Belum Success',     description: 'Enhanced patrolling reduced poaching by 40% since 2019',                 icon: 'security' },
        { title: 'Community Patrol Units',  description: 'Indigenous-led teams removed 1,200 snares in 2022',                       icon: 'group' },
        { title: 'Ecotourism Impact',       description: 'Tiger-friendly tourism generated RM5 million for local communities in 2023', icon: 'attach-money' }
      ]
    },
    ms: {
      threatsTitle:     'Ancaman Terhadap Harimau Malaya:',
      threatCards:      [
        { title:'Pemusnahan Habitat',description:'Pembalakan untuk kelapa sawit dan pembandaran merosakkan habitat harimau', icon:'landscape' },
        { title:'Pemecahan Hutan', description:'Jalan raya memecah-belahkan hutan, meningkatkan risiko kemalangan',          icon:'construction' },
        { title:'Pemburuan Haram',description:'Diburu untuk kulit, tulang dalam perubatan tradisional, dan trofi',         icon:'location-off' },
        { title:'Penguatkuasaan Lemah',description:'Penguatkuasaan lemah membolehkan rangkaian penyeludupan berkembang',    icon:'security' },
        { title:'Konflik Manusia-Hidupan Liar',description:'Harimau menyerang ternakan ketika mangsa berkurangan',         icon:'error' },
        { title:'Pencerobohan Wilayah',description:'Pencerobohan ke wilayah harimau meningkatkan risiko serangan',          icon:'warning' },
        { title:'Kekurangan Mangsa', description:'Pemburuan berlebihan mengurangkan bekalan makanan harimau',          icon:'trending-down' },
        { title:'Perubahan Ekosistem',description:'Perubahan ekosistem hutan menjejaskan ketersediaan mangsa',        icon:'nature' },
        { title:'Perubahan Iklim', description:'Suhu meningkat mungkin mengurangkan habitat sesuai',                   icon:'thermostat' },
        { title:'Cabaran Pemuliharaan',description:'Patroli terhad dan rasuah menghalang usaha pemuliharaan',            icon:'block' }
      ],
      helpTitle:        'Bagaimana Anda Boleh Membantu?',
      helpCards:        [
        { title:'Sokong Organisasi',description:'Menderma kepada WWF‑Malaysia, MYCAT, atau Rimba untuk patroli dan pemulihan habitat',icon:'favorite' },
        { title:'Menjadi Sukarelawan',description:'Sertai kajian hidupan liar, pemantauan kamera, atau kempen kesedaran',icon:'handshake' },
        { title:'Adopsi Harimau',description:'Mengadopsi simbolik harimau melalui NGO untuk perlindungan jangka panjang',icon:'favorite' },
        { title:'Perlindungan Petani',description:'Gunakan haiwan penjaga, pagar kukuh, dan sistem amaran awal',            icon:'agriculture' },
        { title:'Laporkan Pemerhatian',description:'Laporkan pemerhatian harimau kepada pihak berkuasa',                    icon:'visibility' },
        { title:'Sokong Koridor',description:'Menyokong koridor hidupan liar untuk menghubungkan hutan',                icon:'route' },
        { title:'Laporkan Pemburuan',description:'Laporkan pemburuan haram melalui talian hotline MYCAT',               icon:'phone' },
        { title:'Elakkan Produk Harimau',description:'Elakkan produk berasaskan harimau dan didik orang lain',           icon:'block' },
        { title:'Sokong Undang‑undang',description:'Tandatangani petisyen untuk polisi perlindungan lebih kuat',         icon:'assignment' },
        { title:'Pilih Lestari',description:'Pilih produk tanpa pembalakan seperti minyak sawit bersijil RSPO',    icon:'nature' },
        { title:'Kurangkan Plastik',description:'Kurangkan penggunaan plastik yang membahayakan ekosistem',          icon:'recycling' },
        { title:'Ekopelancongan',description:'Lawati kawasan perlindungan untuk meningkatkan dana pemuliharaan',       icon:'camera' }
      ],
      coexistenceTitle: 'Strategi Bersama untuk Harimau Malaya:',
      coexistenceCards:[
        { title:'Anjing Penjaga',description:'Anjing penjaga ternakan mengurangkan serangan harimau di ladang',    icon:'pets' },
        { title:'Skim Pampasan',description:'Pampasan kewangan untuk petani yang kehilangan ternakan',             icon:'payments' },
        { title:'Koridor Hidupan Liar',description:'Menghubungkan hutan terpisah untuk pergerakan harimau yang selamat',icon:'route' },
        { title:'Infrastruktur Mesra Alam',description:'Lintasan hidupan liar di lebuh raya untuk laluan selamat',      icon:'construction' },
        { title:'Amaran SMS',   description:'Memaklumkan penduduk tentang kehadiran harimau berhampiran',        icon:'sms' },
        { title:'Kandang Kalis Pemangsa',description:'Kandang ternakan selamat untuk mencegah serangan harimau',      icon:'security' },
        { title:'Pekerjaan Ekopelancongan',description:'Mewujudkan pekerjaan alternatif selain eksploitasi hutan',    icon:'work' },
        { title:'Produk Bukan Kayu',description:'Madu liar dan produk lain mengurangkan kebergantungan pembalakan', icon:'eco' },
        { title:'Program Pendidikan',description:'Mengajar kanak-kanak tentang keselamatan dan pemuliharaan harimau',icon:'school' },
        { title:'Rondaan Komuniti',description:'Unit rondaan tempatan memantau harimau dan menghalang pemburu haram',icon:'group' },
        { title:'Penguatkuasaan Undang‑undang',description:'Penguatkuasaan ketat undang‑undang anti-pemburuan haram',     icon:'gavel' },
        { title:'Perancangan Guna Tanah',description:'Mengutamakan habitat harimau dalam perancangan pembangunan',   icon:'map' }
      ],
      successTitle:     'Harimau Malaya: Kisah Kejayaan Pemuliharaan',
      successCards:     [
        { title:'Koridor Hidupan Liar Kenyir',description:'Penanaman semula menyambungkan habitat antara Taman Negara dan Tasik Kenyir',icon:'forest' },
        { title:'Kejayaan Royal Belum',description:'Peningkatan rondaan mengurangkan pemburuan haram sebanyak 40% sejak 2019',icon:'security' },
        { title:'Unit Rondaan Komuniti',description:'Pasukan Orang Asli menyingkirkan 1,200 jerangkap pada 2022',                       icon:'group' },
        { title:'Kesan Ekopelancongan',description:'Pelancongan mesra harimau menjana RM5 juta untuk komuniti tempatan pada 2023',icon:'attach-money' }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  // Define each section’s icon, title & cards, plus optional iconColor override
  const sections = [
    { title: text.threatsTitle,    icon: 'warning',            cards: text.threatCards,       iconColor: '#F44336' },
    { title: text.helpTitle,       icon: 'help-outline', cards: text.helpCards },
    { title: text.coexistenceTitle,icon: 'people',             cards: text.coexistenceCards },
    { title: text.successTitle,    icon: 'celebration',        cards: text.successCards,      iconColor: '#4CAF50' }
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
                    borderColor:    isDark ? Colors.dark.border  : Colors.light.border
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
  container:     { flex: 1 },
  content:       { padding: 16, paddingBottom: 32 },

  section:       { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTitle:  { fontSize: 18, fontWeight: '600' },

  cardsGrid:     { gap: 12 },
  card:          {
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
  cardIcon:      { marginRight: 16 },
  cardContent:   { flex: 1 },
  cardTitle:     { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardDescription:{ fontSize: 13, lineHeight: 18 }
});

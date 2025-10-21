// components/lesson/tapir/sections/TapirBehavior.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirBehavior({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      funFactsTitle: "Fun Facts About the Malayan Tapir:",
      funFactsData: [
        { title: "Living Fossils",      description: "Tapirs have existed for over 20 million years, outliving ice ages and mass extinctions (Smithsonian, 2022).",      icon: "history" },
        { title: "Nature's Paintbrush", description: "Their black‑and‑white coloration serves as disruptive camouflage, confusing predators like tigers under moonlight (National Geographic, 2023).", icon: "palette" },
        { title: "Snorkel Noses",       description: "Their flexible snout can act like a snorkel when swimming—a trait shared with elephants (BBC Earth, 2021).",         icon: "air" },
        { title: "Seed Superheroes",    description: "One tapir can disperse thousands of seeds daily, earning them the nickname “gardeners of the forest” (IUCN, 2023).", icon: "eco" },
        { title: "Nighttime Ninjas",    description: "They’re strictly nocturnal, using star-lit paths to navigate dense jungles (WWF Malaysia, 2022).",         icon: "nightlight" },
        { title: "Odd Relatives",       description: "Despite pig‑like looks, they’re closest to horses and rhinos (order Perissodactyla) (San Diego Zoo, 2023).",    icon: "pets" },
        { title: "Baby Stripes",        description: "Calves are born with striped‑and‑spotted coats for camouflage, fading by six months (ScienceDaily, 2021).",   icon: "child-care" },
        { title: "Silent Communicators",description: "They “talk” through high‑pitched whistles—inaudible to humans but clear to tapirs (Journal of Zoology, 2022).", icon: "volume-up" },
        { title: "Aquatic Acrobats",    description: "They can walk underwater along riverbeds to escape predators (Tapir Specialist Group, 2023).",       icon: "pool" },
        { title: "Cultural Icon",       description: "Malaysia’s 50‑ringgit banknote features the tapir, celebrating its conservation status (Bank Negara, 2021).", icon: "account-balance" }
      ],

      reproductionTitle: "Reproduction & Family Life of the Malayan Tapir:",
      reproductionData: [
        { title: "Long Pregnancy",      description: "Females have a 13–14 month gestation—one of the longest among land mammals (San Diego Zoo, 2023).", icon: "schedule" },
        { title: "Striped Camouflage",  description: "Newborns sport light‑brown fur with white stripes/spots for camouflage, fading by six months (National Geographic, 2021).", icon: "palette" },
        { title: "Fast Growers",        description: "Calves triple their weight in weeks and start eating plants at two weeks old (Journal of Mammalogy, 2023).",   icon: "trending-up" },
        { title: "Solitary Dads",       description: "Males play no parental role—mothers raise calves alone (Animal Behaviour, 2021).",                            icon: "person" },
        { title: "Secretive Births",    description: "Mothers hide newborns in dense vegetation for the first weeks (WWF Malaysia, 2023).",                            icon: "visibility-off" },
        { title: "Late Bloomers",       description: "Females mature at 3–4 years, males at 4–5 years (Zoo Biology, 2020).",                                             icon: "hourglass-empty" },
        { title: "Quiet Courtship",     description: "Mating pairs communicate via soft whistles and scent marking (Tapir Conservation, 2023).",                         icon: "favorite" },
        { title: "Low Reproduction Rate",description: "Females breed only every 2–3 years, making population recovery slow (IUCN Red List, 2023).",                        icon: "warning" }
      ],
      funFact: "Tapir calves can swim within hours of birth—a survival trait in flood‑prone rainforests! (BBC Earth, 2022)",

      physiologyTitle: "Physiology & Adaptations of the Malayan Tapir:",
      physiologyData: [
        { title: "Prehensile Snout",    description: "Their flexible, trunk‑like snout can grab leaves, fruits, and underwater plants—acting like a built‑in “fifth limb” (National Geographic, 2023).", icon: "pets" },
        { title: "Unique Coloration",   description: "The black‑and‑white “saddle” pattern breaks their outline in moonlit forests, camouflaging them from predators (Journal of Zoology, 2022).",   icon: "contrast" },
        { title: "Semi‑Aquatic Design", description: "Webbed toes and a streamlined body make them strong swimmers, allowing foraging and escape from threats (Smithsonian, 2021).",             icon: "pool" }
      ],

      behaviorTitle: "Behavior & Intelligence of the Malayan Tapir:",
      behaviorData: [
        { title: "Solitary Lifestyle",  description: "Adults are mostly solitary, only coming together to mate (IUCN Tapir Specialist Group, 2023).",                    icon: "person-outline" },
        { title: "Nocturnal Habits",    description: "Primarily active at night to avoid predators and human disturbance (Journal of Mammalogy, 2022).",      icon: "nightlight" },
        { title: "Strong Swimmers",     description: "They frequently swim and submerge to cool off, escape threats, or forage for aquatic plants (Smithsonian, 2021).", icon: "water" },
        { title: "Scent Marking",       description: "Urine spraying and gland secretions mark territory and communicate (Animal Behaviour, 2023).",                   icon: "location-on" },
        { title: "Vocalizations",       description: "They communicate via high‑pitched whistles and clicks, especially between mothers and calves (Bioacoustics Journal, 2022).", icon: "volume-up" },
        { title: "Memory & Navigation", description: "They remember complex forest trails and water sources, showing strong spatial intelligence (Wildlife Research, 2023).",            icon: "psychology" },
        { title: "Shy but Curious",     description: "Naturally wary of humans, captive tapirs show curiosity and recognize caregivers (Zoo Biology, 2021).",                icon: "search" }
      ]
    },
    
    ms: {
      funFactsTitle: "Fakta Menarik Tentang Tapir Malaya",
      funFactsData: [
        { title: "Fosil Hidup", description: "Tapir telah wujud selama lebih 20 juta tahun, melebihi zaman ais dan kepupusan besar (Smithsonian, 2022).", icon: "history" },
        { title: "Berus Cat Alam", description: "Warna hitam-putih mereka berfungsi sebagai penyamaran yang mengelirukan pemangsa seperti harimau dalam hutan bermandikan cahaya bulan (National Geographic, 2023).", icon: "palette" },
        { title: "Hidung Snorkel", description: "Muncung fleksibel mereka boleh berfungsi seperti snorkel ketika berenang - ciri yang dikongsi dengan sepupu jauh mereka, gajah (BBC Earth, 2021).", icon: "air" },
        { title: "Pahlawan Benih", description: "Seekor tapir boleh menyebarkan beribu-ribu biji benih setiap hari, menjadikan mereka digelar \"tukang kebun hutan\" (IUCN, 2023).", icon: "eco" },
        { title: "Ninja Malam", description: "Mereka benar-benar nokturnal, menggunakan jalan bertuah bintang untuk menavigasi hutan tebal (WWF Malaysia, 2022).", icon: "nightlight" },
        { title: "Saudara Pelik", description: "Walaupun kelihatan seperti babi, mereka paling rapat dengan kuda dan badak (order Perissodactyla) (San Diego Zoo, 2023).", icon: "pets" },
        { title: "Belang Bayi", description: "Anak tapir dilahirkan dengan bulu belang dan bertompok untuk penyamaran, pudar menjelang 6 bulan (ScienceDaily, 2021).", icon: "child-care" },
        { title: "Komunikator Senyap", description: "Mereka \"bercakap\" melalui siulan bernada tinggi - tidak kedengaran oleh manusia tetapi jelas kepada tapir lain (Journal of Zoology, 2022).", icon: "volume-up" },
        { title: "Akrobat Akuatik", description: "Mereka boleh berjalan di bawah air sepanjang dasar sungai untuk melarikan diri dari pemangsa (Tapir Specialist Group, 2023).", icon: "pool" },
        { title: "Ikon Budaya", description: "Wang kertas 50 ringgit Malaysia memaparkan tapir, meraikan status pemuliharaan kebangsaannya (Bank Negara, 2021).", icon: "account-balance" }
      ],

      reproductionTitle: "Reproduksi & Kehidupan Keluarga Tapir Malaya:",
      reproductionData: [
        { title: "Kehamilan Panjang", description: "Betina mengandung selama 13-14 bulan, salah satu tempoh kehamilan terpanjang di kalangan mamalia darat (San Diego Zoo, 2023).", icon: "schedule" },
        { title: "Penyamaran Belang", description: "Anak yang baru lahir mempunyai bulu coklat muda dengan belang/tompok putih untuk penyamaran di hutan, yang akan pudar menjelang usia 6 bulan (National Geographic, 2021).", icon: "palette" },
        { title: "Pertumbuhan Cepat", description: "Anak tapir menambah berat badan tiga kali ganda dalam beberapa minggu dan mula makan tumbuhan pada usia 2 minggu (Journal of Mammalogy, 2023).", icon: "trending-up" },
        { title: "Ayah yang Penyendiri", description: "Jantan tidak terlibat dalam penjagaan anak - ibu membesarkan anak sendirian (Animal Behaviour, 2021).", icon: "person" },
        { title: "Kelahiran Rahsia", description: "Ibu menyembunyikan anak baru lahir dalam tumbuhan tebal untuk beberapa minggu pertama (WWF Malaysia, 2023).", icon: "visibility-off" },
        { title: "Kematangan Lewat", description: "Betina matang pada usia 3-4 tahun, jantan pada 4-5 tahun (Zoo Biology, 2020).", icon: "hourglass-empty" },
        { title: "Pacaran Senyap", description: "Pasangan yang mengawan berkomunikasi melalui siulan lembut dan penandaan bau (Tapir Conservation, 2023).", icon: "favorite" },
        { title: "Kadar Reproduksi Rendah", description: "Betina hanya membiak setiap 2-3 tahun, menyebabkan pemulihan populasi lambat (IUCN Red List, 2023).", icon: "warning" }
      ],
      funFact: "Anak tapir boleh berenang dalam beberapa jam selepas dilahirkan - satu sifat penting untuk bertahan di hutan hujan yang sering banjir! (BBC Earth, 2022)",

      physiologyTitle: "Fisiologi & Adaptasi Tapir Malaya",
      physiologyData: [
        { title: "Muncung Prehensil", description: "Muncung fleksibel seperti belalai mereka boleh mencengkam daun, buah, dan tumbuhan air - berfungsi seperti \"anggota kelima\" (National Geographic, 2023).", icon: "pets" },
        { title: "Warna Unik", description: "Corak \"pelana\" hitam-putih memecahkan siluet mereka dalam hutan bermandikan cahaya bulan, menyamarkan mereka dari pemangsa seperti harimau (Journal of Zoology, 2022).", icon: "contrast" },
        { title: "Reka Bentuk Semi-Akuatik", description: "Jari berselaput dan badan ringkas menjadikan mereka perenang kuat, membolehkan mereka melarikan diri dari ancaman atau mencari makanan di sungai (Smithsonian, 2021).", icon: "pool" }
      ],

      behaviorTitle: "Tingkah Laku & Kecerdasan Tapir Malaya:",
      behaviorData: [
        { title: "Gaya Hidup Bersendirian", description: "Tapir dewasa kebanyakannya bersendirian, hanya berkumpul untuk mengawan (IUCN Tapir Specialist Group, 2023).", icon: "person-outline" },
        { title: "Tabiat Nokturnal", description: "Mereka aktif terutamanya pada waktu malam untuk mengelak pemangsa dan aktiviti manusia (Journal of Mammalogy, 2022).", icon: "nightlight" },
        { title: "Perenang Handal", description: "Tapir sering berenang dan menyelam untuk menyejukkan badan, melarikan diri dari ancaman, atau mencari tumbuhan air (Smithsonian, 2021).", icon: "water" },
        { title: "Penandaan Bau", description: "Mereka menggunakan semburan air kencing dan rembesan kelenjar untuk menanda wilayah dan berkomunikasi (Animal Behaviour, 2023).", icon: "location-on" },
        { title: "Vokalisasi", description: "Tapir berkomunikasi melalui siulan bernada tinggi dan bunyi klik, terutamanya antara ibu dan anak (Bioacoustics Journal, 2022).", icon: "volume-up" },
        { title: "Ingatan & Navigasi", description: "Mereka mengingati laluan hutan yang kompleks dan sumber air, menunjukkan kecerdasan spatial yang kuat (Wildlife Research, 2023).", icon: "psychology" },
        { title: "Pemalu tapi Ingin Tahu", description: "Walaupun secara semula jadi berhati-hati dengan manusia, tapir dalam kurungan menunjukkan sifat ingin tahu dan boleh mengenali penjaga (Zoo Biology, 2021).", icon: "search" }
      ]
    }

    
  };

  const text = content[currentLanguage] || content.en;

  const Card = ({ icon, title, children, highlight }) => (
    <View
      style={[
        styles.card,
        highlight
          ? { borderLeftWidth: 4, borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint }
          : null,
        { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border }
      ]}>
      <MaterialIcons
        name={icon}
        size={24}
        color={highlight ? (isDark ? Colors.dark.tint : Colors.light.tint) : (isDark ? Colors.dark.tint : Colors.light.tint)}
        style={styles.cardIcon}
      />
      <View style={styles.cardContent}>
        <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          {title}
        </ThemedText>
        {typeof children === 'string' ? (
          <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Fun Facts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="star" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.funFactsTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.funFactsData.map((fact, idx) => (
            <Card key={idx} icon={fact.icon} title={fact.title}>
              {fact.description}
            </Card>
          ))}
        </View>
      </View>

      {/* Reproduction & Family Life */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="family-restroom" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.reproductionTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.reproductionData.map((item, idx) => (
            <Card key={idx} icon={item.icon} title={item.title}>
              {item.description}
            </Card>
          ))}
          {/* Swimming fun fact highlight */}
          <Card icon="lightbulb" title="Fun Fact:" highlight>
            {text.funFact}
          </Card>
        </View>
      </View>

      {/* Physiology & Adaptations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="biotech" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.physiologyTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.physiologyData.map((item, idx) => (
            <Card
              key={idx}
              icon={item.icon}
              title={item.title}
              highlight>
              {item.description}
            </Card>
          ))}
        </View>
      </View>

      {/* Behavior & Intelligence */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="psychology" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.behaviorTitle}
          </ThemedText>
        </View>
        <View style={styles.cardsGrid}>
          {text.behaviorData.map((item, idx) => (
            <Card key={idx} icon={item.icon} title={item.title}>
              {item.description}
            </Card>
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
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: { marginRight: 16, marginTop: 4 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20 },
});

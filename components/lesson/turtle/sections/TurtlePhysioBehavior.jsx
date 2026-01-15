// components/lesson/turtle/sections/TurtlePhysioBehavior.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const getReproIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('mating') || t.includes('mengawan')) return 'favorite';
  if (t.includes('nesting') || t.includes('penetasan telur')) return 'beach-access';
  if (t.includes('clutch') || t.includes('bilangan telur')) return 'egg';
  if (t.includes('incubation') || t.includes('inkubasi')) return 'timer';
  if (t.includes('hatchling') || t.includes('anak penyu')) return 'dark-mode';
  if (t.includes('juvenile') || t.includes('juvenil')) return 'directions-boat';
  if (t.includes('longevity') || t.includes('kematangan')) return 'schedule';
  return 'child-care';
};

const getPhysioIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('streamlined') || t.includes('aerodinamik')) return 'speed';
  if (t.includes('flippers') || t.includes('sirip')) return 'fitness-center';
  if (t.includes('lungs') || t.includes('paru')) return 'air';
  if (t.includes('salt glands') || t.includes('kelenjar garam')) return 'opacity';
  if (t.includes('coloration') || t.includes('pewarnaan')) return 'color-lens';
  if (t.includes('temperature') || t.includes('suhu')) return 'thermostat';
  if (t.includes('magnetic') || t.includes('magnetik')) return 'explore';
  return 'science';
};

const getBehaviorIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('migratory') || t.includes('migrasi')) return 'flight';
  if (t.includes('homing') || t.includes('homing natal')) return 'home';
  if (t.includes('social') || t.includes('sosial')) return 'groups';
  if (t.includes('feeding') || t.includes('pemakanan')) return 'restaurant';
  if (t.includes('avoidance') || t.includes('elak')) return 'directions-run';
  if (t.includes('cognitive') || t.includes('kognitif')) return 'psychology';
  if (t.includes('resting') || t.includes('berehat')) return 'hotel';
  return 'pets';
};

export default function TurtlePhysioBehavior({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      reproductionTitle: 'Reproduction & Family Life of the Green Sea Turtle',
      reproductionData: [
        'Mating Behavior: Green Sea Turtles mate in shallow coastal waters near nesting beaches, typically during the breeding season. (Spotila, 2004)',
        'Nesting: Females return to the same beach where they were born (natal homing) to lay eggs, often at night. (Seminoff, 2023)',
        'Clutch Size: Each female lays 80–120 eggs per nest, and nests multiple times (up to 7) during a single season. (Lutz & Musick, 1997)',
        'Incubation Period: Eggs incubate for ~60 days; the sand temperature influences the sex of the hatchlings (warmer sand = more females). (NOAA fisheries, 2023)',
        'Hatchling Emergence: Hatchlings emerge at night to avoid predators and use moonlight to navigate toward the ocean. (WWF, 2023)',
        'Juvenile Stage: Juveniles drift in ocean currents for several years, feeding on plankton before moving to coastal habitats. (Lutz et al., 2002)',
        'Longevity and Maturity: Green Sea Turtles reach sexual maturity after 20–50 years and can live for 60–70 years. (Spotila, 2004)'
      ],
      physioTitle: 'Physiology & Adaptations of the Green Sea Turtle',
      physioData: [
        'Streamlined Shell: The smooth, heart-shaped carapace reduces water resistance, aiding efficient swimming. (Lutz & Musick, 1997)',
        'Powerful Flippers: Forelimbs are adapted as flippers for long-distance swimming in oceans. (NOAA fisheries, 2023)',
        'Lungs for Diving: Large, efficient lungs allow them to hold their breath for hours while resting underwater. (Spotila, 2004)',
        'Salt Glands: Specialized glands near the eyes excrete excess salt from seawater, enabling life in saline environments. (Bjorndal, 1997)',
        'Coloration: The greenish hue of their fat, from which they get their name, helps in camouflage among seagrass beds. (WWF, 2025)',
        'Temperature Regulation: Ectothermic physiology relies on external temperatures, driving behaviors like basking in the sun. (Spotila, 2004)',
        'Magnetic Navigation: Use Earth\'s magnetic fields to navigate thousands of kilometers between feeding and nesting sites. (NOAA fisheries, 2023)'
      ],
      behaviorTitle: 'Behavior & Intelligence of the Green Sea Turtle',
      behaviorData: [
        'Migratory Behavior: Green Sea turtles undertake long migrations between feeding grounds and nesting beaches, sometimes crossing entire oceans. (Spotila, 2004)',
        'Natal Homing: They exhibit remarkable memory and precision, returning to the exact beach where they were born to lay eggs. (Seminoff, 2023)',
        'Social Behavior: Typically, solitary but congregated in large numbers at nesting and feeding sites. (NOAA fisheries, 2023)',
        'Feeding Habits: Demonstrate selective feeding, preferring seagrasses and algae, which they crop carefully without uprooting. (Bjorndal, 1997)',
        'Avoidance of Predators: Hatchlings use coordinated emergence and instinctive navigation to evade predators and reach the sea. (WWF, 2023)',
        'Cognitive Abilities: Possess spatial awareness and navigation skills, relying on Earth\'s magnetic fields and visual cues. (Lutz & Musick, 1997)',
        'Resting Behavior: Rest in underwater caves, crevices, or floating on the surface, showing adaptability to different environments. (NOAA fisheries, 2023)'
      ]
    },
    ms: {
      reproductionTitle: 'Pembiakan & Kehidupan Keluarga Penyu Agar',
      reproductionData: [
        'Kelakuan Mengawan: Penyu Agar mengawan di perairan pantai cetek berhampiran pantai penetasan, biasanya semasa musim pembiakan. (Spotila, 2004)',
        'Penetasan Telur: Betina kembali ke pantai yang sama tempat mereka dilahirkan (homing natal) untuk bertelur, selalunya pada waktu malam. (Seminoff, 2023)',
        'Bilangan Telur: Setiap betina bertelur 80–120 biji telur setiap sarang, dan bersarang beberapa kali (sehingga 7 kali) dalam satu musim. (Lutz & Musick, 1997)',
        'Tempoh Inkubasi: Telur mengambil masa ~60 hari untuk menetas; suhu pasir mempengaruhi jantina anak penyu (pasir lebih panas = lebih banyak betina). (NOAA fisheries, 2023)',
        'Kemunculan Anak Penyu: Anak penyu menetas pada waktu malam untuk mengelak pemangsa dan menggunakan cahaya bulan untuk navigasi ke laut. (WWF, 2023)',
        'Peringkat Juvenil: Anak penyu hanyut dalam arus laut selama beberapa tahun, memakan plankton sebelum berpindah ke habitat pantai. (Lutz et al., 2002)',
        'Kematangan dan Umur: Penyu Agar mencapai kematangan seksual selepas 20–50 tahun dan boleh hidup selama 60–70 tahun. (Spotila, 2004)'
      ],
      physioTitle: 'Fisiologi & Penyesuaian Penyu Agar',
      physioData: [
        'Cengkerang Aerodinamik: Karapas licin berbentuk hati mengurangkan rintangan air, membantu renangan yang cekap. (Lutz & Musick, 1997)',
        'Sirip Kuat: Anggota hadapan disesuaikan sebagai sirip untuk renangan jarak jauh di lautan. (NOAA fisheries, 2023)',
        'Paru-paru untuk Menyelam: Paru-paru besar dan cekap membolehkan mereka menahan nafas selama berjam-jam semasa berehat di bawah air. (Spotila, 2004)',
        'Kelenjar Garam: Kelenjar khusus berhampiran mata mengeluarkan garam berlebihan dari air laut, membolehkan kehidupan dalam persekitaran masin. (Bjorndal, 1997)',
        'Pewarnaan Tubuh: Warna kehijauan lemak mereka, dari mana mereka mendapat nama, membantu penyamaran di antara padang rumpai laut. (WWF, 2025)',
        'Pengawalan Suhu: Fisiologi ektoterma bergantung kepada suhu luaran, mendorong tingkah laku seperti berjemur di bawah matahari. (Spotila, 2004)',
        'Navigasi Magnetik: Menggunakan medan magnet Bumi untuk navigasi beribu-ribu kilometer antara tapak makan dan penetasan. (NOAA fisheries, 2023)'
      ],
      behaviorTitle: 'Tingkah Laku & Kecerdasan Penyu Agar',
      behaviorData: [
        'Tingkah Laku Migrasi: Penyu Agar melakukan migrasi jauh antara kawasan makan dan pantai penetasan, kadang-kadang merentasi seluruh lautan. (Spotila, 2004)',
        'Homing Natal: Mereka menunjukkan ingatan dan ketepatan yang luar biasa, kembali ke pantai yang tepat di mana mereka dilahirkan untuk bertelur. (Seminoff, 2023)',
        'Tingkah Laku Sosial: Biasanya bersendirian, tetapi berkumpul dalam jumlah besar di tapak penetasan dan makan. (NOAA fisheries, 2023)',
        'Tabiat Pemakanan: Menunjukkan pemakanan terpilih, memilih rumpai laut dan alga, yang mereka potong dengan berhati-hati tanpa mencabut akar. (Bjorndal, 1997)',
        'Mengelak Pemangsa: Anak penyu menggunakan kemunculan yang diselaraskan dan navigasi naluri untuk mengelak pemangsa dan mencapai laut. (WWF, 2023)',
        'Keupayaan Kognitif: Mempunyai kesedaran ruang dan kemahiran navigasi, bergantung kepada medan magnet Bumi dan petunjuk visual. (Lutz & Musick, 1997)',
        'Tingkah Laku Berehat: Berehat di gua bawah air, celah, atau terapung di permukaan, menunjukkan kebolehsuaian kepada persekitaran yang berbeza. (NOAA fisheries, 2023)'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const renderCard = (line, section, idx) => {
    const [title, ...rest] = line.split(': ');
    const description = rest.join(': ');
    const iconName = (
      section === 'repro' ? getReproIcon(title)
      : section === 'physio' ? getPhysioIcon(title)
      : getBehaviorIcon(title)
    );

    return (
      <View
        key={`${section}-${idx}`}
        style={[
          styles.card,
          {
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}
      >
        <MaterialIcons
          name={iconName}
          size={24}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
          style={styles.cardIcon}
        />
        <View style={styles.cardContent}>
          <ThemedText style={[styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {title}
          </ThemedText>
          <ThemedText style={[styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            {description}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Reproduction */}
      <View style={styles.section}>
        <View style={styles.header}>
          <MaterialIcons name="child-care" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.reproductionTitle}
          </ThemedText>
        </View>
        {text.reproductionData.map((line, i) => renderCard(line, 'repro', i))}
      </View>

      {/* Physiology */}
      <View style={styles.section}>
        <View style={styles.header}>
          <MaterialIcons name="science" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.physioTitle}
          </ThemedText>
        </View>
        {text.physioData.map((line, i) => renderCard(line, 'physio', i))}
      </View>

      {/* Behavior */}
      <View style={styles.section}>
        <View style={styles.header}>
          <MaterialIcons name="pets" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.behaviorTitle}
          </ThemedText>
        </View>
        {text.behaviorData.map((line, i) => renderCard(line, 'behavior', i))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', flex: 1 },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 12,
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
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  cardDescription: { fontSize: 14, lineHeight: 20 }
});
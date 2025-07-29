// components/lesson/turtle/sections/TurtlePhysioBehavior.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Icon lookups for each subsection
const getReproIcon = (title) => {
  const t = title.toLowerCase();
  // English
  if (t.includes('mating'))          return 'favorite';
  if (t.includes('nesting'))         return 'beach-access';
  if (t.includes('clutch'))          return 'egg';
  if (t.includes('incubation'))      return 'timer';
  if (t.includes('hatchling'))       return 'dark-mode';
  if (t.includes('juvenile'))        return 'directions-boat';
  if (t.includes('longevity'))       return 'schedule';
  // Malay
  if (t.includes('mengawan'))        return 'favorite';
  if (t.includes('penetasan telur')) return 'beach-access';
  if (t.includes('bilangan telur'))  return 'egg';
  if (t.includes('inkubasi'))        return 'timer';
  if (t.includes('anak penyu'))      return 'dark-mode';
  if (t.includes('juvenil'))         return 'directions-boat';
  if (t.includes('kematangan'))      return 'schedule';
  return 'child-care';
};

const getPhysioIcon = (title) => {
  const t = title.toLowerCase();
  // English
  if (t.includes('streamlined'))    return 'speed';
  if (t.includes('flippers'))       return 'fitness-center';
  if (t.includes('lungs'))          return 'air';
  if (t.includes('salt glands'))    return 'opacity';
  if (t.includes('coloration'))     return 'color-lens';
  if (t.includes('temperature'))    return 'thermostat';
  if (t.includes('magnetic'))       return 'explore';
  // Malay
  if (t.includes('aerodinamik'))    return 'speed';
  if (t.includes('sirip'))          return 'fitness-center';
  if (t.includes('paru'))           return 'air';
  if (t.includes('kelenjar garam')) return 'opacity';
  if (t.includes('pewarnaan'))      return 'color-lens';
  if (t.includes('suhu'))           return 'thermostat';
  if (t.includes('magnetik'))       return 'explore';
  return 'science';
};

const getBehaviorIcon = (title) => {
  const t = title.toLowerCase();
  // English
  if (t.includes('migratory'))     return 'flight';
  if (t.includes('homing'))        return 'home';
  if (t.includes('social'))        return 'groups';
  if (t.includes('feeding'))       return 'restaurant';
  if (t.includes('avoidance'))     return 'directions-run';
  if (t.includes('cognitive'))     return 'psychology';
  if (t.includes('resting'))       return 'hotel';
  // Malay
  if (t.includes('migrasi'))       return 'flight';
  if (t.includes('homing natal'))  return 'home';
  if (t.includes('sosial'))        return 'groups';
  if (t.includes('pemakanan'))     return 'restaurant';
  if (t.includes('elak'))          return 'directions-run';
  if (t.includes('kognitif'))      return 'psychology';
  if (t.includes('berehat'))       return 'hotel';
  return 'pets';
};

export default function TurtlePhysioBehavior({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const content = {
    en: {
      reproductionTitle: 'Reproduction & Family Life',
      reproductionData: [
        'Mating Behavior: Green Sea Turtles mate in shallow coastal waters near nesting beaches, typically during the breeding season. (Spotila, 2004)',
        'Nesting: Females return to the same beach where they were born (natal homing) to lay eggs, often at night. (IUCN, 2023)',
        'Clutch Size: Each female lays 80–120 eggs per nest, and nests multiple times (up to 7) during a single season. (Lutz & Musick, 1997)',
        'Incubation Period: Eggs incubate for ~60 days; the sand temperature influences the sex of the hatchlings (warmer sand = more females). (NOAA, 2023)',
        'Hatchling Emergence: Hatchlings emerge at night to avoid predators and use moonlight to navigate toward the ocean. (WWF, 2023)',
        'Juvenile Stage: Juveniles drift in ocean currents for several years, feeding on plankton before moving to coastal habitats. (Bjorndal et al., 2003)',
        'Longevity & Maturity: Green Sea Turtles reach sexual maturity after 20–50 years and can live for 60–70 years. (Spotila, 2004)'
      ],
      physioTitle: 'Physiology & Adaptations',
      physioData: [
        'Streamlined Shell: The smooth, heart‑shaped carapace reduces water resistance, aiding efficient swimming. (Lutz & Musick, 1997)',
        'Powerful Flippers: Forelimbs are adapted as flippers for long‑distance swimming in oceans. (NOAA, 2023)',
        'Lungs for Diving: Large, efficient lungs allow them to hold their breath for hours while resting underwater. (Spotila, 2004)',
        'Salt Glands: Specialized glands near the eyes excrete excess salt from seawater, enabling life in saline environments. (Bjorndal, 1997)',
        'Coloration: The greenish hue of their fat helps camouflage among seagrass beds. (WWF, 2023)',
        'Temperature Regulation: Ectothermic physiology relies on external temperatures, driving behaviors like basking in the sun. (IUCN, 2023)',
        'Magnetic Navigation: Use Earth’s magnetic fields to navigate thousands of kilometers. (NOAA, 2023)'
      ],
      behaviorTitle: 'Behavior & Intelligence',
      behaviorData: [
        'Migratory Behavior: Green Sea Turtles undertake long migrations between feeding grounds and nesting beaches. (Spotila, 2004)',
        'Natal Homing: They return to the exact beach where they were born to lay eggs. (IUCN, 2023)',
        'Social Behavior: Typically solitary, but congregate in large numbers at nesting and feeding sites. (NOAA, 2023)',
        'Feeding Habits: Selective feeding on seagrasses and algae without uprooting. (Bjorndal, 1997)',
        'Avoidance of Predators: Hatchlings use coordinated emergence and instinctive navigation to evade predators. (WWF, 2023)',
        'Cognitive Abilities: Possess spatial awareness and navigation skills using magnetic and visual cues. (Lutz & Musick, 1997)',
        'Resting Behavior: Rest in underwater caves, crevices, or float at the surface. (NOAA, 2023)'
      ]
    },
    ms: {
      reproductionTitle: 'Pembiakan & Kehidupan Keluarga',
      reproductionData: [
        'Kelakuan Mengawan: Penyu Agar mengawan di perairan pantai cetek berhampiran pantai penetasan. (Spotila, 2004)',
        'Penetasan Telur: Betina kembali ke pantai kelahiran (honing natal) untuk bertelur. (IUCN, 2023)',
        'Bilangan Telur: Setiap sarang mengandungi 80–120 telur dan boleh bersarang hingga 7 kali. (Lutz & Musick, 1997)',
        'Tempoh Inkubasi: Telur mengambil masa ~60 hari; suhu pasir mempengaruhi jantina anak penyu. (NOAA, 2023)',
        'Kemunculan Anak Penyu: Anak penyu menetas pada waktu malam untuk elak pemangsa. (WWF, 2023)',
        'Peringkat Juvenil: Anak penyu hanyut dalam arus laut selama beberapa tahun. (Bjorndal et al., 2003)',
        'Kematangan & Umur: Kematangan seksual antara 20–50 tahun; hayat sehingga 60–70 tahun. (Spotila, 2004)'
      ],
      physioTitle: 'Fisiologi & Penyesuaian',
      physioData: [
        'Cengkerang Aerodinamik: Karapas berbentuk hati mengurangkan rintangan air. (Lutz & Musick, 1997)',
        'Sirip Kuat: Anggota hadapan berubah menjadi sirip untuk renangan jarak jauh. (NOAA, 2023)',
        'Paru-paru Menyelam: Paru-paru besar membolehkan penyu menahan nafas berjam‑jam. (Spotila, 2004)',
        'Kelenjar Garam: Menyingkirkan garam berlebihan daripada air laut. (Bjorndal, 1997)',
        'Pewarnaan Tubuh: Warna kehijauan membantu penyamaran di padang rumpai laut. (WWF, 2023)',
        'Pengawalan Suhu: Bergantung kepada suhu luar untuk aktiviti seperti berjemur. (IUCN, 2023)',
        'Navigasi Magnetik: Menggunakan medan magnet Bumi untuk panduan. (NOAA, 2023)'
      ],
      behaviorTitle: 'Tingkah Laku & Kecerdasan',
      behaviorData: [
        'Migrasi: Melakukan migrasi jauh antara kawasan makan dan pantai penetasan. (Spotila, 2004)',
        'Homing Natal: Kembali ke pantai kelahiran dengan tepat. (IUCN, 2023)',
        'Sosial: Bersendirian tetapi berkumpul di kawasan penetasan dan makan. (NOAA, 2023)',
        'Pemakanan: Memilih rumpai laut dan alga tanpa mencabut akar. (Bjorndal, 1997)',
        'Elak Pemangsa: Anak penyu menggunakan naluri dan cahaya bulan untuk elak pemangsa. (WWF, 2023)',
        'Kognitif: Kebolehan navigasi berdasarkan medan magnet dan petunjuk visual. (Lutz & Musick, 1997)',
        'Berehat: Berehat di gua bawah air atau terapung di permukaan. (NOAA, 2023)'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const renderCard = (line, section, idx) => {
    const [ title, ...rest ] = line.split(': ');
    const description = rest.join(': ');
    const iconName = (
      section === 'repro'   ? getReproIcon(title)
    : section === 'physio'  ? getPhysioIcon(title)
                           : getBehaviorIcon(title)
    );

    return (
      <View
        key={`${section}-${idx}`}
        style={[
          styles.card,
          {
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor:     isDark ? Colors.dark.border  : Colors.light.border
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
  container:      { flex: 1 },
  content:        { padding: 16, paddingBottom: 32 },

  section:        { marginBottom: 32 },      // more space below sections
  header:         { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  title:          { fontSize: 18, fontWeight: '600' },

  card: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    padding:        16,
    marginBottom:   12,
    borderRadius:   12,
    borderWidth:    1,
    shadowColor:    '#000',
    shadowOffset:   { width: 0, height: 1 },
    shadowOpacity:  0.05,
    shadowRadius:   2,
    elevation:      2
  },
  cardIcon:       { marginRight: 16, marginTop: 4 },
  cardContent:    { flex: 1 },
  cardTitle:      { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  cardDescription:{ fontSize: 14, lineHeight: 20 }
});

// components/lesson/turtle/sections/TurtleThreatsHelpCons.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Icons for the three subsections
const getThreatIcon = (title) => {
  const t = title.toLowerCase();
  // English
  if (t.includes('habitat loss'))    return 'forest';
  if (t.includes('bycatch'))         return 'directions-boat';
  if (t.includes('pollution'))       return 'cloud';
  if (t.includes('climate change'))  return 'thermostat';
  if (t.includes('illegal trade'))   return 'gavel';
  if (t.includes('diseases'))        return 'medical-services';
  if (t.includes('boat strikes'))    return 'directions-boat';
  // Malay
  if (t.includes('kehilangan habitat')) return 'forest';
  if (t.includes('tangkapan sampingan')) return 'directions-boat';
  if (t.includes('pencemaran'))        return 'cloud';
  if (t.includes('perubahan iklim'))   return 'thermostat';
  if (t.includes('perdagangan haram')) return 'gavel';
  if (t.includes('penyakit'))          return 'medical-services';
  if (t.includes('pelanggaran bot'))   return 'directions-boat';
  return 'dangerous';
};

const getHelpIcon = (title) => {
  const t = title.toLowerCase();
  // English
  if (t.includes('protect nesting'))  return 'beach-access';
  if (t.includes('reduce bycatch'))   return 'directions-boat';
  if (t.includes('combat pollution')) return 'recycling';
  if (t.includes('mitigate climate')) return 'device-thermostat';
  if (t.includes('ban illegal'))      return 'gavel';
  if (t.includes('raise awareness'))  return 'campaign';
  if (t.includes('support conservation')) return 'support-agent';
  // Malay
  if (t.includes('lindungi pantai'))           return 'beach-access';
  if (t.includes('kurangkan tangkapan sampingan')) return 'directions-boat';
  if (t.includes('banteras pencemaran'))       return 'recycling';
  if (t.includes('atasi perubahan iklim'))     return 'device-thermostat';
  if (t.includes('haramkan perdagangan'))      return 'gavel';
  if (t.includes('sebarkan kesedaran'))        return 'campaign';
  if (t.includes('sokong program pemuliharaan')) return 'support-agent';
  return 'help-outline';
};

const getConsIcon = (title) => {
  const t = title.toLowerCase();
  // English
  if (t.includes('marine protected'))    return 'map';
  if (t.includes('sustainable fishing'))  return 'anchor';
  if (t.includes('habitat restoration'))  return 'grass';
  if (t.includes('legislation'))          return 'gavel';
  if (t.includes('climate adaptation'))   return 'device-thermostat';
  if (t.includes('community engagement')) return 'group';
  if (t.includes('research'))             return 'science';
  // Malay
  if (t.includes('kawasan perlindungan marin')) return 'map';
  if (t.includes('amalan perikanan lestari'))   return 'anchor';
  if (t.includes('pemulihan habitat'))          return 'grass';
  if (t.includes('undang‑undang') || t.includes('penguatkuasaan')) return 'gavel';
  if (t.includes('langkah penyesuaian iklim'))   return 'device-thermostat';
  if (t.includes('penglibatan komuniti'))       return 'group';
  if (t.includes('penyelidikan') || t.includes('pemantauan'))     return 'science';
  return 'policy';
};

export default function TurtleThreatsHelpCons({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    // This will match "Chelonia mydas" and other turtle scientific names
    const scientificNamePattern = /(Chelonia\s+mydas|Chelonia\s+\w+)/g;
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

  const content = {
    en: {
      threatsTitle: 'Threats to Chelonia mydas (Green Sea Turtle)',
      threatsData: [
        'Habitat Loss: Coastal development and tourism destroy nesting and feeding habitats. (IUCN, 2023)',
        'Bycatch: Accidental capture in fishing gear such as nets and longlines results in injuries or death. (NOAA, 2023)',
        'Pollution: Plastic waste ingestion and oil spills harm turtles directly or degrade their habitats. (Lutz & Musick, 1997)',
        'Climate Change: Rising temperatures affect sex ratios of hatchlings and cause habitat changes due to rising sea levels. (Spotila, 2004)',
        'Illegal Trade: Poaching for meat, eggs, and shells contributes to population decline. (WWF, 2023)',
        'Diseases: Fibropapillomatosis, a disease associated with environmental degradation, affects turtle health. (Bjorndal et al., 2003)',
        'Boat Strikes: Collisions with boats cause severe injuries or fatalities, especially in coastal regions. (NOAA, 2023)'
      ],
      helpTitle: 'How You Can Help Save the Green Sea Turtle',
      helpData: [
        'Protect Nesting Beaches: Establish protected areas to prevent human disturbances during nesting. (IUCN, 2023)',
        'Reduce Bycatch: Use turtle excluder devices (TEDs) in fishing gear to minimize accidental captures. (NOAA, 2023)',
        'Combat Pollution: Reduce plastic use, promote recycling, and conduct ocean cleanup drives to prevent pollution. (WWF, 2023)',
        'Mitigate Climate Change: Support policies that reduce carbon emissions and protect coastal habitats from sea level rise. (Spotila, 2004)',
        'Ban Illegal Trade: Enforce laws against poaching and the sale of turtle products. (Lutz & Musick, 1997)',
        'Raise Awareness: Educate local communities and tourists about the importance of turtles in ecosystems. (WWF, 2023)',
        'Support Conservation Programs: Fund and volunteer for initiatives that rescue injured turtles and monitor populations. (NOAA, 2023)'
      ],
      consTitle: 'Conservation Strategies for the Green Sea Turtle',
      consData: [
        'Marine Protected Areas (MPAs): Establish and enforce MPAs to safeguard critical habitats such as nesting and feeding grounds. (IUCN, 2023)',
        'Sustainable Fishing Practices: Implement turtle excluder devices (TEDs) and enforce bycatch reduction measures. (NOAA, 2023)',
        'Habitat Restoration: Rehabilitate degraded nesting beaches and seagrass meadows to support turtle populations. (WWF, 2023)',
        'Legislation and Enforcement: Strengthen laws against poaching, illegal trade, and habitat destruction. (Lutz & Musick, 1997)',
        'Climate Adaptation Measures: Implement strategies to manage rising temperatures and protect coastal nesting sites from sea level rise. (Spotila, 2004)',
        'Community Engagement: Involve local communities in conservation efforts through education and eco‑tourism initiatives. (WWF, 2023)',
        'Research and Monitoring: Conduct studies to track turtle populations, migration patterns, and health for data‑driven strategies. (NOAA, 2023)'
      ]
    },
    ms: {
      threatsTitle: 'Ancaman terhadap Chelonia mydas (Penyu Agar)',
      threatsData: [
        'Kehilangan Habitat: Pembangunan pantai dan pelancongan memusnahkan habitat penetasan dan kawasan makan. (IUCN, 2023)',
        'Tangkapan Sampingan: Tertangkap secara tidak sengaja dalam peralatan perikanan seperti pukat dan tali panjang, menyebabkan kecederaan atau kematian. (NOAA, 2023)',
        'Pencemaran: Pengambilan sampah plastik dan tumpahan minyak merosakkan penyu atau habitatnya. (Lutz & Musick, 1997)',
        'Perubahan Iklim: Peningkatan suhu mempengaruhi nisbah jantina anak penyu dan mengubah habitat akibat kenaikan paras laut. (Spotila, 2004)',
        'Perdagangan Haram: Pemburuan untuk daging, telur, dan cengkerang menyumbang kepada kemerosotan populasi. (WWF, 2023)',
        'Penyakit: Fibropapillomatosis, penyakit berkaitan kemerosotan alam sekitar, menjejaskan kesihatan penyu. (Bjorndal et al., 2003)',
        'Pelanggaran Bot: Perlanggaran dengan bot menyebabkan kecederaan serius atau kematian, terutamanya di kawasan pantai. (NOAA, 2023)'
      ],
      helpTitle: 'Bagaimana Anda Boleh Membantu Menyelamatkan Penyu Agar',
      helpData: [
        'Lindungi Pantai Penetasan: Wujudkan kawasan terpelihara untuk mengelakkan gangguan manusia semasa penetasan. (IUCN, 2023)',
        'Kurangkan Tangkapan Sampingan: Guna peranti ekskluder penyu (TEDs) dalam peralatan tangkapan untuk mengurangkan tangkapan sampingan. (NOAA, 2023)',
        'Banteras Pencemaran: Kurangkan penggunaan plastik, galakkan kitar semula, dan anjurkan pembersihan lautan. (WWF, 2023)',
        'Atasi Perubahan Iklim: Sokong dasar yang mengurangkan pelepasan karbon dan lindungi habitat pantai daripada kenaikan paras laut. (Spotila, 2004)',
        'Haramkan Perdagangan Haram: Tegakkan undang‑undang terhadap pemburuan haram dan penjualan produk penyu. (Lutz & Musick, 1997)',
        'Sebarkan Kesedaran: Didik komuniti setempat dan pelancong tentang kepentingan penyu dalam ekosistem. (WWF, 2023)',
        'Sokong Program Pemuliharaan: Derma dan jadi sukarelawan untuk inisiatif menyelamatkan penyu cedera dan memantau populasi. (NOAA, 2023)'
      ],
      consTitle: 'Strategi Pemuliharaan untuk Penyu Agar',
      consData: [
        'Kawasan Perlindungan Marin (MPAs): Tubuhkan dan kuatkuasakan MPA untuk melindungi habitat kritikal seperti tapak penetasan dan pemakanan. (IUCN, 2023)',
        'Amalan Perikanan Lestari: Guna TEDs dan kuatkuasakan langkah pengurangan tangkapan sampingan. (NOAA, 2023)',
        'Pemulihan Habitat: Pulihkan pantai penetasan dan padang rumpai laut yang terjejas untuk menyokong populasi penyu. (WWF, 2023)',
        'Undang‑undang & Penguatkuasaan: Kukuhkan undang‑undang terhadap pemburuan haram, perdagangan haram, dan kemusnahan habitat. (Lutz & Musick, 1997)',
        'Langkah Penyesuaian Iklim: Laksanakan strategi untuk menguruskan peningkatan suhu dan lindungi tapak penetasan daripada kenaikan paras laut. (Spotila, 2004)',
        'Penglibatan Komuniti: Libatkan komuniti setempat melalui pendidikan dan pelancongan mesra alam. (WWF, 2023)',
        'Penyelidikan & Pemantauan: Jalankan kajian untuk menjejak populasi, corak migrasi, dan kesihatan penyu. (NOAA, 2023)'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const renderCard = (line, section, idx) => {
    const [ title, ...rest ] = line.split(': ');
    const description = rest.join(': ');
    const iconName = (
      section === 'threats' ? getThreatIcon(title)
      : section === 'help'    ? getHelpIcon(title)
      :                         getConsIcon(title)
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
          {/* 🔥 UPDATED: Card title with scientific names in italic */}
          {renderTextWithScientificNames(
            title,
            [styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]
          )}
          
          {/* 🔥 UPDATED: Card description with scientific names in italic */}
          {renderTextWithScientificNames(
            description,
            [styles.cardDescription, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Threats */}
      <View style={styles.section}>
        <View style={styles.header}>
          <MaterialIcons name="dangerous" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          
          {/* 🔥 UPDATED: Section title with scientific names in italic */}
          {renderTextWithScientificNames(
            text.threatsTitle,
            [styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]
          )}
        </View>
        {text.threatsData.map((line, i) => renderCard(line, 'threats', i))}
      </View>

      {/* Help */}
      <View style={styles.section}>
        <View style={styles.header}>
          <MaterialIcons name="support-agent" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.helpTitle}
          </ThemedText>
        </View>
        {text.helpData.map((line, i) => renderCard(line, 'help', i))}
      </View>

      {/* Conservation Strategies */}
      <View style={styles.section}>
        <View style={styles.header}>
          <MaterialIcons name="policy" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.consTitle}
          </ThemedText>
        </View>
        {text.consData.map((line, i) => renderCard(line, 'cons', i))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  content:        { padding: 16, paddingBottom: 32 },

  section:        { marginBottom: 32 },    // extra gap below each section

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
  cardTitle:      { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription:{ fontSize: 14, lineHeight: 20 }
});
// components/lesson/turtle/sections/TurtleThreatsHelpCons.jsx

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const getThreatIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('habitat loss') || t.includes('kehilangan habitat')) return 'forest';
  if (t.includes('bycatch') || t.includes('tangkapan sampingan')) return 'directions-boat';
  if (t.includes('pollution') || t.includes('pencemaran')) return 'cloud';
  if (t.includes('climate change') || t.includes('perubahan iklim')) return 'thermostat';
  if (t.includes('illegal trade') || t.includes('perdagangan haram')) return 'gavel';
  if (t.includes('diseases') || t.includes('penyakit')) return 'medical-services';
  if (t.includes('boat strikes') || t.includes('pelanggaran bot')) return 'directions-boat';
  return 'dangerous';
};

const getHelpIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('protect nesting') || t.includes('lindungi pantai')) return 'beach-access';
  if (t.includes('reduce bycatch') || t.includes('kurangkan tangkapan')) return 'directions-boat';
  if (t.includes('combat pollution') || t.includes('banteras pencemaran')) return 'recycling';
  if (t.includes('mitigate climate') || t.includes('atasi perubahan iklim')) return 'device-thermostat';
  if (t.includes('ban illegal') || t.includes('haramkan perdagangan')) return 'gavel';
  if (t.includes('raise awareness') || t.includes('sebarkan kesedaran')) return 'campaign';
  if (t.includes('support conservation') || t.includes('sokong program')) return 'support-agent';
  return 'help-outline';
};

const getConsIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('marine protected') || t.includes('kawasan perlindungan marin')) return 'map';
  if (t.includes('sustainable fishing') || t.includes('amalan perikanan lestari')) return 'anchor';
  if (t.includes('habitat restoration') || t.includes('pemulihan habitat')) return 'grass';
  if (t.includes('legislation') || t.includes('undang-undang')) return 'gavel';
  if (t.includes('climate adaptation') || t.includes('langkah penyesuaian iklim')) return 'device-thermostat';
  if (t.includes('community engagement') || t.includes('penglibatan komuniti')) return 'group';
  if (t.includes('research') || t.includes('penyelidikan')) return 'science';
  return 'policy';
};

export default function TurtleThreatsHelpCons({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const scientificNamePattern = /(Chelonia\s+mydas)/g;
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
      threatsTitle: 'Threats to Green Sea turtle',
      threatsData: [
        'Habitat Loss: Coastal development and tourism destroy nesting and feeding habitats. (Silva et al., 2015)',
        'Bycatch: Accidental capture in fishing gear such as nets and longlines results in injuries or death. (NOAA fisheries, 2023)',
        'Pollution: Plastic waste ingestion and oil spills harm turtles directly or degrade their habitats. (NOAA fisheries, 2025)',
        'Climate Change: Rising temperatures affect sex ratios of hatchlings and cause habitat changes due to rising sea levels. (Spotila, 2004)',
        'Illegal Trade: Poaching for meat, eggs, and shells contributes to population decline. (WWF, 2023)',
        'Diseases: Fibropapillomatosis, a disease associated with environmental degradation, affects turtle health. (Work & Balazs, 1999)',
        'Boat Strikes: Collisions with boats cause severe injuries or fatalities, especially in coastal regions. (NOAA fisheries, 2023)'
      ],
      helpTitle: 'How Can We Save the Green Sea Turtle?',
      helpData: [
        'Protect Nesting Beaches: Establish protected areas to prevent human disturbances during nesting. (Silva et al., 2015)',
        'Reduce Bycatch: Use turtle excluder devices (TEDs) in fishing gear to minimize accidental captures. (NOAA fisheries, 2023)',
        'Combat Pollution: To reduce plastic use, promote recycling, and conduct ocean cleanup drives to prevent pollution. (WWF, 2025)',
        'Mitigate Climate Change: Support policies that reduce carbon emissions and protect coastal habitats from sea level rise. (Spotila, 2004)',
        'Ban Illegal Trade: Enforce laws against poaching and the sale of turtle products. (Lutz & Musick, 1997)',
        'Raise Awareness: Educate local communities and tourists about the importance of turtles in ecosystems. (WWF-Guianas, 2023)',
        'Support Conservation Programs: Fund and volunteer for initiatives that rescue injured turtles and monitor populations. (NOAA fisheries, 2023)'
      ],
      consTitle: 'Conservation Strategies for the Green Sea Turtle',
      consData: [
        'Marine Protected Areas (MPAs): Establish and enforce MPAs to safeguard critical habitats such as nesting and feeding grounds. (IUCN MTSG, 2023)',
        'Sustainable Fishing Practices: Implement turtle excluder devices (TEDs) and enforce bycatch reduction measures. (NOAA fisheries, 2023)',
        'Habitat Restoration: Rehabilitate degraded nesting beaches and seagrass meadows to support turtle populations. (WWF-Malaysia, 2023)',
        'Legislation and Enforcement: Strengthen laws against poaching, illegal trade, and habitat destruction. (Lutz & Musick, 1997)',
        'Climate Adaptation Measures: Implement strategies to manage rising temperatures and protect coastal nesting sites from sea level rise. (Spotila, 2004)',
        'Community Engagement: Involve local communities in conservation efforts through education and eco-tourism initiatives. (WWF-Malaysia, 2023)',
        'Research and Monitoring: Conduct studies to track turtle populations, migration patterns, and health for data-driven strategies. (NOAA fisheries, 2023)'
      ]
    },
    ms: {
      threatsTitle: 'Ancaman terhadap Penyu Agar',
      threatsData: [
        'Kehilangan Habitat: Pembangunan pantai dan pelancongan memusnahkan habitat penetasan dan kawasan makan. (Silva et al., 2015)',
        'Tangkapan Sampingan: Tertangkap secara tidak sengaja dalam peralatan perikanan seperti pukat dan tali panjang, menyebabkan kecederaan atau kematian. (NOAA fisheries, 2023)',
        'Pencemaran: Pengambilan sampah plastik dan tumpahan minyak merosakkan penyu atau habitatnya secara langsung. (NOAA fisheries, 2025)',
        'Perubahan Iklim: Peningkatan suhu mempengaruhi nisbah jantina anak penyu dan menyebabkan perubahan habitat akibat kenaikan paras laut. (Spotila, 2004)',
        'Perdagangan Haram: Pemburuan untuk daging, telur, dan cengkerang menyumbang kepada kemerosotan populasi. (WWF, 2023)',
        'Penyakit: Fibropapillomatosis, penyakit berkaitan kemerosotan alam sekitar, menjejaskan kesihatan penyu. (Work & Balazs, 1999)',
        'Pelanggaran Bot: Perlanggaran dengan bot menyebabkan kecederaan serius atau kematian, terutamanya di kawasan pantai. (NOAA fisheries, 2023)'
      ],
      helpTitle: 'Bagaimana Kita Boleh Menyelamatkan Penyu Agar?',
      helpData: [
        'Lindungi Pantai Penetasan: Wujudkan kawasan terpelihara untuk mengelakkan gangguan manusia semasa penetasan. (Silva et al., 2015)',
        'Kurangkan Tangkapan Sampingan: Guna peranti ekskluder penyu (TEDs) dalam peralatan tangkapan untuk mengurangkan tangkapan sampingan. (NOAA fisheries, 2023)',
        'Banteras Pencemaran: Kurangkan penggunaan plastik, galakkan kitar semula, dan anjurkan pembersihan lautan untuk mencegah pencemaran. (WWF, 2025)',
        'Atasi Perubahan Iklim: Sokong dasar yang mengurangkan pelepasan karbon dan lindungi habitat pantai daripada kenaikan paras laut. (Spotila, 2004)',
        'Haramkan Perdagangan Haram: Kuatkuasakan undang-undang terhadap pemburuan haram dan penjualan produk penyu. (Lutz & Musick, 1997)',
        'Sebarkan Kesedaran: Didik komuniti tempatan dan pelancong tentang kepentingan penyu dalam ekosistem. (WWF-Guianas, 2023)',
        'Sokong Program Pemuliharaan: Derma dan jadi sukarelawan untuk inisiatif menyelamatkan penyu cedera dan memantau populasi. (NOAA fisheries, 2023)'
      ],
      consTitle: 'Strategi Pemuliharaan untuk Penyu Agar',
      consData: [
        'Kawasan Perlindungan Marin (MPAs): Tubuhkan dan kuatkuasakan MPA untuk melindungi habitat kritikal seperti tapak penetasan dan pemakanan. (IUCN MTSG, 2023)',
        'Amalan Perikanan Lestari: Laksanakan peranti ekskluder penyu (TEDs) dan kuatkuasakan langkah pengurangan tangkapan sampingan. (NOAA fisheries, 2023)',
        'Pemulihan Habitat: Pulihkan pantai penetasan dan padang rumpai laut yang terjejas untuk menyokong populasi penyu. (WWF-Malaysia, 2023)',
        'Undang-undang dan Penguatkuasaan: Kukuhkan undang-undang terhadap pemburuan haram, perdagangan haram, dan kemusnahan habitat. (Lutz & Musick, 1997)',
        'Langkah Penyesuaian Iklim: Laksanakan strategi untuk menguruskan peningkatan suhu dan lindungi tapak penetasan pantai daripada kenaikan paras laut. (Spotila, 2004)',
        'Penglibatan Komuniti: Libatkan komuniti tempatan dalam usaha pemuliharaan melalui pendidikan dan inisiatif ekopelancongan. (WWF-Malaysia, 2023)',
        'Penyelidikan dan Pemantauan: Jalankan kajian untuk menjejak populasi penyu, corak migrasi, dan kesihatan untuk strategi berasaskan data. (NOAA fisheries, 2023)'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const renderCard = (line, section, idx) => {
    const [title, ...rest] = line.split(': ');
    const description = rest.join(': ');
    const iconName = (
      section === 'threats' ? getThreatIcon(title)
      : section === 'help' ? getHelpIcon(title)
      : getConsIcon(title)
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
          {renderTextWithScientificNames(
            title,
            [styles.cardTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]
          )}
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
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20 }
});
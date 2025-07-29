// components/lesson/tapir/sections/TapirPopulation.jsx

import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  Linking,
  useWindowDimensions
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const PDF_DOWNLOAD_URL =
  'https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086346171.pdf';

export default function TapirPopulation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { width } = useWindowDimensions();

  // Content (EN + MS)
  const content = {
    en: {
      populationTrends: 'Population Trends (2019‑2024)',
      historicalContext: 'Conservation Status Overview',
      keyInsights: 'Key Insights',

      globalData: [
        {
          country: 'Malaysia',
          pop2019: '~1,300–1,500',
          pop2024: '~1,100–1,300',
          trend: 'down',
          trendText: '↓ 13%',
          threats: 'Decline due to deforestation, roadkill, and development projects',
          citation: 'Ng et al., 2022; Adila et al., 2017; IUCN Red List, 2023',
          highlight: true
        },
        {
          country: 'Thailand',
          pop2019: '~500–700',
          pop2024: '~400–500',
          trend: 'down',
          trendText: '↓ 20%',
          threats: 'Fragmented populations in protected areas like Kaeng Krachan',
          citation: 'IUCN 2023; Foerster et al., 2020',
          highlight: false
        },
        {
          country: 'Sumatra (Indonesia)',
          pop2019: '~500–700',
          pop2024: '~400–500',
          trend: 'down',
          trendText: '↓ 20%',
          threats: 'Habitat loss from palm oil plantations; some protected areas stable',
          citation: 'IUCN Red List, 2023; Hughes 2021',
          highlight: false
        },
        {
          country: 'Myanmar',
          pop2019: '< 50',
          pop2024: 'Possibly Extinct or < 30',
          trend: 'extinct',
          trendText: '↓ 40%',
          threats: 'No recent confirmed sightings; likely functionally extinct',
          citation: 'IUCN Red List, 2023; Tapir Specialist Group, 2023',
          highlight: false
        }
      ],

      historicalData: [
        { region: 'Malaysia',  context: 'Largest remaining population but declining due to development.',              status: 'critical' },
        { region: 'Thailand',  context: 'Small, fragmented in protected areas.',                                  status: 'critical' },
        { region: 'Indonesia', context: 'Sumatra populations threatened by palm oil expansion.',                    status: 'critical' },
        { region: 'Myanmar',   context: 'Functionally extinct; no recent confirmed sightings.',                    status: 'extinct' }
      ],

      populationStats: [
        { label: 'Global Population (2024)', value: '~2,000–2,500 individuals', icon: 'public' },
        { label: "Malaysia’s Share",         value: '~50% of global population',   icon: 'flag' },
        { label: 'Population Decline',       value: '15–20% decrease since 2019',  icon: 'trending-down' },
        { label: 'IUCN Status',              value: 'Endangered (decreasing)',    icon: 'warning' }
      ],

      keyInsightsData: [
        'Malaysia holds ~50% of global total but still declining.',
        'Thailand & Indonesia fragmented, at severe risk.',
        'Myanmar likely functionally extinct; no sightings.',
        '~2,000–2,500 individuals remain globally.',
        'Endangered on IUCN Red List; continuing decline.',
        'Palm oil expansion is primary threat across SE Asia.'
      ]
    },

    ms: {
      populationTrends: 'Trend Populasi (2019‑2024)',
      historicalContext: 'Gambaran Status Pemuliharaan',
      keyInsights: 'Penemuan Utama',

      globalData: [
        {
          country: 'Malaysia',
          pop2019: '~1,300–1,500',
          pop2024: '~1,100–1,300',
          trend: 'down',
          trendText: '↓ 13%',
          threats: 'Penurunan akibat penebangan hutan, kemalangan jalan raya, dan projek pembangunan',
          citation: 'Ng et al., 2022; Adila et al., 2017; IUCN Red List, 2023',
          highlight: true
        },
        {
          country: 'Thailand',
          pop2019: '~500–700',
          pop2024: '~400–500',
          trend: 'down',
          trendText: '↓ 20%',
          threats: 'Populasi terpisah di kawasan perlindungan seperti Kaeng Krachan',
          citation: 'IUCN 2023; Foerster et al., 2020',
          highlight: false
        },
        {
          country: 'Sumatera (Indonesia)',
          pop2019: '~500–700',
          pop2024: '~400–500',
          trend: 'down',
          trendText: '↓ 20%',
          threats: 'Kehilangan habitat akibat ladang kelapa sawit; beberapa kawasan perlindungan stabil',
          citation: 'IUCN Red List, 2023; Hughes 2021',
          highlight: false
        },
        {
          country: 'Myanmar',
          pop2019: '< 50',
          pop2024: 'Mungkin Pupus atau < 30',
          trend: 'extinct',
          trendText: '↓ 40%',
          threats: 'Tiada pengesahan penemuan terkini; populasi berkemungkinan pupus secara fungsional',
          citation: 'IUCN Red List, 2023; Tapir Specialist Group, 2023',
          highlight: false
        }
      ],

      historicalData: [
        { region: 'Malaysia',  context: 'Populasi terbesar tetapi menurun akibat pembangunan pesat & fragmentasi', status: 'critical' },
        { region: 'Thailand',  context: 'Populasi kecil terfragmentasi dalam kawasan perlindungan',        status: 'critical' },
        { region: 'Indonesia', context: 'Populasi Sumatera terancam teruk oleh pengembangan kelapa sawit', status: 'critical' },
        { region: 'Myanmar',   context: 'Ber kemungkinan pupus secara fungsional tanpa penemuan terkini',   status: 'extinct' }
      ],

      populationStats: [
        { label: 'Populasi Global (2024)', value: '~2,000–2,500 individu',      icon: 'public' },
        { label: 'Bahagian Malaysia',        value: '~50% daripada populasi global', icon: 'flag' },
        { label: 'Penurunan Populasi',       value: '15–20% penurunan sejak 2019',   icon: 'trending-down' },
        { label: 'Status IUCN',              value: 'Terancam (menurun)',           icon: 'warning' }
      ],

      keyInsightsData: [
        'Malaysia memegang ~50% jumlah global tetapi masih menurun.',
        'Thailand & Indonesia terfragmentasi, berisiko tinggi.',
        'Myanmar kemungkinan pupus fungsi; tiada penemuan.',
        '~2,000–2,500 individu kekal di alam liar.',
        'Terancam dalam Senarai Merah IUCN; penurunan berterusan.',
        'Pengembangan kelapa sawit ancaman utama di Asia Tenggara.'
      ]
    }
  };
  const text = content[currentLanguage] || content.en;

  // Helpers for trend/status styling
  const trendColor = { up: '#4CAF50', down: '#F44336', extinct: '#9E9E9E' };
  const trendIcon  = { up: 'trending-up', down: 'trending-down', extinct: 'help-outline' };
  const statusColor = { critical: '#F44336', extinct: '#9E9E9E', success: '#4CAF50' };

  // Download handler
  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'tapir-population-data.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'tapir-population-data.pdf'
        );
        const { uri } = await downloadResumable.downloadAsync();
        const canShare = await Sharing.isAvailableAsync();
        Alert.alert(
          'Download complete',
          '',
          [
            { text: 'OK' },
            ...(canShare
              ? [{
                  text: 'Open',
                  onPress: async () => {
                    try {
                      await Sharing.shareAsync(uri, {
                        mimeType: 'application/pdf',
                        dialogTitle: 'Open Tapir Population PDF'
                      });
                    } catch {
                      Alert.alert('Error', 'Unable to open the file.');
                    }
                  }
                }]
              : [])
          ]
        );
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  // Section wrapper
  const Section = ({ icon, title, children }) => (
    <View style={styles.section}>
      <View style={styles.header}>
        <MaterialIcons
          name={icon}
          size={20}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
        />
        <ThemedText
          style={[
            styles.headerText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          {title}
        </ThemedText>
      </View>
      {children}
    </View>
  );

  // Country card
  const CountryCard = ({ country, pop2019, pop2024, trend, trendText, threats, citation, highlight }) => (
    <View
      style={[
        styles.card,
        highlight && { borderLeftColor: '#FF6B35', borderLeftWidth: 4 },
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <ThemedText
          style={[
            styles.countryText,
            { color: isDark ? Colors.dark.text : Colors.light.text },
            highlight && { color: '#FF6B35' }
          ]}
        >
          {country}
        </ThemedText>
        <View style={[styles.badge, { backgroundColor: trendColor[trend] + '20' }]}>
          <MaterialIcons name={trendIcon[trend]} size={14} color={trendColor[trend]} />
          <ThemedText style={[styles.badgeText, { color: trendColor[trend] }]}>
            {trendText}
          </ThemedText>
        </View>
      </View>
      <View style={styles.popRow}>
        <View style={styles.popItem}>
          <ThemedText style={styles.popLabel}>2019</ThemedText>
          <ThemedText style={styles.popValue}>{pop2019}</ThemedText>
        </View>
        <MaterialIcons
          name="arrow-forward"
          size={16}
          color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
        />
        <View style={styles.popItem}>
          <ThemedText style={styles.popLabel}>2024</ThemedText>
          <ThemedText style={styles.popValue}>{pop2024}</ThemedText>
        </View>
      </View>
      <View style={styles.threatRow}>
        <MaterialIcons
          name="warning"
          size={14}
          color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
        />
        <ThemedText style={styles.threatText}>{threats}</ThemedText>
      </View>
      <ThemedText style={styles.citation}>{citation}</ThemedText>
    </View>
  );

  // Historical item
  const HistoricalItem = ({ region, context, status }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <ThemedText style={[styles.countryText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          {region}
        </ThemedText>
        <View style={[styles.statusBadge, { backgroundColor: statusColor[status] + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor[status] }]} />
        </View>
      </View>
      <ThemedText style={[styles.threatText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
        {context}
      </ThemedText>
    </View>
  );

  // Stat card
  const StatCard = ({ icon, label, value }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}
    >
      <View style={[styles.statIcon, { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + '20' }]}>
        <MaterialIcons name={icon} size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
      </View>
      <View style={styles.statContent}>
        <ThemedText style={[styles.popLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.popValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          {value}
        </ThemedText>
      </View>
    </View>
  );

  // Insights list
  const Insights = ({ items }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}
    >
      {items.map((ins, i) => (
        <View key={i} style={styles.insightRow}>
          <View style={[styles.bullet, { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }]} />
          <ThemedText style={[styles.threatText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {ins}
          </ThemedText>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section icon="public" title={text.populationTrends}>
        {text.globalData.map((c, i) => <CountryCard key={i} {...c} />)}
      </Section>

      <Section icon="timeline" title={text.historicalContext}>
        {text.historicalData.map((h, i) => <HistoricalItem key={i} {...h} />)}
      </Section>

      <Section icon="bar-chart" title="Population Statistics">
        {text.populationStats.map((s, i) => <StatCard key={i} {...s} />)}
      </Section>

      <Section icon="lightbulb" title={text.keyInsights}>
        <Insights items={text.keyInsightsData} />
      </Section>

      {/* 🔥 Download Button */}
      <View style={styles.downloadSection}>
        <TouchableOpacity
          style={[
            styles.simpleDownloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownloadPDF}
          activeOpacity={0.8}
        >
          <MaterialIcons name="file-download" size={18} color="#fff" />
          <ThemedText style={styles.simpleDownloadText}>Download PDF</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },

  section: { marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  headerText: { fontSize: 18, fontWeight: '600' },

  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  countryText: { fontSize: 16, fontWeight: '600' },

  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },

  popRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 },
  popItem: { alignItems: 'center' },
  popLabel: { fontSize: 12, marginBottom: 2 },
  popValue: { fontSize: 16, fontWeight: '600' },

  threatRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  threatText: { fontSize: 14, flex: 1 },
  citation: { fontSize: 11, fontStyle: 'italic', color: '#777' },

  statusBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },

  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  statIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  statContent: { flex: 1 },

  insightRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, marginRight: 12 },

  // Download button
  downloadSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8
  },
  simpleDownloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  simpleDownloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});

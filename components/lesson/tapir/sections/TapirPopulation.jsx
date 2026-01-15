// components/lesson/tapir/sections/TapirPopulation.jsx

import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TapirPopulation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { width } = useWindowDimensions();

  // Content (EN + MS)
  const content = {
    en: {
      populationTrends: 'Malayan Tapir Population Trend (2019-2024)',
      keyInsights: 'Key Insights',

      globalData: [
        {
          country: 'Malaysia',
          pop2019: '~1,300-1,500',
          pop2024: '~1,100-1,300',
          trend: 'down',
          trendText: 'Decreasing',
          threats: 'Decline due to deforestation, roadkill, and development projects',
          citation: 'Ariffin, N. et al. 2025',
          highlight: true
        },
        {
          country: 'Thailand',
          pop2019: '~500-700',
          pop2024: '~400-500',
          trend: 'down',
          trendText: 'Decreasing',
          threats: 'Fragmented populations in protected areas like Kaeng Krachan',
          citation: 'Suwannaphong et al., 2024',
          highlight: false
        },
        {
          country: 'Sumatra (Indonesia)',
          pop2019: '~500-700',
          pop2024: '~400-500',
          trend: 'down',
          trendText: 'Decreasing',
          threats: 'Habitat loss from palm oil plantations; some protected areas show stable subpopulations',
          citation: 'Kuswanda, W. et al. 2023',
          highlight: false
        },
        {
          country: 'Myanmar',
          pop2019: '<50',
          pop2024: 'Possibly Extinct or <30',
          trend: 'extinct',
          trendText: 'Possibly Extinct',
          threats: 'Only in very small numbers in the Tenasserim rainforests along the Thai border',
          citation: 'Traeholt, Novarino, et al., 2016',
          highlight: false
        }
      ],

      populationStats: [
        { label: 'Global Population (2024)', value: '~2,000-2,400 individuals', icon: 'public' },
        { label: "Malaysia's Share", value: '~50% of global population', icon: 'flag' },
        { label: 'Population Decline', value: '15-20% decrease since 2019', icon: 'trending-down' },
        { label: 'IUCN Status', value: 'Endangered (decreasing)', icon: 'warning' }
      ],

      keyInsightsData: [
        'Malaysia holds the largest remaining population (~1,100-1,300) but continues to decline.',
        'Thailand and Indonesia have fragmented populations at severe risk from habitat loss.',
        'Myanmar populations are possibly functionally extinct with no recent confirmed sightings.',
        'Approximately 2,000-2,400 individuals remain globally across all countries.',
        'Listed as Endangered on IUCN Red List with continuing population decline.',
        'Palm oil expansion and infrastructure development are primary threats across Southeast Asia.'
      ]
    },

    ms: {
      populationTrends: 'Trend Populasi Tapir Malaya (2019-2024)',
      keyInsights: 'Penemuan Utama',

      globalData: [
        {
          country: 'Malaysia',
          pop2019: '~1,300-1,500',
          pop2024: '~1,100-1,300',
          trend: 'down',
          trendText: 'Menurun',
          threats: 'Penurunan akibat penebangan hutan, kemalangan jalan raya, dan projek pembangunan',
          citation: 'Ariffin, N. et al. 2025',
          highlight: true
        },
        {
          country: 'Thailand',
          pop2019: '~500-700',
          pop2024: '~400-500',
          trend: 'down',
          trendText: 'Menurun',
          threats: 'Populasi terfragmentasi di kawasan dilindungi seperti Kaeng Krachan',
          citation: 'Suwannaphong et al., 2024',
          highlight: false
        },
        {
          country: 'Sumatera (Indonesia)',
          pop2019: '~500-700',
          pop2024: '~400-500',
          trend: 'down',
          trendText: 'Menurun',
          threats: 'Kehilangan habitat akibat ladang kelapa sawit; beberapa kawasan dilindungi menunjukkan subpopulasi yang stabil',
          citation: 'Kuswanda, W. et al. 2023',
          highlight: false
        },
        {
          country: 'Myanmar',
          pop2019: '<50',
          pop2024: 'Mungkin Pupus atau <30',
          trend: 'extinct',
          trendText: 'Mungkin Pupus',
          threats: 'Hanya dalam bilangan yang sangat kecil di hutan hujan Tenasserim di sepanjang sempadan Thai',
          citation: 'Traeholt, Novarino, et al., 2016',
          highlight: false
        }
      ],

      populationStats: [
        { label: 'Populasi Global (2024)', value: '~2,000-2,400 individu', icon: 'public' },
        { label: 'Bahagian Malaysia', value: '~50% daripada populasi global', icon: 'flag' },
        { label: 'Penurunan Populasi', value: '15-20% penurunan sejak 2019', icon: 'trending-down' },
        { label: 'Status IUCN', value: 'Terancam (menurun)', icon: 'warning' }
      ],

      keyInsightsData: [
        'Malaysia memegang populasi terbesar yang tinggal (~1,100-1,300) tetapi terus menurun.',
        'Thailand dan Indonesia mempunyai populasi terfragmentasi yang berisiko tinggi akibat kehilangan habitat.',
        'Populasi Myanmar mungkin pupus secara fungsi tanpa pengesahan penemuan terkini.',
        'Kira-kira 2,000-2,400 individu kekal secara global merentasi semua negara.',
        'Disenaraikan sebagai Terancam dalam Senarai Merah IUCN dengan penurunan populasi berterusan.',
        'Pengembangan kelapa sawit dan pembangunan infrastruktur adalah ancaman utama di seluruh Asia Tenggara.'
      ]
    }
  };
  
  const text = content[currentLanguage] || content.en;

  // Helpers for trend/status styling
  const trendColor = { up: '#4CAF50', down: '#F44336', extinct: '#9E9E9E' };
  const trendIcon = { up: 'trending-up', down: 'trending-down', extinct: 'help-outline' };

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
          <ThemedText style={[styles.popLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            2019
          </ThemedText>
          <ThemedText style={[styles.popValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {pop2019}
          </ThemedText>
        </View>
        <MaterialIcons
          name="arrow-forward"
          size={16}
          color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
        />
        <View style={styles.popItem}>
          <ThemedText style={[styles.popLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            2024
          </ThemedText>
          <ThemedText style={[styles.popValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {pop2024}
          </ThemedText>
        </View>
      </View>
      <View style={styles.threatRow}>
        <MaterialIcons
          name="info-outline"
          size={14}
          color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
        />
        <ThemedText style={[styles.threatText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
          {threats}
        </ThemedText>
      </View>
      <ThemedText style={styles.citation}>{citation}</ThemedText>
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

      <Section icon="bar-chart" title="Population Statistics">
        {text.populationStats.map((s, i) => <StatCard key={i} {...s} />)}
      </Section>

      <Section icon="lightbulb" title={text.keyInsights}>
        <Insights items={text.keyInsightsData} />
      </Section>
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

  threatRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 8 },
  threatText: { fontSize: 14, flex: 1, lineHeight: 20 },
  citation: { fontSize: 11, fontStyle: 'italic', color: '#777' },

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
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, marginRight: 12 }
});
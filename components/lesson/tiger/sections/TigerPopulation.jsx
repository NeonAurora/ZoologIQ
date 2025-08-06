// components/lesson/tiger/sections/TigerPopulation.jsx
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Linking
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const PDF_DOWNLOAD_URL = 'https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751085268768.pdf';

export default function TigerPopulation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // content omitted for brevity; same bilingual content from earlier...
    const content = {
    en: {
      populationTrends: 'Population Trends (2020-2023)',
      yearlyTrends:    'Historical Trends (2010-2023)',
      keyInsights:     'Key Insights',
      globalData: [
        { country: 'India',      p2020: '2,967', p2023: '3,167', trend: 'up',     trendText: '↑ 6.7%',  threats: 'Habitat loss, human conflict',          highlight: false },
        { country: 'Malaysia',   p2020: '<150',  p2023: '<150',  trend: 'stable', trendText: '↔ Stable', threats: 'Poaching, deforestation',                 highlight: true  },
        { country: 'Indonesia',  p2020: '400',   p2023: '350',   trend: 'down',   trendText: '↓ 12.5%', threats: 'Palm oil deforestation',                  highlight: false },
        { country: 'Russia',     p2020: '540',   p2023: '600',   trend: 'up',     trendText: '↑ 11%',   threats: 'Climate change, logging',                 highlight: false },
        { country: 'Bangladesh', p2020: '114',   p2023: '106',   trend: 'down',   trendText: '↓ 7%',    threats: 'Sea-level rise (Sundarbans)',             highlight: false }
      ],
      historicalTrends: [
        { country: 'India',    desc: 'Increased from 1,411 (2010) to 3,167 (2023) due to strict anti-poaching laws', status: 'success'  },
        { country: 'Malaysia', desc: 'Declined from 500 (2010) to <150 (2023) due to habitat fragmentation',            status: 'critical' },
        { country: 'Global',   desc: '~3,900 wild tigers (2023), up from 3,200 (2010) but still below historic 100,000', status: 'improving' }
      ],
      keyInsightsData: [
        'India: Highest density (75% of global population) due to strict anti‑poaching laws',
        'Malaysia & Indonesia: Fastest decline due to palm oil expansion',
        'Russia: Recovery success story via anti‑poaching patrols',
        'Global: From 3,200 (2010) to ~3,900 (2023) but still far below historic 100,000',
        'Malaysia among most endangered tiger populations globally'
      ],
      populationStats: [
        { label: 'Global Tiger Population (2023)', value: '~3,900 wild tigers',      icon: 'public'       },
        { label: "Malaysia’s Share",              value: '<4% of global population', icon: 'flag'         },
        { label: 'Historical Decline',            value: '96% below historic 100,000', icon: 'trending-down'},
        { label: 'Recovery Trend',                value: '22% increase since 2010',     icon: 'trending-up'  }
      ]
    },
    ms: {
      populationTrends: 'Trend Populasi (2020-2023)',
      yearlyTrends:    'Trend Sejarah (2010-2023)',
      keyInsights:     'Penemuan Utama',
      globalData: [
        { country: 'India',      p2020: '2,967', p2023: '3,167', trend: 'up',     trendText: '↑ 6.7%',  threats: 'Kehilangan habitat, konflik manusia',     highlight: false },
        { country: 'Malaysia',   p2020: '<150',  p2023: '<150',  trend: 'stable', trendText: '↔ Stabil', threats: 'Pemburuan haram, pembalakan',              highlight: true  },
        { country: 'Indonesia',  p2020: '400',   p2023: '350',   trend: 'down',   trendText: '↓ 12.5%', threats: 'Pembukaan hutan kelapa sawit',              highlight: false },
        { country: 'Rusia',      p2020: '540',   p2023: '600',   trend: 'up',     trendText: '↑ 11%',   threats: 'Perubahan iklim, pembalakan',              highlight: false },
        { country: 'Bangladesh', p2020: '114',   p2023: '106',   trend: 'down',   trendText: '↓ 7%',    threats: 'Kenaikan paras laut (Sundarbans)',         highlight: false }
      ],
      historicalTrends: [
        { country: 'India',    desc: 'Meningkat dari 1,411 (2010) kepada 3,167 (2023) akibat undang‑undang anti‑pemburuan ketat', status: 'success'  },
        { country: 'Malaysia', desc: 'Menurun dari 500 (2010) kepada <150 (2023) akibat fragmentasi habitat',               status: 'critical' },
        { country: 'Global',   desc: 'Kira-kira 3,900 harimau liar (2023), meningkat dari 3,200 (2010) tetapi masih di bawah 100,000 sejarah', status: 'improving' }
      ],
      keyInsightsData: [
        'India: Kepadatan tertinggi (75% populasi global) akibat undang‑undang anti‑pemburuan ketat',
        'Malaysia & Indonesia: Penurunan tercepat akibat perluasan kelapa sawit',
        'Rusia: Kisah kejayaan pemulihan melalui rondaan anti‑pemburuan haram',
        'Global: Dari 3,200 (2010) kepada ~3,900 (2023) tetapi masih jauh di bawah 100,000 sejarah',
        'Malaysia antara populasi harimau paling terancam di dunia'
      ],
      populationStats: [
        { label: 'Populasi Harimau Global (2023)', value: '~3,900 harimau liar',      icon: 'public'       },
        { label: 'Bahagian Malaysia',             value: '<4% daripada populasi global', icon: 'flag'         },
        { label: 'Penurunan Sejarah',             value: '96% di bawah 100,000 sejarah', icon: 'trending-down'},
        { label: 'Trend Pemulihan',               value: '22% peningkatan sejak 2010',    icon: 'trending-up'  }
      ]
    }
  };
  const text = content[currentLanguage] || content.en;

  const trendColor = { up: '#4CAF50', down: '#F44336', stable: '#FF9800' };
  const trendIcon  = { up: 'trending-up', down: 'trending-down', stable: 'trending-flat' };
  const statusColor= { success: '#4CAF50', critical: '#F44336', improving: '#FF9800' };

  const getTrendColor  = t => trendColor[t] ?? (isDark ? Colors.dark.textMuted : Colors.light.textMuted);
  const getTrendIcon   = t => trendIcon[t]  ?? 'remove';
  const getStatusColor = s => statusColor[s] ?? (isDark ? Colors.dark.textMuted : Colors.light.textMuted);

  const Section = ({ icon, title, children }) => (
    <View style={styles.section}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
          {title}
        </ThemedText>
      </View>
      {children}
    </View>
  );

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'tiger-population.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'tiger-population.pdf'
        );
        try {
          const { uri } = await downloadResumable.downloadAsync();
          const isAvailable = await Sharing.isAvailableAsync();
          Alert.alert(
            'Download Complete',
            '',
            [
              { text: 'OK', style: 'cancel' },
              ...(isAvailable
                ? [
                    {
                      text: 'Open',
                      onPress: async () => {
                        try {
                          await Sharing.shareAsync(uri, {
                            mimeType: 'application/pdf',
                            dialogTitle: 'Open Tiger Population PDF'
                          });
                        } catch {
                          Alert.alert('Error', 'Unable to open the file.');
                        }
                      }
                    }
                  ]
                : [])
            ]
          );
        } catch {
          Alert.alert('Download Failed', 'Unable to download the file.');
        }
      }
    } catch {
      Alert.alert('Error', 'An error occurred during download.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section icon="public" title={text.populationTrends}>
        <View style={styles.comparison}>
          {text.globalData.map((c, i) => (
            <View
              key={i}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor:    isDark ? Colors.dark.border  : Colors.light.border
                },
                c.highlight && { borderLeftColor: '#FF6B35', borderLeftWidth: 4 }
              ]}>
              <View style={styles.cardHeader}>
                <View style={styles.nameWrap}>
                  <ThemedText
                    style={[
                      styles.country,
                      { color: isDark ? Colors.dark.text : Colors.light.text },
                      c.highlight && { color: '#FF6B35' }
                    ]}>
                    {c.country}
                  </ThemedText>
                  {c.highlight && (
                    <MaterialIcons name="star" size={16} color="#FF6B35" style={{ marginLeft: 6 }} />
                  )}
                </View>
                <View style={[styles.badge, { backgroundColor: getTrendColor(c.trend) + '20' }]}>
                  <MaterialIcons name={getTrendIcon(c.trend)} size={14} color={getTrendColor(c.trend)} />
                  <ThemedText style={[styles.badgeText, { color: getTrendColor(c.trend) }]}>
                    {c.trendText}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.popRow}>
                <View style={styles.popItem}>
                  <ThemedText style={styles.popLabel}>2020</ThemedText>
                  <ThemedText style={styles.popValue}>{c.p2020}</ThemedText>
                </View>
                <MaterialIcons
                  name="arrow-forward"
                  size={16}
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
                />
                <View style={styles.popItem}>
                  <ThemedText style={styles.popLabel}>2023</ThemedText>
                  <ThemedText style={styles.popValue}>{c.p2023}</ThemedText>
                </View>
              </View>

              <View style={styles.threatRow}>
                <MaterialIcons
                  name="warning"
                  size={14}
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
                />
                <ThemedText
                  style={[
                    styles.threatText,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                  {c.threats}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section icon="timeline" title={text.yearlyTrends}>
        <View style={styles.trends}>
          {text.historicalTrends.map((t, i) => (
            <View
              key={i}
              style={[
                styles.trendCard,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor:    isDark ? Colors.dark.border  : Colors.light.border
                }
              ]}>
              <View style={styles.trendHeader}>
                <ThemedText
                  style={[styles.trendCountry, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  {t.country}
                </ThemedText>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(t.status) + '20' }
                  ]}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(t.status) }]} />
                </View>
              </View>
              <ThemedText
                style={[
                  styles.trendDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                {t.desc}
              </ThemedText>
            </View>
          ))}
        </View>
      </Section>

      <Section icon="lightbulb" title={text.keyInsights}>
        <View
          style={[
            styles.insightCard,
            {
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor:    isDark ? Colors.dark.border  : Colors.light.border
            }
          ]}>
          {text.keyInsightsData.map((ins, i) => (
            <View key={i} style={styles.insightRow}>
              <View style={[styles.bullet, { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }]} />
              <ThemedText style={[styles.insightText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                {ins}
              </ThemedText>
            </View>
          ))}
        </View>
      </Section>

      {/* Download PDF Button */}
      <View style={styles.downloadSection}>
        <TouchableOpacity
          style={[
            styles.simpleDownloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownloadPDF}
          activeOpacity={0.8}>
          <MaterialIcons name="file-download" size={18} color="#fff" />
          <ThemedText style={styles.simpleDownloadText}>Download PDF</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:         { flex: 1 },
  content:           { padding: 16, paddingBottom: 32 },
  section:           { marginBottom: 24 },
  header:            { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  title:             { fontSize: 18, fontWeight: '600' },

  comparison:        { gap: 12 },
  card:              {
    padding: 16, borderRadius: 12, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 2
  },
  cardHeader:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  nameWrap:          { flexDirection: 'row', alignItems: 'center', flex: 1 },
  country:           { fontSize: 16, fontWeight: '600' },
  badge:             { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText:         { fontSize: 12, fontWeight: '600' },

  popRow:            { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, gap: 16 },
  popItem:           { alignItems: 'center' },
  popLabel:          { fontSize: 12, marginBottom: 2 },
  popValue:          { fontSize: 16, fontWeight: '600' },

  threatRow:         { flexDirection: 'row', alignItems: 'center', gap: 6 },
  threatText:        { fontSize: 13, flex: 1 },

  trends:            { gap: 12 },
  trendCard:         {
    padding: 16, borderRadius: 12, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 2
  },
  trendHeader:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  trendCountry:      { fontSize: 16, fontWeight: '600' },
  statusBadge:       { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statusDot:         { width: 8, height: 8, borderRadius: 4 },
  trendDesc:         { fontSize: 14, lineHeight: 20 },

  stats:             { gap: 12 },
  statCard:          {
    flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 2
  },
  statIcon:          { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  statContent:       { flex: 1 },
  statLabel:         { fontSize: 13, marginBottom: 2 },
  statValue:         { fontSize: 16, fontWeight: '600' },

  insightCard:       {
    padding: 16, borderRadius: 12, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 2
  },
  insightRow:        { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  bullet:            { width: 6, height: 6, borderRadius: 3, marginTop: 8, marginRight: 12 },
  insightText:       { fontSize: 15, lineHeight: 22, flex: 1 },

  downloadSection:   { alignItems: 'center', marginTop: 16, marginBottom: 8 },
  simpleDownloadButton: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 20, gap: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2, shadowRadius: 2,
    elevation: 2
  },
  simpleDownloadText: {
    color: '#fff', fontSize: 14, fontWeight: '600'
  }
});

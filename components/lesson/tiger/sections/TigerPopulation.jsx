// components/lesson/tiger/sections/TigerPopulation.jsx
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
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

  const content = {
    en: {
      populationTrends: 'Population Trends (2020-2023)',
      yearlyTrends: 'Yearly Trends (2010-2023)',
      keyComparisons: 'Key Comparisons',
      globalData: [
        { 
          country: 'India', 
          p2020: '2,967', 
          p2023: '3,167', 
          trend: 'up', 
          trendText: '↑ 6.7%', 
          threats: 'Habitat loss, human conflict', 
          source: 'NTCA (2023)',
          highlight: false 
        },
        { 
          country: 'Malaysia', 
          p2020: '<150', 
          p2023: '<150', 
          trend: 'stable', 
          trendText: '↔ Stable', 
          threats: 'Poaching, deforestation', 
          source: 'DWNP (2023)',
          highlight: true 
        },
        { 
          country: 'Indonesia', 
          p2020: '400', 
          p2023: '350', 
          trend: 'down', 
          trendText: '↓ 12.5%', 
          threats: 'Palm oil deforestation', 
          source: 'IUCN (2023)',
          highlight: false 
        },
        { 
          country: 'Russia', 
          p2020: '540', 
          p2023: '600', 
          trend: 'up', 
          trendText: '↑ 11%', 
          threats: 'Climate change, logging', 
          source: 'WWF-Russia (2023)',
          highlight: false 
        },
        { 
          country: 'Bangladesh', 
          p2020: '114', 
          p2023: '106', 
          trend: 'down', 
          trendText: '↓ 7%', 
          threats: 'Sea-level rise (Sundarbans)', 
          source: 'Khan (2022)',
          highlight: false 
        }
      ],
      yearlyTrendsData: [
        { 
          title: 'India', 
          description: 'Increased from 1,411 (2010) to 3,167 (2023) due to strict anti-poaching laws (NTCA, 2023)', 
          status: 'success' 
        },
        { 
          title: 'Malaysia', 
          description: "Malaysia's wild Malayan tiger population is projected to decline to fewer than 150 by 2022-2023, down from a few hundred a decade ago, largely due to deforestation, habitat fragmentation, poaching and prey loss (WWF-Malaysia, 2021)", 
          status: 'critical' 
        },
        { 
          title: 'Global', 
          description: 'Global wild tiger numbers have increased from an estimated low of about 3,200 animals in 2010 to roughly 4,500 today, but the Malayan tiger subspecies remains at critically low levels and is still classified as Critically Endangered (Goodrich et al., 2022)', 
          status: 'improving' 
        }
      ],
      keyComparisonsData: [
        { 
          title: 'Highest Density', 
          description: 'India (75% of global population)', 
          icon: 'trending-up' 
        },
        { 
          title: 'Fastest Decline', 
          description: 'Malaysia & Indonesia (due to palm oil expansion)', 
          icon: 'trending-down' 
        },
        { 
          title: 'Recovery Success', 
          description: 'Russia (Siberian tigers rebounded via anti-poaching patrols)', 
          icon: 'celebration' 
        }
      ]
    },
    ms: {
      populationTrends: 'Trend Populasi (2020-2023)',
      yearlyTrends: 'Trend Tahunan (2010-2023)',
      keyComparisons: 'Perbandingan Utama',
      globalData: [
        { 
          country: 'India', 
          p2020: '2,967', 
          p2023: '3,167', 
          trend: 'up', 
          trendText: '↑ 6.7%', 
          threats: 'Kehilangan habitat, konflik manusia', 
          source: 'NTCA (2023)',
          highlight: false 
        },
        { 
          country: 'Malaysia', 
          p2020: '<150', 
          p2023: '<150', 
          trend: 'stable', 
          trendText: '↔ Stabil', 
          threats: 'Pemburuan haram, penebangan hutan', 
          source: 'DWNP (2023)',
          highlight: true 
        },
        { 
          country: 'Indonesia', 
          p2020: '400', 
          p2023: '350', 
          trend: 'down', 
          trendText: '↓ 12.5%', 
          threats: 'Penebangan hutan kelapa sawit', 
          source: 'IUCN (2023)',
          highlight: false 
        },
        { 
          country: 'Rusia', 
          p2020: '540', 
          p2023: '600', 
          trend: 'up', 
          trendText: '↑ 11%', 
          threats: 'Perubahan iklim, pembalakan', 
          source: 'WWF-Russia (2023)',
          highlight: false 
        },
        { 
          country: 'Bangladesh', 
          p2020: '114', 
          p2023: '106', 
          trend: 'down', 
          trendText: '↓ 7%', 
          threats: 'Kenaikan aras laut (Sundarbans)', 
          source: 'Khan (2022)',
          highlight: false 
        }
      ],
      yearlyTrendsData: [
        { 
          title: 'India', 
          description: 'Meningkat dari 1,411 (2010) kepada 3,167 (2023) kerana undang-undang anti-pemburuan haram yang ketat (NTCA, 2023)', 
          status: 'success' 
        },
        { 
          title: 'Malaysia', 
          description: 'Populasi harimau Malaya liar dijangka menurun kepada kurang daripada 150 menjelang 2022-2023, turun daripada beberapa ratus sedekad yang lalu, sebahagian besarnya disebabkan oleh penebangan hutan, pemecahan habitat, pemburuan haram dan kehilangan mangsa (WWF-Malaysia, 2021)', 
          status: 'critical' 
        },
        { 
          title: 'Global', 
          description: 'Bilangan harimau liar global telah meningkat daripada anggaran rendah kira-kira 3,200 haiwan pada 2010 kepada kira-kira 4,500 hari ini, tetapi subspesies harimau Malaya kekal pada tahap kritikal rendah dan masih diklasifikasikan sebagai Sangat Terancam (Goodrich et al., 2022)', 
          status: 'improving' 
        }
      ],
      keyComparisonsData: [
        { 
          title: 'Kepadatan Tertinggi', 
          description: 'India (75% daripada populasi global)', 
          icon: 'trending-up' 
        },
        { 
          title: 'Penurunan Terpantas', 
          description: 'Malaysia & Indonesia (kerana pengembangan kelapa sawit)', 
          icon: 'trending-down' 
        },
        { 
          title: 'Kejayaan Pemulihan', 
          description: 'Rusia (harimau Siberia pulih melalui rondaan anti-pemburuan haram)', 
          icon: 'celebration' 
        }
      ]
    }
  };
  
  const text = content[currentLanguage] || content.en;

  const trendColor = { up: '#4CAF50', down: '#F44336', stable: '#FF9800' };
  const trendIcon = { up: 'trending-up', down: 'trending-down', stable: 'trending-flat' };
  const statusColor = { success: '#4CAF50', critical: '#F44336', improving: '#FF9800' };

  const getTrendColor = t => trendColor[t] ?? (isDark ? Colors.dark.textMuted : Colors.light.textMuted);
  const getTrendIcon = t => trendIcon[t] ?? 'remove';
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
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
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
                  <ThemedText style={[styles.popLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    2020
                  </ThemedText>
                  <ThemedText style={[styles.popValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    {c.p2020}
                  </ThemedText>
                </View>
                <MaterialIcons
                  name="arrow-forward"
                  size={16}
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
                />
                <View style={styles.popItem}>
                  <ThemedText style={[styles.popLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    2023
                  </ThemedText>
                  <ThemedText style={[styles.popValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    {c.p2023}
                  </ThemedText>
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
              
              <ThemedText style={styles.source}>{c.source}</ThemedText>
            </View>
          ))}
        </View>
      </Section>

      <Section icon="timeline" title={text.yearlyTrends}>
        <View style={styles.trends}>
          {text.yearlyTrendsData.map((t, i) => (
            <View
              key={i}
              style={[
                styles.trendCard,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}>
              <View style={styles.trendHeader}>
                <ThemedText
                  style={[styles.trendCountry, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  {t.title}
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
                {t.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </Section>

      <Section icon="compare-arrows" title={text.keyComparisons}>
        <View style={styles.comparisons}>
          {text.keyComparisonsData.map((comp, i) => (
            <View
              key={i}
              style={[
                styles.comparisonCard,
                {
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}>
              <MaterialIcons
                name={comp.icon}
                size={24}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
                style={styles.comparisonIcon}
              />
              <View style={styles.comparisonContent}>
                <ThemedText
                  style={[
                    styles.comparisonTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                  {comp.title}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.comparisonDesc,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                  {comp.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  section: { marginBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '600' },

  comparison: { gap: 12 },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  nameWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  country: { fontSize: 16, fontWeight: '600' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },

  popRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, gap: 16 },
  popItem: { alignItems: 'center' },
  popLabel: { fontSize: 12, marginBottom: 2 },
  popValue: { fontSize: 16, fontWeight: '600' },

  threatRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 8 },
  threatText: { fontSize: 13, flex: 1, lineHeight: 18 },
  source: { fontSize: 11, fontStyle: 'italic', color: '#777', marginTop: 4 },

  trends: { gap: 12 },
  trendCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  trendHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  trendCountry: { fontSize: 16, fontWeight: '600' },
  statusBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  trendDesc: { fontSize: 14, lineHeight: 20 },

  comparisons: { gap: 12 },
  comparisonCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  comparisonIcon: { marginRight: 16 },
  comparisonContent: { flex: 1 },
  comparisonTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  comparisonDesc: { fontSize: 13, lineHeight: 18 }
});
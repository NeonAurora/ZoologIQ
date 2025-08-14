// components/lesson/turtle/sections/TurtlePopulation.jsx

import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
  Linking
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text as SvgText } from 'react-native-svg';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const PDF_URL =
  'https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086680717.pdf';

export default function TurtlePopulation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const screenWidth = Dimensions.get('window').width;

  const [showMalaysia, setShowMalaysia] = useState(true);
  const scrollRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  const content = {
    en: {
      title: 'Green Sea Turtle Population Trends (2019–2025)',
      downloadText: 'Download PDF',
      years: ['2019','2020','2021','2022','2023','2024','2025'],
      malaysia:    [3900,4500,5200,6700,10100,9200,null],
      global:      [450000,460000,475000,490000,510000,520000,530000],
      rows: [
        ['2019','Baseline: steady nesting activity globally'],
        ['2020','Slight increase amid pandemic restrictions'],
        ['2021','Continued recovery and nesting success'],
        ['2022','Positive trend from conservation efforts'],
        ['2023','Significant jump in Malaysia; global growth'],
        ['2024','Slight dip in Malaysia; global increase steady'],
        ['2025','Awaiting Malaysia data; global positive trend']
      ]
    },
    ms: {
      title: 'Trend Populasi Penyu Agar (2019–2025)',
      downloadText: 'Muat Turun PDF',
      years: ['2019','2020','2021','2022','2023','2024','2025'],
      malaysia:    [3900,4500,5200,6700,10100,9200,null],
      global:      [450000,460000,475000,490000,510000,520000,530000],
      rows: [
        ['2019','Asas: aktiviti penetasan stabil global'],
        ['2020','Peningkatan kecil semasa sekatan pandemik'],
        ['2021','Pemulihan berterusan dan kejayaan penetasan'],
        ['2022','Trend positif hasil usaha pemuliharaan'],
        ['2023','Lonjakan ketara di Malaysia; pertumbuhan global'],
        ['2024','Penurunan sedikit di Malaysia; peningkatan global berterusan'],
        ['2025','Menunggu data Malaysia; trend global positif']
      ]
    }
  };
  const text = content[currentLanguage] || content.en;

  // Omit the null 2025 point for Malaysia
  const malaysiaLabels = text.years.slice(0, 6);
  const malaysiaData   = text.malaysia.slice(0, 6);

  const labels     = showMalaysia ? malaysiaLabels : text.years;
  const dataset    = showMalaysia ? malaysiaData   : text.global;
  const lineColor  = showMalaysia ? '#FF6B35'      : '#00A896';
  const legendText = showMalaysia
    ? (currentLanguage === 'ms' ? 'Malaysia' : 'Malaysia Nesting Females')
    : (currentLanguage === 'ms' ? 'Global'   : 'Global Nesting Females');

  const activeColor   = isDark ? Colors.dark.tint : Colors.light.tint;
  const inactiveColor = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;

  const containerWidth = screenWidth - 32; // account for horizontal padding
  const maxScroll      = Math.max(0, contentWidth - containerWidth);

  const handleScroll = e => setScrollX(e.nativeEvent.contentOffset.x);
  const handleContentSizeChange = w => setContentWidth(w);
  const scrollToStart = () => scrollRef.current?.scrollTo({ x: 0,       animated: true });
  const scrollToEnd   = () => scrollRef.current?.scrollTo({ x: maxScroll, animated: true });

  const handleDownload = () => {
    if (Platform.OS === 'web') {
      window.open(PDF_URL, '_blank');
    } else {
      Linking.openURL(PDF_URL).catch(() =>
        Alert.alert('Error', 'Unable to open PDF.')
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        {/* Title */}
        <View style={styles.header}>
          <MaterialIcons name="show-chart" size={20} color={activeColor} />
          <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            {text.title}
          </ThemedText>
        </View>

        {/* Toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              showMalaysia
                ? { backgroundColor: activeColor }
                : { borderColor: inactiveColor, borderWidth: 1 }
            ]}
            onPress={() => setShowMalaysia(true)}
          >
            <ThemedText style={[
              styles.toggleText,
              showMalaysia ? { color: '#fff' } : { color: inactiveColor }
            ]}>
              {currentLanguage === 'ms' ? 'Malaysia' : 'Malaysia'}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              !showMalaysia
                ? { backgroundColor: activeColor }
                : { borderColor: inactiveColor, borderWidth: 1 }
            ]}
            onPress={() => setShowMalaysia(false)}
          >
            <ThemedText style={[
              styles.toggleText,
              !showMalaysia ? { color: '#fff' } : { color: inactiveColor }
            ]}>
              {currentLanguage === 'ms' ? 'Global' : 'Global'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Chart + Arrows */}
        <View style={styles.chartWrapper}>
          {scrollX > 20 && (
            <TouchableOpacity style={[styles.arrow, styles.leftArrow]} onPress={scrollToStart}>
              <MaterialIcons name="chevron-left" size={24} color={activeColor} />
            </TouchableOpacity>
          )}
          {scrollX < maxScroll - 20 && (
            <TouchableOpacity style={[styles.arrow, styles.rightArrow]} onPress={scrollToEnd}>
              <MaterialIcons name="chevron-right" size={24} color={activeColor} />
            </TouchableOpacity>
          )}

          <ScrollView
            horizontal
            ref={scrollRef}
            onScroll={handleScroll}
            onContentSizeChange={w => handleContentSizeChange(w)}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            <LineChart
              data={{
                labels,
                datasets: [{ data: dataset, color: () => lineColor, strokeWidth: 2 }],
                legend: [legendText]
              }}
              width={Math.max(containerWidth, labels.length * 60)}
              height={300}
              chartConfig={{
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                backgroundGradientFrom: isDark ? Colors.dark.surface : Colors.light.surface,
                backgroundGradientTo:   isDark ? Colors.dark.surface : Colors.light.surface,
                decimalPlaces: 0,
                color: (opacity = 1) =>
                  isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`,
                labelColor: (opacity = 1) =>
                  isDark ? `rgba(200,200,200,${opacity})` : `rgba(50,50,50,${opacity})`,
                propsForDots: { r: '6' },
                getDotColor:   () => lineColor
              }}
              style={styles.chart}
              withDots
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
              renderDotContent={({ x, y, value, index }) => (
                <SvgText
                  key={`dot-label-${index}`}
                  x={x}
                  y={y - 10}
                  fontSize="10"
                  fill={isDark ? '#fff' : '#000'}
                  textAnchor="middle"
                >
                  {value}
                </SvgText>
              )}
            />
          </ScrollView>
        </View>

        {/* Yearly Hints */}
        <View style={styles.hints}>
          {text.rows.map(([year, hint]) => (
            <View key={year} style={styles.hintRow}>
              <ThemedText style={[styles.hintYear, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                {year}:
              </ThemedText>
              <ThemedText style={[styles.hintText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                {hint}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { padding: 16, paddingBottom: 32 },

  section:   { marginBottom: 24 },

  header:    { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  title:     { fontSize: 18, fontWeight: '600', flexShrink: 1 },

  toggleRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  toggleText: { fontSize: 14, fontWeight: '600' },

  chartWrapper: {
    position: 'relative',
    marginBottom: 16
  },
  arrow: {
    position: 'absolute',
    top: '45%',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 6
  },
  leftArrow:  { left: 4 },
  rightArrow: { right: 4 },

  chart: {
    marginVertical: 8,
    borderRadius: 12
  },

  hints: { marginTop: 16 },
  hintRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  hintYear: { width: 50, fontSize: 14, fontWeight: '600' },
  hintText: { flex: 1, fontSize: 14, lineHeight: 20 },

  downloadSection: { alignItems: 'center', marginTop: 16 },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  downloadText: { color: '#fff', fontSize: 14, fontWeight: '600' }
});

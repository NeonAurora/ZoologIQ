import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerEcology() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>
        🧠 Behavior & Intelligence
      </ThemedText>
      
      <View style={styles.behaviorList}>
        <View style={styles.behaviorItem}>
          <ThemedText style={styles.behaviorEmoji}>🗺️</ThemedText>
          <View style={styles.behaviorContent}>
            <ThemedText style={styles.behaviorTitle}>Territory Marking</ThemedText>
            <ThemedText style={styles.behaviorDesc}>Use scent and marks to claim territory</ThemedText>
          </View>
        </View>
        
        <View style={styles.behaviorItem}>
          <ThemedText style={styles.behaviorEmoji}>🏠</ThemedText>
          <View style={styles.behaviorContent}>
            <ThemedText style={styles.behaviorTitle}>Solitary Lifestyle</ThemedText>
            <ThemedText style={styles.behaviorDesc}>Large territory (50–150 km²)</ThemedText>
          </View>
        </View>
        
        <View style={styles.behaviorItem}>
          <ThemedText style={styles.behaviorEmoji}>🎭</ThemedText>
          <View style={styles.behaviorContent}>
            <ThemedText style={styles.behaviorTitle}>Hunting Intelligence</ThemedText>
            <ThemedText style={styles.behaviorDesc}>Can mimic prey calls for hunting!</ThemedText>
          </View>
        </View>
      </View>
      
      <ThemedText type="subtitle" style={[styles.sectionTitle, styles.sectionSpacing]}>
        👶 Reproduction & Family
      </ThemedText>
      
      <View style={[
        styles.reproductionBox,
        { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
      ]}>
        <View style={styles.reproductionItem}>
          <ThemedText style={styles.reproductionLabel}>Litter Size:</ThemedText>
          <ThemedText style={styles.reproductionValue}>2–4 cubs every 2–3 years</ThemedText>
        </View>
        
        <View style={styles.reproductionItem}>
          <ThemedText style={styles.reproductionLabel}>Maternal Care:</ThemedText>
          <ThemedText style={styles.reproductionValue}>Cubs stay with mom for up to 2 years</ThemedText>
        </View>
        
        <View style={styles.reproductionItem}>
          <ThemedText style={styles.reproductionLabel}>Paternal Role:</ThemedText>
          <ThemedText style={styles.reproductionValue}>Males defend territory, don't raise cubs</ThemedText>
        </View>
      </View>
      
      <ThemedText type="subtitle" style={[styles.sectionTitle, styles.sectionSpacing]}>
        🌍 Global Tiger Comparison
      </ThemedText>
      
      <View style={[
        styles.comparisonTable,
        { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
      ]}>
        <View style={[styles.tableHeader, { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundTertiary }]}>
          <ThemedText style={[styles.tableHeaderText, { flex: 1.2 }]}>Country</ThemedText>
          <ThemedText style={[styles.tableHeaderText, { flex: 0.8 }]}>2020</ThemedText>
          <ThemedText style={[styles.tableHeaderText, { flex: 0.8 }]}>2023</ThemedText>
          <ThemedText style={[styles.tableHeaderText, { flex: 0.8 }]}>Trend</ThemedText>
          <ThemedText style={[styles.tableHeaderText, { flex: 1.2 }]}>Main Threats</ThemedText>
        </View>
        
        <View style={styles.tableRow}>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>India</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>2,967</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>3,167</ThemedText>
          <ThemedText style={[styles.tableCell, styles.trendUp, { flex: 0.8 }]}>↑ 6.7%</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Habitat loss, conflict</ThemedText>
        </View>
        
        <View style={styles.tableRow}>
          <ThemedText style={[styles.tableCell, styles.malaysiaBold, { flex: 1.2 }]}>Malaysia</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>&lt;150</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>&lt;150</ThemedText>
          <ThemedText style={[styles.tableCell, styles.trendStable, { flex: 0.8 }]}>↔ Stable</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Poaching, deforestation</ThemedText>
        </View>
        
        <View style={styles.tableRow}>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Indonesia</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>400</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>350</ThemedText>
          <ThemedText style={[styles.tableCell, styles.trendDown, { flex: 0.8 }]}>↓ 12.5%</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Palm oil deforestation</ThemedText>
        </View>
        
        <View style={styles.tableRow}>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Russia</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>540</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>600</ThemedText>
          <ThemedText style={[styles.tableCell, styles.trendUp, { flex: 0.8 }]}>↑ 11%</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Logging, climate</ThemedText>
        </View>
        
        <View style={styles.tableRow}>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Bangladesh</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>114</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 0.8 }]}>106</ThemedText>
          <ThemedText style={[styles.tableCell, styles.trendDown, { flex: 0.8 }]}>↓ 7%</ThemedText>
          <ThemedText style={[styles.tableCell, { flex: 1.2 }]}>Sea-level rise</ThemedText>
        </View>
      </View>
      
      <View style={[
        styles.highlightsBox,
        { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary }
      ]}>
        <ThemedText style={styles.highlightsTitle}>🏆 Key Highlights</ThemedText>
        <ThemedText style={styles.highlight}>• <ThemedText style={styles.highlightBold}>India:</ThemedText> Highest density (75% of global tigers)</ThemedText>
        <ThemedText style={styles.highlight}>• <ThemedText style={styles.highlightBold}>Malaysia & Indonesia:</ThemedText> Fastest decline</ThemedText>
        <ThemedText style={styles.highlight}>• <ThemedText style={styles.highlightBold}>Russia:</ThemedText> Notable recovery from patrols</ThemedText>
        <ThemedText style={styles.highlight}>• <ThemedText style={styles.highlightBold}>Global:</ThemedText> 3,200 → ~3,900 wild tigers (still far from 100,000 historic)</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 16,
  },
  sectionSpacing: {
    marginTop: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  behaviorList: {
    marginBottom: 24,
  },
  behaviorItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingRight: 16,
  },
  behaviorEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  behaviorContent: {
    flex: 1,
  },
  behaviorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  behaviorDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  reproductionBox: {
    borderRadius: 12,
    padding: 16,
  },
  reproductionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reproductionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  reproductionValue: {
    fontSize: 15,
    flex: 2,
  },
  comparisonTable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  tableCell: {
    fontSize: 13,
    textAlign: 'center',
  },
  malaysiaBold: {
    fontWeight: 'bold',
  },
  trendUp: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  trendDown: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  trendStable: {
    color: '#f39c12',
    fontWeight: 'bold',
  },
  highlightsBox: {
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  highlightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlight: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },
  highlightBold: {
    fontWeight: 'bold',
  },
});
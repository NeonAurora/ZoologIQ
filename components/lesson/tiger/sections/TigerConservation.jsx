import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerConservation() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>
        ⚠️ Threats to Survival
      </ThemedText>
      
      <View style={styles.threatsList}>
        <View style={styles.threat}>
          <ThemedText style={styles.threatEmoji}>🌳</ThemedText>
          <View style={styles.threatContent}>
            <ThemedText style={styles.threatTitle}>Deforestation</ThemedText>
            <ThemedText style={styles.threatDesc}>For palm oil, logging, urbanization</ThemedText>
          </View>
        </View>
        
        <View style={styles.threat}>
          <ThemedText style={styles.threatEmoji}>🛣️</ThemedText>
          <View style={styles.threatContent}>
            <ThemedText style={styles.threatTitle}>Fragmentation</ThemedText>
            <ThemedText style={styles.threatDesc}>Roads split forests; increase roadkill</ThemedText>
          </View>
        </View>
        
        <View style={styles.threat}>
          <ThemedText style={styles.threatEmoji}>🎯</ThemedText>
          <View style={styles.threatContent}>
            <ThemedText style={styles.threatTitle}>Poaching</ThemedText>
            <ThemedText style={styles.threatDesc}>For skins, bones, trophies</ThemedText>
          </View>
        </View>
        
        <View style={styles.threat}>
          <ThemedText style={styles.threatEmoji}>⚖️</ThemedText>
          <View style={styles.threatContent}>
            <ThemedText style={styles.threatTitle}>Weak Enforcement</ThemedText>
            <ThemedText style={styles.threatDesc}>Enables illegal trade</ThemedText>
          </View>
        </View>
        
        <View style={styles.threat}>
          <ThemedText style={styles.threatEmoji}>🏠</ThemedText>
          <View style={styles.threatContent}>
            <ThemedText style={styles.threatTitle}>Human Conflict</ThemedText>
            <ThemedText style={styles.threatDesc}>Livestock attacks → retaliations</ThemedText>
          </View>
        </View>
        
        <View style={styles.threat}>
          <ThemedText style={styles.threatEmoji}>🦌</ThemedText>
          <View style={styles.threatContent}>
            <ThemedText style={styles.threatTitle}>Prey Depletion</ThemedText>
            <ThemedText style={styles.threatDesc}>Overhunting reduces food supply</ThemedText>
          </View>
        </View>
      </View>
      
      <ThemedText type="title" style={[styles.title, styles.sectionSpacing]}>
        🤝 How You Can Help
      </ThemedText>
      
      <View style={styles.helpCategories}>
        <View style={[
          styles.helpCategory,
          { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
        ]}>
          <ThemedText style={styles.helpCategoryTitle}>💰 Donate & Support</ThemedText>
          <ThemedText style={styles.helpItem}>• WWF-Malaysia, MYCAT, Rimba</ThemedText>
          <ThemedText style={styles.helpItem}>• Symbolic adoptions: Support conservation NGOs</ThemedText>
        </View>
        
        <View style={[
          styles.helpCategory,
          { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
        ]}>
          <ThemedText style={styles.helpCategoryTitle}>🔬 Volunteer & Research</ThemedText>
          <ThemedText style={styles.helpItem}>• Camera traps, surveys, awareness</ThemedText>
          <ThemedText style={styles.helpItem}>• Report sightings/conflicts to authorities</ThemedText>
        </View>
        
        <View style={[
          styles.helpCategory,
          { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
        ]}>
          <ThemedText style={styles.helpCategoryTitle}>🚨 Report & Advocate</ThemedText>
          <ThemedText style={styles.helpItem}>• Report poaching (MYCAT 1-800-88-5151)</ThemedText>
          <ThemedText style={styles.helpItem}>• Advocate for wildlife corridors</ThemedText>
          <ThemedText style={styles.helpItem}>• Sign petitions for stronger laws</ThemedText>
        </View>
        
        <View style={[
          styles.helpCategory,
          { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
        ]}>
          <ThemedText style={styles.helpCategoryTitle}>🛒 Conscious Consumption</ThemedText>
          <ThemedText style={styles.helpItem}>• Choose RSPO/FSC-certified products</ThemedText>
          <ThemedText style={styles.helpItem}>• Avoid tiger-derived products</ThemedText>
          <ThemedText style={styles.helpItem}>• Reduce plastic use</ThemedText>
        </View>
        
        <View style={[
          styles.helpCategory,
          { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
        ]}>
          <ThemedText style={styles.helpCategoryTitle}>📱 Spread Awareness</ThemedText>
          <ThemedText style={styles.helpItem}>• Visit tiger reserves (Taman Negara, Royal Belum)</ThemedText>
          <ThemedText style={styles.helpItem}>• Share #SaveMalayanTigers content</ThemedText>
          <ThemedText style={styles.helpItem}>• Educate children via schools and zoos</ThemedText>
        </View>
      </View>
      
      <ThemedText type="subtitle" style={[styles.sectionTitle, styles.sectionSpacing]}>
        🐾 Coexistence Strategies
      </ThemedText>
      
      <View style={styles.coexistenceGrid}>
        <ThemedText style={styles.coexistenceItem}>• Livestock guardian dogs</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• Farmer compensation schemes</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• Forest corridors for safe passage</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• Wildlife highway crossings</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• SMS tiger alert systems</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• Predator-proof livestock enclosures</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• Ecotourism for income</ThemedText>
        <ThemedText style={styles.coexistenceItem}>• Indigenous-led patrols (PATROL Perak)</ThemedText>
      </View>
      
      <View style={[
        styles.successBox,
        { backgroundColor: isDark ? '#1e4a1e' : '#e8f5e8' }
      ]}>
        <ThemedText style={styles.successTitle}>✅ Conservation Success Stories</ThemedText>
        <ThemedText style={styles.successItem}>
          <ThemedText style={styles.successBold}>Kenny Wildlife Corridor:</ThemedText> Reconnected Taman Negara & Kenyir Lake
        </ThemedText>
        <ThemedText style={styles.successItem}>
          <ThemedText style={styles.successBold}>Royal Belum:</ThemedText> Patrolling cut poaching by 40% since 2019
        </ThemedText>
        <ThemedText style={styles.successItem}>
          <ThemedText style={styles.successBold}>Indigenous Patrols:</ThemedText> 1,200 snares removed in 2022 (Perak)
        </ThemedText>
        <ThemedText style={styles.successItem}>
          <ThemedText style={styles.successBold}>Ecotourism:</ThemedText> RM5 million generated in 2023 (Taman Negara)
        </ThemedText>
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
  threatsList: {
    marginBottom: 24,
  },
  threat: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingRight: 16,
  },
  threatEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  threatContent: {
    flex: 1,
  },
  threatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  threatDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  helpCategories: {
    gap: 16,
    marginBottom: 24,
  },
  helpCategory: {
    padding: 16,
    borderRadius: 12,
  },
  helpCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  helpItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  coexistenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  coexistenceItem: {
    fontSize: 14,
    lineHeight: 20,
    width: '48%',
    marginBottom: 8,
  },
  successBox: {
    padding: 16,
    borderRadius: 12,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2ecc71',
  },
  successItem: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  successBold: {
    fontWeight: 'bold',
  },
});
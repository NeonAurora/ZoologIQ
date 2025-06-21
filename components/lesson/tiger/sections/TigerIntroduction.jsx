import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerIntroduction() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroSection}>
        <ThemedText style={styles.heroEmoji}>🐅</ThemedText>
        <ThemedText type="title" style={styles.title}>
          Malayan Tiger
        </ThemedText>
        <ThemedText style={styles.scientificName}>
          Panthera tigris jacksoni
        </ThemedText>
      </View>
      
      <ThemedText style={styles.paragraph}>
        The Malayan Tiger is Malaysia's critically endangered national symbol, with fewer than 150 remaining in the wild. As apex predators, they maintain healthy forests by controlling prey populations. Their habitats provide clean water and store carbon. Threatened by habitat loss, poaching, and human conflict, their survival depends on immediate conservation action. Everyone in Malaysia can help protect these iconic stripes for future generations.
      </ThemedText>
      
      <View style={[
        styles.statusBox,
        { backgroundColor: isDark ? '#4a1e1e' : '#ffe6e6' }
      ]}>
        <ThemedText style={styles.statusLabel}>Conservation Status</ThemedText>
        <ThemedText style={[styles.statusValue, { color: '#e74c3c' }]}>
          Critically Endangered
        </ThemedText>
        <ThemedText style={styles.statusDescription}>
          Fewer than 150 individuals remain in the wild (2023)
        </ThemedText>
      </View>
      
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        ❤️ Why Malayan Tigers Matter
      </ThemedText>
      
      <View style={styles.pointsList}>
        <View style={styles.point}>
          <ThemedText style={styles.pointEmoji}>🎯</ThemedText>
          <ThemedText style={styles.pointText}>
            <ThemedText style={styles.pointTitle}>Apex predator:</ThemedText> Vital for ecosystem stability
          </ThemedText>
        </View>
        
        <View style={styles.point}>
          <ThemedText style={styles.pointEmoji}>🇲🇾</ThemedText>
          <ThemedText style={styles.pointText}>
            <ThemedText style={styles.pointTitle}>Symbol of Malaysia's heritage:</ThemedText> Featured on coat of arms and folklore
          </ThemedText>
        </View>
        
        <View style={styles.point}>
          <ThemedText style={styles.pointEmoji}>💰</ThemedText>
          <ThemedText style={styles.pointText}>
            <ThemedText style={styles.pointTitle}>Economic support:</ThemedText> Supports ecotourism and rural economies
          </ThemedText>
        </View>
        
        <View style={styles.point}>
          <ThemedText style={styles.pointEmoji}>🌱</ThemedText>
          <ThemedText style={styles.pointText}>
            <ThemedText style={styles.pointTitle}>Environmental guardian:</ThemedText> Protecting tigers = protecting forests, water, agriculture
          </ThemedText>
        </View>
        
        <View style={styles.point}>
          <ThemedText style={styles.pointEmoji}>🌍</ThemedText>
          <ThemedText style={styles.pointText}>
            <ThemedText style={styles.pointTitle}>Climate solutions:</ThemedText> Critical to forest carbon storage
          </ThemedText>
        </View>
        
        <View style={styles.point}>
          <ThemedText style={styles.pointEmoji}>🧬</ThemedText>
          <ThemedText style={styles.pointText}>
            <ThemedText style={styles.pointTitle}>Unique genetics:</ThemedText> One of only 6 tiger subspecies with unique DNA
          </ThemedText>
        </View>
      </View>
      
      <View style={[
        styles.biodiversityBox,
        { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary }
      ]}>
        <ThemedText style={styles.biodiversityTitle}>🌱 Role in Biodiversity</ThemedText>
        <ThemedText style={styles.biodiversityText}>• Regulates prey populations, preventing overgrazing</ThemedText>
        <ThemedText style={styles.biodiversityText}>• Protects biodiversity: forests house birds, insects, plants</ThemedText>
        <ThemedText style={styles.biodiversityText}>• Indicator of healthy forests; decline signals ecosystem stress</ThemedText>
        <ThemedText style={styles.biodiversityText}>• Helps forest regeneration via herbivore behavior influence</ThemedText>
        <ThemedText style={styles.biodiversityText}>• Ecotourism symbol; generates local income</ThemedText>
        <ThemedText style={styles.biodiversityText}>• Forests store carbon; mitigate climate change</ThemedText>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.7,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  statusBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: 16,
    marginTop: 8,
  },
  pointsList: {
    marginBottom: 24,
  },
  point: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 16,
  },
  pointEmoji: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  pointText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  pointTitle: {
    fontWeight: 'bold',
  },
  biodiversityBox: {
    padding: 16,
    borderRadius: 12,
  },
  biodiversityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  biodiversityText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },
});
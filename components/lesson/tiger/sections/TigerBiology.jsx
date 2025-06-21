import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TigerBiology() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const factSheetData = [
    { label: 'Scientific Name', value: 'Panthera tigris jacksoni' },
    { label: 'Conservation Status', value: 'Critically Endangered (IUCN Red List)' },
    { label: 'Population', value: 'Fewer than 150 individuals in the wild (2023)' },
    { label: 'Habitat', value: 'Tropical rainforests of Peninsular Malaysia' },
    { label: 'Male Size', value: '2.5–2.8 m, 120–130 kg' },
    { label: 'Female Size', value: '~2.3 m, 80–100 kg' },
    { label: 'Diet', value: 'Carnivorous (deer, wild boar, sun bears, livestock)' },
    { label: 'Lifespan', value: '15–20 years in wild; up to 25 in captivity' },
    { label: 'Unique Features', value: 'Darker coat with black stripes; smallest mainland subspecies; solitary' },
    { label: 'Threats', value: 'Deforestation, poaching, roadkill, human conflict' },
    { label: 'Conservation Efforts', value: 'Protected areas, patrols, awareness (e.g., WWF-Malaysia)' },
    { label: 'Ecological Role', value: 'Apex predator; balances ecosystem' },
  ];
  
  const taxonomy = [
    { rank: 'Kingdom', name: 'Animalia', common: 'Animals' },
    { rank: 'Phylum', name: 'Chordata', common: 'Vertebrates' },
    { rank: 'Class', name: 'Mammalia', common: 'Mammals' },
    { rank: 'Order', name: 'Carnivora', common: 'Carnivores' },
    { rank: 'Family', name: 'Felidae', common: 'Cats' },
    { rank: 'Genus', name: 'Panthera', common: 'Big Cats' },
    { rank: 'Species', name: 'Panthera tigris', common: 'Tiger' },
    { rank: 'Subspecies', name: 'Panthera tigris jacksoni', common: 'Malayan Tiger' },
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText type="title" style={styles.title}>
        📄 Fact Sheet
      </ThemedText>
      
      <View style={[
        styles.factSheet,
        { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
      ]}>
        {factSheetData.map((fact, index) => (
          <View key={index} style={[
            styles.factRow,
            index !== factSheetData.length - 1 && {
              borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
              borderBottomWidth: 1
            }
          ]}>
            <ThemedText style={styles.factLabel}>{fact.label}</ThemedText>
            <ThemedText style={styles.factValue}>{fact.value}</ThemedText>
          </View>
        ))}
      </View>
      
      <ThemedText type="title" style={[styles.title, styles.sectionSpacing]}>
        🧬 Taxonomic Classification
      </ThemedText>
      
      <View style={[
        styles.taxonomyTable,
        { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
      ]}>
        {taxonomy.map((tax, index) => (
          <View key={index} style={[
            styles.taxonomyRow,
            index !== taxonomy.length - 1 && {
              borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
              borderBottomWidth: 1
            }
          ]}>
            <ThemedText style={styles.taxonomyRank}>{tax.rank}</ThemedText>
            <ThemedText style={styles.taxonomyName}>{tax.name}</ThemedText>
            <ThemedText style={styles.taxonomyCommon}>{tax.common}</ThemedText>
          </View>
        ))}
      </View>
      
      <ThemedText type="subtitle" style={[styles.sectionTitle, styles.sectionSpacing]}>
        💪 Physiology & Adaptations
      </ThemedText>
      
      <View style={styles.adaptationsList}>
        <View style={styles.adaptation}>
          <ThemedText style={styles.adaptationEmoji}>🦷</ThemedText>
          <View style={styles.adaptationContent}>
            <ThemedText style={styles.adaptationTitle}>Powerful Bite</ThemedText>
            <ThemedText style={styles.adaptationDesc}>1,000 psi bite can crush bones</ThemedText>
          </View>
        </View>
        
        <View style={styles.adaptation}>
          <ThemedText style={styles.adaptationEmoji}>🌊</ThemedText>
          <View style={styles.adaptationContent}>
            <ThemedText style={styles.adaptationTitle}>Great Swimmers</ThemedText>
            <ThemedText style={styles.adaptationDesc}>Unlike most cats!</ThemedText>
          </View>
        </View>
        
        <View style={styles.adaptation}>
          <ThemedText style={styles.adaptationEmoji}>🎯</ThemedText>
          <View style={styles.adaptationContent}>
            <ThemedText style={styles.adaptationTitle}>Perfect Camouflage</ThemedText>
            <ThemedText style={styles.adaptationDesc}>Stripes blend into the forest</ThemedText>
          </View>
        </View>
      </View>
      
      <View style={[
        styles.funFactBox,
        { backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary }
      ]}>
        <ThemedText style={styles.funFactTitle}>🎉 Fun Facts</ThemedText>
        <ThemedText style={styles.funFact}>• <ThemedText style={styles.funFactBold}>Unique Stripes:</ThemedText> Like fingerprints!</ThemedText>
        <ThemedText style={styles.funFact}>• <ThemedText style={styles.funFactBold}>Smallest Mainland Tiger:</ThemedText> Yet can leap 5+ meters</ThemedText>
        <ThemedText style={styles.funFact}>• <ThemedText style={styles.funFactBold}>Night Hunters:</ThemedText> Eyes glow for night vision</ThemedText>
        <ThemedText style={styles.funFact}>• <ThemedText style={styles.funFactBold}>Chuffing Cats:</ThemedText> Use friendly vocalizations</ThemedText>
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
  factSheet: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  factRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  factLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  factValue: {
    fontSize: 14,
    flex: 2,
  },
  taxonomyTable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  taxonomyRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  taxonomyRank: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  taxonomyName: {
    fontSize: 14,
    fontStyle: 'italic',
    flex: 1.5,
  },
  taxonomyCommon: {
    fontSize: 14,
    flex: 1,
  },
  adaptationsList: {
    marginBottom: 24,
  },
  adaptation: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingRight: 16,
  },
  adaptationEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  adaptationContent: {
    flex: 1,
  },
  adaptationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  adaptationDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  funFactBox: {
    padding: 16,
    borderRadius: 12,
  },
  funFactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  funFact: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },
  funFactBold: {
    fontWeight: 'bold',
  },
});
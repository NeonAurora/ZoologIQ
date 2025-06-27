import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

  const adaptations = [
    {
      icon: 'pets',
      title: 'Powerful Bite',
      description: '1,000 psi bite force can crush bones',
      color: '#FF6B35'
    },
    {
      icon: 'waves',
      title: 'Excellent Swimmer',
      description: 'Unlike most cats, tigers are strong swimmers',
      color: '#2196F3'
    },
    {
      icon: 'visibility',
      title: 'Perfect Camouflage',
      description: 'Unique stripe patterns blend into forest shadows',
      color: '#4CAF50'
    }
  ];

  const funFacts = [
    'Unique stripe patterns are like fingerprints - no two tigers are identical',
    'Smallest mainland tiger subspecies yet can leap over 5 meters',
    'Excellent night vision with eyes that reflect light',
    'Use "chuffing" sounds for friendly communication'
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Fact Sheet Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="description" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Fact Sheet</ThemedText>
        </View>
        
        <View style={[
          styles.factSheet,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
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
      </View>

      {/* Taxonomy Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="account-tree" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Classification</ThemedText>
        </View>
        
        <View style={[
          styles.taxonomyTable,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
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
      </View>

      {/* Adaptations Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="fitness-center" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Key Adaptations</ThemedText>
        </View>
        
        <View style={styles.adaptationsGrid}>
          {adaptations.map((adaptation, index) => (
            <View key={index} style={[
              styles.adaptationCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.adaptationIcon,
                { backgroundColor: adaptation.color + '20' }
              ]}>
                <MaterialIcons 
                  name={adaptation.icon} 
                  size={24} 
                  color={adaptation.color} 
                />
              </View>
              <View style={styles.adaptationContent}>
                <ThemedText style={styles.adaptationTitle}>
                  {adaptation.title}
                </ThemedText>
                <ThemedText style={styles.adaptationDesc}>
                  {adaptation.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Fun Facts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="lightbulb" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Key Facts</ThemedText>
        </View>
        
        <View style={[
          styles.factsContainer,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {funFacts.map((fact, index) => (
            <View key={index} style={styles.factItem}>
              <View style={[
                styles.factBullet,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]} />
              <ThemedText style={styles.factText}>{fact}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  
  // Section Structure
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Fact Sheet
  factSheet: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  factRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    alignItems: 'center',
  },
  factLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  factValue: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },

  // Taxonomy Table
  taxonomyTable: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taxonomyRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44,
    alignItems: 'center',
  },
  taxonomyRank: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  taxonomyName: {
    fontSize: 13,
    fontStyle: 'italic',
    flex: 1.5,
  },
  taxonomyCommon: {
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
    opacity: 0.7,
  },

  // Adaptations Grid
  adaptationsGrid: {
    gap: 12,
  },
  adaptationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  adaptationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  adaptationContent: {
    flex: 1,
  },
  adaptationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  adaptationDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Fun Facts
  factsContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  factBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  factText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
});
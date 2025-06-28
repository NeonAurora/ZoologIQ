// components/lesson/turtle/sections/TurtleBiology.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleBiology() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const adaptations = [
    {
      icon: '🏊‍♂️',
      title: 'Streamlined Shell',
      description: 'The smooth, heart-shaped carapace reduces water resistance, aiding efficient swimming',
      color: '#2196F3'
    },
    {
      icon: '🫁',
      title: 'Diving Lungs',
      description: 'Large, efficient lungs allow them to hold their breath for hours while resting underwater',
      color: '#00BCD4'
    },
    {
      icon: '🧂',
      title: 'Salt Glands',
      description: 'Specialized glands near the eyes excrete excess salt from seawater, enabling life in saline environments',
      color: '#607D8B'
    },
    {
      icon: '🧭',
      title: 'Magnetic Navigation',
      description: 'Use Earth\'s magnetic fields to navigate thousands of kilometers between feeding and nesting sites',
      color: '#9C27B0'
    }
  ];

  const taxonomyData = [
    { rank: 'Kingdom', classification: 'Animalia' },
    { rank: 'Phylum', classification: 'Chordata' },
    { rank: 'Class', classification: 'Reptilia' },
    { rank: 'Order', classification: 'Testudines' },
    { rank: 'Family', classification: 'Cheloniidae' },
    { rank: 'Genus', classification: 'Chelonia' },
    { rank: 'Species', classification: 'Chelonia mydas' }
  ];

  const physicalFeatures = [
    {
      feature: 'Size',
      details: 'Up to 1 meter in length',
      icon: '📏'
    },
    {
      feature: 'Weight',
      details: 'Up to 160 kg for adults',
      icon: '⚖️'
    },
    {
      feature: 'Shell',
      details: 'Smooth, greenish carapace',
      icon: '🛡️'
    },
    {
      feature: 'Flippers',
      details: 'Powerful forelimbs adapted for swimming',
      icon: '🏊'
    }
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Taxonomic Classification */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="science" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Scientific Classification</ThemedText>
        </View>

        <View style={[
          styles.taxonomyCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {taxonomyData.map((item, index) => (
            <View key={index} style={[
              styles.taxonomyRow,
              index < taxonomyData.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={styles.taxonomyRank}>{item.rank}</ThemedText>
              <ThemedText style={[
                styles.taxonomyValue,
                item.rank === 'Species' && styles.speciesName
              ]}>
                {item.classification}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Physical Features */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="straighten" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Physical Characteristics</ThemedText>
        </View>

        <View style={styles.featuresGrid}>
          {physicalFeatures.map((item, index) => (
            <View key={index} style={[
              styles.featureCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={styles.featureIcon}>{item.icon}</ThemedText>
              <ThemedText style={styles.featureTitle}>{item.feature}</ThemedText>
              <ThemedText style={styles.featureDetails}>{item.details}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Remarkable Adaptations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="settings" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Remarkable Adaptations</ThemedText>
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
              <View style={[styles.adaptationIcon, { backgroundColor: `${adaptation.color}20` }]}>
                <ThemedText style={styles.adaptationEmoji}>{adaptation.icon}</ThemedText>
              </View>
              <View style={styles.adaptationContent}>
                <ThemedText style={styles.adaptationTitle}>{adaptation.title}</ThemedText>
                <ThemedText style={styles.adaptationDesc}>{adaptation.description}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Coloration & Camouflage */}
      <View style={styles.section}>
        <View style={[
          styles.colorationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#4CAF50'
          }
        ]}>
          <View style={styles.colorationHeader}>
            <MaterialIcons name="palette" size={20} color="#4CAF50" />
            <ThemedText style={styles.colorationTitle}>Green Coloration</ThemedText>
          </View>
          <ThemedText style={styles.colorationText}>
            The Green Sea Turtle gets its name from the greenish hue of their fat, which comes from 
            their diet of seagrasses and algae. This coloration helps them camouflage among seagrass beds, 
            providing protection from predators while they graze.
          </ThemedText>
        </View>
      </View>

      {/* Temperature Regulation */}
      <View style={styles.section}>
        <View style={[
          styles.thermoCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF9800'
          }
        ]}>
          <View style={styles.thermoHeader}>
            <MaterialIcons name="thermostat" size={20} color="#FF9800" />
            <ThemedText style={styles.thermoTitle}>Temperature Regulation</ThemedText>
          </View>
          <ThemedText style={styles.thermoText}>
            As ectothermic animals, Green Sea Turtles rely on external temperatures to regulate their body heat. 
            This drives behaviors like basking in the sun at the surface or seeking warmer waters during 
            different seasons and life stages.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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

  // Taxonomy Section
  taxonomyCard: {
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  taxonomyRank: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  taxonomyValue: {
    flex: 2,
    fontSize: 14,
  },
  speciesName: {
    fontStyle: 'italic',
    fontWeight: '600',
  },

  // Features Grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
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
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDetails: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  adaptationEmoji: {
    fontSize: 20,
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

  // Special Cards
  colorationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  colorationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  colorationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  colorationText: {
    fontSize: 15,
    lineHeight: 22,
  },

  thermoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  thermoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  thermoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  thermoText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
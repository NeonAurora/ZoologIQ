// components/lesson/turtle/sections/TurtleReproduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleReproduction() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const reproductionStages = [
    {
      icon: '💑',
      title: 'Mating',
      description: 'Green Sea Turtles mate in shallow coastal waters near nesting beaches, typically during the breeding season',
      color: '#E91E63'
    },
    {
      icon: '🏖️',
      title: 'Nesting',
      description: 'Females return to the same beach where they were born (natal homing) to lay eggs, often at night',
      color: '#FF9800'
    },
    {
      icon: '🥚',
      title: 'Egg Laying',
      description: 'Each female lays 80-120 eggs per nest, and nests multiple times (up to 7) during a single season',
      color: '#4CAF50'
    },
    {
      icon: '🌡️',
      title: 'Incubation',
      description: 'Eggs incubate for ~60 days; sand temperature influences the sex of hatchlings (warmer = more females)',
      color: '#FF5722'
    },
    {
      icon: '🌙',
      title: 'Emergence',
      description: 'Hatchlings emerge at night to avoid predators and use moonlight to navigate toward the ocean',
      color: '#3F51B5'
    },
    {
      icon: '🌊',
      title: 'Ocean Journey',
      description: 'Juveniles drift in ocean currents for several years, feeding on plankton before moving to coastal habitats',
      color: '#2196F3'
    }
  ];

  const lifeStages = [
    {
      stage: 'Hatchling',
      duration: '0-1 years',
      habitat: 'Open ocean currents',
      diet: 'Plankton, small organisms'
    },
    {
      stage: 'Juvenile',
      duration: '1-20 years',
      habitat: 'Coastal waters, coral reefs',
      diet: 'Transition to herbivorous diet'
    },
    {
      stage: 'Sub-adult',
      duration: '20-30 years',
      habitat: 'Foraging areas, seagrass beds',
      diet: 'Seagrasses, algae'
    },
    {
      stage: 'Adult',
      duration: '30-70 years',
      habitat: 'Feeding and nesting areas',
      diet: 'Primarily seagrasses and algae'
    }
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Reproduction Cycle */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="family-restroom" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Reproduction Cycle</ThemedText>
        </View>

        <View style={styles.stagesGrid}>
          {reproductionStages.map((stage, index) => (
            <View key={index} style={[
              styles.stageCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[styles.stageIcon, { backgroundColor: `${stage.color}20` }]}>
                <ThemedText style={styles.stageEmoji}>{stage.icon}</ThemedText>
              </View>
              <View style={styles.stageContent}>
                <ThemedText style={styles.stageTitle}>{stage.title}</ThemedText>
                <ThemedText style={styles.stageDesc}>{stage.description}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Life Stages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="timeline" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Life Stages</ThemedText>
        </View>

        <View style={styles.lifeStagesContainer}>
          {lifeStages.map((stage, index) => (
            <View key={index} style={[
              styles.lifeStageCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.lifeStageHeader}>
                <ThemedText style={styles.lifeStageTitle}>{stage.stage}</ThemedText>
                <ThemedText style={styles.lifeStageDuration}>{stage.duration}</ThemedText>
              </View>
              <View style={styles.lifeStageDetails}>
                <View style={styles.lifeStageRow}>
                  <MaterialIcons name="place" size={16} color="#4CAF50" />
                  <ThemedText style={styles.lifeStageLabel}>Habitat:</ThemedText>
                  <ThemedText style={styles.lifeStageValue}>{stage.habitat}</ThemedText>
                </View>
                <View style={styles.lifeStageRow}>
                  <MaterialIcons name="restaurant" size={16} color="#FF9800" />
                  <ThemedText style={styles.lifeStageLabel}>Diet:</ThemedText>
                  <ThemedText style={styles.lifeStageValue}>{stage.diet}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Temperature & Sex Determination */}
      <View style={styles.section}>
        <View style={[
          styles.temperatureCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF5722'
          }
        ]}>
          <View style={styles.temperatureHeader}>
            <MaterialIcons name="thermostat" size={20} color="#FF5722" />
            <ThemedText style={styles.temperatureTitle}>Temperature-Dependent Sex Determination</ThemedText>
          </View>
          <ThemedText style={styles.temperatureText}>
            The sex of Green Sea Turtle hatchlings is determined by the temperature of the sand during incubation. 
            Warmer temperatures (above 29°C) produce more females, while cooler temperatures produce more males. 
            This makes them particularly vulnerable to climate change, as rising temperatures could lead to 
            heavily skewed sex ratios.
          </ThemedText>
        </View>
      </View>

      {/* Nesting Statistics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="analytics" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Nesting Statistics</ThemedText>
        </View>

        <View style={styles.statsGrid}>
          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>80-120</ThemedText>
            <ThemedText style={styles.statLabel}>Eggs per clutch</ThemedText>
          </View>

          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>Up to 7</ThemedText>
            <ThemedText style={styles.statLabel}>Nests per season</ThemedText>
          </View>

          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>~60 days</ThemedText>
            <ThemedText style={styles.statLabel}>Incubation period</ThemedText>
          </View>

          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>20-50 years</ThemedText>
            <ThemedText style={styles.statLabel}>Age at maturity</ThemedText>
          </View>
        </View>
      </View>

      {/* Natal Homing */}
      <View style={styles.section}>
        <View style={[
          styles.homingCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.homingHeader}>
            <MaterialIcons name="home" size={20} color="#2196F3" />
            <ThemedText style={styles.homingTitle}>Remarkable Natal Homing</ThemedText>
          </View>
          <ThemedText style={styles.homingText}>
            One of the most amazing aspects of Green Sea Turtle reproduction is natal homing - the ability of 
            females to return to the exact beach where they were born to lay their own eggs. This incredible 
            navigation feat occurs after decades of ocean wandering, demonstrating their exceptional memory 
            and spatial awareness abilities.
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

  // Stages Grid
  stagesGrid: {
    gap: 12,
  },
  stageCard: {
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
  stageIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stageEmoji: {
    fontSize: 20,
  },
  stageContent: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stageDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Life Stages
  lifeStagesContainer: {
    gap: 12,
  },
  lifeStageCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lifeStageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lifeStageTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  lifeStageDuration: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: '500',
  },
  lifeStageDetails: {
    gap: 8,
  },
  lifeStageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lifeStageLabel: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 60,
  },
  lifeStageValue: {
    fontSize: 14,
    flex: 1,
    opacity: 0.8,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
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
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },

  // Special Cards
  temperatureCard: {
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
  temperatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  temperatureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  temperatureText: {
    fontSize: 15,
    lineHeight: 22,
  },

  homingCard: {
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
  homingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  homingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  homingText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
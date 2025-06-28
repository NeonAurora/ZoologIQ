// components/lesson/turtle/sections/TurtleThreats.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleThreats() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const majorThreats = [
    {
      icon: '🏗️',
      title: 'Habitat Loss',
      description: 'Coastal development and tourism destroy nesting and feeding habitats',
      severity: 'Critical',
      severityColor: '#F44336',
      impact: 'Loss of nesting beaches and seagrass beds'
    },
    {
      icon: '🎣',
      title: 'Bycatch',
      description: 'Accidental capture in fishing gear such as nets and longlines results in injuries or death',
      severity: 'High',
      severityColor: '#FF9800',
      impact: 'Direct mortality from fishing operations'
    },
    {
      icon: '🏭',
      title: 'Pollution',
      description: 'Plastic waste ingestion and oil spills harm turtles directly or degrade their habitats',
      severity: 'High',
      severityColor: '#FF9800',
      impact: 'Internal injuries and habitat degradation'
    },
    {
      icon: '🌡️',
      title: 'Climate Change',
      description: 'Rising temperatures affect sex ratios of hatchlings and cause habitat changes due to rising sea levels',
      severity: 'Critical',
      severityColor: '#F44336',
      impact: 'Skewed sex ratios and habitat loss'
    },
    {
      icon: '🚫',
      title: 'Illegal Trade',
      description: 'Poaching for meat, eggs, and shells contributes to population decline',
      severity: 'High',
      severityColor: '#FF9800',
      impact: 'Direct population reduction'
    },
    {
      icon: '🦠',
      title: 'Diseases',
      description: 'Fibropapillomatosis, a disease associated with environmental degradation, affects turtle health',
      severity: 'Moderate',
      severityColor: '#FF5722',
      impact: 'Health complications and mortality'
    },
    {
      icon: '🚤',
      title: 'Boat Strikes',
      description: 'Collisions with boats cause severe injuries or fatalities, especially in coastal regions',
      severity: 'Moderate',
      severityColor: '#FF5722',
      impact: 'Physical injuries and death'
    }
  ];

  const pollutionTypes = [
    {
      type: 'Plastic Pollution',
      description: 'Turtles mistake plastic bags for jellyfish, leading to intestinal blockages',
      icon: '🛍️'
    },
    {
      type: 'Chemical Pollution',
      description: 'Oil spills and chemical runoff contaminate feeding areas and nesting beaches',
      icon: '⚗️'
    },
    {
      type: 'Light Pollution',
      description: 'Artificial lights confuse hatchlings, leading them away from the ocean',
      icon: '💡'
    },
    {
      type: 'Noise Pollution',
      description: 'Boat traffic and coastal development disrupt natural behaviors',
      icon: '🔊'
    }
  ];

  const climateImpacts = [
    'Rising sea levels flood nesting beaches',
    'Increased sand temperatures produce mostly female hatchlings',
    'Ocean acidification affects food sources',
    'Changing ocean currents disrupt migration routes',
    'More frequent storms destroy nesting sites'
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Major Threats Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="warning" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Major Threats</ThemedText>
        </View>

        <View style={styles.threatsGrid}>
          {majorThreats.map((threat, index) => (
            <View key={index} style={[
              styles.threatCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.threatHeader}>
                <View style={[styles.threatIcon, { backgroundColor: `${threat.severityColor}20` }]}>
                  <ThemedText style={styles.threatEmoji}>{threat.icon}</ThemedText>
                </View>
                <View style={styles.threatTitleContainer}>
                  <ThemedText style={styles.threatTitle}>{threat.title}</ThemedText>
                  <View style={[styles.severityBadge, { backgroundColor: threat.severityColor }]}>
                    <ThemedText style={styles.severityText}>{threat.severity}</ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={styles.threatDesc}>{threat.description}</ThemedText>
              <View style={[styles.impactBadge, { backgroundColor: `${threat.severityColor}15` }]}>
                <MaterialIcons name="info" size={16} color={threat.severityColor} />
                <ThemedText style={[styles.impactText, { color: threat.severityColor }]}>
                  {threat.impact}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Pollution Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="eco" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Types of Pollution</ThemedText>
        </View>

        <View style={styles.pollutionGrid}>
          {pollutionTypes.map((pollution, index) => (
            <View key={index} style={[
              styles.pollutionCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.pollutionHeader}>
                <ThemedText style={styles.pollutionIcon}>{pollution.icon}</ThemedText>
                <ThemedText style={styles.pollutionTitle}>{pollution.type}</ThemedText>
              </View>
              <ThemedText style={styles.pollutionDesc}>{pollution.description}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Climate Change Impact */}
      <View style={styles.section}>
        <View style={[
          styles.climateCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#F44336'
          }
        ]}>
          <View style={styles.climateHeader}>
            <MaterialIcons name="thermostat" size={20} color="#F44336" />
            <ThemedText style={styles.climateTitle}>Climate Change Impacts</ThemedText>
          </View>
          <View style={styles.climateList}>
            {climateImpacts.map((impact, index) => (
              <View key={index} style={styles.climateItem}>
                <View style={[styles.climateBullet, { backgroundColor: '#F44336' }]} />
                <ThemedText style={styles.climateText}>{impact}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bycatch Details */}
      <View style={styles.section}>
        <View style={[
          styles.bycatchCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF9800'
          }
        ]}>
          <View style={styles.bycatchHeader}>
            <MaterialIcons name="sailing" size={20} color="#FF9800" />
            <ThemedText style={styles.bycatchTitle}>Fishing Industry Impact</ThemedText>
          </View>
          <ThemedText style={styles.bycatchText}>
            Bycatch is one of the most serious threats to Green Sea Turtles. They often get caught in fishing 
            nets, longlines, and trawls while foraging for food. This accidental capture can lead to drowning, 
            severe injuries, or death. Commercial fishing operations worldwide are working to implement 
            Turtle Excluder Devices (TEDs) to reduce these incidents.
          </ThemedText>
        </View>
      </View>

      {/* Human Development Impact */}
      <View style={styles.section}>
        <View style={[
          styles.developmentCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#9C27B0'
          }
        ]}>
          <View style={styles.developmentHeader}>
            <MaterialIcons name="location-city" size={20} color="#9C27B0" />
            <ThemedText style={styles.developmentTitle}>Coastal Development Pressure</ThemedText>
          </View>
          <ThemedText style={styles.developmentText}>
            Rapid coastal development for tourism and residential purposes destroys critical nesting beaches. 
            Hotels, resorts, and residential buildings built too close to beaches prevent female turtles from 
            nesting successfully. Light pollution from these developments also disorients hatchlings, 
            causing them to crawl toward artificial lights instead of the ocean.
          </ThemedText>
        </View>
      </View>

      {/* Illegal Trade Impact */}
      <View style={styles.section}>
        <View style={[
          styles.tradeCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#E91E63'
          }
        ]}>
          <View style={styles.tradeHeader}>
            <MaterialIcons name="gavel" size={20} color="#E91E63" />
            <ThemedText style={styles.tradeTitle}>Illegal Exploitation</ThemedText>
          </View>
          <ThemedText style={styles.tradeText}>
            Despite international protection laws, Green Sea Turtles are still hunted illegally for their meat, 
            eggs, and shells. Their eggs are considered a delicacy in some regions, and their shells are used 
            to make jewelry and decorative items. This illegal trade significantly impacts already vulnerable 
            populations and threatens long-term species survival.
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

  // Threats Grid
  threatsGrid: {
    gap: 16,
  },
  threatCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  threatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  threatEmoji: {
    fontSize: 18,
  },
  threatTitleContainer: {
    flex: 1,
  },
  threatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  threatDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    gap: 6,
  },
  impactText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },

  // Pollution Grid
  pollutionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pollutionCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  pollutionHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  pollutionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  pollutionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  pollutionDesc: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 18,
  },

  // Special Cards
  climateCard: {
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
  climateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  climateTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  climateList: {
    gap: 10,
  },
  climateItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  climateBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  climateText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },

  bycatchCard: {
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
  bycatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  bycatchTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  bycatchText: {
    fontSize: 15,
    lineHeight: 22,
  },

  developmentCard: {
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
  developmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  developmentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  developmentText: {
    fontSize: 15,
    lineHeight: 22,
  },

  tradeCard: {
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
  tradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tradeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tradeText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
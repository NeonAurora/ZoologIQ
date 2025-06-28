// components/lesson/turtle/sections/TurtleBiodiversity.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleBiodiversity() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const ecosystemRoles = [
    {
      icon: '🌱',
      title: 'Seagrass Maintenance',
      description: 'Grazing helps maintain healthy seagrass meadows, promoting growth and preventing overgrowth',
      impact: 'Critical for seagrass ecosystem health',
      color: '#4CAF50'
    },
    {
      icon: '🪸',
      title: 'Coral Reef Health',
      description: 'Controls algae on coral reefs, allowing corals to thrive and maintain reef ecosystems',
      impact: 'Essential for coral survival',
      color: '#FF7043'
    },
    {
      icon: '🔄',
      title: 'Nutrient Cycling',
      description: 'Movement between nesting beaches and feeding grounds distributes nutrients, enriching ecosystems',
      impact: 'Connects marine and terrestrial systems',
      color: '#2196F3'
    },
    {
      icon: '🎯',
      title: 'Indicator Species',
      description: 'Acts as a biological indicator of ocean health due to sensitivity to habitat changes',
      impact: 'Reflects ecosystem condition',
      color: '#9C27B0'
    }
  ];

  const populationData = [
    { year: '2019', malaysia: '3,900', global: '450,000', trend: 'Baseline activity' },
    { year: '2020', malaysia: '4,500', global: '460,000', trend: 'Pandemic restrictions helped' },
    { year: '2021', malaysia: '5,200', global: '475,000', trend: 'Recovery continued' },
    { year: '2022', malaysia: '6,700', global: '490,000', trend: 'Conservation efforts paying off' },
    { year: '2023', malaysia: '10,100', global: '510,000', trend: 'Significant jump in Malaysia' },
    { year: '2024', malaysia: '9,200', global: '520,000', trend: 'Slight dip, but globally stable' }
  ];

  const habitatSupport = [
    'Seagrass meadows serve as nurseries for fish and invertebrates',
    'Coral reefs provide habitat for 25% of all marine species',
    'Beach ecosystems benefit from turtle nesting activities',
    'Open ocean food webs depend on turtle migrations',
    'Coastal vegetation benefits from nutrient deposition'
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Ecosystem Roles */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="eco" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Role in Biodiversity</ThemedText>
        </View>

        <View style={styles.rolesGrid}>
          {ecosystemRoles.map((role, index) => (
            <View key={index} style={[
              styles.roleCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[styles.roleIcon, { backgroundColor: `${role.color}20` }]}>
                <ThemedText style={styles.roleEmoji}>{role.icon}</ThemedText>
              </View>
              <View style={styles.roleContent}>
                <ThemedText style={styles.roleTitle}>{role.title}</ThemedText>
                <ThemedText style={styles.roleDesc}>{role.description}</ThemedText>
                <View style={[styles.impactBadge, { backgroundColor: `${role.color}15` }]}>
                  <ThemedText style={[styles.impactText, { color: role.color }]}>
                    {role.impact}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Population Trends */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="trending-up" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Population Trends (2019-2024)</ThemedText>
        </View>

        <View style={[
          styles.populationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.populationHeader}>
            <ThemedText style={styles.populationTitle}>Nesting Females (Estimates)</ThemedText>
          </View>
          
          {populationData.map((data, index) => (
            <View key={index} style={[
              styles.populationRow,
              index < populationData.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.yearColumn}>
                <ThemedText style={styles.yearText}>{data.year}</ThemedText>
              </View>
              <View style={styles.dataColumn}>
                <ThemedText style={styles.dataLabel}>Malaysia:</ThemedText>
                <ThemedText style={styles.dataValue}>{data.malaysia}</ThemedText>
              </View>
              <View style={styles.dataColumn}>
                <ThemedText style={styles.dataLabel}>Global:</ThemedText>
                <ThemedText style={styles.dataValue}>{data.global}</ThemedText>
              </View>
              <View style={styles.trendColumn}>
                <ThemedText style={styles.trendText}>{data.trend}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Habitat Support */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="nature" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Supporting Marine Habitats</ThemedText>
        </View>

        <View style={[
          styles.habitatCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.habitatList}>
            {habitatSupport.map((support, index) => (
              <View key={index} style={styles.habitatItem}>
                <View style={[
                  styles.habitatBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={styles.habitatText}>{support}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Food Web Dynamics */}
      <View style={styles.section}>
        <View style={[
          styles.foodWebCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#4CAF50'
          }
        ]}>
          <View style={styles.foodWebHeader}>
            <MaterialIcons name="account-tree" size={20} color="#4CAF50" />
            <ThemedText style={styles.foodWebTitle}>Food Web Connections</ThemedText>
          </View>
          <ThemedText style={styles.foodWebText}>
            Green Sea Turtles are integral to marine food webs. Their eggs and hatchlings provide crucial 
            food sources for predators like crabs, birds, and fish. As adults, they help maintain the 
            balance between primary producers (seagrasses and algae) and the ecosystems that depend on them. 
            Their presence indicates a healthy, functioning marine environment.
          </ThemedText>
        </View>
      </View>

      {/* Climate Impact */}
      <View style={styles.section}>
        <View style={[
          styles.climateCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF5722'
          }
        ]}>
          <View style={styles.climateHeader}>
            <MaterialIcons name="thermostat" size={20} color="#FF5722" />
            <ThemedText style={styles.climateTitle}>Climate Change Vulnerability</ThemedText>
          </View>
          <ThemedText style={styles.climateText}>
            As ectothermic animals sensitive to temperature changes, Green Sea Turtles serve as early 
            indicators of climate change impacts. Rising sea temperatures affect their food sources, 
            while increasing sand temperatures alter hatchling sex ratios. Their vulnerability makes 
            them important sentinels for ocean health and climate change monitoring.
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

  // Roles Grid
  rolesGrid: {
    gap: 16,
  },
  roleCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleEmoji: {
    fontSize: 20,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  roleDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Population Trends
  populationCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  populationHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  populationTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  populationRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  yearColumn: {
    width: 50,
  },
  yearText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dataColumn: {
    flex: 1,
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  trendColumn: {
    flex: 2,
    paddingLeft: 8,
  },
  trendText: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'right',
  },

  // Habitat Support
  habitatCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  habitatList: {
    gap: 12,
  },
  habitatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  habitatBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  habitatText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },

  // Special Cards
  foodWebCard: {
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
  foodWebHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  foodWebTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  foodWebText: {
    fontSize: 15,
    lineHeight: 22,
  },

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
  climateText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
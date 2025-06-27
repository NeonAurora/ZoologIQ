// components/lesson/tapir/sections/TapirEcology.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirEcology() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const habitatPreferences = [
    {
      icon: 'forest',
      title: 'Dense Tropical Rainforests',
      location: 'Peninsular Malaysia, Southern Thailand, Sumatra',
      description: 'Primary habitat with thick canopy cover',
      details: 'Requires undisturbed forests with diverse plant species'
    },
    {
      icon: 'water',
      title: 'Near Water Sources',
      location: 'Rivers, streams, swamps',
      description: 'Essential for drinking, cooling, and escape routes',
      details: 'Daily access to water is critical for survival'
    },
    {
      icon: 'terrain',
      title: 'Lowland Areas',
      location: 'Below 1,000m elevation',
      description: 'Prefers gentle terrain with rich vegetation',
      details: 'Avoids steep mountainous regions'
    },
    {
      icon: 'nature-people',
      title: 'Minimal Human Disturbance',
      location: 'Protected areas and remote forests',
      description: 'Highly sensitive to human activities',
      details: 'Abandons areas with regular human presence'
    }
  ];

  const ecologicalRoles = [
    {
      icon: 'eco',
      title: 'Seed Dispersal',
      impact: 'Thousands of seeds daily',
      description: 'Primary forest regeneration mechanism',
      benefit: 'Maintains forest diversity across large areas'
    },
    {
      icon: 'balance',
      title: 'Vegetation Control',
      impact: 'Natural pruning',
      description: 'Prevents overgrowth of certain plant species',
      benefit: 'Promotes diverse plant communities'
    },
    {
      icon: 'route',
      title: 'Path Creation',
      impact: 'Forest trail networks',
      description: 'Creates pathways used by other wildlife',
      benefit: 'Facilitates animal movement and gene flow'
    },
    {
      icon: 'recycling',
      title: 'Nutrient Cycling',
      impact: 'Soil enrichment',
      description: 'Distributes nutrients through dung',
      benefit: 'Improves soil fertility across territories'
    }
  ];

  const dietDetails = [
    {
      category: 'Fruits',
      percentage: '40%',
      examples: 'Figs, berries, palm fruits',
      seasonality: 'Year-round, peak in fruiting seasons',
      role: 'Primary seed dispersal source'
    },
    {
      category: 'Leaves',
      percentage: '30%',
      examples: 'Young shoots, tender leaves',
      seasonality: 'Consistent availability',
      role: 'Main nutrition and fiber source'
    },
    {
      category: 'Aquatic Plants',
      percentage: '20%',
      examples: 'Water lilies, algae, marsh plants',
      seasonality: 'During water foraging',
      role: 'Minerals and hydration'
    },
    {
      category: 'Bark & Twigs',
      percentage: '10%',
      examples: 'Soft bark, young branches',
      seasonality: 'Dry season supplement',
      role: 'Emergency food during scarcity'
    }
  ];

  const keystone_impacts = [
    {
      species: 'Forest Birds',
      relationship: 'Indirect benefit',
      description: 'Tapir-dispersed seeds create diverse fruiting trees',
      impact: 'Increased food sources and nesting sites'
    },
    {
      species: 'Small Mammals',
      relationship: 'Trail usage',
      description: 'Use tapir-created paths for movement',
      impact: 'Enhanced habitat connectivity'
    },
    {
      species: 'Insects',
      relationship: 'Habitat diversity',
      description: 'Benefit from diverse plant communities',
      impact: 'Higher biodiversity and pollination services'
    },
    {
      species: 'Other Herbivores',
      relationship: 'Reduced competition',
      description: 'Tapirs control dominant plant species',
      impact: 'More food variety for smaller herbivores'
    }
  ];

  const conservationValue = [
    {
      aspect: 'Flagship Species',
      description: 'Charismatic megafauna for conservation marketing',
      value: 'Attracts funding and public attention to forest protection'
    },
    {
      aspect: 'Umbrella Effect',
      description: 'Protecting tapirs safeguards entire ecosystems',
      value: 'Large home ranges encompass habitats of many species'
    },
    {
      aspect: 'Indicator Species',
      description: 'Tapir presence indicates healthy forest ecosystems',
      value: 'Early warning system for environmental degradation'
    },
    {
      aspect: 'Cultural Significance',
      description: 'Important in Malaysian indigenous cultures',
      value: 'Bridges traditional knowledge with modern conservation'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Habitat Requirements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="home" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Habitat Requirements
          </ThemedText>
        </View>
        
        <View style={styles.habitatGrid}>
          {habitatPreferences.map((habitat, index) => (
            <View key={index} style={[
              styles.habitatCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.habitatHeader}>
                <View style={[
                  styles.habitatIcon,
                  { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                ]}>
                  <MaterialIcons 
                    name={habitat.icon} 
                    size={20} 
                    color={isDark ? Colors.dark.tint : Colors.light.tint} 
                  />
                </View>
                <View style={styles.habitatTitleContainer}>
                  <ThemedText style={[
                    styles.habitatTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {habitat.title}
                  </ThemedText>
                  <ThemedText style={[
                    styles.habitatLocation,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    📍 {habitat.location}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.habitatDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {habitat.description}
              </ThemedText>
              <View style={[
                styles.habitatDetails,
                { backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#F8F9FA' }
              ]}>
                <ThemedText style={[
                  styles.habitatDetailsText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  💡 {habitat.details}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Ecological Roles */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="hub" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Ecological Roles & Impact
          </ThemedText>
        </View>
        
        <View style={styles.rolesGrid}>
          {ecologicalRoles.map((role, index) => (
            <View key={index} style={[
              styles.roleCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.roleHeader}>
                <MaterialIcons 
                  name={role.icon} 
                  size={24} 
                  color="#4CAF50" 
                />
                <View style={styles.roleInfo}>
                  <ThemedText style={[
                    styles.roleTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {role.title}
                  </ThemedText>
                  <ThemedText style={[
                    styles.roleImpact,
                    { color: '#4CAF50' }
                  ]}>
                    {role.impact}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.roleDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {role.description}
              </ThemedText>
              <ThemedText style={[
                styles.roleBenefit,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                ✅ {role.benefit}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Diet & Foraging */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="restaurant" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Diet & Foraging Behavior
          </ThemedText>
        </View>
        
        <View style={[
          styles.dietCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {dietDetails.map((diet, index) => (
            <View key={index} style={[
              styles.dietItem,
              index < dietDetails.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.dietHeader}>
                <View style={styles.dietCategory}>
                  <ThemedText style={[
                    styles.dietName,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {diet.category}
                  </ThemedText>
                  <View style={[
                    styles.percentageBadge,
                    { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                  ]}>
                    <ThemedText style={[
                      styles.percentageText,
                      { color: isDark ? Colors.dark.tint : Colors.light.tint }
                    ]}>
                      {diet.percentage}
                    </ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={[
                styles.dietExamples,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Examples: {diet.examples}
              </ThemedText>
              <ThemedText style={[
                styles.dietSeasonality,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                🗓️ {diet.seasonality}
              </ThemedText>
              <ThemedText style={[
                styles.dietRole,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                🎯 {diet.role}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Keystone Species Impact */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="group-work" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Keystone Species Impact
          </ThemedText>
        </View>
        
        <ThemedText style={[
          styles.keystoneIntro,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          As a keystone species, tapirs have disproportionate effects on their ecosystem relative to their numbers:
        </ThemedText>
        
        <View style={styles.keystoneGrid}>
          {keystone_impacts.map((impact, index) => (
            <View key={index} style={[
              styles.keystoneCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.keystoneHeader}>
                <ThemedText style={[
                  styles.keystoneSpecies,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {impact.species}
                </ThemedText>
                <View style={[
                  styles.relationshipBadge,
                  { backgroundColor: '#2196F320' }
                ]}>
                  <ThemedText style={[
                    styles.relationshipText,
                    { color: '#2196F3' }
                  ]}>
                    {impact.relationship}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.keystoneDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {impact.description}
              </ThemedText>
              <ThemedText style={[
                styles.keystoneImpact,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📈 {impact.impact}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Conservation Value */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="star" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Conservation Value
          </ThemedText>
        </View>
        
        <View style={styles.valueList}>
          {conservationValue.map((value, index) => (
            <View key={index} style={[
              styles.valueItem,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.valueAspect,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🌟 {value.aspect}
              </ThemedText>
              <ThemedText style={[
                styles.valueDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {value.description}
              </ThemedText>
              <View style={[
                styles.valueBox,
                { backgroundColor: isDark ? '#4CAF5010' : '#E8F5E8' }
              ]}>
                <ThemedText style={[
                  styles.valueText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  💰 {value.value}
                </ThemedText>
              </View>
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Habitat Grid
  habitatGrid: {
    gap: 16,
  },
  habitatCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  habitatHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  habitatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  habitatTitleContainer: {
    flex: 1,
  },
  habitatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  habitatLocation: {
    fontSize: 12,
  },
  habitatDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  habitatDetails: {
    padding: 8,
    borderRadius: 6,
  },
  habitatDetailsText: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Roles Grid
  rolesGrid: {
    gap: 12,
  },
  roleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleInfo: {
    marginLeft: 12,
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  roleImpact: {
    fontSize: 12,
    fontWeight: '500',
  },
  roleDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  roleBenefit: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Diet Card
  dietCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dietItem: {
    padding: 16,
  },
  dietHeader: {
    marginBottom: 8,
  },
  dietCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dietName: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dietExamples: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  dietSeasonality: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
  },
  dietRole: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Keystone Grid
  keystoneIntro: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  keystoneGrid: {
    gap: 12,
  },
  keystoneCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  keystoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  keystoneSpecies: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  relationshipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  relationshipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  keystoneDesc: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
  },
  keystoneImpact: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Value List
  valueList: {
    gap: 12,
  },
  valueItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  valueAspect: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  valueDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  valueBox: {
    padding: 8,
    borderRadius: 6,
  },
  valueText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
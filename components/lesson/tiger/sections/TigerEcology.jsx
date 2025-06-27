import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerEcology() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const behaviors = [
    {
      icon: 'location-on',
      title: 'Territory Marking',
      description: 'Use scent marks and scratches to claim large territories',
      color: '#FF9800'
    },
    {
      icon: 'home',
      title: 'Solitary Lifestyle',
      description: 'Maintain territories of 50–150 km² with minimal overlap',
      color: '#2196F3'
    },
    {
      icon: 'psychology',
      title: 'Hunting Intelligence',
      description: 'Advanced problem-solving and prey call mimicry',
      color: '#9C27B0'
    }
  ];

  const reproductionData = [
    {
      icon: 'family-restroom',
      label: 'Litter Size',
      value: '2–4 cubs every 2–3 years'
    },
    {
      icon: 'family-restroom',
      label: 'Maternal Care',
      value: 'Cubs stay with mother for up to 2 years'
    },
    {
      icon: 'man',
      label: 'Paternal Role',
      value: 'Males defend territory but don\'t raise cubs'
    }
  ];

  const globalData = [
    {
      country: 'India',
      population2020: '2,967',
      population2023: '3,167',
      trend: 'up',
      trendText: '↑ 6.7%',
      threats: 'Habitat loss, human conflict',
      isHighlighted: false
    },
    {
      country: 'Malaysia',
      population2020: '<150',
      population2023: '<150',
      trend: 'stable',
      trendText: '↔ Stable',
      threats: 'Poaching, deforestation',
      isHighlighted: true
    },
    {
      country: 'Indonesia',
      population2020: '400',
      population2023: '350',
      trend: 'down',
      trendText: '↓ 12.5%',
      threats: 'Palm oil deforestation',
      isHighlighted: false
    },
    {
      country: 'Russia',
      population2020: '540',
      population2023: '600',
      trend: 'up',
      trendText: '↑ 11%',
      threats: 'Logging, climate change',
      isHighlighted: false
    },
    {
      country: 'Bangladesh',
      population2020: '114',
      population2023: '106',
      trend: 'down',
      trendText: '↓ 7%',
      threats: 'Sea-level rise',
      isHighlighted: false
    }
  ];

  const keyInsights = [
    {
      region: 'India',
      insight: 'Highest density (75% of global tigers)'
    },
    {
      region: 'Malaysia & Indonesia',
      insight: 'Critical decline zones requiring urgent action'
    },
    {
      region: 'Russia',
      insight: 'Notable recovery through enhanced patrol efforts'
    },
    {
      region: 'Global',
      insight: '3,200 → ~3,900 wild tigers (still 96% below historic levels)'
    }
  ];

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      case 'stable': return '#FF9800';
      default: return isDark ? Colors.dark.textMuted : Colors.light.textMuted;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      case 'stable': return 'trending-flat';
      default: return 'remove';
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Behavior & Intelligence */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="psychology" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Behavior & Intelligence</ThemedText>
        </View>
        
        <View style={styles.behaviorsGrid}>
          {behaviors.map((behavior, index) => (
            <View key={index} style={[
              styles.behaviorCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.behaviorIcon,
                { backgroundColor: behavior.color + '20' }
              ]}>
                <MaterialIcons 
                  name={behavior.icon} 
                  size={24} 
                  color={behavior.color} 
                />
              </View>
              
              <View style={styles.behaviorContent}>
                <ThemedText style={styles.behaviorTitle}>
                  {behavior.title}
                </ThemedText>
                <ThemedText style={styles.behaviorDesc}>
                  {behavior.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Reproduction & Family */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="family-restroom" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Reproduction & Family</ThemedText>
        </View>
        
        <View style={[
          styles.reproductionCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {reproductionData.map((item, index) => (
            <View key={index} style={[
              styles.reproductionItem,
              index !== reproductionData.length - 1 && {
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
                borderBottomWidth: 1
              }
            ]}>
              <View style={styles.reproductionItemHeader}>
                <MaterialIcons 
                  name={item.icon} 
                  size={18} 
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
                />
                <ThemedText style={styles.reproductionLabel}>
                  {item.label}
                </ThemedText>
              </View>
              <ThemedText style={styles.reproductionValue}>
                {item.value}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Global Tiger Comparison */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="public" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Global Tiger Population</ThemedText>
        </View>
        
        <View style={styles.comparisonContainer}>
          {globalData.map((country, index) => (
            <View key={index} style={[
              styles.countryCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              },
              country.isHighlighted && {
                borderLeftColor: '#FF6B35',
                borderLeftWidth: 4
              }
            ]}>
              <View style={styles.countryHeader}>
                <ThemedText style={[
                  styles.countryName,
                  country.isHighlighted && styles.highlightedCountry
                ]}>
                  {country.country}
                  {country.isHighlighted && (
                    <MaterialIcons name="star" size={16} color="#FF6B35" style={{ marginLeft: 4 }} />
                  )}
                </ThemedText>
                
                <View style={[
                  styles.trendBadge,
                  { backgroundColor: getTrendColor(country.trend) + '20' }
                ]}>
                  <MaterialIcons 
                    name={getTrendIcon(country.trend)} 
                    size={14} 
                    color={getTrendColor(country.trend)} 
                  />
                  <ThemedText style={[
                    styles.trendText,
                    { color: getTrendColor(country.trend) }
                  ]}>
                    {country.trendText}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.populationData}>
                <View style={styles.populationItem}>
                  <ThemedText style={styles.populationLabel}>2020</ThemedText>
                  <ThemedText style={styles.populationValue}>{country.population2020}</ThemedText>
                </View>
                
                <MaterialIcons 
                  name="arrow-forward" 
                  size={16} 
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                />
                
                <View style={styles.populationItem}>
                  <ThemedText style={styles.populationLabel}>2023</ThemedText>
                  <ThemedText style={styles.populationValue}>{country.population2023}</ThemedText>
                </View>
              </View>
              
              <View style={styles.threatsContainer}>
                <MaterialIcons 
                  name="warning" 
                  size={14} 
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                />
                <ThemedText style={styles.threatsText}>{country.threats}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Key Insights */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="insights" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Key Insights</ThemedText>
        </View>
        
        <View style={[
          styles.insightsCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {keyInsights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <View style={[
                styles.insightBullet,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]} />
              <ThemedText style={styles.insightText}>
                <ThemedText style={styles.insightRegion}>{insight.region}:</ThemedText> {insight.insight}
              </ThemedText>
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

  // Behavior Cards
  behaviorsGrid: {
    gap: 12,
  },
  behaviorCard: {
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
  behaviorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  behaviorContent: {
    flex: 1,
  },
  behaviorTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  behaviorDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Reproduction Card
  reproductionCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reproductionItem: {
    padding: 16,
  },
  reproductionItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  reproductionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  reproductionValue: {
    fontSize: 15,
    lineHeight: 20,
  },

  // Global Comparison
  comparisonContainer: {
    gap: 12,
  },
  countryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  highlightedCountry: {
    color: '#FF6B35',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  populationData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 16,
  },
  populationItem: {
    alignItems: 'center',
  },
  populationLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  populationValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  threatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  threatsText: {
    fontSize: 13,
    opacity: 0.8,
    flex: 1,
  },

  // Insights
  insightsCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  insightRegion: {
    fontWeight: '600',
  },
});
// components/lesson/tapir/sections/TapirPhysiology.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirPhysiology() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const physicalFeatures = [
    {
      icon: 'palette',
      title: 'Unique Coloration',
      description: 'Black front and back with white midsection - serves as disruptive camouflage in moonlit forests',
      details: 'The "saddle" pattern breaks their outline, confusing predators like tigers'
    },
    {
      icon: 'directions',
      title: 'Prehensile Snout',
      description: 'Flexible, trunk-like snout acts like a "fifth limb"',
      details: 'Can grab leaves, fruits, and underwater plants with precision'
    },
    {
      icon: 'fitness-center',
      title: 'Largest Tapir Species',
      description: 'Weighs 250-320 kg, standing 90-110 cm tall',
      details: 'Robust build suited for navigating dense jungle terrain'
    },
    {
      icon: 'pool',
      title: 'Semi-Aquatic Design',
      description: 'Webbed toes and streamlined body for swimming',
      details: 'Can walk underwater along riverbeds to escape threats'
    }
  ];

  const adaptations = [
    {
      title: 'Snorkel Nose',
      icon: 'air',
      description: 'Flexible snout can act like a snorkel when swimming',
      benefit: 'Allows foraging in deep water and quick escapes'
    },
    {
      title: 'Night Vision',
      icon: 'visibility',
      description: 'Enhanced vision for nocturnal navigation',
      benefit: 'Uses starlight to navigate dense jungle paths'
    },
    {
      title: 'Silent Movement',
      icon: 'volume-off',
      description: 'Soft foot pads for quiet forest travel',
      benefit: 'Avoids detection by predators and humans'
    },
    {
      title: 'Strong Jaw',
      icon: 'psychology',
      description: 'Powerful muscles for processing tough vegetation',
      benefit: 'Can eat bark, twigs, and fibrous plants'
    }
  ];

  const behaviorTraits = [
    {
      icon: 'bedtime',
      title: 'Strictly Nocturnal',
      description: 'Active only at night to avoid predators and heat',
      timeframe: '6 PM - 6 AM'
    },
    {
      icon: 'person',
      title: 'Solitary Lifestyle',
      description: 'Adults live alone except during mating season',
      timeframe: 'Year-round'
    },
    {
      icon: 'pool',
      title: 'Daily Swimming',
      description: 'Swims to cool off, escape threats, and forage',
      timeframe: 'Multiple times daily'
    },
    {
      icon: 'radio',
      title: 'Whistle Communication',
      description: 'High-pitched calls inaudible to humans',
      timeframe: 'During interactions'
    }
  ];

  const reproductionFacts = [
    { label: 'Gestation Period', value: '13-14 months', detail: 'One of the longest among land mammals' },
    { label: 'Litter Size', value: '1 calf', detail: 'Rarely twins' },
    { label: 'Birth Weight', value: '4-7 kg', detail: 'Triples in first weeks' },
    { label: 'Maturity Age', value: '3-5 years', detail: 'Females: 3-4, Males: 4-5' },
    { label: 'Breeding Interval', value: '2-3 years', detail: 'Slow reproduction rate' },
    { label: 'Calf Independence', value: '6-8 months', detail: 'Mothers raise alone' }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Physical Adaptations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="biotech" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Physical Features & Adaptations
          </ThemedText>
        </View>
        
        <View style={styles.featuresGrid}>
          {physicalFeatures.map((feature, index) => (
            <View key={index} style={[
              styles.featureCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.featureIcon,
                { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
              ]}>
                <MaterialIcons 
                  name={feature.icon} 
                  size={20} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
              </View>
              <View style={styles.featureContent}>
                <ThemedText style={[
                  styles.featureTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {feature.title}
                </ThemedText>
                <ThemedText style={[
                  styles.featureDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {feature.description}
                </ThemedText>
                <ThemedText style={[
                  styles.featureDetails,
                  { color: isDark ? Colors.dark.textMuted : '#666' }
                ]}>
                  💡 {feature.details}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Survival Adaptations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="shield" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Survival Adaptations
          </ThemedText>
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
              <View style={styles.adaptationHeader}>
                <View style={[
                  styles.adaptationIcon,
                  { backgroundColor: '#4CAF5020' }
                ]}>
                  <MaterialIcons 
                    name={adaptation.icon} 
                    size={18} 
                    color="#4CAF50" 
                  />
                </View>
                <ThemedText style={[
                  styles.adaptationTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {adaptation.title}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.adaptationDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {adaptation.description}
              </ThemedText>
              <View style={[
                styles.benefitBox,
                { backgroundColor: isDark ? '#4CAF5010' : '#E8F5E8' }
              ]}>
                <ThemedText style={[
                  styles.benefitText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  ✅ {adaptation.benefit}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Behavior & Intelligence */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="psychology" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Behavior & Intelligence
          </ThemedText>
        </View>
        
        <View style={styles.behaviorGrid}>
          {behaviorTraits.map((trait, index) => (
            <View key={index} style={[
              styles.behaviorCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.behaviorHeader}>
                <MaterialIcons 
                  name={trait.icon} 
                  size={24} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
                <View style={styles.behaviorInfo}>
                  <ThemedText style={[
                    styles.behaviorTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {trait.title}
                  </ThemedText>
                  <ThemedText style={[
                    styles.behaviorTimeframe,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    {trait.timeframe}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.behaviorDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {trait.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Reproduction & Family Life */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="family-restroom" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Reproduction & Family Life
          </ThemedText>
        </View>
        
        <View style={[
          styles.reproductionCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {reproductionFacts.map((fact, index) => (
            <View key={index} style={[
              styles.reproductionItem,
              index < reproductionFacts.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.reproductionHeader}>
                <ThemedText style={[
                  styles.reproductionLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {fact.label}
                </ThemedText>
                <ThemedText style={[
                  styles.reproductionValue,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {fact.value}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.reproductionDetail,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                {fact.detail}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Fun Fact Box */}
      <View style={[
        styles.funFactCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
          borderLeftColor: '#FF9800'
        }
      ]}>
        <View style={styles.funFactHeader}>
          <MaterialIcons 
            name="lightbulb" 
            size={20} 
            color="#FF9800" 
          />
          <ThemedText style={[
            styles.funFactTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Amazing Fact!
          </ThemedText>
        </View>
        <ThemedText style={[
          styles.funFactText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          🏊‍♂️ **Tapir calves can swim within hours of birth** - a crucial survival trait in flood-prone rainforests! Their striped camouflage also fades by 6 months as they develop their distinctive adult coloring.
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

  // Features Grid
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  featureDetails: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // Adaptations Grid
  adaptationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  adaptationCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  adaptationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  adaptationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  adaptationTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  adaptationDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  benefitBox: {
    padding: 6,
    borderRadius: 6,
  },
  benefitText: {
    fontSize: 11,
    lineHeight: 14,
  },

  // Behavior Grid
  behaviorGrid: {
    gap: 12,
  },
  behaviorCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  behaviorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  behaviorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  behaviorTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  behaviorTimeframe: {
    fontSize: 12,
  },
  behaviorDesc: {
    fontSize: 14,
    lineHeight: 20,
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
  reproductionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reproductionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  reproductionValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  reproductionDetail: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Fun Fact Card
  funFactCard: {
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
  funFactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  funFactTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  funFactText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
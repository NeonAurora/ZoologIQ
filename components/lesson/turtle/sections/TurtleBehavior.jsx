// components/lesson/turtle/sections/TurtleBehavior.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleBehavior() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const behaviors = [
    {
      icon: '🗺️',
      title: 'Migratory Behavior',
      description: 'Undertake long migrations between feeding grounds and nesting beaches, sometimes crossing entire oceans',
      color: '#2196F3'
    },
    {
      icon: '🏠',
      title: 'Natal Homing',
      description: 'Exhibit remarkable memory and precision, returning to the exact beach where they were born to lay eggs',
      color: '#4CAF50'
    },
    {
      icon: '🥬',
      title: 'Selective Feeding',
      description: 'Demonstrate careful feeding habits, preferring seagrasses and algae which they crop without uprooting',
      color: '#8BC34A'
    },
    {
      icon: '🏊‍♀️',
      title: 'Resting Behavior',
      description: 'Rest in underwater caves, crevices, or floating on the surface, showing adaptability to different environments',
      color: '#00BCD4'
    }
  ];

  const intelligenceFeatures = [
    'Possess spatial awareness and navigation skills using Earth\'s magnetic fields',
    'Use visual cues from the environment for navigation and orientation',
    'Show coordinated emergence behaviors in hatchlings to evade predators',
    'Demonstrate problem-solving abilities when navigating obstacles',
    'Exhibit learned behaviors passed between generations'
  ];

  const socialAspects = [
    {
      behavior: 'Solitary Nature',
      description: 'Typically live and feed alone in their ocean habitats'
    },
    {
      behavior: 'Nesting Congregations',
      description: 'Gather in large numbers at specific nesting beaches during breeding season'
    },
    {
      behavior: 'Feeding Aggregations',
      description: 'Sometimes feed together in prime seagrass meadows'
    },
    {
      behavior: 'Hatchling Coordination',
      description: 'Baby turtles emerge together and use group movement for protection'
    }
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Behaviors */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="psychology" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Key Behaviors</ThemedText>
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
              <View style={[styles.behaviorIcon, { backgroundColor: `${behavior.color}20` }]}>
                <ThemedText style={styles.behaviorEmoji}>{behavior.icon}</ThemedText>
              </View>
              <View style={styles.behaviorContent}>
                <ThemedText style={styles.behaviorTitle}>{behavior.title}</ThemedText>
                <ThemedText style={styles.behaviorDesc}>{behavior.description}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Intelligence & Cognitive Abilities */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="lightbulb" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Intelligence & Navigation</ThemedText>
        </View>

        <View style={[
          styles.intelligenceCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.intelligenceList}>
            {intelligenceFeatures.map((feature, index) => (
              <View key={index} style={styles.intelligenceItem}>
                <View style={[
                  styles.intelligenceBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={styles.intelligenceText}>{feature}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Social Behavior */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="groups" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Social Behavior</ThemedText>
        </View>

        <View style={styles.socialGrid}>
          {socialAspects.map((aspect, index) => (
            <View key={index} style={[
              styles.socialCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={styles.socialTitle}>{aspect.behavior}</ThemedText>
              <ThemedText style={styles.socialDesc}>{aspect.description}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Predator Avoidance */}
      <View style={styles.section}>
        <View style={[
          styles.predatorCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF5722'
          }
        ]}>
          <View style={styles.predatorHeader}>
            <MaterialIcons name="security" size={20} color="#FF5722" />
            <ThemedText style={styles.predatorTitle}>Predator Avoidance</ThemedText>
          </View>
          <ThemedText style={styles.predatorText}>
            Hatchlings use coordinated emergence and instinctive navigation to evade predators and reach the sea. 
            They emerge at night to avoid diurnal predators and use moonlight to navigate toward the ocean. 
            Adults rely on their size, swimming speed, and ability to retreat to deeper waters for protection.
          </ThemedText>
        </View>
      </View>

      {/* Migration Patterns */}
      <View style={styles.section}>
        <View style={[
          styles.migrationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.migrationHeader}>
            <MaterialIcons name="explore" size={20} color="#2196F3" />
            <ThemedText style={styles.migrationTitle}>Amazing Migration</ThemedText>
          </View>
          <ThemedText style={styles.migrationText}>
            Green Sea Turtles are among the most impressive navigators in the animal kingdom. They can travel 
            thousands of kilometers across open ocean, using Earth's magnetic field as a compass. Some individuals 
            migrate between feeding areas in one country and nesting beaches in another, maintaining these 
            routes throughout their 60-70 year lifespan.
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

  // Behaviors Grid
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
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  behaviorEmoji: {
    fontSize: 20,
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

  // Intelligence Section
  intelligenceCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  intelligenceList: {
    gap: 12,
  },
  intelligenceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  intelligenceBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  intelligenceText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },

  // Social Grid
  socialGrid: {
    gap: 12,
  },
  socialCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  socialDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Special Cards
  predatorCard: {
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
  predatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  predatorTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  predatorText: {
    fontSize: 15,
    lineHeight: 22,
  },

  migrationCard: {
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
  migrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  migrationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  migrationText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
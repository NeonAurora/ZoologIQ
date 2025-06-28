// components/lesson/turtle/sections/TurtleIntroduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleIntroduction() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const importanceData = [
    {
      icon: '🌱',
      title: 'Seagrass Maintenance',
      description: 'Grazing helps maintain healthy seagrass meadows, promoting growth and preventing overgrowth',
      color: '#4CAF50'
    },
    {
      icon: '🪸',
      title: 'Coral Reef Health',
      description: 'Controls algae on coral reefs, allowing corals to thrive and maintain reef ecosystems',
      color: '#FF7043'
    },
    {
      icon: '🔄',
      title: 'Nutrient Cycling',
      description: 'Movement between nesting beaches and feeding grounds distributes nutrients, enriching ecosystems',
      color: '#2196F3'
    },
    {
      icon: '🐟',
      title: 'Food Web Support',
      description: 'Eggs and hatchlings are a vital food source for predators such as birds, crabs, and fish',
      color: '#9C27B0'
    }
  ];

  const biodiversityPoints = [
    'Maintains seagrass beds that serve as habitats for numerous marine organisms',
    'Acts as an indicator species, reflecting the health of marine ecosystems',
    'Supports biodiversity in both coastal and open ocean environments',
    'Creates feeding opportunities for various marine species through their activities',
    'Helps maintain balance in marine food webs across multiple ocean zones'
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={[
        styles.heroCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <View style={styles.heroHeader}>
          <ThemedText style={styles.heroEmoji}>🐢</ThemedText>
          <View style={styles.heroTitleContainer}>
            <ThemedText style={styles.heroTitle}>Green Sea Turtle</ThemedText>
            <ThemedText style={styles.heroSubtitle}>Chelonia mydas</ThemedText>
          </View>
        </View>
        
        <ThemedText style={styles.heroDescription}>
          The Green Sea Turtle is a gentle giant of the ocean, named not for its shell but for the 
          green fat beneath it, thanks to its seagrass diet! Found in warm coastal waters and coral reefs, 
          this turtle can grow up to 1 meter and weigh as much as 160 kg.
        </ThemedText>
      </View>

      {/* Basic Information Grid */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="info" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Quick Facts</ThemedText>
        </View>

        <View style={styles.factsGrid}>
          <View style={[
            styles.factCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.factLabel}>Habitat</ThemedText>
            <ThemedText style={styles.factValue}>Warm oceans, coastal areas, coral reefs</ThemedText>
          </View>

          <View style={[
            styles.factCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.factLabel}>Diet</ThemedText>
            <ThemedText style={styles.factValue}>Seagrasses and algae</ThemedText>
          </View>

          <View style={[
            styles.factCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.factLabel}>Lifespan</ThemedText>
            <ThemedText style={styles.factValue}>60-70 years</ThemedText>
          </View>

          <View style={[
            styles.factCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.factLabel}>Status</ThemedText>
            <ThemedText style={[styles.factValue, { color: '#FF5722' }]}>Endangered</ThemedText>
          </View>
        </View>
      </View>

      {/* Importance in Ecosystem */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="eco" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Why They Matter</ThemedText>
        </View>

        <View style={styles.importanceGrid}>
          {importanceData.map((item, index) => (
            <View key={index} style={[
              styles.importanceCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[styles.importanceIcon, { backgroundColor: `${item.color}20` }]}>
                <ThemedText style={styles.importanceEmoji}>{item.icon}</ThemedText>
              </View>
              <View style={styles.importanceContent}>
                <ThemedText style={styles.importanceTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.importanceDesc}>{item.description}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Biodiversity Support */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="nature" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Supporting Marine Biodiversity</ThemedText>
        </View>

        <View style={[
          styles.biodiversityCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.biodiversityList}>
            {biodiversityPoints.map((point, index) => (
              <View key={index} style={styles.biodiversityItem}>
                <View style={[
                  styles.biodiversityBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={styles.biodiversityText}>{point}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Conservation Call to Action */}
      <View style={styles.section}>
        <View style={[
          styles.ctaCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.ctaHeader}>
            <MaterialIcons name="campaign" size={20} color="#2196F3" />
            <ThemedText style={styles.ctaTitle}>Conservation Matters</ThemedText>
          </View>
          <ThemedText style={styles.ctaText}>
            These fantastic creatures play a crucial role in maintaining the ocean's health. 
            Despite being endangered, conservation efforts around the world—from Malaysia to Costa Rica—are 
            giving them a fighting chance. By protecting beaches, reducing plastic use, and supporting 
            eco-friendly tourism, we can help save this ancient mariner and the vibrant world it supports.
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

  // Hero Section
  heroCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  heroTitleContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  heroDescription: {
    fontSize: 16,
    lineHeight: 24,
  },

  // Facts Grid
  factsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  factCard: {
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
  factLabel: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.7,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  factValue: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
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

  // Importance Grid
  importanceGrid: {
    gap: 12,
  },
  importanceCard: {
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
  importanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  importanceEmoji: {
    fontSize: 20,
  },
  importanceContent: {
    flex: 1,
  },
  importanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  importanceDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Biodiversity Section
  biodiversityCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  biodiversityList: {
    gap: 12,
  },
  biodiversityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  biodiversityBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  biodiversityText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },

  // Call to Action
  ctaCard: {
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
  ctaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  ctaText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerIntroduction() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const importanceReasons = [
    {
      icon: 'nature',
      title: 'Apex Predator',
      description: 'Vital for ecosystem stability and balance',
      color: '#4CAF50'
    },
    {
      icon: 'flag',
      title: 'National Heritage',
      description: 'Featured on coat of arms and Malaysian folklore',
      color: '#FF9800'
    },
    {
      icon: 'account-balance',
      title: 'Economic Value',
      description: 'Supports ecotourism and rural economies',
      color: '#2196F3'
    },
    {
      icon: 'eco',
      title: 'Environmental Guardian',
      description: 'Protecting tigers means protecting forests and water',
      color: '#8BC34A'
    },
    {
      icon: 'public',
      title: 'Climate Solutions',
      description: 'Critical for forest carbon storage and climate action',
      color: '#00BCD4'
    },
    {
      icon: 'biotech',
      title: 'Unique Genetics',
      description: 'One of only 6 tiger subspecies with distinct DNA',
      color: '#9C27B0'
    }
  ];

  const biodiversityRoles = [
    'Regulates prey populations, preventing overgrazing',
    'Protects biodiversity in forest ecosystems',
    'Serves as indicator of healthy forest systems',
    'Influences forest regeneration through prey behavior',
    'Generates income through responsible ecotourism',
    'Supports carbon storage and climate mitigation'
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={[
        styles.heroCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <View style={styles.heroContent}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: '#FF6B35' + '20' }
          ]}>
            <MaterialIcons name="pets" size={40} color="#FF6B35" />
          </View>
          
          <ThemedText type="title" style={styles.title}>
            Malayan Tiger
          </ThemedText>
          
          <ThemedText style={styles.scientificName}>
            Panthera tigris jacksoni
          </ThemedText>
          
          <ThemedText style={styles.description}>
            Malaysia's critically endangered national symbol, with fewer than 150 remaining in the wild. As apex predators, they maintain healthy forests by controlling prey populations and supporting biodiversity.
          </ThemedText>
        </View>
      </View>

      {/* Conservation Status */}
      <View style={[
        styles.statusCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: '#F44336',
          borderLeftColor: '#F44336'
        }
      ]}>
        <View style={styles.statusHeader}>
          <MaterialIcons name="warning" size={24} color="#F44336" />
          <ThemedText style={styles.statusTitle}>Conservation Status</ThemedText>
        </View>
        
        <ThemedText style={[styles.statusValue, { color: '#F44336' }]}>
          Critically Endangered
        </ThemedText>
        
        <ThemedText style={styles.statusDescription}>
          Fewer than 150 individuals remain in the wild (2023)
        </ThemedText>
      </View>

      {/* Why Tigers Matter */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="favorite" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Why Tigers Matter</ThemedText>
        </View>
        
        <View style={styles.importanceGrid}>
          {importanceReasons.map((reason, index) => (
            <View key={index} style={[
              styles.importanceCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.importanceIcon,
                { backgroundColor: reason.color + '20' }
              ]}>
                <MaterialIcons 
                  name={reason.icon} 
                  size={20} 
                  color={reason.color} 
                />
              </View>
              
              <View style={styles.importanceContent}>
                <ThemedText style={styles.importanceTitle}>
                  {reason.title}
                </ThemedText>
                <ThemedText style={styles.importanceDesc}>
                  {reason.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Biodiversity Role */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="nature-people" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Ecosystem Role</ThemedText>
        </View>
        
        <View style={[
          styles.biodiversityCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.biodiversityList}>
            {biodiversityRoles.map((role, index) => (
              <View key={index} style={styles.biodiversityItem}>
                <View style={[
                  styles.biodiversityBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={styles.biodiversityText}>{role}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Call to Action */}
      <View style={[
        styles.ctaCard,
        { 
          backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary,
          borderColor: isDark ? Colors.dark.tint : Colors.light.tint
        }
      ]}>
        <View style={styles.ctaHeader}>
          <MaterialIcons 
            name="campaign" 
            size={24} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.ctaTitle}>Take Action</ThemedText>
        </View>
        
        <ThemedText style={styles.ctaText}>
          Threatened by habitat loss, poaching, and human conflict, their survival depends on immediate conservation action. Everyone in Malaysia can help protect these magnificent cats for future generations.
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
  
  // Hero Section
  heroCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  // Status Card
  statusCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    opacity: 0.8,
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
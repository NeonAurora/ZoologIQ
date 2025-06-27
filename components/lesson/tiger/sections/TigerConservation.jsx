import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerConservation() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const threats = [
    {
      icon: 'forest',
      title: 'Deforestation',
      description: 'Palm oil plantations, logging, and urbanization',
      color: '#8BC34A'
    },
    {
      icon: 'alt-route',
      title: 'Habitat Fragmentation',
      description: 'Roads divide forests and increase vehicle strikes',
      color: '#FF9800'
    },
    {
      icon: 'gps-not-fixed',
      title: 'Poaching',
      description: 'Illegal hunting for skins, bones, and trophies',
      color: '#F44336'
    },
    {
      icon: 'gavel',
      title: 'Weak Law Enforcement',
      description: 'Insufficient protection enables illegal wildlife trade',
      color: '#9C27B0'
    },
    {
      icon: 'home',
      title: 'Human-Wildlife Conflict',
      description: 'Livestock predation leads to retaliatory killings',
      color: '#FF5722'
    },
    {
      icon: 'grass',
      title: 'Prey Depletion',
      description: 'Overhunting reduces natural food sources',
      color: '#607D8B'
    }
  ];

  const actionCategories = [
    {
      icon: 'volunteer-activism',
      title: 'Support & Donate',
      color: '#4CAF50',
      actions: [
        'Support WWF-Malaysia, MYCAT, and Rimba',
        'Adopt tigers through conservation programs',
        'Fund camera trap and patrol initiatives'
      ]
    },
    {
      icon: 'science',
      title: 'Research & Volunteer',
      color: '#2196F3',
      actions: [
        'Join wildlife monitoring programs',
        'Participate in citizen science projects',
        'Report tiger sightings to authorities'
      ]
    },
    {
      icon: 'campaign',
      title: 'Advocacy & Reporting',
      color: '#FF9800',
      actions: [
        'Report poaching: MYCAT 1-800-88-5151',
        'Advocate for wildlife corridors',
        'Support stronger conservation laws'
      ]
    },
    {
      icon: 'eco',
      title: 'Sustainable Living',
      color: '#8BC34A',
      actions: [
        'Choose RSPO/FSC-certified products',
        'Avoid tiger-derived products',
        'Reduce plastic consumption'
      ]
    },
    {
      icon: 'share',
      title: 'Spread Awareness',
      color: '#E91E63',
      actions: [
        'Visit protected areas responsibly',
        'Share #SaveMalayanTigers content',
        'Educate others about conservation'
      ]
    }
  ];

  const coexistenceStrategies = [
    {
      icon: 'pets',
      title: 'Guardian Animals',
      description: 'Livestock guardian dogs and protective measures'
    },
    {
      icon: 'account-balance',
      title: 'Compensation Schemes',
      description: 'Financial support for farmers affected by tigers'
    },
    {
      icon: 'nature',
      title: 'Wildlife Corridors',
      description: 'Protected pathways connecting fragmented habitats'
    },
    {
      icon: 'directions',
      title: 'Safe Crossings',
      description: 'Wildlife overpasses and underpasses on highways'
    },
    {
      icon: 'notification-important',
      title: 'Alert Systems',
      description: 'Early warning networks for tiger movements'
    },
    {
      icon: 'travel-explore',
      title: 'Ecotourism',
      description: 'Sustainable tourism providing local income'
    }
  ];

  const successStories = [
    {
      icon: 'park',
      title: 'Kenyir Wildlife Corridor',
      achievement: 'Successfully reconnected Taman Negara and Kenyir Lake ecosystems',
      impact: 'Habitat connectivity',
      color: '#4CAF50'
    },
    {
      icon: 'security',
      title: 'Royal Belum Patrols',
      achievement: 'Reduced poaching incidents by 40% through enhanced monitoring',
      impact: 'Anti-poaching success',
      color: '#2196F3'
    },
    {
      icon: 'groups',
      title: 'Indigenous Conservation',
      achievement: 'Orang Asli patrols removed 1,200+ snares in Perak (2022)',
      impact: 'Community involvement',
      color: '#FF9800'
    },
    {
      icon: 'attach-money',
      title: 'Ecotourism Growth',
      achievement: 'Generated RM5 million in sustainable tourism revenue (2023)',
      impact: 'Economic incentives',
      color: '#8BC34A'
    }
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Threats Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="warning" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Threats to Survival</ThemedText>
        </View>
        
        <View style={styles.threatsGrid}>
          {threats.map((threat, index) => (
            <View key={index} style={[
              styles.threatCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.threatIcon,
                { backgroundColor: threat.color + '20' }
              ]}>
                <MaterialIcons 
                  name={threat.icon} 
                  size={20} 
                  color={threat.color} 
                />
              </View>
              
              <View style={styles.threatContent}>
                <ThemedText style={styles.threatTitle}>
                  {threat.title}
                </ThemedText>
                <ThemedText style={styles.threatDesc}>
                  {threat.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Action Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="volunteer-activism" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>How You Can Help</ThemedText>
        </View>
        
        <View style={styles.actionsGrid}>
          {actionCategories.map((category, index) => (
            <TouchableOpacity key={index} style={[
              styles.actionCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]} activeOpacity={0.7}>
              <View style={styles.actionHeader}>
                <View style={[
                  styles.actionIcon,
                  { backgroundColor: category.color + '20' }
                ]}>
                  <MaterialIcons 
                    name={category.icon} 
                    size={22} 
                    color={category.color} 
                  />
                </View>
                <ThemedText style={styles.actionTitle}>
                  {category.title}
                </ThemedText>
              </View>
              
              <View style={styles.actionsList}>
                {category.actions.map((action, actionIndex) => (
                  <View key={actionIndex} style={styles.actionItem}>
                    <View style={[
                      styles.actionBullet,
                      { backgroundColor: category.color }
                    ]} />
                    <ThemedText style={styles.actionText}>{action}</ThemedText>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Coexistence Strategies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="handshake" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Coexistence Solutions</ThemedText>
        </View>
        
        <View style={styles.strategiesGrid}>
          {coexistenceStrategies.map((strategy, index) => (
            <TouchableOpacity key={index} style={[
              styles.strategyCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]} activeOpacity={0.7}>
              <View style={[
                styles.strategyIcon,
                { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + '20' }
              ]}>
                <MaterialIcons 
                  name={strategy.icon} 
                  size={18} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
              </View>
              
              <View style={styles.strategyContent}>
                <ThemedText style={styles.strategyTitle}>
                  {strategy.title}
                </ThemedText>
                <ThemedText style={styles.strategyDesc}>
                  {strategy.description}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Success Stories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="celebration" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Conservation Successes</ThemedText>
        </View>
        
        <View style={styles.successGrid}>
          {successStories.map((story, index) => (
            <TouchableOpacity key={index} style={[
              styles.successCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                borderLeftColor: story.color,
                borderLeftWidth: 4
              }
            ]} activeOpacity={0.7}>
              <View style={styles.successHeader}>
                <View style={[
                  styles.successIcon,
                  { backgroundColor: story.color + '20' }
                ]}>
                  <MaterialIcons 
                    name={story.icon} 
                    size={20} 
                    color={story.color} 
                  />
                </View>
                
                <View style={styles.successTitleContainer}>
                  <ThemedText style={styles.successTitle}>
                    {story.title}
                  </ThemedText>
                  <View style={[
                    styles.impactBadge,
                    { backgroundColor: story.color + '15' }
                  ]}>
                    <ThemedText style={[
                      styles.impactText,
                      { color: story.color }
                    ]}>
                      {story.impact}
                    </ThemedText>
                  </View>
                </View>
              </View>
              
              <ThemedText style={styles.successDesc}>
                {story.achievement}
              </ThemedText>
            </TouchableOpacity>
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

  // Threats Grid
  threatsGrid: {
    gap: 12,
  },
  threatCard: {
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
  threatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  threatContent: {
    flex: 1,
  },
  threatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  threatDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Actions Grid
  actionsGrid: {
    gap: 16,
  },
  actionCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  actionsList: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  actionBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },

  // Strategies Grid
  strategiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  strategyCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  strategyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  strategyContent: {
    flex: 1,
  },
  strategyTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  strategyDesc: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.8,
  },

  // Success Stories
  successGrid: {
    gap: 12,
  },
  successCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  successIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  successTitleContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  successDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
});
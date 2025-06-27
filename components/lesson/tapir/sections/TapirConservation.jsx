// components/lesson/tapir/sections/TapirConservation.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirConservation() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const threats = [
    {
      icon: 'forest',
      title: 'Habitat Loss',
      severity: 'Critical',
      description: 'Forests cleared for palm oil, farming, and development',
      impact: 'Primary cause of population decline',
      color: '#F44336'
    },
    {
      icon: 'directions-car',
      title: 'Roadkill',
      severity: 'High',
      description: 'Nocturnal tapirs hit by vehicles crossing highways',
      impact: '40% mortality reduction achieved with wildlife crossings',
      color: '#FF5722'
    },
    {
      icon: 'content-cut',
      title: 'Forest Fragmentation',
      severity: 'High',
      description: 'Small, isolated forests trap populations',
      impact: 'Reduced genetic diversity and breeding difficulties',
      color: '#FF9800'
    },
    {
      icon: 'gps-off',
      title: 'Human Encroachment',
      severity: 'Moderate',
      description: 'Development pushes tapirs into settlements',
      impact: 'Increased human-wildlife conflicts',
      color: '#FFC107'
    },
    {
      icon: 'thermostat',
      title: 'Climate Change',
      severity: 'Emerging',
      description: 'Droughts and temperature changes affect food sources',
      impact: 'Long-term habitat suitability concerns',
      color: '#607D8B'
    }
  ];

  const conservationStrategies = [
    {
      icon: 'nature',
      title: 'Protected Areas',
      location: 'Malaysia',
      description: 'Taman Negara, Belum-Temengor Forest Complex',
      success: 'Stable populations in protected zones'
    },
    {
      icon: 'bridge',
      title: 'Wildlife Corridors',
      location: 'Peninsular Malaysia',
      description: 'Central Forest Spine initiative connecting habitats',
      success: '40% reduction in roadkill deaths'
    },
    {
      icon: 'security',
      title: 'Anti-Poaching Patrols',
      location: 'Malaysia & Indonesia',
      description: 'PERHILITAN patrols and community monitoring',
      success: '60% reduction in illegal hunting (Sumatra)'
    },
    {
      icon: 'groups',
      title: 'Community Engagement',
      location: 'Regional',
      description: 'Indigenous Orang Asli partnerships',
      success: '1,200+ snares removed in Perak (2022)'
    }
  ];

  const successStories = [
    {
      icon: 'trending-up',
      title: 'Taman Negara Stabilization',
      achievement: 'Maintained stable tapir population',
      detail: 'Camera traps show increased activity in protected zones',
      impact: 'Conservation model',
      color: '#4CAF50'
    },
    {
      icon: 'directions',
      title: 'Highway Crossing Solutions',
      achievement: '40% reduction in roadkill fatalities',
      detail: 'Wildlife overpasses on East-West Highway',
      impact: 'Infrastructure blueprint',
      color: '#2196F3'
    },
    {
      icon: 'campaign',
      title: 'Indigenous Conservation',
      achievement: 'Orang Asli communities as guardians',
      detail: 'Monitoring and protection programs in Johor',
      impact: 'Community empowerment',
      color: '#FF9800'
    },
    {
      icon: 'flight-takeoff',
      title: 'Thailand Reintroduction',
      achievement: 'Successful captive-bred releases',
      detail: 'Khao Sok National Park program',
      impact: 'Population recovery',
      color: '#9C27B0'
    }
  ];

  const actionItems = [
    {
      category: 'Individual Actions',
      icon: 'person',
      actions: [
        'Choose RSPO-certified palm oil products',
        'Drive carefully in forest areas at night',
        'Support conservation organizations (WWF, IUCN)',
        'Share tapir facts on social media',
        'Visit ethical wildlife sanctuaries'
      ]
    },
    {
      category: 'Community Level',
      icon: 'groups',
      actions: [
        'Advocate for wildlife crossing infrastructure',
        'Report illegal logging and poaching',
        'Support sustainable ecotourism',
        'Participate in forest restoration programs',
        'Educate others about tapir conservation'
      ]
    },
    {
      category: 'Policy & Government',
      icon: 'account-balance',
      actions: [
        'Enforce anti-deforestation laws',
        'Expand protected area networks',
        'Fund wildlife corridor construction',
        'Strengthen penalties for wildlife crimes',
        'Support international conservation cooperation'
      ]
    }
  ];

  const globalEfforts = [
    {
      region: 'Southeast Asia',
      initiative: 'ASEAN Wildlife Enforcement Network',
      focus: 'Combat illegal wildlife trade',
      impact: 'Regional coordination'
    },
    {
      region: 'Europe',
      initiative: 'Zoo Breeding Programs',
      focus: 'Genetic diversity maintenance',
      impact: '90% survival rate in captivity'
    },
    {
      region: 'International',
      initiative: '#SaveTheTapir Campaign',
      focus: 'Public awareness',
      impact: '10M+ people reached'
    },
    {
      region: 'Scientific',
      initiative: 'GPS Tracking Research',
      focus: 'Movement and habitat studies',
      impact: 'Informed conservation planning'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Current Threats */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="warning" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Threats to Survival
          </ThemedText>
        </View>
        
        <View style={styles.threatsGrid}>
          {threats.map((threat, index) => (
            <View key={index} style={[
              styles.threatCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                borderLeftColor: threat.color
              }
            ]}>
              <View style={styles.threatHeader}>
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
                <View style={styles.threatInfo}>
                  <ThemedText style={[
                    styles.threatTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {threat.title}
                  </ThemedText>
                  <View style={[
                    styles.severityBadge,
                    { backgroundColor: threat.color + '20' }
                  ]}>
                    <ThemedText style={[
                      styles.severityText,
                      { color: threat.color }
                    ]}>
                      {threat.severity}
                    </ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={[
                styles.threatDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {threat.description}
              </ThemedText>
              <ThemedText style={[
                styles.threatImpact,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📊 {threat.impact}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Conservation Strategies */}
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
            Conservation Strategies
          </ThemedText>
        </View>
        
        <View style={styles.strategiesGrid}>
          {conservationStrategies.map((strategy, index) => (
            <View key={index} style={[
              styles.strategyCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.strategyHeader}>
                <View style={[
                  styles.strategyIcon,
                  { backgroundColor: '#4CAF5020' }
                ]}>
                  <MaterialIcons 
                    name={strategy.icon} 
                    size={20} 
                    color="#4CAF50" 
                  />
                </View>
                <View style={styles.strategyInfo}>
                  <ThemedText style={[
                    styles.strategyTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {strategy.title}
                  </ThemedText>
                  <ThemedText style={[
                    styles.strategyLocation,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    📍 {strategy.location}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.strategyDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {strategy.description}
              </ThemedText>
              <View style={[
                styles.successBox,
                { backgroundColor: '#4CAF5010' }
              ]}>
                <ThemedText style={[
                  styles.successText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  ✅ {strategy.success}
                </ThemedText>
              </View>
            </View>
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Conservation Success Stories
          </ThemedText>
        </View>
        
        <View style={styles.successGrid}>
          {successStories.map((story, index) => (
            <View key={index} style={[
              styles.successCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
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
                  <ThemedText style={[
                    styles.successTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {story.title}
                  </ThemedText>
                  <View style={[
                    styles.impactBadge,
                    { backgroundColor: story.color + '20' }
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
              <ThemedText style={[
                styles.successAchievement,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🎯 {story.achievement}
              </ThemedText>
              <ThemedText style={[
                styles.successDetail,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {story.detail}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* How You Can Help */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="volunteer-activism" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            How You Can Help
          </ThemedText>
        </View>
        
        <View style={styles.actionsGrid}>
          {actionItems.map((category, index) => (
            <View key={index} style={[
              styles.actionCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.actionHeader}>
                <View style={[
                  styles.actionIcon,
                  { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                ]}>
                  <MaterialIcons 
                    name={category.icon} 
                    size={20} 
                    color={isDark ? Colors.dark.tint : Colors.light.tint} 
                  />
                </View>
                <ThemedText style={[
                  styles.actionTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {category.category}
                </ThemedText>
              </View>
              <View style={styles.actionsList}>
                {category.actions.map((action, actionIndex) => (
                  <View key={actionIndex} style={styles.actionItem}>
                    <View style={[
                      styles.actionBullet,
                      { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                    ]} />
                    <ThemedText style={[
                      styles.actionText,
                      { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                    ]}>
                      {action}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Global Conservation Efforts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="public" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Global Conservation Efforts
          </ThemedText>
        </View>
        
        <View style={styles.globalGrid}>
          {globalEfforts.map((effort, index) => (
            <View key={index} style={[
              styles.globalCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.globalRegion,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🌍 {effort.region}
              </ThemedText>
              <ThemedText style={[
                styles.globalInitiative,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {effort.initiative}
              </ThemedText>
              <ThemedText style={[
                styles.globalFocus,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                🎯 {effort.focus}
              </ThemedText>
              <View style={[
                styles.globalImpactBox,
                { backgroundColor: isDark ? Colors.dark.tint + '10' : Colors.light.tint + '10' }
              ]}>
                <ThemedText style={[
                  styles.globalImpact,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  📈 {effort.impact}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Call to Action */}
      <View style={[
        styles.ctaCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
        }
      ]}>
        <View style={styles.ctaHeader}>
          <MaterialIcons 
            name="campaign" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.ctaTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Every Action Counts
          </ThemedText>
        </View>
        <ThemedText style={[
          styles.ctaText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          The Malayan tapir's survival depends on immediate, coordinated conservation efforts. From supporting sustainable products to advocating for wildlife corridors, every action—no matter how small—contributes to saving this ancient species for future generations.
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

  // Threats Grid
  threatsGrid: {
    gap: 12,
  },
  threatCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  threatInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threatTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  threatDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  threatImpact: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Strategies Grid
  strategiesGrid: {
    gap: 12,
  },
  strategyCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  strategyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  strategyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  strategyInfo: {
    flex: 1,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  strategyLocation: {
    fontSize: 12,
  },
  strategyDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  successBox: {
    padding: 8,
    borderRadius: 6,
  },
  successText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Success Grid
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
  successAchievement: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  successDetail: {
    fontSize: 14,
    lineHeight: 20,
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

  // Global Grid
  globalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  globalCard: {
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
  globalRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  globalInitiative: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  globalFocus: {
    fontSize: 12,
    marginBottom: 8,
  },
  globalImpactBox: {
    padding: 6,
    borderRadius: 6,
    marginTop: 'auto',
  },
  globalImpact: {
    fontSize: 11,
    lineHeight: 14,
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
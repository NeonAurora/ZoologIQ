// components/lesson/tapir/sections/TapirFunFacts.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirFunFacts() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const amazingFacts = [
    {
      emoji: '🦖',
      title: 'Living Fossils',
      fact: 'Tapirs have existed for over 20 million years, outliving ice ages and mass extinctions',
      detail: 'They\'ve remained virtually unchanged, earning them the title "living fossils"'
    },
    {
      emoji: '🎨',
      title: 'Nature\'s Paintbrush',
      fact: 'Their black-and-white coloration serves as disruptive camouflage in moonlit forests',
      detail: 'The pattern confuses predators like tigers by breaking up their outline'
    },
    {
      emoji: '🤿',
      title: 'Snorkel Noses',
      fact: 'Their flexible snouts can act like snorkels when swimming',
      detail: 'A trait shared with their distant cousins, elephants'
    },
    {
      emoji: '🌱',
      title: 'Seed Superheroes',
      fact: 'One tapir can disperse thousands of seeds daily',
      detail: 'Earning them the nickname "gardeners of the forest"'
    },
    {
      emoji: '🌙',
      title: 'Nighttime Ninjas',
      fact: 'They\'re strictly nocturnal, using star-lit paths to navigate dense jungles',
      detail: 'Their night vision is specially adapted for forest navigation'
    },
    {
      emoji: '🐴',
      title: 'Odd Relatives',
      fact: 'Despite looking like pigs, they\'re closest to horses and rhinos',
      detail: 'All belong to the Perissodactyla order (odd-toed ungulates)'
    }
  ];

  const uniqueAbilities = [
    {
      icon: 'pool',
      ability: 'Underwater Walking',
      description: 'Can walk along riverbeds underwater to escape predators',
      amazement: 'Like aquatic acrobats!'
    },
    {
      icon: 'radio',
      ability: 'Silent Communication',
      description: 'Talk through high-pitched whistles inaudible to humans',
      amazement: 'Secret tapir language!'
    },
    {
      icon: 'nature',
      ability: 'Built-in GPS',
      description: 'Remember complex forest trails and water sources with precision',
      amazement: 'Natural navigation system!'
    },
    {
      icon: 'psychology',
      ability: 'Trunk Dexterity',
      description: 'Use their snout like a fifth limb to grab objects',
      amazement: 'Multi-tool nose!'
    }
  ];

  const babyFacts = [
    {
      fact: 'Baby Camouflage',
      description: 'Calves are born with striped and spotted coats that fade by 6 months',
      emoji: '🦓'
    },
    {
      fact: 'Swimming Champions',
      description: 'Can swim within hours of birth - crucial in flood-prone rainforests',
      emoji: '🏊‍♂️'
    },
    {
      fact: 'Fast Growers',
      description: 'Triple their weight in the first few weeks of life',
      emoji: '📈'
    },
    {
      fact: 'Early Independence',
      description: 'Start eating plants at just 2 weeks old',
      emoji: '🌿'
    }
  ];

  const culturalSignificance = [
    {
      aspect: 'National Symbol',
      description: 'Featured on Malaysia\'s 50-ringgit banknote',
      significance: 'Represents national pride in wildlife conservation',
      icon: 'attach-money'
    },
    {
      aspect: 'Indigenous Lore',
      description: 'Important in Orang Asli traditional stories and beliefs',
      significance: 'Symbol of forest wisdom and harmony',
      icon: 'auto-stories'
    },
    {
      aspect: 'Conservation Icon',
      description: 'Flagship species for Malaysian wildlife protection campaigns',
      significance: 'Raises awareness for entire ecosystem conservation',
      icon: 'campaign'
    },
    {
      aspect: 'Ecotourism Star',
      description: 'Major attraction for wildlife tourists in Southeast Asia',
      significance: 'Generates income while promoting conservation',
      icon: 'camera-alt'
    }
  ];

  const recordsAndStats = [
    {
      record: 'Longest Gestation',
      stat: '13-14 months',
      detail: 'One of the longest among land mammals',
      icon: 'schedule'
    },
    {
      record: 'Swimming Speed',
      stat: 'Up to 10 km/h',
      detail: 'Faster than most humans can swim',
      icon: 'pool'
    },
    {
      record: 'Daily Foraging',
      stat: '6-8 hours',
      detail: 'Spends most of the night eating',
      icon: 'restaurant'
    },
    {
      record: 'Territory Size',
      stat: '1-4 km²',
      detail: 'Varies based on habitat quality',
      icon: 'map'
    },
    {
      record: 'Seed Dispersal',
      stat: '1,000+ seeds/day',
      detail: 'Essential for forest regeneration',
      icon: 'eco'
    },
    {
      record: 'Weight Range',
      stat: '250-320 kg',
      detail: 'Largest tapir species in the world',
      icon: 'fitness-center'
    }
  ];

  const quirkyBehaviors = [
    {
      behavior: 'Mud Spa Treatments',
      description: 'Love rolling in mud to cool down and protect skin from insects',
      frequency: 'Daily routine'
    },
    {
      behavior: 'Scent Marking Rituals',
      description: 'Use urine spraying and gland secretions to mark territory',
      frequency: 'Regular communication'
    },
    {
      behavior: 'Solo Dining',
      description: 'Prefer to eat alone, avoiding competition for food',
      frequency: 'Lifelong habit'
    },
    {
      behavior: 'Morning Hide-and-Seek',
      description: 'Find hidden spots to rest during the day',
      frequency: 'Daily disappearing act'
    }
  ];

  const comparisons = [
    {
      comparison: 'vs. Elephants',
      similarity: 'Both have prehensile trunks/snouts',
      difference: 'Tapirs are much smaller and nocturnal'
    },
    {
      comparison: 'vs. Rhinos',
      similarity: 'Both are odd-toed ungulates',
      difference: 'Tapirs are herbivorous browsers vs. grazers'
    },
    {
      comparison: 'vs. Pigs',
      similarity: 'Similar body shape and size',
      difference: 'Not related - just convergent evolution'
    },
    {
      comparison: 'vs. Humans',
      similarity: 'Both are intelligent problem-solvers',
      difference: 'Tapirs have much better swimming skills!'
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Amazing Facts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="auto-awesome" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Amazing Tapir Facts
          </ThemedText>
        </View>
        
        <View style={styles.factsGrid}>
          {amazingFacts.map((fact, index) => (
            <View key={index} style={[
              styles.factCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.factHeader}>
                <ThemedText style={styles.factEmoji}>{fact.emoji}</ThemedText>
                <ThemedText style={[
                  styles.factTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {fact.title}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.factText,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {fact.fact}
              </ThemedText>
              <View style={[
                styles.factDetail,
                { backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#F8F9FA' }
              ]}>
                <ThemedText style={[
                  styles.factDetailText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  💡 {fact.detail}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Unique Abilities */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="stars" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Unique Abilities
          </ThemedText>
        </View>
        
        <View style={styles.abilitiesGrid}>
          {uniqueAbilities.map((ability, index) => (
            <View key={index} style={[
              styles.abilityCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.abilityHeader}>
                <View style={[
                  styles.abilityIcon,
                  { backgroundColor: '#9C27B020' }
                ]}>
                  <MaterialIcons 
                    name={ability.icon} 
                    size={20} 
                    color="#9C27B0" 
                  />
                </View>
                <ThemedText style={[
                  styles.abilityTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {ability.ability}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.abilityDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {ability.description}
              </ThemedText>
              <ThemedText style={[
                styles.abilityAmazement,
                { color: '#9C27B0' }
              ]}>
                ✨ {ability.amazement}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Baby Facts */}
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
            Baby Tapir Facts
          </ThemedText>
        </View>
        
        <View style={styles.babyGrid}>
          {babyFacts.map((baby, index) => (
            <View key={index} style={[
              styles.babyCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.babyHeader}>
                <ThemedText style={styles.babyEmoji}>{baby.emoji}</ThemedText>
                <ThemedText style={[
                  styles.babyFact,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {baby.fact}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.babyDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {baby.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Cultural Significance */}
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
            Cultural Significance
          </ThemedText>
        </View>
        
        <View style={styles.culturalGrid}>
          {culturalSignificance.map((culture, index) => (
            <View key={index} style={[
              styles.cultureCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.cultureHeader}>
                <View style={[
                  styles.cultureIcon,
                  { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                ]}>
                  <MaterialIcons 
                    name={culture.icon} 
                    size={20} 
                    color={isDark ? Colors.dark.tint : Colors.light.tint} 
                  />
                </View>
                <ThemedText style={[
                  styles.cultureAspect,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {culture.aspect}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.cultureDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {culture.description}
              </ThemedText>
              <View style={[
                styles.significanceBox,
                { backgroundColor: isDark ? Colors.dark.tint + '10' : Colors.light.tint + '10' }
              ]}>
                <ThemedText style={[
                  styles.significanceText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  🌟 {culture.significance}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Records & Stats */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="trending-up" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Tapir Records & Stats
          </ThemedText>
        </View>
        
        <View style={styles.recordsGrid}>
          {recordsAndStats.map((record, index) => (
            <View key={index} style={[
              styles.recordCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.recordHeader}>
                <MaterialIcons 
                  name={record.icon} 
                  size={24} 
                  color="#4CAF50" 
                />
                <View style={styles.recordInfo}>
                  <ThemedText style={[
                    styles.recordTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {record.record}
                  </ThemedText>
                  <ThemedText style={[
                    styles.recordStat,
                    { color: '#4CAF50' }
                  ]}>
                    {record.stat}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.recordDetail,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {record.detail}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Quirky Behaviors */}
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
            Quirky Behaviors
          </ThemedText>
        </View>
        
        <View style={styles.behaviorsGrid}>
          {quirkyBehaviors.map((behavior, index) => (
            <View key={index} style={[
              styles.behaviorCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.behaviorTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🎭 {behavior.behavior}
              </ThemedText>
              <ThemedText style={[
                styles.behaviorDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {behavior.description}
              </ThemedText>
              <ThemedText style={[
                styles.behaviorFrequency,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📅 {behavior.frequency}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Animal Comparisons */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="compare" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            How Tapirs Compare
          </ThemedText>
        </View>
        
        <View style={styles.comparisonsGrid}>
          {comparisons.map((comp, index) => (
            <View key={index} style={[
              styles.comparisonCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.comparisonTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🆚 Tapirs {comp.comparison}
              </ThemedText>
              <View style={styles.comparisonDetails}>
                <View style={[
                  styles.similarityBox,
                  { backgroundColor: '#4CAF5010' }
                ]}>
                  <ThemedText style={[
                    styles.similarityText,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    ✅ {comp.similarity}
                  </ThemedText>
                </View>
                <View style={[
                  styles.differenceBox,
                  { backgroundColor: '#2196F310' }
                ]}>
                  <ThemedText style={[
                    styles.differenceText,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    🔄 {comp.difference}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Final Fun Fact */}
      <View style={[
        styles.finalFactCard,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
          borderLeftColor: '#FF9800'
        }
      ]}>
        <View style={styles.finalFactHeader}>
          <MaterialIcons 
            name="celebration" 
            size={24} 
            color="#FF9800" 
          />
          <ThemedText style={[
            styles.finalFactTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Mind-Blowing Fact!
          </ThemedText>
        </View>
        <ThemedText style={[
          styles.finalFactText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          🇲🇾 **Malaysia's 50-ringgit banknote features the Malayan tapir**, making it one of the few animals to be honored on national currency! This recognition highlights the tapir's importance as Malaysia's gentle forest guardian and symbol of conservation success. 
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

  // Facts Grid
  factsGrid: {
    gap: 16,
  },
  factCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  factHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  factEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  factText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  factDetail: {
    padding: 8,
    borderRadius: 6,
  },
  factDetailText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Abilities Grid
  abilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  abilityCard: {
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
  abilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  abilityTitle: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  abilityDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 6,
  },
  abilityAmazement: {
    fontSize: 11,
    fontWeight: '500',
  },

  // Baby Grid
  babyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  babyCard: {
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
  babyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  babyEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  babyFact: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  babyDesc: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Cultural Grid
  culturalGrid: {
    gap: 12,
  },
  cultureCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cultureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cultureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cultureAspect: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  cultureDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  significanceBox: {
    padding: 8,
    borderRadius: 6,
  },
  significanceText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Records Grid
  recordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recordCard: {
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
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordInfo: {
    marginLeft: 8,
    flex: 1,
  },
  recordTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  recordStat: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recordDetail: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Behaviors Grid
  behaviorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  behaviorCard: {
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
  behaviorTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  behaviorDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  behaviorFrequency: {
    fontSize: 11,
  },

  // Comparisons Grid
  comparisonsGrid: {
    gap: 12,
  },
  comparisonCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  comparisonTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  comparisonDetails: {
    gap: 8,
  },
  similarityBox: {
    padding: 8,
    borderRadius: 6,
  },
  similarityText: {
    fontSize: 13,
    lineHeight: 18,
  },
  differenceBox: {
    padding: 8,
    borderRadius: 6,
  },
  differenceText: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Final Fact Card
  finalFactCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  finalFactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  finalFactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalFactText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
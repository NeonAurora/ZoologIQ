// components/lesson/turtle/sections/TurtleReproduction.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleReproduction({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Following established pattern
  const content = {
    en: {
      // Section Headers
      reproductionCycle: "Reproduction & Family Life",
      lifeStages: "Life Stages",
      nestingStatistics: "Nesting Statistics",
      temperatureTitle: "Temperature-Dependent Sex Determination",
      homingTitle: "Remarkable Natal Homing",

      // Reproduction Stages
      reproductionStages: [
        {
          icon: '💑',
          title: 'Mating Behavior',
          description: 'Green Sea Turtles mate in shallow coastal waters near nesting beaches, typically during the breeding season',
          color: '#E91E63'
        },
        {
          icon: '🏖️',
          title: 'Nesting',
          description: 'Females return to the same beach where they were born (natal homing) to lay eggs, often at night',
          color: '#FF9800'
        },
        {
          icon: '🥚',
          title: 'Clutch Size',
          description: 'Each female lays 80–120 eggs per nest, and nests multiple times (up to 7) during a single season',
          color: '#4CAF50'
        },
        {
          icon: '🌡️',
          title: 'Incubation Period',
          description: 'Eggs incubate for ~60 days; sand temperature influences the sex of hatchlings (warmer sand = more females)',
          color: '#FF5722'
        },
        {
          icon: '🌙',
          title: 'Hatchling Emergence',
          description: 'Hatchlings emerge at night to avoid predators and use moonlight to navigate toward the ocean',
          color: '#3F51B5'
        },
        {
          icon: '🌊',
          title: 'Juvenile Stage',
          description: 'Juveniles drift in ocean currents for several years, feeding on plankton before moving to coastal habitats',
          color: '#2196F3'
        }
      ],

      // Life Stages - Using strings instead of objects
      lifeStagesData: [
        {
          stageName: 'Hatchling',
          duration: '0-1 years',
          habitat: 'Open ocean currents',
          diet: 'Plankton, small organisms'
        },
        {
          stageName: 'Juvenile',
          duration: '1-20 years',
          habitat: 'Coastal waters, coral reefs',
          diet: 'Transition to herbivorous diet'
        },
        {
          stageName: 'Sub-adult',
          duration: '20-30 years',
          habitat: 'Foraging areas, seagrass beds',
          diet: 'Seagrasses, algae'
        },
        {
          stageName: 'Adult',
          duration: '30-70 years',
          habitat: 'Feeding and nesting areas',
          diet: 'Primarily seagrasses and algae'
        }
      ],

      // Statistics Labels
      statsLabels: {
        eggsPerClutch: 'Eggs per clutch',
        nestsPerSeason: 'Nests per season',
        incubationPeriod: 'Incubation period',
        ageAtMaturity: 'Age at maturity'
      },

      // Labels
      labels: {
        habitat: 'Habitat:',
        diet: 'Diet:'
      },

      // Temperature explanation
      temperatureText: "The sex of Green Sea Turtle hatchlings is determined by the temperature of the sand during incubation. Warmer temperatures (above 29°C) produce more females, while cooler temperatures produce more males. This makes them particularly vulnerable to climate change, as rising temperatures could lead to heavily skewed sex ratios.",

      // Homing explanation
      homingText: "One of the most amazing aspects of Green Sea Turtle reproduction is natal homing - the ability of females to return to the exact beach where they were born to lay their own eggs. This incredible navigation feat occurs after decades of ocean wandering, demonstrating their exceptional memory and spatial awareness abilities."
    },
    ms: {
      // Section Headers
      reproductionCycle: "Pembiakan & Kehidupan Keluarga",
      lifeStages: "Peringkat Kehidupan",
      nestingStatistics: "Statistik Penetasan",
      temperatureTitle: "Penentuan Jantina Bergantung Suhu",
      homingTitle: "Natal Homing yang Luar Biasa",

      // Reproduction Stages
      reproductionStages: [
        {
          icon: '💑',
          title: 'Kelakuan Mengawan',
          description: 'Penyu Agar mengawan di perairan pantai cetek berhampiran pantai penetasan, biasanya semasa musim pembiakan',
          color: '#E91E63'
        },
        {
          icon: '🏖️',
          title: 'Penetasan Telur',
          description: 'Penyu betina kembali ke pantai tempat mereka dilahirkan (natal homing) untuk bertelur, selalunya pada waktu malam',
          color: '#FF9800'
        },
        {
          icon: '🥚',
          title: 'Bilangan Telur',
          description: 'Setiap betina meletakkan 80–120 biji telur setiap sarang dan boleh bersarang sehingga 7 kali dalam satu musim',
          color: '#4CAF50'
        },
        {
          icon: '🌡️',
          title: 'Tempoh Inkubasi',
          description: 'Telur mengambil masa ~60 hari untuk menetas; suhu pasir menentukan jantina anak penyu (suhu panas = lebih banyak betina)',
          color: '#FF5722'
        },
        {
          icon: '🌙',
          title: 'Kemunculan Anak Penyu',
          description: 'Anak penyu muncul pada waktu malam untuk mengelak pemangsa dan menggunakan cahaya bulan untuk menuju ke laut',
          color: '#3F51B5'
        },
        {
          icon: '🌊',
          title: 'Peringkat Juvenil',
          description: 'Anak penyu hanyut dalam arus laut selama beberapa tahun, memakan plankton sebelum berpindah ke habitat pantai',
          color: '#2196F3'
        }
      ],

      // Life Stages - Using strings instead of objects
      lifeStagesData: [
        {
          stageName: 'Anak Penyu',
          duration: '0-1 tahun',
          habitat: 'Arus laut terbuka',
          diet: 'Plankton, organisma kecil'
        },
        {
          stageName: 'Juvenil',
          duration: '1-20 tahun',
          habitat: 'Perairan pantai, terumbu karang',
          diet: 'Peralihan kepada diet herbivor'
        },
        {
          stageName: 'Pra-dewasa',
          duration: '20-30 tahun',
          habitat: 'Kawasan mencari makan, padang rumpai laut',
          diet: 'Rumpai laut, alga'
        },
        {
          stageName: 'Dewasa',
          duration: '30-70 tahun',
          habitat: 'Kawasan makan dan penetasan',
          diet: 'Terutamanya rumpai laut dan alga'
        }
      ],

      // Statistics Labels
      statsLabels: {
        eggsPerClutch: 'Telur setiap kelompok',
        nestsPerSeason: 'Sarang setiap musim',
        incubationPeriod: 'Tempoh inkubasi',
        ageAtMaturity: 'Umur kematangan'
      },

      // Labels
      labels: {
        habitat: 'Habitat:',
        diet: 'Diet:'
      },

      // Temperature explanation
      temperatureText: "Jantina anak Penyu Agar ditentukan oleh suhu pasir semasa inkubasi. Suhu yang lebih panas (melebihi 29°C) menghasilkan lebih banyak betina, manakala suhu yang lebih sejuk menghasilkan lebih banyak jantan. Ini menjadikan mereka sangat terdedah kepada perubahan iklim, kerana peningkatan suhu boleh membawa kepada nisbah jantina yang sangat condong.",

      // Homing explanation
      homingText: "Salah satu aspek yang paling menakjubkan dalam pembiakan Penyu Agar ialah natal homing - keupayaan penyu betina untuk kembali ke pantai tempat mereka dilahirkan untuk meletakkan telur mereka sendiri. Pencapaian navigasi yang luar biasa ini berlaku selepas berdekad-dekad mengembara di lautan, menunjukkan ingatan yang luar biasa dan keupayaan kesedaran ruang mereka."
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Reproduction Cycle */}
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
            {text.reproductionCycle}
          </ThemedText>
        </View>

        <View style={styles.stagesGrid}>
          {text.reproductionStages.map((stage, index) => (
            <View key={index} style={[
              styles.stageCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[styles.stageIcon, { backgroundColor: `${stage.color}20` }]}>
                <ThemedText style={styles.stageEmoji}>{stage.icon}</ThemedText>
              </View>
              <View style={styles.stageContent}>
                <ThemedText style={[
                  styles.stageTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {stage.title}
                </ThemedText>
                <ThemedText style={[
                  styles.stageDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {stage.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Life Stages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="timeline" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.lifeStages}
          </ThemedText>
        </View>

        <View style={styles.lifeStagesContainer}>
          {text.lifeStagesData.map((stageItem, index) => (
            <View key={index} style={[
              styles.lifeStageCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.lifeStageHeader}>
                <ThemedText style={[
                  styles.lifeStageTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {stageItem.stageName}
                </ThemedText>
                <ThemedText style={[
                  styles.lifeStageDuration,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {stageItem.duration}
                </ThemedText>
              </View>
              <View style={styles.lifeStageDetails}>
                <View style={styles.lifeStageRow}>
                  <MaterialIcons name="place" size={16} color="#4CAF50" />
                  <ThemedText style={[
                    styles.lifeStageLabel,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {text.labels.habitat}
                  </ThemedText>
                  <ThemedText style={[
                    styles.lifeStageValue,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                    {stageItem.habitat}
                  </ThemedText>
                </View>
                <View style={styles.lifeStageRow}>
                  <MaterialIcons name="restaurant" size={16} color="#FF9800" />
                  <ThemedText style={[
                    styles.lifeStageLabel,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {text.labels.diet}
                  </ThemedText>
                  <ThemedText style={[
                    styles.lifeStageValue,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                    {stageItem.diet}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Temperature & Sex Determination */}
      <View style={styles.section}>
        <View style={[
          styles.temperatureCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF5722'
          }
        ]}>
          <View style={styles.temperatureHeader}>
            <MaterialIcons name="thermostat" size={20} color="#FF5722" />
            <ThemedText style={[
              styles.temperatureTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.temperatureTitle}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.temperatureText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.temperatureText}
          </ThemedText>
        </View>
      </View>

      {/* Nesting Statistics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="analytics" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.nestingStatistics}
          </ThemedText>
        </View>

        <View style={styles.statsGrid}>
          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>80-120</ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.statsLabels.eggsPerClutch}
            </ThemedText>
          </View>

          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>
              {currentLanguage === 'en' ? 'Up to 7' : 'Sehingga 7'}
            </ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.statsLabels.nestsPerSeason}
            </ThemedText>
          </View>

          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>
              {currentLanguage === 'en' ? '~60 days' : '~60 hari'}
            </ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.statsLabels.incubationPeriod}
            </ThemedText>
          </View>

          <View style={[
            styles.statCard,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <ThemedText style={styles.statNumber}>
              {currentLanguage === 'en' ? '20-50 years' : '20-50 tahun'}
            </ThemedText>
            <ThemedText style={[
              styles.statLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.statsLabels.ageAtMaturity}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Natal Homing */}
      <View style={styles.section}>
        <View style={[
          styles.homingCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.homingHeader}>
            <MaterialIcons name="home" size={20} color="#2196F3" />
            <ThemedText style={[
              styles.homingTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.homingTitle}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.homingText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.homingText}
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

  // Stages Grid
  stagesGrid: {
    gap: 12,
  },
  stageCard: {
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
  stageIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stageEmoji: {
    fontSize: 20,
  },
  stageContent: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stageDesc: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Life Stages
  lifeStagesContainer: {
    gap: 12,
  },
  lifeStageCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lifeStageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lifeStageTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  lifeStageDuration: {
    fontSize: 14,
    fontWeight: '500',
  },
  lifeStageDetails: {
    gap: 8,
  },
  lifeStageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lifeStageLabel: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 60,
  },
  lifeStageValue: {
    fontSize: 14,
    flex: 1,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
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
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },

  // Special Cards
  temperatureCard: {
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
  temperatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  temperatureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  temperatureText: {
    fontSize: 15,
    lineHeight: 22,
  },

  homingCard: {
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
  homingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  homingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  homingText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
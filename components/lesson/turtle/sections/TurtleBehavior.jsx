// components/lesson/turtle/sections/TurtleBehavior.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleBehavior({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Based on your provided content
  const content = {
    en: {
      // Section Headers
      keyBehaviors: "Key Behaviors",
      intelligenceNavigation: "Intelligence & Navigation",
      socialBehavior: "Social Behavior",
      predatorAvoidance: "Predator Avoidance",
      amazingMigration: "Amazing Migration",

      // Main Behaviors
      behaviors: [
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
          title: 'Feeding Habits',
          description: 'Demonstrate selective feeding, preferring seagrasses and algae, which they crop carefully without uprooting',
          color: '#8BC34A'
        },
        {
          icon: '🏊‍♀️',
          title: 'Resting Behavior',
          description: 'Rest in underwater caves, crevices, or floating on the surface, showing adaptability to different environments',
          color: '#00BCD4'
        }
      ],

      // Intelligence Features
      intelligenceFeatures: [
        'Possess spatial awareness and navigation skills, relying on Earth\'s magnetic fields and visual cues',
        'Use visual cues from the environment for navigation and orientation',
        'Show coordinated emergence behaviors in hatchlings to evade predators',
        'Demonstrate problem-solving abilities when navigating obstacles',
        'Exhibit learned behaviors passed between generations'
      ],

      // Social Aspects
      socialAspects: [
        {
          behavior: 'Solitary Nature',
          description: 'Typically solitary, but congregated in large numbers at nesting and feeding sites'
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
      ],

      // Detailed Explanations
      predatorText: "Hatchlings use coordinated emergence and instinctive navigation to evade predators and reach the sea. They emerge at night to avoid diurnal predators and use moonlight to navigate toward the ocean. Adults rely on their size, swimming speed, and ability to retreat to deeper waters for protection.",

      migrationText: "Green Sea Turtles are among the most impressive navigators in the animal kingdom. They can travel thousands of kilometers across open ocean, using Earth's magnetic field as a compass. Some individuals migrate between feeding areas in one country and nesting beaches in another, maintaining these routes throughout their 60-70 year lifespan."
    },
    ms: {
      // Section Headers
      keyBehaviors: "Tingkah Laku Utama",
      intelligenceNavigation: "Kecerdasan & Navigasi",
      socialBehavior: "Tingkah Laku Sosial",
      predatorAvoidance: "Mengelakkan Pemangsa",
      amazingMigration: "Migrasi yang Menakjubkan",

      // Main Behaviors
      behaviors: [
        {
          icon: '🗺️',
          title: 'Tingkah Laku Migrasi',
          description: 'Melakukan migrasi jauh antara kawasan makan dan pantai penetasan, kadangkala melintasi seluruh lautan',
          color: '#2196F3'
        },
        {
          icon: '🏠',
          title: 'Homing Natal',
          description: 'Menunjukkan ingatan dan ketepatan yang luar biasa, kembali ke pantai tempat mereka dilahirkan untuk bertelur',
          color: '#4CAF50'
        },
        {
          icon: '🥬',
          title: 'Tabiat Pemakanan',
          description: 'Menunjukkan pemakanan selektif, lebih suka makan rumpai laut dan alga dengan cara memotong secara berhati-hati tanpa mencabut akarnya',
          color: '#8BC34A'
        },
        {
          icon: '🏊‍♀️',
          title: 'Tingkah Laku Berehat',
          description: 'Berehat di gua bawah air, celahan batu, atau terapung di permukaan laut, menunjukkan keupayaan menyesuaikan diri dengan pelbagai persekitaran',
          color: '#00BCD4'
        }
      ],

      // Intelligence Features
      intelligenceFeatures: [
        'Mempunyai kesedaran ruang dan kebolehan navigasi, bergantung pada medan magnet Bumi dan isyarat visual',
        'Menggunakan isyarat visual dari persekitaran untuk navigasi dan orientasi',
        'Menunjukkan tingkah laku kemunculan yang diselaraskan dalam anak penyu untuk mengelak pemangsa',
        'Menunjukkan keupayaan menyelesaikan masalah ketika mengemudi halangan',
        'Mempamerkan tingkah laku yang dipelajari yang diwarisi antara generasi'
      ],

      // Social Aspects
      socialAspects: [
        {
          behavior: 'Sifat Menyendiri',
          description: 'Biasanya bersifat menyendiri, tetapi berkumpul dalam jumlah besar di kawasan makan dan penetasan'
        },
        {
          behavior: 'Kumpulan Penetasan',
          description: 'Berkumpul dalam jumlah besar di pantai penetasan tertentu semasa musim pembiakan'
        },
        {
          behavior: 'Kumpulan Pemakanan',
          description: 'Kadang-kadang makan bersama-sama di padang rumpai laut yang prima'
        },
        {
          behavior: 'Koordinasi Anak Penyu',
          description: 'Anak penyu muncul bersama-sama dan menggunakan pergerakan kumpulan untuk perlindungan'
        }
      ],

      // Detailed Explanations
      predatorText: "Anak penyu menggunakan kemunculan secara serentak dan navigasi naluri untuk mengelak pemangsa dan menuju ke laut. Mereka muncul pada waktu malam untuk mengelakkan pemangsa diurnal dan menggunakan cahaya bulan untuk menuju ke laut. Penyu dewasa bergantung kepada saiz, kelajuan renang, dan keupayaan mereka untuk berundur ke perairan yang lebih dalam untuk perlindungan.",

      migrationText: "Penyu Agar adalah antara navigator yang paling mengagumkan dalam dunia haiwan. Mereka boleh mengembara ribuan kilometer merentasi lautan terbuka, menggunakan medan magnet Bumi sebagai kompas. Sesetengah individu berhijrah antara kawasan makan di satu negara dan pantai penetasan di negara lain, mengekalkan laluan ini sepanjang jangka hayat 60-70 tahun mereka."
    }
  };

  const text = content[currentLanguage] || content.en;

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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.keyBehaviors}
          </ThemedText>
        </View>

        <View style={styles.behaviorsGrid}>
          {text.behaviors.map((behavior, index) => (
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
                <ThemedText style={[
                  styles.behaviorTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {behavior.title}
                </ThemedText>
                <ThemedText style={[
                  styles.behaviorDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {behavior.description}
                </ThemedText>
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.intelligenceNavigation}
          </ThemedText>
        </View>

        <View style={[
          styles.intelligenceCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.intelligenceList}>
            {text.intelligenceFeatures.map((feature, index) => (
              <View key={index} style={styles.intelligenceItem}>
                <View style={[
                  styles.intelligenceBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={[
                  styles.intelligenceText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {feature}
                </ThemedText>
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.socialBehavior}
          </ThemedText>
        </View>

        <View style={styles.socialGrid}>
          {text.socialAspects.map((aspect, index) => (
            <View key={index} style={[
              styles.socialCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.socialTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {aspect.behavior}
              </ThemedText>
              <ThemedText style={[
                styles.socialDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {aspect.description}
              </ThemedText>
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
            <ThemedText style={[
              styles.predatorTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.predatorAvoidance}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.predatorText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.predatorText}
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
            <ThemedText style={[
              styles.migrationTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.amazingMigration}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.migrationText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.migrationText}
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
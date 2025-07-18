// components/lesson/turtle/sections/TurtleBiology.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleBiology({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Based on your provided content
  const content = {
    en: {
      // Section Headers
      scientificClassification: "Scientific Classification",
      physicalCharacteristics: "Physical Characteristics",
      remarkableAdaptations: "Physiology & Adaptations",
      greenColoration: "Green Coloration",
      temperatureRegulation: "Temperature Regulation",

      // Taxonomy Data
      taxonomyData: [
        { rank: 'Kingdom', classification: 'Animalia' },
        { rank: 'Phylum', classification: 'Chordata' },
        { rank: 'Class', classification: 'Reptilia' },
        { rank: 'Order', classification: 'Testudines' },
        { rank: 'Family', classification: 'Cheloniidae' },
        { rank: 'Genus', classification: 'Chelonia' },
        { rank: 'Species', classification: 'Chelonia mydas' }
      ],

      // Physical Features
      physicalFeatures: [
        {
          feature: 'Size',
          details: 'Up to 1 meter in length',
          icon: '📏'
        },
        {
          feature: 'Weight',
          details: 'Up to 160 kg for adults',
          icon: '⚖️'
        },
        {
          feature: 'Shell',
          details: 'Smooth, greenish carapace',
          icon: '🛡️'
        },
        {
          feature: 'Flippers',
          details: 'Powerful forelimbs adapted for swimming',
          icon: '🏊'
        }
      ],

      // Adaptations
      adaptations: [
        {
          icon: '🏊‍♂️',
          title: 'Streamlined Shell',
          description: 'The smooth, heart-shaped carapace reduces water resistance, aiding efficient swimming',
          color: '#2196F3'
        },
        {
          icon: '🫁',
          title: 'Lungs for Diving',
          description: 'Large, efficient lungs allow them to hold their breath for hours while resting underwater',
          color: '#00BCD4'
        },
        {
          icon: '🧂',
          title: 'Salt Glands',
          description: 'Specialized glands near the eyes excrete excess salt from seawater, enabling life in saline environments',
          color: '#607D8B'
        },
        {
          icon: '🧭',
          title: 'Magnetic Navigation',
          description: 'Use Earth\'s magnetic fields to navigate thousands of kilometers between feeding and nesting sites',
          color: '#9C27B0'
        },
        {
          icon: '🎨',
          title: 'Powerful Flippers',
          description: 'Forelimbs are adapted as flippers for long-distance swimming in oceans',
          color: '#FF9800'
        }
      ],

      // Detailed Explanations
      colorationText: "The Green Sea Turtle gets its name from the greenish hue of their fat, from which they get their name, helps in camouflage among seagrass beds. This coloration comes from their diet of seagrasses and algae, providing protection from predators while they graze.",

      temperatureText: "Ectothermic physiology relies on external temperatures, driving behaviors like basking in the sun. As ectothermic animals, Green Sea Turtles rely on external temperatures to regulate their body heat. This drives behaviors like basking in the sun at the surface or seeking warmer waters during different seasons and life stages."
    },
    ms: {
      // Section Headers
      scientificClassification: "Klasifikasi Saintifik",
      physicalCharacteristics: "Ciri Fizikal",
      remarkableAdaptations: "Fisiologi & Penyesuaian",
      greenColoration: "Pewarnaan Hijau",
      temperatureRegulation: "Pengawalan Suhu",

      // Taxonomy Data
      taxonomyData: [
        { rank: 'Kingdom', classification: 'Animalia' },
        { rank: 'Phylum', classification: 'Chordata' },
        { rank: 'Class', classification: 'Reptilia' },
        { rank: 'Order', classification: 'Testudines' },
        { rank: 'Family', classification: 'Cheloniidae' },
        { rank: 'Genus', classification: 'Chelonia' },
        { rank: 'Species', classification: 'Chelonia mydas' }
      ],

      // Physical Features
      physicalFeatures: [
        {
          feature: 'Saiz',
          details: 'Sehingga 1 meter panjang',
          icon: '📏'
        },
        {
          feature: 'Berat',
          details: 'Sehingga 160 kg untuk dewasa',
          icon: '⚖️'
        },
        {
          feature: 'Cengkerang',
          details: 'Karapas licin berwarna kehijauan',
          icon: '🛡️'
        },
        {
          feature: 'Sirip',
          details: 'Anggota hadapan kuat yang disesuaikan untuk renang',
          icon: '🏊'
        }
      ],

      // Adaptations
      adaptations: [
        {
          icon: '🏊‍♂️',
          title: 'Cengkerang Berbentuk Aerodinamik',
          description: 'Karapas yang licin dan berbentuk hati mengurangkan rintangan air, membantu renangan yang cekap',
          color: '#2196F3'
        },
        {
          icon: '🫁',
          title: 'Paru-paru untuk Menyelam',
          description: 'Paru-paru yang besar dan cekap membolehkan penyu menahan nafas selama berjam-jam ketika berehat di bawah air',
          color: '#00BCD4'
        },
        {
          icon: '🧂',
          title: 'Kelenjar Garam',
          description: 'Kelenjar khas berhampiran mata menyingkirkan garam berlebihan daripada air laut, membolehkan kehidupan dalam persekitaran masin',
          color: '#607D8B'
        },
        {
          icon: '🧭',
          title: 'Navigasi Magnetik',
          description: 'Menggunakan medan magnet Bumi untuk mengemudi ribuan kilometer antara tempat makan dan pantai penetasan',
          color: '#9C27B0'
        },
        {
          icon: '🎨',
          title: 'Sirip yang Kuat',
          description: 'Anggota hadapan berubah menjadi sirip yang sesuai untuk renangan jarak jauh di lautan',
          color: '#FF9800'
        }
      ],

      // Detailed Explanations
      colorationText: "Penyu Agar mendapat namanya daripada warna kehijauan pada lemaknya—asal-usul nama \"Penyu Agar\"—membantu penyamaran di padang rumpai laut. Pewarnaan ini datang daripada diet rumpai laut dan alga mereka, memberikan perlindungan daripada pemangsa semasa mereka makan.",

      temperatureText: "Fisiologi ektotermik yang bergantung kepada suhu luaran, menyebabkan tingkah laku seperti berjemur di bawah matahari. Sebagai haiwan ektotermik, Penyu Agar bergantung kepada suhu luaran untuk mengatur haba badan mereka. Ini mendorong tingkah laku seperti berjemur di bawah matahari di permukaan atau mencari perairan yang lebih hangat semasa musim dan peringkat hidup yang berbeza."
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Taxonomic Classification */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="science" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.scientificClassification}
          </ThemedText>
        </View>

        <View style={[
          styles.taxonomyCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.taxonomyData.map((item, index) => (
            <View key={index} style={[
              styles.taxonomyRow,
              index < text.taxonomyData.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.taxonomyRank,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {item.rank}
              </ThemedText>
              <ThemedText style={[
                styles.taxonomyValue,
                { color: isDark ? Colors.dark.text : Colors.light.text },
                item.rank === 'Species' && styles.speciesName
              ]}>
                {item.classification}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Physical Features */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="straighten" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.physicalCharacteristics}
          </ThemedText>
        </View>

        <View style={styles.featuresGrid}>
          {text.physicalFeatures.map((item, index) => (
            <View key={index} style={[
              styles.featureCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={styles.featureIcon}>{item.icon}</ThemedText>
              <ThemedText style={[
                styles.featureTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {item.feature}
              </ThemedText>
              <ThemedText style={[
                styles.featureDetails,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {item.details}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Remarkable Adaptations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="settings" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.remarkableAdaptations}
          </ThemedText>
        </View>

        <View style={styles.adaptationsGrid}>
          {text.adaptations.map((adaptation, index) => (
            <View key={index} style={[
              styles.adaptationCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[styles.adaptationIcon, { backgroundColor: `${adaptation.color}20` }]}>
                <ThemedText style={styles.adaptationEmoji}>{adaptation.icon}</ThemedText>
              </View>
              <View style={styles.adaptationContent}>
                <ThemedText style={[
                  styles.adaptationTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {adaptation.title}
                </ThemedText>
                <ThemedText style={[
                  styles.adaptationDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {adaptation.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Coloration & Camouflage */}
      <View style={styles.section}>
        <View style={[
          styles.colorationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#4CAF50'
          }
        ]}>
          <View style={styles.colorationHeader}>
            <MaterialIcons name="palette" size={20} color="#4CAF50" />
            <ThemedText style={[
              styles.colorationTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.greenColoration}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.colorationText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.colorationText}
          </ThemedText>
        </View>
      </View>

      {/* Temperature Regulation */}
      <View style={styles.section}>
        <View style={[
          styles.thermoCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF9800'
          }
        ]}>
          <View style={styles.thermoHeader}>
            <MaterialIcons name="thermostat" size={20} color="#FF9800" />
            <ThemedText style={[
              styles.thermoTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.temperatureRegulation}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.thermoText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.temperatureText}
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

  // Taxonomy Section
  taxonomyCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taxonomyRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  taxonomyRank: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  taxonomyValue: {
    flex: 2,
    fontSize: 14,
  },
  speciesName: {
    fontStyle: 'italic',
    fontWeight: '600',
  },

  // Features Grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
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
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDetails: {
    fontSize: 14,
    textAlign: 'center',
  },

  // Adaptations Grid
  adaptationsGrid: {
    gap: 12,
  },
  adaptationCard: {
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
  adaptationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  adaptationEmoji: {
    fontSize: 20,
  },
  adaptationContent: {
    flex: 1,
  },
  adaptationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  adaptationDesc: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Special Cards
  colorationCard: {
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
  colorationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  colorationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  colorationText: {
    fontSize: 15,
    lineHeight: 22,
  },

  thermoCard: {
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
  thermoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  thermoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  thermoText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
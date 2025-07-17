// components/lesson/tiger/sections/TigerEcology.jsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TigerEcology({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Structured from Tiger ecology content
  const content = {
    en: {
      // Section Headers
      behaviorIntelligence: 'Behavior & Intelligence',
      reproductionFamily: 'Reproduction & Family Life',
      globalTigerPopulation: 'Global Tiger Population',
      keyInsights: 'Key Insights',

      // Behaviors
      behaviors: [
        {
          icon: 'location-on',
          title: 'Territorial Markers',
          description: 'Spray urine and scratch trees to mark their turf—needing 50–150 km² territory',
          color: '#FF9800'
        },
        {
          icon: 'person',
          title: 'Solo Travelers',
          description: 'Adults live alone with minimal territory overlap, avoiding other tigers',
          color: '#2196F3'
        },
        {
          icon: 'psychology',
          title: 'Smart Hunters',
          description: 'Mimic prey calls (e.g., deer sounds) to lure them closer—advanced problem-solving',
          color: '#9C27B0'
        },
        {
          icon: 'record-voice-over',
          title: 'Chatty Cats',
          description: 'Communicate with roars, growls, and "chuffing" sounds (friendly greeting)',
          color: '#795548'
        },
        {
          icon: 'visibility',
          title: 'Night Vision Experts',
          description: '6x better night vision than humans—eyes glow due to reflective layer',
          color: '#3F51B5'
        },
        {
          icon: 'pool',
          title: 'Swimming Stars',
          description: 'Unlike most cats, they love water and swim to cool off or hunt',
          color: '#00BCD4'
        }
      ],

      // Reproduction Data
      reproductionData: [
        {
          icon: 'family-restroom',
          label: 'Slow Breeders',
          value: 'Females give birth to 2–4 cubs every 2–3 years after 3–4 month pregnancy'
        },
        {
          icon: 'woman',
          label: 'Super Moms',
          value: 'Cubs stay with mothers for 18–24 months to learn hunting and survival skills'
        },
        {
          icon: 'man',
          label: 'Dad\'s Role',
          value: 'Males don\'t raise cubs but protect territory from rival tigers'
        }
      ],

      // Global Population Data
      globalData: [
        {
          country: 'India',
          population2020: '2,967',
          population2023: '3,167',
          trend: 'up',
          trendText: '↑ 6.7%',
          threats: 'Habitat loss, human conflict',
          isHighlighted: false
        },
        {
          country: 'Malaysia',
          population2020: '<150',
          population2023: '<150',
          trend: 'stable',
          trendText: '↔ Stable',
          threats: 'Poaching, deforestation',
          isHighlighted: true
        },
        {
          country: 'Indonesia',
          population2020: '400',
          population2023: '350',
          trend: 'down',
          trendText: '↓ 12.5%',
          threats: 'Palm oil deforestation',
          isHighlighted: false
        },
        {
          country: 'Russia',
          population2020: '540',
          population2023: '600',
          trend: 'up',
          trendText: '↑ 11%',
          threats: 'Climate change, logging',
          isHighlighted: false
        },
        {
          country: 'Bangladesh',
          population2020: '114',
          population2023: '106',
          trend: 'down',
          trendText: '↓ 7%',
          threats: 'Sea-level rise (Sundarbans)',
          isHighlighted: false
        }
      ],

      // Key Insights
      keyInsights: [
        'India: Highest density (75% of global population) due to strict anti-poaching laws',
        'Malaysia & Indonesia: Fastest decline due to palm oil expansion—requiring urgent conservation action',
        'Russia: Recovery success: Siberian tigers rebounded via anti-poaching patrols',
        'Global Trend: Increased from 3,200 (2010) to ~3,900 (2023) but still 96% below historic 100,000'
      ]
    },
    
    ms: {
      // Section Headers
      behaviorIntelligence: 'Tingkah Laku & Kecerdasan',
      reproductionFamily: 'Pembiakan & Kehidupan Keluarga',
      globalTigerPopulation: 'Populasi Harimau Global',
      keyInsights: 'Penemuan Utama',

      // Behaviors
      behaviors: [
        {
          icon: 'location-on',
          title: 'Penanda Wilayah',
          description: 'Menyembur air kencing dan mencakar pokok untuk menanda wilayah—memerlukan 50–150 km²',
          color: '#FF9800'
        },
        {
          icon: 'person',
          title: 'Pengembara Solo',
          description: 'Dewasa hidup bersendirian dengan pertindihan wilayah minimum, mengelakkan harimau lain',
          color: '#2196F3'
        },
        {
          icon: 'psychology',
          title: 'Pemburu Bijak',
          description: 'Meniru panggilan mangsa (contohnya bunyi rusa) untuk memikat mendekat—penyelesaian masalah canggih',
          color: '#9C27B0'
        },
        {
          icon: 'record-voice-over',
          title: 'Kucing yang Bercakap-cakap',
          description: 'Berkomunikasi dengan raungan, geraman, dan bunyi "chuffing" (sapaan mesra)',
          color: '#795548'
        },
        {
          icon: 'visibility',
          title: 'Pakar Penglihatan Malam',
          description: 'Penglihatan malam 6x lebih baik daripada manusia—mata bersinar kerana lapisan pemantul',
          color: '#3F51B5'
        },
        {
          icon: 'pool',
          title: 'Perenang Handal',
          description: 'Tidak seperti kebanyakan kucing, mereka suka air dan berenang untuk menyejukkan badan',
          color: '#00BCD4'
        }
      ],

      // Reproduction Data
      reproductionData: [
        {
          icon: 'family-restroom',
          label: 'Pembiak Lambat',
          value: 'Betina melahirkan 2–4 anak setiap 2–3 tahun selepas mengandung 3–4 bulan'
        },
        {
          icon: 'woman',
          label: 'Ibu yang Hebat',
          value: 'Anak tinggal dengan ibu selama 18–24 bulan untuk belajar memburu dan kemahiran survival'
        },
        {
          icon: 'man',
          label: 'Peranan Bapa',
          value: 'Jantan tidak membesarkan anak tetapi melindungi wilayah dari harimau saingan'
        }
      ],

      // Global Population Data
      globalData: [
        {
          country: 'India',
          population2020: '2,967',
          population2023: '3,167',
          trend: 'up',
          trendText: '↑ 6.7%',
          threats: 'Kehilangan habitat, konflik manusia',
          isHighlighted: false
        },
        {
          country: 'Malaysia',
          population2020: '<150',
          population2023: '<150',
          trend: 'stable',
          trendText: '↔ Stabil',
          threats: 'Pemburuan haram, pembalakan',
          isHighlighted: true
        },
        {
          country: 'Indonesia',
          population2020: '400',
          population2023: '350',
          trend: 'down',
          trendText: '↓ 12.5%',
          threats: 'Pembukaan hutan kelapa sawit',
          isHighlighted: false
        },
        {
          country: 'Rusia',
          population2020: '540',
          population2023: '600',
          trend: 'up',
          trendText: '↑ 11%',
          threats: 'Perubahan iklim, pembalakan',
          isHighlighted: false
        },
        {
          country: 'Bangladesh',
          population2020: '114',
          population2023: '106',
          trend: 'down',
          trendText: '↓ 7%',
          threats: 'Kenaikan paras laut (Sundarbans)',
          isHighlighted: false
        }
      ],

      // Key Insights
      keyInsights: [
        'India: Kepadatan tertinggi (75% populasi global) akibat undang-undang anti-pemburuan ketat',
        'Malaysia & Indonesia: Penurunan tercepat akibat perluasan kelapa sawit—memerlukan tindakan pemuliharaan segera',
        'Rusia: Kejayaan pemulihan: Harimau Siberia pulih melalui rondaan anti-pemburuan haram',
        'Trend Global: Meningkat dari 3,200 (2010) kepada ~3,900 (2023) tetapi masih 96% di bawah paras sejarah 100,000'
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      case 'stable': return '#FF9800';
      default: return isDark ? Colors.dark.textMuted : Colors.light.textMuted;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      case 'stable': return 'trending-flat';
      default: return 'remove';
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
            {text.behaviorIntelligence}
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
              <View style={[
                styles.behaviorIcon,
                { backgroundColor: behavior.color + '20' }
              ]}>
                <MaterialIcons 
                  name={behavior.icon} 
                  size={24} 
                  color={behavior.color} 
                />
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

      {/* Reproduction & Family */}
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
            {text.reproductionFamily}
          </ThemedText>
        </View>
        
        <View style={[
          styles.reproductionCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.reproductionData.map((item, index) => (
            <View key={index} style={[
              styles.reproductionItem,
              index !== text.reproductionData.length - 1 && {
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
                borderBottomWidth: 1
              }
            ]}>
              <View style={styles.reproductionItemHeader}>
                <MaterialIcons 
                  name={item.icon} 
                  size={18} 
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
                />
                <ThemedText style={[
                  styles.reproductionLabel,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {item.label}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.reproductionValue,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {item.value}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Global Tiger Comparison */}
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
            {text.globalTigerPopulation}
          </ThemedText>
        </View>
        
        <View style={styles.comparisonContainer}>
          {text.globalData.map((country, index) => (
            <View key={index} style={[
              styles.countryCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              },
              country.isHighlighted && {
                borderLeftColor: '#FF6B35',
                borderLeftWidth: 4
              }
            ]}>
              <View style={styles.countryHeader}>
                {/* 🔥 FIXED: Separated text and icon */}
                <View style={styles.countryNameContainer}>
                  <ThemedText style={[
                    styles.countryName,
                    { color: isDark ? Colors.dark.text : Colors.light.text },
                    country.isHighlighted && styles.highlightedCountry
                  ]}>
                    {country.country}
                  </ThemedText>
                  {country.isHighlighted && (
                    <MaterialIcons name="star" size={16} color="#FF6B35" style={styles.starIcon} />
                  )}
                </View>
                
                <View style={[
                  styles.trendBadge,
                  { backgroundColor: getTrendColor(country.trend) + '20' }
                ]}>
                  <MaterialIcons 
                    name={getTrendIcon(country.trend)} 
                    size={14} 
                    color={getTrendColor(country.trend)} 
                  />
                  <ThemedText style={[
                    styles.trendText,
                    { color: getTrendColor(country.trend) }
                  ]}>
                    {country.trendText}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.populationData}>
                <View style={styles.populationItem}>
                  <ThemedText style={[
                    styles.populationLabel,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                    2020
                  </ThemedText>
                  <ThemedText style={[
                    styles.populationValue,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {country.population2020}
                  </ThemedText>
                </View>
                
                <MaterialIcons 
                  name="arrow-forward" 
                  size={16} 
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                />
                
                <View style={styles.populationItem}>
                  <ThemedText style={[
                    styles.populationLabel,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                    2023
                  </ThemedText>
                  <ThemedText style={[
                    styles.populationValue,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {country.population2023}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.threatsContainer}>
                <MaterialIcons 
                  name="warning" 
                  size={14} 
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                />
                <ThemedText style={[
                  styles.threatsText,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {country.threats}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Key Insights - 🔥 FIXED: Simplified to plain strings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="insights" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.keyInsights}
          </ThemedText>
        </View>
        
        <View style={[
          styles.insightsCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.keyInsights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <View style={[
                styles.insightBullet,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]} />
              <ThemedText style={[
                styles.insightText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {insight}
              </ThemedText>
            </View>
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

  // Behavior Cards
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
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
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
  reproductionItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  reproductionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  reproductionValue: {
    fontSize: 15,
    lineHeight: 20,
  },

  // Global Comparison
  comparisonContainer: {
    gap: 12,
  },
  countryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  highlightedCountry: {
    color: '#FF6B35',
  },
  starIcon: {
    marginLeft: 6,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  populationData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 16,
  },
  populationItem: {
    alignItems: 'center',
  },
  populationLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  populationValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  threatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  threatsText: {
    fontSize: 13,
    flex: 1,
  },

  // Insights
  insightsCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
});
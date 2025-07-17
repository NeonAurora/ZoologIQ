// components/lesson/tapir/sections/TapirEcology.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirEcology({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const language = currentLanguage;


  // 🔥 SAFETY: Helper function to ensure we render strings
  const safeRender = (value, fallback = '') => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (value === null || value === undefined) return fallback;
    // If it's an object, return fallback to prevent rendering error
    return fallback;
  };

  // 🔥 NEW: Bilingual content structure
  const content = {
    en: {
      // Section Headers
      habitatRequirements: 'Habitat Requirements',
      ecologicalRolesImpact: 'Ecological Roles & Impact',
      dietForagingBehavior: 'Diet & Foraging Behavior',
      keystoneSpeciesImpact: 'Keystone Species Impact',
      conservationValue: 'Conservation Value',
      
      // Habitat Preferences
      habitatPreferences: [
        {
          icon: 'forest',
          title: 'Dense Tropical Rainforests',
          location: 'Peninsular Malaysia, Southern Thailand, Sumatra',
          description: 'Primary habitat with thick canopy cover',
          details: 'Requires undisturbed forests with diverse plant species'
        },
        {
          icon: 'water',
          title: 'Near Water Sources',
          location: 'Rivers, streams, swamps',
          description: 'Essential for drinking, cooling, and escape routes',
          details: 'Daily access to water is critical for survival'
        },
        {
          icon: 'terrain',
          title: 'Lowland Areas',
          location: 'Below 1,000m elevation',
          description: 'Prefers gentle terrain with rich vegetation',
          details: 'Avoids steep mountainous regions'
        },
        {
          icon: 'nature-people',
          title: 'Minimal Human Disturbance',
          location: 'Protected areas and remote forests',
          description: 'Highly sensitive to human activities',
          details: 'Abandons areas with regular human presence'
        }
      ],
      
      // Ecological Roles
      ecologicalRoles: [
        {
          icon: 'eco',
          title: 'Seed Dispersal',
          impact: 'Thousands of seeds daily',
          description: 'Primary forest regeneration mechanism',
          benefit: 'Maintains forest diversity across large areas'
        },
        {
          icon: 'balance',
          title: 'Vegetation Control',
          impact: 'Natural pruning',
          description: 'Prevents overgrowth of certain plant species',
          benefit: 'Promotes diverse plant communities'
        },
        {
          icon: 'route',
          title: 'Path Creation',
          impact: 'Forest trail networks',
          description: 'Creates pathways used by other wildlife',
          benefit: 'Facilitates animal movement and gene flow'
        },
        {
          icon: 'recycling',
          title: 'Nutrient Cycling',
          impact: 'Soil enrichment',
          description: 'Distributes nutrients through dung',
          benefit: 'Improves soil fertility across territories'
        }
      ],
      
      // Diet Details
      dietDetails: [
        {
          category: 'Fruits',
          percentage: '40%',
          examples: 'Figs, berries, palm fruits',
          seasonality: 'Year-round, peak in fruiting seasons',
          role: 'Primary seed dispersal source'
        },
        {
          category: 'Leaves',
          percentage: '30%',
          examples: 'Young shoots, tender leaves',
          seasonality: 'Consistent availability',
          role: 'Main nutrition and fiber source'
        },
        {
          category: 'Aquatic Plants',
          percentage: '20%',
          examples: 'Water lilies, algae, marsh plants',
          seasonality: 'During water foraging',
          role: 'Minerals and hydration'
        },
        {
          category: 'Bark & Twigs',
          percentage: '10%',
          examples: 'Soft bark, young branches',
          seasonality: 'Dry season supplement',
          role: 'Emergency food during scarcity'
        }
      ],
      
      // Keystone Impacts
      keystoneImpacts: [
        {
          species: 'Forest Birds',
          relationship: 'Indirect benefit',
          description: 'Tapir-dispersed seeds create diverse fruiting trees',
          impact: 'Increased food sources and nesting sites'
        },
        {
          species: 'Small Mammals',
          relationship: 'Trail usage',
          description: 'Use tapir-created paths for movement',
          impact: 'Enhanced habitat connectivity'
        },
        {
          species: 'Insects',
          relationship: 'Habitat diversity',
          description: 'Benefit from diverse plant communities',
          impact: 'Higher biodiversity and pollination services'
        },
        {
          species: 'Other Herbivores',
          relationship: 'Reduced competition',
          description: 'Tapirs control dominant plant species',
          impact: 'More food variety for smaller herbivores'
        }
      ],
      
      // Conservation Value
      conservationValue: [
        {
          aspect: 'Flagship Species',
          description: 'Charismatic megafauna for conservation marketing',
          value: 'Attracts funding and public attention to forest protection'
        },
        {
          aspect: 'Umbrella Effect',
          description: 'Protecting tapirs safeguards entire ecosystems',
          value: 'Large home ranges encompass habitats of many species'
        },
        {
          aspect: 'Indicator Species',
          description: 'Tapir presence indicates healthy forest ecosystems',
          value: 'Early warning system for environmental degradation'
        },
        {
          aspect: 'Cultural Significance',
          description: 'Important in Malaysian indigenous cultures',
          value: 'Bridges traditional knowledge with modern conservation'
        }
      ],
      
      // Additional text
      keystoneIntro: 'As a keystone species, tapirs have disproportionate effects on their ecosystem relative to their numbers:',
      examples: 'Examples:'
    },
    
    ms: {
      // Section Headers
      habitatRequirements: 'Keperluan Habitat',
      ecologicalRolesImpact: 'Peranan & Impak Ekologi',
      dietForagingBehavior: 'Diet & Tingkah Laku Mencari Makanan',
      keystoneSpeciesImpact: 'Impak Spesies Kunci',
      conservationValue: 'Nilai Pemuliharaan',
      
      // Habitat Preferences
      habitatPreferences: [
        {
          icon: 'forest',
          title: 'Hutan Hujan Tropika Tebal',
          location: 'Semenanjung Malaysia, Selatan Thailand, Sumatera',
          description: 'Habitat utama dengan penutupan kanopi tebal',
          details: 'Memerlukan hutan tidak terganggu dengan spesies tumbuhan yang pelbagai'
        },
        {
          icon: 'water',
          title: 'Berhampiran Sumber Air',
          location: 'Sungai, aliran, paya',
          description: 'Penting untuk minum, penyejukan, dan laluan melarikan diri',
          details: 'Akses harian kepada air adalah kritikal untuk kemandirian'
        },
        {
          icon: 'terrain',
          title: 'Kawasan Tanah Rendah',
          location: 'Bawah 1,000m ketinggian',
          description: 'Lebih gemar bentuk muka bumi lembut dengan tumbuhan yang kaya',
          details: 'Mengelakkan kawasan pergunungan curam'
        },
        {
          icon: 'nature-people',
          title: 'Gangguan Manusia Minimum',
          location: 'Kawasan perlindungan dan hutan terpencil',
          description: 'Sangat sensitif kepada aktiviti manusia',
          details: 'Meninggalkan kawasan dengan kehadiran manusia yang tetap'
        }
      ],
      
      // Ecological Roles
      ecologicalRoles: [
        {
          icon: 'eco',
          title: 'Penyebaran Biji Benih',
          impact: 'Beribu-ribu biji benih setiap hari',
          description: 'Mekanisme pertumbuhan semula hutan utama',
          benefit: 'Mengekalkan kepelbagaian hutan di kawasan yang luas'
        },
        {
          icon: 'balance',
          title: 'Kawalan Tumbuhan',
          impact: 'Pemangkasan semula jadi',
          description: 'Mencegah pertumbuhan berlebihan spesies tumbuhan tertentu',
          benefit: 'Mempromosikan komuniti tumbuhan yang pelbagai'
        },
        {
          icon: 'route',
          title: 'Penciptaan Laluan',
          impact: 'Rangkaian jejak hutan',
          description: 'Mencipta laluan yang digunakan oleh hidupan liar lain',
          benefit: 'Memudahkan pergerakan haiwan dan aliran gen'
        },
        {
          icon: 'recycling',
          title: 'Kitaran Nutrien',
          impact: 'Pengayaan tanah',
          description: 'Mengedarkan nutrien melalui najis',
          benefit: 'Meningkatkan kesuburan tanah di seluruh wilayah'
        }
      ],
      
      // Diet Details
      dietDetails: [
        {
          category: 'Buah-buahan',
          percentage: '40%',
          examples: 'Buah ara, beri, buah kelapa',
          seasonality: 'Sepanjang tahun, puncak dalam musim berbuah',
          role: 'Sumber penyebaran biji benih utama'
        },
        {
          category: 'Daun',
          percentage: '30%',
          examples: 'Pucuk muda, daun lembut',
          seasonality: 'Ketersediaan konsisten',
          role: 'Sumber nutrisi dan serat utama'
        },
        {
          category: 'Tumbuhan Akuatik',
          percentage: '20%',
          examples: 'Teratai, alga, tumbuhan paya',
          seasonality: 'Semasa mencari makanan di air',
          role: 'Mineral dan hidrasi'
        },
        {
          category: 'Kulit Kayu & Ranting',
          percentage: '10%',
          examples: 'Kulit kayu lembut, dahan muda',
          seasonality: 'Suplemen musim kering',
          role: 'Makanan kecemasan semasa kekurangan'
        }
      ],
      
      // Keystone Impacts
      keystoneImpacts: [
        {
          species: 'Burung Hutan',
          relationship: 'Manfaat tidak langsung',
          description: 'Biji benih yang disebarkan tapir mencipta pokok berbuah yang pelbagai',
          impact: 'Peningkatan sumber makanan dan tempat bersarang'
        },
        {
          species: 'Mamalia Kecil',
          relationship: 'Penggunaan jejak',
          description: 'Menggunakan laluan yang dicipta tapir untuk pergerakan',
          impact: 'Meningkatkan sambungan habitat'
        },
        {
          species: 'Serangga',
          relationship: 'Kepelbagaian habitat',
          description: 'Mendapat manfaat daripada komuniti tumbuhan yang pelbagai',
          impact: 'Biodiversiti yang lebih tinggi dan perkhidmatan pendebungaan'
        },
        {
          species: 'Herbivor Lain',
          relationship: 'Mengurangkan persaingan',
          description: 'Tapir mengawal spesies tumbuhan dominan',
          impact: 'Lebih banyak jenis makanan untuk herbivor yang lebih kecil'
        }
      ],
      
      // Conservation Value
      conservationValue: [
        {
          aspect: 'Spesies Bendera',
          description: 'Megafauna karismatik untuk pemasaran pemuliharaan',
          value: 'Menarik pembiayaan dan perhatian awam kepada perlindungan hutan'
        },
        {
          aspect: 'Kesan Payung',
          description: 'Melindungi tapir melindungi seluruh ekosistem',
          value: 'Kawasan rumah yang besar merangkumi habitat banyak spesies'
        },
        {
          aspect: 'Spesies Penunjuk',
          description: 'Kehadiran tapir menunjukkan ekosistem hutan yang sihat',
          value: 'Sistem amaran awal untuk degradasi alam sekitar'
        },
        {
          aspect: 'Kepentingan Budaya',
          description: 'Penting dalam budaya orang asli Malaysia',
          value: 'Menghubungkan pengetahuan tradisional dengan pemuliharaan moden'
        }
      ],
      
      // Additional text
      keystoneIntro: 'Sebagai spesies kunci, tapir mempunyai kesan yang tidak seimbang terhadap ekosistem mereka berbanding dengan bilangan mereka:',
      examples: 'Contoh:'
    }
  };

  const text = content[language] || content.en;

  // 🔥 SAFETY: Ensure arrays exist before mapping
  const safeHabitatPreferences = Array.isArray(text.habitatPreferences) ? text.habitatPreferences : [];
  const safeEcologicalRoles = Array.isArray(text.ecologicalRoles) ? text.ecologicalRoles : [];
  const safeDietDetails = Array.isArray(text.dietDetails) ? text.dietDetails : [];
  const safeKeystoneImpacts = Array.isArray(text.keystoneImpacts) ? text.keystoneImpacts : [];
  const safeConservationValue = Array.isArray(text.conservationValue) ? text.conservationValue : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Habitat Requirements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="home" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.habitatRequirements)}
          </ThemedText>
        </View>
        
        <View style={styles.habitatGrid}>
          {safeHabitatPreferences.map((habitat, index) => (
            <View key={index} style={[
              styles.habitatCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.habitatHeader}>
                <View style={[
                  styles.habitatIcon,
                  { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                ]}>
                  <MaterialIcons 
                    name={habitat.icon} 
                    size={20} 
                    color={isDark ? Colors.dark.tint : Colors.light.tint} 
                  />
                </View>
                <View style={styles.habitatTitleContainer}>
                  <ThemedText style={[
                    styles.habitatTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {safeRender(habitat.title)}
                  </ThemedText>
                  <ThemedText style={[
                    styles.habitatLocation,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    📍 {safeRender(habitat.location)}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.habitatDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(habitat.description)}
              </ThemedText>
              <View style={[
                styles.habitatDetails,
                { backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#F8F9FA' }
              ]}>
                <ThemedText style={[
                  styles.habitatDetailsText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  💡 {safeRender(habitat.details)}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Ecological Roles */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="hub" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.ecologicalRolesImpact)}
          </ThemedText>
        </View>
        
        <View style={styles.rolesGrid}>
          {safeEcologicalRoles.map((role, index) => (
            <View key={index} style={[
              styles.roleCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.roleHeader}>
                <MaterialIcons 
                  name={role.icon} 
                  size={24} 
                  color="#4CAF50" 
                />
                <View style={styles.roleInfo}>
                  <ThemedText style={[
                    styles.roleTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {safeRender(role.title)}
                  </ThemedText>
                  <ThemedText style={[
                    styles.roleImpact,
                    { color: '#4CAF50' }
                  ]}>
                    {safeRender(role.impact)}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.roleDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(role.description)}
              </ThemedText>
              <ThemedText style={[
                styles.roleBenefit,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                ✅ {safeRender(role.benefit)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Diet & Foraging */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="restaurant" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.dietForagingBehavior)}
          </ThemedText>
        </View>
        
        <View style={[
          styles.dietCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {safeDietDetails.map((diet, index) => (
            <View key={index} style={[
              styles.dietItem,
              index < safeDietDetails.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.dietHeader}>
                <View style={styles.dietCategory}>
                  <ThemedText style={[
                    styles.dietName,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {safeRender(diet.category)}
                  </ThemedText>
                  <View style={[
                    styles.percentageBadge,
                    { backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20' }
                  ]}>
                    <ThemedText style={[
                      styles.percentageText,
                      { color: isDark ? Colors.dark.tint : Colors.light.tint }
                    ]}>
                      {safeRender(diet.percentage)}
                    </ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={[
                styles.dietExamples,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(text.examples)} {safeRender(diet.examples)}
              </ThemedText>
              <ThemedText style={[
                styles.dietSeasonality,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                🗓️ {safeRender(diet.seasonality)}
              </ThemedText>
              <ThemedText style={[
                styles.dietRole,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                🎯 {safeRender(diet.role)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Keystone Species Impact */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="group-work" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.keystoneSpeciesImpact)}
          </ThemedText>
        </View>
        
        <ThemedText style={[
          styles.keystoneIntro,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {safeRender(text.keystoneIntro)}
        </ThemedText>
        
        <View style={styles.keystoneGrid}>
          {safeKeystoneImpacts.map((impact, index) => (
            <View key={index} style={[
              styles.keystoneCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.keystoneHeader}>
                <ThemedText style={[
                  styles.keystoneSpecies,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {safeRender(impact.species)}
                </ThemedText>
                <View style={[
                  styles.relationshipBadge,
                  { backgroundColor: '#2196F320' }
                ]}>
                  <ThemedText style={[
                    styles.relationshipText,
                    { color: '#2196F3' }
                  ]}>
                    {safeRender(impact.relationship)}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.keystoneDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(impact.description)}
              </ThemedText>
              <ThemedText style={[
                styles.keystoneImpact,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📈 {safeRender(impact.impact)}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Conservation Value */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="star" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {safeRender(text.conservationValue)}
          </ThemedText>
        </View>
        
        <View style={styles.valueList}>
          {safeConservationValue.map((value, index) => (
            <View key={index} style={[
              styles.valueItem,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.valueAspect,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🌟 {safeRender(value.aspect)}
              </ThemedText>
              <ThemedText style={[
                styles.valueDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {safeRender(value.description)}
              </ThemedText>
              <View style={[
                styles.valueBox,
                { backgroundColor: isDark ? '#4CAF5010' : '#E8F5E8' }
              ]}>
                <ThemedText style={[
                  styles.valueText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  💰 {safeRender(value.value)}
                </ThemedText>
              </View>
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Habitat Grid
  habitatGrid: {
    gap: 16,
  },
  habitatCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  habitatHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  habitatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  habitatTitleContainer: {
    flex: 1,
  },
  habitatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  habitatLocation: {
    fontSize: 12,
  },
  habitatDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  habitatDetails: {
    padding: 8,
    borderRadius: 6,
  },
  habitatDetailsText: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Roles Grid
  rolesGrid: {
    gap: 12,
  },
  roleCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleInfo: {
    marginLeft: 12,
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  roleImpact: {
    fontSize: 12,
    fontWeight: '500',
  },
  roleDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  roleBenefit: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Diet Card
  dietCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dietItem: {
    padding: 16,
  },
  dietHeader: {
    marginBottom: 8,
  },
  dietCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dietName: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dietExamples: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  dietSeasonality: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
  },
  dietRole: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Keystone Grid
  keystoneIntro: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  keystoneGrid: {
    gap: 12,
  },
  keystoneCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  keystoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  keystoneSpecies: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  relationshipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  relationshipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  keystoneDesc: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
  },
  keystoneImpact: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Value List
  valueList: {
    gap: 12,
  },
  valueItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  valueAspect: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  valueDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  valueBox: {
    padding: 8,
    borderRadius: 6,
  },
  valueText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
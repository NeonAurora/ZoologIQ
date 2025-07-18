// components/lesson/turtle/sections/TurtleBiodiversity.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleBiodiversity({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Based on your provided content
  const content = {
    en: {
      // Section Headers
      roleInBiodiversity: "Role in Biodiversity",
      populationTrends: "Population Trends (2019-2024)",
      supportingMarineHabitats: "Supporting Marine Habitats",
      foodWebConnections: "Food Web Connections",
      climateChangeVulnerability: "Climate Change Vulnerability",

      // Ecosystem Roles
      ecosystemRoles: [
        {
          icon: '🌱',
          title: 'Seagrass Maintenance',
          description: 'Grazing helps maintain healthy seagrass meadows, promoting growth and preventing overgrowth',
          impact: 'Critical for seagrass ecosystem health',
          color: '#4CAF50'
        },
        {
          icon: '🪸',
          title: 'Coral Reef Health',
          description: 'Controls algae on coral reefs, allowing corals to thrive and maintain reef ecosystems',
          impact: 'Essential for coral survival',
          color: '#FF7043'
        },
        {
          icon: '🔄',
          title: 'Nutrient Cycling',
          description: 'Movement between nesting beaches and feeding grounds distributes nutrients, enriching ecosystems',
          impact: 'Connects marine and terrestrial systems',
          color: '#2196F3'
        },
        {
          icon: '🎯',
          title: 'Indicator Species',
          description: 'Acts as a biological indicator of ocean health due to sensitivity to habitat changes',
          impact: 'Reflects ecosystem condition',
          color: '#9C27B0'
        }
      ],

      // Population Data
      populationHeader: "Nesting Females (Estimates)",
      populationData: [
        { year: '2019', malaysia: '3,900', global: '450,000', trend: 'Baseline: steady nesting activity globally' },
        { year: '2020', malaysia: '4,500', global: '460,000', trend: 'Slight increase amid pandemic restrictions' },
        { year: '2021', malaysia: '5,200', global: '475,000', trend: 'Continued recovery and nesting success' },
        { year: '2022', malaysia: '6,700', global: '490,000', trend: 'Positive trend from conservation efforts' },
        { year: '2023', malaysia: '10,100', global: '510,000', trend: 'Significant jump in Malaysia; global growth' },
        { year: '2024', malaysia: '9,200', global: '520,000', trend: 'Slight dip in Malaysia; global increase steady' }
      ],

      // Labels
      labels: {
        malaysia: 'Malaysia:',
        global: 'Global:'
      },

      // Habitat Support
      habitatSupport: [
        'Seagrass meadows serve as nurseries for fish and invertebrates',
        'Coral reefs provide habitat for 25% of all marine species',
        'Beach ecosystems benefit from turtle nesting activities',
        'Open ocean food webs depend on turtle migrations',
        'Coastal vegetation benefits from nutrient deposition'
      ],

      // Detailed Explanations
      foodWebText: "Green Sea Turtles are integral to marine food webs. Their eggs and hatchlings provide crucial food sources for predators like crabs, birds, and fish. As adults, they help maintain the balance between primary producers (seagrasses and algae) and the ecosystems that depend on them. Their presence indicates a healthy, functioning marine environment.",

      climateText: "As ectothermic animals sensitive to temperature changes, Green Sea Turtles serve as early indicators of climate change impacts. Rising sea temperatures affect their food sources, while increasing sand temperatures alter hatchling sex ratios. Their vulnerability makes them important sentinels for ocean health and climate change monitoring."
    },
    ms: {
      // Section Headers
      roleInBiodiversity: "Peranan dalam Kepelbagaian Biologi",
      populationTrends: "Trend Populasi (2019-2024)",
      supportingMarineHabitats: "Menyokong Habitat Marin",
      foodWebConnections: "Hubungan Rangkaian Makanan",
      climateChangeVulnerability: "Kerentanan Perubahan Iklim",

      // Ecosystem Roles
      ecosystemRoles: [
        {
          icon: '🌱',
          title: 'Penyelenggaraan Rumpai Laut',
          description: 'Pemakanan membantu mengekalkan padang rumpai laut yang sihat, menggalakkan pertumbuhan dan mencegah pertumbuhan berlebihan',
          impact: 'Kritikal untuk kesihatan ekosistem rumpai laut',
          color: '#4CAF50'
        },
        {
          icon: '🪸',
          title: 'Kesihatan Terumbu Karang',
          description: 'Mengawal alga di terumbu karang, membolehkan karang hidup subur dan mengekalkan ekosistem terumbu',
          impact: 'Penting untuk kelangsungan hidup karang',
          color: '#FF7043'
        },
        {
          icon: '🔄',
          title: 'Kitaran Nutrien',
          description: 'Pergerakan antara pantai penetasan dan kawasan makan mengedarkan nutrien, memperkayakan ekosistem',
          impact: 'Menghubungkan sistem marin dan daratan',
          color: '#2196F3'
        },
        {
          icon: '🎯',
          title: 'Spesies Penunjuk',
          description: 'Bertindak sebagai penunjuk biologi terhadap kesihatan laut kerana kepekaannya terhadap perubahan habitat',
          impact: 'Mencerminkan keadaan ekosistem',
          color: '#9C27B0'
        }
      ],

      // Population Data
      populationHeader: "Penyu Betina Bertelur (Anggaran)",
      populationData: [
        { year: '2019', malaysia: '3,900', global: '450,000', trend: 'Asas: aktiviti penetasan stabil di peringkat global' },
        { year: '2020', malaysia: '4,500', global: '460,000', trend: 'Peningkatan kecil semasa sekatan pandemik' },
        { year: '2021', malaysia: '5,200', global: '475,000', trend: 'Pemulihan berterusan dan kejayaan penetasan' },
        { year: '2022', malaysia: '6,700', global: '490,000', trend: 'Trend positif hasil usaha pemuliharaan' },
        { year: '2023', malaysia: '10,100', global: '510,000', trend: 'Lonjakan ketara di Malaysia; pertumbuhan global' },
        { year: '2024', malaysia: '9,200', global: '520,000', trend: 'Penurunan sedikit di Malaysia; peningkatan global berterusan' }
      ],

      // Labels
      labels: {
        malaysia: 'Malaysia:',
        global: 'Global:'
      },

      // Habitat Support
      habitatSupport: [
        'Padang rumpai laut berfungsi sebagai nurseri untuk ikan dan invertebrat',
        'Terumbu karang menyediakan habitat untuk 25% daripada semua spesies marin',
        'Ekosistem pantai mendapat manfaat daripada aktiviti penetasan penyu',
        'Rangkaian makanan lautan terbuka bergantung kepada migrasi penyu',
        'Tumbuhan pantai mendapat manfaat daripada pemendapan nutrien'
      ],

      // Detailed Explanations
      foodWebText: "Penyu Agar adalah bahagian penting dalam rangkaian makanan marin. Telur dan anak penyu mereka menyediakan sumber makanan yang penting kepada pemangsa seperti ketam, burung, dan ikan. Sebagai dewasa, mereka membantu mengekalkan keseimbangan antara pengeluar utama (rumpai laut dan alga) dan ekosistem yang bergantung kepada mereka. Kehadiran mereka menunjukkan persekitaran marin yang sihat dan berfungsi.",

      climateText: "Sebagai haiwan ektotermik yang sensitif kepada perubahan suhu, Penyu Agar berfungsi sebagai penunjuk awal kesan perubahan iklim. Peningkatan suhu laut mempengaruhi sumber makanan mereka, manakala peningkatan suhu pasir mengubah nisbah jantina anak penyu. Kerentanan mereka menjadikan mereka pengawal penting untuk kesihatan laut dan pemantauan perubahan iklim."
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Ecosystem Roles */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="eco" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.roleInBiodiversity}
          </ThemedText>
        </View>

        <View style={styles.rolesGrid}>
          {text.ecosystemRoles.map((role, index) => (
            <View key={index} style={[
              styles.roleCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[styles.roleIcon, { backgroundColor: `${role.color}20` }]}>
                <ThemedText style={styles.roleEmoji}>{role.icon}</ThemedText>
              </View>
              <View style={styles.roleContent}>
                <ThemedText style={[
                  styles.roleTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {role.title}
                </ThemedText>
                <ThemedText style={[
                  styles.roleDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {role.description}
                </ThemedText>
                <View style={[styles.impactBadge, { backgroundColor: `${role.color}15` }]}>
                  <ThemedText style={[styles.impactText, { color: role.color }]}>
                    {role.impact}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Population Trends */}
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
            {text.populationTrends}
          </ThemedText>
        </View>

        <View style={[
          styles.populationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={[
            styles.populationHeader,
            { borderBottomColor: isDark ? Colors.dark.border : Colors.light.border }
          ]}>
            <ThemedText style={[
              styles.populationTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.populationHeader}
            </ThemedText>
          </View>
          
          {text.populationData.map((data, index) => (
            <View key={index} style={[
              styles.populationRow,
              index < text.populationData.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.yearColumn}>
                <ThemedText style={[
                  styles.yearText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {data.year}
                </ThemedText>
              </View>
              <View style={styles.dataColumn}>
                <ThemedText style={[
                  styles.dataLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {text.labels.malaysia}
                </ThemedText>
                <ThemedText style={[
                  styles.dataValue,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {data.malaysia}
                </ThemedText>
              </View>
              <View style={styles.dataColumn}>
                <ThemedText style={[
                  styles.dataLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {text.labels.global}
                </ThemedText>
                <ThemedText style={[
                  styles.dataValue,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {data.global}
                </ThemedText>
              </View>
              <View style={styles.trendColumn}>
                <ThemedText style={[
                  styles.trendText,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {data.trend}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Habitat Support */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="nature" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.supportingMarineHabitats}
          </ThemedText>
        </View>

        <View style={[
          styles.habitatCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.habitatList}>
            {text.habitatSupport.map((support, index) => (
              <View key={index} style={styles.habitatItem}>
                <View style={[
                  styles.habitatBullet,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]} />
                <ThemedText style={[
                  styles.habitatText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {support}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Food Web Dynamics */}
      <View style={styles.section}>
        <View style={[
          styles.foodWebCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#4CAF50'
          }
        ]}>
          <View style={styles.foodWebHeader}>
            <MaterialIcons name="account-tree" size={20} color="#4CAF50" />
            <ThemedText style={[
              styles.foodWebTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.foodWebConnections}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.foodWebText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.foodWebText}
          </ThemedText>
        </View>
      </View>

      {/* Climate Impact */}
      <View style={styles.section}>
        <View style={[
          styles.climateCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF5722'
          }
        ]}>
          <View style={styles.climateHeader}>
            <MaterialIcons name="thermostat" size={20} color="#FF5722" />
            <ThemedText style={[
              styles.climateTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.climateChangeVulnerability}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.climateText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.climateText}
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

  // Roles Grid
  rolesGrid: {
    gap: 16,
  },
  roleCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleEmoji: {
    fontSize: 20,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  roleDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Population Trends
  populationCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  populationHeader: {
    padding: 16,
    borderBottomWidth: 1,
  },
  populationTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  populationRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  yearColumn: {
    width: 50,
  },
  yearText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dataColumn: {
    flex: 1,
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 12,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  trendColumn: {
    flex: 2,
    paddingLeft: 8,
  },
  trendText: {
    fontSize: 12,
    textAlign: 'right',
  },

  // Habitat Support
  habitatCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  habitatList: {
    gap: 12,
  },
  habitatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  habitatBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  habitatText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },

  // Special Cards
  foodWebCard: {
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
  foodWebHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  foodWebTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  foodWebText: {
    fontSize: 15,
    lineHeight: 22,
  },

  climateCard: {
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
  climateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  climateTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  climateText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
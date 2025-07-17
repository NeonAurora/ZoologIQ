// components/lesson/tapir/sections/TapirPopulation.jsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirPopulation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 BILINGUAL CONTENT - Based on your provided population data
  const content = {
    en: {
      // Section Headers
      globalStatusTitle: "Global Population Status",
      populationTrendsTitle: "Population Trends (2019-2024)",
      recoveryChallengesTitle: "Recovery Challenges",
      recoveryRequirementsTitle: "Recovery Requirements",
      populationProjectionsTitle: "Population Projections",
      populationMonitoringTitle: "Population Monitoring",

      // Global Status
      globalStatus: {
        total: '< 2,500',
        trend: 'Declining',
        iucnStatus: 'Endangered',
        lastUpdate: '2024'
      },

      // Status Labels
      statusLabels: {
        totalPopulation: "Total Population",
        trend: "Trend",
        iucnStatus: "IUCN Status",
        lastUpdate: "Last Update"
      },

      // Country Data
      countryData: [
        {
          country: 'Malaysia',
          flag: '🇲🇾',
          population2019: '~1,300–1,500',
          population2024: '~1,100–1,300',
          trend: 'decreasing',
          trendIcon: 'trending-down',
          status: 'Stronghold',
          threats: ['Deforestation', 'Roadkill', 'Development projects'],
          notes: 'Decline due to deforestation, roadkill, and development projects',
          color: '#FF5722'
        },
        {
          country: 'Thailand',
          flag: '🇹🇭',
          population2019: '~500–700',
          population2024: '~400–500',
          trend: 'decreasing',
          trendIcon: 'trending-down',
          status: 'Fragmented',
          threats: ['Habitat fragmentation', 'Small populations'],
          notes: 'Fragmented populations in protected areas like Kaeng Krachan',
          color: '#FF7043'
        },
        {
          country: 'Sumatra (Indonesia)',
          flag: '🇮🇩',
          population2019: '~500–700',
          population2024: '~400–500',
          trend: 'decreasing',
          trendIcon: 'trending-down',
          status: 'Critical',
          threats: ['Palm oil plantations', 'Illegal logging'],
          notes: 'Habitat loss from palm oil plantations; some protected areas show stable subpopulations',
          color: '#FF8A65'
        },
        {
          country: 'Myanmar',
          flag: '🇲🇲',
          population2019: '<50',
          population2024: 'Possibly extinct or <30',
          trend: 'extinct',
          trendIcon: 'close',
          status: 'Extinct',
          threats: ['Complete habitat loss', 'No protection'],
          notes: 'No recent confirmed sightings; population likely functionally extinct',
          color: '#BDBDBD'
        }
      ],

      // Population Challenges
      populationChallenges: [
        {
          icon: 'trending-down',
          title: 'Slow Reproduction Rate',
          description: 'Females breed only every 2-3 years',
          impact: 'Population recovery is extremely slow',
          timeframe: '13-14 month gestation'
        },
        {
          icon: 'scatter-plot',
          title: 'Habitat Fragmentation',
          description: 'Isolated populations cannot interbreed',
          impact: 'Genetic diversity loss and inbreeding',
          timeframe: 'Ongoing since 1990s'
        },
        {
          icon: 'person',
          title: 'Small Population Size',
          description: 'Below minimum viable population thresholds',
          impact: 'Increased extinction risk',
          timeframe: 'Critical threshold reached'
        },
        {
          icon: 'schedule',
          title: 'Late Sexual Maturity',
          description: 'First breeding at 3-5 years old',
          impact: 'Delayed contribution to population growth',
          timeframe: 'Generational delays'
        }
      ],

      // Recovery Requirements
      recoveryRequirements: [
        {
          requirement: 'Habitat Protection',
          target: '10,000+ km² connected forest',
          currentStatus: '~3,000 km² fragmented',
          priority: 'Critical',
          timeframe: '10 years'
        },
        {
          requirement: 'Population Corridors',
          target: '5+ wildlife bridges/underpasses',
          currentStatus: '2 operational crossings',
          priority: 'High',
          timeframe: '5 years'
        },
        {
          requirement: 'Captive Breeding',
          target: '100+ breeding individuals',
          currentStatus: '~50 in global programs',
          priority: 'Moderate',
          timeframe: '15 years'
        },
        {
          requirement: 'Community Support',
          target: '80% local awareness',
          currentStatus: '~30% current awareness',
          priority: 'High',
          timeframe: '5 years'
        }
      ],

      // Monitoring Methods
      monitoringMethods: [
        {
          method: 'Camera Trapping',
          locations: 'Taman Negara, Belum-Temengor',
          data: 'Population density, activity patterns',
          frequency: 'Continuous monitoring',
          reliability: 'High'
        },
        {
          method: 'GPS Collar Tracking',
          locations: 'Research sites in Malaysia',
          data: 'Movement patterns, territory size',
          frequency: 'Real-time tracking',
          reliability: 'Very High'
        },
        {
          method: 'Footprint Surveys',
          locations: 'Remote forest areas',
          data: 'Presence/absence, individual identification',
          frequency: 'Monthly surveys',
          reliability: 'Moderate'
        },
        {
          method: 'Community Reporting',
          locations: 'Villages near forests',
          data: 'Sightings, roadkill incidents',
          frequency: 'Opportunistic',
          reliability: 'Variable'
        }
      ],

      // Projection Scenarios
      projectionScenarios: [
        {
          scenario: 'Current Trends',
          projection: 'Continued 3-5% annual decline',
          population2030: '1,500-1,800',
          population2040: '800-1,200',
          outcome: 'Functionally extinct in 2 countries',
          color: '#F44336'
        },
        {
          scenario: 'Conservation Success',
          projection: 'Stabilization + 1% annual growth',
          population2030: '2,200-2,500',
          population2040: '2,400-2,800',
          outcome: 'Population recovery begins',
          color: '#FF9800'
        },
        {
          scenario: 'Optimal Protection',
          projection: 'Habitat restoration + breeding programs',
          population2030: '2,800-3,200',
          population2040: '3,500-4,000',
          outcome: 'Species secured long-term',
          color: '#4CAF50'
        }
      ],

      // Other Labels
      primaryThreats: "Primary Threats:",
      target: "Target:",
      current: "Current:"
    },

    ms: {
      // Section Headers
      globalStatusTitle: "Status Populasi Global",
      populationTrendsTitle: "Trend Populasi (2019-2024)",
      recoveryChallengesTitle: "Cabaran Pemulihan",
      recoveryRequirementsTitle: "Keperluan Pemulihan",
      populationProjectionsTitle: "Unjuran Populasi",
      populationMonitoringTitle: "Pemantauan Populasi",

      // Global Status
      globalStatus: {
        total: '< 2,500',
        trend: 'Menurun',
        iucnStatus: 'Terancam',
        lastUpdate: '2024'
      },

      // Status Labels
      statusLabels: {
        totalPopulation: "Jumlah Populasi",
        trend: "Trend",
        iucnStatus: "Status IUCN",
        lastUpdate: "Kemaskini Terakhir"
      },

      // Country Data (from your provided content)
      countryData: [
        {
          country: 'Malaysia',
          flag: '🇲🇾',
          population2019: '~1,300–1,500',
          population2024: '~1,100–1,300',
          trend: 'decreasing',
          trendIcon: 'trending-down',
          status: 'Kubu Kuat',
          threats: ['Penebangan hutan', 'Kemalangan jalan raya', 'Projek pembangunan'],
          notes: 'Penurunan akibat penebangan hutan, kemalangan jalan raya, dan projek pembangunan',
          color: '#FF5722'
        },
        {
          country: 'Thailand',
          flag: '🇹🇭',
          population2019: '~500–700',
          population2024: '~400–500',
          trend: 'decreasing',
          trendIcon: 'trending-down',
          status: 'Terpisah',
          threats: ['Fragmentasi habitat', 'Populasi kecil'],
          notes: 'Populasi terpisah di kawasan perlindungan seperti Kaeng Krachan',
          color: '#FF7043'
        },
        {
          country: 'Sumatera (Indonesia)',
          flag: '🇮🇩',
          population2019: '~500–700',
          population2024: '~400–500',
          trend: 'decreasing',
          trendIcon: 'trending-down',
          status: 'Kritikal',
          threats: ['Ladang kelapa sawit', 'Pembalakan haram'],
          notes: 'Kehilangan habitat akibat ladang kelapa sawit; beberapa kawasan perlindungan stabil',
          color: '#FF8A65'
        },
        {
          country: 'Myanmar',
          flag: '🇲🇲',
          population2019: '<50',
          population2024: 'Mungkin pupus atau <30',
          trend: 'extinct',
          trendIcon: 'close',
          status: 'Pupus',
          threats: ['Kehilangan habitat lengkap', 'Tiada perlindungan'],
          notes: 'Tiada pengesahan penemuan terkini; populasi berkemungkinan pupus secara fungsional',
          color: '#BDBDBD'
        }
      ],

      // Population Challenges
      populationChallenges: [
        {
          icon: 'trending-down',
          title: 'Kadar Reproduksi Perlahan',
          description: 'Betina hanya membiak setiap 2-3 tahun',
          impact: 'Pemulihan populasi amat perlahan',
          timeframe: 'Kehamilan 13-14 bulan'
        },
        {
          icon: 'scatter-plot',
          title: 'Fragmentasi Habitat',
          description: 'Populasi terpencil tidak dapat mengawan silang',
          impact: 'Kehilangan kepelbagaian genetik dan pembiakan dalam keluarga',
          timeframe: 'Berterusan sejak 1990an'
        },
        {
          icon: 'person',
          title: 'Saiz Populasi Kecil',
          description: 'Di bawah paras minimum populasi berdaya maju',
          impact: 'Risiko kepupusan meningkat',
          timeframe: 'Paras kritikal dicapai'
        },
        {
          icon: 'schedule',
          title: 'Kematangan Seksual Lewat',
          description: 'Pembiakan pertama pada usia 3-5 tahun',
          impact: 'Sumbangan tertangguh kepada pertumbuhan populasi',
          timeframe: 'Kelewatan generasi'
        }
      ],

      // Recovery Requirements
      recoveryRequirements: [
        {
          requirement: 'Perlindungan Habitat',
          target: '10,000+ km² hutan bersambung',
          currentStatus: '~3,000 km² terfragmentasi',
          priority: 'Kritikal',
          timeframe: '10 tahun'
        },
        {
          requirement: 'Koridor Populasi',
          target: '5+ jejambat/laluan bawah hidupan liar',
          currentStatus: '2 lintasan beroperasi',
          priority: 'Tinggi',
          timeframe: '5 tahun'
        },
        {
          requirement: 'Pembiakan Kurungan',
          target: '100+ individu pembiakan',
          currentStatus: '~50 dalam program global',
          priority: 'Sederhana',
          timeframe: '15 tahun'
        },
        {
          requirement: 'Sokongan Komuniti',
          target: '80% kesedaran tempatan',
          currentStatus: '~30% kesedaran semasa',
          priority: 'Tinggi',
          timeframe: '5 tahun'
        }
      ],

      // Monitoring Methods
      monitoringMethods: [
        {
          method: 'Perangkap Kamera',
          locations: 'Taman Negara, Belum-Temengor',
          data: 'Ketumpatan populasi, corak aktiviti',
          frequency: 'Pemantauan berterusan',
          reliability: 'Tinggi'
        },
        {
          method: 'Penjejakan GPS Collar',
          locations: 'Tapak penyelidikan di Malaysia',
          data: 'Corak pergerakan, saiz wilayah',
          frequency: 'Penjejakan masa nyata',
          reliability: 'Sangat Tinggi'
        },
        {
          method: 'Tinjauan Tapak Kaki',
          locations: 'Kawasan hutan terpencil',
          data: 'Kehadiran/ketiadaan, pengenalan individu',
          frequency: 'Tinjauan bulanan',
          reliability: 'Sederhana'
        },
        {
          method: 'Laporan Komuniti',
          locations: 'Kampung berhampiran hutan',
          data: 'Pemerhatian, insiden kemalangan jalan raya',
          frequency: 'Secara kebetulan',
          reliability: 'Berubah-ubah'
        }
      ],

      // Projection Scenarios
      projectionScenarios: [
        {
          scenario: 'Trend Semasa',
          projection: 'Penurunan tahunan 3-5% berterusan',
          population2030: '1,500-1,800',
          population2040: '800-1,200',
          outcome: 'Pupus secara fungsional di 2 negara',
          color: '#F44336'
        },
        {
          scenario: 'Kejayaan Pemuliharaan',
          projection: 'Penstabilan + 1% pertumbuhan tahunan',
          population2030: '2,200-2,500',
          population2040: '2,400-2,800',
          outcome: 'Pemulihan populasi bermula',
          color: '#FF9800'
        },
        {
          scenario: 'Perlindungan Optimum',
          projection: 'Pemulihan habitat + program pembiakan',
          population2030: '2,800-3,200',
          population2040: '3,500-4,000',
          outcome: 'Spesies terjamin jangka panjang',
          color: '#4CAF50'
        }
      ],

      // Other Labels
      primaryThreats: "Ancaman Utama:",
      target: "Sasaran:",
      current: "Semasa:"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Global Population Status */}
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
            {text.globalStatusTitle}
          </ThemedText>
        </View>
        
        <View style={[
          styles.statusCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <ThemedText style={[
                styles.statusLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.statusLabels.totalPopulation}
              </ThemedText>
              <ThemedText style={[
                styles.statusValue,
                { color: '#F44336' }
              ]}>
                {text.globalStatus.total}
              </ThemedText>
            </View>
            <View style={styles.statusItem}>
              <ThemedText style={[
                styles.statusLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.statusLabels.trend}
              </ThemedText>
              <View style={styles.trendContainer}>
                <MaterialIcons name="trending-down" size={16} color="#F44336" />
                <ThemedText style={[
                  styles.statusValue,
                  { color: '#F44336' }
                ]}>
                  {text.globalStatus.trend}
                </ThemedText>
              </View>
            </View>
            <View style={styles.statusItem}>
              <ThemedText style={[
                styles.statusLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.statusLabels.iucnStatus}
              </ThemedText>
              <ThemedText style={[
                styles.statusValue,
                { color: '#FF9800' }
              ]}>
                {text.globalStatus.iucnStatus}
              </ThemedText>
            </View>
            <View style={styles.statusItem}>
              <ThemedText style={[
                styles.statusLabel,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.statusLabels.lastUpdate}
              </ThemedText>
              <ThemedText style={[
                styles.statusValue,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {text.globalStatus.lastUpdate}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Population by Country */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="flag" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.populationTrendsTitle}
          </ThemedText>
        </View>
        
        <View style={styles.countryGrid}>
          {text.countryData.map((country, index) => (
            <View key={index} style={[
              styles.countryCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                borderLeftColor: country.color
              }
            ]}>
              <View style={styles.countryHeader}>
                <View style={styles.countryNameContainer}>
                  <ThemedText style={styles.countryFlag}>{country.flag}</ThemedText>
                  <ThemedText style={[
                    styles.countryName,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {country.country}
                  </ThemedText>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: country.color + '20' }
                ]}>
                  <ThemedText style={[
                    styles.statusBadgeText,
                    { color: country.color }
                  ]}>
                    {country.status}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.populationData}>
                <View style={styles.populationItem}>
                  <ThemedText style={[
                    styles.populationLabel,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                    2019
                  </ThemedText>
                  <ThemedText style={[
                    styles.populationValue,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {country.population2019}
                  </ThemedText>
                </View>
                <MaterialIcons 
                  name={country.trendIcon} 
                  size={20} 
                  color={country.trend === 'extinct' ? '#BDBDBD' : '#F44336'} 
                />
                <View style={styles.populationItem}>
                  <ThemedText style={[
                    styles.populationLabel,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}>
                    2024
                  </ThemedText>
                  <ThemedText style={[
                    styles.populationValue,
                    { color: country.trend === 'extinct' ? '#BDBDBD' : (isDark ? Colors.dark.text : Colors.light.text) }
                  ]}>
                    {country.population2024}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.threatsContainer}>
                <ThemedText style={[
                  styles.threatsLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {text.primaryThreats}
                </ThemedText>
                <ThemedText style={[
                  styles.threatsText,
                  { color: isDark ? Colors.dark.textMuted : '#666' }
                ]}>
                  {country.threats.join(', ')}
                </ThemedText>
              </View>
              
              <ThemedText style={[
                styles.countryNotes,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                💡 {country.notes}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Population Recovery Challenges */}
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
            {text.recoveryChallengesTitle}
          </ThemedText>
        </View>
        
        <View style={styles.challengesGrid}>
          {text.populationChallenges.map((challenge, index) => (
            <View key={index} style={[
              styles.challengeCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.challengeHeader}>
                <View style={[
                  styles.challengeIcon,
                  { backgroundColor: '#FF572220' }
                ]}>
                  <MaterialIcons 
                    name={challenge.icon} 
                    size={20} 
                    color="#FF5722" 
                  />
                </View>
                <View style={styles.challengeInfo}>
                  <ThemedText style={[
                    styles.challengeTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {challenge.title}
                  </ThemedText>
                  <ThemedText style={[
                    styles.challengeTimeframe,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    ⏱️ {challenge.timeframe}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.challengeDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {challenge.description}
              </ThemedText>
              <ThemedText style={[
                styles.challengeImpact,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📉 {challenge.impact}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Recovery Requirements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="assignment" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.recoveryRequirementsTitle}
          </ThemedText>
        </View>
        
        <View style={[
          styles.requirementsCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          {text.recoveryRequirements.map((req, index) => (
            <View key={index} style={[
              styles.requirementItem,
              index < text.recoveryRequirements.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.requirementHeader}>
                <ThemedText style={[
                  styles.requirementTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {req.requirement}
                </ThemedText>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: req.priority === 'Critical' || req.priority === 'Kritikal' ? '#F4433620' : req.priority === 'High' || req.priority === 'Tinggi' ? '#FF980020' : '#2196F320' }
                ]}>
                  <ThemedText style={[
                    styles.priorityText,
                    { color: req.priority === 'Critical' || req.priority === 'Kritikal' ? '#F44336' : req.priority === 'High' || req.priority === 'Tinggi' ? '#FF9800' : '#2196F3' }
                  ]}>
                    {req.priority}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.requirementProgress}>
                <ThemedText style={[
                  styles.progressLabel,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {text.target} {req.target}
                </ThemedText>
                <ThemedText style={[
                  styles.progressCurrent,
                  { color: isDark ? Colors.dark.textMuted : '#666' }
                ]}>
                  {text.current} {req.currentStatus}
                </ThemedText>
                <ThemedText style={[
                  styles.progressTimeframe,
                  { color: isDark ? Colors.dark.textMuted : '#666' }
                ]}>
                  ⏰ {req.timeframe}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Future Projections */}
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
            {text.populationProjectionsTitle}
          </ThemedText>
        </View>
        
        <View style={styles.projectionsGrid}>
          {text.projectionScenarios.map((scenario, index) => (
            <View key={index} style={[
              styles.projectionCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                borderLeftColor: scenario.color
              }
            ]}>
              <ThemedText style={[
                styles.scenarioTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                📈 {scenario.scenario}
              </ThemedText>
              <ThemedText style={[
                styles.projectionDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {scenario.projection}
              </ThemedText>
              <View style={styles.projectionNumbers}>
                <View style={styles.projectionYear}>
                  <ThemedText style={[
                    styles.yearLabel,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    2030
                  </ThemedText>
                  <ThemedText style={[
                    styles.yearValue,
                    { color: scenario.color }
                  ]}>
                    {scenario.population2030}
                  </ThemedText>
                </View>
                <View style={styles.projectionYear}>
                  <ThemedText style={[
                    styles.yearLabel,
                    { color: isDark ? Colors.dark.textMuted : '#666' }
                  ]}>
                    2040
                  </ThemedText>
                  <ThemedText style={[
                    styles.yearValue,
                    { color: scenario.color }
                  ]}>
                    {scenario.population2040}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.outcomeText,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                🎯 {scenario.outcome}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Monitoring Methods */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="visibility" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.populationMonitoringTitle}
          </ThemedText>
        </View>
        
        <View style={styles.monitoringGrid}>
          {text.monitoringMethods.map((method, index) => (
            <View key={index} style={[
              styles.monitoringCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <ThemedText style={[
                styles.methodTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                🔍 {method.method}
              </ThemedText>
              <ThemedText style={[
                styles.methodLocations,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                📍 {method.locations}
              </ThemedText>
              <ThemedText style={[
                styles.methodData,
                { color: isDark ? Colors.dark.textMuted : '#666' }
              ]}>
                📊 {method.data}
              </ThemedText>
              <View style={styles.methodDetails}>
                <ThemedText style={[
                  styles.methodFrequency,
                  { color: isDark ? Colors.dark.textMuted : '#666' }
                ]}>
                  ⏰ {method.frequency}
                </ThemedText>
                <View style={[
                  styles.reliabilityBadge,
                  { backgroundColor: (method.reliability === 'Very High' || method.reliability === 'Sangat Tinggi') ? '#4CAF5020' : (method.reliability === 'High' || method.reliability === 'Tinggi') ? '#4CAF5020' : (method.reliability === 'Moderate' || method.reliability === 'Sederhana') ? '#FF980020' : '#FF572220' }
                ]}>
                  <ThemedText style={[
                    styles.reliabilityText,
                    { color: (method.reliability === 'Very High' || method.reliability === 'Sangat Tinggi') ? '#4CAF50' : (method.reliability === 'High' || method.reliability === 'Tinggi') ? '#4CAF50' : (method.reliability === 'Moderate' || method.reliability === 'Sederhana') ? '#FF9800' : '#FF5722' }
                  ]}>
                    {method.reliability}
                  </ThemedText>
                </View>
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

  // Status Card
  statusCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statusItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Country Grid
  countryGrid: {
    gap: 16,
  },
  countryCard: {
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
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
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
    fontSize: 14,
    fontWeight: '600',
  },
  threatsContainer: {
    marginBottom: 8,
  },
  threatsLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  threatsText: {
    fontSize: 13,
  },
  countryNotes: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Challenges Grid
  challengesGrid: {
    gap: 12,
  },
  challengeCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  challengeTimeframe: {
    fontSize: 12,
  },
  challengeDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  challengeImpact: {
    fontSize: 13,
    lineHeight: 18,
  },

  // Requirements Card
  requirementsCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  requirementItem: {
    padding: 16,
  },
  requirementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  requirementProgress: {
    gap: 2,
  },
  progressLabel: {
    fontSize: 13,
  },
  progressCurrent: {
    fontSize: 13,
  },
  progressTimeframe: {
    fontSize: 12,
  },

  // Projections Grid
  projectionsGrid: {
    gap: 12,
  },
  projectionCard: {
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
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  projectionDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  projectionNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  projectionYear: {
    alignItems: 'center',
  },
  yearLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  yearValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  outcomeText: {
    fontSize: 13,
    fontStyle: 'italic',
  },

  // Monitoring Grid
  monitoringGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  monitoringCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  methodLocations: {
    fontSize: 12,
    marginBottom: 4,
  },
  methodData: {
    fontSize: 12,
    marginBottom: 8,
  },
  methodDetails: {
    marginTop: 'auto',
  },
  methodFrequency: {
    fontSize: 11,
    marginBottom: 4,
  },
  reliabilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reliabilityText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
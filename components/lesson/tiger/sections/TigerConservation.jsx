// components/lesson/tiger/sections/TigerConservation.jsx
import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function TigerConservation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // 🔒 HARDCODED PDF URL - Replace with your actual PDF URL
  const PDF_DOWNLOAD_URL = "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751085268768.pdf";

  // 🔥 BILINGUAL CONTENT - Structured from Tiger conservation content
  const content = {
    en: {
      // Section Headers
      threatsToSurvival: 'Threats to Survival',
      howYouCanHelp: 'How You Can Help',
      coexistenceSolutions: 'Coexistence Solutions',
      conservationSuccesses: 'Conservation Success Stories',
      downloadPdf: 'Download PDF',
      
      // Alert Messages
      downloadComplete: 'Download Complete',
      downloadFailed: 'Download Failed',
      unableToDownload: 'Unable to download the file. Please try again.',
      error: 'Error',
      errorOccurred: 'An error occurred while downloading the file.',
      cancel: 'Cancel',
      open: 'Open',
      unableToOpen: 'Unable to open the file. You can find it in your Downloads folder.',

      // Threats
      threats: [
        {
          icon: 'forest',
          title: 'Deforestation & Habitat Loss',
          description: 'Palm oil plantations, logging, and urban expansion destroy tiger habitats'
        },
        {
          icon: 'alt-route',
          title: 'Habitat Fragmentation',
          description: 'Roads and highways fragment forests, increasing roadkill risks'
        },
        {
          icon: 'gps-not-fixed',
          title: 'Poaching & Illegal Trade',
          description: 'Hunted for skins, bones (traditional medicine), and trophies'
        },
        {
          icon: 'gavel',
          title: 'Weak Law Enforcement',
          description: 'Limited anti-poaching patrols and corruption hinder conservation'
        },
        {
          icon: 'home',
          title: 'Human-Wildlife Conflict',
          description: 'Tigers attack livestock when prey is scarce, leading to retaliatory killings'
        },
        {
          icon: 'grass',
          title: 'Prey Depletion',
          description: 'Overhunting of deer and wild boar reduces tigers\' food supply'
        },
        {
          icon: 'thermostat',
          title: 'Climate Change',
          description: 'Rising temperatures may reduce suitable habitats'
        },
      ],

      // Add the following lines in this page:
      // Report tiger sightings to authorities (e.g., Perak Wildlife Department) to prevent accidental conflicts
      // Demand corporate accountability by pressuring companies to adopt wildlife-friendly policies 

      // Action Categories
      actionCategories: [
        {
          icon: 'campaign',
          title: 'Support & Donate',
          color: '#4CAF50',
          actions: [
            'Donate to WWF-Malaysia, MYCAT, or Rimba for anti-poaching patrols',
            'Adopt a Tiger symbolically through conservation NGOs',
            'Fund camera trap monitoring and habitat restoration'
          ]
        },
        {
          icon: 'science',
          title: 'Research & Volunteer',
          color: '#2196F3',
          actions: [
            'Volunteer for wildlife surveys and camera trap monitoring',
            'Join awareness campaigns and educational programs',
            'Report tiger sightings to authorities (e.g., Perak Wildlife Department)'
          ]
        },
        {
          icon: 'report',
          title: 'Advocacy & Reporting',
          color: '#FF9800',
          actions: [
            'Report poaching via MYCAT hotline: 1-800-88-5151',
            'Advocate for wildlife corridors to connect fragmented forests',
            'Support stricter laws by signing conservation petitions'
          ]
        },
        {
          icon: 'eco',
          title: 'Sustainable Living',
          color: '#8BC34A',
          actions: [
            'Choose RSPO-certified palm oil and FSC-certified wood products',
            'Avoid tiger-derived products (traditional medicines, souvenirs)',
            'Reduce plastic use—pollution harms tiger prey and ecosystems'
          ]
        },
        {
          icon: 'share',
          title: 'Spread Awareness',
          color: '#E91E63',
          actions: [
            'Visit tiger-friendly reserves (Taman Negara, Royal Belum) responsibly',
            'Share facts on social media using #SaveMalayanTigers',
            'Educate children through school programs and zoo visits'
          ]
        }
      ],

      // Add following strategies in case they don't exist:
      // Predator-proof enclosures for livestock
      // Ecotourism initiatives create jobs as an alternative to forest exploitation
      // Non-timber forest products (e.g., wild honey) reduce logging dependence
      // Community patrol units (e.g., PATROL Perak) monitor tigers and deter poachers (MYCAT, 2023)
      // Strict enforcement of anti-poaching laws
      // Land-use planning that prioritises tiger habitats 

      // Coexistence Strategies
      coexistenceStrategies: [
        {
          icon: 'pets',
          title: 'Guardian Animals',
          description: 'Livestock guardian dogs reduce tiger attacks on farms'
        },
        {
          icon: 'account-balance',
          title: 'Compensation Schemes',
          description: 'Financial support for farmers who lose livestock to tigers'
        },
        {
          icon: 'nature',
          title: 'Wildlife Corridors',
          description: 'Protected pathways link fragmented forests for safe tiger movement'
        },
        {
          icon: 'directions',
          title: 'Safe Crossings',
          description: 'Wildlife overpasses and underpasses on highways prevent roadkill'
        },
        {
          icon: 'notification-important',
          title: 'Alert Systems',
          description: 'SMS alerts notify villagers of nearby tiger sightings'
        },
        {
          icon: 'travel-explore',
          title: 'Ecotourism',
          description: 'Sustainable tourism creates jobs as alternative to forest exploitation'
        },
        {
          icon: 'security',
          title: 'Predator-Proof Enclosures',
          description: 'Protected livestock enclosures prevent tiger-human conflicts'
        },
        {
          icon: 'forest',
          title: 'Non-Timber Products',
          description: 'Wild honey and forest products reduce logging dependence'
        },
        {
          icon: 'groups',
          title: 'Community Patrols',
          description: 'Local patrol units (e.g., PATROL Perak) monitor tigers and deter poachers'
        },
        {
          icon: 'policy',
          title: 'Land-Use Planning',
          description: 'Strategic planning prioritizes tiger habitat conservation'
        }
      ],

      // Success Stories
      successStories: [
        {
          icon: 'park',
          title: 'Kenyir Wildlife Corridor',
          achievement: 'Reforestation efforts reconnected fragmented habitats between Taman Negara and Kenyir Lake, enabling safer tiger movement',
          impact: 'Habitat connectivity',
          color: '#4CAF50'
        },
        {
          icon: 'security',
          title: 'Royal Belum State Park',
          achievement: 'Enhanced patrolling has reduced poaching by 40% since 2019',
          impact: 'Anti-poaching success',
          color: '#2196F3'
        },
        {
          icon: 'groups',
          title: 'Community Patrol Units',
          achievement: 'Indigenous-led anti-poaching teams in Perak removed 1,200 snares in 2022',
          impact: 'Community involvement',
          color: '#FF9800'
        },
        {
          icon: 'attach-money',
          title: 'Ecotourism Impact',
          achievement: 'Tiger-friendly tourism in Taman Negara generated RM5 million for local communities in 2023',
          impact: 'Economic incentives',
          color: '#8BC34A'
        }
      ]
    },
    
    ms: {
      // Section Headers
      threatsToSurvival: 'Ancaman Terhadap Kelangsungan Hidup',
      howYouCanHelp: 'Bagaimana Anda Boleh Membantu',
      coexistenceSolutions: 'Penyelesaian Hidup Bersama',
      conservationSuccesses: 'Kisah Kejayaan Pemuliharaan',
      downloadPdf: 'Muat Turun PDF',
      
      // Alert Messages
      downloadComplete: 'Muat Turun Selesai',
      downloadFailed: 'Muat Turun Gagal',
      unableToDownload: 'Tidak dapat memuat turun fail. Sila cuba lagi.',
      error: 'Ralat',
      errorOccurred: 'Ralat berlaku semasa memuat turun fail.',
      cancel: 'Batal',
      open: 'Buka',
      unableToOpen: 'Tidak dapat membuka fail. Anda boleh menemuinya di folder Muat Turun.',

      // Threats
      threats: [
        {
          icon: 'forest',
          title: 'Pembalakan & Kehilangan Habitat',
          description: 'Ladang kelapa sawit, pembalakan, dan pembangunan bandar merosakkan habitat harimau'
        },
        {
          icon: 'alt-route',
          title: 'Fragmentasi Habitat',
          description: 'Jalan raya dan lebuh raya memecah-belahkan hutan, meningkatkan risiko kemalangan maut'
        },
        {
          icon: 'gps-not-fixed',
          title: 'Pemburuan Haram & Perdagangan',
          description: 'Diburu untuk kulit, tulang (perubatan tradisional), dan trofi'
        },
        {
          icon: 'gavel',
          title: 'Penguatkuasaan Lemah',
          description: 'Patroli anti-pemburuan terhad dan rasuah menghalang pemuliharaan'
        },
        {
          icon: 'home',
          title: 'Konflik Manusia-Hidupan Liar',
          description: 'Harimau menyerang ternakan ketika mangsa berkurangan, menyebabkan pembunuhan balas'
        },
        {
          icon: 'grass',
          title: 'Kekurangan Mangsa',
          description: 'Pemburuan berlebihan rusa dan babi hutan mengurangkan bekalan makanan harimau'
        }
      ],

      // Action Categories
      actionCategories: [
        {
          icon: 'campaign',
          title: 'Sokong & Derma',
          color: '#4CAF50',
          actions: [
            'Derma kepada WWF-Malaysia, MYCAT, atau Rimba untuk patroli anti-pemburuan',
            'Adopsi simbolik harimau melalui NGO pemuliharaan',
            'Biayai pemantauan kamera jarak jauh dan pemulihan habitat'
          ]
        },
        {
          icon: 'science',
          title: 'Penyelidikan & Sukarelawan',
          color: '#2196F3',
          actions: [
            'Jadi sukarelawan untuk kajian hidupan liar dan pemantauan kamera jarak jauh',
            'Sertai kempen kesedaran dan program pendidikan',
            'Laporkan pemerhatian harimau kepada pihak berkuasa (cth: Jabatan Perlindungan Hidupan Liar Perak)'
          ]
        },
        {
          icon: 'report',
          title: 'Advokasi & Pelaporan',
          color: '#FF9800',
          actions: [
            'Laporkan pemburuan haram melalui talian hotline MYCAT: 1-800-88-5151',
            'Menyokong koridor hidupan liar untuk menghubungkan hutan terpisah',
            'Sokong undang-undang lebih ketat dengan menandatangani petisyen pemuliharaan'
          ]
        },
        {
          icon: 'eco',
          title: 'Hidup Mampan',
          color: '#8BC34A',
          actions: [
            'Pilih produk minyak sawit bersijil RSPO dan kayu bersijil FSC',
            'Elakkan produk berasaskan harimau (ubat tradisional, cenderamata)',
            'Kurangkan penggunaan plastik—pencemaran membahayakan mangsa dan ekosistem harimau'
          ]
        },
        {
          icon: 'share',
          title: 'Sebarkan Kesedaran',
          color: '#E91E63',
          actions: [
            'Lawati kawasan perlindungan mesra harimau (Taman Negara, Royal Belum) secara bertanggungjawab',
            'Kongsi fakta di media sosial menggunakan #SaveMalayanTigers',
            'Didik kanak-kanak melalui program sekolah dan lawatan zoo'
          ]
        }
      ],

      // Coexistence Strategies
      coexistenceStrategies: [
        {
          icon: 'pets',
          title: 'Haiwan Penjaga',
          description: 'Anjing penjaga ternakan mengurangkan serangan harimau di ladang'
        },
        {
          icon: 'account-balance',
          title: 'Skim Pampasan',
          description: 'Sokongan kewangan untuk petani yang kehilangan ternakan akibat harimau'
        },
        {
          icon: 'nature',
          title: 'Koridor Hidupan Liar',
          description: 'Laluan terlindung menghubungkan hutan terpisah untuk pergerakan harimau selamat'
        },
        {
          icon: 'directions',
          title: 'Lintasan Selamat',
          description: 'Jambatan atas dan terowong bawah lebuh raya mencegah kemalangan hidupan liar'
        },
        {
          icon: 'notification-important',
          title: 'Sistem Amaran',
          description: 'Amaran SMS memaklumkan penduduk tentang kehadiran harimau berhampiran'
        },
        {
          icon: 'travel-explore',
          title: 'Ekopelancongan',
          description: 'Pelancongan mampan mewujudkan pekerjaan alternatif selain eksploitasi hutan'
        },
        {
          icon: 'security',
          title: 'Kandang Kalis Pemangsa',
          description: 'Kandang ternakan terlindung mencegah konflik harimau-manusia'
        },
        {
          icon: 'forest',
          title: 'Produk Bukan Kayu',
          description: 'Madu liar dan hasil hutan mengurangkan kebergantungan kepada pembalakan'
        },
        {
          icon: 'groups',
          title: 'Rondaan Komuniti',
          description: 'Unit rondaan tempatan (contoh: PATROL Perak) memantau harimau dan menghalang pemburu'
        },
        {
          icon: 'policy',
          title: 'Perancangan Guna Tanah',
          description: 'Perancangan strategik mengutamakan pemuliharaan habitat harimau'
        }
      ],

      // Success Stories
      successStories: [
        {
          icon: 'park',
          title: 'Koridor Hidupan Liar Kenyir',
          achievement: 'Usaha penanaman semula hutan telah menyambungkan semula habitat terpisah antara Taman Negara dan Tasik Kenyir, membolehkan pergerakan harimau yang lebih selamat',
          impact: 'Konektiviti habitat',
          color: '#4CAF50'
        },
        {
          icon: 'security',
          title: 'Taman Negeri Royal Belum',
          achievement: 'Peningkatan rondaan telah mengurangkan pemburuan haram sebanyak 40% sejak 2019',
          impact: 'Kejayaan anti-pemburuan',
          color: '#2196F3'
        },
        {
          icon: 'groups',
          title: 'Unit Rondaan Komuniti',
          achievement: 'Pasukan anti-pemburuan yang diketuai masyarakat Orang Asli di Perak telah menyingkirkan 1,200 jerangkap pada tahun 2022',
          impact: 'Penglibatan komuniti',
          color: '#FF9800'
        },
        {
          icon: 'attach-money',
          title: 'Kesan Ekopelancongan',
          achievement: 'Pelancongan mesra harimau di Taman Negara telah menjana RM5 juta untuk komuniti tempatan pada 2023',
          impact: 'Insentif ekonomi',
          color: '#8BC34A'
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'tiger-conservation-guide.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile download
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'tiger-conservation-guide.pdf'
        );

        try {
          const { uri } = await downloadResumable.downloadAsync();
          
          // Check if sharing is available
          const isAvailable = await Sharing.isAvailableAsync();
          
          Alert.alert(
            text.downloadComplete,
            '', // ← Empty message
            [
              { text: text.cancel, style: 'default' },
              ...(isAvailable ? [{ 
                text: text.open, 
                onPress: async () => {
                  try {
                    await Sharing.shareAsync(uri, {
                      mimeType: 'application/pdf',
                      dialogTitle: 'Open Tiger Conservation Guide'
                    });
                  } catch (shareError) {
                    console.error('Error opening file:', shareError);
                    Alert.alert(text.error, text.unableToOpen);
                  }
                },
                style: 'default'
              }] : [])
            ]
          );
        } catch (error) {
          console.error('Download failed:', error);
          Alert.alert(text.downloadFailed, text.unableToDownload);
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert(text.error, text.errorOccurred);
    }
  };
  
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.threatsToSurvival}
          </ThemedText>
        </View>
        
        <View style={styles.threatsGrid}>
          {text.threats.map((threat, index) => (
            <View key={index} style={[
              styles.threatCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={[
                styles.threatIcon,
                { backgroundColor: '#F44336' + '20' }
              ]}>
                <MaterialIcons 
                  name={threat.icon} 
                  size={20} 
                  color="#F44336" 
                />
              </View>
              
              <View style={styles.threatContent}>
                <ThemedText style={[
                  styles.threatTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {threat.title}
                </ThemedText>
                <ThemedText style={[
                  styles.threatDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.howYouCanHelp}
          </ThemedText>
        </View>
        
        <View style={styles.actionsGrid}>
          {text.actionCategories.map((category, index) => (
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
                <ThemedText style={[
                  styles.actionTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
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
                    <ThemedText style={[
                      styles.actionText,
                      { color: isDark ? Colors.dark.text : Colors.light.text }
                    ]}>
                      {action}
                    </ThemedText>
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.coexistenceSolutions}
          </ThemedText>
        </View>
        
        <View style={styles.strategiesGrid}>
          {text.coexistenceStrategies.map((strategy, index) => (
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
                <ThemedText style={[
                  styles.strategyTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {strategy.title}
                </ThemedText>
                <ThemedText style={[
                  styles.strategyDesc,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
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
          <ThemedText style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {text.conservationSuccesses}
          </ThemedText>
        </View>
        
        <View style={styles.successGrid}>
          {text.successStories.map((story, index) => (
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
                  <ThemedText style={[
                    styles.successTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
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
              
              <ThemedText style={[
                styles.successDesc,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {story.achievement}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🔥 Simple Download Button */}
      <View style={styles.downloadSection}>
        <TouchableOpacity 
          style={[
            styles.simpleDownloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownloadPDF}
          activeOpacity={0.8}
        >
          <MaterialIcons name="file-download" size={18} color="#fff" />
          <ThemedText style={styles.simpleDownloadText}>
            {text.downloadPdf}
          </ThemedText>
        </TouchableOpacity>
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
  downloadSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  simpleDownloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  simpleDownloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
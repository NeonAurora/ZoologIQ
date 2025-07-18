// components/lesson/turtle/sections/TurtleConservation.jsx
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function TurtleConservation({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // 🔒 HARDCODED PDF URL - Replace with your actual PDF URL
  const PDF_DOWNLOAD_URL = "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086680717.pdf";

  // 🔥 BILINGUAL CONTENT - Based on your provided content
  const content = {
    en: {
      // Section Headers
      conservationStrategies: "Conservation Strategies",
      conservationSuccessStories: "Conservation Success Stories",
      howYouCanHelp: "How You Can Help",
      researchMonitoring: "Research & Monitoring",
      ecoTourismImpact: "Eco-Tourism Impact",
      globalCollaboration: "Global Collaboration",
      joinConservationEffort: "Join the Conservation Effort",
      downloadPdf: "Download PDF",

      // Alert Messages
      downloadComplete: "Download Complete",
      downloadFailed: "Download Failed",
      unableToDownload: "Unable to download the file. Please try again.",
      error: "Error",
      downloadError: "An error occurred while downloading the file.",
      unableToOpen: "Unable to open the file. You can find it in your Downloads folder.",
      cancel: "Cancel",
      open: "Open",

      // Conservation Strategies
      conservationStrategiesData: [
        {
          icon: '🏛️',
          title: 'Marine Protected Areas',
          description: 'Establish and enforce MPAs to safeguard critical habitats such as nesting and feeding grounds',
          status: 'Active',
          color: '#2196F3'
        },
        {
          icon: '🎣',
          title: 'Sustainable Fishing Practices',
          description: 'Implement turtle excluder devices (TEDs) and enforce bycatch reduction measures',
          status: 'Expanding',
          color: '#4CAF50'
        },
        {
          icon: '🌱',
          title: 'Habitat Restoration',
          description: 'Rehabilitate degraded nesting beaches and seagrass meadows to support turtle populations',
          status: 'Ongoing',
          color: '#8BC34A'
        },
        {
          icon: '⚖️',
          title: 'Legislation & Enforcement',
          description: 'Strengthen laws against poaching, illegal trade, and habitat destruction',
          status: 'Critical',
          color: '#FF9800'
        },
        {
          icon: '🌡️',
          title: 'Climate Adaptation',
          description: 'Implement strategies to manage rising temperatures and protect coastal nesting sites from sea level rise',
          status: 'Urgent',
          color: '#F44336'
        },
        {
          icon: '👥',
          title: 'Community Engagement',
          description: 'Involve local communities in conservation efforts through education and eco-tourism initiatives',
          status: 'Growing',
          color: '#9C27B0'
        }
      ],

      // Success Stories
      successStories: [
        {
          location: 'Redang Island, Malaysia',
          achievement: 'Conservation programs have increased nesting activity through protected beaches and eco-tourism initiatives',
          flag: '🇲🇾'
        },
        {
          location: 'Hawaii, USA',
          achievement: 'The Green Sea Turtle population rebounded after the 1978 listing under the U.S. Endangered Species Act and strict protections',
          flag: '🇺🇸'
        },
        {
          location: 'Tortuguero, Costa Rica',
          achievement: 'Community-driven conservation programs have led to a steady increase in nesting turtles',
          flag: '🇨🇷'
        },
        {
          location: 'Australia',
          achievement: 'Raine Island Recovery Project restored nesting habitats, significantly improving hatchling success rates',
          flag: '🇦🇺'
        },
        {
          location: 'Bali, Indonesia',
          achievement: 'Community involvement and legal action against poaching have reduced the trade in turtle products',
          flag: '🇮🇩'
        },
        {
          location: 'Oman',
          achievement: 'Protected areas such as Ras Al Jinz have become sanctuaries for nesting turtles, supported by eco-tourism',
          flag: '🇴🇲'
        }
      ],

      // How to Help
      howToHelp: [
        {
          action: 'Protect Nesting Beaches',
          description: 'Establish protected areas to prevent human disturbances during nesting',
          icon: '🏖️'
        },
        {
          action: 'Reduce Bycatch',
          description: 'Use turtle excluder devices (TEDs) in fishing gear to minimize accidental captures',
          icon: '🎣'
        },
        {
          action: 'Combat Pollution',
          description: 'Reduce plastic use, promote recycling, and conduct ocean cleanup drives to prevent pollution',
          icon: '🌊'
        },
        {
          action: 'Mitigate Climate Change',
          description: 'Support policies that reduce carbon emissions and protect coastal habitats from sea level rise',
          icon: '🌍'
        },
        {
          action: 'Ban Illegal Trade',
          description: 'Enforce laws against poaching and the sale of turtle products',
          icon: '🚫'
        },
        {
          action: 'Raise Awareness',
          description: 'Educate local communities and tourists about the importance of turtles in ecosystems',
          icon: '📢'
        }
      ],

      // Detailed Explanations
      researchText: "Conduct studies to track turtle populations, migration patterns, and health for data-driven strategies. Modern technology including satellite tracking, genetic analysis, and AI-powered monitoring helps scientists understand turtle behavior and develop more effective conservation measures. Citizen science programs also allow volunteers to contribute valuable data.",

      tourismText: "Responsible eco-tourism provides economic incentives for local communities to protect turtle nesting sites and marine habitats. When communities benefit financially from turtle conservation, they become active protectors rather than threats. Well-managed turtle watching programs can generate significant revenue while ensuring minimal disturbance to the animals.",

      cooperationText: "Green Sea Turtle conservation requires international cooperation since these animals migrate across national boundaries. Treaties like CITES (Convention on International Trade in Endangered Species) help combat illegal trade, while regional partnerships coordinate protection efforts across turtle migration routes and feeding areas.",

      ctaText: "By protecting beaches, reducing plastic use, and supporting eco-friendly tourism, we can help save this ancient mariner and the vibrant world it supports. Every action counts - from choosing sustainable seafood to supporting conservation organizations. Together, we can ensure future generations will witness the magnificent sight of Green Sea Turtles thriving in our oceans."
    },
    ms: {
      // Section Headers
      conservationStrategies: "Strategi Pemuliharaan",
      conservationSuccessStories: "Kisah Kejayaan Pemuliharaan",
      howYouCanHelp: "Bagaimana Anda Boleh Membantu",
      researchMonitoring: "Penyelidikan & Pemantauan",
      ecoTourismImpact: "Kesan Eko-Pelancongan",
      globalCollaboration: "Kerjasama Global",
      joinConservationEffort: "Sertai Usaha Pemuliharaan",
      downloadPdf: "Muat Turun PDF",

      // Alert Messages
      downloadComplete: "Muat Turun Selesai",
      downloadFailed: "Muat Turun Gagal",
      unableToDownload: "Tidak dapat memuat turun fail. Sila cuba lagi.",
      error: "Ralat",
      downloadError: "Ralat berlaku semasa memuat turun fail.",
      unableToOpen: "Tidak dapat membuka fail. Anda boleh menemuinya di folder Muat Turun anda.",
      cancel: "Batal",
      open: "Buka",

      // Conservation Strategies
      conservationStrategiesData: [
        {
          icon: '🏛️',
          title: 'Kawasan Perlindungan Marin',
          description: 'Menubuhkan dan menguatkuasakan MPA untuk melindungi habitat penting seperti kawasan penetasan dan pemakanan',
          status: 'Aktif',
          color: '#2196F3'
        },
        {
          icon: '🎣',
          title: 'Amalan Perikanan Lestari',
          description: 'Menggunakan alat penghalang penyu (Turtle Excluder Devices - TEDs) dan menguatkuasakan langkah pengurangan tangkapan sampingan',
          status: 'Berkembang',
          color: '#4CAF50'
        },
        {
          icon: '🌱',
          title: 'Pemulihan Habitat',
          description: 'Memulihkan pantai penetasan dan padang rumpai laut yang rosak untuk menyokong populasi penyu',
          status: 'Berterusan',
          color: '#8BC34A'
        },
        {
          icon: '⚖️',
          title: 'Perundangan & Penguatkuasaan',
          description: 'Memperkuat undang-undang terhadap pemburuan haram, perdagangan haram, dan pemusnahan habitat',
          status: 'Kritikal',
          color: '#FF9800'
        },
        {
          icon: '🌡️',
          title: 'Penyesuaian Iklim',
          description: 'Melaksanakan strategi untuk mengurus suhu yang meningkat dan melindungi tapak penetasan pantai daripada kenaikan paras laut',
          status: 'Mendesak',
          color: '#F44336'
        },
        {
          icon: '👥',
          title: 'Penglibatan Komuniti',
          description: 'Melibatkan komuniti tempatan dalam usaha pemuliharaan melalui pendidikan dan inisiatif eko-pelancongan',
          status: 'Berkembang',
          color: '#9C27B0'
        }
      ],

      // Success Stories
      successStories: [
        {
          location: 'Pulau Redang, Malaysia',
          achievement: 'Program pemuliharaan telah meningkatkan aktiviti penetasan melalui pantai yang dilindungi dan inisiatif eko-pelancongan',
          flag: '🇲🇾'
        },
        {
          location: 'Hawaii, Amerika Syarikat',
          achievement: 'Populasi penyu meningkat semula selepas disenaraikan sebagai spesies terancam pada tahun 1978 dan diberikan perlindungan ketat',
          flag: '🇺🇸'
        },
        {
          location: 'Tortuguero, Costa Rica',
          achievement: 'Program pemuliharaan yang dipacu oleh komuniti membawa kepada peningkatan berterusan penyu yang mendarat untuk bertelur',
          flag: '🇨🇷'
        },
        {
          location: 'Australia',
          achievement: 'Projek Pemulihan Pulau Raine telah memulihkan habitat penetasan, meningkatkan kadar kejayaan penetasan dengan ketara',
          flag: '🇦🇺'
        },
        {
          location: 'Bali, Indonesia',
          achievement: 'Penglibatan komuniti dan tindakan undang-undang terhadap pemburuan haram telah mengurangkan perdagangan produk penyu',
          flag: '🇮🇩'
        },
        {
          location: 'Oman',
          achievement: 'Kawasan perlindungan seperti Ras Al Jinz menjadi tempat perlindungan penyu penetasan, disokong oleh eko-pelancongan',
          flag: '🇴🇲'
        }
      ],

      // How to Help
      howToHelp: [
        {
          action: 'Lindungi Pantai Penetasan',
          description: 'Wujudkan kawasan perlindungan untuk mengelakkan gangguan manusia semasa musim bertelur',
          icon: '🏖️'
        },
        {
          action: 'Kurangkan Tangkapan Sampingan',
          description: 'Gunakan peralatan yang mesra penyu seperti Turtle Excluder Devices (TEDs) dalam aktiviti perikanan',
          icon: '🎣'
        },
        {
          action: 'Banteras Pencemaran',
          description: 'Kurangkan penggunaan plastik, galakkan kitar semula dan anjurkan aktiviti pembersihan laut',
          icon: '🌊'
        },
        {
          action: 'Atasi Perubahan Iklim',
          description: 'Sokong dasar pengurangan pelepasan karbon dan perlindungan habitat pantai daripada kenaikan paras laut',
          icon: '🌍'
        },
        {
          action: 'Haramkan Perdagangan Haram',
          description: 'Tegakkan undang-undang terhadap pemburuan haram dan penjualan produk penyu',
          icon: '🚫'
        },
        {
          action: 'Sebarkan Kesedaran',
          description: 'Didik komuniti setempat dan pelancong mengenai kepentingan penyu dalam ekosistem',
          icon: '📢'
        }
      ],

      // Detailed Explanations
      researchText: "Menjalankan kajian untuk menjejak populasi penyu, corak migrasi, dan kesihatan untuk strategi berdasarkan data. Teknologi moden termasuk penjejakan satelit, analisis genetik, dan pemantauan berkuasa AI membantu saintis memahami tingkah laku penyu dan membangunkan langkah pemuliharaan yang lebih berkesan. Program sains warganegara juga membolehkan sukarelawan menyumbang data berharga.",

      tourismText: "Eko-pelancongan yang bertanggungjawab menyediakan insentif ekonomi untuk komuniti tempatan melindungi tapak penetasan penyu dan habitat marin. Apabila komuniti mendapat manfaat kewangan daripada pemuliharaan penyu, mereka menjadi pelindung aktif dan bukannya ancaman. Program pemerhatian penyu yang diurus dengan baik boleh menjana pendapatan yang ketara sambil memastikan gangguan minimum kepada haiwan.",

      cooperationText: "Pemuliharaan Penyu Agar memerlukan kerjasama antarabangsa kerana haiwan ini berhijrah merentasi sempadan negara. Perjanjian seperti CITES (Konvensyen Perdagangan Antarabangsa Spesies Terancam) membantu memerangi perdagangan haram, manakala perkongsian serantau menyelaraskan usaha perlindungan merentasi laluan migrasi dan kawasan pemakanan penyu.",

      ctaText: "Dengan melindungi pantai, mengurangkan penggunaan plastik, dan menyokong pelancongan mesra alam, kita dapat membantu menyelamatkan pelayar purba ini dan dunia laut yang penuh warna yang disokongnya. Setiap tindakan penting - dari memilih makanan laut yang lestari hingga menyokong organisasi pemuliharaan. Bersama-sama, kita boleh memastikan generasi akan datang akan menyaksikan pemandangan menakjubkan Penyu Agar berkembang maju di lautan kita."
    }
  };

  const text = content[currentLanguage] || content.en;

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'turtle-conservation-guide.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile download
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'turtle-conservation-guide.pdf'
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
                      dialogTitle: 'Open Turtle Conservation Guide'
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
      Alert.alert(text.error, text.downloadError);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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
            {text.conservationStrategies}
          </ThemedText>
        </View>

        <View style={styles.strategiesGrid}>
          {text.conservationStrategiesData.map((strategy, index) => (
            <View key={index} style={[
              styles.strategyCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.strategyHeader}>
                <View style={[styles.strategyIcon, { backgroundColor: `${strategy.color}20` }]}>
                  <ThemedText style={styles.strategyEmoji}>{strategy.icon}</ThemedText>
                </View>
                <View style={styles.strategyTitleContainer}>
                  <ThemedText style={[
                    styles.strategyTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}>
                    {strategy.title}
                  </ThemedText>
                  <View style={[styles.statusBadge, { backgroundColor: strategy.color }]}>
                    <ThemedText style={styles.statusText}>{strategy.status}</ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={[
                styles.strategyDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {strategy.description}
              </ThemedText>
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
            {text.conservationSuccessStories}
          </ThemedText>
        </View>

        <View style={styles.successGrid}>
          {text.successStories.map((story, index) => (
            <View key={index} style={[
              styles.successCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.successHeader}>
                <ThemedText style={styles.flag}>{story.flag}</ThemedText>
                <ThemedText style={[
                  styles.location,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {story.location}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.achievement,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {story.achievement}
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
            {text.howYouCanHelp}
          </ThemedText>
        </View>

        <View style={styles.helpGrid}>
          {text.howToHelp.map((help, index) => (
            <View key={index} style={[
              styles.helpCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.helpHeader}>
                <ThemedText style={styles.helpIcon}>{help.icon}</ThemedText>
                <ThemedText style={[
                  styles.helpAction,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {help.action}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.helpDesc,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {help.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Research & Monitoring */}
      <View style={styles.section}>
        <View style={[
          styles.researchCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.researchHeader}>
            <MaterialIcons name="science" size={20} color="#2196F3" />
            <ThemedText style={[
              styles.researchTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.researchMonitoring}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.researchText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.researchText}
          </ThemedText>
        </View>
      </View>

      {/* Eco-Tourism Benefits */}
      <View style={styles.section}>
        <View style={[
          styles.tourismCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#4CAF50'
          }
        ]}>
          <View style={styles.tourismHeader}>
            <MaterialIcons name="eco" size={20} color="#4CAF50" />
            <ThemedText style={[
              styles.tourismTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.ecoTourismImpact}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.tourismText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.tourismText}
          </ThemedText>
        </View>
      </View>

      {/* International Cooperation */}
      <View style={styles.section}>
        <View style={[
          styles.cooperationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF9800'
          }
        ]}>
          <View style={styles.cooperationHeader}>
            <MaterialIcons name="public" size={20} color="#FF9800" />
            <ThemedText style={[
              styles.cooperationTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.globalCollaboration}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.cooperationText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.cooperationText}
          </ThemedText>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.section}>
        <View style={[
          styles.ctaCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.ctaHeader}>
            <MaterialIcons name="campaign" size={20} color="#2196F3" />
            <ThemedText style={[
              styles.ctaTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.joinConservationEffort}
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.ctaText,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            {text.ctaText}
          </ThemedText>
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
          <ThemedText style={styles.simpleDownloadText}>{text.downloadPdf}</ThemedText>
        </TouchableOpacity>
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

  // Strategies Grid
  strategiesGrid: {
    gap: 16,
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
    alignItems: 'flex-start',
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
  strategyEmoji: {
    fontSize: 18,
  },
  strategyTitleContainer: {
    flex: 1,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  strategyDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
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
    alignItems: 'center',
    marginBottom: 8,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  achievement: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },

  // How to Help
  helpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  helpCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  helpHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  helpIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  helpAction: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  helpDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Special Cards
  researchCard: {
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
  researchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  researchTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  researchText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },

  tourismCard: {
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
  tourismHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tourismTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tourismText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },

  cooperationCard: {
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
  cooperationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cooperationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cooperationText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },

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
    textAlign: 'justify',
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
// components/lesson/tapir/sections/TapirReferences.jsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  View,
  Platform
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PDF_DOWNLOAD_URL = 'https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086346171.pdf';

export default function TapirReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Notice dismissal state
  const [showNotice, setShowNotice] = useState(true);

  // 🔥 NEW: Auto-dismiss notice after 5 seconds
  useEffect(() => {
    if (showNotice) {
      const timer = setTimeout(() => {
        setShowNotice(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showNotice]);

  // 🔥 NEW: Manual dismiss function
  const dismissNotice = () => {
    setShowNotice(false);
  };

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    // This will match "Tapirus indicus" and other binomial names
    const scientificNamePattern = /(Tapirus\s+indicus|Tapirus\s+\w+)/g;
    const parts = text.split(scientificNamePattern);
    
    if (parts.length === 1) {
      // No scientific names found, return normal text
      return <ThemedText style={style}>{text}</ThemedText>;
    }
    
    return (
      <ThemedText style={style}>
        {parts.map((part, index) => {
          // Check if this part is a scientific name
          if (scientificNamePattern.test(part)) {
            return (
              <ThemedText
                key={index}
                style={[
                  style,
                  { 
                    fontStyle: 'italic',
                    color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
                  }
                ]}
              >
                {part}
              </ThemedText>
            );
          }
          return part;
        })}
      </ThemedText>
    );
  };

  // 🔥 NEW: PDF Download Handler (extracted from TapirPopulation)
  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'tapir-references.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'tapir-references.pdf'
        );
        const { uri } = await downloadResumable.downloadAsync();
        const canShare = await Sharing.isAvailableAsync();
        Alert.alert(
          'Download complete',
          '',
          [
            { text: 'OK' },
            ...(canShare
              ? [{
                  text: 'Open',
                  onPress: async () => {
                    try {
                      await Sharing.shareAsync(uri, {
                        mimeType: 'application/pdf',
                        dialogTitle: 'Open Tapir References PDF'
                      });
                    } catch {
                      Alert.alert('Error', 'Unable to open the file.');
                    }
                  }
                }]
              : [])
          ]
        );
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

const references = [
  {
    authors: 'Adila, N., Ahmad, A. H., & Abdul-Patah, P.',
    year: '2017',
    title: 'Status and conservation of the Malayan tapir in Peninsular Malaysia',
    source: 'Journal of Wildlife and Parks, 32, 55–62'
  },
  {
    authors: 'Animal Behaviour',
    year: '2021',
    title: 'Parental roles and solitary behaviors in tapirs',
    source: 'Animal Behaviour, 175, 112–119'
  },
  {
    authors: 'Animal Behaviour',
    year: '2023',
    title: 'Scent marking strategies in solitary mammals',
    source: 'Animal Behaviour, 191, 89–97'
  },
  {
    authors: 'ASEAN Centre for Biodiversity',
    year: '2022',
    title: 'Wildlife corridors and eco-bridges in Southeast Asia',
    source: 'ASEAN Biodiversity Outlook, 3, 92–104'
  },
  {
    authors: 'Bank Negara Malaysia',
    year: '2021',
    title: 'Commemorative currency notes featuring Malaysian wildlife',
    source: 'Bank Negara Malaysia',
    url: 'https://www.bnm.gov.my'
  },
  {
    authors: 'FFI (Fauna & Flora International)',
    year: '2023',
    title: 'Reducing illegal wildlife hunting in Sumatra',
    source: 'Fauna & Flora International',
    url: 'https://www.fauna-flora.org'
  },
  {
    authors: 'Foerster, C. R., Lynam, A. J., & Bernads, H.',
    year: '2020',
    title: 'Tapir population distribution in Kaeng Krachan National Park, Thailand',
    source: 'Wildlife Conservation Journal, 42(1), 11–20'
  },
  {
    authors: 'Hughes, A.',
    year: '2021',
    title: 'Palm oil and its ecological impact on Sumatran biodiversity',
    source: 'Biodiversity Watch, 16(3), 202–218'
  },
  {
    authors: 'ICMBio (Chico Mendes Institute for Biodiversity Conservation)',
    year: '2021',
    title: 'Sustainable agriculture for tapir habitat protection in Brazil',
    source: 'ICMBio',
    url: 'https://www.icmbio.gov.br'
  },
  {
    authors: 'Journal of Mammalogy',
    year: '2023',
    title: 'Tapir calf development and diet',
    source: 'Journal of Mammalogy, 104(2), 350–362'
  },
  {
    authors: 'Journal of Zoology',
    year: '2022',
    title: 'Coloration and camouflage in Malayan tapirs',
    source: 'Journal of Zoology, 316(2), 150–164'
  },
  {
    authors: 'Malaysian Conservation Alliance for Tigers (MYCAT)',
    year: '2023',
    title: 'Public awareness campaigns on nighttime driving to reduce tapir roadkill',
    source: 'MYCAT',
    url: 'https://nussavewrites.wordpress.com/2023/07/27/a-walk-to-remember-mycat-walk/'
  },
  {
    authors: 'Malaysian Wildlife Department',
    year: '2022',
    title: 'Public education initiatives on endangered species',
    source: 'PERHILITAN',
    url: 'https://www.wildlife.gov.my'
  },
  {
    authors: 'MYCAT',
    year: '2022',
    title: 'Tapir-inclusive conservation planning',
    source: 'MYCAT',
    url: 'https://www.malayantiger.net'
  },
  {
    authors: 'MYCAT',
    year: '2023',
    title: 'Road awareness campaigns for wildlife protection',
    source: 'Conservation Impact Report'
  },
  {
    authors: 'National Geographic',
    year: '2021',
    title: 'Tapirs: Ancient creatures of the Asian jungle',
    source: 'National Geographic',
    url: 'https://www.nationalgeographic.com'
  },
  {
    authors: 'National Geographic',
    year: '2022',
    title: 'Marina Rivero: Bringing visibility to the endangered Baird\'s tapir',
    source: 'National Geographic Impact',
    url: 'https://www.nationalgeographic.com/impact/article/marina-rivero-bringing-visibility-to-the-endangered-bairds-tapir'
  },
  {
    authors: 'Panthera',
    year: '2022',
    title: 'AI-assisted wildlife monitoring in tropical forests',
    source: 'Panthera Research Bulletin, 11(1), 36–44'
  },
  {
    authors: 'ProCAT',
    year: '2023',
    title: 'Using drones for tapir monitoring in South America',
    source: 'ProCAT Conservation',
    url: 'https://www.procat-conservation.org'
  },
  {
    authors: 'RSPO',
    year: '2023',
    title: 'Collaborations for forest restoration with palm oil companies',
    source: 'Roundtable on Sustainable Palm Oil'
  },
  {
    authors: 'San Diego Zoo',
    year: '2022',
    title: 'Tapir conservation projects in Southeast Asia',
    source: 'San Diego Zoo',
    url: 'https://www.sdzoo.org'
  },
  {
    authors: 'San Diego Zoo',
    year: '2023',
    title: 'Tapir breeding and behavior updates',
    source: 'Annual Wildlife Report'
  },
  {
    authors: 'ScienceDaily',
    year: '2021',
    title: 'Camouflage in baby animals: New research on tapir calves',
    source: 'ScienceDaily',
    url: 'https://www.sciencedaily.com'
  },
  {
    authors: 'Smithsonian',
    year: '2019',
    title: 'Wildlife conflicts in Malaysia: The case of the tapir',
    source: 'Smithsonian Magazine, 49(3), 18–24'
  },
  {
    authors: 'Smithsonian',
    year: '2020',
    title: 'Ancient survivors: Evolutionary history of tapirs',
    source: 'Smithsonian Institution',
    url: 'https://www.si.edu'
  },
  {
    authors: 'Smithsonian',
    year: '2021',
    title: 'Tapir adaptations and aquatic life',
    source: 'Smithsonian Institution',
    url: 'https://www.si.edu'
  },
  {
    authors: 'Smithsonian',
    year: '2022',
    title: 'Living fossils: Tapirs through time',
    source: 'Smithsonian Institution Archives'
  },
  {
    authors: 'Tapir Conservation',
    year: '2023',
    title: 'Tapir communication and mating behavior',
    source: 'Tapir Conservation, 32(1), 13–18'
  },
  {
    authors: 'Tapir Specialist Group',
    year: '2023',
    title: 'Myanmar tapir population: A disappearing species',
    source: 'IUCN Tapir Specialist Group',
    url: 'https://tapirs.org'
  },
  {
    authors: 'Tourism Malaysia',
    year: '2023',
    title: 'Sustainable ecotourism initiatives benefiting tapir conservation at Endau-Rompin National Park',
    source: 'Tourism Malaysia',
    url: 'https://www.tourism.gov.my/media/view/tourism-malaysia-highlights-sustainable-tourism-at-world-travel-market-2023'
  },
  {
    authors: 'Town and Country Planning Dept.',
    year: '2022',
    title: 'Land use policies for wildlife conservation',
    source: 'Malaysia Planning Journal, 36(2), 73–84'
  },
  {
    authors: 'TRAFFIC',
    year: '2020',
    title: 'Poaching and wildlife trade in Southeast Asia',
    source: 'TRAFFIC',
    url: 'https://www.traffic.org'
  },
  {
    authors: 'TRAFFIC',
    year: '2023',
    title: 'ASEAN-WEN and efforts to combat illegal tapir trade',
    source: 'Wildlife Trade Monitor'
  },
  {
    authors: 'UM (University of Malaya)',
    year: '2023',
    title: 'Tracking Malayan tapirs: GPS and camera trap data',
    source: 'Conservation Research Highlights'
  },
  {
    authors: 'Universiti Putra Malaysia',
    year: '2022',
    title: 'Conservation of Malayan Tapir',
    source: 'Universiti Putra Malaysia',
    url: 'https://forenv.upm.edu.my/upload/dokumen/20221207163559E-book_-_Conservation_of_Malayan_Tapir_-_UPM.pdf'
  },
  {
    authors: 'Wildlife Research',
    year: '2023',
    title: 'Spatial navigation and memory in tropical mammals',
    source: 'Wildlife Research, 50(2), 118–126'
  },
  {
    authors: 'WWF',
    year: '2021',
    title: 'The tapir as a flagship species',
    source: 'World Wildlife Fund',
    url: 'https://www.worldwildlife.org'
  },
  {
    authors: 'WWF',
    year: '2022',
    title: 'Roadkill data and mitigation strategies for Malayan tapirs',
    source: 'WWF Malaysia',
    url: 'https://www.wwf.org.my'
  },
  {
    authors: 'WWF',
    year: '2023',
    title: 'Get involved in tapir conservation',
    source: 'WWF Malaysia',
    url: 'https://www.wwf.org.my'
  },
  {
    authors: 'WWF Malaysia',
    year: '2022',
    title: 'Camera trap data and population monitoring of tapirs',
    source: 'WWF Field Report'
  },
  {
    authors: 'WWF Malaysia',
    year: '2023',
    title: 'Human-wildlife conflict solutions in Peninsular Malaysia',
    source: 'Conservation Report Series, 7'
  },
  {
    authors: 'Yayasan Badak',
    year: '2022',
    title: 'Environmental education in Indonesian schools',
    source: 'Yayasan Badak',
    url: 'https://www.yayasanbadak.org'
  },
  {
    authors: 'Zoo Biology',
    year: '2020',
    title: 'Maturity and reproduction rates of tapirs in captivity',
    source: 'Zoo Biology, 39(4), 310–318'
  },
  {
    authors: 'Zoo Biology',
    year: '2021',
    title: 'Tapir-human interaction in captive environments',
    source: 'Zoo Biology, 40(1), 90–98'
  }
];

  const handleReferencePress = (ref) => {
    if (ref.url) {
      Alert.alert(
        'Open External Link',
        `This will open "${ref.title}" in your browser. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open',
            onPress: () => {
              Linking.openURL(ref.url).catch(() => {
                Alert.alert('Error', 'Unable to open the link.');
              });
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Reference Information',
        `${ref.title}\n\nAuthors: ${ref.authors}\nYear: ${ref.year}\nSource: ${ref.source}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView
        style={[
          styles.headerSection,
          {
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}
      >
        <MaterialIcons
          name="library-books"
          size={24}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
        />
        <ThemedText
          style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          References
        </ThemedText>
      </ThemedView>

      {/* 🔥 UPDATED: Dismissible Notice */}
      {showNotice && (
        <ThemedView
          style={[
            styles.noticeCard,
            {
              backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
              borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
            }
          ]}
        >
          <MaterialIcons
            name="info"
            size={20}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
          />
          <ThemedText
            style={[
              styles.noticeText,
              { 
                color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
                paddingRight: 40 // 🔥 NEW: Add right padding to make room for close button
              }
            ]}
          >
            The following scientific references support the information presented
            in this Malayan Tapir lesson. Content is displayed in English for academic consistency.
          </ThemedText>
          <TouchableOpacity
            onPress={dismissNotice}
            style={styles.dismissButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons 
              name="close" 
              size={18} 
              color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
            />
          </TouchableOpacity>
        </ThemedView>
      )}

      {/* List */}
      <ScrollView
        style={styles.referencesScrollView}
        contentContainerStyle={styles.referencesContent}
        showsVerticalScrollIndicator={false}
      >
        {references.map((ref, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.referenceCard,
              {
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
            onPress={() => handleReferencePress(ref)}
            activeOpacity={0.7}
          >
            <ThemedView style={styles.referenceHeader}>
              <ThemedView style={styles.referenceIcon}>
                <MaterialIcons
                  name="article"
                  size={20}
                  color={isDark ? Colors.dark.tint : Colors.light.tint}
                />
              </ThemedView>
              <ThemedView style={styles.referenceInfo}>
                {/* 🔥 UPDATED: Reference title with scientific names in italic */}
                {renderTextWithScientificNames(
                  ref.title,
                  [
                    styles.referenceTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]
                )}
                
                <ThemedText
                  style={[
                    styles.referenceAuthors,
                    { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                  ]}
                  numberOfLines={2}
                >
                  {ref.authors} ({ref.year})
                </ThemedText>
                <ThemedText
                  style={[
                    styles.referenceSource,
                    { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
                  ]}
                  numberOfLines={2}
                >
                  {ref.source}
                </ThemedText>
              </ThemedView>
              {ref.url && (
                <MaterialIcons
                  name="open-in-new"
                  size={18}
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
                />
              )}
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔥 NEW: Download PDF Section (extracted from TapirPopulation) */}
      <ThemedView style={styles.downloadSection}>
        <TouchableOpacity
          style={[
            styles.downloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownloadPDF}
          activeOpacity={0.8}
        >
          <MaterialIcons name="file-download" size={18} color="#fff" />
          <ThemedText style={styles.downloadText}>Download PDF</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    gap: 12
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600'
  },

  // 🔥 UPDATED: Notice styles with dismiss button
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    gap: 12,
    position: 'relative'
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic'
  },
  dismissButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    borderRadius: 12,
  },

  referencesScrollView: { flex: 1 },
  referencesContent: {
    padding: 16,
    paddingTop: 0,
    gap: 12
  },

  referenceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'transparent'
  },
  referenceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.1)'
  },
  referenceInfo: { flex: 1, backgroundColor: 'transparent' },
  referenceTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4
  },
  referenceAuthors: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2
  },
  referenceSource: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  
  // 🔥 NEW: Download styles (extracted from TapirPopulation)
  downloadSection: { 
    alignItems: 'center', 
    marginTop: 16, 
    marginBottom: 16,
    paddingHorizontal: 16
  },
  downloadButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingVertical: 10,
    borderRadius: 20, 
    gap: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    elevation: 2
  },
  downloadText: {
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600'
  }
});
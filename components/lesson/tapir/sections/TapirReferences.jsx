import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Tapir-specific references from assets/lessonContents/tapir.txt
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
      authors: 'BBC Earth',
      year: '2019',
      title: 'Asia\'s hidden herbivores',
      source: 'BBC Earth',
      url: 'https://www.bbcearth.com'
    },
    {
      authors: 'BBC Earth',
      year: '2021',
      title: 'Strange abilities of jungle mammals',
      source: 'BBC Earth',
      url: 'https://www.bbcearth.com'
    },
    {
      authors: 'BBC Earth',
      year: '2022',
      title: 'The last tapirs of Asia [Documentary]',
      source: 'BBC'
    },
    {
      authors: 'BBC Earth',
      year: '2023',
      title: 'Why we should care about tapirs',
      source: 'BBC Earth',
      url: 'https://www.bbcearth.com'
    },
    {
      authors: 'Bioacoustics Journal',
      year: '2022',
      title: 'Communication sounds in large mammals: The case of the Malayan tapir',
      source: 'Bioacoustics, 31(3), 281–297'
    },
    {
      authors: 'Central Forest Spine Initiative',
      year: '2023',
      title: 'Linking forests across Malaysia: Progress and planning',
      source: 'Ministry of Natural Resources and Environmental Sustainability'
    },
    {
      authors: 'DWNP (Department of Wildlife and National Parks Malaysia)',
      year: '2023',
      title: 'Wildlife management and tapir conservation in Malaysia',
      source: 'Putrajaya: DWNP Publications'
    },
    {
      authors: 'EAZA (European Association of Zoos and Aquaria)',
      year: '2021',
      title: 'Captive breeding programs for endangered mammals',
      source: 'Annual Report 2021'
    },
    {
      authors: 'EAZA',
      year: '2022',
      title: 'Conservation breeding and population genetics of Malayan tapirs in Europe',
      source: 'EAZA Conservation Journal, 28(2), 45–56'
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
      authors: 'IPCC',
      year: '2022',
      title: 'Climate change 2022: Impacts, adaptation, and vulnerability',
      source: 'Intergovernmental Panel on Climate Change'
    },
    {
      authors: 'IUCN',
      year: '2023',
      title: 'The IUCN Red List of Threatened Species: Tapirus indicus',
      source: 'IUCN Red List',
      url: 'https://www.iucnredlist.org'
    },
    {
      authors: 'IUCN Tapir Specialist Group',
      year: '2023',
      title: 'Global tapir conservation strategy',
      source: 'IUCN Tapir Specialist Group',
      url: 'https://tapirs.org'
    },
    {
      authors: 'Journal of Mammalogy',
      year: '2022',
      title: 'Nocturnal behavior and habitat use of Malayan tapirs',
      source: 'Journal of Mammalogy, 103(4), 890–905'
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
      authors: 'Malaysian Wildlife Department (PERHILITAN)',
      year: '2021',
      title: 'Wildlife roadkill statistics and mitigation measures',
      source: 'PERHILITAN Annual Report'
    },
    {
      authors: 'Malaysian Wildlife Department (PERHILITAN)',
      year: '2022',
      title: 'Electric fencing trials in tapir habitat zones',
      source: 'Wildlife Bulletin Malaysia, 45(1), 12–20'
    },
    {
      authors: 'Malaysian Wildlife Department',
      year: '2022',
      title: 'Public education initiatives on endangered species',
      source: 'PERHILITAN',
      url: 'https://www.wildlife.gov.my'
    },
    {
      authors: 'MNS (Malaysian Nature Society)',
      year: '2021',
      title: 'Community-based conservation in Malaysian forests',
      source: 'Malaysian Nature Society',
      url: 'https://www.mns.my'
    },
    {
      authors: 'MNS',
      year: '2022',
      title: 'Orang Asli-led wildlife monitoring programs',
      source: 'Malaysian Nature Review, 27(4), 44–51'
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
      year: '2023',
      title: 'Nature\'s paintbrush: Why tapirs matter',
      source: 'National Geographic',
      url: 'https://www.nationalgeographic.com'
    },
    {
      authors: 'Ng, S. W., Ahmad, S. A., & Lee, K. H.',
      year: '2022',
      title: 'Population trends and threats to the Malayan tapir in Malaysia',
      source: 'Malaysian Biodiversity Journal, 9(2), 22–34'
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
      authors: 'Rainforest Alliance',
      year: '2022',
      title: 'Certified sustainable products to protect biodiversity',
      source: 'Rainforest Alliance',
      url: 'https://www.rainforest-alliance.org'
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
      title: 'Community-based eco-tourism in Johor: A success story',
      source: 'Tourism Malaysia',
      url: 'https://www.tourism.gov.my'
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
      authors: 'UMT (Universiti Malaysia Terengganu)',
      year: '2022',
      title: 'Genetic diversity of Malayan tapirs in Peninsular Malaysia',
      source: 'UMT Research Journal, 11(3), 28–39'
    },
    {
      authors: 'UNEP',
      year: '2021',
      title: 'Biodiversity and weak enforcement of conservation laws',
      source: 'United Nations Environment Programme'
    },
    {
      authors: 'WCS (Wildlife Conservation Society)',
      year: '2023',
      title: 'Wildlife corridors and transboundary conservation',
      source: 'Wildlife Conservation Society',
      url: 'https://www.wcs.org'
    },
    {
      authors: 'WCS Indonesia',
      year: '2022',
      title: 'Habitat restoration in Bukit Barisan Selatan National Park',
      source: 'Conservation Newsletter Indonesia, 14(1), 9–18'
    },
    {
      authors: 'WCS Thailand',
      year: '2021',
      title: 'Tapir reintroduction program in Khao Sok',
      source: 'WCS Thailand',
      url: 'https://thailand.wcs.org'
    },
    {
      authors: 'World Wildlife Fund (WWF)',
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
    },
    {
      authors: 'Wildlife Research',
      year: '2023',
      title: 'Spatial navigation and memory in tropical mammals',
      source: 'Wildlife Research, 50(2), 118–126'
    }
  ];
  
  const handleReferencePress = (reference) => {
    if (reference.url) {
      Alert.alert(
        'Open External Link',
        `This will open "${reference.title}" in your browser. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Open', 
            onPress: () => {
              Linking.openURL(reference.url).catch(err => {
                console.error('Failed to open URL:', err);
                Alert.alert('Error', 'Unable to open the link. Please try again later.');
              });
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Reference Information',
        `${reference.title}\n\nAuthors: ${reference.authors}\nYear: ${reference.year}\nSource: ${reference.source}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[
        styles.headerSection,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border 
        }
      ]}>
        <MaterialIcons name="library-books" size={24} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[
          styles.sectionTitle,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          References
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={[
        styles.noticeCard,
        { 
          backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint 
        }
      ]}>
        <MaterialIcons name="info" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[
          styles.noticeText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          The following scientific references support the information presented in this Malayan Tapir lesson. 
          Content is displayed in English for academic consistency.
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.referencesScrollView}
        contentContainerStyle={styles.referencesContent}
        showsVerticalScrollIndicator={false}
      >
        {references.map((reference, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.referenceCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                shadowColor: isDark ? Colors.dark.text : Colors.light.text,
              }
            ]}
            onPress={() => handleReferencePress(reference)}
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
                <ThemedText style={[
                  styles.referenceTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]} numberOfLines={2}>
                  {reference.title}
                </ThemedText>
                
                <ThemedText style={[
                  styles.referenceAuthors,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]} numberOfLines={2}>
                  {reference.authors} ({reference.year})
                </ThemedText>
                
                <ThemedText style={[
                  styles.referenceSource,
                  { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
                ]} numberOfLines={2}>
                  {reference.source}
                </ThemedText>
              </ThemedView>
              
              {reference.url && (
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    gap: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  
  referencesScrollView: {
    flex: 1,
  },
  referencesContent: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  
  referenceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  referenceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
  },
  referenceInfo: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4,
  },
  referenceAuthors: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  referenceSource: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
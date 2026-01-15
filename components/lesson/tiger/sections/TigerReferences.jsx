// components/lesson/tiger/sections/TigerReferences.jsx
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

const PDF_DOWNLOAD_URL = 'https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751085268768.pdf';

export default function TigerReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [showNotice, setShowNotice] = useState(true);

  const bgSurface = isDark ? Colors.dark.surface : Colors.light.surface;
  const bdColor = isDark ? Colors.dark.border : Colors.light.border;
  const bgSecondary = isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary;
  const tint = isDark ? Colors.dark.tint : Colors.light.tint;
  const txtPrimary = isDark ? Colors.dark.text : Colors.light.text;
  const txtSecondary = isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
  const txtMuted = isDark ? Colors.dark.textMuted : Colors.light.textMuted;

  useEffect(() => {
    if (showNotice) {
      const timer = setTimeout(() => {
        setShowNotice(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotice]);

  const dismissNotice = () => {
    setShowNotice(false);
  };

  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    const scientificNamePattern = /(Panthera tigris(?:\s+jacksoni)?)/g;
    const parts = text.split(scientificNamePattern);
    
    if (parts.length === 1) {
      return <ThemedText style={style}>{text}</ThemedText>;
    }
    
    return (
      <ThemedText style={style}>
        {parts.map((part, index) => {
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

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'tiger-references.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'tiger-references.pdf'
        );
        try {
          const { uri } = await downloadResumable.downloadAsync();
          const isAvailable = await Sharing.isAvailableAsync();
          Alert.alert(
            'Download Complete',
            '',
            [
              { text: 'OK', style: 'cancel' },
              ...(isAvailable
                ? [
                    {
                      text: 'Open',
                      onPress: async () => {
                        try {
                          await Sharing.shareAsync(uri, {
                            mimeType: 'application/pdf',
                            dialogTitle: 'Open Tiger References PDF'
                          });
                        } catch {
                          Alert.alert('Error', 'Unable to open the file.');
                        }
                      }
                    }
                  ]
                : [])
            ]
          );
        } catch {
          Alert.alert('Download Failed', 'Unable to download the file.');
        }
      }
    } catch {
      Alert.alert('Error', 'An error occurred during download.');
    }
  };

  const references = [
    {
      authors: 'Department of Wildlife and National Parks Peninsular Malaysia, World Wide Fund for Nature Malaysia, & Wildlife Conservation Society Malaysia',
      year: '2016-2018',
      title: "Malaysia's first National Tiger Survey: Preliminary results",
      source: 'Department of Wildlife and National Parks Peninsular Malaysia',
      url: 'https://harimau.gov.my/malayantiger/'
    },
    {
      authors: 'Goodrich, J., Wibisono, H., Miquelle, D., Lynam, A., Sanderson, E., Chapman, S., Gray, T., Chanchani, P., & Harihar, A.',
      year: '2022',
      title: 'Panthera tigris (amended version of 2022 assessment)',
      source: 'The IUCN Red List of Threatened Species',
      url: 'https://www.iucnredlist.org/species/pdf/214862019/attachment'
    },
    {
      authors: 'Estes, J. A., Terborgh, J., Brashares, J. S., Power, M. E., Berger, J., Bond, W. J., Carpenter, S. R., Essington, T. E., Holt, R. D., Jackson, J. B. C., Marquis, R. J., Oksanen, L., Oksanen, T., Paine, R. T., Pikitch, E. K., Ripple, W. J., Sandin, S. A., Scheffer, M., Schoener, T. W., ... Wardle, D. A.',
      year: '2011',
      title: 'Trophic downgrading of planet Earth',
      source: 'Science, 333(6040), 301-306',
      url: 'https://doi.org/10.1126/science.1205106'
    },
    {
      authors: 'EndangeredTigers.org',
      year: '2021',
      title: 'Tiger conservation status guide 2022',
      source: 'Project Endangered Tigers',
      url: 'https://endangeredtigers.org/tiger-conservation-status-guide-2022/'
    },
    {
      authors: 'MyBIS (Malaysia Biodiversity Information System)',
      year: '2021',
      title: 'Panthera tigris (Linnaeus, 1758)',
      source: 'Malaysia Biodiversity Centre',
      url: 'https://www.mybis.gov.my/sp/20269'
    },
    {
      authors: 'Myers, P., Espinosa, R., Parr, C. S., Jones, T., Hammond, G. S., & Dewey, T. A.',
      year: '2025',
      title: 'Panthera tigris (tiger)',
      source: 'Animal Diversity Web, University of Michigan Museum of Zoology',
      url: 'https://animaldiversity.org/accounts/Panthera_tigris/'
    },
    {
      authors: 'WWF-Malaysia',
      year: '2023',
      title: 'Status of Malayan tigers',
      source: 'World Wide Fund for Nature Malaysia',
      url: 'https://www.wwf.org.my/tiger_facts/status_of_malayan_tigers/'
    },
    {
      authors: 'WWF-Malaysia',
      year: '2021',
      title: 'Tiger facts: Umbrella species and ecosystem role',
      source: 'World Wide Fund for Nature Malaysia',
      url: 'https://www.wwf.org.my/?23365%2FWWF-Malaysia-calls-attention-to-flagship-species-conservation-in-conjunction-with-World-Wildlife-Day'
    },
    {
      authors: 'IUCN (International Union for Conservation of Nature)',
      year: '2023',
      title: 'Global tiger status assessment supplementary information',
      source: 'IUCN Red List',
      url: 'https://www.iucnredlist.org/species/pdf/214862019/attachment'
    },
    {
      authors: 'Government of Malaysia & partners',
      year: '2008',
      title: 'The National Tiger Action Plan for Malaysia 2008-2020',
      source: 'Department of Wildlife and National Parks Peninsular Malaysia',
      url: 'https://www.traffic.org/site/assets/files/5503/dwnp_2008_national_tiger_action_plan_malaysia_2008-2020.pdf'
    },
    {
      authors: 'Luo, S. J., Kim, J. H., Johnson, W. E., van der Walt, J., Martenson, J., Yuhki, N., Miquelle, D. G., Uphyrkina, O., Goodrich, J. M., Quigley, H. B., Tilson, R., Brady, G., Martelli, P., Subramaniam, V., McDougal, C., Hean, S., Huang, S. Q., Pan, W., Karanth, U. K., ... O\'Brien, S. J.',
      year: '2018',
      title: "Genome-wide evolutionary analysis of natural history and adaptation in the world's tigers",
      source: 'Current Biology, 28(23), 3840-3849',
      url: 'https://doi.org/10.1016/j.cub.2018.09.019'
    },
    {
      authors: 'Mongabay',
      year: '2025',
      title: 'Smuggling networks exploit migrant debt to fuel tiger poaching in Malaysia, study shows',
      source: 'Mongabay',
      url: 'https://news.mongabay.com/2025/04/smuggling-networks-exploit-migrant-debt-to-fuel-tiger-poaching-in-malaysia-study-shows/'
    },
    {
      authors: 'TRAFFIC',
      year: '2023',
      title: 'Fighting corruption in wildlife crime',
      source: 'TRAFFIC International',
      url: 'https://www.traffic.org/what-we-do/perspectives/other-issues/fighting-corruption/'
    },
    {
      authors: 'Lynam, A. J., Jenks, K. E., Tantipisanuh, N., Chutipong, W., Ngoprasert, D., Gale, G. A., Steinmetz, R., Sukmasuang, R., Grassman, L. I., Jr., Cutter, P., Kitamura, S., Reed, D. H., Baker, M. C., McShea, W., Songsasen, N., & Leimgruber, P.',
      year: '2012',
      title: 'Terrestrial activity patterns of wild cats from camera-trapping',
      source: 'Raffles Bulletin of Zoology, 60(2), 407-415',
      url: 'https://conservewildcats.org/'
    },
    {
      authors: 'Ryan, D. M., & Linkie, M.',
      year: '2015',
      title: 'Conserving tigers in Malaysia: A science-driven approach for eliciting conservation policy change',
      source: 'Biological Conservation, 184, 18-26',
      url: 'https://doi.org/10.1016/j.biocon.2014.11.024'
    },
    {
      authors: 'Kenyir For Life',
      year: '2022',
      title: 'Kenyir wildlife corridor initiative',
      source: 'Rimba',
      url: 'https://rimba.ngo/past-projects/'
    },
    {
      authors: 'MPOGCF (Malaysian Palm Oil Green Conservation Foundation)',
      year: '2025',
      title: 'Biodiversity conservation projects: Kenyir connectivity initiatives',
      source: 'Malaysian Palm Oil Green Conservation Foundation',
      url: 'https://www.mpogcf.org/'
    },
    {
      authors: 'NTCA (National Tiger Conservation Authority)',
      year: '2023',
      title: 'All India Tiger Estimation Report 2022',
      source: 'Ministry of Environment, Forests and Climate Change, Government of India',
      url: 'https://ntca.gov.in/reports/'
    },
    {
      authors: 'Khan, M. M. H.',
      year: '2022',
      title: 'Tiger population trends in the Sundarbans of Bangladesh',
      source: 'Journal of Wildlife Conservation',
      url: 'https://www.tbsnews.net/features/panorama/has-tiger-population-increased-sundarbans-905401'
    },
    {
      authors: 'DWNP and Partners',
      year: '2020-2023',
      title: 'National Tiger Survey and monitoring reports',
      source: 'Department of Wildlife and National Parks Peninsular Malaysia, WWF-Malaysia, Wildlife Conservation Society, and partners',
      url: 'https://malaysia.wcs.org/About-Us/News/ID/23609/Malayan-tigers-risk-becoming-mere-symbol.aspx'
    }
  ];

  function handlePress(ref) {
    if (ref.url) {
      Alert.alert(
        'Open External Link',
        `This will open "${ref.title}" in your browser. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open',
            onPress: () => Linking.openURL(ref.url).catch(() => {
              Alert.alert('Error', 'Unable to open the link.');
            })
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
  }

  return (
    <ThemedView style={styles.container}>
      {showNotice && (
        <ThemedView style={[styles.notice, { backgroundColor: bgSecondary, borderLeftColor: tint }]}>
          <MaterialIcons name="info" size={20} color={tint} />
          <ThemedText 
            style={[
              styles.noticeText, 
              { 
                color: txtSecondary,
                paddingRight: 40
              }
            ]}
          >
            The following scientific references support the information presented in this Malayan Tiger lesson.
            Content is displayed in English for academic consistency.
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

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {references.map((ref, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.card,
              { backgroundColor: bgSurface, borderColor: bdColor, shadowColor: txtPrimary }
            ]}
            onPress={() => handlePress(ref)}
            activeOpacity={0.7}
          >
            <View style={styles.cardRow}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,152,0,0.1)' }]}>
                <MaterialIcons name="article" size={20} color={tint} />
              </View>
              <View style={styles.info}>
                {renderTextWithScientificNames(
                  ref.title,
                  [styles.titleText, { color: txtPrimary }]
                )}
                
                <ThemedText style={[styles.authorsText, { color: txtSecondary }]} numberOfLines={2}>
                  {ref.authors} ({ref.year})
                </ThemedText>
                <ThemedText style={[styles.sourceText, { color: txtMuted }]} numberOfLines={2}>
                  {ref.source}
                </ThemedText>
              </View>
              {ref.url && (
                <MaterialIcons name="open-in-new" size={18} color={txtMuted} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ThemedView style={styles.downloadSection}>
        <TouchableOpacity
          style={[
            styles.downloadButton,
            { backgroundColor: tint }
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
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, gap: 12 },
  headerText: { fontSize: 22, fontWeight: '600' },
  
  notice: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    margin: 16, 
    padding: 16, 
    borderRadius: 12, 
    borderLeftWidth: 4, 
    gap: 12,
    position: 'relative'
  },
  noticeText: { flex: 1, fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  dismissButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    borderRadius: 12,
  },
  
  list: { padding: 16, paddingTop: 0, gap: 12 },
  card: { borderRadius: 12, borderWidth: 1, padding: 16, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconContainer: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  titleText: { fontSize: 15, fontWeight: '600', lineHeight: 20, marginBottom: 4 },
  authorsText: { fontSize: 13, fontWeight: '500', marginBottom: 2 },
  sourceText: { fontSize: 12, fontStyle: 'italic' },
  
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
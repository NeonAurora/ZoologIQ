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

  const [showNotice, setShowNotice] = useState(true);

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

    const scientificNamePattern = /(Tapirus\s+indicus|Tapirus\s+pinchaque|Tapirus\s+\w+)/g;
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
      authors: 'Abdul Kadir, A. H., Magintan, D., Manimaran, S., & Mohd Azahar, M. I.',
      year: '2024',
      title: 'Malayan Tapir Conservation Initiatives and Its Challenges in Peninsular Malaysia',
      source: 'Journal of Wildlife and Parks, 39, 1-20',
      url: 'https://jwp.wildlife.gov.my/index.php/jwp/article/view/90'
    },
    {
      authors: 'Ariffin, N. A. T., Mustapha, M. A., Lihan, T., Khodri, N. F., Taher, T. M., Abdullah, N. I., & Md Nor, S.',
      year: '2025',
      title: 'Habitat suitability of Malayan tapir (Tapirus indicus) in a fragmented forest of Greater Taman Negara complex',
      source: 'Sains Malaysiana, 54(1), 5-18',
      url: 'https://www.ukm.my/jsm/english_journals/vol54num1_2025/vol54num1_2025pg%205.html'
    },
    {
      authors: 'Ariffin, N., Mahmud, F., & co-authors',
      year: '2025',
      title: 'Kesesuaian habitat Tapir Malaya (Tapirus indicus) di kawasan hutan Taman Negara',
      source: 'Sains Malaysiana, 54(1), 47-58',
      url: 'https://www.ukm.my/jsm/pdf_files/SM-PDF-54-1-2025/5.pdf'
    },
    {
      authors: 'Association of Zoos and Aquariums Tapir Taxon Advisory Group',
      year: '2014',
      title: 'Tapir tracks: A curriculum guide for educators',
      source: 'Association of Zoos and Aquariums',
      url: 'http://azaungulates.squarespace.com/s/TAPIR-TRACKS-A-Curriculum-Guide-for-Educators.pdf'
    },
    {
      authors: "Baird's Tapir Survival Alliance",
      year: '2018',
      title: 'Donate',
      source: "Baird's Tapir Survival Alliance",
      url: 'https://www.bairdstapir.org/donate'
    },
    {
      authors: 'Campbell, K., & co-authors',
      year: '2019',
      title: 'Analysing snare usage and the impacts of tiger poaching on a non-target species, the Malayan tapir',
      source: 'Biological Conservation, 234, 164-172',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0006320718305640'
    },
    {
      authors: 'Convention on Biological Diversity (CBD) & United Nations World Tourism Organisation (UNWTO)',
      year: '2015',
      title: 'Tourism Supporting Biodiversity: A Manual on Applying the CBD Guidelines on Biodiversity and Tourism Development',
      source: 'Montreal: CBD & UNWTO',
      url: 'https://www.cbd.int/tourism/doc/tourism-manual-2015-en.pdf'
    },
    {
      authors: 'Department of Wildlife and National Parks (DWNP)',
      year: '2022',
      title: 'Conservation of Malayan tapir (includes Malayan Tapir Conservation Action Plan 2021-2030)',
      source: 'Universiti Putra Malaysia',
      url: 'https://forenv.upm.edu.my/upload/dokumen/20221207163559E-book_-_Conservation_of_Malayan_Tapir_-_UPM.pdf'
    },
    {
      authors: 'Department of Wildlife and National Parks (DWNP)',
      year: '2024',
      title: 'Malayan tapir conservation initiatives and its challenges in Peninsular Malaysia',
      source: 'Journal of Wildlife and Parks, 21, 1-18',
      url: 'https://jwp.wildlife.gov.my/index.php/jwp/article/view/90'
    },
    {
      authors: 'Eagles, P. F. J., McCool, S. F., & Haynes, C. D.',
      year: '2002',
      title: 'Sustainable tourism in protected areas: Guidelines for planning and management',
      source: 'IUCN',
      url: 'https://digitallibrary.un.org/record/488792'
    },
    {
      authors: 'Earth.org',
      year: '2025',
      title: 'Malayan tapir: Threats and conservation efforts',
      source: 'Earth.org',
      url: 'https://earth.org/?endangered-species=endangered-species-spotlight-malayan-tapir'
    },
    {
      authors: 'EAZA',
      year: '2023',
      title: 'Malayan tapir EAZA Ex situ Programme (EEP)',
      source: 'EAZA',
      url: 'https://strapi.eaza.net/uploads/Malayan_tapir_EEP_EAZA_10_29_2024_3_02_14_PM_e1a80c4dd8.html'
    },
    {
      authors: 'Fauna & Flora',
      year: '2025',
      title: 'Please help save tapirs',
      source: 'Fauna & Flora',
      url: 'https://www.fauna-flora.org/appeals/save-tapirs/'
    },
    {
      authors: 'Holst, B., Beckmann, J., Zimmermann, M., Leus, K., & Voorham, M. (Eds.)',
      year: '2021',
      title: 'Regional collection plan for the EAZA Tapir and Suiform Taxon Advisory Group (1st ed.)',
      source: 'EAZA Executive Office',
      url: 'https://iucn.org/sites/default/files/2023-04/2021-iucn-ssc-peccary-sg-report_publication.pdf'
    },
    {
      authors: 'IUCN',
      year: '2017',
      title: 'Tapirus indicus',
      source: 'The IUCN Red List of Threatened Species 2017: e.T21472A45174127',
      url: 'https://www.iucnredlist.org/search?query=malayan%20tapir&searchType=species'
    },
    {
      authors: 'IUCN SSC Tapir Specialist Group',
      year: '2017',
      title: 'All about the terrific tapir',
      source: 'IUCN SSC Tapir Specialist Group',
      url: 'https://tapirs.org/tapirs/'
    },
    {
      authors: 'IUCN SSC Tapir Specialist Group',
      year: '2022',
      title: 'IUCN SSC Tapir Specialist Group -- Mission and activities',
      source: 'IUCN',
      url: 'https://www.iucn.org/our-union/commissions/group/iucn-ssc-tapir-specialist-group'
    },
    {
      authors: 'IUCN/SSC Tapir Specialist Group',
      year: '2011',
      title: 'Fifth International Tapir Symposium: Symposium program & book of abstracts',
      source: 'Fifth International Tapir Symposium, Kuala Lumpur, Malaysia',
      url: 'https://tapirs.org/wp-content/uploads/2017/03/5th-Intl-Tapir-Sympos-Abstracts.pdf'
    },
    {
      authors: 'IUCN/SSC Tapir Specialist Group (TSG) & AZA Tapir Taxon Advisory Group (TAG)',
      year: '2014',
      title: 'Tapir Tracks: A Curriculum Guide for Educators',
      source: 'IUCN/SSC TSG & AZA TAG',
      url: 'https://tapirs.org/wp-content/uploads/2018/06/TAPIR-TRACKS-A-Curriculum-Guide-for-Educators.pdf'
    },
    {
      authors: 'Kuehn, G.',
      year: '1978',
      title: 'Gestation period of Malayan tapir',
      source: 'Zoo Biology (referenced in Pukazhenthi et al., 2013)'
    },
    {
      authors: 'Kuswanda, W., Antoko, B., Novarino, W., & Siregar, R.',
      year: '2023',
      title: 'Species distribution model for the Asian tapir and vegetation characteristics of Batang Gadis National Park, North Sumatra, Indonesia',
      source: 'Tropical Life Sciences Research, 34(2), 203-225',
      url: 'https://ejournal.usm.my/tlsr/article/view/tlsr_vol34-no-2-2023_4'
    },
    {
      authors: 'Lim, Q. L., Kartono, A. P., Md-Zain, B. M., & Abdul-Patah, P.',
      year: '2022',
      title: 'Population genetic structure of wild Malayan tapirs (Tapirus indicus)',
      source: 'Global Ecology and Conservation, 38, e02206',
      url: 'https://www.sciencedirect.com/science/article/pii/S2351989422003237'
    },
    {
      authors: 'Magintan, D., Traeholt, C., Karuppannan, K. V., & Saaban, S.',
      year: '2021',
      title: 'Malayan tapir roadkill in Peninsular Malaysia from 2006 to 2019',
      source: 'Jurnal Hidupan Liar dan Taman Negara, 35, 57-68',
      url: 'https://jwp.wildlife.gov.my/index.php/jwp/article/view/59'
    },
    {
      authors: 'Magintan, D., Donny, Y., Enos, G., Rahmat, T., & Abdul-Kadir, A. H.',
      year: '2024',
      title: 'Malayan tapir conservation initiatives and its challenges in Peninsular Malaysia',
      source: 'Jurnal Hidupan Liar dan Taman Negara, 37, 1-18',
      url: 'https://jwp.wildlife.gov.my/index.php/jwp/article/view/90'
    },
    {
      authors: 'Malaysian Nature Society',
      year: '2025',
      title: 'Belum Temengor & MNS',
      source: 'Malaysian Nature Society',
      url: 'https://mns.my/belum-temengor-mns/'
    },
    {
      authors: 'Mohamad, M., & co-authors',
      year: '2019',
      title: 'Habitat utilization of a translocated Malayan tapir in a human-modified landscape',
      source: 'Journal of Sustainability Science and Management, 14(4), 77-92',
      url: 'https://jssm.umt.edu.my/wp-content/uploads/sites/51/2019/08/6.pdf'
    },
    {
      authors: 'Morrison, T.',
      year: '2025',
      title: 'Resilience and sustainability of a community: The story of Orang Asli of Royal Belum-Temengor Forest Complex, Malaysia',
      source: 'Academia.edu',
      url: 'https://www.academia.edu/12235244/Resilience_and_Sustainability_of_a_Community_the_Story_of_Orang_Asli_of_Royal_Belum_Temengor_Forest_Complex_Malaysia'
    },
    {
      authors: "O'Farrill, G., Galetti, M., & Campos-Arceiz, A.",
      year: '2013',
      title: 'Frugivory and seed dispersal by tapirs: An insight on their ecological role',
      source: 'Integrative Zoology, 8(1), 4-17',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23586556/'
    },
    {
      authors: 'Pérez-Flores, J., Reyna-Hurtado, R., & Calmé, S.',
      year: '2021',
      title: 'Human-wildlife conflicts and drought in the greater Calakmul region, Mexico: Implications for tapir conservation',
      source: 'Neotropical Biology and Conservation, 16(4), 687-707',
      url: 'https://neotropical.pensoft.net/article/71032/'
    },
    {
      authors: 'Pukazhenthi, B., Quse, V., Hoyer, M., van Engeldorp Gastelaars, H., Sanjur, O., & Brown, J. L.',
      year: '2013',
      title: 'A review of the reproductive biology and breeding management of tapirs',
      source: 'Integrative Zoology, 8(1), 18-34',
      url: 'https://doi.org/10.1111/j.1749-4877.2012.12008.x'
    },
    {
      authors: 'Pukazhenthi, B., & co-authors',
      year: '2013',
      title: 'A review of the reproductive biology and breeding management of tapirs',
      source: 'Reproduction in Domestic Animals, 48(Suppl. 1), 25-37',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23586557/'
    },
    {
      authors: 'Re:wild',
      year: '2022',
      title: 'Tapirs',
      source: 'Re:wild',
      url: 'https://www.rewild.org/get-to-know/tapirs'
    },
    {
      authors: 'Rose, P. E., & Roffey, R.',
      year: '2011',
      title: 'Adaptation of captive tapirs to zookeeping routines',
      source: 'Zoo Biology (referenced in behavior studies)'
    },
    {
      authors: 'San Diego Zoo Wildlife Alliance',
      year: '2019',
      title: 'Tapir',
      source: 'San Diego Zoo Wildlife Alliance',
      url: 'https://animals.sandiegozoo.org/animals/tapir'
    },
    {
      authors: 'Shabuddin, N. H. M., Kasmuri, N., Jalal, A. S. A., Nayono, S. E., & Ahmad, R.',
      year: '2025',
      title: 'Malayan tapir roadkill: Assessment towards road user awareness and mitigation strategies in Peninsular Malaysia',
      source: 'International Journal of Conservation Science, 16(1), 313-324',
      url: 'https://ijcs.ro/public/IJCS-25-01_22_Shabbudin.pdf'
    },
    {
      authors: 'Shwe, N. M., & Lynam, A. J.',
      year: '2012',
      title: 'A preliminary investigation of the status and threats to Malayan tapir Tapirus indicus in the Taninthayi Nature Reserve, Myanmar',
      source: 'Tapir Conservation, 21(29), 18-22',
      url: 'https://www.tapirconservation.org/index.php/tc/article/view/139'
    },
    {
      authors: 'Shwe, N. M., & co-authors',
      year: '2012',
      title: 'A preliminary investigation of the status and threats to tapirs in part of their Asian range',
      source: 'Tapir Conservation, 21(30), 19-24',
      url: 'https://www.tapirconservation.org/index.php/tc/article/download/139/128'
    },
    {
      authors: 'Suárez, C., & Lizcano, D. J.',
      year: '2002',
      title: 'Conflicts between subsistence farmers and crop-raiding mountain tapirs in Colombia',
      source: 'Tapir Conservation (IUCN/SSC Tapir Specialist Group newsletter)',
      url: 'https://tapirs.org/wp-content/uploads/2017/03/Tapir-Conservation-News-July-2015.pdf'
    },
    {
      authors: 'Suárez, J. A., & Lizcano, D. J.',
      year: '2002',
      title: 'Conflict between mountain tapirs (Tapirus pinchaque) and farmers in the Colombian Central Andes',
      source: 'Tapir Conservation, 11(2), 18-20',
      url: 'https://www.tapirconservation.org/index.php/tc/article/view/33'
    },
    {
      authors: 'Suwannaphong, N., Pattanavibool, A., Gale, G. A., & Rayan, D. M.',
      year: '2024',
      title: 'The effect of habitat fragmentation on Malay tapir (Tapirus indicus) occurrence in the Western Forest Complex of Thailand',
      source: 'Global Ecology and Conservation, 52, e03245',
      url: 'https://silvis.forest.wisc.edu/wp-content/uploads/sites/379/2024/12/Suwannaphong-s2.0-S2351989424003901-main.pdf'
    },
    {
      authors: 'Suwannaphong, S., & co-authors',
      year: '2024',
      title: 'The effect of habitat fragmentation on Malay tapir abundances in Thailand\'s protected areas',
      source: 'Global Ecology and Conservation, 54, e03186',
      url: 'https://www.sciencedirect.com/science/article/pii/S2351989424003901'
    },
    {
      authors: 'Tapir Valley Nature Reserve',
      year: '2023',
      title: 'Tapir Valley Nature Reserve -- Bijagua, Costa Rica',
      source: 'Tapir Valley Nature Reserve',
      url: 'https://www.tapirvalley.net'
    },
    {
      authors: 'The Straits Times',
      year: '2025',
      title: 'Tapirs top roadkill list in Malaysia',
      source: 'The Straits Times',
      url: 'https://www.straitstimes.com/asia/se-asia/tapirs-top-roadkill-list-in-malaysia'
    },
    {
      authors: 'Thongtip, N., & co-authors',
      year: '2010',
      title: 'Ejaculate characteristics of captive Malayan tapirs (Tapirus indicus)',
      source: 'Thai Journal of Veterinary Medicine, 40(4), 377-383',
      url: 'https://digital.car.chula.ac.th/cgi/viewcontent.cgi?article=2343&context=tjvm'
    },
    {
      authors: 'Traeholt, C., Kamal, N., Rayan, D. M., & Zaw, K. M.',
      year: '2016',
      title: 'Tapirus indicus',
      source: 'The IUCN Red List of Threatened Species 2016: e.T21472A45173636',
      url: 'https://www.iucnredlist.org/species/21472/45173636'
    },
    {
      authors: 'UNDP, SCBD, & UNEP-WCMC',
      year: '2021',
      title: 'Creating a nature-positive future: The contribution of protected areas and other effective area-based conservation measures',
      source: 'UNDP',
      url: 'https://www.undp.org/sites/g/files/zskgke326/files/2021-11/UNDP-UNEP-Creating-a-Nature-Positive-Future-EN.pdf'
    },
    {
      authors: 'United Nations Environment Programme',
      year: '2021',
      title: '2020 Asia Environmental Enforcement Awards: Malaysia\'s Operasi Bersepadu Khazanah (OBK) taskforce for tiger and wildlife protection',
      source: 'United Nations Malaysia',
      url: 'https://malaysia.un.org/en/113011-2020-asia-environmental-enforcement-awards'
    },
    {
      authors: 'Walb, R., & co-authors',
      year: '2021',
      title: 'Individual differences in the vocal communication of Malayan tapirs (Tapirus indicus) considering familiarity and relatedness',
      source: 'Animals, 11(4), 1026',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8065771/'
    },
    {
      authors: 'Waters, S. S.',
      year: '2007',
      title: 'Crop-raiding Baird\'s tapir provoke diverse reactions from subsistence farmers',
      source: 'Tapir Conservation, 16(1), 18-23',
      url: 'https://www.tapirconservation.org/index.php/tc/article/download/2/5/7'
    },
    {
      authors: 'Wong, C. W. C. T.',
      year: '2021',
      title: 'Malayan tapir behaviour, habitat use and density in Belum, Perak (Master\'s thesis)',
      source: 'Universiti Sains Malaysia',
      url: 'http://eprints.usm.my/55081/1/CHRISTOPHER%20WONG%20CHAI%20THIAM%20-%20TESIS.pdf'
    },
    {
      authors: 'World Wide Fund for Nature',
      year: '2021',
      title: 'Protect the Malayan tiger at all cost',
      source: 'WWF-Malaysia',
      url: 'https://www.wwf.org.my/?28605%2FProtect-the-Malayan-tiger-at-all-cost'
    },
    {
      authors: 'World Wide Fund for Nature',
      year: '2024',
      title: 'How wildlife help combat climate change',
      source: 'WWF',
      url: 'https://www.worldwildlife.org/resources/explainers/how-wildlife-help-combat-climate-change'
    },
    {
      authors: 'Zemanova, M. A., & co-authors',
      year: '2020',
      title: 'Comparing the impact of nutritional and sensory enrichment on the behaviour of zoo ungulates, including tapirs',
      source: 'Journal of Zoo and Aquarium Research, 8(2), 65-73',
      url: 'https://jzar.org/jzar/article/download/729/458/6031'
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
                paddingRight: 40
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
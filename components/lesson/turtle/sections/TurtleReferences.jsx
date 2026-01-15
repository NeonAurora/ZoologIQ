// components/lesson/turtle/sections/TurtleReferences.jsx

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
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PDF_URL = 'https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086680717.pdf';

export default function TurtleReferences() {
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

    const scientificNamePattern = /(Chelonia\s+mydas)/g;
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

  const handleDownload = () => {
    if (Platform.OS === 'web') {
      window.open(PDF_URL, '_blank');
    } else {
      Linking.openURL(PDF_URL).catch(() =>
        Alert.alert('Error', 'Unable to open PDF.')
      );
    }
  };

  const references = [
    {
      authors: 'U.S. Fish and Wildlife Service',
      year: '2022',
      title: 'Green Sea Turtle (Chelonia mydas)',
      source: 'U.S. Department of the Interior',
      url: 'https://www.fws.gov/species/green-sea-turtle-chelonia-mydas'
    },
    {
      authors: 'Al-Ghilani, N. M.',
      year: '2024',
      title: 'Ras Al Jinz Turtle Reserve conservation and eco-tourism initiatives',
      source: 'Oman Observer',
      url: 'https://www.omanobserver.om/article/1162848/business/economy/ras-al-jinz-turtle-reserve-attracts-eco-tourists'
    },
    {
      authors: 'Bjorndal, K. A.',
      year: '1997',
      title: 'Foraging ecology and nutrition of sea turtles',
      source: 'In P. L. Lutz & J. A. Musick (Eds.), The biology of sea turtles (pp. 199-231). CRC Press',
      url: 'https://georgehbalazs.com/wp-content/uploads/2020/04/BjorndalKA_1997_InThebiologyofseaturtles_p199-231-1.pdf'
    },
    {
      authors: 'De Veyra, R. T. R.',
      year: '1999',
      title: 'Turtle Islands Integrated Conservation and Development Project (ICDP): A collaborative government and NGO approach for management',
      source: 'Department of Environment and Natural Resources, Philippines',
      url: 'https://repository.seafdec.org/handle/20.500.12066/5618'
    },
    {
      authors: 'Goatley, C. H. R., Hoey, A. S., & Bellwood, D. R.',
      year: '2012',
      title: 'The role of turtles as coral reef macroherbivores',
      source: 'PLoS ONE, 7(6), e39979',
      url: 'https://doi.org/10.1371/journal.pone.0039979'
    },
    {
      authors: 'Hays, G. C., Mazaris, A. D., & Schofield, G.',
      year: '2025',
      title: 'Global decline in the size of sea turtles',
      source: 'Global Change Biology, 31(1), gcb.70225',
      url: 'https://doi.org/10.1111/gcb.70225'
    },
    {
      authors: 'IUCN Marine Turtle Specialist Group',
      year: '2023',
      title: 'Updated global conservation status and priorities for sea turtles',
      source: 'International Union for Conservation of Nature',
      url: 'https://www.int-res.com/articles/esr2025/56/n056p247.pdf'
    },
    {
      authors: 'Lutz, P. L., & Musick, J. A. (Eds.)',
      year: '1997',
      title: 'The biology of sea turtles, Volume I',
      source: 'CRC Press',
      url: 'https://doi.org/10.1201/9780203737088'
    },
    {
      authors: 'Lutz, P. L., Musick, J. A., & Wyneken, J. (Eds.)',
      year: '2002',
      title: 'The biology of sea turtles, Volume II (1st ed.)',
      source: 'CRC Press',
      url: 'https://doi.org/10.1201/9781420040807'
    },
    {
      authors: 'NOAA Fisheries',
      year: '2023',
      title: 'Sea turtles: Conservation and recovery',
      source: 'National Oceanic and Atmospheric Administration',
      url: 'https://www.fisheries.noaa.gov/sea-turtles'
    },
    {
      authors: 'NOAA Fisheries',
      year: '2025',
      title: 'Green turtle (Chelonia mydas) species information',
      source: 'National Oceanic and Atmospheric Administration',
      url: 'https://www.fisheries.noaa.gov/species/green-turtle'
    },
    {
      authors: 'Seminoff, J. A.',
      year: '2023',
      title: 'Green sea turtle nesting and reproduction',
      source: 'Marine Conservation Biology Institute',
      url: 'https://www.iucnredlist.org/species/4615/247654386'
    },
    {
      authors: 'Smithers, S. G., & Dawson, J. L.',
      year: '2023',
      title: 'Beach reprofiling to improve reproductive output at the world\'s largest remaining green turtle rookery: Raine Island, northern Great Barrier Reef',
      source: 'Geomorphology, 215, 1-18',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0964569122003611?via%3Dihub'
    },
    {
      authors: 'Spotila, J. R.',
      year: '2004',
      title: 'Sea turtles: A complete guide to their biology, behavior, and conservation',
      source: 'Johns Hopkins University Press',
      url: 'https://doi.org/10.56021/9780801880070'
    },
    {
      authors: 'Ting, A. J. L., & Binti Hassan, R.',
      year: '2025',
      title: 'A review of sea turtle awareness programmes in Malaysia',
      source: 'Borneo Journal of Resource Science and Technology, 15(1), 1-20',
      url: 'https://publisher.unimas.my/ojs/index.php/BJRST/article/view/7458'
    },
    {
      authors: 'Work, T. M., & Balazs, G. H.',
      year: '1999',
      title: 'Relating tumor score to hematology in green turtles with fibropapillomatosis in Hawaii',
      source: 'Journal of Wildlife Diseases, 35(4), 804-807',
      url: 'https://doi.org/10.7589/0090-3558-35.4.804'
    },
    {
      authors: 'World Wildlife Fund',
      year: '2023',
      title: 'Sea turtle conservation initiatives and programs',
      source: 'World Wildlife Fund',
      url: 'https://www.wwf.org'
    },
    {
      authors: 'World Wildlife Fund',
      year: '2025',
      title: 'Global green turtle population rebounds thanks to conservation efforts',
      source: 'World Wildlife Fund',
      url: 'https://wwf.panda.org/wwf_news/'
    },
    {
      authors: 'World Wildlife Fund-Guianas',
      year: '2023',
      title: 'National workshop to revise Suriname Sea Turtle Recovery Action Plan',
      source: 'World Wildlife Fund-Guianas',
      url: 'https://www.wwf.org.ec/?394790/National-Workshop-to-Revise-Suriname-Sea-Turtle-Recovery-Action-Plan'
    },
    {
      authors: 'World Wildlife Fund-Indonesia',
      year: '2023',
      title: 'Sea turtle conservation in Indonesia',
      source: 'World Wildlife Fund-Indonesia',
      url: 'http://www.wwf.id/en/learn/forest-wildlife/marine-etp/sea-turtle'
    },
    {
      authors: 'World Wildlife Fund-Malaysia',
      year: '2023',
      title: 'Redang Island and marine turtle conservation programs',
      source: 'World Wildlife Fund-Malaysia',
      url: 'https://www.wwf.org.my/how_you_can_help/donate_now/save_our_sea_turtles/'
    },
    {
      authors: 'Silva, A. C., Marco, A., da Graça, J., Pérez, H., Abella, E., Patino-Martínez, J., & Martins, S.',
      year: '2015',
      title: 'Coastal development at sea turtles\' nesting ground',
      source: 'Ocean & Coastal Management, 118, 118-128',
      url: 'https://doi.org/10.1016/j.ocecoaman.2015.07.021'
    }
  ];

  const handlePress = (ref) => {
    if (ref.url) {
      Alert.alert(
        'Open External Link',
        `This will open "${ref.title}" in your browser. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open',
            onPress: () =>
              Linking.openURL(ref.url).catch(() =>
                Alert.alert('Error', 'Unable to open the link.')
              )
          }
        ]
      );
    } else {
      Alert.alert(
        'Reference Details',
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

      {/* Dismissible Notice */}
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
                color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
              }
            ]}
          >
            The following scientific references support the information presented
            in this Green Sea Turtle lesson. Content is displayed in English for
            academic consistency.
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
            onPress={() => handlePress(ref)}
            activeOpacity={0.7}
          >
            <View style={styles.referenceHeader}>
              <View
                style={[
                  styles.referenceIcon,
                  { backgroundColor: 'rgba(0,128,128,0.1)' }
                ]}
              >
                <MaterialIcons
                  name="article"
                  size={20}
                  color={isDark ? Colors.dark.tint : Colors.light.tint}
                />
              </View>
              <View style={styles.referenceInfo}>
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
                    {
                      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
                    }
                  ]}
                  numberOfLines={1}
                >
                  {ref.authors} ({ref.year})
                </ThemedText>
                <ThemedText
                  style={[
                    styles.referenceSource,
                    {
                      color: isDark ? Colors.dark.textMuted : Colors.light.textMuted
                    }
                  ]}
                  numberOfLines={1}
                >
                  {ref.source}
                </ThemedText>
              </View>
              {ref.url && (
                <MaterialIcons
                  name="open-in-new"
                  size={18}
                  color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Download PDF Section */}
      <ThemedView style={styles.downloadSection}>
        <TouchableOpacity
          style={[
            styles.downloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownload}
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
    padding: 16,
    borderBottomWidth: 1
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12
  },

  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    position: 'relative'
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    marginLeft: 8,
    paddingRight: 32
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
    paddingHorizontal: 16,
    paddingBottom: 24
  },

  referenceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  referenceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  referenceInfo: { flex: 1 },
  referenceTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4
  },
  referenceAuthors: {
    fontSize: 13,
    fontWeight: '500'
  },
  referenceSource: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2
  },

  downloadSection: { 
    alignItems: 'center', 
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
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
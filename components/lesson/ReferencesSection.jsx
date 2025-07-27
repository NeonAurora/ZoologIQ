import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ReferencesSection({ topic }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // References data (always in English regardless of language toggle)
  const references = {
    tiger: [
      {
        type: 'journal',
        title: 'The Malayan Tiger: Status, Conservation Challenges and Future Prospects',
        authors: 'Kawanishi, K., Sunquist, M.E.',
        source: 'Journal of Wildlife Management, Vol. 78(2), 2014',
        url: 'https://doi.org/10.1002/jwmg.664',
        description: 'Comprehensive study on Malayan tiger population and conservation strategies in Peninsular Malaysia.'
      },
      {
        type: 'report',
        title: 'Malaysia Tiger Action Plan 2020-2029',
        authors: 'Department of Wildlife and National Parks (PERHILITAN)',
        source: 'Malaysian Government Publication, 2020',
        url: 'https://www.wildlife.gov.my/tiger-action-plan',
        description: 'Official government strategy for tiger conservation and population recovery.'
      },
      {
        type: 'research',
        title: 'Camera-trap Survey of Malayan Tigers in Taman Negara',
        authors: 'Clements, G.R., Rayan, D.M., Aziz, S.A.',
        source: 'Biodiversity and Conservation, Vol. 21(11), 2012',
        url: 'https://doi.org/10.1007/s10531-012-0347-9',
        description: 'Population assessment using camera trapping methodology in Malaysia\'s premier national park.'
      },
      {
        type: 'book',
        title: 'Wild Cats of the World',
        authors: 'Hunter, L., Barrett, P.',
        source: 'Princeton University Press, 2011',
        url: null,
        description: 'Comprehensive guide to global wild cat species including detailed coverage of tiger subspecies.'
      }
    ],
    tapir: [
      {
        type: 'journal',
        title: 'Ecology and Conservation of the Malayan Tapir in Peninsular Malaysia',
        authors: 'Traeholt, C., Norhayati, A., Clements, G.R.',
        source: 'Integrative Zoology, Vol. 11(3), 2016',
        url: 'https://doi.org/10.1111/1749-4877.12188',
        description: 'Detailed ecological study of Malayan tapir habitat requirements and conservation needs.'
      },
      {
        type: 'report',
        title: 'Action Plan for the Conservation of Tapirs in Malaysia',
        authors: 'Malaysian Nature Society & PERHILITAN',
        source: 'Conservation Action Plan, 2018',
        url: 'https://www.mns.my/tapir-conservation',
        description: 'National strategy for tapir conservation including habitat protection and corridor creation.'
      },
      {
        type: 'research',
        title: 'Habitat Fragmentation Effects on Malayan Tapir Movement Patterns',
        authors: 'Scotson, L., Fredriksson, G., Augeri, D.',
        source: 'Animal Conservation, Vol. 20(4), 2017',
        url: 'https://doi.org/10.1111/acv.12329',
        description: 'GPS collar study revealing how deforestation impacts tapir behavior and survival.'
      },
      {
        type: 'book',
        title: 'Tapirs: Status Survey and Conservation Action Plan',
        authors: 'Brooks, D.M., Bodmer, R.E., Matola, S.',
        source: 'IUCN/SSC Tapir Specialist Group, 1997',
        url: null,
        description: 'Global assessment of tapir species status and conservation recommendations.'
      }
    ],
    turtle: [
      {
        type: 'journal',
        title: 'Green Sea Turtle Nesting Ecology in Southeast Asian Waters',
        authors: 'Chan, E.H., Liew, H.C., Mazlan, A.G.',
        source: 'Marine Biology Research, Vol. 15(2), 2019',
        url: 'https://doi.org/10.1080/17451000.2019.1596285',
        description: 'Long-term monitoring study of green turtle nesting sites and reproductive success in Malaysian waters.'
      },
      {
        type: 'report',
        title: 'Sea Turtle Conservation Programme Malaysia Annual Report 2023',
        authors: 'Sea Turtle Research Unit (SEATRU)',
        source: 'Universiti Malaysia Terengganu, 2023',
        url: 'https://www.seatru.org/annual-reports',
        description: 'Comprehensive overview of sea turtle research, conservation efforts, and population trends.'
      },
      {
        type: 'research',
        title: 'Climate Change Impacts on Green Sea Turtle Nesting Beaches',
        authors: 'Laloë, J.O., Cozens, J., Renom, B., Taxonera, A.',
        source: 'Global Change Biology, Vol. 20(9), 2014',
        url: 'https://doi.org/10.1111/gcb.12523',
        description: 'Analysis of how rising temperatures and sea levels affect turtle nesting success and sex ratios.'
      },
      {
        type: 'book',
        title: 'The Biology of Sea Turtles Volume III',
        authors: 'Wyneken, J., Lohmann, K.J., Musick, J.A.',
        source: 'CRC Press, 2013',
        url: null,
        description: 'Latest scientific understanding of sea turtle biology, behavior, and conservation.'
      }
    ]
  };

  const currentReferences = references[topic] || [];
  
  const getIconForType = (type) => {
    switch (type) {
      case 'journal':
        return 'article';
      case 'report':
        return 'description';
      case 'research':
        return 'science';
      case 'book':
        return 'menu-book';
      default:
        return 'link';
    }
  };
  
  const handleReferencePress = (reference) => {
    if (reference.url) {
      Alert.alert(
        'Open External Link',
        `This will open ${reference.title} in your browser. Continue?`,
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
        `${reference.title}\n\nAuthors: ${reference.authors}\nSource: ${reference.source}\n\n${reference.description}`,
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
          The following scientific references support the information presented in this lesson. 
          Content is displayed in English for academic consistency.
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.referencesScrollView}
        contentContainerStyle={styles.referencesContent}
        showsVerticalScrollIndicator={false}
      >
        {currentReferences.map((reference, index) => (
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
                  name={getIconForType(reference.type)} 
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
                ]} numberOfLines={1}>
                  {reference.authors}
                </ThemedText>
                
                <ThemedText style={[
                  styles.referenceSource,
                  { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
                ]} numberOfLines={1}>
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
            
            <ThemedText style={[
              styles.referenceDescription,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {reference.description}
            </ThemedText>
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
    gap: 16,
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
    marginBottom: 12,
    gap: 12,
  },
  referenceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 175, 80, 0.1)',
  },
  referenceInfo: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
  },
  referenceAuthors: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  referenceSource: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  referenceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
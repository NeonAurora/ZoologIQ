import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Turtle-specific references from assets/lessonContents/turtle.txt
  const references = [
    {
      authors: 'Bjorndal, K. A.',
      year: '1997',
      title: 'Foraging ecology and nutrition of sea turtles',
      source: 'In P. L. Lutz & J. A. Musick (Eds.), The biology of sea turtles (pp. 199–232). CRC Press'
    },
    {
      authors: 'Bjorndal, K. A., Bolten, A. B., & Chaloupka, M. Y.',
      year: '2003',
      title: 'Survival probability estimates for immature green turtles (Chelonia mydas) in the Bahamas',
      source: 'Marine Ecology Progress Series, 252, 273–281',
      url: 'https://doi.org/10.3354/meps252273'
    },
    {
      authors: 'Great Barrier Reef Marine Park Authority',
      year: '2023',
      title: 'Raine Island Recovery Project',
      source: 'Great Barrier Reef Marine Park Authority',
      url: 'https://www.gbrmpa.gov.au'
    },
    {
      authors: 'IUCN',
      year: '2023',
      title: 'Green turtle (Chelonia mydas). The IUCN Red List of Threatened Species',
      source: 'IUCN Red List',
      url: 'https://www.iucnredlist.org/species/4615/11037468'
    },
    {
      authors: 'Lutz, P. L., & Musick, J. A. (Eds.)',
      year: '1997',
      title: 'The biology of sea turtles',
      source: 'CRC Press'
    },
    {
      authors: 'NOAA',
      year: '2023',
      title: 'Green sea turtle (Chelonia mydas)',
      source: 'National Oceanic and Atmospheric Administration',
      url: 'https://www.fisheries.noaa.gov/species/green-turtle'
    },
    {
      authors: 'Spotila, J. R.',
      year: '2004',
      title: 'Sea turtles: A complete guide to their biology, behavior, and conservation',
      source: 'Johns Hopkins University Press'
    },
    {
      authors: 'WWF',
      year: '2023',
      title: 'Marine turtles',
      source: 'World Wide Fund for Nature',
      url: 'https://www.worldwildlife.org/species/marine-turtle'
    },
    {
      authors: 'WWF Indonesia',
      year: '2023',
      title: 'Turtle conservation in Bali',
      source: 'WWF Indonesia',
      url: 'https://www.wwf.or.id'
    },
    {
      authors: 'WWF Malaysia',
      year: '2023',
      title: 'Sea turtle conservation programs',
      source: 'WWF Malaysia',
      url: 'https://www.wwf.org.my'
    },
    {
      authors: 'WWF Philippines',
      year: '2023',
      title: 'Marine turtle protection',
      source: 'WWF Philippines',
      url: 'https://www.wwf.org.ph'
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
          The following scientific references support the information presented in this Green Sea Turtle lesson. 
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
    backgroundColor: 'rgba(0, 128, 128, 0.1)',
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
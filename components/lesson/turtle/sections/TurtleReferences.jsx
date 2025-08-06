// components/lesson/turtle/sections/TurtleReferences.jsx

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  View
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TurtleReferences() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Helper function to render text with scientific names in italic
  const renderTextWithScientificNames = (text, style) => {
    if (!text || typeof text !== 'string') {
      return <ThemedText style={style}>{text}</ThemedText>;
    }

    // Pattern to match scientific names (genus + species format)
    // This will match "Chelonia mydas" and other turtle scientific names
    const scientificNamePattern = /(Chelonia\s+mydas|Chelonia\s+\w+)/g;
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

  const references = [
    {
      authors: 'Bjorndal, K. A.',
      year: '1997',
      title: 'Foraging ecology and nutrition of sea turtles',
      source:
        'In P. L. Lutz & J. A. Musick (Eds.), The biology of sea turtles (pp. 199–232). CRC Press',
    },
    {
      authors: 'Bjorndal, K. A., Bolten, A. B., & Chaloupka, M. Y.',
      year: '2003',
      title:
        'Survival probability estimates for immature green turtles (Chelonia mydas) in the Bahamas',
      source: 'Marine Ecology Progress Series, 252, 273–281',
      url: 'https://doi.org/10.3354/meps252273',
    },
    {
      authors: 'Great Barrier Reef Marine Park Authority',
      year: '2023',
      title: 'Raine Island Recovery Project',
      source: 'Great Barrier Reef Marine Park Authority',
      url: 'https://www.gbrmpa.gov.au',
    },
    {
      authors: 'IUCN',
      year: '2023',
      title:
        'Green turtle (Chelonia mydas). The IUCN Red List of Threatened Species',
      source: 'IUCN Red List',
      url: 'https://www.iucnredlist.org/species/4615/11037468',
    },
    {
      authors: 'Lutz, P. L., & Musick, J. A. (Eds.)',
      year: '1997',
      title: 'The biology of sea turtles',
      source: 'CRC Press',
    },
    {
      authors: 'NOAA',
      year: '2023',
      title: 'Green sea turtle (Chelonia mydas)',
      source: 'National Oceanic and Atmospheric Administration',
      url: 'https://www.fisheries.noaa.gov/species/green-turtle',
    },
    {
      authors: 'Spotila, J. R.',
      year: '2004',
      title:
        'Sea turtles: A complete guide to their biology, behavior, and conservation',
      source: 'Johns Hopkins University Press',
    },
    {
      authors: 'WWF',
      year: '2023',
      title: 'Marine turtles',
      source: 'World Wide Fund for Nature',
      url: 'https://www.worldwildlife.org/species/marine-turtle',
    },
    {
      authors: 'WWF Indonesia',
      year: '2023',
      title: 'Turtle conservation in Bali',
      source: 'WWF Indonesia',
      url: 'https://www.wwf.or.id',
    },
    {
      authors: 'WWF Malaysia',
      year: '2023',
      title: 'Sea turtle conservation programs',
      source: 'WWF Malaysia',
      url: 'https://www.wwf.org.my',
    },
    {
      authors: 'WWF Philippines',
      year: '2023',
      title: 'Marine turtle protection',
      source: 'WWF Philippines',
      url: 'https://www.wwf.org.ph',
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
            backgroundColor: isDark
              ? Colors.dark.surface
              : Colors.light.surface,
            borderBottomColor: isDark
              ? Colors.dark.border
              : Colors.light.border
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

      {/* Notice */}
      <ThemedView
        style={[
          styles.noticeCard,
          {
            backgroundColor: isDark
              ? Colors.dark.background
              : Colors.light.background,
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
              color: isDark
                ? Colors.dark.textSecondary
                : Colors.light.textSecondary
            }
          ]}
        >
          The following scientific references support the information presented
          in this Green Sea Turtle lesson. Content is displayed in English for
          academic consistency.
        </ThemedText>
      </ThemedView>

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
                backgroundColor: isDark
                  ? Colors.dark.surface
                  : Colors.light.surface,
                borderColor: isDark
                  ? Colors.dark.border
                  : Colors.light.border
              }
            ]}
            onPress={() => handlePress(ref)}
            activeOpacity={0.7}
          >
            <View style={styles.referenceHeader}>
              <View
                style={[
                  styles.referenceIcon,
                  {
                    backgroundColor: 'rgba(0,128,128,0.1)'
                  }
                ]}
              >
                <MaterialIcons
                  name="article"
                  size={20}
                  color={isDark ? Colors.dark.tint : Colors.light.tint}
                />
              </View>
              <View style={styles.referenceInfo}>
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
                    {
                      color: isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
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
                      color: isDark
                        ? Colors.dark.textMuted
                        : Colors.light.textMuted
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
                  color={
                    isDark ? Colors.dark.textMuted : Colors.light.textMuted
                  }
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

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
    borderLeftWidth: 4
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    marginLeft: 8
  },

  referencesScrollView: {
    flex: 1
  },
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
  referenceInfo: {
    flex: 1
  },
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
  }
});
// components/lesson/tapir/sections/TapirInfographics.jsx
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  View
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TapirInfographics() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { width } = useWindowDimensions();
  const cardHorizontalPadding = 16;
  const imageWidth = width - cardHorizontalPadding * 2;
  
  const infographics = [
    {
      id: 1,
      title: 'Tapir Evolutionary Timeline & Ancient Origins',
      description:
        'Fascinating journey through the evolutionary history of tapirs, showcasing their ancient lineage and prehistoric connections.',
      image: require('@/assets/images/Tapir1.png'),
      caption:
        'Evolutionary timeline showing tapir development over millions of years and their relationship to other prehistoric mammals.'
    },
    {
      id: 2,
      title: 'Tapir Habitat & Ecosystem Role',
      description:
        'Comprehensive overview of tapir habitats, their crucial role as seed dispersers, and ecosystem connectivity.',
      image: require('@/assets/images/Tapir2.png'),
      caption:
        'Detailed habitat map and ecological role analysis showing how tapirs maintain rainforest biodiversity through seed dispersal.'
    }
  ];

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
          name="auto-awesome"
          size={24}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
          style={styles.headerIcon}
        />
        <ThemedText
          style={[
            styles.sectionTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
        >
          Infographics
        </ThemedText>
      </ThemedView>

      {/* Intro */}
      <ThemedView
        style={[
          styles.introCard,
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
          style={styles.introIcon}
        />
        <ThemedText
          style={[
            styles.introText,
            {
              color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
            }
          ]}
        >
          Discover fascinating visual information about the Malayan Tapir through these detailed infographics. Each illustration provides unique insights into these remarkable ancient creatures.
        </ThemedText>
      </ThemedView>

      {/* Cards */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {infographics.map((item) => (
          <ThemedView
            key={item.id}
            style={[
              styles.infographicCard,
              {
                backgroundColor: isDark
                  ? Colors.dark.surface
                  : Colors.light.surface,
                borderColor: isDark
                  ? Colors.dark.border
                  : Colors.light.border,
                shadowColor: isDark ? Colors.dark.text : Colors.light.text
              }
            ]}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.numberBadge,
                  { backgroundColor: isDark ? '#8D6E63' : '#BCAAA4' }
                ]}
              >
                <ThemedText
                  style={[
                    styles.numberText,
                    {
                      color: isDark
                        ? Colors.dark.background
                        : Colors.light.background
                    }
                  ]}
                >
                  {item.id}
                </ThemedText>
              </View>
              <View style={styles.headerTextContainer}>
                <ThemedText
                  style={[
                    styles.infographicTitle,
                    { color: isDark ? Colors.dark.text : Colors.light.text }
                  ]}
                >
                  {item.title}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.infographicDescription,
                    {
                      color: isDark
                        ? Colors.dark.textSecondary
                        : Colors.light.textSecondary
                    }
                  ]}
                >
                  {item.description}
                </ThemedText>
              </View>
            </View>

            {/* Image */}
            <Image
              source={item.image}
              style={[
                styles.infographicImage,
                {
                  width: imageWidth,
                  height: imageWidth * 0.75,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}
              resizeMode="contain"
            />

            {/* Caption */}
            <View
              style={[
                styles.captionContainer,
                {
                  backgroundColor: isDark
                    ? Colors.dark.background
                    : Colors.light.background
                }
              ]}
            >
              <MaterialIcons
                name="image"
                size={16}
                color={
                  isDark ? Colors.dark.textMuted : Colors.light.textMuted
                }
                style={styles.captionIcon}
              />
              <ThemedText
                style={[
                  styles.captionText,
                  {
                    color: isDark
                      ? Colors.dark.textMuted
                      : Colors.light.textMuted
                  }
                ]}
              >
                {item.caption}
              </ThemedText>
            </View>
          </ThemedView>
        ))}

        {/* Completion */}
        <ThemedView
          style={[
            styles.completionCard,
            {
              backgroundColor: isDark
                ? Colors.dark.background
                : Colors.light.background,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}
        >
          <MaterialIcons
            name="check-circle"
            size={24}
            color="#4CAF50"
            style={styles.completionIcon}
          />
          <ThemedText
            style={[
              styles.completionText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            You’ve explored all tapir infographics! These visual materials
            enhance your understanding of the fascinating world of Malayan
            Tapirs. Proceed to the references section for scholarly sources.
          </ThemedText>
        </ThemedView>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1
  },
  headerIcon: {
    marginRight: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600'
  },

  introCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 12,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4
  },
  introIcon: {
    marginRight: 8,
    marginTop: 2
  },
  introText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic'
  },

  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 12
  },

  infographicCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  numberText: {
    fontSize: 14,
    fontWeight: '700'
  },
  headerTextContainer: {
    flex: 1
  },
  infographicTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 22
  },
  infographicDescription: {
    fontSize: 14,
    lineHeight: 20
  },

  infographicImage: {
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 12
  },

  captionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12
  },
  captionIcon: {
    marginRight: 6,
    marginTop: 2
  },
  captionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic'
  },

  completionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24
  },
  completionIcon: {
    marginRight: 8,
    marginTop: 2
  },
  completionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20
  }
});

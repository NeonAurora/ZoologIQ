// components/lesson/turtle/sections/TurtleInfographics.jsx

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  View
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function TurtleInfographics() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const infographics = [
    {
      id: 1,
      title: 'Life Cycle & Migration Patterns',
      description: 'Overview from hatchling to adult, including epic migration routes.',
      image: require('@/assets/images/Turtle1.png'),
      caption: 'Stages of turtle development and ocean migrations.'
    },
    {
      id: 2,
      title: 'Anatomy & Adaptations',
      description: 'Breakdown of specialized features for diving and navigation.',
      image: require('@/assets/images/Turtle2.png'),
      caption: 'Anatomical guide to sea turtle adaptations.'
    },
    {
      id: 3,
      title: 'Threats & Conservation',
      description: 'Visual analysis of threats and conservation initiatives.',
      image: require('@/assets/images/Turtle3.png'),
      caption: 'Challenges and successes in protecting populations.'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={[
        styles.headerSection,
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <MaterialIcons name="auto-awesome" size={24} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[
          styles.sectionTitle,
          { color: isDark ? Colors.dark.text : Colors.light.text }
        ]}>
          Infographics
        </ThemedText>
      </ThemedView>

      {/* Intro */}
      <ThemedView style={[
        styles.introCard,
        {
          backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
        }
      ]}>
        <MaterialIcons
          name="info"
          size={20}
          color={isDark ? Colors.dark.tint : Colors.light.tint}
          style={styles.introIcon}
        />
        <ThemedText style={[
          styles.introText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          Dive into the world of Green Sea Turtles through these visual guides. Each infographic reveals fascinating details about these ancient ocean travelers.
        </ThemedText>
      </ThemedView>

      {/* Cards */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {infographics.map(item => (
          <ThemedView
            key={item.id}
            style={[
              styles.infographicCard,
              {
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={[
                styles.numberBadge,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]}>
                <ThemedText style={[
                  styles.numberText,
                  { color: isDark ? Colors.dark.background : Colors.light.background }
                ]}>
                  {item.id}
                </ThemedText>
              </View>
              <View style={styles.headerTextContainer}>
                <ThemedText style={[
                  styles.infographicTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {item.title}
                </ThemedText>
                <ThemedText style={[
                  styles.infographicDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {item.description}
                </ThemedText>
              </View>
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                source={item.image}
                style={[
                  styles.infographicImage,
                  { borderColor: isDark ? Colors.dark.border : Colors.light.border }
                ]}
                resizeMode="contain"
              />
            </View>

            {/* Caption */}
            <View style={[
              styles.captionContainer,
              { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
            ]}>
              <MaterialIcons
                name="image"
                size={16}
                color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
                style={styles.captionIcon}
              />
              <ThemedText style={[
                styles.captionText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                {item.caption}
              </ThemedText>
            </View>
          </ThemedView>
        ))}

        {/* Completion */}
        <ThemedView style={[
          styles.completionCard,
          {
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.completionIcon}/>
          <ThemedText style={[
            styles.completionText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            You’ve completed all turtle infographics! Continue to references for additional study materials.
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

  // Header
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12
  },

  // Intro
  introCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginVertical: 8,
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

  // ScrollView
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24
  },

  // Infographic card
  infographicCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },

  // Card header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  numberText: {
    fontSize: 16,
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

  // Image
  imageContainer: {
    alignItems: 'center',
    paddingHorizontal: 12
  },
  infographicImage: {
    width: screenWidth - 48,    // screenWidth minus padding horizontal (16*2) and margin
    height: ((screenWidth - 48) * 3) / 4, // 4:3 aspect ratio
    borderRadius: 12,
    borderWidth: 1
  },

  // Caption
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
  },
  captionIcon: {
    marginRight: 8
  },
  captionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic'
  },

  // Completion
  completionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32
  },
  completionIcon: {
    marginRight: 12
  },
  completionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500'
  }
});

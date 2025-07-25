import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function TigerInfographics() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Tiger infographics data
  const infographics = [
    {
      id: 1,
      title: 'Tiger Anatomy & Physical Characteristics',
      description: 'Detailed visual guide showing the unique physical features and anatomical structure of the Malayan Tiger.',
      image: require('@/assets/images/Tiger1.png'),
      caption: 'Visual breakdown of tiger anatomy including distinctive stripe patterns, muscle structure, and key physical measurements.'
    },
    {
      id: 2,
      title: 'Tiger Habitat & Territory Range',
      description: 'Comprehensive map and habitat analysis showing the current and historical range of Malayan Tigers in Southeast Asia.',
      image: require('@/assets/images/Tiger2.png'),
      caption: 'Geographic distribution, preferred habitats, and territory size requirements for tiger populations in Malaysia.'
    },
    {
      id: 3,
      title: 'Conservation Status & Population Data',
      description: 'Statistical overview of current tiger populations, threats, and conservation efforts across their range.',
      image: require('@/assets/images/Tiger3.png'),
      caption: 'Population trends, conservation milestones, and key statistics about Malayan Tiger recovery programs.'
    }
  ];

  return (
    <ThemedView style={styles.container}>
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
      
      <ThemedView style={[
        styles.introCard,
        { 
          backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
          borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint 
        }
      ]}>
        <MaterialIcons name="info" size={20} color={isDark ? Colors.dark.tint : Colors.light.tint} />
        <ThemedText style={[
          styles.introText,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          Explore these detailed visual guides that illustrate key concepts about the Malayan Tiger. 
          Each infographic provides comprehensive information in an easy-to-understand format.
        </ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {infographics.map((infographic) => (
          <ThemedView
            key={infographic.id}
            style={[
              styles.infographicCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                shadowColor: isDark ? Colors.dark.text : Colors.light.text,
              }
            ]}
          >
            <ThemedView style={styles.cardHeader}>
              <ThemedView style={styles.numberBadge}>
                <ThemedText style={[
                  styles.numberText,
                  { color: isDark ? Colors.dark.background : Colors.light.background }
                ]}>
                  {infographic.id}
                </ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.headerTextContainer}>
                <ThemedText style={[
                  styles.infographicTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {infographic.title}
                </ThemedText>
                
                <ThemedText style={[
                  styles.infographicDescription,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {infographic.description}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.imageContainer}>
              <Image
                source={infographic.image}
                style={[
                  styles.infographicImage,
                  { 
                    borderColor: isDark ? Colors.dark.border : Colors.light.border,
                  }
                ]}
                resizeMode="contain"
              />
            </ThemedView>
            
            <ThemedView style={[
              styles.captionContainer,
              { backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary }
            ]}>
              <MaterialIcons 
                name="image" 
                size={16} 
                color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
              />
              <ThemedText style={[
                styles.captionText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                {infographic.caption}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
        
        <ThemedView style={[
          styles.completionCard,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border 
          }
        ]}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <ThemedText style={[
            styles.completionText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            You've viewed all tiger infographics! These visual guides complement the detailed information 
            covered in the previous sections. Continue to the references section for additional reading materials.
          </ThemedText>
        </ThemedView>
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
  
  introCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    gap: 12,
  },
  introText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    gap: 20,
  },
  
  infographicCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    gap: 16,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTextContainer: {
    flex: 1,
  },
  infographicTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  infographicDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  imageContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  infographicImage: {
    width: screenWidth - 64,
    height: (screenWidth - 64) * 0.75, // 4:3 aspect ratio
    borderRadius: 12,
    borderWidth: 1,
  },
  
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 8,
  },
  captionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  
  completionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginTop: 8,
  },
  completionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
// components/lesson/turtle/sections/TurtleConservation.jsx
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function TurtleConservation() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  // 🔒 HARDCODED PDF URL - Replace with your actual PDF URL
  const PDF_DOWNLOAD_URL = "https://ttzwlqozaglnczfdjhnl.supabase.co/storage/v1/object/public/lesson-materials/pdfs/1751086680717.pdf";

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = PDF_DOWNLOAD_URL;
        link.download = 'turtle-conservation-guide.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile download
        const downloadResumable = FileSystem.createDownloadResumable(
          PDF_DOWNLOAD_URL,
          FileSystem.documentDirectory + 'turtle-conservation-guide.pdf'
        );

        try {
          const { uri } = await downloadResumable.downloadAsync();
          
          // Check if sharing is available
          const isAvailable = await Sharing.isAvailableAsync();
          
          Alert.alert(
            'Download Complete',
            '', // ← Empty message
            [
              { text: 'Cancel', style: 'default' },
              ...(isAvailable ? [{ 
                text: 'Open', 
                onPress: async () => {
                  try {
                    await Sharing.shareAsync(uri, {
                      mimeType: 'application/pdf',
                      dialogTitle: 'Open Turtle Conservation Guide'
                    });
                  } catch (shareError) {
                    console.error('Error opening file:', shareError);
                    Alert.alert('Error', 'Unable to open the file. You can find it in your Downloads folder.');
                  }
                },
                style: 'default'
              }] : [])
            ]
          );
        } catch (error) {
          console.error('Download failed:', error);
          Alert.alert('Download Failed', 'Unable to download the file. Please try again.');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'An error occurred while downloading the file.');
    }
  };

  const conservationStrategies = [
    {
      icon: '🏛️',
      title: 'Marine Protected Areas',
      description: 'Establish and enforce MPAs to safeguard critical habitats such as nesting and feeding grounds',
      status: 'Active',
      color: '#2196F3'
    },
    {
      icon: '🎣',
      title: 'Sustainable Fishing Practices',
      description: 'Implement turtle excluder devices (TEDs) and enforce bycatch reduction measures',
      status: 'Expanding',
      color: '#4CAF50'
    },
    {
      icon: '🌱',
      title: 'Habitat Restoration',
      description: 'Rehabilitate degraded nesting beaches and seagrass meadows to support turtle populations',
      status: 'Ongoing',
      color: '#8BC34A'
    },
    {
      icon: '⚖️',
      title: 'Legislation & Enforcement',
      description: 'Strengthen laws against poaching, illegal trade, and habitat destruction',
      status: 'Critical',
      color: '#FF9800'
    },
    {
      icon: '🌡️',
      title: 'Climate Adaptation',
      description: 'Implement strategies to manage rising temperatures and protect coastal nesting sites',
      status: 'Urgent',
      color: '#F44336'
    },
    {
      icon: '👥',
      title: 'Community Engagement',
      description: 'Involve local communities in conservation efforts through education and eco-tourism initiatives',
      status: 'Growing',
      color: '#9C27B0'
    }
  ];

  const successStories = [
    {
      location: 'Redang Island, Malaysia',
      achievement: 'Conservation programs have increased nesting activity through protected beaches and eco-tourism initiatives',
      flag: '🇲🇾'
    },
    {
      location: 'Hawaii, USA',
      achievement: 'The Green Sea Turtle population rebounded after the 1978 listing under the U.S. Endangered Species Act',
      flag: '🇺🇸'
    },
    {
      location: 'Tortuguero, Costa Rica',
      achievement: 'Community-driven conservation programs have led to a steady increase in nesting turtles',
      flag: '🇨🇷'
    },
    {
      location: 'Australia',
      achievement: 'Raine Island Recovery Project restored nesting habitats, significantly improving hatchling success rates',
      flag: '🇦🇺'
    },
    {
      location: 'Bali, Indonesia',
      achievement: 'Community involvement and legal action against poaching have reduced the trade in turtle products',
      flag: '🇮🇩'
    },
    {
      location: 'Oman',
      achievement: 'Protected areas such as Ras Al Jinz have become sanctuaries for nesting turtles, supported by eco-tourism',
      flag: '🇴🇲'
    }
  ];

  const howToHelp = [
    {
      action: 'Protect Nesting Beaches',
      description: 'Establish protected areas to prevent human disturbances during nesting',
      icon: '🏖️'
    },
    {
      action: 'Reduce Bycatch',
      description: 'Use turtle excluder devices (TEDs) in fishing gear to minimize accidental captures',
      icon: '🎣'
    },
    {
      action: 'Combat Pollution',
      description: 'Reduce plastic use, promote recycling, and conduct ocean cleanup drives',
      icon: '🌊'
    },
    {
      action: 'Mitigate Climate Change',
      description: 'Support policies that reduce carbon emissions and protect coastal habitats',
      icon: '🌍'
    },
    {
      action: 'Ban Illegal Trade',
      description: 'Enforce laws against poaching and the sale of turtle products',
      icon: '🚫'
    },
    {
      action: 'Raise Awareness',
      description: 'Educate local communities and tourists about the importance of turtles in ecosystems',
      icon: '📢'
    }
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Conservation Strategies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="shield" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Conservation Strategies</ThemedText>
        </View>

        <View style={styles.strategiesGrid}>
          {conservationStrategies.map((strategy, index) => (
            <View key={index} style={[
              styles.strategyCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.strategyHeader}>
                <View style={[styles.strategyIcon, { backgroundColor: `${strategy.color}20` }]}>
                  <ThemedText style={styles.strategyEmoji}>{strategy.icon}</ThemedText>
                </View>
                <View style={styles.strategyTitleContainer}>
                  <ThemedText style={styles.strategyTitle}>{strategy.title}</ThemedText>
                  <View style={[styles.statusBadge, { backgroundColor: strategy.color }]}>
                    <ThemedText style={styles.statusText}>{strategy.status}</ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={styles.strategyDesc}>{strategy.description}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Success Stories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="celebration" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>Conservation Success Stories</ThemedText>
        </View>

        <View style={styles.successGrid}>
          {successStories.map((story, index) => (
            <View key={index} style={[
              styles.successCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.successHeader}>
                <ThemedText style={styles.flag}>{story.flag}</ThemedText>
                <ThemedText style={styles.location}>{story.location}</ThemedText>
              </View>
              <ThemedText style={styles.achievement}>{story.achievement}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* How You Can Help */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name="volunteer-activism" 
            size={20} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.sectionTitle}>How You Can Help</ThemedText>
        </View>

        <View style={styles.helpGrid}>
          {howToHelp.map((help, index) => (
            <View key={index} style={[
              styles.helpCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <View style={styles.helpHeader}>
                <ThemedText style={styles.helpIcon}>{help.icon}</ThemedText>
                <ThemedText style={styles.helpAction}>{help.action}</ThemedText>
              </View>
              <ThemedText style={styles.helpDesc}>{help.description}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Research & Monitoring */}
      <View style={styles.section}>
        <View style={[
          styles.researchCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.researchHeader}>
            <MaterialIcons name="science" size={20} color="#2196F3" />
            <ThemedText style={styles.researchTitle}>Research & Monitoring</ThemedText>
          </View>
          <ThemedText style={styles.researchText}>
            Conduct studies to track turtle populations, migration patterns, and health for data-driven strategies. 
            Modern technology including satellite tracking, genetic analysis, and AI-powered monitoring helps 
            scientists understand turtle behavior and develop more effective conservation measures. 
            Citizen science programs also allow volunteers to contribute valuable data.
          </ThemedText>
        </View>
      </View>

      {/* Eco-Tourism Benefits */}
      <View style={styles.section}>
        <View style={[
          styles.tourismCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#4CAF50'
          }
        ]}>
          <View style={styles.tourismHeader}>
            <MaterialIcons name="eco" size={20} color="#4CAF50" />
            <ThemedText style={styles.tourismTitle}>Eco-Tourism Impact</ThemedText>
          </View>
          <ThemedText style={styles.tourismText}>
            Responsible eco-tourism provides economic incentives for local communities to protect turtle nesting 
            sites and marine habitats. When communities benefit financially from turtle conservation, they become 
            active protectors rather than threats. Well-managed turtle watching programs can generate significant 
            revenue while ensuring minimal disturbance to the animals.
          </ThemedText>
        </View>
      </View>

      {/* International Cooperation */}
      <View style={styles.section}>
        <View style={[
          styles.cooperationCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#FF9800'
          }
        ]}>
          <View style={styles.cooperationHeader}>
            <MaterialIcons name="public" size={20} color="#FF9800" />
            <ThemedText style={styles.cooperationTitle}>Global Collaboration</ThemedText>
          </View>
          <ThemedText style={styles.cooperationText}>
            Green Sea Turtle conservation requires international cooperation since these animals migrate across 
            national boundaries. Treaties like CITES (Convention on International Trade in Endangered Species) 
            help combat illegal trade, while regional partnerships coordinate protection efforts across turtle 
            migration routes and feeding areas.
          </ThemedText>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.section}>
        <View style={[
          styles.ctaCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            borderLeftColor: '#2196F3'
          }
        ]}>
          <View style={styles.ctaHeader}>
            <MaterialIcons name="campaign" size={20} color="#2196F3" />
            <ThemedText style={styles.ctaTitle}>Join the Conservation Effort</ThemedText>
          </View>
          <ThemedText style={styles.ctaText}>
            By protecting beaches, reducing plastic use, and supporting eco-friendly tourism, we can help save 
            this ancient mariner and the vibrant world it supports. Every action counts - from choosing sustainable 
            seafood to supporting conservation organizations. Together, we can ensure future generations will 
            witness the magnificent sight of Green Sea Turtles thriving in our oceans.
          </ThemedText>
        </View>
      </View>
      {/* 🔥 Simple Download Button */}
      <View style={styles.downloadSection}>
        <TouchableOpacity 
          style={[
            styles.simpleDownloadButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleDownloadPDF}
          activeOpacity={0.8}
        >
          <MaterialIcons name="file-download" size={18} color="#fff" />
          <ThemedText style={styles.simpleDownloadText}>Download PDF</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  // Section Structure
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // Strategies Grid
  strategiesGrid: {
    gap: 16,
  },
  strategyCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  strategyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  strategyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  strategyEmoji: {
    fontSize: 18,
  },
  strategyTitleContainer: {
    flex: 1,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  strategyDesc: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    textAlign: 'justify',
  },

  // Success Stories
  successGrid: {
    gap: 12,
  },
  successCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  achievement: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    textAlign: 'justify',
  },

  // How to Help
  helpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  helpCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  helpHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  helpIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  helpAction: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  helpDesc: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 18,
  },

  // Special Cards
  researchCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  researchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  researchTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  researchText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },

  tourismCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tourismHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tourismTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tourismText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },

  cooperationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cooperationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cooperationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cooperationText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },

  ctaCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ctaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  ctaText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  downloadSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  simpleDownloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  simpleDownloadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
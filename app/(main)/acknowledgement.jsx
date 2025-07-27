import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutUsAcknowledgement() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <ThemedView style={[
          styles.heroSection,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <View style={[
            styles.heroIcon,
            { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + '20' }
          ]}>
            <MaterialIcons 
              name="nature-people" 
              size={40} 
              color={isDark ? Colors.dark.tint : Colors.light.tint} 
            />
          </View>
          
          <ThemedText style={[
            styles.heroTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            To Every Guardian of Nature
          </ThemedText>
          
          <View style={styles.decorativeLine}>
            <View style={[
              styles.line,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} />
            <ThemedText style={[
              styles.decorativeEmoji,
              { color: isDark ? Colors.dark.tint : Colors.light.tint }
            ]}>
              🌿
            </ThemedText>
            <View style={[
              styles.line,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} />
          </View>
        </ThemedView>

        {/* Mission Statement Section */}
        <ThemedView style={[
          styles.section,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons 
              name="eco" 
              size={20} 
              color={isDark ? Colors.dark.tint : Colors.light.tint} 
            />
            <ThemedText style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Our Conservation Journey
            </ThemedText>
          </View>
          
          <ThemedText style={[
            styles.missionText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            This journey of conservation begins with you. Every tap, every lesson learned, and every action taken brings us closer to a world where tigers roam free, tapirs thrive, and turtles return to safe shores.
          </ThemedText>
        </ThemedView>

        {/* Your Role Section */}
        <ThemedView style={[
          styles.section,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons 
              name="group" 
              size={20} 
              color={isDark ? Colors.dark.tint : Colors.light.tint} 
            />
            <ThemedText style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              You Are More Than Users
            </ThemedText>
          </View>
          
          <View style={styles.rolesContainer}>
            {[
              { icon: 'shield', role: 'Protectors', color: '#4CAF50' },
              { icon: 'school', role: 'Educators', color: '#2196F3' },
              { icon: 'trending-up', role: 'Changemakers', color: '#FF9800' }
            ].map((item, index) => (
              <View key={index} style={[
                styles.roleCard,
                { 
                  backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}>
                <View style={[
                  styles.roleIcon,
                  { backgroundColor: item.color + '20' }
                ]}>
                  <MaterialIcons 
                    name={item.icon} 
                    size={24} 
                    color={item.color} 
                  />
                </View>
                <ThemedText style={[
                  styles.roleText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {item.role}
                </ThemedText>
              </View>
            ))}
          </View>
          
          <ThemedText style={[
            styles.roleDescription,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Together, we are rewriting the future of Malaysia's wild treasures, one step at a time.
          </ThemedText>
        </ThemedView>

        {/* Quote Section */}
        <ThemedView style={[
          styles.quoteSection,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary,
            borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
          }
        ]}>
          <MaterialIcons 
            name="format-quote" 
            size={32} 
            color={isDark ? Colors.dark.tint : Colors.light.tint}
            style={styles.quoteIcon}
          />
          <ThemedText style={[
            styles.quoteText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            "The Earth does not belong to us; we belong to the Earth."
          </ThemedText>
        </ThemedView>

        {/* Gratitude Section */}
        <ThemedView style={[
          styles.section,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <View style={styles.sectionHeader}>
            <MaterialIcons 
              name="favorite" 
              size={20} 
              color="#E74C3C" 
            />
            <ThemedText style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Our Heartfelt Gratitude
            </ThemedText>
          </View>
          
          <ThemedText style={[
            styles.gratitudeText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Thank you for standing up with us. Your passion fuels this mission.
          </ThemedText>
        </ThemedView>

        {/* Call to Action Section */}
        <ThemedView style={[
          styles.ctaSection,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <View style={styles.ctaContent}>
            <ThemedText style={[
              styles.ctaTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Let's Keep Making Waves
            </ThemedText>
            
            <View style={styles.ctaSubtitle}>
              <ThemedText style={[
                styles.ctaText,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                On land and at sea
              </ThemedText>
              <ThemedText style={styles.ctaEmojis}>🌿🐅🌊</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Action Button */}
        <TouchableOpacity 
          style={[
            styles.actionButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={handleGoBack}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back" size={20} color="#fff" />
          <ThemedText style={styles.actionButtonText}>
            Continue Your Journey
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  
  // Hero Section
  heroSection: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  decorativeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  decorativeEmoji: {
    fontSize: 20,
  },
  
  // Section Structure
  section: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  
  // Mission Text
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  // Roles Section
  rolesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  roleCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Quote Section
  quoteSection: {
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  quoteIcon: {
    marginBottom: 12,
    opacity: 0.7,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  
  // Gratitude Section
  gratitudeText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Call to Action Section
  ctaSection: {
    borderRadius: 12,
    padding: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  ctaEmojis: {
    fontSize: 18,
  },
  
  // Action Button
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
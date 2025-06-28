// app/(main)/index.jsx
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import LearningTopicCard from '@/components/learning/LearningTopicCard';
import { ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomePage() {
  const { user, supabaseData, loading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Check onboarding status
  useEffect(() => {
    if (!loading && user && supabaseData) {
      console.log('🔍 Checking onboarding status:', supabaseData.onboarding_completed);
      
      if (!supabaseData.onboarding_completed) {
        console.log('❌ Onboarding not completed, redirecting to profile');
        router.replace('/profile');
        return;
      }
    }
  }, [loading, user, supabaseData, router]);

  const learningTopics = [
    {
      topic: "tiger",
      title: "Malayan Tiger",
      icon: "pets",
      color: "#FF6B35",
      quizId: "744a1763-0b1b-4b60-913e-cf74df153746"
    },
    {
      topic: "tapir",
      title: "Malayan Tapir",
      icon: "forest",
      color: "#4CAF50",
      quizId: "4b3d9bbc-bb0f-498e-81e8-be4f10d67afc"
    },
    {
      topic: "turtle",
      title: "Green Sea Turtle",
      icon: "waves",
      color: "#2196F3",
      quizId: "5650b2ca-b502-48ff-b810-d6178ec39a20"
    }
  ];

  // Show loading while checking onboarding status
  if (loading || (user && !supabaseData)) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDark ? Colors.dark.tint : Colors.light.tint} />
          <ThemedText style={[
            styles.loadingText,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            Loading...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText style={[
              styles.title,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              Learning Topics
            </ThemedText>
            <ThemedText style={[
              styles.subtitle,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {user ? 'Select a topic to continue learning' : 'Sign in to access learning content'}
            </ThemedText>
          </View>
          
          {user && (
            <TouchableOpacity 
              style={[
                styles.profileButton,
                { 
                  backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                  borderColor: isDark ? Colors.dark.border : Colors.light.border
                }
              ]}
              onPress={() => router.push('/profile')}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name="account-circle" 
                size={24} 
                color={isDark ? Colors.dark.text : Colors.light.text} 
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Learning Topics Section */}
        {user && (
          <View style={styles.section}>
            <View style={styles.learningGrid}>
              {learningTopics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.topicCard,
                    { 
                      backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                      borderColor: isDark ? Colors.dark.border : Colors.light.border
                    }
                  ]}
                  onPress={() => router.push(`/startLearning?topic=${topic.topic}&quizId=${topic.quizId}`)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.topicIcon, { backgroundColor: `${topic.color}20` }]}>
                    <MaterialIcons 
                      name={topic.icon} 
                      size={28} 
                      color={topic.color} 
                    />
                  </View>
                  <View style={styles.topicContent}>
                    <ThemedText style={[
                      styles.topicTitle,
                      { color: isDark ? Colors.dark.text : Colors.light.text }
                    ]}>
                      {topic.title}
                    </ThemedText>
                  </View>
                  <MaterialIcons 
                    name="chevron-right" 
                    size={20} 
                    color={isDark ? Colors.dark.textMuted : Colors.light.textMuted} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Guest CTA Section */}
        {!user && (
          <View style={styles.section}>
            <View style={[
              styles.ctaCard,
              { 
                backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
              }
            ]}>
              <View style={styles.ctaHeader}>
                <MaterialIcons 
                  name="login" 
                  size={20} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint} 
                />
                <ThemedText style={[
                  styles.ctaTitle,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  Sign In Required
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.ctaDescription,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Please sign in to access learning content and track your progress.
              </ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Header Section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },

  // Section Structure
  section: {
    marginBottom: 28,
  },

  // Learning Grid
  learningGrid: {
    gap: 16,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  // CTA Card
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
    marginBottom: 8,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  ctaDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
});
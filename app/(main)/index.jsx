// app/(main)/index.jsx
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomePage() {
  const { user, supabaseData, loading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Get user's preferred language
  const preferredLanguage = supabaseData?.preferred_language || 'en';
  const isEnglish = preferredLanguage === 'en';

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

  // 🔥 UPDATED: Bilingual learning topics
  const learningTopics = [
    {
      topic: "tiger",
      title: isEnglish ? "Malayan Tiger" : "Harimau Malaya",
      icon: "pets",
      color: "#FF6B35",
      quizId: "c4329688-8fda-442b-a520-4e7d5cdbcbba"
    },
    {
      topic: "tapir",
      title: isEnglish ? "Malayan Tapir" : "Tapir Malaya",
      icon: "forest",
      color: "#4CAF50",
      quizId: "a8789ec1-d724-4b38-9285-2988efdc09d1"
    },
    {
      topic: "turtle",
      title: isEnglish ? "Green Sea Turtle" : "Penyu Agar",
      icon: "waves",
      color: "#2196F3",
      quizId: "81e9e258-82b1-42c4-878d-89ee1b50cec9"
    }
  ];

  // 🔥 NEW: Bilingual text content
  const content = {
    en: {
      title: "Learning Topics",
      subtitle: user ? "Select a topic to continue learning" : "Sign in to access learning content",
      loading: "Loading...",
      signInRequired: "Sign In Required",
      signInDescription: "Please sign in to access learning content and track your progress."
    },
    ms: {
      title: "Topik Pembelajaran",
      subtitle: user ? "Pilih topik untuk meneruskan pembelajaran" : "Log masuk untuk mengakses kandungan pembelajaran",
      loading: "Sedang memuatkan...",
      signInRequired: "Log Masuk Diperlukan",
      signInDescription: "Sila log masuk untuk mengakses kandungan pembelajaran dan menjejaki kemajuan anda."
    }
  };

  const text = content[preferredLanguage] || content.en;

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
            {text.loading}
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
              {text.title}
            </ThemedText>
            <ThemedText style={[
              styles.subtitle,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {text.subtitle}
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
                  {text.signInRequired}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.ctaDescription,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.signInDescription}
              </ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

// ... styles remain the same ...
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
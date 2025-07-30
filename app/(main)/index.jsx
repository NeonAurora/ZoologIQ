// app/(main)/index.jsx
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useCertificate } from '@/contexts/CertificateContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { QUIZ_IDS } from '@/constants/QuizIds';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomePage() {
  const { user, supabaseData, loading } = useAuth();
  const { certificateEligible, loading: loadingCertificateStatus, checkCertificateEligibility, initialized } = useCertificate();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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

  // INITIAL certificate check ONLY (when user data becomes available)
  useEffect(() => {
    if (user?.sub && supabaseData && !initialized) {
      console.log('🎓 Initial certificate eligibility check for homepage');
      checkCertificateEligibility(user.sub);
    }
  }, [user?.sub, supabaseData, initialized, checkCertificateEligibility]);

  // Learning topics and content remain the same...
  const learningTopics = [
    {
      topic: "tiger",
      title: isEnglish ? "Malayan Tiger" : "Harimau Malaya",
      icon: "pets",
      color: "#FF6B35",
      quizId: QUIZ_IDS.tiger
    },
    {
      topic: "tapir",
      title: isEnglish ? "Malayan Tapir" : "Tapir Malaya",
      icon: "forest",
      color: "#4CAF50",
      quizId: QUIZ_IDS.tapir
    },
    {
      topic: "turtle",
      title: isEnglish ? "Green Sea Turtle" : "Penyu Agar",
      icon: "waves",
      color: "#2196F3",
      quizId: QUIZ_IDS.turtle
    }
  ];

  const content = {
    en: {
      title: "Learning Topics",
      subtitle: user ? "Select a topic to continue learning" : "Sign in to access learning content",
      loading: "Loading...",
      signInRequired: "Sign In Required",
      signInDescription: "Please sign in to access learning content and track your progress.",
      certificateTitle: "🎓 Congratulations!",
      certificateSubtitle: "You've completed all learning topics",
      certificateDescription: "Download your completion certificate to showcase your achievement",
      downloadCertificate: "Download Certificate",
      certificateProgress: "Complete all topics to unlock your certificate"
    },
    ms: {
      title: "Topik Pembelajaran",
      subtitle: user ? "Pilih topik untuk meneruskan pembelajaran" : "Log masuk untuk mengakses kandungan pembelajaran",
      loading: "Sedang memuatkan...",
      signInRequired: "Log Masuk Diperlukan",
      signInDescription: "Sila log masuk untuk mengakses kandungan pembelajaran dan menjejaki kemajuan anda.",
      certificateTitle: "🎓 Tahniah!",
      certificateSubtitle: "Anda telah menyelesaikan semua topik pembelajaran",
      certificateDescription: "Muat turun sijil tamat anda untuk menunjukkan pencapaian anda",
      downloadCertificate: "Muat Turun Sijil",
      certificateProgress: "Lengkapkan semua topik untuk membuka kunci sijil anda"
    }
  };

  const text = content[preferredLanguage] || content.en;

  const handleCertificateDownload = () => {
    router.push('/certificate');
  };

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

        {/* 🎓 Certificate Download Section - Shows when eligible (cached) */}
        {user && certificateEligible && (
          <View style={styles.section}>
            <TouchableOpacity
              style={[
                styles.certificateCard,
                { 
                  backgroundColor: isDark ? '#1a4d1a' : '#f0fff0',
                  borderColor: '#4CAF50'
                }
              ]}
              onPress={handleCertificateDownload}
              activeOpacity={0.9}
            >
              {/* Certificate content remains the same... */}
              <View style={styles.certificateHeader}>
                <View style={[styles.trophyContainer, { backgroundColor: '#4CAF5020' }]}>
                  <MaterialIcons 
                    name="emoji-events" 
                    size={32} 
                    color="#FFD700" 
                  />
                </View>
                <View style={styles.certificateTextContainer}>
                  <ThemedText style={[
                    styles.certificateTitle,
                    { color: '#4CAF50' }
                  ]}>
                    {text.certificateTitle}
                  </ThemedText>
                  <ThemedText style={[
                    styles.certificateSubtitle,
                    { color: isDark ? '#a5d6a5' : '#2e7d32' }
                  ]}>
                    {text.certificateSubtitle}
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={[
                styles.certificateDescription,
                { color: isDark ? '#c8e6c9' : '#388e3c' }
              ]}>
                {text.certificateDescription}
              </ThemedText>

              <View style={styles.certificateButtonContainer}>
                <View style={[
                  styles.certificateButton,
                  { backgroundColor: '#4CAF50' }
                ]}>
                  <MaterialIcons 
                    name="download" 
                    size={20} 
                    color="white" 
                  />
                  <ThemedText style={styles.certificateButtonText}>
                    {text.downloadCertificate}
                  </ThemedText>
                </View>
                <MaterialIcons 
                  name="chevron-right" 
                  size={24} 
                  color="#4CAF50" 
                />
              </View>
            </TouchableOpacity>
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

  // 🎓 Certificate Card Styles
  certificateCard: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderLeftWidth: 6,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  certificateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trophyContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  certificateTextContainer: {
    flex: 1,
  },
  certificateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  certificateSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  certificateDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  certificateButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  certificateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  certificateButtonText: {
    color: 'white',
    fontSize: 16,
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
// app/(main)/profile.jsx
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const { user, supabaseData, signOut, loading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 NEW: Get user's preferred language
  const preferredLanguage = supabaseData?.preferred_language || 'en';
  const isEnglish = preferredLanguage === 'en';

  // 🔥 NEW: Bilingual text content
  const content = {
    en: {
      loadingProfile: 'Loading profile...',
      redirecting: 'Redirecting...',
      personalInformation: 'Personal Information',
      preferences: 'Preferences',
      education: 'Education',
      location: 'Location',
      age: 'Age',
      gender: 'Gender',
      occupation: 'Occupation',
      preferredLanguage: 'Preferred Language',
      english: 'English',
      malay: 'Malay',
      highestLevel: 'Highest Level',
      cityVillage: 'City/Village',
      district: 'District',
      stateProvince: 'State/Province',
      notSpecified: 'Not specified',
      editProfile: 'Edit Profile',
      signOut: 'Sign Out'
    },
    ms: {
      loadingProfile: 'Sedang memuatkan profil...',
      redirecting: 'Sedang mengalihkan...',
      personalInformation: 'Maklumat Peribadi',
      preferences: 'Keutamaan',
      education: 'Pendidikan',
      location: 'Lokasi',
      age: 'Umur',
      gender: 'Jantina',
      occupation: 'Pekerjaan',
      preferredLanguage: 'Bahasa Pilihan',
      english: 'Bahasa Inggeris',
      malay: 'Bahasa Melayu',
      highestLevel: 'Tahap Tertinggi',
      cityVillage: 'Bandar/Kampung',
      district: 'Daerah',
      stateProvince: 'Negeri',
      notSpecified: 'Tidak dinyatakan',
      editProfile: 'Edit Profil',
      signOut: 'Log Keluar'
    }
  };

  const text = content[preferredLanguage] || content.en;

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!loading && user && supabaseData && !supabaseData.onboarding_completed) {
      console.log('Onboarding not completed, redirecting to edit profile');
      router.replace('/editProfile?onboarding=true');
    }
  }, [loading, user, supabaseData, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const handleEditProfile = () => {
    router.push('/editProfile?onboarding=false');
  };

  // 🔥 NEW: Helper function to get language display name
  const getLanguageDisplayName = (langCode) => {
    if (langCode === 'ms') {
      return isEnglish ? 'Malay' : 'Bahasa Melayu';
    }
    return isEnglish ? 'English' : 'Bahasa Inggeris';
  };

  if (loading || !user || !supabaseData) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <ThemedText style={styles.loadingText}>
          {loading ? text.loadingProfile : text.redirecting}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!supabaseData.onboarding_completed) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <ThemedView style={[
          styles.headerCard,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <ThemedView style={styles.profileHeader}>
            <ThemedView style={styles.avatarContainer}>
              {supabaseData.picture ? (
                <Image 
                  source={{ uri: supabaseData.picture }} 
                  style={styles.avatar}
                />
              ) : (
                <ThemedView style={[
                  styles.avatarPlaceholder,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  <ThemedText style={styles.avatarText}>
                    {supabaseData.name?.charAt(0)?.toUpperCase() || 'U'}
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
            
            <ThemedView style={styles.headerInfo}>
              <ThemedText type="title" style={styles.userName}>
                {supabaseData.name || 'User'}
              </ThemedText>
              <ThemedText style={[
                styles.userEmail,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {supabaseData.email}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Information Sections */}
        <InfoSection 
          title={text.personalInformation}
          data={[
            { label: text.age, value: supabaseData.age || text.notSpecified },
            { label: text.gender, value: supabaseData.gender || text.notSpecified },
            { label: text.occupation, value: supabaseData.occupation || text.notSpecified },
          ]}
          isDark={isDark}
        />

        {/* 🔥 NEW: Preferences Section */}
        <InfoSection 
          title={text.preferences}
          data={[
            { 
              label: text.preferredLanguage, 
              value: getLanguageDisplayName(supabaseData.preferred_language || 'en'),
              isLanguage: true
            },
          ]}
          isDark={isDark}
        />

        <InfoSection 
          title={text.education}
          data={[
            { label: text.highestLevel, value: supabaseData.highest_education || text.notSpecified },
          ]}
          isDark={isDark}
        />

        <InfoSection 
          title={text.location}
          data={[
            { label: text.cityVillage, value: supabaseData.city || text.notSpecified },
            { label: text.district, value: supabaseData.district || text.notSpecified },
            { label: text.stateProvince, value: supabaseData.state_province || text.notSpecified },
          ]}
          isDark={isDark}
        />

        {/* Action Buttons */}
        <ThemedView style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
            ]} 
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.primaryButtonText}>
              {text.editProfile}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.secondaryButton,
              { 
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                backgroundColor: 'transparent'
              }
            ]} 
            onPress={handleSignOut}
            activeOpacity={0.8}
          >
            <ThemedText style={[
              styles.secondaryButtonText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.signOut}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

// 🔥 UPDATED: Helper Component for Information Sections with language highlight
function InfoSection({ title, data, isDark }) {
  return (
    <ThemedView style={[
      styles.infoSection,
      { 
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        shadowColor: isDark ? Colors.dark.text : Colors.light.text,
      }
    ]}>
      <ThemedText style={[
        styles.sectionTitle,
        { color: isDark ? Colors.dark.text : Colors.light.text }
      ]}>
        {title}
      </ThemedText>
      
      <ThemedView style={styles.infoList}>
        {data.map((item, index) => (
          <ThemedView key={index} style={[
            styles.infoRow,
            index !== data.length - 1 && {
              borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
              borderBottomWidth: 1
            }
          ]}>
            <ThemedText style={[
              styles.infoLabel,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              {item.label}
            </ThemedText>
            
            {/* 🔥 NEW: Special styling for language preference */}
            {item.isLanguage ? (
              <ThemedView style={[
                styles.languageBadge,
                { 
                  backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20',
                  borderColor: isDark ? Colors.dark.tint : Colors.light.tint
                }
              ]}>
                <ThemedText style={[
                  styles.languageBadgeText,
                  { color: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}>
                  {item.value}
                </ThemedText>
              </ThemedView>
            ) : (
              <ThemedText style={[
                styles.infoValue,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {item.value}
              </ThemedText>
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  
  // Header Card
  headerCard: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  
  // Information Sections
  infoSection: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoList: {
    gap: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    flex: 1.5,
    textAlign: 'right',
  },
  
  // 🔥 NEW: Language badge styles
  languageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  languageBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Action Buttons
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
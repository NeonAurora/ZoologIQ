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

  if (loading || !user || !supabaseData) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <ThemedText style={styles.loadingText}>
          {loading ? 'Loading profile...' : 'Redirecting...'}
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
          title="Personal Information"
          data={[
            { label: 'Age', value: supabaseData.age || 'Not specified' },
            { label: 'Gender', value: supabaseData.gender || 'Not specified' },
            { label: 'Occupation', value: supabaseData.occupation || 'Not specified' },
          ]}
          isDark={isDark}
        />

        <InfoSection 
          title="Education"
          data={[
            { label: 'Status', value: supabaseData.education_status || 'Not specified' },
            { label: 'Highest Level', value: supabaseData.highest_education || 'Not specified' },
          ]}
          isDark={isDark}
        />

        <InfoSection 
          title="Location"
          data={[
            { label: 'City/Village', value: supabaseData.city || 'Not specified' },
            { label: 'District', value: supabaseData.district || 'Not specified' },
            { label: 'State/Province', value: supabaseData.state_province || 'Not specified' },
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
              Edit Profile
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
              Sign Out
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

// Helper Component for Information Sections
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
            <ThemedText style={[
              styles.infoValue,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {item.value}
            </ThemedText>
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
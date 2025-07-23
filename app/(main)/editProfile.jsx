// app/(main)/editProfile.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { updateUserData } from '@/services/supabase';
import { uploadImage } from '@/services/supabase';
import * as ExpoImagePicker from 'expo-image-picker';
import ImagePicker from '@/components/createQuiz/ImagePicker';

export default function EditProfileScreen() {
  const { onboarding } = useLocalSearchParams();
  const { user, supabaseData, refreshUserData, loading: authLoading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const isOnboarding = onboarding === 'true';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferred_language: 'en', // 🔥 NEW: Language preference
    highest_education: '',
    city: '',
    district: '',
    state_province: '',
    occupation: '',
    age: '',
    gender: '',
    picture: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (supabaseData) {
      setFormData({
        name: supabaseData.name || '',
        email: supabaseData.email || '',
        preferred_language: supabaseData.preferred_language || 'en', // 🔥 NEW: Set language preference
        highest_education: supabaseData.highest_education || '',
        city: supabaseData.city || '',
        district: supabaseData.district || '',
        state_province: supabaseData.state_province || '',
        occupation: supabaseData.occupation || '',
        age: supabaseData.age?.toString() || '',
        gender: supabaseData.gender || '',
        picture: supabaseData.picture || '',
      });
    }
  }, [supabaseData]);

  useEffect(() => {
    const requiredFields = [
      'name', 'email', 'highest_education',
      'city', 'district', 'state_province', 'occupation', 'age', 'gender'
    ];
    
    const isValid = requiredFields.every(field => {
      const value = formData[field]?.toString().trim();
      return value && value.length > 0;
    });
    
    const age = parseInt(formData.age);
    const ageValid = !isNaN(age) && age >= 13 && age <= 120;
    
    // Language preference should always be valid (has default)
    const languageValid = formData.preferred_language === 'en' || formData.preferred_language === 'ms';
    
    setFormValid(isValid && ageValid && languageValid);
  }, [formData]);

  const handlePickImage = async () => {
    try {
      console.log('📷 Requesting image picker permissions...');
      
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required", 
          "Please allow access to your photos to set a profile picture."
        );
        return;
      }
    
      console.log('📱 Launching image picker...');
      
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });
    
      console.log('🎯 Image picker result:', result);
      
      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('✅ Image selected:', imageUri);
        
        setFormData(prev => ({
          ...prev,
          picture: imageUri
        }));
      } else {
        console.log('❌ Image selection cancelled');
      }
    } catch (error) {
      console.error('💥 Error picking image:', error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleRemoveImage = () => {
    console.log('🗑️ Removing profile image');
    setFormData(prev => ({
      ...prev,
      picture: ''
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 🔥 NEW: Language selection handler
  const handleLanguageSelect = (language) => {
    console.log('🌐 Language selected:', language);
    setFormData(prev => ({
      ...prev,
      preferred_language: language
    }));
  };

  // In app/(main)/editProfile.jsx - Update the handleSave function

    const handleSave = async () => {
    if (!formValid || !user?.sub) return;

    setLoading(true);

    try {
      let finalImageUrl = formData.picture;

      // Handle image upload if there's a new image
      if (formData.picture && !formData.picture.startsWith('http')) {
        console.log('📤 Uploading profile image...');
        setImageUploading(true);
        
        const uploadedImageUrl = await uploadImage(formData.picture);
        
        if (uploadedImageUrl) {
          finalImageUrl = uploadedImageUrl;
          console.log('✅ Profile image uploaded successfully:', finalImageUrl);
        } else {
          console.log('⚠️ Image upload failed, continuing without image');
          
          const continueWithoutImage = await new Promise((resolve) => {
            Alert.alert(
              'Image Upload Failed',
              'The profile picture could not be uploaded. Would you like to continue without it?',
              [
                { text: 'Try Again', onPress: () => resolve(false) },
                { text: 'Continue', onPress: () => resolve(true) }
              ]
            );
          });
          
          if (!continueWithoutImage) {
            setImageUploading(false);
            setLoading(false);
            return;
          }
          
          finalImageUrl = supabaseData?.picture || '';
        }
        
        setImageUploading(false);
      }

      // Prepare update data
      const updateData = {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age) || null,
        gender: formData.gender,
        occupation: formData.occupation,
        highest_education: formData.highest_education,
        city: formData.city,
        district: formData.district,
        state_province: formData.state_province,
        preferred_language: formData.preferred_language, // 🔥 Include language preference
        picture: finalImageUrl,
        updated_at: new Date().toISOString()
      };

      // Add onboarding completion if this is the onboarding flow
      if (isOnboarding) {
        updateData.onboarding_completed = true;
      }

      console.log('🔄 Updating user profile with data:', updateData);

      const success = await updateUserData(user.sub, updateData);

      if (success) {
        console.log('✅ Profile updated successfully');
        await refreshUserData();
        
        if (isOnboarding) {
          Alert.alert(
            'Profile Saved', 
            'Your profile has been set up successfully!',
            [{ 
              text: 'Continue', 
              onPress: () => router.replace('/onboardingInstructions') 
            }]
          );
        } else {
          Alert.alert(
            'Success', 
            'Your profile has been updated successfully.',
            [{ text: 'OK', onPress: () => router.replace('/profile') }]
          );
        }
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating your profile.');
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  };

  const handleCancel = () => {
    if (isOnboarding) {
      Alert.alert(
        'Cancel Setup', 
        'You need to complete your profile to use the app. Would you like to sign out instead?',
        [
          { text: 'Continue Setup', style: 'cancel' },
          { text: 'Sign Out', style: 'destructive', onPress: () => router.replace('/') }
        ]
      );
    } else {
      router.replace('/profile');
    }
  };

  if (authLoading || !user) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={isDark ? Colors.dark.tint : Colors.light.tint} 
        />
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.pageTitle}>
            {isOnboarding ? 'Welcome!' : 'Edit Profile'}
          </ThemedText>
          
          {isOnboarding && (
            <ThemedView style={[
              styles.welcomeCard,
              { 
                backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary,
                borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
              }
            ]}>
              <ThemedText style={[
                styles.welcomeMessage,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                Please tell us more about yourself to get started with your learning journey!
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        {/* Profile Picture Section */}
        <FormSection title="Profile Picture (Optional)" isDark={isDark}>
          <ThemedView style={styles.imageSection}>
            <ThemedText style={[
              styles.imageSectionDescription,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Add a profile picture to personalize your account
            </ThemedText>
            
            <ImagePicker
              image={formData.picture}
              onPickImage={handlePickImage}
              onRemoveImage={handleRemoveImage}
              isUploading={imageUploading}
            />
            
            <ThemedView style={styles.imageGuidance}>
              <ThemedText style={[
                styles.imageGuidanceText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                • Square images work best for profile pictures
              </ThemedText>
              <ThemedText style={[
                styles.imageGuidanceText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                • Clear, well-lit photos are recommended
              </ThemedText>
              <ThemedText style={[
                styles.imageGuidanceText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                • You can always update this later
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </FormSection>

        {/* 🔥 NEW: Language Preference Section */}
        <FormSection title="Language Preference" isDark={isDark}>
          <ThemedView style={styles.languageSection}>
            <ThemedText style={[
              styles.languageSectionDescription,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}>
              Choose your preferred language for quiz content and lessons
            </ThemedText>
            
            <ThemedView style={styles.languageOptions}>
              <TouchableOpacity
                style={[
                  styles.languageOption,
                  {
                    backgroundColor: formData.preferred_language === 'en'
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                    borderColor: formData.preferred_language === 'en'
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.border : Colors.light.border),
                  }
                ]}
                onPress={() => handleLanguageSelect('en')}
                activeOpacity={0.8}
              >
                <ThemedText style={[
                  styles.languageOptionText,
                  {
                    color: formData.preferred_language === 'en'
                      ? '#fff'
                      : (isDark ? Colors.dark.text : Colors.light.text)
                  }
                ]}>
                  🇺🇸 English
                </ThemedText>
                {formData.preferred_language === 'en' && (
                  <ThemedText style={styles.languageCheckmark}>✓</ThemedText>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageOption,
                  {
                    backgroundColor: formData.preferred_language === 'ms'
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                    borderColor: formData.preferred_language === 'ms'
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.border : Colors.light.border),
                  }
                ]}
                onPress={() => handleLanguageSelect('ms')}
                activeOpacity={0.8}
              >
                <ThemedText style={[
                  styles.languageOptionText,
                  {
                    color: formData.preferred_language === 'ms'
                      ? '#fff'
                      : (isDark ? Colors.dark.text : Colors.light.text)
                  }
                ]}>
                  🇲🇾 Malay
                </ThemedText>
                {formData.preferred_language === 'ms' && (
                  <ThemedText style={styles.languageCheckmark}>✓</ThemedText>
                )}
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.languageNote}>
              <ThemedText style={[
                styles.languageNoteText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}>
                Note: Application menus and buttons will remain in English. Only quiz content and lesson materials will be displayed in your selected language.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </FormSection>

        {/* Personal Information */}
        <FormSection title="Personal Information" isDark={isDark}>
          <FormField
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Enter your full name"
            isDark={isDark}
            required
          />
          <FormField
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            isDark={isDark}
            required
          />
          <FormField
            label="Age"
            value={formData.age}
            onChangeText={(value) => handleInputChange('age', value)}
            placeholder="Enter your age (13-120)"
            keyboardType="numeric"
            isDark={isDark}
            required
          />
          <FormField
            label="Gender"
            value={formData.gender}
            onChangeText={(value) => handleInputChange('gender', value)}
            placeholder="e.g., Male, Female, Other"
            isDark={isDark}
            required
          />
          <FormField
            label="Occupation"
            value={formData.occupation}
            onChangeText={(value) => handleInputChange('occupation', value)}
            placeholder="Enter your occupation"
            isDark={isDark}
            required
          />
        </FormSection>

        <FormSection title="Education" isDark={isDark}>
          <FormField
            label="Highest Education"
            value={formData.highest_education}
            onChangeText={(value) => handleInputChange('highest_education', value)}
            placeholder="e.g., High School, Bachelor's, Master's, PhD"
            isDark={isDark}
            required
          />
        </FormSection>

        <FormSection title="Location" isDark={isDark}>
          <FormField
            label="City/Village"
            value={formData.city}
            onChangeText={(value) => handleInputChange('city', value)}
            placeholder="Enter your city or village"
            isDark={isDark}
            required
          />
          <FormField
            label="District"
            value={formData.district}
            onChangeText={(value) => handleInputChange('district', value)}
            placeholder="Enter your district"
            isDark={isDark}
            required
          />
          <FormField
            label="State/Province"
            value={formData.state_province}
            onChangeText={(value) => handleInputChange('state_province', value)}
            placeholder="Enter your state or province"
            isDark={isDark}
            required
          />
        </FormSection>

        {/* Form Validation Message */}
        {!formValid && (
          <ThemedView style={[
            styles.validationCard,
            { 
              backgroundColor: isDark 
                ? 'rgba(255, 107, 107, 0.15)' 
                : 'rgba(231, 76, 60, 0.1)',
              borderLeftColor: isDark ? '#FF6B6B' : '#E74C3C'
            }
          ]}>
            <ThemedText style={[
              styles.validationText,
              { color: isDark ? '#FF6B6B' : '#E74C3C' }
            ]}>
              Please fill in all required fields. Age must be between 13-120.
              {'\n'}Profile picture is optional and can be added later.
            </ThemedText>
          </ThemedView>
        )}

        {/* Action Buttons */}
        <ThemedView style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[
              styles.saveButton,
              { 
                backgroundColor: (formValid && !loading && !imageUploading)
                  ? (isDark ? Colors.dark.tint : Colors.light.tint)
                  : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundTertiary)
              }
            ]}
            onPress={handleSave}
            disabled={!formValid || loading || imageUploading}
            activeOpacity={0.8}
          >
            {(loading || imageUploading) ? (
              <ThemedView style={styles.loadingButtonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <ThemedText style={styles.loadingButtonText}>
                  {imageUploading ? 'Uploading image...' : 'Saving...'}
                </ThemedText>
              </ThemedView>
            ) : (
              <ThemedText style={[
                styles.saveButtonText,
                { 
                  color: formValid 
                    ? '#fff' 
                    : (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                }
              ]}>
                {isOnboarding ? 'Complete Setup' : 'Save Changes'}
              </ThemedText>
            )}
          </TouchableOpacity>

          {!isOnboarding && (
            <TouchableOpacity 
              style={[
                styles.cancelButton,
                { 
                  borderColor: isDark ? Colors.dark.border : Colors.light.border,
                  backgroundColor: 'transparent'
                }
              ]}
              onPress={handleCancel}
              disabled={loading || imageUploading}
              activeOpacity={0.8}
            >
              <ThemedText style={[
                styles.cancelButtonText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                Cancel
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

// Helper Components
function FormSection({ title, children, isDark }) {
  return (
    <ThemedView style={[
      styles.section,
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
      <ThemedView style={styles.fieldsContainer}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}

function FormField({ label, value, onChangeText, placeholder, keyboardType, isDark, required }) {
  return (
    <ThemedView style={styles.fieldContainer}>
      <ThemedText style={[
        styles.fieldLabel,
        { color: isDark ? Colors.dark.text : Colors.light.text }
      ]}>
        {label}{required && ' *'}
      </ThemedText>
      <TextInput
        style={[
          styles.textInput,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
            color: isDark ? Colors.dark.text : Colors.light.text
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
        keyboardType={keyboardType || 'default'}
      />
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
  
  // Header
  header: {
    gap: 16,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  welcomeCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  welcomeMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  // Image Section
  imageSection: {
    gap: 12,
    alignItems: 'center',
  },
  imageSectionDescription: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  imageGuidance: {
    marginTop: 8,
    gap: 4,
  },
  imageGuidanceText: {
    fontSize: 12,
    textAlign: 'center',
  },

  // 🔥 NEW: Language Section Styles
  languageSection: {
    gap: 16,
  },
  languageSectionDescription: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  languageOptions: {
    gap: 12,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  languageCheckmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageNote: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  languageNoteText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  
  // Form Sections
  section: {
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
    marginBottom: 16,
  },
  fieldsContainer: {
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  
  // Validation
  validationCard: {
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
  },
  validationText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Actions
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 56,
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 56,
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
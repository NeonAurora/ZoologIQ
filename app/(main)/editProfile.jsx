// app/(main)/editProfile.jsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList
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

// Education levels options
const EDUCATION_LEVELS = [
  'High School',
  'Diploma',
  'Bachelor\'s',
  'Master\'s',
  'PhD'
];

// Malaysian states options
const MALAYSIAN_STATES = [
  'Kuala Lumpur (Capital of Malaysia)',
  'Putrajaya (Administrative & Judicial Capital)',
  'Labuan (International Offshore Financial Center)',
  'Johor',
  'Kedah',
  'Kelantan',
  'Malacca (Melaka)',
  'Negeri Sembilan',
  'Pahang',
  'Penang (Pulau Pinang)',
  'Perak',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu'
];

export default function EditProfileScreen() {
  const { onboarding } = useLocalSearchParams();
  const { user, supabaseData, refreshUserData, loading: authLoading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const isOnboarding = onboarding === 'true';
  
  // 🔥 NEW: Consent dialog state
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferred_language: 'en',
    highest_education: '',
    city: '',
    state_province: '',
    occupation: '',
    age: '',
    gender: '',
    picture: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // 🔥 NEW: Show consent dialog on mount if onboarding
  useEffect(() => {
    if (isOnboarding) {
      setShowConsentDialog(true);
    }
  }, [isOnboarding]);

  useEffect(() => {
    if (supabaseData) {
      setFormData({
        name: supabaseData.name || '',
        email: supabaseData.email || '',
        preferred_language: supabaseData.preferred_language || 'en',
        highest_education: supabaseData.highest_education || '',
        city: supabaseData.city || '',
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
      'city', 'state_province', 'occupation', 'age', 'gender'
    ];
    
    const isValid = requiredFields.every(field => {
      const value = formData[field]?.toString().trim();
      return value && value.length > 0;
    });
    
    const age = parseInt(formData.age);
    const ageValid = !isNaN(age) && age >= 13 && age <= 120;
    
    const languageValid = formData.preferred_language === 'en' || formData.preferred_language === 'ms';
    
    setFormValid(isValid && ageValid && languageValid);
  }, [formData]);

  const handlePickImage = async () => {
    try {
      const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required", 
          "Please allow access to your photos to set a profile picture."
        );
        return;
      }
    
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });
    
      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        setFormData(prev => ({
          ...prev,
          picture: imageUri
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleRemoveImage = () => {
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

  const handleLanguageSelect = (language) => {
    setFormData(prev => ({
      ...prev,
      preferred_language: language
    }));
  };

  const handleSave = async () => {
    if (!formValid || !user?.sub) return;

    setLoading(true);

    try {
      let finalImageUrl = formData.picture;

      if (formData.picture && !formData.picture.startsWith('http')) {
        setImageUploading(true);
        
        const uploadedImageUrl = await uploadImage(formData.picture);
        
        if (uploadedImageUrl) {
          finalImageUrl = uploadedImageUrl;
        } else {
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

      const updateData = {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age) || null,
        gender: formData.gender,
        occupation: formData.occupation,
        highest_education: formData.highest_education,
        city: formData.city,
        state_province: formData.state_province,
        preferred_language: formData.preferred_language,
        picture: finalImageUrl,
        updated_at: new Date().toISOString()
      };

      if (isOnboarding) {
        updateData.onboarding_completed = true;
      }

      const success = await updateUserData(user.sub, updateData);

      if (success) {
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
      console.error('Error updating profile:', error);
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
      {/* 🔥 NEW: Consent Dialog */}
      <Modal
        visible={showConsentDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <ThemedView style={styles.consentOverlay}>
          <ThemedView style={[
            styles.consentDialog,
            { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
          ]}>
            <ThemedView style={styles.consentHeader}>
              <ThemedText style={[
                styles.consentTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                Privacy Notice
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.consentBody}>
              <ThemedText style={[
                styles.consentText,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                This application has been developed for study purposes. All data will be stored anonymously and maintained in confidentiality.
              </ThemedText>
              
              <ThemedText style={[
                styles.consentSubtext,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                Your information is used solely for research and educational purposes.
              </ThemedText>
            </ThemedView>

            <TouchableOpacity
              style={[
                styles.consentButton,
                { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
              ]}
              onPress={() => setShowConsentDialog(false)}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.consentButtonText}>
                Continue
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!showConsentDialog}
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

        {/* Language Preference Section */}
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
                  🇲🇾 Bahasa
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
          <Dropdown
            label="Highest Education"
            value={formData.highest_education}
            onSelect={(value) => handleInputChange('highest_education', value)}
            options={EDUCATION_LEVELS}
            placeholder="Select your highest education level"
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
          <Dropdown
            label="State"
            value={formData.state_province}
            onSelect={(value) => handleInputChange('state_province', value)}
            options={MALAYSIAN_STATES}
            placeholder="Select your state"
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

function Dropdown({ label, value, onSelect, options, placeholder, isDark, required }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onSelect(selectedValue);
    setIsOpen(false);
  };

  return (
    <ThemedView style={styles.fieldContainer}>
      <ThemedText style={[
        styles.fieldLabel,
        { color: isDark ? Colors.dark.text : Colors.light.text }
      ]}>
        {label}{required && ' *'}
      </ThemedText>
      
      <TouchableOpacity
        style={[
          styles.textInput,
          styles.dropdownButton,
          { 
            backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
            borderColor: isDark ? Colors.dark.border : Colors.light.border,
          }
        ]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <ThemedText style={[
          styles.dropdownButtonText,
          { 
            color: value 
              ? (isDark ? Colors.dark.text : Colors.light.text)
              : (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
          }
        ]}>
          {value || placeholder}
        </ThemedText>
        <ThemedText style={[
          styles.dropdownArrow,
          { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
        ]}>
          ▼
        </ThemedText>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <ThemedView style={[
            styles.modalContent,
            { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
          ]}>
            <ThemedView style={styles.modalHeader}>
              <ThemedText style={[
                styles.modalTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                Select {label}
              </ThemedText>
              <TouchableOpacity 
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <ThemedText style={[
                  styles.closeButtonText,
                  { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
                ]}>
                  ✕
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
            
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    value === item && {
                      backgroundColor: isDark ? Colors.dark.tint + '20' : Colors.light.tint + '20'
                    },
                    {
                      borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
                    }
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[
                    styles.optionText,
                    { color: isDark ? Colors.dark.text : Colors.light.text },
                    value === item && {
                      color: isDark ? Colors.dark.tint : Colors.light.tint,
                      fontWeight: '600'
                    }
                  ]}>
                    {item}
                  </ThemedText>
                  {value === item && (
                    <ThemedText style={[
                      styles.selectedIcon,
                      { color: isDark ? Colors.dark.tint : Colors.light.tint }
                    ]}>
                      ✓
                    </ThemedText>
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </ThemedView>
        </TouchableOpacity>
      </Modal>
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
  
  // 🔥 NEW: Consent Dialog Styles
  consentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  consentDialog: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  consentHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  consentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  consentBody: {
    gap: 16,
    marginBottom: 24,
  },
  consentText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  consentSubtext: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  consentButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  consentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

  // Language Section Styles
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

  // Dropdown Styles
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '70%',
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  selectedIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
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
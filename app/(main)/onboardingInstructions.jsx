// app/(main)/onboardingInstructions.jsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TouchableOpacity, 
  ActivityIndicator,
  StatusBar,
  Platform,
  Dimensions 
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;

export default function OnboardingInstructionsScreen() {
  const { user, supabaseData, updateUserProfile } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [currentSection, setCurrentSection] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Shared values for reanimated worklets
  const currentSectionShared = useSharedValue(0);
  const translateX = useSharedValue(0);
  const swipeHintOpacity = useSharedValue(1);
  const swipeHintTranslateX = useSharedValue(0);

  // Get user's preferred language
  const preferredLanguage = supabaseData?.preferred_language || 'en';

  const sections = [
    {
      id: 'welcome',
      icon: 'nature-people',
      title: {
        en: 'Welcome to ZoologIQ',
        ms: 'Selamat Datang ke ZoologIQ'
      },
      content: {
        en: 'Embark on an exciting journey to discover Malaysia\'s incredible wildlife. Your learning adventure starts here.',
        ms: 'Mulakan perjalanan menarik untuk meneroka hidupan liar Malaysia yang luar biasa. Pengembaraan pembelajaran anda bermula di sini.'
      },
      features: [
        {
          icon: 'school',
          title: { en: 'Interactive Learning', ms: 'Pembelajaran Interaktif' },
          desc: { en: 'Engaging lessons and quizzes', ms: 'Pelajaran dan kuiz yang menarik' }
        },
        {
          icon: 'nature',
          title: { en: 'Wildlife Discovery', ms: 'Penemuan Hidupan Liar' },
          desc: { en: 'Learn about amazing animals', ms: 'Pelajari tentang haiwan yang menakjubkan' }
        },
        {
          icon: 'eco',
          title: { en: 'Conservation Awareness', ms: 'Kesedaran Pemuliharaan' },
          desc: { en: 'Become a conservation champion', ms: 'Jadilah juara pemuliharaan' }
        }
      ]
    },
    {
      id: 'animals',
      icon: 'pets',
      title: {
        en: 'Meet Our Wildlife Heroes',
        ms: 'Temui Wira Hidupan Liar Kita'
      },
      content: {
        en: 'Discover three magnificent creatures that call Malaysia home. Each has a unique story waiting to be told.',
        ms: 'Temui tiga makhluk hebat yang mendiami Malaysia. Setiap satu mempunyai cerita unik yang menanti untuk diceritakan.'
      },
      animals: [
        {
          icon: 'pets',
          name: { en: 'Malayan Tiger', ms: 'Harimau Malaya' },
          desc: { en: 'Malaysia\'s national animal', ms: 'Haiwan kebangsaan Malaysia' },
          color: '#FF6B35'
        },
        {
          icon: 'forest',
          name: { en: 'Malayan Tapir', ms: 'Tapir Malaya' },
          desc: { en: 'Ancient forest gardener', ms: 'Penjaga hutan purba' },
          color: '#4CAF50'
        },
        {
          icon: 'waves',
          name: { en: 'Green Sea Turtle', ms: 'Penyu Agar' },
          desc: { en: 'Ocean wanderer', ms: 'Pengembara lautan' },
          color: '#2196F3'
        }
      ]
    },
    {
      id: 'features',
      icon: 'star',
      title: {
        en: 'Your Learning Journey',
        ms: 'Perjalanan Pembelajaran Anda'
      },
      content: {
        en: 'Track your progress, earn achievements, and make a real difference in wildlife conservation.',
        ms: 'Jejaki kemajuan anda, peroleh pencapaian, dan buat perbezaan sebenar dalam pemuliharaan hidupan liar.'
      },
      journey: [
        {
          icon: 'quiz',
          step: { en: 'Learn', ms: 'Belajar' },
          desc: { en: 'Interactive lessons about each animal', ms: 'Pelajaran interaktif tentang setiap haiwan' }
        },
        {
          icon: 'psychology',
          step: { en: 'Test', ms: 'Uji' },
          desc: { en: 'Quizzes to reinforce knowledge', ms: 'Kuiz untuk perkukuh pengetahuan' }
        },
        {
          icon: 'workspace-premium',
          step: { en: 'Achieve', ms: 'Capai' },
          desc: { en: 'Earn certificates and badges', ms: 'Peroleh sijil dan lencana' }
        }
      ]
    },
    {
      id: 'instructions',
      icon: 'assignment',
      title: {
        en: 'How It Works',
        ms: 'Cara Ia Berfungsi'
      },
      content: {
        en: 'Follow these simple steps to make the most of your learning experience with ZoologIQ.',
        ms: 'Ikuti langkah mudah ini untuk memaksimumkan pengalaman pembelajaran anda dengan ZoologIQ.'
      },
      instructions: [
        {
          icon: 'quiz',
          step: '1',
          title: { en: 'Pre-Assessment', ms: 'Pra-Penilaian' },
          desc: { 
            en: 'First complete pretest to assess your existing knowledge before start the learning on each animal species.',
            ms: 'Mula-mula lengkapkan ujian awal untuk menilai pengetahuan sedia ada anda sebelum mula pembelajaran setiap spesies haiwan.'
          }
        },
        {
          icon: 'save',
          step: '2',
          title: { en: 'Save Progress', ms: 'Simpan Kemajuan' },
          desc: { 
            en: 'You can save your progress before leaving the app every time',
            ms: 'Anda boleh menyimpan kemajuan anda sebelum meninggalkan aplikasi setiap kali'
          }
        },
        {
          icon: 'workspace-premium',
          step: '3',
          title: { en: 'Earn Certificate', ms: 'Peroleh Sijil' },
          desc: { 
            en: 'Earn a certificate after successfully complete the course and post test',
            ms: 'Peroleh sijil selepas berjaya menamatkan kursus dan ujian akhir'
          }
        }
      ]
    },
    {
      id: 'mission',
      icon: 'favorite',
      title: {
        en: 'Join Our Conservation Mission',
        ms: 'Sertai Misi Pemuliharaan Kami'
      },
      content: {
        en: 'Together, we can protect Malaysia\'s precious wildlife for future generations. Every action counts.',
        ms: 'Bersama-sama, kita boleh melindungi hidupan liar Malaysia yang berharga untuk generasi akan datang. Setiap tindakan penting.'
      },
      quote: {
        en: 'The Earth does not belong to us; we belong to the Earth.',
        ms: 'Bumi bukan milik kita; kita milik Bumi.'
      }
    }
  ];

  const TOTAL_SECTIONS = sections.length;

  // Disable back gesture during onboarding
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; // Disable back button
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription?.remove();
    }, [])
  );

  // Sync shared value with state
  useEffect(() => {
    currentSectionShared.value = currentSection;
  }, [currentSection]);

  // Show swipe hint animation
  useEffect(() => {
    if (showSwipeHint) {
      // Animate swipe hint
      swipeHintTranslateX.value = withRepeat(
        withSequence(
          withTiming(20, { duration: 800 }),
          withTiming(-20, { duration: 800 }),
          withTiming(0, { duration: 400 })
        ),
        3, // Repeat 3 times
        false
      );

      // Hide hint after 5 seconds
      const timer = setTimeout(() => {
        swipeHintOpacity.value = withTiming(0, { duration: 500 });
        setShowSwipeHint(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  // Reset swipe hint when section changes
  useEffect(() => {
    if (currentSection === 0 || currentSection === TOTAL_SECTIONS - 1) {
      setShowSwipeHint(true);
      swipeHintOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [currentSection]);

  // Helper functions for section navigation
  const goToNextSection = (newSection) => {
    setCurrentSection(newSection);
  };

  const goToPrevSection = (newSection) => {
    setCurrentSection(newSection);
  };

  const hideSwipeHint = () => {
    setShowSwipeHint(false);
  };

  // Pan gesture handler with proper worklet context
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      
      // Hide swipe hint when user starts swiping
      if (swipeHintOpacity.value > 0) {
        swipeHintOpacity.value = withTiming(0, { duration: 200 });
        runOnJS(hideSwipeHint)();
      }
    },
    onEnd: (event) => {
      const { translationX, velocityX } = event;
      const currentIdx = currentSectionShared.value;
      
      let shouldGoNext = false;
      let shouldGoPrev = false;
      
      // Determine swipe direction based on distance and velocity
      if (translationX < -SWIPE_THRESHOLD || velocityX < -500) {
        shouldGoNext = true;
      } else if (translationX > SWIPE_THRESHOLD || velocityX > 500) {
        shouldGoPrev = true;
      }
      
      // Reset position
      translateX.value = withSpring(0);
      
      // Navigate
      if (shouldGoNext && currentIdx < TOTAL_SECTIONS - 1) {
        const newSection = currentIdx + 1;
        runOnJS(goToNextSection)(newSection);
      } else if (shouldGoPrev && currentIdx > 0) {
        const newSection = currentIdx - 1;
        runOnJS(goToPrevSection)(newSection);
      }
    },
  });

  // Animated styles
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [-screenWidth, 0, screenWidth],
            [-screenWidth * 0.3, 0, screenWidth * 0.3]
          ),
        },
      ],
    };
  });

  const swipeHintStyle = useAnimatedStyle(() => {
    return {
      opacity: swipeHintOpacity.value,
      transform: [
        { translateX: swipeHintTranslateX.value },
      ],
    };
  });

  const currentSectionData = sections[currentSection];
  const isLastSection = currentSection === TOTAL_SECTIONS - 1;

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < TOTAL_SECTIONS - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleGetStarted = async () => {
    setIsCompleting(true);
    try {
      const updateData = { onboarding_completed: true };
      const success = await updateUserProfile(updateData);
      
      if (success) {
        router.replace('/');
      } else {
        console.error('Failed to complete onboarding');
        router.replace('/');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      router.replace('/');
    } finally {
      setIsCompleting(false);
    }
  };

  const text = {
    en: {
      getStarted: 'Get Started',
      completing: 'Completing Setup...',
      swipeHint: 'Swipe to navigate'
    },
    ms: {
      getStarted: 'Mula Sekarang',
      completing: 'Menyelesaikan Tetapan...',
      swipeHint: 'Leret untuk navigasi'
    }
  };

  const currentText = text[preferredLanguage] || text.en;

  return (
    <ThemedView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
      />
      
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.container, animatedContentStyle]}>
          {/* Fixed Hero Section */}
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
                name={currentSectionData.icon} 
                size={40} 
                color={isDark ? Colors.dark.tint : Colors.light.tint} 
              />
            </View>
            
            <ThemedText style={[
              styles.heroTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {currentSectionData.title[preferredLanguage]}
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

          {/* Main Content Section - Now Scrollable */}
          <ThemedView style={[
            styles.section,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              shadowColor: isDark ? Colors.dark.text : Colors.light.text,
            }
          ]}>
            <ThemedText style={[
              styles.contentText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {currentSectionData.content[preferredLanguage]}
            </ThemedText>

            {/* Scrollable Content Area */}
            <ScrollView 
              style={styles.sectionScrollView}
              contentContainerStyle={styles.sectionScrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {/* Features Section */}
              {currentSectionData.features && (
                <View style={styles.featuresContainer}>
                  {currentSectionData.features.map((feature, index) => (
                    <View key={index} style={[
                      styles.featureCard,
                      { 
                        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                        borderColor: isDark ? Colors.dark.border : Colors.light.border
                      }
                    ]}>
                      <View style={[
                        styles.featureIcon,
                        { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + '20' }
                      ]}>
                        <MaterialIcons 
                          name={feature.icon} 
                          size={24} 
                          color={isDark ? Colors.dark.tint : Colors.light.tint} 
                        />
                      </View>
                      <View style={styles.featureContent}>
                        <ThemedText style={[
                          styles.featureTitle,
                          { color: isDark ? Colors.dark.text : Colors.light.text }
                        ]}>
                          {feature.title[preferredLanguage]}
                        </ThemedText>
                        <ThemedText style={[
                          styles.featureDesc,
                          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                        ]}>
                          {feature.desc[preferredLanguage]}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Animals Section */}
              {currentSectionData.animals && (
                <View style={styles.animalsContainer}>
                  {currentSectionData.animals.map((animal, index) => (
                    <View key={index} style={[
                      styles.animalCard,
                      { 
                        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                        borderColor: isDark ? Colors.dark.border : Colors.light.border
                      }
                    ]}>
                      <View style={[
                        styles.animalIcon,
                        { backgroundColor: animal.color + '20' }
                      ]}>
                        <MaterialIcons 
                          name={animal.icon} 
                          size={28} 
                          color={animal.color} 
                        />
                      </View>
                      <ThemedText style={[
                        styles.animalName,
                        { color: isDark ? Colors.dark.text : Colors.light.text }
                      ]}>
                        {animal.name[preferredLanguage]}
                      </ThemedText>
                      <ThemedText style={[
                        styles.animalDesc,
                        { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                      ]}>
                        {animal.desc[preferredLanguage]}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              )}

              {/* Journey Steps */}
              {currentSectionData.journey && (
                <View style={styles.journeyContainer}>
                  {currentSectionData.journey.map((step, index) => (
                    <View key={index} style={[
                      styles.journeyStep,
                      { 
                        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                        borderColor: isDark ? Colors.dark.border : Colors.light.border
                      }
                    ]}>
                      <View style={[
                        styles.stepIcon,
                        { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + '20' }
                      ]}>
                        <MaterialIcons 
                          name={step.icon} 
                          size={24} 
                          color={isDark ? Colors.dark.tint : Colors.light.tint} 
                        />
                      </View>
                      <View style={styles.stepContent}>
                        <ThemedText style={[
                          styles.stepTitle,
                          { color: isDark ? Colors.dark.text : Colors.light.text }
                        ]}>
                          {step.step[preferredLanguage]}
                        </ThemedText>
                        <ThemedText style={[
                          styles.stepDesc,
                          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                        ]}>
                          {step.desc[preferredLanguage]}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Instructions Steps */}
              {currentSectionData.instructions && (
                <View style={styles.instructionsContainer}>
                  {currentSectionData.instructions.map((instruction, index) => (
                    <View key={index} style={[
                      styles.instructionStep,
                      { 
                        backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                        borderColor: isDark ? Colors.dark.border : Colors.light.border
                      }
                    ]}>
                      <View style={[
                        styles.instructionStepNumber,
                        { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                      ]}>
                        <ThemedText style={styles.stepNumber}>
                          {instruction.step}
                        </ThemedText>
                      </View>
                      
                      <View style={[
                        styles.instructionIcon,
                        { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + '20' }
                      ]}>
                        <MaterialIcons 
                          name={instruction.icon} 
                          size={20} 
                          color={isDark ? Colors.dark.tint : Colors.light.tint} 
                        />
                      </View>
                      
                      <View style={styles.instructionContent}>
                        <ThemedText style={[
                          styles.instructionTitle,
                          { color: isDark ? Colors.dark.text : Colors.light.text }
                        ]}>
                          {instruction.title[preferredLanguage]}
                        </ThemedText>
                        <ThemedText style={[
                          styles.instructionDesc,
                          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                        ]}>
                          {instruction.desc[preferredLanguage]}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>

            {/* Quote Section for Mission - Outside scrollview */}
            {currentSectionData.quote && (
              <ThemedView style={[
                styles.quoteSection,
                { 
                  backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary,
                  borderLeftColor: isDark ? Colors.dark.tint : Colors.light.tint
                }
              ]}>
                <MaterialIcons 
                  name="format-quote" 
                  size={28} 
                  color={isDark ? Colors.dark.tint : Colors.light.tint}
                  style={styles.quoteIcon}
                />
                <ThemedText style={[
                  styles.quoteText,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}>
                  {currentSectionData.quote[preferredLanguage]}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </Animated.View>
      </PanGestureHandler>

      {/* Swipe Hint Overlay */}
      {showSwipeHint && (
        <Animated.View style={[styles.swipeHintOverlay, swipeHintStyle]}>
          <View style={[
            styles.swipeHintContainer,
            { backgroundColor: (isDark ? Colors.dark.tint : Colors.light.tint) + 'DD' }
          ]}>
            <MaterialIcons name="swipe" size={24} color="#fff" />
            <ThemedText style={styles.swipeHintText}>
              {currentText.swipeHint}
            </ThemedText>
            <View style={styles.swipeIndicators}>
              <MaterialIcons name="keyboard-arrow-left" size={20} color="#fff" />
              <MaterialIcons name="keyboard-arrow-right" size={20} color="#fff" />
            </View>
          </View>
        </Animated.View>
      )}

      {/* Bottom Navigation */}
      <View style={[
        styles.bottomNav,
        { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }
      ]}>
        {/* Navigation Controls */}
        <View style={styles.navControls}>
          {/* Previous Button */}
          <TouchableOpacity
            style={[
              styles.navButton,
              { 
                backgroundColor: currentSection > 0 
                  ? (isDark ? Colors.dark.tint : Colors.light.tint)
                  : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                opacity: currentSection > 0 ? 1 : 0.5
              }
            ]}
            onPress={handlePrevious}
            disabled={currentSection === 0}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="chevron-left" 
              size={24} 
              color={currentSection > 0 ? "#fff" : (isDark ? Colors.dark.textMuted : Colors.light.textMuted)} 
            />
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {sections.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: index === currentSection
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.border : Colors.light.border)
                  }
                ]}
                onPress={() => setCurrentSection(index)}
                activeOpacity={0.8}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.navButton,
              { 
                backgroundColor: !isLastSection 
                  ? (isDark ? Colors.dark.tint : Colors.light.tint)
                  : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                opacity: !isLastSection ? 1 : 0.5
              }
            ]}
            onPress={handleNext}
            disabled={isLastSection}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={!isLastSection ? "#fff" : (isDark ? Colors.dark.textMuted : Colors.light.textMuted)} 
            />
          </TouchableOpacity>
        </View>

        {/* Get Started Button */}
        {isLastSection && (
          <TouchableOpacity
            style={[
              styles.getStartedButton,
              { 
                backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
                opacity: isCompleting ? 0.7 : 1
              }
            ]}
            onPress={handleGetStarted}
            disabled={isCompleting}
            activeOpacity={0.8}
          >
            {isCompleting ? (
              <View style={styles.loadingContent}>
                <ActivityIndicator size="small" color="#fff" />
                <ThemedText style={styles.buttonText}>
                  {currentText.completing}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <MaterialIcons name="rocket-launch" size={20} color="#fff" />
                <ThemedText style={styles.buttonText}>
                  {currentText.getStarted}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Hero Section - Fixed at top
  heroSection: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    margin: 16,
    marginBottom: 8,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  decorativeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  decorativeEmoji: {
    fontSize: 16,
  },
  
  // Main Content Section - Scrollable
  section: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1, // Take remaining space
    paddingTop: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  
  // 🔥 NEW: Scrollable section styles
  sectionScrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionScrollContent: {
    paddingBottom: 16,
  },
  
  // Features - Compact
  featuresContainer: {
    gap: 8,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Animals - Compact
  animalsContainer: {
    gap: 8,
  },
  animalCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  animalIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  animalName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  animalDesc: {
    fontSize: 12,
    textAlign: 'center',
  },
  
  // Journey Steps - Compact
  journeyContainer: {
    gap: 10,
  },
  journeyStep: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Instructions - Compact
  instructionsContainer: {
    gap: 10,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  instructionStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  instructionContent: {
    flex: 1,
    paddingTop: 1,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructionDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Quote Section - Compact
  quoteSection: {
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 4,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quoteIcon: {
    marginBottom: 8,
    opacity: 0.7,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  
  // Swipe Hint Overlay
  swipeHintOverlay: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  swipeHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  swipeHintText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  swipeIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Bottom Navigation
  bottomNav: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },
  navControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
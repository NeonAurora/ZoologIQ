// components/lesson/turtle/TurtleLessonLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAudio } from '@/hooks/useAudio';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { startLesson, markSectionCompleted } from '@/services/supabase/learningSessionService';
import TurtleIntroduction from './sections/TurtleIntroduction';
import TurtleBiology from './sections/TurtleBiology';
import TurtleBehavior from './sections/TurtleBehavior';
import TurtleReproduction from './sections/TurtleReproduction';
import TurtleBiodiversity from './sections/TurtleBiodiversity';
import TurtleThreats from './sections/TurtleThreats';
import TurtleConservation from './sections/TurtleConservation';
import TurtleSidebar from './TurtleSidebar';
import TurtleNavigation from './TurtleNavigation';
import { ThemedText } from '@/components/ThemedText';
import LanguageToggle from '@/components/quiz/LanguageToggle';
import AudioPlayer from '@/components/audio/AudioPlayer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function TurtleLessonLayout({ quizId, sessionId }) {
  const { colorScheme } = useColorScheme();
  const { supabaseData } = useAuth();
  const isDark = colorScheme === 'dark';
  
  // 🔥 MOVE THIS FIRST: Language state management
  const [currentLanguage, setCurrentLanguage] = useState(
    supabaseData?.preferred_language || 'en'
  );

  // 🔥 NOW USE IT: Audio hook can access currentLanguage
  const { currentAudioUrl, loading: audioLoading } = useAudio('turtle', currentLanguage);

  // Update language when user's preference changes
  useEffect(() => {
    if (supabaseData?.preferred_language) {
      setCurrentLanguage(supabaseData.preferred_language);
    }
  }, [supabaseData?.preferred_language]);

  // 🔥 UPDATED: Bilingual content objects
  const content = {
    en: {
      lessonName: 'Green Sea Turtle',
      errorMessage: 'Unable to load lesson content',
      sections: [
        { id: 'introduction', title: 'Introduction & Basics' },
        { id: 'biology', title: 'Biology & Adaptations' },
        { id: 'behavior', title: 'Behavior & Intelligence' },
        { id: 'reproduction', title: 'Reproduction & Life Cycle' },
        { id: 'biodiversity', title: 'Biodiversity & Ecology' },
        { id: 'threats', title: 'Threats & Challenges' },
        { id: 'conservation', title: 'Conservation & Success Stories' },
      ]
    },
    ms: {
      lessonName: 'Penyu Agar',
      errorMessage: 'Tidak dapat memuatkan kandungan pelajaran',
      sections: [
        { id: 'introduction', title: 'Pengenalan & Asas' },
        { id: 'biology', title: 'Biologi & Adaptasi' },
        { id: 'behavior', title: 'Tingkah Laku & Kecerdasan' },
        { id: 'reproduction', title: 'Pembiakan & Kitaran Hidup' },
        { id: 'biodiversity', title: 'Biodiversiti & Ekologi' },
        { id: 'threats', title: 'Ancaman & Cabaran' },
        { id: 'conservation', title: 'Pemuliharaan & Kisah Kejayaan' },
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  // 🔥 UPDATED: Use bilingual section titles with currentLanguage
  const sections = text.sections.map((section, index) => ({
    ...section,
    component: [
      TurtleIntroduction,
      TurtleBiology,
      TurtleBehavior,
      TurtleReproduction,
      TurtleBiodiversity,
      TurtleThreats,
      TurtleConservation,
    ][index]
  }));

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hasStartedLesson, setHasStartedLesson] = useState(false);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Animation for sidebar
  const slideAnim = useRef(new Animated.Value(-240)).current; // Start off-screen
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  
  const navigationTimeoutRef = useRef(null);
  const pendingNavigationRef = useRef(null);

  const safeSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
  const currentSection = sections[safeSectionIndex];

  // 🔥 NEW: Language change handler
  const handleLanguageChange = (newLanguage) => {
    console.log('🌐 Turtle lesson language changed to:', newLanguage);
    setCurrentLanguage(newLanguage);
  };

  // Sidebar animation handlers
  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -240,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      setSidebarVisible(false);
    });
  };

  const toggleSidebar = () => {
    if (sidebarVisible) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  // Track lesson start
  useEffect(() => {
    if (sessionId && !hasStartedLesson) {
      const trackLessonStart = async () => {
        try {
          await startLesson(sessionId);
          setHasStartedLesson(true);
          console.log('Lesson content viewing started for session:', sessionId);
        } catch (error) {
          console.error('Error tracking lesson start:', error);
        }
      };
      
      trackLessonStart();
    }
  }, [sessionId, hasStartedLesson]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Debounced navigation function
  const debouncedNavigation = (targetIndex) => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    pendingNavigationRef.current = targetIndex;

    navigationTimeoutRef.current = setTimeout(() => {
      const finalIndex = pendingNavigationRef.current;
      if (finalIndex !== null && finalIndex >= 0 && finalIndex < sections.length) {
        setCurrentSectionIndex(finalIndex);
        setIsNavigating(false);
      }
      pendingNavigationRef.current = null;
    }, 300);
  };

  const safeSetCurrentSectionIndex = (newIndex) => {
    if (isNavigating) {
      console.log('Navigation in progress, queuing new navigation');
      debouncedNavigation(newIndex);
      return;
    }

    if (newIndex >= 0 && newIndex < sections.length) {
      setIsNavigating(true);
      debouncedNavigation(newIndex);
    } else {
      console.warn(`Invalid section index: ${newIndex}. Valid range: 0-${sections.length - 1}`);
      setCurrentSectionIndex(0);
    }
  };

  const markCurrentSectionCompleted = async () => {
    if (sessionId && hasStartedLesson && !completedSections.has(safeSectionIndex)) {
      try {
        const section = sections[safeSectionIndex];
        await markSectionCompleted(sessionId, safeSectionIndex, section.title);
        setCompletedSections(prev => new Set([...prev, safeSectionIndex]));
      } catch (error) {
        console.error('Error marking section as completed:', error);
      }
    }
  };

  const goToNextSection = async () => {
    if (isNavigating) {
      console.log('Already navigating, ignoring rapid click');
      return;
    }

    setIsNavigating(true);
    
    try {
      markCurrentSectionCompleted();
      
      const nextIndex = safeSectionIndex + 1;
      if (nextIndex < sections.length) {
        safeSetCurrentSectionIndex(nextIndex);
      } else {
        setIsNavigating(false);
      }
    } catch (error) {
      console.error('Error in goToNextSection:', error);
      setIsNavigating(false);
    }
  };

  const goToPreviousSection = async () => {
    if (isNavigating) {
      console.log('Already navigating, ignoring rapid click');
      return;
    }

    setIsNavigating(true);
    
    try {
      markCurrentSectionCompleted();
      
      const prevIndex = safeSectionIndex - 1;
      if (prevIndex >= 0) {
        safeSetCurrentSectionIndex(prevIndex);
      } else {
        setIsNavigating(false);
      }
    } catch (error) {
      console.error('Error in goToPreviousSection:', error);
      setIsNavigating(false);
    }
  };

  const handleLessonComplete = async () => {
    if (isNavigating) {
      console.log('Navigation in progress, ignoring lesson complete');
      return;
    }

    if (sessionId) {
      await markCurrentSectionCompleted();
      console.log('All lesson sections completed');
    }
  };

  const handleSectionSelect = async (index) => {
    if (isNavigating) {
      console.log('Navigation in progress, ignoring sidebar click');
      return;
    }
    
    setIsNavigating(true);
    markCurrentSectionCompleted();
    safeSetCurrentSectionIndex(index);
    closeSidebar(); // Close sidebar after selection
  };

  if (!currentSection || !currentSection.component) {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            {text.errorMessage}
          </ThemedText>
        </View>
      </View>
    );
  }

  const CurrentSectionComponent = currentSection.component;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Mobile Header */}
        <View style={[
          styles.mobileHeader,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
          }
        ]}>
          <TouchableOpacity 
            style={styles.sidebarToggle}
            onPress={toggleSidebar}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons 
              name="chevron-right" 
              size={20} 
              color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} 
            />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <ThemedText style={styles.lessonEmoji}>🐢</ThemedText>
            <View style={styles.headerTitleContainer}>
              <ThemedText style={[
                styles.headerTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {currentSection.title}
              </ThemedText>
              <ThemedText style={[
                styles.lessonName,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}>
                {text.lessonName}
              </ThemedText>
            </View>
          </View>

          {/* 🔥 NEW: Header Actions with Audio Player and Language Toggle */}
          <View style={styles.headerActions}>
            {/* Audio Player */}
            <AudioPlayer
              audioUrl={currentAudioUrl}
              currentLanguage={currentLanguage}
              size="medium"
              style={styles.audioPlayer}
            />
            
            {/* Language Toggle */}
            <View style={styles.languageToggleContainer}>
              <LanguageToggle 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                size="compact"
              />
            </View>
          </View>
        </View>
        
        {/* Lesson Content */}
        <View style={styles.lessonContent}>
          {/* 🔥 UPDATED: Pass language to section component */}
          <CurrentSectionComponent currentLanguage={currentLanguage} />
        </View>
      </View>
      
      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <TurtleNavigation
          currentIndex={safeSectionIndex}
          totalSections={sections.length}
          currentLanguage={currentLanguage}
          onNext={goToNextSection}
          onPrevious={goToPreviousSection}
          onComplete={handleLessonComplete}
          quizId={quizId}
          sessionId={sessionId}
          isNavigating={isNavigating}
        />
      </View>

      {/* Sidebar Overlay */}
      {sidebarVisible && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <Animated.View style={[
              styles.overlay,
              { opacity: overlayOpacity }
            ]} />
          </TouchableWithoutFeedback>
          
          <TurtleSidebar 
            sections={sections}
            currentSection={safeSectionIndex}
            completedSections={completedSections}
            currentLanguage={currentLanguage}
            onSectionSelect={handleSectionSelect}
            onClose={closeSidebar}
            slideAnim={slideAnim}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12, // 🔥 NEW: Added gap for better spacing
  },
  sidebarToggle: {
    padding: 8,
    marginRight: 12,
    borderRadius: 6,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // 🔥 NEW: Added gap
  },
  // 🔥 NEW: Header actions container
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // 🔥 NEW: Audio player styling
  audioPlayer: {
    marginRight: 4,
  },
  lessonEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  lessonName: {
    fontSize: 12,
    marginTop: 2,
  },
  languageToggleContainer: {
    // 🔥 UPDATED: Removed marginLeft since we're using gap in headerActions
  },
  lessonContent: {
    flex: 1,
  },
  navigationContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 999,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
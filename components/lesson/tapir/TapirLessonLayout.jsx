// components/lesson/tapir/TapirLessonLayout.jsx

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

import TapirIntroduction from './sections/TapirIntroduction';
import TapirConservation from './sections/TapirConservation';
import TapirThreats from './sections/TapirThreats';
import TapirPopulation from './sections/TapirPopulation';
import TapirBehavior from './sections/TapirBehavior';
import TapirInfographics from './sections/TapirInfographics';
import TapirReferences from './sections/TapirReferences';

import TapirSidebar from './TapirSidebar';
import TapirNavigation from './TapirNavigation';

import { ThemedText } from '@/components/ThemedText';
import LanguageToggle from '@/components/quiz/LanguageToggle';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AudioPlayer from '@/components/audio/AudioPlayer';

const { width: screenWidth } = Dimensions.get('window');

export default function TapirLessonLayout() {
  const { colorScheme } = useColorScheme();
  const { supabaseData } = useAuth();
  const isDark = colorScheme === 'dark';

  // Language state
  const [currentLanguage, setCurrentLanguage] = useState(
    supabaseData?.preferred_language || 'en'
  );

  const { currentAudioUrl, loading: audioLoading } = useAudio('tapir', currentLanguage);

  // 🔥 NEW: Audio control ref
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (supabaseData?.preferred_language) {
      setCurrentLanguage(supabaseData.preferred_language);
    }
  }, [supabaseData?.preferred_language]);

  // Bilingual section titles
  const content = {
    en: {
      lessonName: 'Malayan Tapir',
      unableToLoadContent: 'Unable to load lesson content',
      sections: [
        { id: 'introduction', title: 'Introduction & Basics' },
        { id: 'conservation',  title: 'Conservation & Biodiversity' },
        { id: 'threats',       title: 'Conservation Strategies & Success Stories' },
        { id: 'behavior',      title: 'Behavior & Physiology' },
        { id: 'population',    title: 'Population Data' },
        { id: 'infographics',  title: 'Infographics' },
        { id: 'references',    title: 'References' }
      ]
    },
    ms: {
      lessonName: 'Tapir Malaya',
      unableToLoadContent: 'Tidak dapat memuatkan kandungan pelajaran',
      sections: [
        { id: 'introduction', title: 'Pengenalan & Asas' },
        { id: 'conservation',  title: 'Pemuliharaan & Biodiversiti' },
        { id: 'threats',       title: 'Strategi Pemuliharaan & Kisah Kejayaan' },
        { id: 'behavior',      title: 'Tingkah Laku & Fisiologi' },
        { id: 'population',    title: 'Data Populasi' },
        { id: 'infographics',  title: 'Infografik' },
        { id: 'references',    title: 'Rujukan' }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  // Map sections to components
  const sectionComponents = [
    TapirIntroduction,
    TapirConservation,
    TapirThreats,
    TapirBehavior,
    TapirPopulation,
    TapirInfographics,
    TapirReferences
  ];

  const sections = text.sections.map((section, idx) => ({
    ...section,
    component: sectionComponents[idx]
  }));

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Sidebar animations
  const slideAnim = useRef(new Animated.Value(-240)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const navigationTimeoutRef = useRef(null);
  const pendingNavigationRef = useRef(null);

  const safeSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
  const currentSection = sections[safeSectionIndex];
  const CurrentSectionComponent = currentSection.component;

  // 🔥 NEW: Audio control functions
  const handleStopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
    }
  };

  const handlePauseAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
  };

  // Language toggle handler
  const handleLanguageChange = (newLang) => {
    setCurrentLanguage(newLang);
  };

  // Sidebar open/close
  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0.5, duration: 300, useNativeDriver: true })
    ]).start();
  };
  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -240, duration: 250, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 250, useNativeDriver: true })
    ]).start(() => setSidebarVisible(false));
  };
  const toggleSidebar = () => sidebarVisible ? closeSidebar() : openSidebar();

  // Clean up on unmount
  useEffect(() => {
    return () => navigationTimeoutRef.current && clearTimeout(navigationTimeoutRef.current);
  }, []);

  // Debounced navigation helper
  const debouncedNavigation = (target) => {
    clearTimeout(navigationTimeoutRef.current);
    pendingNavigationRef.current = target;
    navigationTimeoutRef.current = setTimeout(() => {
      const idx = pendingNavigationRef.current;
      if (idx >= 0 && idx < sections.length) {
        setCurrentSectionIndex(idx);
        setIsNavigating(false);
      }
      pendingNavigationRef.current = null;
    }, 300);
  };

  const safeNavigate = (idx) => {
    if (isNavigating) {
      debouncedNavigation(idx);
      return;
    }
    setIsNavigating(true);
    debouncedNavigation(idx);
  };

  const goToNextSection = () => safeNavigate(safeSectionIndex + 1);
  const goToPreviousSection = () => safeNavigate(safeSectionIndex - 1);

  const handleSectionSelect = (idx) => {
    safeNavigate(idx);
    closeSidebar();
  };

  if (!currentSection || !CurrentSectionComponent) {
    return (
      <View style={[ styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background } ]}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{text.unableToLoadContent}</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={[ styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background } ]}>
      {/* Header */}
      <View style={[ styles.mobileHeader, {
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
      }]}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.sidebarToggle} hitSlop={{ top:10, bottom:10, left:10, right:10 }}>
          <MaterialIcons name="chevron-right" size={20} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}/>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <ThemedText style={styles.lessonEmoji}>🌴</ThemedText>
          <View style={styles.headerTitleContainer}>
            <ThemedText style={[styles.headerTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              {currentSection.title}
            </ThemedText>
            <ThemedText style={[styles.lessonName, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
              {text.lessonName}
            </ThemedText>
          </View>
        </View>
        <View style={styles.headerActions}>
          {/* 🔥 UPDATED: AudioPlayer with ref and loop control */}
          <AudioPlayer 
            ref={audioPlayerRef}
            audioUrl={currentAudioUrl} 
            currentLanguage={currentLanguage} 
            size="medium" 
            style={styles.audioPlayer}
            loop={false} // 🔥 NEW: Disable looping
            stopOnComplete={true} // 🔥 NEW: Stop when audio completes
          />
          <LanguageToggle currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} size="compact"/>
        </View>
      </View>

      {/* Lesson Content */}
      <View style={styles.contentContainer}>
        <CurrentSectionComponent currentLanguage={currentLanguage}/>
      </View>

      {/* Footer Navigation */}
      <View style={styles.navigationContainer}>
        <TapirNavigation
          currentIndex={safeSectionIndex}
          totalSections={sections.length}
          currentLanguage={currentLanguage}
          onNext={goToNextSection}
          onPrevious={goToPreviousSection}
          onComplete={() => {}}
          isNavigating={isNavigating}
          topic="tapir"
          onStopAudio={handleStopAudio} // 🔥 NEW: Pass stop audio function
          onPauseAudio={handlePauseAudio} // 🔥 NEW: Pass pause audio function
        />
      </View>

      {/* Sidebar Overlay */}
      {sidebarVisible && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <Animated.View style={[ styles.overlay, { opacity: overlayOpacity } ]}/>
          </TouchableWithoutFeedback>
          <TapirSidebar
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
  container: { flex: 1 },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1
  },
  sidebarToggle: { padding: 8, marginRight: 12, borderRadius: 6 },
  headerContent: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  lessonEmoji: { fontSize: 20, marginRight: 12 },
  headerTitleContainer: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  lessonName: { fontSize: 12, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  audioPlayer: { marginRight: 4 },
  contentContainer: { flex: 1 },
  navigationContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000',
    zIndex: 999
  },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, textAlign: 'center' }
});
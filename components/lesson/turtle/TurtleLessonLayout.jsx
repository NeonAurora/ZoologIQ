// components/lesson/turtle/TurtleLessonLayout.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAudio } from '@/hooks/useAudio';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

import TurtleIntroBasics     from './sections/TurtleIntroBasics';     
import TurtleBiodivWhy       from './sections/TurtleBiodivWhy';       
import TurtleThreatsHelpCons from './sections/TurtleThreatsHelpCons'; 
import TurtlePhysioBehavior  from './sections/TurtlePhysioBehavior';  
import TurtlePopulation      from './sections/TurtlePopulation';      
import TurtleInfographics    from './sections/TurtleInfographics';    
import TurtleReferences      from './sections/TurtleReferences';      

import TurtleSidebar    from './TurtleSidebar';
import TurtleNavigation from './TurtleNavigation';
import { ThemedText }   from '@/components/ThemedText';
import LanguageToggle   from '@/components/quiz/LanguageToggle';
import AudioPlayer      from '@/components/audio/AudioPlayer';
import MaterialIcons    from '@expo/vector-icons/MaterialIcons';

export default function TurtleLessonLayout() {
  const { colorScheme } = useColorScheme();
  const { supabaseData } = useAuth();
  const isDark = colorScheme === 'dark';

  // Language + audio
  const [currentLanguage, setCurrentLanguage] = useState(
    supabaseData?.preferred_language || 'en'
  );
  const { currentAudioUrl } = useAudio('turtle', currentLanguage);

  // 🔥 NEW: Audio control ref
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (supabaseData?.preferred_language) {
      setCurrentLanguage(supabaseData.preferred_language);
    }
  }, [supabaseData?.preferred_language]);

  // Section definitions
  const content = {
    en: {
      lessonName: 'Green Sea Turtle',
      unableToLoadContent: 'Unable to load lesson content',
      sections: [
        { id: 'introBasics',     title: 'Introduction & Basics' },
        { id: 'biodivWhy',       title: 'Biodiversity & Why It Matters' },
        { id: 'threatsHelpCons', title: 'Threats • Help • Conservation' },
        { id: 'physioBehavior',  title: 'Physiology & Behavior' },
        { id: 'population',      title: 'Population Trend (2019–2025)' },
        { id: 'infographics',    title: 'Infographics' },
        { id: 'references',      title: 'References' }
      ]
    },
    ms: {
      lessonName: 'Penyu Agar',
      unableToLoadContent: 'Tidak dapat memuatkan kandungan pelajaran',
      sections: [
        { id: 'introBasics',     title: 'Pengenalan & Asas' },
        { id: 'biodivWhy',       title: 'Biodiversiti & Mengapa Penting' },
        { id: 'threatsHelpCons', title: 'Ancaman • Bantu • Pemuliharaan' },
        { id: 'physioBehavior',  title: 'Fisiologi & Tingkah Laku' },
        { id: 'population',      title: 'Trend Populasi (2019–2025)' },
        { id: 'infographics',    title: 'Infografik' },
        { id: 'references',      title: 'Rujukan' }
      ]
    }
  };
  const text = content[currentLanguage] || content.en;

  // Map IDs → components
  const sections = text.sections.map((sec) => {
    let component;
    switch (sec.id) {
      case 'introBasics':     component = TurtleIntroBasics;     break;
      case 'biodivWhy':       component = TurtleBiodivWhy;       break;
      case 'threatsHelpCons': component = TurtleThreatsHelpCons; break;
      case 'physioBehavior':  component = TurtlePhysioBehavior;  break;
      case 'population':      component = TurtlePopulation;      break;
      case 'infographics':    component = TurtleInfographics;    break;
      case 'references':      component = TurtleReferences;      break;
      default:                component = () => null;
    }
    return { ...sec, component };
  });

  // Navigation state & animations
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [completedSections, setCompleted]   = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isNavigating, setIsNavigating]     = useState(false);

  const slideAnim      = useRef(new Animated.Value(-240)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const navTimeout     = useRef(null);
  const pendingNav     = useRef(null);

  const safeIdx = Math.max(0, Math.min(currentIndex, sections.length - 1));
  const Current = sections[safeIdx].component;

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

  // Sidebar open/close
  const openSidebar  = () => {
    setSidebarVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim,      { toValue: 0,    duration: 300, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0.5,  duration: 300, useNativeDriver: true })
    ]).start();
  };
  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(slideAnim,      { toValue: -240, duration: 250, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0,    duration: 250, useNativeDriver: true })
    ]).start(() => setSidebarVisible(false));
  };
  const toggleSidebar = () => sidebarVisible ? closeSidebar() : openSidebar();

  useEffect(() => {
    return () => {
      if (navTimeout.current) clearTimeout(navTimeout.current);
    };
  }, []);

  // Debounced navigation
  const debouncedNav = (to) => {
    if (navTimeout.current) clearTimeout(navTimeout.current);
    pendingNav.current = to;
    navTimeout.current = setTimeout(() => {
      const idx = pendingNav.current;
      if (idx >= 0 && idx < sections.length) {
        setCurrentIndex(idx);
        setIsNavigating(false);
      }
      pendingNav.current = null;
    }, 300);
  };
  const navigateTo = (idx) => {
    if (isNavigating) {
      debouncedNav(idx);
      return;
    }
    setIsNavigating(true);
    debouncedNav(idx);
  };
  const goNext = () => navigateTo(safeIdx + 1);
  const goPrev = () => navigateTo(safeIdx - 1);
  const selectSection = (i) => {
    navigateTo(i);
    closeSidebar();
  };

  // Fallback if something went wrong
  if (!sections[safeIdx] || !Current) {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            {text.unableToLoadContent}
          </ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      {/* Mobile Header */}
      <View style={[styles.mobileHeader, {
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
        borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
      }]}>
        <TouchableOpacity
          onPress={toggleSidebar}
          style={styles.sidebarToggle}
          hitSlop={{ top:10, left:10, bottom:10, right:10 }}
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
            <ThemedText style={[styles.headerTitle, {
              color: isDark ? Colors.dark.text : Colors.light.text
            }]}>
              {sections[safeIdx].title}
            </ThemedText>
            <ThemedText style={[styles.lessonName, {
              color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary
            }]}>
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
          <LanguageToggle
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            size="compact"
          />
        </View>
      </View>

      {/* Lesson Content */}
      <View style={styles.lessonContent}>
        <Current currentLanguage={currentLanguage} />
      </View>

      {/* Footer Navigation */}
      <View style={styles.navigationContainer}>
        <TurtleNavigation
          currentIndex={safeIdx}
          totalSections={sections.length}
          currentLanguage={currentLanguage}
          onNext={goNext}
          onPrevious={goPrev}
          onComplete={goNext}
          isNavigating={isNavigating}
          topic="turtle"
          onStopAudio={handleStopAudio} // 🔥 NEW: Pass stop audio function
          onPauseAudio={handlePauseAudio} // 🔥 NEW: Pass pause audio function
        />
      </View>

      {/* Sidebar + Overlay */}
      {sidebarVisible && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </TouchableWithoutFeedback>
          <TurtleSidebar
            sections={sections}
            currentSection={safeIdx}
            completedSections={completedSections}
            onSectionSelect={selectSection}
            onClose={closeSidebar}
            slideAnim={slideAnim}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1 },
  mobileHeader:        {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12
  },
  sidebarToggle:       { padding: 8 },
  headerContent:       { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  lessonEmoji:         { fontSize: 20, marginRight: 12 },
  headerTitleContainer:{ flex: 1 },
  headerTitle:         { fontSize: 16, fontWeight: '600' },
  lessonName:          { fontSize: 12, marginTop: 2 },
  headerActions:       { flexDirection: 'row', alignItems: 'center', gap: 8 },
  audioPlayer:         { marginRight: 4 },
  lessonContent:       { flex: 1 },
  navigationContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8
  },
  overlay:             {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000',
    zIndex: 999
  },
  errorContainer:      { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText:           { fontSize: 16, textAlign: 'center' }
});
// components/lesson/tiger/TigerLessonLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { startLesson, markSectionCompleted } from '@/services/supabase/learningSessionService';
import TigerIntroduction from './sections/TigerIntroduction';
import TigerBiology from './sections/TigerBiology';
import TigerEcology from './sections/TigerEcology';
import TigerConservation from './sections/TigerConservation';
import TigerSidebar from './TigerSidebar';
import TigerNavigation from './TigerNavigation';
import { ThemedText } from '@/components/ThemedText';

const { width: screenWidth } = Dimensions.get('window');

export default function TigerLessonLayout({ quizId, sessionId }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const sections = [
    { id: 'introduction', title: 'Introduction', component: TigerIntroduction },
    { id: 'biology', title: 'Biology & Classification', component: TigerBiology },
    { id: 'ecology', title: 'Ecology & Behavior', component: TigerEcology },
    { id: 'conservation', title: 'Conservation', component: TigerConservation },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hasStartedLesson, setHasStartedLesson] = useState(false);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(screenWidth > 768);
  
  // 🔥 NEW: Add navigation state to prevent rapid clicks
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef(null);
  const pendingNavigationRef = useRef(null);

  const safeSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
  const currentSection = sections[safeSectionIndex];

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

  // 🔥 NEW: Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // 🔥 NEW: Debounced navigation function
  const debouncedNavigation = (targetIndex) => {
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Store the target index
    pendingNavigationRef.current = targetIndex;

    // Set a short debounce delay (300ms)
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

  // 🔥 IMPROVED: Throttled section completion with queue management
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

  // 🔥 IMPROVED: Prevent rapid navigation
  const goToNextSection = async () => {
    if (isNavigating) {
      console.log('Already navigating, ignoring rapid click');
      return;
    }

    setIsNavigating(true);
    
    try {
      // Mark current section as completed (don't await to prevent blocking)
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
      // Mark current section as completed (don't await to prevent blocking)
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

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  if (!currentSection || !currentSection.component) {
    console.error('Invalid section:', { 
      currentSectionIndex: safeSectionIndex, 
      sectionsLength: sections.length,
      currentSection 
    });
    
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            Unable to load lesson content
          </ThemedText>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              setCurrentSectionIndex(0);
              setIsNavigating(false);
              if (navigationTimeoutRef.current) {
                clearTimeout(navigationTimeoutRef.current);
              }
            }}
          >
            <ThemedText style={styles.resetButtonText}>
              Return to Start
            </ThemedText>
          </TouchableOpacity>
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
      <View style={styles.mainContent}>
        {sidebarVisible && (
          <View style={[
            styles.sidebarContainer,
            { 
              backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
              borderRightColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}>
            <TigerSidebar 
              sections={sections}
              currentSection={safeSectionIndex}
              completedSections={completedSections}
              onSectionSelect={async (index) => {
                if (isNavigating) {
                  console.log('Navigation in progress, ignoring sidebar click');
                  return;
                }
                
                setIsNavigating(true);
                markCurrentSectionCompleted(); // Don't await
                safeSetCurrentSectionIndex(index);
              }}
              isDark={isDark}
            />
          </View>
        )}
        
        <View style={[
          styles.contentArea,
          { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
        ]}>
          {screenWidth <= 768 && (
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
              >
                <ThemedText style={styles.toggleIcon}>☰</ThemedText>
              </TouchableOpacity>
              <ThemedText style={[
                styles.sectionTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {currentSection.title}
              </ThemedText>
            </View>
          )}
          
          <View style={styles.lessonContent}>
            <CurrentSectionComponent />
          </View>
        </View>
      </View>
      
      <View style={[
        styles.navigationContainer,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <TigerNavigation
          currentIndex={safeSectionIndex}
          totalSections={sections.length}
          onNext={goToNextSection}
          onPrevious={goToPreviousSection}
          onComplete={handleLessonComplete}
          quizId={quizId}
          sessionId={sessionId}
          // 🔥 NEW: Pass navigation state to disable buttons
          isNavigating={isNavigating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // 🔥 CHANGED: Column layout for proper stacking
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row', // Sidebar and content side by side
    overflow: 'hidden',
  },
  sidebarContainer: {
    width: screenWidth > 1024 ? 320 : 280, // Responsive sidebar width
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentArea: {
    flex: 1,
    flexDirection: 'column',
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 56,
  },
  sidebarToggle: {
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  lessonContent: {
    flex: 1,
    overflow: 'hidden',
  },
  navigationContainer: {
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});
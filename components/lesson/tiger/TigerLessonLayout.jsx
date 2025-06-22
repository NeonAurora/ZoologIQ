// components/lesson/tiger/TigerLessonLayout.jsx
import React, { useState, useEffect } from 'react';
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
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hasStartedLesson, setHasStartedLesson] = useState(false);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(screenWidth > 768); // Hide on mobile by default
  
  const sections = [
    { id: 'introduction', title: 'Introduction', component: TigerIntroduction },
    { id: 'biology', title: 'Biology & Classification', component: TigerBiology },
    { id: 'ecology', title: 'Ecology & Behavior', component: TigerEcology },
    { id: 'conservation', title: 'Conservation', component: TigerConservation },
  ];

  // Track lesson start (only once when component mounts)
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

  // Mark current section as completed when user navigates away from it
  const markCurrentSectionCompleted = async () => {
    if (sessionId && hasStartedLesson && !completedSections.has(currentSectionIndex)) {
      const section = sections[currentSectionIndex];
      await markSectionCompleted(sessionId, currentSectionIndex, section.title);
      setCompletedSections(prev => new Set([...prev, currentSectionIndex]));
    }
  };

  const goToNextSection = async () => {
    await markCurrentSectionCompleted();
    
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const goToPreviousSection = async () => {
    await markCurrentSectionCompleted();
    
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleLessonComplete = async () => {
    if (sessionId) {
      await markCurrentSectionCompleted();
      console.log('All lesson sections completed');
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const CurrentSectionComponent = sections[currentSectionIndex].component;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      {/* Main Content Area (Sidebar + Content) */}
      <View style={styles.mainContent}>
        {/* Sidebar */}
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
              currentSection={currentSectionIndex}
              completedSections={completedSections}
              onSectionSelect={async (index) => {
                await markCurrentSectionCompleted();
                setCurrentSectionIndex(index);
              }}
              isDark={isDark}
            />
          </View>
        )}
        
        {/* Content Area */}
        <View style={[
          styles.contentArea,
          { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
        ]}>
          {/* Mobile Header with Sidebar Toggle */}
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
                {sections[currentSectionIndex].title}
              </ThemedText>
            </View>
          )}
          
          {/* Lesson Content */}
          <View style={styles.lessonContent}>
            <CurrentSectionComponent />
          </View>
        </View>
      </View>
      
      {/* Bottom Navigation */}
      <View style={[
        styles.navigationContainer,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        <TigerNavigation
          currentIndex={currentSectionIndex}
          totalSections={sections.length}
          onNext={goToNextSection}
          onPrevious={goToPreviousSection}
          onComplete={handleLessonComplete}
          quizId={quizId}
          sessionId={sessionId}
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
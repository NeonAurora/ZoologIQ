import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import TigerSidebar from './TigerSidebar';
import TigerContent from './TigerContent';
import TigerNavigation from './TigerNavigation';
import { startLesson } from '@/services/supabase';

const windowWidth = Dimensions.get('window').width;

// Tiger-specific lesson sections
const TIGER_SECTIONS = [
  { id: 'introduction', title: 'Introduction', component: 'TigerIntroduction' },
  { id: 'biology', title: 'Biology & Classification', component: 'TigerBiology' },
  { id: 'ecology', title: 'Ecology & Behavior', component: 'TigerEcology' },
  { id: 'conservation', title: 'Threats & Conservation', component: 'TigerConservation' },
];

export default function TigerLessonLayout({ quizId, sessionId }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(windowWidth > 768);
  
  const currentSection = TIGER_SECTIONS[currentSectionIndex];

  useEffect(() => {
    if (sessionId) {
      const trackLessonStart = async () => {
        try {
          await startLesson(sessionId);
          console.log('Lesson started for session:', sessionId);
        } catch (error) {
          console.error('Error tracking lesson start:', error);
        }
      };
      
      trackLessonStart();
    }
  }, [sessionId]);
  
  const handleNext = () => {
    if (currentSectionIndex < TIGER_SECTIONS.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };
  
  const handleSectionSelect = (index) => {
    setCurrentSectionIndex(index);
    if (windowWidth <= 768) {
      setSidebarVisible(false);
    }
  };
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      {sidebarVisible && (
        <TigerSidebar
          sections={TIGER_SECTIONS}
          currentSectionIndex={currentSectionIndex}
          onSectionSelect={handleSectionSelect}
          onToggle={() => setSidebarVisible(false)}
        />
      )}
      
      <View style={styles.contentContainer}>
        <TigerContent 
          section={currentSection}
          onToggleSidebar={() => setSidebarVisible(true)}
          sidebarVisible={sidebarVisible}
        />
        
        <TigerNavigation
          currentIndex={currentSectionIndex}
          totalSections={TIGER_SECTIONS.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
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
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
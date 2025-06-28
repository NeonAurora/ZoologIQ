// components/lesson/turtle/TurtleContent.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Manual imports for Turtle sections only
import TurtleIntroduction from './sections/TurtleIntroduction';
import TurtleBiology from './sections/TurtleBiology';
import TurtleBehavior from './sections/TurtleBehavior';
import TurtleReproduction from './sections/TurtleReproduction';
import TurtleBiodiversity from './sections/TurtleBiodiversity';
import TurtleThreats from './sections/TurtleThreats';
import TurtleConservation from './sections/TurtleConservation';

// Component mapping
const TURTLE_COMPONENTS = {
  TurtleIntroduction,
  TurtleBiology,
  TurtleBehavior,
  TurtleReproduction,
  TurtleBiodiversity,
  TurtleThreats,
  TurtleConservation,
};

export default function TurtleContent({ 
  section, 
  onToggleSidebar, 
  sidebarVisible 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const SectionComponent = TURTLE_COMPONENTS[section.component];
  
  if (!SectionComponent) {
    return (
      <View style={styles.container}>
        <ThemedText>Turtle section not found: {section.component}</ThemedText>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.header,
        { 
          backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
          borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        {!sidebarVisible && (
          <TouchableOpacity onPress={onToggleSidebar} style={styles.menuButton}>
            <ThemedText style={styles.menuText}>☰</ThemedText>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.lessonEmoji}>🐢</ThemedText>
          <View>
            <ThemedText type="subtitle" style={styles.headerTitle}>
              {section.title}
            </ThemedText>
            <ThemedText style={styles.lessonName}>Green Sea Turtle</ThemedText>
          </View>
        </View>
      </View>
      
      <SectionComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  menuButton: {
    marginRight: 15,
    padding: 5,
  },
  menuText: {
    fontSize: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
  },
  lessonName: {
    fontSize: 14,
    opacity: 0.7,
  },
});
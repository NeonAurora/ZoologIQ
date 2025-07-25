// components/audio/AudioPlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function AudioPlayer({ 
  audioUrl, 
  currentLanguage = 'en',
  size = 'medium', // 'small', 'medium', 'large'
  style 
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef(null);

  // Bilingual content for accessibility and error messages
  const content = {
    en: {
      playAudio: 'Play lesson audio',
      pauseAudio: 'Pause lesson audio',
      stopAudio: 'Stop lesson audio',
      loadingAudio: 'Loading audio...',
      audioError: 'Failed to load audio',
      noAudioFile: 'No audio file available'
    },
    ms: {
      playAudio: 'Mainkan audio pelajaran',
      pauseAudio: 'Jeda audio pelajaran',
      stopAudio: 'Hentikan audio pelajaran',
      loadingAudio: 'Memuatkan audio...',
      audioError: 'Gagal memuatkan audio',
      noAudioFile: 'Tiada fail audio tersedia'
    }
  };

  const text = content[currentLanguage] || content.en;

  // Size configurations
  const sizeConfig = {
    small: { iconSize: 20, buttonSize: 32 },
    medium: { iconSize: 24, buttonSize: 40 },
    large: { iconSize: 28, buttonSize: 48 }
  };

  const { iconSize, buttonSize } = sizeConfig[size] || sizeConfig.medium;

  // Initialize audio settings on component mount
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Error setting up audio mode:', error);
      }
    };

    initializeAudio();
  }, []);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {
          // Ignore errors during cleanup - component is unmounting
        });
      }
    };
  }, []);

  // Handle audio URL changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unloadAsync().catch(() => {
        // Ignore cleanup errors
      });
      soundRef.current = null;
      setSound(null);
      setIsPlaying(false);
    }
  }, [audioUrl]);

  const loadAudio = async () => {
    if (!audioUrl) {
      Alert.alert('Error', text.noAudioFile);
      return null;
    }

    setIsLoading(true);
    try {
      console.log('Loading audio from URL:', audioUrl);
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { 
          shouldPlay: false,
          volume: 1.0,
          isLooping: false 
        }
      );

      // Set up playback status listener
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          
          // Auto-reset when audio finishes
          if (status.didJustFinish) {
            setIsPlaying(false);
            sound.setPositionAsync(0); // Reset to beginning
          }
        }
      });

      soundRef.current = sound;
      setSound(sound);
      return sound;
    } catch (error) {
      console.error('Error loading audio:', error);
      Alert.alert('Error', text.audioError);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    try {
      let currentSound = sound;
      
      // Load audio if not already loaded
      if (!currentSound) {
        currentSound = await loadAudio();
        if (!currentSound) return;
      }

      // Toggle play/pause
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
    } catch (error) {
      // Only log errors that aren't AbortError (common during navigation)
      if (error.name !== 'AbortError') {
        console.error('Error playing/pausing audio:', error);
        Alert.alert('Error', text.audioError);
      }
    }
  };

  const handleStop = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        setIsPlaying(false);
      }
    } catch (error) {
      // Only log errors that aren't AbortError (common during navigation)
      if (error.name !== 'AbortError') {
        console.error('Error stopping audio:', error);
      }
    }
  };

  // Don't render if no audio URL
  if (!audioUrl) {
    return null;
  }

  const buttonColor = isDark ? Colors.dark.tint : Colors.light.tint;
  const iconColor = '#fff';

  return (
    <TouchableOpacity
      style={[
        styles.audioButton,
        {
          backgroundColor: buttonColor,
          width: buttonSize,
          height: buttonSize,
          opacity: isLoading ? 0.6 : 1
        },
        style
      ]}
      onPress={handlePlayPause}
      disabled={isLoading}
      activeOpacity={0.8}
      accessibilityLabel={isPlaying ? text.pauseAudio : text.playAudio}
      accessibilityRole="button"
    >
      <MaterialIcons 
        name={
          isLoading 
            ? 'hourglass-empty' 
            : isPlaying 
              ? 'pause' 
              : 'play-arrow'
        } 
        size={iconSize} 
        color={iconColor} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  audioButton: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
// components/audio/AudioPlayer.jsx
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const AudioPlayer = forwardRef(({ 
  audioUrl, 
  currentLanguage = 'en',
  size = 'medium', // 'small', 'medium', 'large'
  style,
  loop = false, // 🔥 NEW: Control looping (default: no loop)
  stopOnComplete = true // 🔥 NEW: Stop when audio completes (default: true)
}, ref) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef(null);

  // 🔥 NEW: Expose control methods to parent component
  useImperativeHandle(ref, () => ({
    stop: async () => {
      try {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.setPositionAsync(0);
          setIsPlaying(false);
          console.log('🎵 Audio stopped via parent control');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error stopping audio via ref:', error);
        }
      }
    },
    pause: async () => {
      try {
        if (soundRef.current && isPlaying) {
          await soundRef.current.pauseAsync();
          console.log('🎵 Audio paused via parent control');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error pausing audio via ref:', error);
        }
      }
    },
    play: async () => {
      try {
        if (soundRef.current && !isPlaying) {
          await soundRef.current.playAsync();
          console.log('🎵 Audio played via parent control');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error playing audio via ref:', error);
        }
      }
    },
    // 🔥 NEW: Get current playing state
    isPlaying: () => isPlaying,
    // 🔥 NEW: Get current sound instance
    getSound: () => soundRef.current
  }));

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
          isLooping: loop // 🔥 UPDATED: Use loop prop
        }
      );

      // 🔥 UPDATED: Enhanced playback status listener
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          
          // 🔥 UPDATED: Handle audio completion based on stopOnComplete prop
          if (status.didJustFinish) {
            console.log('🎵 Audio finished playing');
            setIsPlaying(false);
            
            if (stopOnComplete && !loop) {
              // Reset to beginning and stop
              sound.setPositionAsync(0);
              console.log('🎵 Audio stopped after completion (no loop)');
            } else if (!loop) {
              // Reset to beginning but don't auto-replay
              sound.setPositionAsync(0);
            }
            // If loop is true, Expo will handle the looping automatically
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
        console.log('🎵 Audio paused by user');
      } else {
        await currentSound.playAsync();
        console.log('🎵 Audio played by user');
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
        console.log('🎵 Audio stopped by user');
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
});

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

export default AudioPlayer;
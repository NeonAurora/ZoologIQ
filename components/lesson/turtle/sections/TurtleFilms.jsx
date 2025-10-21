// components/lesson/turtle/sections/TurtleFilms.jsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function TurtleFilms({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Bilingual content with actual YouTube video IDs
  const content = {
    en: {
      title: 'Turtle Films & Documentaries',
      subtitle: 'Educational videos about Sea Turtles in Malaysia',
      watchNow: 'Watch Now',
      close: 'Close',
      duration: 'Duration',
      videos: [
        {
          id: 'qJfAbyz4qS0', // NEW First video ID
          title: 'Sea Turtle Conservation in Malaysia',
          description: 'Discover the incredible journey of sea turtles and the conservation efforts protecting these ancient mariners along Malaysia\'s coastlines.',
          duration: '18:42',
          thumbnail: 'https://img.youtube.com/vi/qJfAbyz4qS0/maxresdefault.jpg'
        },
        {
          id: 'O79cFlE93_w', // NEW Second video ID
          title: 'Protecting Malaysia\'s Sea Turtle Nesting Sites',
          description: 'Learn about the critical nesting sites along Malaysian beaches and the dedicated work to protect sea turtle populations for future generations.',
          duration: '22:15',
          thumbnail: 'https://img.youtube.com/vi/O79cFlE93_w/maxresdefault.jpg'
        }
      ]
    },
    ms: {
      title: 'Filem & Dokumentari Penyu',
      subtitle: 'Video pendidikan tentang Penyu Laut di Malaysia',
      watchNow: 'Tonton Sekarang',
      close: 'Tutup',
      duration: 'Tempoh',
      videos: [
        {
          id: 'qJfAbyz4qS0', // NEW First video ID
          title: 'Pemuliharaan Penyu Laut di Malaysia',
          description: 'Temui perjalanan luar biasa penyu laut dan usaha pemuliharaan melindungi pelaut purba ini di sepanjang pantai Malaysia.',
          duration: '18:42',
          thumbnail: 'https://img.youtube.com/vi/qJfAbyz4qS0/maxresdefault.jpg'
        },
        {
          id: 'O79cFlE93_w', // NEW Second video ID
          title: 'Melindungi Tapak Bersarang Penyu Laut Malaysia',
          description: 'Pelajari tentang tapak bersarang kritikal di sepanjang pantai Malaysia dan kerja berdedikasi untuk melindungi populasi penyu laut untuk generasi akan datang.',
          duration: '22:15',
          thumbnail: 'https://img.youtube.com/vi/O79cFlE93_w/maxresdefault.jpg'
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const openYouTubeVideo = async (videoId) => {
    // Try to open in YouTube app first, fallback to browser
    const youtubeAppUrl = `vnd.youtube://watch?v=${videoId}`;
    const youtubeWebUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      const supported = await Linking.canOpenURL(youtubeAppUrl);
      if (supported) {
        await Linking.openURL(youtubeAppUrl);
      } else {
        await Linking.openURL(youtubeWebUrl);
      }
    } catch (error) {
      // Fallback to web URL if app URL fails
      try {
        await Linking.openURL(youtubeWebUrl);
      } catch (err) {
        Alert.alert(
          'Error',
          'Unable to open YouTube video. Please try again later.'
        );
      }
    }
  };

  const renderVideoCard = (video, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.videoCard,
        {
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
        }
      ]}
      onPress={() => openYouTubeVideo(video.id)}
      activeOpacity={0.8}
    >
      {/* Video Thumbnail */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        {/* Play Button Overlay */}
        <View style={styles.playButtonOverlay}>
          <View style={styles.playButton}>
            <MaterialIcons
              name="play-arrow"
              size={32}
              color="#fff"
            />
          </View>
        </View>
        {/* Duration Badge */}
        <View style={styles.durationBadge}>
          <ThemedText style={styles.durationText}>
            {video.duration}
          </ThemedText>
        </View>
        {/* YouTube Badge */}
        <View style={styles.youtubeBadge}>
          <MaterialIcons name="youtube-searched-for" size={16} color="#fff" />
        </View>
      </View>

      {/* Video Info */}
      <View style={styles.videoInfo}>
        <ThemedText 
          style={[
            styles.videoTitle,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}
          numberOfLines={2}
        >
          {video.title}
        </ThemedText>
        <ThemedText 
          style={[
            styles.videoDescription,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}
          numberOfLines={3}
        >
          {video.description}
        </ThemedText>
        
        {/* Watch Now Button */}
        <TouchableOpacity
          style={[
            styles.watchButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
          ]}
          onPress={() => openYouTubeVideo(video.id)}
        >
          <MaterialIcons
            name="play-circle-outline"
            size={16}
            color="#fff"
            style={styles.watchButtonIcon}
          />
          <ThemedText style={styles.watchButtonText}>
            {text.watchNow}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name="movie"
            size={24}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
            style={styles.headerIcon}
          />
          <View>
            <ThemedText 
              style={[
                styles.title,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}
            >
              {text.title}
            </ThemedText>
            <ThemedText 
              style={[
                styles.subtitle,
                { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
              ]}
            >
              {text.subtitle}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Video Cards */}
      <View style={styles.videosContainer}>
        {text.videos.map((video, index) => renderVideoCard(video, index))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  videosContainer: {
    gap: 20,
  },
  videoCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  youtubeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF0000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  videoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  watchButtonIcon: {
    marginRight: 6,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
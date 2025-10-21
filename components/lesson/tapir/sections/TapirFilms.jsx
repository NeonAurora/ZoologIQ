// components/lesson/tapir/sections/TapirFilms.jsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function TapirFilms({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Bilingual content with actual YouTube video IDs
  const content = {
    en: {
      title: 'Tapir Films & Documentaries',
      subtitle: 'Educational videos about Malayan Tapirs',
      watchNow: 'Watch Now',
      close: 'Close',
      duration: 'Duration',
      videos: [
        {
          id: 'nlrLZJBYp34', // First video ID
          title: 'The Malayan Tapir: Forest Gardener',
          description: 'Discover the fascinating world of the Malayan Tapir, known as the forest gardener for its crucial role in seed dispersal and forest regeneration.',
          duration: '10:25',
          thumbnail: 'https://img.youtube.com/vi/nlrLZJBYp34/maxresdefault.jpg'
        },
        {
          id: 'h5PZ5Zpk2rc', // Second video ID
          title: 'Tapir Conservation: Protecting Malaysia\'s Gentle Giants',
          description: 'Learn about conservation efforts to protect the endangered Malayan Tapir and the challenges they face in the modern world.',
          duration: '14:18',
          thumbnail: 'https://img.youtube.com/vi/h5PZ5Zpk2rc/maxresdefault.jpg'
        },
        {
          id: 'gRWA4rWju9A', // Third video ID
          title: 'Tapir Behavior and Habitat Studies',
          description: 'An in-depth look at tapir behavior, habitat preferences, and their unique adaptations to life in Southeast Asian rainforests.',
          duration: '12:30',
          thumbnail: 'https://img.youtube.com/vi/gRWA4rWju9A/maxresdefault.jpg'
        }
      ]
    },
    ms: {
      title: 'Filem & Dokumentari Tapir',
      subtitle: 'Video pendidikan tentang Tapir Malaya',
      watchNow: 'Tonton Sekarang',
      close: 'Tutup',
      duration: 'Tempoh',
      videos: [
        {
          id: 'nlrLZJBYp34', // First video ID
          title: 'Tapir Malaya: Tukang Kebun Hutan',
          description: 'Temui dunia menarik Tapir Malaya, yang dikenali sebagai tukang kebun hutan kerana peranannya yang penting dalam penyebaran benih dan pemulihan hutan.',
          duration: '10:25',
          thumbnail: 'https://img.youtube.com/vi/nlrLZJBYp34/maxresdefault.jpg'
        },
        {
          id: 'h5PZ5Zpk2rc', // Second video ID
          title: 'Pemuliharaan Tapir: Melindungi Gergasi Lembut Malaysia',
          description: 'Pelajari tentang usaha pemuliharaan untuk melindungi Tapir Malaya yang terancam dan cabaran yang mereka hadapi di dunia moden.',
          duration: '14:18',
          thumbnail: 'https://img.youtube.com/vi/h5PZ5Zpk2rc/maxresdefault.jpg'
        },
        {
          id: 'gRWA4rWju9A', // Third video ID
          title: 'Kajian Tingkah Laku dan Habitat Tapir',
          description: 'Pandangan mendalam tentang tingkah laku tapir, keutamaan habitat, dan adaptasi unik mereka untuk hidup di hutan hujan Asia Tenggara.',
          duration: '12:30',
          thumbnail: 'https://img.youtube.com/vi/gRWA4rWju9A/maxresdefault.jpg'
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
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
      onPress={() => openVideo(video)}
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
          onPress={() => openVideo(video)}
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
    <>
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

      {/* Video Modal */}
      <Modal
        visible={selectedVideo !== null}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={closeVideo}
      >
        <SafeAreaView style={[
          styles.modalContainer,
          { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
        ]}>
          {/* Modal Header */}
          <View style={[
            styles.modalHeader,
            {
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
            }
          ]}>
            <ThemedText 
              style={[
                styles.modalTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}
              numberOfLines={1}
            >
              {selectedVideo?.title}
            </ThemedText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeVideo}
            >
              <MaterialIcons
                name="close"
                size={24}
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
            </TouchableOpacity>
          </View>

          {/* Video Player */}
          {selectedVideo && (
            <WebView
              style={styles.webview}
              source={{
                uri: `https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&showinfo=0&modestbranding=1`
              }}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
            />
          )}
        </SafeAreaView>
      </Modal>
    </>
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
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
});
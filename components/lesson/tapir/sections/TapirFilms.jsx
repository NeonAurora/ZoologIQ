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
  SafeAreaView,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function TapirFilms({ currentLanguage = 'en' }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Bilingual content with YouTube videos and local videos
  const content = {
    en: {
      title: 'Tapir Films & Documentaries',
      subtitle: 'Educational videos about Malayan Tapirs',
      watchNow: 'Watch Now',
      close: 'Close',
      duration: 'Duration',
      youtubeSection: 'Documentary Videos',
      localSection: 'Research Footage',
      videos: [
        // YouTube Videos
        {
          id: 'gRWA4rWju9A',
          type: 'youtube',
          title: 'Tapir Behavior and Habitat Studies',
          description: 'An in-depth look at tapir behavior, habitat preferences, and their unique adaptations to life in Southeast Asian rainforests.',
          duration: '12:30',
          thumbnail: 'https://img.youtube.com/vi/gRWA4rWju9A/maxresdefault.jpg'
        },
        {
          id: 'MTBi5RlWt4M',
          type: 'youtube',
          title: 'Malayan Tapir Conservation',
          description: 'Learn about conservation efforts to protect the endangered Malayan Tapir and the challenges they face in the modern world.',
          duration: '10:15',
          thumbnail: 'https://img.youtube.com/vi/MTBi5RlWt4M/maxresdefault.jpg'
        },
        // Local Videos
        {
          id: 'flehmen_on_boys',
          type: 'local',
          source: require('@/assets/films/flehmen_on_boys.mp4'),
          title: 'Flehmen Response Observation',
          description: 'Field footage showing the Flehmen response behavior in Malayan Tapirs, an important sensory behavior used for chemical communication.',
          duration: '3:45',
          thumbnail: require('@/assets/images/tapir.png') // fallback image
        },
        {
          id: 'maulid_tuah_tissy',
          type: 'local',
          source: require('@/assets/films/maulid_tuah_tissy.mp4'),
          title: 'Maulid, Tuah & Tissy',
          description: 'Documentary footage of three Malayan Tapirs in their natural habitat, showcasing their daily activities and interactions.',
          duration: '8:20',
          thumbnail: require('@/assets/images/tapir.png')
        },
        {
          id: 'rain_mate',
          type: 'local',
          source: require('@/assets/films/rain_mate.mp4'),
          title: 'Mating Behavior During Rain',
          description: 'Rare footage capturing Malayan Tapir mating behavior during the rainy season, an important aspect of their reproductive cycle.',
          duration: '5:15',
          thumbnail: require('@/assets/images/tapir.png')
        }
      ]
    },
    ms: {
      title: 'Filem & Dokumentari Tapir',
      subtitle: 'Video pendidikan tentang Tapir Malaya',
      watchNow: 'Tonton Sekarang',
      close: 'Tutup',
      duration: 'Tempoh',
      youtubeSection: 'Video Dokumentari',
      localSection: 'Rakaman Penyelidikan',
      videos: [
        // YouTube Videos
        {
          id: 'gRWA4rWju9A',
          type: 'youtube',
          title: 'Kajian Tingkah Laku dan Habitat Tapir',
          description: 'Pandangan mendalam tentang tingkah laku tapir, keutamaan habitat, dan adaptasi unik mereka untuk hidup di hutan hujan Asia Tenggara.',
          duration: '12:30',
          thumbnail: 'https://img.youtube.com/vi/gRWA4rWju9A/maxresdefault.jpg'
        },
        {
          id: 'MTBi5RlWt4M',
          type: 'youtube',
          title: 'Pemuliharaan Tapir Malaya',
          description: 'Pelajari tentang usaha pemuliharaan untuk melindungi Tapir Malaya yang terancam dan cabaran yang mereka hadapi di dunia moden.',
          duration: '10:15',
          thumbnail: 'https://img.youtube.com/vi/MTBi5RlWt4M/maxresdefault.jpg'
        },
        // Local Videos
        {
          id: 'flehmen_on_boys',
          type: 'local',
          source: require('@/assets/films/flehmen_on_boys.mp4'),
          title: 'Pemerhatian Respons Flehmen',
          description: 'Rakaman lapangan menunjukkan tingkah laku respons Flehmen dalam Tapir Malaya, tingkah laku deria penting untuk komunikasi kimia.',
          duration: '3:45',
          thumbnail: require('@/assets/images/tapir.png')
        },
        {
          id: 'maulid_tuah_tissy',
          type: 'local',
          source: require('@/assets/films/maulid_tuah_tissy.mp4'),
          title: 'Maulid, Tuah & Tissy',
          description: 'Rakaman dokumentari tiga Tapir Malaya dalam habitat semula jadi mereka, mempamerkan aktiviti harian dan interaksi mereka.',
          duration: '8:20',
          thumbnail: require('@/assets/images/tapir.png')
        },
        {
          id: 'rain_mate',
          type: 'local',
          source: require('@/assets/films/rain_mate.mp4'),
          title: 'Tingkah Laku Mengawan Semasa Hujan',
          description: 'Rakaman jarang menangkap tingkah laku mengawan Tapir Malaya semasa musim hujan, aspek penting kitaran pembiakan mereka.',
          duration: '5:15',
          thumbnail: require('@/assets/images/tapir.png')
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

  // Separate videos by type
  const youtubeVideos = text.videos.filter(v => v.type === 'youtube');
  const localVideos = text.videos.filter(v => v.type === 'local');

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
          source={video.type === 'youtube' ? { uri: video.thumbnail } : video.thumbnail}
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
        {/* Video Type Badge */}
        {video.type === 'local' && (
          <View style={styles.typeBadge}>
            <MaterialIcons name="videocam" size={12} color="#fff" />
            <ThemedText style={styles.typeText}>Local</ThemedText>
          </View>
        )}
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

        {/* YouTube Videos Section */}
        {youtubeVideos.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="video-library"
                size={20}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
              />
              <ThemedText style={[
                styles.sectionTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {text.youtubeSection}
              </ThemedText>
            </View>
            <View style={styles.videosContainer}>
              {youtubeVideos.map((video, index) => renderVideoCard(video, `yt-${index}`))}
            </View>
          </View>
        )}

        {/* Local Videos Section */}
        {localVideos.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="science"
                size={20}
                color={isDark ? Colors.dark.tint : Colors.light.tint}
              />
              <ThemedText style={[
                styles.sectionTitle,
                { color: isDark ? Colors.dark.text : Colors.light.text }
              ]}>
                {text.localSection}
              </ThemedText>
            </View>
            <View style={styles.videosContainer}>
              {localVideos.map((video, index) => renderVideoCard(video, `local-${index}`))}
            </View>
          </View>
        )}
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
            selectedVideo.type === 'youtube' ? (
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
            ) : (
              <Video
                source={selectedVideo.source}
                style={styles.localVideo}
                useNativeControls
                resizeMode="contain"
                shouldPlay
                isLooping={false}
              />
            )
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
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
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
  localVideo: {
    flex: 1,
    backgroundColor: '#000',
  },
});
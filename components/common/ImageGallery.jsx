// components/common/ImageGallery.jsx
import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  View,
  FlatList,
  useWindowDimensions,
  StatusBar
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getImagesForTopic } from '@/utils/imageUtils';

export default function ImageGallery({ topic }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Get images for the specified topic
  const { infographics, shots } = useMemo(() => {
    return getImagesForTopic(topic);
  }, [topic]);

  // Calculate responsive dimensions
  const padding = 16;
  const gap = 12;
  const itemWidth = (screenWidth - padding * 2 - gap) / 2;
  const itemHeight = itemWidth * 0.75; // 4:3 aspect ratio

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.imageItem,
        {
          width: itemWidth,
          height: itemHeight,
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
        }
      ]}
      onPress={() => openModal(item)}
      activeOpacity={0.8}
    >
      <Image
        source={item.source}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay}>
        <MaterialIcons
          name="zoom-in"
          size={24}
          color="white"
          style={styles.zoomIcon}
        />
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title, data, icon) => {
    if (data.length === 0) return null;

    return (
      <ThemedView style={styles.section}>
        {/* Section Header */}
        <ThemedView
          style={[
            styles.sectionHeader,
            {
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              borderBottomColor: isDark ? Colors.dark.border : Colors.light.border
            }
          ]}
        >
          <MaterialIcons
            name={icon}
            size={24}
            color={isDark ? Colors.dark.tint : Colors.light.tint}
            style={styles.sectionIcon}
          />
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}
          >
            {title}
          </ThemedText>
          <ThemedText
            style={[
              styles.itemCount,
              { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
            ]}
          >
            {data.length} {data.length === 1 ? 'item' : 'items'}
          </ThemedText>
        </ThemedView>

        {/* Image Grid */}
        <FlatList
          data={data}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: gap }} />}
        />
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Infographics Section */}
        {renderSection('Infographics', infographics, 'auto-awesome')}

        {/* Shots Section */}
        {renderSection('Shots', shots, 'photo-camera')}

        {/* Empty State */}
        {infographics.length === 0 && shots.length === 0 && (
          <ThemedView
            style={[
              styles.emptyState,
              {
                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
          >
            <MaterialIcons
              name="image-not-supported"
              size={48}
              color={isDark ? Colors.dark.textMuted : Colors.light.textMuted}
            />
            <ThemedText
              style={[
                styles.emptyText,
                { color: isDark ? Colors.dark.textMuted : Colors.light.textMuted }
              ]}
            >
              No images found for {topic}
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <StatusBar hidden />
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {selectedImage && (
                  <>
                    <Image
                      source={selectedImage.source}
                      style={[
                        styles.modalImage,
                        {
                          maxWidth: screenWidth * 0.9,
                          maxHeight: screenHeight * 0.8,
                        }
                      ]}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={closeModal}
                    >
                      <MaterialIcons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  gridContent: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  imageItem: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  zoomIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
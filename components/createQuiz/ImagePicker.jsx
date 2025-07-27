import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Pressable
} from 'react-native';
import { useColorScheme } from 'react-native';

export default function ImagePicker({ 
  image, 
  onPickImage, 
  onRemoveImage,
  isUploading = false 
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.imageSelector, isDark && styles.imageSelectorDark]}
        onPress={onPickImage}
        disabled={isUploading}
        activeOpacity={0.7}
      >
        {image ? (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: image }} 
              style={styles.previewImage} 
              resizeMode="cover"
            />
            
            {/* Remove button overlay */}
            {!isUploading && onRemoveImage && (
              <Pressable 
                style={styles.removeButton}
                onPress={(e) => {
                  e.stopPropagation();
                  onRemoveImage();
                }}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.imagePickerPlaceholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={[styles.imagePickerText, isDark && styles.textLight]}>
              Tap to add an image
            </Text>
            <Text style={[styles.imagePickerSubtext, isDark && styles.textLight]}>
              Optional - supports JPG, PNG
            </Text>
          </View>
        )}
        
        {/* Upload progress overlay */}
        {isUploading && (
          <View style={styles.uploadingOverlay}>
            <ActivityIndicator size="large" color="#0a7ea4" />
            <Text style={styles.uploadingText}>Uploading image...</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={[styles.instructionText, isDark && styles.textLight]}>
          • Images will be resized for optimal loading
        </Text>
        <Text style={[styles.instructionText, isDark && styles.textLight]}>
          • Recommended aspect ratio: 16:9
        </Text>
        <Text style={[styles.instructionText, isDark && styles.textLight]}>
          • Maximum file size: 5MB
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  imageSelector: {
    height: 160,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  imageSelectorDark: {
    borderColor: '#444',
    backgroundColor: '#333',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  imagePickerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  placeholderIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  imagePickerText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePickerSubtext: {
    color: '#888',
    fontSize: 12,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  textLight: {
    color: '#eee',
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    gap: 10,
  },
  uploadingText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },
  instructions: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
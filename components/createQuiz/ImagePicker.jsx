import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';

export default function ImagePicker({ image, onPickImage }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity 
      style={[styles.imageSelector, isDark && styles.imageSelectorDark]}
      onPress={onPickImage}
    >
      {image ? (
        <Image 
          source={{ uri: image }} 
          style={styles.previewImage} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePickerPlaceholder}>
          <Text style={[styles.imagePickerText, isDark && styles.textLight]}>
            Tap to add an image
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageSelector: {
    height: 160,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  imageSelectorDark: {
    borderColor: '#444',
    backgroundColor: '#333',
  },
  imagePickerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#888',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  textLight: {
    color: '#eee',
  },
});
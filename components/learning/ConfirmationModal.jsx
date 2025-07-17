// components/learning/ConfirmationModal.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ConfirmationModal({
  visible,
  title,
  message,
  currentLanguage,
  onConfirm,
  onCancel
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 🔥 Bilingual content
  const content = {
    en: {
      cancel: 'Cancel',
      confirm: 'Confirm',
      startNew: 'Start New'
    },
    ms: {
      cancel: 'Batal',
      confirm: 'Sahkan', 
      startNew: 'Mula Baru'
    }
  };

  const text = content[currentLanguage] || content.en;

  if (!visible) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onCancel?.(); // Close modal after confirm
  };

  const modalContent = (
    <View style={[
      styles.overlay,
      { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
    ]}>
      <View style={[
        styles.modalContainer,
        { 
          backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
          borderColor: isDark ? Colors.dark.border : Colors.light.border
        }
      ]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: '#FF572220' }
          ]}>
            <MaterialIcons 
              name="warning" 
              size={24} 
              color="#FF5722" 
            />
          </View>
          <ThemedText style={[
            styles.title,
            { color: isDark ? Colors.dark.text : Colors.light.text }
          ]}>
            {title}
          </ThemedText>
        </View>

        {/* Message */}
        <ThemedText style={[
          styles.message,
          { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
        ]}>
          {message}
        </ThemedText>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              { 
                backgroundColor: isDark ? Colors.dark.backgroundSecondary : '#F5F5F5',
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <ThemedText style={[
              styles.buttonText,
              styles.cancelButtonText,
              { color: isDark ? Colors.dark.text : Colors.light.text }
            ]}>
              {text.cancel}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.confirmButton,
              { backgroundColor: '#FF5722' }
            ]}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <ThemedText style={[
              styles.buttonText,
              styles.confirmButtonText
            ]}>
              {text.startNew}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (Platform.OS === 'web') {
    // For web, render directly without Modal wrapper
    return modalContent;
  }

  // For mobile, use React Native Modal
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      {modalContent}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    maxWidth: 400,
    width: '90%',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    // Background color set inline
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    // Color set inline based on theme
  },
  confirmButtonText: {
    color: '#FFFFFF',
  },
});
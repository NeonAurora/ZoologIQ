// app/(main)/(admin)/fileUpload.jsx (rename from pdfUpload.jsx)
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  TextInput,
  Platform
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { uploadFile, deletePdf, deleteImage, deleteAudio } from '@/services/supabase/storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

// 🔒 HARDCODED ADMIN EMAIL - Change this to your admin email
const ADMIN_EMAIL = 'arnarnsde@gmail.com';

// File type configurations
const FILE_TYPES = {
  pdf: {
    label: 'PDF Documents',
    icon: 'picture-as-pdf',
    color: '#E74C3C',
    accept: '.pdf',
    mimeTypes: ['application/pdf'],
    docPickerType: 'application/pdf'
  },
  image: {
    label: 'Images',
    icon: 'image',
    color: '#3498DB',
    accept: '.jpg,.jpeg,.png,.gif',
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    docPickerType: 'image/*'
  },
  audio: {
    label: 'Audio Files',
    icon: 'audiotrack',
    color: '#9B59B6',
    accept: '.mp3,.wav,.m4a,.aac',
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/aac'],
    docPickerType: 'audio/*'
  }
};

export default function FileUploadPage() {
  const { user, supabaseData } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [selectedFileType, setSelectedFileType] = useState('audio'); // Default to audio
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Check admin authorization
  useEffect(() => {
    if (user && supabaseData) {
      const userEmail = supabaseData.email || user.email;
      if (userEmail === ADMIN_EMAIL) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        Alert.alert('Access Denied', 'You are not authorized to access this page.');
      }
    }
  }, [user, supabaseData]);

  // Reset file selection when type changes
  useEffect(() => {
    setSelectedFile(null);
    setUploadedUrl('');
  }, [selectedFileType]);

  // Access denied screen
  if (!isAuthorized) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.centeredContent}>
          <MaterialIcons 
            name="block" 
            size={64} 
            color={isDark ? Colors.dark.error : Colors.light.error} 
          />
          <ThemedText style={[
            styles.errorTitle,
            { color: isDark ? Colors.dark.error : Colors.light.error }
          ]}>
            Access Denied
          </ThemedText>
          <ThemedText style={[
            styles.errorMessage,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            You are not authorized to access this admin page.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  const currentFileType = FILE_TYPES[selectedFileType];

  const handleFileSelection = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = currentFileType.accept;
        input.onchange = (event) => {
          const file = event.target.files[0];
          if (file && currentFileType.mimeTypes.includes(file.type)) {
            setSelectedFile({
              name: file.name,
              size: file.size,
              file: file
            });
          } else {
            Alert.alert('Invalid File', `Please select a ${currentFileType.label.toLowerCase()} file.`);
          }
        };
        input.click();
      } else {
        // Mobile document picker
        const result = await DocumentPicker.getDocumentAsync({
          type: currentFileType.docPickerType,
          copyToCacheDirectory: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          setSelectedFile({
            name: asset.name,
            size: asset.size,
            uri: asset.uri
          });
        }
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      Alert.alert('Error', 'Failed to select file. Please try again.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('No File Selected', `Please select a ${currentFileType.label.toLowerCase()} file first.`);
      return;
    }

    setUploading(true);
    try {
      const fileData = Platform.OS === 'web' ? selectedFile.file : selectedFile.uri;
      const url = await uploadFile(fileData, selectedFileType);
      
      if (url) {
        setUploadedUrl(url);
        Alert.alert('Success', `${currentFileType.label} uploaded successfully!`);
      } else {
        Alert.alert('Upload Failed', `Failed to upload ${currentFileType.label.toLowerCase()}. Please try again.`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', `An error occurred while uploading the ${currentFileType.label.toLowerCase()}.`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadedUrl) {
      Alert.alert('No File', 'No uploaded file to delete.');
      return;
    }

    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the uploaded ${currentFileType.label.toLowerCase()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            let success = false;
            
            // Call appropriate delete function based on file type
            switch (selectedFileType) {
              case 'pdf':
                success = await deletePdf(uploadedUrl);
                break;
              case 'image':
                success = await deleteImage(uploadedUrl);
                break;
              case 'audio':
                success = await deleteAudio(uploadedUrl);
                break;
            }
            
            if (success) {
              setUploadedUrl('');
              setSelectedFile(null);
              Alert.alert('Success', `${currentFileType.label} deleted successfully!`);
            } else {
              Alert.alert('Error', `Failed to delete ${currentFileType.label.toLowerCase()}.`);
            }
          }
        }
      ]
    );
  };

  const copyToClipboard = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(uploadedUrl);
    }
    Alert.alert('Copied', 'URL copied to clipboard!');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <ThemedView style={[
          styles.header,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <MaterialIcons 
            name="admin-panel-settings" 
            size={32} 
            color={isDark ? Colors.dark.tint : Colors.light.tint} 
          />
          <ThemedText style={styles.headerTitle}>File Upload Manager</ThemedText>
          <ThemedText style={[
            styles.headerSubtitle,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            Upload lesson materials, images, and audio files
          </ThemedText>
        </ThemedView>

        {/* File Type Selection */}
        <ThemedView style={[
          styles.section,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <ThemedText style={styles.sectionTitle}>Select File Type</ThemedText>
          
          <ThemedView style={styles.fileTypeContainer}>
            {Object.entries(FILE_TYPES).map(([key, type]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.fileTypeButton,
                  {
                    backgroundColor: selectedFileType === key
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary),
                    borderColor: selectedFileType === key
                      ? (isDark ? Colors.dark.tint : Colors.light.tint)
                      : (isDark ? Colors.dark.border : Colors.light.border)
                  }
                ]}
                onPress={() => setSelectedFileType(key)}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name={type.icon} 
                  size={20} 
                  color={selectedFileType === key ? '#fff' : type.color} 
                />
                <ThemedText style={[
                  styles.fileTypeText,
                  { 
                    color: selectedFileType === key 
                      ? '#fff' 
                      : (isDark ? Colors.dark.text : Colors.light.text)
                  }
                ]}>
                  {type.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* File Selection Section */}
        <ThemedView style={[
          styles.section,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <ThemedText style={styles.sectionTitle}>
            Select {currentFileType.label}
          </ThemedText>
          
          <TouchableOpacity 
            style={[
              styles.fileButton,
              { 
                backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}
            onPress={handleFileSelection}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name={currentFileType.icon} 
              size={24} 
              color={currentFileType.color} 
            />
            <ThemedText style={styles.fileButtonText}>
              {selectedFile ? `Change ${currentFileType.label}` : `Select ${currentFileType.label}`}
            </ThemedText>
          </TouchableOpacity>

          {selectedFile && (
            <ThemedView style={[
              styles.fileInfo,
              { 
                backgroundColor: isDark ? Colors.dark.backgroundTertiary : Colors.light.backgroundSecondary,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <MaterialIcons 
                name={currentFileType.icon} 
                size={20} 
                color={currentFileType.color} 
              />
              <ThemedView style={styles.fileDetails}>
                <ThemedText style={styles.fileName}>{selectedFile.name}</ThemedText>
                <ThemedText style={[
                  styles.fileSize,
                  { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
                ]}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}

          <TouchableOpacity 
            style={[
              styles.uploadButton,
              { 
                backgroundColor: selectedFile && !uploading 
                  ? (isDark ? Colors.dark.tint : Colors.light.tint)
                  : (isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundTertiary)
              }
            ]}
            onPress={handleUpload}
            disabled={!selectedFile || uploading}
            activeOpacity={0.8}
          >
            {uploading ? (
              <ThemedView style={styles.loadingContent}>
                <ActivityIndicator size="small" color="#fff" />
                <ThemedText style={styles.uploadButtonText}>Uploading...</ThemedText>
              </ThemedView>
            ) : (
              <ThemedText style={[
                styles.uploadButtonText,
                { 
                  color: selectedFile 
                    ? '#fff' 
                    : (isDark ? Colors.dark.textMuted : Colors.light.textMuted)
                }
              ]}>
                Upload {currentFileType.label}
              </ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>

        {/* URL Display Section */}
        {uploadedUrl && (
          <ThemedView style={[
            styles.section,
            { 
              backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
              shadowColor: isDark ? Colors.dark.text : Colors.light.text,
            }
          ]}>
            <ThemedText style={styles.sectionTitle}>Uploaded File URL</ThemedText>
            
            <ThemedView style={[
              styles.urlContainer,
              { 
                backgroundColor: isDark ? Colors.dark.backgroundSecondary : Colors.light.backgroundSecondary,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }
            ]}>
              <TextInput
                style={[
                  styles.urlInput,
                  { color: isDark ? Colors.dark.text : Colors.light.text }
                ]}
                value={uploadedUrl}
                editable={false}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.copyButton,
                  { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint }
                ]}
                onPress={copyToClipboard}
                activeOpacity={0.7}
              >
                <MaterialIcons name="content-copy" size={16} color="#fff" />
              </TouchableOpacity>
            </ThemedView>
            
            <TouchableOpacity
              style={[
                styles.deleteButton,
                { 
                  borderColor: isDark ? Colors.dark.error : Colors.light.error,
                  backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface
                }
              ]}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name="delete" 
                size={16} 
                color={isDark ? Colors.dark.error : Colors.light.error} 
              />
              <ThemedText style={[
                styles.deleteButtonText,
                { color: isDark ? Colors.dark.error : Colors.light.error }
              ]}>
                Delete File
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 40,
    gap: 24,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  header: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  fileTypeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  fileTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  fileTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    gap: 8,
    marginBottom: 16,
  },
  fileButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    marginTop: 2,
  },
  uploadButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  urlContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  urlInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
// app/(admin)/pdfUpload.jsx
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
import { uploadPdf, deletePdf } from '@/services/supabase/storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

// 🔒 HARDCODED ADMIN EMAIL - Change this to your admin email
const ADMIN_EMAIL = 'arnarnsde@gmail.com';

export default function PdfUploadPage() {
  const { user, supabaseData } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
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

  // If not authorized, show access denied screen
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

  const handleFileSelection = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf';
        input.onchange = (event) => {
          const file = event.target.files[0];
          if (file && file.type === 'application/pdf') {
            setSelectedFile({
              name: file.name,
              size: file.size,
              file: file
            });
          } else {
            Alert.alert('Invalid File', 'Please select a PDF file.');
          }
        };
        input.click();
      } else {
        // Mobile document picker
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf',
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
      Alert.alert('No File Selected', 'Please select a PDF file first.');
      return;
    }

    setUploading(true);
    try {
      const fileData = Platform.OS === 'web' ? selectedFile.file : selectedFile.uri;
      const url = await uploadPdf(fileData);
      
      if (url) {
        setUploadedUrl(url);
        Alert.alert('Success', 'PDF uploaded successfully!');
      } else {
        Alert.alert('Upload Failed', 'Failed to upload PDF. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'An error occurred while uploading the PDF.');
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
      'Are you sure you want to delete the uploaded PDF?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deletePdf(uploadedUrl);
            if (success) {
              setUploadedUrl('');
              setSelectedFile(null);
              Alert.alert('Success', 'PDF deleted successfully!');
            } else {
              Alert.alert('Error', 'Failed to delete PDF.');
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
          <ThemedText style={styles.headerTitle}>PDF Upload Manager</ThemedText>
          <ThemedText style={[
            styles.headerSubtitle,
            { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }
          ]}>
            Upload lesson materials for students
          </ThemedText>
        </ThemedView>

        {/* File Selection Section */}
        <ThemedView style={[
          styles.section,
          { 
            backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
            shadowColor: isDark ? Colors.dark.text : Colors.light.text,
          }
        ]}>
          <ThemedText style={styles.sectionTitle}>Select PDF File</ThemedText>
          
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
              name="file-upload" 
              size={24} 
              color={isDark ? Colors.dark.tint : Colors.light.tint} 
            />
            <ThemedText style={styles.fileButtonText}>
              {selectedFile ? 'Change PDF File' : 'Select PDF File'}
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
              <MaterialIcons name="picture-as-pdf" size={20} color="#E74C3C" />
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
                Upload PDF
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
              >
                <MaterialIcons name="content-copy" size={20} color="#fff" />
              </TouchableOpacity>
            </ThemedView>

            <TouchableOpacity 
              style={[
                styles.deleteButton,
                { borderColor: '#E74C3C' }
              ]}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <MaterialIcons name="delete" size={20} color="#E74C3C" />
              <ThemedText style={[styles.deleteButtonText, { color: '#E74C3C' }]}>
                Delete PDF
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
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
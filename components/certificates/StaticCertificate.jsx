// components/certificate/StaticCertificate.jsx
import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { uploadCertificate } from '@/services/supabase';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function StaticCertificate({ 
  recipientName = "John Doe",
  courseTitle = "React Native Development",
  completionDate = new Date().toLocaleDateString(),
  instructorName = "ZoologIQ Team",
  certificateId = `CERT-${Date.now()}`,
  onCertificateGenerated = null // Callback when certificate is successfully generated
}) {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleGenerateCertificate = async () => {
    try {
      setIsGenerating(true);
      
      // Capture the certificate view as an image
      const imageUri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
        height: 800, // Fixed height for consistency
        width: 600   // Fixed width for consistency
      });
      
      console.log('Certificate captured:', imageUri);
      
      // Upload to Supabase certificates bucket
      const uploadedUrl = await uploadCertificate(imageUri, recipientName);
      
      if (uploadedUrl) {
        setGeneratedUrl(uploadedUrl);
        console.log('Certificate uploaded successfully:', uploadedUrl);
        
        // Call the callback if provided
        if (onCertificateGenerated) {
          onCertificateGenerated(uploadedUrl, {
            recipientName,
            courseTitle,
            completionDate,
            certificateId
          });
        }
        
        // Share the certificate
        await handleShareCertificate(imageUri);
        
        Alert.alert(
          '🎉 Success!', 
          'Certificate generated and ready to share!',
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Share Again', 
              onPress: () => handleShareCertificate(imageUri),
              style: 'default'
            }
          ]
        );
      } else {
        throw new Error('Failed to upload certificate');
      }
      
    } catch (error) {
      console.error('Certificate generation failed:', error);
      Alert.alert(
        'Error', 
        'Failed to generate certificate. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareCertificate = async (imageUri) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(imageUri, {
          mimeType: 'image/png',
          dialogTitle: 'Share Your Certificate'
        });
      } else {
        // Fallback for platforms where sharing isn't available
        if (Platform.OS === 'web') {
          // For web, we can trigger a download
          const link = document.createElement('a');
          link.href = imageUri;
          link.download = `certificate_${recipientName.replace(/\s+/g, '_')}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          Alert.alert('Info', 'Certificate saved to your device.');
        }
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      Alert.alert('Error', 'Failed to share certificate.');
    }
  };

  const handleDownloadCertificate = async () => {
    if (!generatedUrl) {
      Alert.alert('Error', 'No certificate available. Please generate one first.');
      return;
    }

    try {
      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = generatedUrl;
        link.download = `certificate_${recipientName.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile download
        const downloadResumable = FileSystem.createDownloadResumable(
          generatedUrl,
          FileSystem.documentDirectory + `certificate_${recipientName.replace(/\s+/g, '_')}.png`
        );

        const { uri } = await downloadResumable.downloadAsync();
        
        Alert.alert(
          'Download Complete',
          'Certificate downloaded successfully!',
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Share', 
              onPress: () => handleShareCertificate(uri),
              style: 'default'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download certificate.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
      {/* Certificate Design */}
      <View 
        ref={certificateRef} 
        style={[
          styles.certificate,
          { 
            backgroundColor: isDark ? '#2c3e50' : '#ffffff',
            borderColor: isDark ? '#f39c12' : '#e67e22'
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#f39c12' : '#e67e22' }]}>
            🏆 CERTIFICATE OF ACHIEVEMENT 🏆
          </Text>
          <View style={[styles.divider, { backgroundColor: isDark ? '#f39c12' : '#e67e22' }]} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={[styles.subtitle, { color: isDark ? '#bdc3c7' : '#7f8c8d' }]}>
            This is to certify that
          </Text>
          
          <Text style={[styles.recipient, { color: isDark ? '#e74c3c' : '#c0392b' }]}>
            {recipientName}
          </Text>
          
          <Text style={[styles.description, { color: isDark ? '#ecf0f1' : '#2c3e50' }]}>
            has successfully completed the course
          </Text>
          
          <Text style={[styles.course, { color: isDark ? '#3498db' : '#2980b9' }]}>
            "{courseTitle}"
          </Text>
          
          <Text style={[styles.message, { color: isDark ? '#95a5a6' : '#7f8c8d' }]}>
            Hello world. This is my first certificate.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={[styles.label, { color: isDark ? '#bdc3c7' : '#7f8c8d' }]}>Date</Text>
            <View style={[styles.line, { backgroundColor: isDark ? '#bdc3c7' : '#bdc3c7' }]} />
            <Text style={[styles.footerText, { color: isDark ? '#ecf0f1' : '#2c3e50' }]}>
              {completionDate}
            </Text>
          </View>
          
          <View style={styles.footerSection}>
            <Text style={[styles.label, { color: isDark ? '#bdc3c7' : '#7f8c8d' }]}>Instructor</Text>
            <View style={[styles.line, { backgroundColor: isDark ? '#bdc3c7' : '#bdc3c7' }]} />
            <Text style={[styles.footerText, { color: isDark ? '#ecf0f1' : '#2c3e50' }]}>
              {instructorName}
            </Text>
          </View>
        </View>

        {/* Certificate ID */}
        <Text style={[styles.certificateId, { color: isDark ? '#95a5a6' : '#bdc3c7' }]}>
          Certificate ID: {certificateId}
        </Text>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.generateButton,
            { backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint },
            isGenerating && styles.buttonDisabled
          ]} 
          onPress={handleGenerateCertificate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <MaterialIcons name="create" size={20} color="white" />
              <Text style={styles.buttonText}>Generate Certificate</Text>
            </>
          )}
        </TouchableOpacity>

        {generatedUrl && (
          <TouchableOpacity 
            style={[
              styles.downloadButton,
              { backgroundColor: isDark ? '#27ae60' : '#2ecc71' }
            ]} 
            onPress={handleDownloadCertificate}
          >
            <MaterialIcons name="download" size={20} color="white" />
            <Text style={styles.buttonText}>Download Again</Text>
          </TouchableOpacity>
        )}
      </View>

      {generatedUrl && (
        <View style={styles.successContainer}>
          <MaterialIcons 
            name="check-circle" 
            size={24} 
            color={isDark ? '#2ecc71' : '#27ae60'} 
          />
          <Text style={[styles.successText, { color: isDark ? '#2ecc71' : '#27ae60' }]}>
            Certificate generated successfully!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  certificate: {
    padding: 40,
    margin: 10,
    borderRadius: 15,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    minHeight: 500,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  divider: {
    height: 3,
    width: '60%',
    borderRadius: 2,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  recipient: {
    fontSize: Math.min(width * 0.08, 32),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline',
    textDecorationColor: 'currentColor',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  course: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  footerSection: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  line: {
    height: 1,
    width: '80%',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  certificateId: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 10,
  },
  successText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
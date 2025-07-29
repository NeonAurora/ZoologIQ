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
  Platform,
  Image
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { uploadFile } from '@/services/supabase/storage';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// 🎨 FONT & STYLING CONFIGURATION - Adjust these for easy customization
const CERTIFICATE_CONFIG = {
  // User Name Text Configuration
  userName: {
    // Position Controls (adjust these for micro-tweaking)
    topPosition: '43.25%',        // Vertical position from top (45% means 45% down from top)
    leftMargin: 0,             // Left margin in pixels
    rightMargin: 0,            // Right margin in pixels
    
    // Font Styling
    fontSize: 28,              // Font size
    fontWeight: 'normal',        // Font weight: 'normal', 'bold', '100'-'900'
    fontFamily: Platform.select({
      ios: 'Lucida Calligraphy',
      android: 'LucidaCalligraphy',
      web: 'Lucida Calligraphy',
      default: 'cursive'
    }),
    color: '#2c3e50',          // Text color (hex, rgb, or color name)
    
    // Text Effects
    textAlign: 'center',       // Text alignment: 'left', 'center', 'right'
    letterSpacing: 1,          // Letter spacing in pixels
    lineHeight: 34,            // Line height (usually fontSize + 4-8)
    textTransform: 'none',     // 'none', 'uppercase', 'lowercase', 'capitalize'
    
    // Text Shadow (optional)
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    
    // Background (if you want background behind text)
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 0,
  },
  
  // Certificate Container Size
  container: {
    width: 595,   // A4 width in pixels
    height: 842,  // A4 height in pixels
  }
};

export default function StaticCertificate({ 
  recipientName = "John Doe",
  completionDate = new Date().toLocaleDateString(),
  instructorName = "ZoologIQ Education Team",
  certificateId = `CERT-${Date.now()}`,
  onCertificateGenerated = null
}) {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [certificatePdfUri, setCertificatePdfUri] = useState(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleGenerateCertificate = async () => {
    try {
      setIsGenerating(true);
      
      // First capture the certificate view as an image
      const imageUri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
        height: CERTIFICATE_CONFIG.container.height,
        width: CERTIFICATE_CONFIG.container.width
      });
      
      console.log('Certificate captured:', imageUri);
      
      // Convert to PDF
      const pdfUri = await convertToPDF(imageUri);
      
      if (pdfUri) {
        setCertificatePdfUri(pdfUri);
        
        // Upload PDF to Supabase
        const uploadedUrl = await uploadFile(pdfUri, 'pdf');
        
        if (uploadedUrl) {
          setGeneratedUrl(uploadedUrl);
          console.log('Certificate PDF uploaded successfully:', uploadedUrl);
          
          // Call the callback if provided
          if (onCertificateGenerated) {
            onCertificateGenerated(uploadedUrl, {
              recipientName,
              completionDate,
              certificateId,
              type: 'pdf'
            });
          }
          
          Alert.alert(
            '🎉 Success!', 
            'Certificate generated as PDF and ready to download!',
            [
              { text: 'OK', style: 'default' },
              { 
                text: 'Download', 
                onPress: () => handleDownloadCertificate(),
                style: 'default'
              },
              { 
                text: 'Share', 
                onPress: () => handleShareCertificate(pdfUri),
                style: 'default'
              }
            ]
          );
        } else {
          throw new Error('Failed to upload certificate');
        }
      } else {
        throw new Error('Failed to convert to PDF');
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

  const convertToPDF = async (imageUri) => {
    try {
      // Read the image as base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Create HTML content with the captured image
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
              }
              .certificate-container {
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .certificate-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <div class="certificate-container">
              <img src="data:image/png;base64,${base64Image}" class="certificate-image" />
            </div>
          </body>
        </html>
      `;
      
      // Generate PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
        width: CERTIFICATE_CONFIG.container.width,
        height: CERTIFICATE_CONFIG.container.height,
      });
      
      console.log('PDF generated:', uri);
      return uri;
    } catch (error) {
      console.error('PDF conversion failed:', error);
      return null;
    }
  };

  const handleShareCertificate = async (pdfUri) => {
    try {
      const fileUri = pdfUri || certificatePdfUri;
      if (!fileUri) {
        Alert.alert('Error', 'No certificate available to share.');
        return;
      }

      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Your Certificate'
        });
      } else {
        Alert.alert('Info', 'Sharing not available on this platform.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      Alert.alert('Error', 'Failed to share certificate.');
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const fileUri = certificatePdfUri || generatedUrl;
      if (!fileUri) {
        Alert.alert('Error', 'No certificate available. Please generate one first.');
        return;
      }

      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = fileUri;
        link.download = `certificate_${recipientName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile download
        const fileName = `certificate_${recipientName.replace(/\s+/g, '_')}.pdf`;
        const downloadPath = FileSystem.documentDirectory + fileName;
        
        if (fileUri.startsWith('http')) {
          // Download from URL
          const downloadResumable = FileSystem.createDownloadResumable(
            fileUri,
            downloadPath
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
        } else {
          // Local file, just share it
          await handleShareCertificate(fileUri);
        }
      }
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download certificate.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
      {/* Certificate Design with Background Image */}
      <View 
        ref={certificateRef} 
        style={styles.certificateContainer}
      >
        {/* Background Certificate Template */}
        <Image 
          source={require('@/assets/images/certificate_template.png')} 
          style={styles.backgroundImage}
          resizeMode="contain"
        />
        
        {/* Overlay Text - Positioned absolutely over the background */}
        <View style={styles.textOverlay}>
          {/* Participant Name - positioned using config variables */}
          <Text style={styles.participantName}>
            {recipientName}
          </Text>
        </View>
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
              <MaterialIcons name="picture-as-pdf" size={20} color="white" />
              <Text style={styles.buttonText}>Generate PDF Certificate</Text>
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
            <Text style={styles.buttonText}>Download PDF</Text>
          </TouchableOpacity>
        )}

        {certificatePdfUri && (
          <TouchableOpacity 
            style={[
              styles.shareButton,
              { backgroundColor: isDark ? '#3498db' : '#2980b9' }
            ]} 
            onPress={() => handleShareCertificate()}
          >
            <MaterialIcons name="share" size={20} color="white" />
            <Text style={styles.buttonText}>Share Certificate</Text>
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
            PDF Certificate generated successfully!
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
  certificateContainer: {
    width: CERTIFICATE_CONFIG.container.width,
    height: CERTIFICATE_CONFIG.container.height,
    alignSelf: 'center',
    position: 'relative',
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 👤 USER NAME STYLING - Uses config variables
  participantName: {
    // Position
    position: 'absolute',
    top: CERTIFICATE_CONFIG.userName.topPosition,
    left: CERTIFICATE_CONFIG.userName.leftMargin,
    right: CERTIFICATE_CONFIG.userName.rightMargin,
    zIndex: 2,
    
    // Font Properties
    fontSize: CERTIFICATE_CONFIG.userName.fontSize,
    fontWeight: CERTIFICATE_CONFIG.userName.fontWeight,
    fontFamily: CERTIFICATE_CONFIG.userName.fontFamily,
    color: CERTIFICATE_CONFIG.userName.color,
    
    // Text Styling
    textAlign: CERTIFICATE_CONFIG.userName.textAlign,
    letterSpacing: CERTIFICATE_CONFIG.userName.letterSpacing,
    lineHeight: CERTIFICATE_CONFIG.userName.lineHeight,
    textTransform: CERTIFICATE_CONFIG.userName.textTransform,
    
    // Text Shadow
    textShadowColor: CERTIFICATE_CONFIG.userName.textShadowColor,
    textShadowOffset: CERTIFICATE_CONFIG.userName.textShadowOffset,
    textShadowRadius: CERTIFICATE_CONFIG.userName.textShadowRadius,
    
    // Background
    backgroundColor: CERTIFICATE_CONFIG.userName.backgroundColor,
    paddingHorizontal: CERTIFICATE_CONFIG.userName.paddingHorizontal,
    paddingVertical: CERTIFICATE_CONFIG.userName.paddingVertical,
    borderRadius: CERTIFICATE_CONFIG.userName.borderRadius,
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
  shareButton: {
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
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
  Image,
  ScrollView
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { uploadFile } from '@/services/supabase/storage';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calculate responsive landscape certificate dimensions
const calculateCertificateDimensions = () => {
  const maxWidth = Math.min(screenWidth - 40, 842);
  const aspectRatio = 842 / 595; // Landscape aspect ratio
  const calculatedHeight = maxWidth / aspectRatio;
  
  return {
    width: maxWidth,
    height: calculatedHeight
  };
};

// 🎨 FONT & STYLING CONFIGURATION - LANDSCAPE ORIENTATION
const CERTIFICATE_CONFIG = {
  userName: {
    topPosition: '43.25%',
    leftMargin: 0,
    rightMargin: 0,
    
    fontSize: Math.min(screenWidth * 0.035, 28),
    fontWeight: 'normal',
    fontFamily: Platform.select({
      ios: 'Lucida Unicode Calligraphy',
      android: 'LucidaCalligraphy', 
      web: 'LucidaCalligraphy, "Lucida Unicode Calligraphy", "Brush Script MT", cursive',
      default: 'cursive'
    }),
    color: '#2c3e50',
    
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: Math.min(screenWidth * 0.035, 28) + 6,
    textTransform: 'none',
    
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 0,
  },
  
  // Landscape container dimensions
  container: calculateCertificateDimensions()
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
  const [localPdfBlob, setLocalPdfBlob] = useState(null); // For web download
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleGenerateCertificate = async () => {
    try {
      setIsGenerating(true);
      
      // Capture certificate with landscape dimensions
      const imageUri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
        width: CERTIFICATE_CONFIG.container.width,
        height: CERTIFICATE_CONFIG.container.height
      });
      
      console.log('Certificate captured:', imageUri);
      
      // Convert to PDF with landscape orientation
      const pdfResult = await convertToPDF(imageUri);
      
      if (pdfResult) {
        const { uri: pdfUri, blob: pdfBlob } = pdfResult;
        setCertificatePdfUri(pdfUri);
        if (pdfBlob) setLocalPdfBlob(pdfBlob);
        
        // Upload PDF to Supabase
        const uploadedUrl = await uploadFile(pdfUri, 'pdf');
        
        if (uploadedUrl) {
          setGeneratedUrl(uploadedUrl);
          console.log('Certificate PDF uploaded successfully:', uploadedUrl);
          
          if (onCertificateGenerated) {
            onCertificateGenerated(uploadedUrl, {
              recipientName,
              completionDate,
              certificateId,
              type: 'pdf'
            });
          }
          
          // For web, auto-download after generation
          if (Platform.OS === 'web') {
            await handleDownloadCertificate(pdfBlob || pdfUri);
          }
          
          Alert.alert(
            '🎉 Success!', 
            Platform.OS === 'web' ? 
              'Certificate generated and downloaded!' : 
              'Certificate generated as PDF and ready to download!',
            [
              { text: 'OK', style: 'default' },
              ...(Platform.OS !== 'web' ? [
                { 
                  text: 'Download', 
                  onPress: () => handleDownloadCertificate(),
                  style: 'default'
                }
              ] : []),
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
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // HTML with landscape orientation
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @page {
                size: A4 landscape;
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
      
      // Generate PDF with landscape dimensions
      const result = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
        width: 842,  // A4 landscape width
        height: 595, // A4 landscape height
      });
      
      console.log('PDF generated:', result.uri);
      
      // For web, also create a blob for direct download
      if (Platform.OS === 'web') {
        try {
          const response = await fetch(result.uri);
          const blob = await response.blob();
          return { uri: result.uri, blob };
        } catch (blobError) {
          console.warn('Could not create blob, using URI only:', blobError);
          return { uri: result.uri, blob: null };
        }
      }
      
      return { uri: result.uri, blob: null };
    } catch (error) {
      console.error('PDF conversion failed:', error);
      return null;
    }
  };

  const handleDownloadCertificate = async (customFileSource = null) => {
    try {
      const fileSource = customFileSource || certificatePdfUri || generatedUrl;
      if (!fileSource) {
        Alert.alert('Error', 'No certificate available. Please generate one first.');
        return;
      }

      const fileName = `certificate_${recipientName.replace(/\s+/g, '_')}.pdf`;

      if (Platform.OS === 'web') {
        // Web download with improved blob handling
        try {
          let downloadUrl;
          
          if (fileSource instanceof Blob) {
            // If we have a blob (from PDF generation), use it directly
            downloadUrl = URL.createObjectURL(fileSource);
          } else if (localPdfBlob) {
            // Use stored blob if available
            downloadUrl = URL.createObjectURL(localPdfBlob);
          } else if (typeof fileSource === 'string') {
            // Handle different types of URIs
            if (fileSource.startsWith('http')) {
              // Remote URL - fetch and create blob
              const response = await fetch(fileSource);
              const blob = await response.blob();
              downloadUrl = URL.createObjectURL(blob);
            } else if (fileSource.startsWith('data:')) {
              // Data URI - use directly
              downloadUrl = fileSource;
            } else {
              // Local file URI - try to fetch
              try {
                const response = await fetch(fileSource);
                const blob = await response.blob();
                downloadUrl = URL.createObjectURL(blob);
              } catch (fetchError) {
                console.warn('Could not fetch local file, using URI directly:', fetchError);
                downloadUrl = fileSource;
              }
            }
          }
          
          // Create and trigger download
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up object URL if we created one
          if (downloadUrl.startsWith('blob:')) {
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
          }
          
          console.log('Web download initiated for:', fileName);
          
        } catch (webError) {
          console.error('Web download failed:', webError);
          Alert.alert('Download Error', 'Failed to download certificate on web. Please try again.');
        }
      } else {
        // Mobile download (existing logic)
        const downloadPath = FileSystem.documentDirectory + fileName;
        
        if (typeof fileSource === 'string' && fileSource.startsWith('http')) {
          // Download from URL
          const downloadResumable = FileSystem.createDownloadResumable(
            fileSource,
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
          await handleShareCertificate(fileSource);
        }
      }
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download certificate.');
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

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Certificate Design with Background Image - LANDSCAPE */}
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
        
        {/* Overlay Text */}
        <View style={styles.textOverlay}>
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
              <Text style={styles.buttonText}>
                {Platform.OS === 'web' ? 'Generate & Download PDF' : 'Generate PDF Certificate'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {generatedUrl && (
          <TouchableOpacity 
            style={[
              styles.downloadButton,
              { backgroundColor: isDark ? '#27ae60' : '#2ecc71' }
            ]} 
            onPress={() => handleDownloadCertificate()}
          >
            <MaterialIcons name="download" size={20} color="white" />
            <Text style={styles.buttonText}>Download Again</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  certificateContainer: {
    width: CERTIFICATE_CONFIG.container.width,
    height: CERTIFICATE_CONFIG.container.height,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 8,
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
  participantName: {
    position: 'absolute',
    top: CERTIFICATE_CONFIG.userName.topPosition,
    left: CERTIFICATE_CONFIG.userName.leftMargin,
    right: CERTIFICATE_CONFIG.userName.rightMargin,
    zIndex: 2,
    
    fontSize: CERTIFICATE_CONFIG.userName.fontSize,
    fontWeight: CERTIFICATE_CONFIG.userName.fontWeight,
    fontFamily: CERTIFICATE_CONFIG.userName.fontFamily,
    color: CERTIFICATE_CONFIG.userName.color,
    
    textAlign: CERTIFICATE_CONFIG.userName.textAlign,
    letterSpacing: CERTIFICATE_CONFIG.userName.letterSpacing,
    lineHeight: CERTIFICATE_CONFIG.userName.lineHeight,
    textTransform: CERTIFICATE_CONFIG.userName.textTransform,
    
    textShadowColor: CERTIFICATE_CONFIG.userName.textShadowColor,
    textShadowOffset: CERTIFICATE_CONFIG.userName.textShadowOffset,
    textShadowRadius: CERTIFICATE_CONFIG.userName.textShadowRadius,
    
    backgroundColor: CERTIFICATE_CONFIG.userName.backgroundColor,
    paddingHorizontal: CERTIFICATE_CONFIG.userName.paddingHorizontal,
    paddingVertical: CERTIFICATE_CONFIG.userName.paddingVertical,
    borderRadius: CERTIFICATE_CONFIG.userName.borderRadius,
  },
  
  buttonContainer: {
    marginTop: 30,
    gap: 15,
    width: '100%',
    maxWidth: 400,
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
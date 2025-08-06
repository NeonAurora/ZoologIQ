// components/certificate/StaticCertificate.jsx
import React, { useRef, useState, useCallback } from 'react';
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
import { uploadFile, uploadCertificate } from '@/services/supabase/storage';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 📏 FIXED CERTIFICATE DIMENSIONS - NOT RESPONSIVE!
const CERTIFICATE_DIMENSIONS = {
  width: 942,  // Fixed width - A4 landscape equivalent at 150 DPI
  height: 495,  // Fixed height - A4 landscape equivalent at 150 DPI
  aspectRatio: 942 / 495
};

// Calculate display dimensions (responsive for UI only, not for certificate generation)
const calculateDisplayDimensions = () => {
  const maxDisplayWidth = Math.min(screenWidth - 40, CERTIFICATE_DIMENSIONS.width);
  const displayHeight = maxDisplayWidth / CERTIFICATE_DIMENSIONS.aspectRatio;
  
  return {
    width: maxDisplayWidth,
    height: displayHeight,
    scale: maxDisplayWidth / CERTIFICATE_DIMENSIONS.width // Scale factor for UI display only
  };
};

// Calculate responsive display for small screens
const calculateResponsiveDisplayDimensions = () => {
  // Ensure certificate preview fits on screen with room for buttons
  const availableHeight = screenHeight * 0.5; // Use 50% of screen height max
  const availableWidth = screenWidth - 40; // Account for padding
  
  // Calculate dimensions that fit within available space
  const widthScale = availableWidth / CERTIFICATE_DIMENSIONS.width;
  const heightScale = availableHeight / CERTIFICATE_DIMENSIONS.height;
  const scale = Math.min(widthScale, heightScale, 1); // Don't scale up, only down
  
  return {
    width: CERTIFICATE_DIMENSIONS.width * scale,
    height: CERTIFICATE_DIMENSIONS.height * scale,
    scale: scale
  };
};

// 🎨 FIXED CERTIFICATE CONFIGURATION - ABSOLUTE POSITIONING & SIZES
const CERTIFICATE_CONFIG = {
  // Fixed dimensions for actual certificate generation
  actual: CERTIFICATE_DIMENSIONS,
  
  // Display dimensions for UI preview only
  display: calculateDisplayDimensions(),
  
  // Responsive display for small screens
  responsiveDisplay: calculateResponsiveDisplayDimensions(),
  
  userName: {
    // Fixed positioning (in pixels, not percentages)
    topPosition: 190,
    leftPadding: 50,
    rightPadding: 40,
    
    // Fixed font size (not screen-dependent)
    fontSize: 28,
    fontWeight: 'normal',
    fontFamily: Platform.select({
      ios: 'Lucida Unicode Calligraphy',
      android: 'LucidaCalligraphy', 
      web: 'LucidaCalligraphy, "Lucida Unicode Calligraphy", "Brush Script MT", cursive',
      default: 'cursive'
    }),
    
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 34, // Fixed line height
    textTransform: 'none',
    
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    
    backgroundColor: 'transparent',
  }
};

export default function StaticCertificate({ 
  recipientName = "John Doe",
  completionDate = new Date().toLocaleDateString(),
  instructorName = "WildguardMY Education Team",
  certificateId = `CERT-${Date.now()}`,
  onCertificateGenerated = null
}) {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [certificatePdfUri, setCertificatePdfUri] = useState(null);
  const [localPdfBlob, setLocalPdfBlob] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isCertificateBlocked = Platform.OS === 'android' && isDark;
  const certificateTextColor = isDark ? Colors.dark.certificateText : Colors.light.certificateText;

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Platform-specific base64 conversion
  const convertImageToBase64 = async (imageUri) => {
    if (Platform.OS === 'web') {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Web base64 conversion failed:', error);
        throw error;
      }
    } else {
      try {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
      } catch (error) {
        console.error('Mobile base64 conversion failed:', error);
        throw error;
      }
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      setIsGenerating(true);
      
      if (!imageLoaded) {
        console.log('Waiting for background image to load...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // 🎯 CAPTURE AT FIXED HIGH RESOLUTION - NOT SCREEN DEPENDENT
      const CAPTURE_SCALE = 4; // 4x resolution for ultra-high quality
      const imageUri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
        // FIXED dimensions - same on ALL devices
        width: CERTIFICATE_DIMENSIONS.width * CAPTURE_SCALE,   // 3768px
        height: CERTIFICATE_DIMENSIONS.height * CAPTURE_SCALE, // 1980px
        pixelRatio: 1, // Don't use device pixel ratio - use our fixed scale
      });
      
      console.log(`Certificate captured at fixed ${CERTIFICATE_DIMENSIONS.width * CAPTURE_SCALE}x${CERTIFICATE_DIMENSIONS.height * CAPTURE_SCALE}px:`, imageUri);
      
      const pdfResult = await convertToPDF(imageUri);
      
      if (pdfResult && pdfResult.uri) {
        const { uri: pdfUri, blob: pdfBlob } = pdfResult;
        setCertificatePdfUri(pdfUri);
        if (pdfBlob) setLocalPdfBlob(pdfBlob);
        
        // Create proper PDF file/blob for upload
        let uploadData;
        if (Platform.OS === 'web') {
          if (pdfBlob) {
            uploadData = new File([pdfBlob], `certificate_${recipientName}.pdf`, {
              type: 'application/pdf'
            });
          } else {
            const response = await fetch(pdfUri);
            const blob = await response.blob();
            uploadData = new File([blob], `certificate_${recipientName}.pdf`, {
              type: 'application/pdf'
            });
          }
        } else {
          uploadData = pdfUri;
        }
        
        const uploadedUrl = await uploadCertificate(uploadData, recipientName);
        
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
                  onPress: () => handleDownloadCertificate(pdfBlob || pdfUri),
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

  // HIGH-QUALITY WEB PDF CREATION - FIXED DIMENSIONS
  const createHighQualityWebPDF = async (base64Image) => {
    try {
      console.log('Creating high-quality web PDF with fixed dimensions');
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // FIXED high-resolution canvas - same on all devices
      const RENDER_SCALE = 4;
      const canvasWidth = CERTIFICATE_DIMENSIONS.width * RENDER_SCALE;
      const canvasHeight = CERTIFICATE_DIMENSIONS.height * RENDER_SCALE;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Scale context for high-DPI rendering
      ctx.scale(RENDER_SCALE, RENDER_SCALE);
      
      // Maximum quality settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, CERTIFICATE_DIMENSIONS.width, CERTIFICATE_DIMENSIONS.height);
      
      const img = new window.Image();
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          try {
            // Draw at FIXED certificate dimensions
            ctx.drawImage(img, 0, 0, CERTIFICATE_DIMENSIONS.width, CERTIFICATE_DIMENSIONS.height);
            
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error('Failed to create blob'));
                return;
              }
              
              const pdfBlob = new Blob([blob], { type: 'application/pdf' });
              const blobUrl = URL.createObjectURL(pdfBlob);
              
              console.log(`High-quality PDF created: ${canvasWidth}x${canvasHeight}px`);
              resolve({ uri: blobUrl, blob: pdfBlob });
            }, 'image/png', 1.0);
            
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = reject;
        img.src = `data:image/png;base64,${base64Image}`;
      });
      
    } catch (error) {
      console.error('High-quality web PDF creation failed:', error);
      return null;
    }
  };

  const createHighQualityMobilePDF = async (base64Image) => {
    try {
      console.log('Creating mobile PDF with proper aspect ratio and minimal white space');
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              @page {
                size: A4 landscape;
                margin: 0;
              }
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              html, body {
                width: 100vw;
                height: 100vh;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .certificate-image {
                max-width: 100vw;
                max-height: 100vh;
                width: auto;
                height: auto;
                object-fit: contain;
                object-position: center;
                display: block;
              }
            </style>
          </head>
          <body>
            <img src="data:image/png;base64,${base64Image}" class="certificate-image" />
          </body>
        </html>
      `;
      
      const result = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
        width: 942,   // A4 landscape width
        height: 495,  // A4 landscape height
        margins: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
      });
      
      if (!result || !result.uri) {
        throw new Error('Mobile PDF generation failed');
      }
      
      console.log('Mobile PDF created with proper aspect ratio');
      return { uri: result.uri, blob: null };
      
    } catch (error) {
      console.error('Mobile PDF creation failed:', error);
      return null;
    }
  };

  const convertToPDF = async (imageUri) => {
    try {
      const base64Image = await convertImageToBase64(imageUri);
      
      if (Platform.OS === 'web') {
        return await createHighQualityWebPDF(base64Image);
      } else {
        return await createHighQualityMobilePDF(base64Image);
      }
      
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
        try {
          let downloadUrl;
          
          if (fileSource instanceof Blob) {
            downloadUrl = URL.createObjectURL(fileSource);
          } else if (localPdfBlob) {
            downloadUrl = URL.createObjectURL(localPdfBlob);
          } else if (typeof fileSource === 'string') {
            if (fileSource.startsWith('http')) {
              const response = await fetch(fileSource);
              const blob = await response.blob();
              downloadUrl = URL.createObjectURL(blob);
            } else if (fileSource.startsWith('data:')) {
              downloadUrl = fileSource;
            } else {
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
          
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          if (downloadUrl.startsWith('blob:')) {
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
          }
          
          console.log('Web download initiated for:', fileName);
          
        } catch (webError) {
          console.error('Web download failed:', webError);
          Alert.alert('Download Error', 'Failed to download certificate on web. Please try again.');
        }
      } else {
        const downloadPath = FileSystem.documentDirectory + fileName;
        
        if (typeof fileSource === 'string' && fileSource.startsWith('http')) {
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

  // Determine which display dimensions to use
  const useResponsiveDisplay = CERTIFICATE_CONFIG.responsiveDisplay.scale < 0.8;
  const displayConfig = useResponsiveDisplay ? CERTIFICATE_CONFIG.responsiveDisplay : CERTIFICATE_CONFIG.display;
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* HIDDEN Fixed-size certificate container for capture - UNCHANGED */}
      <View 
        ref={certificateRef} 
        style={[
          styles.hiddenCertificateContainer,
          {
            width: CERTIFICATE_DIMENSIONS.width,
            height: CERTIFICATE_DIMENSIONS.height,
            backgroundColor: 'white',
            overflow: 'hidden'
          }
        ]}
        collapsable={false}
      >
        <Image 
          source={require('@/assets/images/certificate_template.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
          onLoad={handleImageLoad}
          onError={(error) => {
            console.error('Certificate background image failed to load:', error);
            setImageLoaded(true);
          }}
        />
        
        <View style={styles.textOverlay}>
          <Text style={[
            styles.participantName,
            { color: certificateTextColor } // 🔥 Use theme color
          ]}>
            {recipientName}
          </Text>
        </View>
      </View>

      {/* VISIBLE Responsive display certificate - NEW */}
      <View 
        style={[
          styles.displayCertificateContainer,
          {
            width: displayConfig.width,
            height: displayConfig.height,
            backgroundColor: 'white',
            overflow: 'hidden'
          }
        ]}
      >
        <Image 
          source={require('@/assets/images/certificate_template.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        <View style={styles.textOverlay}>
          <Text type='link' style={[styles.participantName, {
            fontSize: CERTIFICATE_CONFIG.userName.fontSize * displayConfig.scale,
            lineHeight: CERTIFICATE_CONFIG.userName.lineHeight * displayConfig.scale,
            top: CERTIFICATE_CONFIG.userName.topPosition * displayConfig.scale,
            left: CERTIFICATE_CONFIG.userName.leftPadding * displayConfig.scale,
            right: CERTIFICATE_CONFIG.userName.rightPadding * displayConfig.scale,
            color: certificateTextColor
          }]}>
            {recipientName}
          </Text>
        </View>
      </View>
      
      {/* Scale info for small screens */}
      {useResponsiveDisplay && (
        <Text style={styles.scaleInfo}>
          Preview scaled to {Math.round(displayConfig.scale * 100)}% for display • Generated at full 942×495px
        </Text>
      )}
      
      {/* 🚨 DARK MODE BLOCKING - Show this instead of action buttons when in dark mode */}
      {isCertificateBlocked ? (
        <View style={styles.lightThemeContainer}>
          <Text style={styles.lightThemeText}>
            Please switch to light theme before continuing download
          </Text>
          
          <TouchableOpacity 
            style={styles.lightThemeButton}
            onPress={() => {
              Alert.alert(
                'Switch to Light Theme',
                'Please switch your device to light theme using the quick settings (swipe down twice), then return to generate your certificate.',
                [{ text: 'Got it!' }]
              );
            }}
            activeOpacity={0.8}
          >
            <MaterialIcons name="refresh" size={16} color="#2563eb" />
            <Text style={styles.lightThemeButtonText}>I've switched to light theme</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Normal Action Buttons - Only show when NOT in dark mode */
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
      )}

      {/* Success message - only show when certificate is generated and not blocked */}
      {generatedUrl && !isCertificateBlocked && (
        <View style={styles.successContainer}>
          <MaterialIcons 
            name="check-circle" 
            size={24} 
            color={isDark ? '#2ecc71' : '#27ae60'} 
          />
          <Text style={[styles.successText, { color: isDark ? '#2ecc71' : '#27ae60' }]}>
            Fixed-size PDF Certificate (942×495px) generated successfully!
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
  // HIDDEN container for capture - positioned off-screen
  hiddenCertificateContainer: {
    position: 'absolute',
    left: -10000,
    top: -10000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  // VISIBLE container for display
  displayCertificateContainer: {
    position: 'relative',
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
    left: CERTIFICATE_CONFIG.userName.leftPadding,
    right: CERTIFICATE_CONFIG.userName.rightPadding,
    zIndex: 2,
    fontSize: CERTIFICATE_CONFIG.userName.fontSize,
    fontWeight: CERTIFICATE_CONFIG.userName.fontWeight,
    fontFamily: CERTIFICATE_CONFIG.userName.fontFamily,
    textAlign: CERTIFICATE_CONFIG.userName.textAlign,
    letterSpacing: CERTIFICATE_CONFIG.userName.letterSpacing,
    lineHeight: CERTIFICATE_CONFIG.userName.lineHeight,
    textTransform: CERTIFICATE_CONFIG.userName.textTransform,
    textShadowColor: CERTIFICATE_CONFIG.userName.textShadowColor,
    textShadowOffset: CERTIFICATE_CONFIG.userName.textShadowOffset,
    textShadowRadius: CERTIFICATE_CONFIG.userName.textShadowRadius,
    backgroundColor: CERTIFICATE_CONFIG.userName.backgroundColor,
  },
  scaleInfo: {
    fontSize: 11,
    color: '#666',
    marginTop: 8,
    marginBottom: 5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  
  // 🚨 NEW: Dark Mode Blocking Styles
  blockedContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#dc3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  blockedHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  blockedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
    marginTop: 8,
    textAlign: 'center',
  },
  blockedSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 12,
  },
  instructionsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    backgroundColor: '#2563eb',
    color: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  blockedActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#dc3545',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  blockedActionText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
  },

  // Regular button styles
  buttonContainer: {
    marginTop: 20,
    gap: 12,
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
    marginTop: 10,
    gap: 10,
  },
  successText: {
    fontSize: 16,
    fontWeight: '600',
  },
    lightThemeContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    alignItems: 'center',
    gap: 12,
  },
  lightThemeText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  lightThemeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  lightThemeButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
});
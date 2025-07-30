import { supabase } from './config';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { Platform } from 'react-native';

/**
 * Upload an image to Supabase Storage
 * @param {string|File} imageData - The local URI (mobile) or File object/base64 data URI (web)
 * @returns {Promise<string>} The public URL of the uploaded image
 */
export const uploadImage = async (imageData) => {
  try {
    console.log('uploadImage called with:', imageData);
    
    if (Platform.OS === 'web') {
      return await uploadImageWeb(imageData);
    } else {
      return await uploadImageMobile(imageData);
    }
  } catch (error) {
    console.error('Error in upload process:', error);
    return null;
  }
};

const uploadImageWeb = async (uri) => {
  try {
    console.log('uploadImageWeb called with URI:', uri);
    
    if (!uri) {
      console.error('No URI provided for web upload');
      return null;
    }
    
    // Check if it's a base64 data URI
    if (uri.startsWith('data:')) {
      // Extract the base64 part
      const base64Data = uri.split(',')[1];
      const mimeType = uri.match(/data:([^;]+)/)[1];
      
      // Convert base64 to blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      
      // Get file extension from mime type
      const fileExtension = mimeType.split('/')[1] || 'jpg';
      const fileName = `${Date.now()}.${fileExtension}`;
      
      console.log("Uploading file:", fileName, "Type:", mimeType);
      
      // Upload the blob directly to your quiz-images bucket
      const { data, error } = await supabase.storage
        .from('quiz-images')
        .upload(`questions/${fileName}`, blob, {
          contentType: mimeType,
          upsert: true
        });
      
      if (error) {
        console.error('Error uploading:', error);
        return null;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('quiz-images')
        .getPublicUrl(`questions/${fileName}`);
      
      console.log("Upload successful, URL:", publicUrlData);
      return publicUrlData.publicUrl;
    } else {
      console.error('Expected base64 data URI on web, got:', uri);
      return null;
    }
  } catch (error) {
    console.error('Error in web upload process:', error);
    return null;
  }
};

const uploadImageMobile = async (uri) => {
  try {
    console.log('uploadImageMobile called with URI:', uri);
    
    if (!uri) {
      console.error('No URI provided for mobile upload');
      return null;
    }
    
    // Extract file extension from the uri
    const fileExtension = uri.split('.').pop();
    
    // Generate a unique filename
    const fileName = `${Date.now()}.${fileExtension}`;
    
    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("File doesn't exist");
      return null;
    }
    
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert to ArrayBuffer
    const arrayBuffer = decode(base64);
    
    console.log("Uploading file:", fileName);
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('quiz-images')
      .upload(`questions/${fileName}`, arrayBuffer, {
        contentType: `image/${fileExtension}`,
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('quiz-images')
      .getPublicUrl(`questions/${fileName}`);
    
    console.log("Upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in mobile upload process:', error);
    return null;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} url - The public URL of the image
 * @returns {Promise<boolean>} Success status
 */
export const deleteImage = async (url) => {
  try {
    // Extract the path from the URL
    const path = url.split('quiz-images/')[1];
    
    if (!path) {
      console.error('Invalid URL format');
      return false;
    }
    
    const { error } = await supabase.storage
      .from('quiz-images')
      .remove([path]);
    
    if (error) {
      console.error('Error deleting:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in delete process:', error);
    return false;
  }
};

// Services/supabase/storage.js (Add these functions to your existing file)

/**
 * Upload a PDF file to Supabase Storage
 * @param {string|File} pdfData - The local URI (mobile) or File object (web)
 * @returns {Promise<string>} The public URL of the uploaded PDF
 */
export const uploadPdf = async (pdfData) => {
  try {
    console.log('uploadPdf called with:', pdfData);
    
    if (Platform.OS === 'web') {
      return await uploadPdfWeb(pdfData);
    } else {
      return await uploadPdfMobile(pdfData);
    }
  } catch (error) {
    console.error('Error in PDF upload process:', error);
    return null;
  }
};

const uploadPdfWeb = async (file) => {
  try {
    console.log('uploadPdfWeb called with file:', file);
    
    if (!file) {
      console.error('No file provided for web PDF upload');
      return null;
    }
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      console.error('Invalid file type. Only PDF files are allowed.');
      return null;
    }
    
    // Generate unique filename
    const fileName = `${Date.now()}.pdf`;
    
    console.log("Uploading PDF file:", fileName);
    
    // Upload the file directly to your lesson-materials bucket
    const { data, error } = await supabase.storage
      .from('lesson-materials')
      .upload(`pdfs/${fileName}`, file, {
        contentType: 'application/pdf',
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading PDF:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('lesson-materials')
      .getPublicUrl(`pdfs/${fileName}`);
    
    console.log("PDF upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in web PDF upload process:', error);
    return null;
  }
};

const uploadPdfMobile = async (uri) => {
  try {
    console.log('uploadPdfMobile called with URI:', uri);
    
    if (!uri) {
      console.error('No URI provided for mobile PDF upload');
      return null;
    }
    
    // Generate a unique filename
    const fileName = `${Date.now()}.pdf`;
    
    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("PDF file doesn't exist");
      return null;
    }
    
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert to ArrayBuffer
    const arrayBuffer = decode(base64);
    
    console.log("Uploading PDF file:", fileName);
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('lesson-materials')
      .upload(`pdfs/${fileName}`, arrayBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading PDF:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('lesson-materials')
      .getPublicUrl(`pdfs/${fileName}`);
    
    console.log("PDF upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in mobile PDF upload process:', error);
    return null;
  }
};

/**
 * Delete a PDF file from Supabase Storage
 * @param {string} url - The public URL of the PDF
 * @returns {Promise<boolean>} Success status
 */
export const deletePdf = async (url) => {
  try {
    // Extract the path from the URL
    const path = url.split('lesson-materials/')[1];
    
    if (!path) {
      console.error('Invalid PDF URL format');
      return false;
    }
    
    const { error } = await supabase.storage
      .from('lesson-materials')
      .remove([path]);
    
    if (error) {
      console.error('Error deleting PDF:', error);
      return false;
    }
    
    console.log('PDF deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in PDF delete process:', error);
    return false;
  }
};

/**
 * Upload an audio file to Supabase Storage
 * @param {string|File} audioData - The local URI (mobile) or File object (web)
 * @returns {Promise<string>} The public URL of the uploaded audio
 */
export const uploadAudio = async (audioData) => {
  try {
    console.log('uploadAudio called with:', audioData);
    
    if (Platform.OS === 'web') {
      return await uploadAudioWeb(audioData);
    } else {
      return await uploadAudioMobile(audioData);
    }
  } catch (error) {
    console.error('Error in audio upload process:', error);
    return null;
  }
};

/**
 * Web audio upload handler
 * Supports: .mp3, .wav, .m4a, .aac formats
 */
const uploadAudioWeb = async (file) => {
  try {
    console.log('uploadAudioWeb called with file:', file);
    
    if (!file) {
      console.error('No file provided for web audio upload');
      return null;
    }
    
    // Validate audio file types
    const allowedTypes = [
      'audio/mpeg', 
      'audio/wav', 
      'audio/mp4', 
      'audio/aac',
      'audio/mp3'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type. Only audio files are allowed.');
      return null;
    }
    
    // Generate unique filename with proper extension
    const fileExtension = file.name.split('.').pop() || 'mp3';
    const fileName = `${Date.now()}.${fileExtension}`;
    
    console.log("Uploading audio file:", fileName);
    
    // Upload to lesson-materials bucket under audio folder
    const { data, error } = await supabase.storage
      .from('lesson-materials')
      .upload(`audio/${fileName}`, file, {
        contentType: file.type,
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading audio:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('lesson-materials')
      .getPublicUrl(`audio/${fileName}`);
    
    console.log("Audio upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in web audio upload process:', error);
    return null;
  }
};

/**
 * Mobile audio upload handler
 * Handles local file URIs from document picker
 */
const uploadAudioMobile = async (uri) => {
  try {
    console.log('uploadAudioMobile called with URI:', uri);
    
    if (!uri) {
      console.error('No URI provided for mobile audio upload');
      return null;
    }
    
    // Extract file extension from URI
    const fileExtension = uri.split('.').pop() || 'mp3';
    const fileName = `${Date.now()}.${fileExtension}`;
    
    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("Audio file doesn't exist");
      return null;
    }
    
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert to ArrayBuffer for upload
    const arrayBuffer = decode(base64);
    
    console.log("Uploading audio file:", fileName);
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('lesson-materials')
      .upload(`audio/${fileName}`, arrayBuffer, {
        contentType: `audio/${fileExtension}`,
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading audio:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('lesson-materials')
      .getPublicUrl(`audio/${fileName}`);
    
    console.log("Audio upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in mobile audio upload process:', error);
    return null;
  }
};

/**
 * Delete an audio file from Supabase Storage
 * @param {string} url - The public URL of the audio file
 * @returns {Promise<boolean>} Success status
 */
export const deleteAudio = async (url) => {
  try {
    // Extract the path from the URL
    const path = url.split('lesson-materials/')[1];
    
    if (!path) {
      console.error('Invalid audio URL format');
      return false;
    }
    
    const { error } = await supabase.storage
      .from('lesson-materials')
      .remove([path]);
    
    if (error) {
      console.error('Error deleting audio:', error);
      return false;
    }
    
    console.log('Audio deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in audio delete process:', error);
    return false;
  }
};

/**
 * Generic file upload function that handles images, PDFs, and audio
 * @param {string|File} fileData - The file to upload
 * @param {string} fileType - 'image', 'pdf', or 'audio'
 * @returns {Promise<string>} The public URL of the uploaded file
 */
export const uploadFile = async (fileData, fileType) => {
  switch (fileType) {
    case 'image':
      return await uploadImage(fileData);
    case 'pdf':
      return await uploadPdf(fileData);
    case 'audio':
      return await uploadAudio(fileData);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
};

/**
 * Upload a certificate to Supabase Storage
 * @param {string|File} certificateData - The local URI (mobile) or File object/base64 data URI (web)
 * @param {string} recipientName - Name of certificate recipient for filename
 * @returns {Promise<string>} The public URL of the uploaded certificate
 */
export const uploadCertificate = async (certificateData, recipientName = 'certificate') => {
  try {
    console.log('uploadCertificate called with:', certificateData);
    
    if (Platform.OS === 'web') {
      return await uploadCertificateWeb(certificateData, recipientName);
    } else {
      return await uploadCertificateMobile(certificateData, recipientName);
    }
  } catch (error) {
    console.error('Error in certificate upload process:', error);
    return null;
  }
};

// Update the uploadCertificateWeb function in your storage.js
const uploadCertificateWeb = async (fileData, recipientName) => {
  try {
    console.log('uploadCertificateWeb called with:', fileData, 'Recipient:', recipientName);
    
    if (!fileData) {
      console.error('No file data provided for web certificate upload');
      return null;
    }
    
    let blob;
    let mimeType;
    let fileExtension;
    
    // Handle File object (for PDFs)
    if (fileData instanceof File) {
      console.log('Handling File object:', fileData.name, fileData.type);
      blob = fileData;
      mimeType = fileData.type;
      fileExtension = fileData.type === 'application/pdf' ? 'pdf' : 
                     fileData.name.split('.').pop() || 'pdf';
    }
    // Handle Blob object
    else if (fileData instanceof Blob) {
      console.log('Handling Blob object');
      blob = fileData;
      mimeType = fileData.type || 'application/pdf';
      fileExtension = mimeType === 'application/pdf' ? 'pdf' : 'png';
    }
    // Handle data URI (for images)
    else if (typeof fileData === 'string' && fileData.startsWith('data:')) {
      console.log('Handling data URI');
      // Extract the base64 part
      const base64Data = fileData.split(',')[1];
      mimeType = fileData.match(/data:([^;]+)/)[1];
      
      // Convert base64 to blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: mimeType });
      
      // Get file extension from mime type
      fileExtension = mimeType.split('/')[1] || 'png';
    }
    // Handle URL (fetch and convert to blob)
    else if (typeof fileData === 'string' && (fileData.startsWith('http') || fileData.startsWith('blob:'))) {
      console.log('Handling URL, fetching blob');
      try {
        const response = await fetch(fileData);
        if (!response.ok) throw new Error('Failed to fetch file');
        blob = await response.blob();
        mimeType = blob.type || 'application/pdf';
        fileExtension = mimeType === 'application/pdf' ? 'pdf' : 'png';
      } catch (fetchError) {
        console.error('Failed to fetch file from URL:', fetchError);
        return null;
      }
    }
    else {
      console.error('Unsupported file data type for web certificate upload:', typeof fileData);
      return null;
    }
    
    // Create meaningful filename
    const sanitizedName = recipientName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${sanitizedName}_${Date.now()}.${fileExtension}`;
    
    // Determine upload folder based on file type
    const uploadFolder = mimeType === 'application/pdf' ? 'pdfs' : 'images';
    
    console.log("Uploading certificate:", fileName, "Type:", mimeType, "Folder:", uploadFolder);
    
    // Upload to certificates bucket
    const { data, error } = await supabase.storage
      .from('certificates')
      .upload(`${uploadFolder}/${fileName}`, blob, {
        contentType: mimeType,
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading certificate:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(`${uploadFolder}/${fileName}`);
    
    console.log("Certificate upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in web certificate upload process:', error);
    return null;
  }
};

// Update the uploadCertificateMobile function in your storage.js
const uploadCertificateMobile = async (uri, recipientName) => {
  try {
    console.log('uploadCertificateMobile called with URI:', uri);
    
    if (!uri) {
      console.error('No URI provided for mobile certificate upload');
      return null;
    }
    
    // Extract file extension from the uri
    const fileExtension = uri.split('.').pop() || 'pdf';
    
    // Determine content type and folder based on extension
    let contentType;
    let uploadFolder;
    
    if (fileExtension.toLowerCase() === 'pdf') {
      contentType = 'application/pdf';
      uploadFolder = 'pdfs';
    } else {
      contentType = `image/${fileExtension}`;
      uploadFolder = 'images';
    }
    
    // Create meaningful filename
    const sanitizedName = recipientName.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${sanitizedName}_${Date.now()}.${fileExtension}`;
    
    // Read the file as base64
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.error("Certificate file doesn't exist");
      return null;
    }
    
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert to ArrayBuffer
    const arrayBuffer = decode(base64);
    
    console.log("Uploading certificate:", fileName, "Type:", contentType, "Folder:", uploadFolder);
    
    // Upload to certificates bucket
    const { data, error } = await supabase.storage
      .from('certificates')
      .upload(`${uploadFolder}/${fileName}`, arrayBuffer, {
        contentType: contentType,
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading certificate:', error);
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(`${uploadFolder}/${fileName}`);
    
    console.log("Certificate upload successful, URL:", publicUrlData);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in mobile certificate upload process:', error);
    return null;
  }
};

/**
 * Delete a certificate from Supabase Storage
 * @param {string} url - The public URL of the certificate
 * @returns {Promise<boolean>} Success status
 */
export const deleteCertificate = async (url) => {
  try {
    // Extract the path from the URL
    const path = url.split('certificates/')[1];
    
    if (!path) {
      console.error('Invalid certificate URL format');
      return false;
    }
    
    const { error } = await supabase.storage
      .from('certificates')
      .remove([path]);
    
    if (error) {
      console.error('Error deleting certificate:', error);
      return false;
    }
    
    console.log('Certificate deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in certificate delete process:', error);
    return false;
  }
};
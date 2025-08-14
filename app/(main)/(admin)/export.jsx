// app/admin/export.jsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { 
  Text, 
  Checkbox, 
  Button, 
  Card, 
  ActivityIndicator, 
  Divider,
  Surface,
  Dialog,
  Portal,
  Chip
} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { exportMultipleTables, getAvailableTables } from '@/services/supabase';
import { convertExportDataToCSV } from '@/scripts/csvConversion';

export default function ExportPage() {
  const { user, supabaseData, loading: authLoading } = useAuth();
  const { isDark } = useTheme();
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exportedFiles, setExportedFiles] = useState([]);

  // Dialog states
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    onCancel: null,
    confirmText: 'OK',
    cancelText: 'Cancel'
  });

  const styles = createStyles(isDark);

  useEffect(() => {
    if (user?.sub && supabaseData && !authLoading) {
      loadAvailableTables();
    }
  }, [user?.sub, supabaseData, authLoading]);

  const showDialog = (config) => {
    setDialogConfig({
      title: config.title || 'Information',
      message: config.message || '',
      type: config.type || 'info',
      onConfirm: config.onConfirm || (() => setDialogVisible(false)),
      onCancel: config.onCancel || (() => setDialogVisible(false)),
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Cancel'
    });
    setDialogVisible(true);
  };

  const loadAvailableTables = async () => {
    if (!user?.sub) {
      showDialog({
        title: 'Error',
        message: 'User not authenticated',
        type: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      console.log('📋 Loading tables for user:', user.sub);
      
      const tables = await getAvailableTables(user.sub);
      
      if (tables.success) {
        setAvailableTables(tables.data);
        const initialSelection = {};
        tables.data.forEach(table => {
          initialSelection[table.name] = false;
        });
        setSelectedTables(initialSelection);
        console.log(`✅ Loaded ${tables.data.length} tables`);
      } else {
        console.error('❌ Failed to load tables:', tables.message);
        showDialog({
          title: 'Error',
          message: tables.message || 'Failed to load available tables',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error loading tables:', error);
      showDialog({
        title: 'Error',
        message: 'Failed to load available tables',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTableToggle = (tableName) => {
    setSelectedTables(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedTables).every(Boolean);
    const newSelection = {};
    availableTables.forEach(table => {
      newSelection[table.name] = !allSelected;
    });
    setSelectedTables(newSelection);
  };

  // Download to local file system using Storage Access Framework
  const downloadToFileSystem = async (fileUri, filename) => {
    try {
      console.log(`💾 Downloading ${filename} to file system`);
      
      if (Platform.OS === 'android') {
        // Use Storage Access Framework to let user choose location
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        
        if (!permissions.granted) {
          showDialog({
            title: 'Permission Required',
            message: 'Storage permission is required to save files to your device.',
            type: 'error'
          });
          return;
        }

        // Read the file content
        const fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        // Create the file in the chosen directory
        const newFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          'text/csv'
        );

        // Write the content to the file
        await FileSystem.writeAsStringAsync(newFileUri, fileContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        showDialog({
          title: 'Download Complete! 📁',
          message: `${filename} has been saved to your chosen location.`,
          type: 'info'
        });

        console.log(`✅ Successfully saved ${filename} to file system`);
      } else {
        // For iOS, just copy to Documents directory and show path
        const documentsUri = FileSystem.documentDirectory + filename;
        await FileSystem.copyAsync({
          from: fileUri,
          to: documentsUri
        });

        showDialog({
          title: 'Download Complete! 📁',
          message: `${filename} has been saved to Documents folder.`,
          type: 'info'
        });
      }
    } catch (error) {
      console.error('Error downloading to file system:', error);
      showDialog({
        title: 'Download Error',
        message: `Failed to save ${filename} to your device.`,
        type: 'error'
      });
    }
  };

  // Share file using system share dialog
  const shareCSVFile = async (fileUri, filename) => {
    try {
      console.log(`📤 Sharing CSV file: ${filename}`);
      
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/csv',
          dialogTitle: `Share ${filename}`,
          UTI: 'public.comma-separated-values-text'
        });
        console.log(`✅ Successfully shared: ${filename}`);
      } else {
        showDialog({
          title: 'Sharing not available',
          message: `Sharing is not available on this device.`,
          type: 'info'
        });
      }
    } catch (error) {
      console.error('Error sharing CSV file:', error);
      showDialog({
        title: 'Sharing Error',
        message: `Failed to share ${filename}`,
        type: 'error'
      });
    }
  };

  // Show download/share choice dialog for individual file
  const showFileActionDialog = (file) => {
    showDialog({
      title: `${file.filename}`,
      message: 'How would you like to handle this file?',
      type: 'custom',
      confirmText: 'Share',
      cancelText: 'Download',
      onConfirm: () => {
        setDialogVisible(false);
        shareCSVFile(file.uri, file.filename);
      },
      onCancel: () => {
        setDialogVisible(false);
        downloadToFileSystem(file.uri, file.filename);
      }
    });
  };

  // Show choice for all files
  const showMultipleFilesActionDialog = (files) => {
    showDialog({
      title: `${files.length} Files Ready! 📁`,
      message: 'Choose how to handle your exported CSV files:',
      type: 'custom',
      confirmText: 'Share All',
      cancelText: 'Download All',
      onConfirm: () => {
        setDialogVisible(false);
        shareAllFiles(files);
      },
      onCancel: () => {
        setDialogVisible(false);
        downloadAllFiles(files);
      }
    });
  };

  // Download all files to file system
  const downloadAllFiles = async (files) => {
    try {
      if (Platform.OS === 'android') {
        // Get directory permission once for all files
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        
        if (!permissions.granted) {
          showDialog({
            title: 'Permission Required',
            message: 'Storage permission is required to save files to your device.',
            type: 'error'
          });
          return;
        }

        let successCount = 0;
        for (const file of files) {
          try {
            const fileContent = await FileSystem.readAsStringAsync(file.uri, {
              encoding: FileSystem.EncodingType.UTF8,
            });

            const newFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              file.filename,
              'text/csv'
            );

            await FileSystem.writeAsStringAsync(newFileUri, fileContent, {
              encoding: FileSystem.EncodingType.UTF8,
            });

            successCount++;
            console.log(`✅ Downloaded: ${file.filename}`);
          } catch (error) {
            console.error(`❌ Failed to download ${file.filename}:`, error);
          }
        }

        showDialog({
          title: 'Downloads Complete! 📁',
          message: `Successfully saved ${successCount}/${files.length} files to your chosen location.`,
          type: 'info'
        });
      } else {
        // For iOS, save to Documents
        let successCount = 0;
        for (const file of files) {
          try {
            const documentsUri = FileSystem.documentDirectory + file.filename;
            await FileSystem.copyAsync({
              from: file.uri,
              to: documentsUri
            });
            successCount++;
          } catch (error) {
            console.error(`❌ Failed to save ${file.filename}:`, error);
          }
        }

        showDialog({
          title: 'Downloads Complete! 📁',
          message: `Successfully saved ${successCount}/${files.length} files to Documents folder.`,
          type: 'info'
        });
      }
    } catch (error) {
      console.error('Error downloading multiple files:', error);
      showDialog({
        title: 'Download Error',
        message: 'Failed to save files to your device.',
        type: 'error'
      });
    }
  };

  // Share all files sequentially
  const shareAllFiles = async (files) => {
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`📤 Sharing file ${i + 1}/${files.length}: ${file.filename}`);
        
        await shareCSVFile(file.uri, file.filename);
        
        if (i < files.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    } catch (error) {
      console.error('Error sharing multiple files:', error);
    }
  };

  // Web download function
  const downloadCSVWeb = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Save files and show action dialog
  const saveAndShowActionDialog = async (csvFiles) => {
    const savedFiles = [];
    
    try {
      // Save all files to temporary location first
      for (const tableName of Object.keys(csvFiles)) {
        const csvFile = csvFiles[tableName];
        const fileUri = FileSystem.documentDirectory + csvFile.filename;
        
        await FileSystem.writeAsStringAsync(fileUri, csvFile.content, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        
        savedFiles.push({
          name: tableName,
          uri: fileUri,
          filename: csvFile.filename,
          content: csvFile.content
        });
        
        console.log(`💾 Saved CSV file: ${csvFile.filename}`);
      }
      
      setExportedFiles(savedFiles);
      
      // Show action dialog based on number of files
      if (savedFiles.length === 1) {
        showFileActionDialog(savedFiles[0]);
      } else {
        showMultipleFilesActionDialog(savedFiles);
      }
      
    } catch (error) {
      console.error('Error saving CSV files:', error);
      showDialog({
        title: 'Error',
        message: 'Failed to save CSV files to device',
        type: 'error'
      });
    }
  };

  // Main export function
  const handleExport = async () => {
    if (!user?.sub) {
      showDialog({
        title: 'Error',
        message: 'User not authenticated',
        type: 'error'
      });
      return;
    }

    const selectedTableNames = Object.keys(selectedTables).filter(
      tableName => selectedTables[tableName]
    );

    if (selectedTableNames.length === 0) {
      showDialog({
        title: 'No Tables Selected',
        message: 'Please select at least one table to export.',
        type: 'error'
      });
      return;
    }

    showDialog({
      title: 'Export Tables',
      message: `Export ${selectedTableNames.length} table(s) as CSV files?`,
      type: 'confirm',
      confirmText: 'Export CSV',
      cancelText: 'Cancel',
      onConfirm: async () => {
        setDialogVisible(false);
        await performExport(selectedTableNames);
      },
      onCancel: () => setDialogVisible(false)
    });
  };

  const performExport = async (selectedTableNames) => {
    try {
      setIsExporting(true);
      console.log(`🚀 Starting CSV export for user ${user.sub}`);
      
      const result = await exportMultipleTables(user.sub, selectedTableNames);
      
      if (result.success) {
        const csvFiles = convertExportDataToCSV(result.data);
        
        if (Object.keys(csvFiles).length > 0) {
          if (Platform.OS === 'web') {
            // Web: Download files directly
            const tableNames = Object.keys(csvFiles);
            for (let i = 0; i < tableNames.length; i++) {
              const tableName = tableNames[i];
              const csvFile = csvFiles[tableName];
              
              if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, 500));
              }
              
              downloadCSVWeb(csvFile.content, csvFile.filename);
            }
            
            showDialog({
              title: 'Export Successful! 🎉',
              message: `Downloaded ${selectedTableNames.length} CSV files with ${result.data.export_metadata.total_records} total records.`,
              type: 'info'
            });
          } else {
            // Mobile: Save and show action dialog
            await saveAndShowActionDialog(csvFiles);
          }
        } else {
          showDialog({
            title: 'Export Error',
            message: 'No data was converted to CSV format',
            type: 'error'
          });
        }
      } else {
        showDialog({
          title: 'Export Failed',
          message: result.message || 'Failed to export tables',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Export error:', error);
      showDialog({
        title: 'Export Error',
        message: 'An error occurred during export',
        type: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Show loading states
  if (authLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          {authLoading ? 'Authenticating...' : 'Loading tables...'}
        </Text>
      </View>
    );
  }

  if (!user?.sub) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Please login to access export functionality</Text>
      </View>
    );
  }

  if (supabaseData?.role !== 'admin') {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Admin privileges required for export functionality</Text>
      </View>
    );
  }

  const selectedCount = Object.values(selectedTables).filter(Boolean).length;
  const allSelected = selectedCount === availableTables.length;

  return (
    <>
      <ScrollView style={styles.container}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              📤 Export Database Tables
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Select tables to export as CSV files. {Platform.OS === 'web' ? 'Files will download automatically.' : 'Choose to download locally or share after export.'}
            </Text>
            <Text variant="bodySmall" style={styles.userInfo}>
              Logged in as: {supabaseData?.email} (Admin)
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.selectionCard}>
          <Card.Content>
            <View style={styles.selectionHeader}>
              <Text variant="titleMedium" style={styles.selectionTitle}>
                Available Tables ({availableTables.length})
              </Text>
              <Button 
                mode="outlined" 
                onPress={handleSelectAll}
                style={styles.selectAllButton}
              >
                {allSelected ? 'Deselect All' : 'Select All'}
              </Button>
            </View>
            
            <Text variant="bodySmall" style={styles.selectedCount}>
              Selected: {selectedCount} table(s)
            </Text>
          </Card.Content>
        </Card>

        <Surface style={styles.tableList}>
          {availableTables.map((table, index) => (
            <View key={table.name}>
              <View style={styles.tableItem}>
                <View style={styles.tableInfo}>
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={selectedTables[table.name] ? 'checked' : 'unchecked'}
                      onPress={() => handleTableToggle(table.name)}
                    />
                    <View style={styles.tableDetails}>
                      <Text variant="titleSmall" style={styles.tableName}>
                        {table.name}
                      </Text>
                      <Text variant="bodySmall" style={styles.tableDescription}>
                        {table.description}
                      </Text>
                      {table.record_count !== undefined && (
                        <Text variant="bodySmall" style={styles.recordCount}>
                          Records: {table.record_count.toLocaleString()}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              {index < availableTables.length - 1 && <Divider />}
            </View>
          ))}
        </Surface>

        <Card style={styles.exportCard}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleExport}
              disabled={selectedCount === 0 || isExporting}
              loading={isExporting}
              icon="download"
              style={styles.exportButton}
            >
              {isExporting ? 'Exporting...' : `Export ${selectedCount} Table(s) as CSV`}
            </Button>
            
            {selectedCount > 0 && (
              <Text variant="bodySmall" style={styles.exportNote}>
                {Platform.OS === 'web' 
                  ? `${selectedCount} CSV file(s) will be downloaded to your computer.`
                  : `${selectedCount} CSV file(s) - choose to download or share after export.`
                }
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Show exported files on mobile for re-accessing */}
        {Platform.OS !== 'web' && exportedFiles.length > 0 && (
          <Card style={styles.exportedFilesCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.exportedFilesTitle}>
                📁 Previously Exported Files ({exportedFiles.length})
              </Text>
              <Text variant="bodySmall" style={styles.exportedFilesSubtitle}>
                Tap to download or share individual files:
              </Text>
              
              <View style={styles.chipContainer}>
                {exportedFiles.map((file, index) => (
                  <Chip
                    key={index}
                    icon="file-download"
                    mode="outlined"
                    onPress={() => showFileActionDialog(file)}
                    style={styles.fileChip}
                  >
                    {file.name}.csv
                  </Chip>
                ))}
              </View>
              
              {exportedFiles.length > 1 && (
                <View style={styles.bulkActionsContainer}>
                  <Button
                    mode="outlined"
                    onPress={() => downloadAllFiles(exportedFiles)}
                    style={styles.bulkActionButton}
                    icon="download"
                  >
                    Download All
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => shareAllFiles(exportedFiles)}
                    style={styles.bulkActionButton}
                    icon="share-variant"
                  >
                    Share All
                  </Button>
                </View>
              )}
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{dialogConfig.title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{dialogConfig.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {(dialogConfig.type === 'confirm' || dialogConfig.type === 'custom') && (
              <Button onPress={dialogConfig.onCancel}>
                {dialogConfig.cancelText}
              </Button>
            )}
            <Button onPress={dialogConfig.onConfirm}>
              {dialogConfig.confirmText}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

// Add the missing styles for new components
const createStyles = (isDark) => {
  const colors = {
    light: {
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
      error: '#d32f2f',
    },
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
      textSecondary: '#cccccc',
      border: '#333333',
      error: '#f44336',
    }
  };
  
  const theme = isDark ? colors.dark : colors.light;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    loadingText: {
      marginTop: 16,
      color: theme.text,
    },
    errorText: {
      marginTop: 16,
      color: theme.error,
      textAlign: 'center',
      fontSize: 16,
    },
    headerCard: {
      margin: 16,
      backgroundColor: theme.surface,
    },
    title: {
      color: theme.text,
      fontWeight: 'bold',
    },
    subtitle: {
      marginTop: 8,
      color: theme.textSecondary,
    },
    userInfo: {
      marginTop: 8,
      color: theme.textSecondary,
      fontStyle: 'italic',
    },
    selectionCard: {
      marginHorizontal: 16,
      marginBottom: 16,
      backgroundColor: theme.surface,
    },
    selectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectionTitle: {
      color: theme.text,
    },
    selectAllButton: {
      borderColor: theme.border,
    },
    selectedCount: {
      marginTop: 8,
      color: theme.textSecondary,
    },
    tableList: {
      marginHorizontal: 16,
      marginBottom: 16,
      backgroundColor: theme.surface,
      borderRadius: 8,
    },
    tableItem: {
      padding: 16,
    },
    tableInfo: {
      flex: 1,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    tableDetails: {
      flex: 1,
      marginLeft: 12,
    },
    tableName: {
      color: theme.text,
      fontWeight: '600',
    },
    tableDescription: {
      color: theme.textSecondary,
      marginTop: 4,
    },
    recordCount: {
      color: theme.textSecondary,
      marginTop: 2,
      fontStyle: 'italic',
    },
    exportCard: {
      margin: 16,
      backgroundColor: theme.surface,
    },
    exportButton: {
      marginVertical: 8,
    },
    exportNote: {
      textAlign: 'center',
      color: theme.textSecondary,
      marginTop: 8,
    },
    exportedFilesCard: {
      margin: 16,
      backgroundColor: theme.surface,
    },
    exportedFilesTitle: {
      color: theme.text,
      marginBottom: 4,
    },
    exportedFilesSubtitle: {
      color: theme.textSecondary,
      marginBottom: 12,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
    },
    fileChip: {
      marginRight: 4,
      marginBottom: 4,
    },
    bulkActionsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    bulkActionButton: {
      flex: 1,
    },
  });
};
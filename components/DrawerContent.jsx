import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Button, Divider, List, Text } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { useCertificate } from '@/contexts/CertificateContext';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { 
  getPreAssessmentStatus, 
  resetAndPopulateDatabase, 
  getDatabaseStatus 
} from '@/services/supabase';

export function DrawerContent(props) {
  const { user, supabaseData, signOut, loading } = useAuth();
  const { certificateEligible, loading: loadingCertificateStatus, checkCertificateEligibility, initialized } = useCertificate();
  const router = useRouter();
  const [preAssessmentStatus, setPreAssessmentStatus] = useState(null);
  const [isResettingDatabase, setIsResettingDatabase] = useState(false);
  
  // Theme detection
  const { isDark } = useTheme();
  
  // Dynamic styles based on theme
  const styles = createStyles(isDark);

  // ... existing handler functions (handleSignOut, navigateTo, etc.) ...

  const handleSignOut = async () => {
    try {
      Alert.alert(
        "Sign Out",
        "Are you sure you want to sign out?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Sign Out", 
            style: "destructive",
            onPress: async () => {
              await signOut();
              router.replace('/logout');
              props.navigation.closeDrawer();
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  const navigateTo = (route, title) => {
    router.push(route);
    props.navigation.closeDrawer();
  };
  
  const handleLessonAccess = (topic, route, title) => {
    if (!preAssessmentStatus || !preAssessmentStatus[topic]) {
      Alert.alert(
        'Pre-Assessment Required',
        `Complete the ${title} pre-assessment first to unlock the lesson content.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Take Pre-Assessment', 
            onPress: () => {
              const timestamp = Date.now();
              router.push(`/quizPlay?quizId=${getQuizIdForTopic(topic)}&type=pre-lesson&topic=${topic}&fresh=true&t=${timestamp}`);
              props.navigation.closeDrawer();
            }
          }
        ]
      );
    } else {
      navigateTo(route, title);
    }
  };

  const handleCertificateDownload = () => {
    if (certificateEligible) {
      navigateTo('/certificate', 'Certificate');
    } else {
      Alert.alert(
        'Certificate Not Available',
        'Complete both pre-assessment and post-assessment for all three topics (Malayan Tiger, Malayan Tapir, and Green Sea Turtle) to unlock your certificate.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };
  
  const getQuizIdForTopic = (topic) => {
    const quizIds = {
      tiger: 'a781f992-0c9e-4928-a438-c574e65f165a',
      tapir: '1f021dc7-3103-4768-97ac-1d9b654b07d1',
      turtle: '49da865c-5cb7-4f24-9489-711f634d09a7'
    };
    return quizIds[topic];
  };

  // ... existing alert functions (showAlert, showConfirm, showInfo, handleDatabaseReset, performDatabaseReset) ...

  // Cross-platform alert function
  const showAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`${title}\n\n${message}`);
      if (confirmed && buttons) {
        const confirmButton = buttons.find(btn => btn.style !== 'cancel');
        if (confirmButton && confirmButton.onPress) {
          confirmButton.onPress();
        }
      }
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  const showConfirm = (title, message) => {
    return new Promise((resolve) => {
      if (Platform.OS === 'web') {
        const result = window.confirm(`${title}\n\n${message}`);
        resolve(result);
      } else {
        Alert.alert(
          title,
          message,
          [
            { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
            { text: "Confirm", style: "destructive", onPress: () => resolve(true) }
          ]
        );
      }
    });
  };

  const showInfo = (title, message, callback) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
      if (callback) callback();
    } else {
      Alert.alert(title, message, [{ text: "OK", onPress: callback }]);
    }
  };

  const handleDatabaseReset = async () => {
    try {
      const firstConfirm = await showConfirm(
        "⚠️ Database Reset",
        "This will PERMANENTLY delete all existing data and recreate the database with fresh quiz content. This action cannot be undone.\n\nAre you sure you want to proceed?"
      );
      
      if (!firstConfirm) return;

      const secondConfirm = await showConfirm(
        "⚠️ Final Confirmation",
        "Last chance! This will delete ALL user data, quiz results, and content.\n\nThis action is irreversible. Continue?"
      );
      
      if (!secondConfirm) return;

      await performDatabaseReset();
    } catch (error) {
      console.error('Error in handleDatabaseReset:', error);
      showInfo("❌ Error", "An error occurred while handling the database reset request.");
    }
  };

  const performDatabaseReset = async () => {
    if (isResettingDatabase) return;

    setIsResettingDatabase(true);
    
    try {
      console.log('🚀 Starting database reset process...');
      
      const statusBefore = await getDatabaseStatus();
      console.log('📊 Database status before reset:', statusBefore);

      showInfo(
        "🔄 Database Reset in Progress",
        "Resetting database and populating with quiz data. Please wait..."
      );

      const result = await resetAndPopulateDatabase(user.sub);
      
      if (result.success) {
        showInfo(
          "✅ Database Reset Complete",
          `Successfully reset and populated database!\n\n` +
          `📚 Categories: ${result.data.categoriesCreated}\n` +
          `📝 Quizzes: ${result.data.quizzesCreated}\n` +
          `❓ Questions: ${result.data.questionsCreated}\n\n` +
          `The app will now refresh to load the new data.`,
          () => {
            router.replace('/');
            props.navigation.closeDrawer();
          }
        );
      } else {
        showInfo(
          "❌ Database Reset Failed",
          result.message || "An error occurred while resetting the database. Please check the console for details."
        );
      }
    } catch (error) {
      console.error('💥 Database reset error:', error);
      showInfo(
        "❌ Database Reset Error",
        `Failed to reset database: ${error.message}\n\nPlease check the console for more details.`
      );
    } finally {
      setIsResettingDatabase(false);
    }
  };

  // Get user display data
  const userData = supabaseData || user;
  const userDisplayName = userData?.name || userData?.email || 'User';
  const userEmail = userData?.email || user?.email;
  const userPicture = userData?.picture || user?.picture;
  const isAdmin = userData?.role === 'admin';
  
  // Load pre-assessment status and INITIAL certificate check ONLY
  useEffect(() => {
    const loadUserStatus = async () => {
      if (user?.sub) {
        try {
          // Load pre-assessment status
          const status = await getPreAssessmentStatus(user.sub);
          setPreAssessmentStatus(status || { tiger: false, tapir: false, turtle: false });

          // Check certificate eligibility ONLY if not already initialized
          if (!initialized) {
            console.log('🎓 Initial certificate eligibility check');
            await checkCertificateEligibility(user.sub);
          }
          
        } catch (error) {
          console.error('Error loading user status:', error);
          setPreAssessmentStatus({ tiger: false, tapir: false, turtle: false });
        }
      }
    };
    
    loadUserStatus();
  }, [user?.sub, supabaseData, initialized, checkCertificateEligibility]);

  // Define dynamic colors based on theme
  const iconColor = isDark ? '#ffffff' : '#000000';

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={styles.container}
      style={styles.drawerScrollView}
    >
      {/* Profile Section */}
      <View style={styles.profileSection}>
        {userPicture ? (
          <Avatar.Image size={80} source={{ uri: userPicture }} />
        ) : (
          <Avatar.Text 
            size={80} 
            label={userDisplayName.charAt(0).toUpperCase()} 
            backgroundColor="#2E86DE"
          />
        )}
        
        <Text variant="titleMedium" style={styles.userName}>
          {userDisplayName}
        </Text>
        
        {userEmail && userEmail !== userDisplayName && (
          <Text variant="bodySmall" style={styles.userEmail}>
            {userEmail}
          </Text>
        )}
        
        {isAdmin && (
          <View style={styles.adminBadge}>
            <Text variant="labelSmall" style={styles.adminBadgeText}>
              ADMIN
            </Text>
          </View>
        )}
      </View>
      
      <Divider style={styles.divider} />
      
      {/* Navigation Items */}
      <ScrollView style={styles.navSection}>
        <List.Section style={styles.listSection}>
          <List.Item
            title="About"
            description="App information"
            left={props => <List.Icon {...props} icon="information" color={iconColor} />}
            onPress={() => navigateTo('/acknowledgement', 'About')}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
            style={styles.listItem}
          />
          <List.Item
            title="Home"
            description="Dashboard and overview"
            left={props => <List.Icon {...props} icon="home" color={iconColor} />}
            onPress={() => navigateTo('/', 'Home')}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
            style={styles.listItem}
          />
          
          {user && (
            <>
              <Divider style={styles.sectionDivider} />
              
              <List.Item
                title="My Profile"
                description="View and edit profile"
                left={props => <List.Icon {...props} icon="account" color={iconColor} />}
                onPress={() => navigateTo('/profile', 'Profile')}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                style={styles.listItem}
              />

              {/* 🎓 Certificate Download Section - Shows when eligible */}
              {certificateEligible && (
                <>
                  <Divider style={styles.sectionDivider} />
                  <List.Item
                    title="🎓 Download Certificate"
                    description="Get your completion certificate"
                    left={props => <List.Icon {...props} icon="certificate" color="#4CAF50" />}
                    onPress={handleCertificateDownload}
                    titleStyle={[styles.listItemTitle, styles.certificateItemTitle]}
                    descriptionStyle={[styles.listItemDescription, styles.certificateItemDescription]}
                    style={[styles.listItem, styles.certificateItem]}
                  />
                </>
              )}
              
              <Divider style={styles.sectionDivider} />
              <List.Subheader style={styles.subheader}>
                🦎 Learning Topics
              </List.Subheader>
              
              {/* Tiger Lesson */}
              <List.Item
                title={`🐅 Malayan Tiger ${preAssessmentStatus?.tiger ? '' : '🔒'}`}
                description={preAssessmentStatus?.tiger ? 'Access lesson content' : 'Complete pre-assessment to unlock'}
                left={props => <List.Icon {...props} icon={preAssessmentStatus?.tiger ? 'book-open' : 'lock'} color={preAssessmentStatus?.tiger ? iconColor : '#999999'} />}
                onPress={() => handleLessonAccess('tiger', '/tigerLesson', 'Malayan Tiger')}
                titleStyle={[styles.listItemTitle, !preAssessmentStatus?.tiger && styles.lockedItemTitle]}
                descriptionStyle={[styles.listItemDescription, !preAssessmentStatus?.tiger && styles.lockedItemDescription]}
                style={styles.listItem}
              />
              
              {/* Tapir Lesson */}
              <List.Item
                title={`🦏 Malayan Tapir ${preAssessmentStatus?.tapir ? '' : '🔒'}`}
                description={preAssessmentStatus?.tapir ? 'Access lesson content' : 'Complete pre-assessment to unlock'}
                left={props => <List.Icon {...props} icon={preAssessmentStatus?.tapir ? 'book-open' : 'lock'} color={preAssessmentStatus?.tapir ? iconColor : '#999999'} />}
                onPress={() => handleLessonAccess('tapir', '/tapirLesson', 'Malayan Tapir')}
                titleStyle={[styles.listItemTitle, !preAssessmentStatus?.tapir && styles.lockedItemTitle]}
                descriptionStyle={[styles.listItemDescription, !preAssessmentStatus?.tapir && styles.lockedItemDescription]}
                style={styles.listItem}
              />
              
              {/* Turtle Lesson */}
              <List.Item
                title={`🐢 Green Sea Turtle ${preAssessmentStatus?.turtle ? '' : '🔒'}`}
                description={preAssessmentStatus?.turtle ? 'Access lesson content' : 'Complete pre-assessment to unlock'}
                left={props => <List.Icon {...props} icon={preAssessmentStatus?.turtle ? 'book-open' : 'lock'} color={preAssessmentStatus?.turtle ? iconColor : '#999999'} />}
                onPress={() => handleLessonAccess('turtle', '/turtleLesson', 'Green Sea Turtle')}
                titleStyle={[styles.listItemTitle, !preAssessmentStatus?.turtle && styles.lockedItemTitle]}
                descriptionStyle={[styles.listItemDescription, !preAssessmentStatus?.turtle && styles.lockedItemDescription]}
                style={styles.listItem}
              />
              
              {/* Admin section remains the same... */}
              {isAdmin && (
                <>
                  <Divider style={styles.sectionDivider} />
                  <List.Subheader style={styles.subheader}>
                    👨‍💼 Admin Tools
                  </List.Subheader>
                  
                  <List.Item
                    title="Create Quiz"
                    description="Add new quiz content"
                    left={props => <List.Icon {...props} icon="plus-circle" color={iconColor} />}
                    onPress={() => navigateTo('/createQuiz', 'Create Quiz')}
                    titleStyle={styles.listItemTitle}
                    descriptionStyle={styles.listItemDescription}
                    style={styles.listItem}
                  />
                  
                  <List.Item
                    title="Manage Content"
                    description="Edit existing quizzes"
                    left={props => <List.Icon {...props} icon="pencil" color={iconColor} />}
                    onPress={() => navigateTo('/admin/manage', 'Manage Content')}
                    titleStyle={styles.listItemTitle}
                    descriptionStyle={styles.listItemDescription}
                    style={styles.listItem}
                  />
                  
                  <List.Item
                    title="User Analytics"
                    description="View user progress"
                    left={props => <List.Icon {...props} icon="chart-line" color={iconColor} />}
                    onPress={() => navigateTo('/admin/analytics', 'Analytics')}
                    titleStyle={styles.listItemTitle}
                    descriptionStyle={styles.listItemDescription}
                    style={styles.listItem}
                  />
                  
                  <List.Item
                    title={isResettingDatabase ? "Resetting Database..." : "🔄 Reset Database"}
                    description={isResettingDatabase ? "Please wait..." : "Reset & populate with quiz data"}
                    left={props => <List.Icon {...props} icon={isResettingDatabase ? "loading" : "database-refresh"} color={isResettingDatabase ? '#FFA500' : '#E74C3C'} />}
                    onPress={isResettingDatabase ? null : handleDatabaseReset}
                    titleStyle={[styles.listItemTitle, isResettingDatabase && styles.disabledItemTitle]}
                    descriptionStyle={[styles.listItemDescription, isResettingDatabase && styles.disabledItemDescription]}
                    style={[styles.listItem, isResettingDatabase && styles.disabledListItem]}
                    disabled={isResettingDatabase}
                  />
                </>
              )}
            </>
          )}
          
          <Divider style={styles.sectionDivider} />
          
          <List.Item
            title="Help & Support"
            description="Get assistance"
            left={props => <List.Icon {...props} icon="help-circle" color={iconColor} />}
            onPress={() => navigateTo('/help', 'Help')}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
            style={styles.listItem}
          />
        </List.Section>
      </ScrollView>
      
      {/* Sign Out Section */}
      {user && (
        <View style={styles.logoutSection}>
          {loading ? (
            <Button 
              mode="outlined" 
              disabled
              loading
              textColor={isDark ? '#ffffff' : '#000000'}
              style={styles.loadingButton}
            >
              Signing out...
            </Button>
          ) : (
            <Button 
              mode="contained" 
              buttonColor="#E74C3C"
              textColor="white"
              icon="logout" 
              onPress={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </View>
      )}
      
      {/* App Version */}
      <View style={styles.versionSection}>
        <Text variant="bodySmall" style={styles.versionText}>
          ZoologIQ v1.0.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

// ... existing styles remain the same ...
const createStyles = (isDark) => {
  const colors = {
    light: {
      background: '#ffffff',
      text: '#000000',
      textSecondary: '#666666',
      divider: '#e0e0e0',
      border: '#cccccc',
    },
    dark: {
      background: '#2a2a2a',
      text: '#ffffff',
      textSecondary: '#cccccc',
      divider: '#555555',
      border: '#444444',
    }
  };
  
  const theme = isDark ? colors.dark : colors.light;
  
  return StyleSheet.create({
    drawerScrollView: {
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    profileSection: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    userName: {
      marginTop: 10,
      fontWeight: '500',
      textAlign: 'center',
      color: theme.text,
    },
    userEmail: {
      marginTop: 4,
      opacity: 0.7,
      textAlign: 'center',
      color: theme.textSecondary,
    },
    adminBadge: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginTop: 8,
    },
    adminBadgeText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 10,
    },
    divider: {
      backgroundColor: theme.divider,
    },
    navSection: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    listSection: {
      backgroundColor: theme.background,
    },
    listItem: {
      backgroundColor: theme.background,
    },
    listItemTitle: {
      color: theme.text,
    },
    listItemDescription: {
      color: theme.textSecondary,
    },
    subheader: {
      color: theme.textSecondary,
      backgroundColor: theme.background,
      fontSize: 14,
      fontWeight: '600',
    },
    sectionDivider: {
      marginVertical: 8,
      backgroundColor: theme.divider,
    },
    logoutSection: {
      padding: 20,
      paddingTop: 10,
      backgroundColor: theme.background,
    },
    loadingButton: {
      borderColor: theme.text,
    },
    versionSection: {
      padding: 20,
      paddingTop: 0,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    versionText: {
      opacity: 0.5,
      color: theme.textSecondary,
    },
    lockedItemTitle: {
      opacity: 0.6,
      color: '#999999',
    },
    lockedItemDescription: {
      opacity: 0.5,
      color: '#999999',
    },
    disabledListItem: {
      opacity: 0.6,
    },
    disabledItemTitle: {
      opacity: 0.6,
      color: '#999999',
    },
    disabledItemDescription: {
      opacity: 0.5,
      color: '#999999',
    },
    certificateItem: {
      backgroundColor: isDark ? '#1a3d1a' : '#f0f8f0',
      borderLeftWidth: 4,
      borderLeftColor: '#4CAF50',
    },
    certificateItemTitle: {
      color: '#4CAF50',
      fontWeight: '600',
    },
    certificateItemDescription: {
      color: '#4CAF50',
      opacity: 0.8,
    },
  });
};
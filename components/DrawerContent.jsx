import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Button, Divider, List, Text } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { getPreAssessmentStatus } from '@/services/supabase';

export function DrawerContent(props) {
  const { user, supabaseData, signOut, loading } = useAuth();
  const router = useRouter();
  const [preAssessmentStatus, setPreAssessmentStatus] = useState(null);
  
  // Theme detection
  const { isDark } = useTheme();
  
  // Dynamic styles based on theme
  const styles = createStyles(isDark);

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
              router.push(`/quizPlay?quizId=${getQuizIdForTopic(topic)}&type=pre-lesson&topic=${topic}`);
              props.navigation.closeDrawer();
            }
          }
        ]
      );
    } else {
      navigateTo(route, title);
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

  // Get user display data (prioritize supabaseData, fallback to Auth0 user)
  const userData = supabaseData || user;
  const userDisplayName = userData?.name || userData?.email || 'User';
  const userEmail = userData?.email || user?.email;
  const userPicture = userData?.picture || user?.picture;
  const isAdmin = userData?.role === 'admin';
  
  // Load pre-assessment status
  useEffect(() => {
    const loadPreAssessmentStatus = async () => {
      if (user?.sub) {
        try {
          const status = await getPreAssessmentStatus(user.sub);
          setPreAssessmentStatus(status || { tiger: false, tapir: false, turtle: false });
        } catch (error) {
          console.error('Error loading pre-assessment status:', error);
          setPreAssessmentStatus({ tiger: false, tapir: false, turtle: false });
        }
      }
    };
    
    loadPreAssessmentStatus();
  }, [user?.sub, supabaseData]);

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

// Dynamic style creation function
const createStyles = (isDark) => {
  // Define color schemes
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
  });
};
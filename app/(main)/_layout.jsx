import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, Image, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor'; // Import useThemeColor
import { Colors } from '@/constants/Colors'; // Import Colors
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '@/components/DrawerContent';
import { useRouter } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create combined themes using YOUR custom colors
const CombinedLightTheme = {
  ...NavigationDefaultTheme,
  ...MD3LightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    background: Colors.light.background, // Use your custom light background
    text: Colors.light.text,
    card: Colors.light.surface,
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...MD3DarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...MD3DarkTheme.colors,
    background: Colors.dark.background, // Use your custom dark background
    text: Colors.dark.text,
    card: Colors.dark.surface,
    surface: Colors.dark.surface,
    surfaceVariant: Colors.dark.surfaceSecondary,
  },
};

// Custom Header Right Component
function HeaderRight() {
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false); // Add loading state
  
  // Use theme colors instead of hardcoded values
  const modalBackgroundColor = useThemeColor({}, 'surface');
  const modalTextColor = useThemeColor({}, 'text');
  const modalBorderColor = useThemeColor({}, 'border');
  const headerTextColor = useThemeColor({}, 'text');
  const avatarBorderColor = useThemeColor({}, 'borderSecondary');
  
  const handleSignIn = async () => {
    setIsSigningIn(true); // Start loading
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
      // Handle error if needed
    } finally {
      setIsSigningIn(false); // Stop loading
    }
  };
  
  const handleSignOut = async () => {
    setShowDropdown(false);
    await signOut();
    router.replace('/logout');
  };
  
  const handleProfileClick = () => {
    setShowDropdown(false);
    router.push('/profile');
  };
  
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };
  
  if (user) {
    return (
      <>
        <Pressable 
          onPress={toggleDropdown}
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 10
          }}
        >
          {/* User avatar and name */}
          {user.picture ? (
            <Image source={{ uri: user.picture }} 
              style={{
                width: 32, height: 32, borderRadius: 16,
                borderWidth: 1, borderColor: avatarBorderColor
              }}
            />
          ) : (
            <View style={{
              width: 32, height: 32, borderRadius: 16,
              backgroundColor: '#2E86DE',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {(user.name?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={{ 
            color: headerTextColor,
            marginLeft: 10,
            fontWeight: '500'
          }}>
            {user.name?.split(' ')[0] || 'User'}
          </Text>
        </Pressable>
        
        <Modal
          transparent={true}
          visible={showDropdown}
          onRequestClose={() => setShowDropdown(false)}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
            <View style={{ flex: 1 }}>
              <View style={{
                position: 'absolute',
                right: 10,
                top: 50,
                backgroundColor: modalBackgroundColor,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                minWidth: 150,
              }}>
                <Pressable 
                  onPress={handleProfileClick}
                  style={{ 
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: modalBorderColor
                  }}
                >
                  <Text style={{ color: modalTextColor }}>View Profile</Text>
                </Pressable>
                <Pressable 
                  onPress={handleSignOut}
                  style={{ 
                    paddingVertical: 12,
                    paddingHorizontal: 16
                  }}
                >
                  <Text style={{ color: '#E74C3C' }}>Sign Out</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
  
  return (
    <Pressable 
      onPress={handleSignIn}
      disabled={isSigningIn} // Disable button while loading
      style={{ 
        backgroundColor: isSigningIn ? '#B0B0B0' : '#2E86DE', // Change color when loading
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: isSigningIn ? 0.7 : 1, // Reduce opacity when loading
      }}
    >
      {isSigningIn ? (
        // Show loading indicator
        <>
          <ActivityIndicator size="small" color="white" style={{ marginRight: 6 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Signing In...
          </Text>
        </>
      ) : (
        // Show normal sign in text
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Sign In
        </Text>
      )}
    </Pressable>
  );
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;
  
  // Use theme colors for header
  const headerBackgroundColor = useThemeColor({}, 'background');
  const headerTextColor = useThemeColor({}, 'text');
  
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={({ navigation, route }) => ({
            headerStyle: {
              backgroundColor: headerBackgroundColor, // Use theme color
            },
            headerTintColor: headerTextColor, // Use theme color
            headerRight: () => <HeaderRight />,
          })}
        >
          <Drawer.Screen 
            name="index" 
            options={{ 
              headerTitle: "Home",
              drawerLabel: "Home"
            }} 
          />
          <Drawer.Screen 
            name="profile" 
            options={{ 
              title: "Profile",
              drawerLabel: "Profile"
            }} 
          />
          <Drawer.Screen 
            name="createQuiz" 
            options={{ 
              title: "Create Quiz",
              drawerLabel: "Create Quiz"
            }} 
          />
          <Drawer.Screen 
            name="+not-found" 
            options={{ 
              title: "Not Found",
              drawerItemStyle: { display: 'none' }
            }} 
          />
          <Drawer.Screen 
            name="startLearning" 
            options={{ 
              title: "Start Learning",
              drawerItemStyle: { display: 'none' }
            }} 
          />
          <Drawer.Screen 
            name="learningResults" 
            options={{ 
              title: "Learning Results",
              drawerItemStyle: { display: 'none' }
            }} 
          />
          <Drawer.Screen 
            name="quizPlay" 
            options={{ 
              title: "Play Quiz",
              drawerItemStyle: { display: 'none' },
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="editProfile" 
            options={{ 
              title: "Edit Profile",
              drawerItemStyle: { display: 'none' } 
            }} 
          />
          <Drawer.Screen 
            name="tigerLesson" 
            options={{ 
              title: "Tiger",
              drawerItemStyle: { display: 'none' } 
            }} 
          />
          <Drawer.Screen 
            name="tapirLesson" 
            options={{ 
              title: "Tapir",
              drawerItemStyle: { display: 'none' } 
            }} 
          />
          <Drawer.Screen 
            name="turtleLesson" 
            options={{ 
              title: "Turtle",
              drawerItemStyle: { display: 'none' } 
            }} 
          />
          <Drawer.Screen 
            name="acknowledgement" 
            options={{ 
              title: "Acknowledgement",
              drawerItemStyle: { display: 'none' } 
            }} 
          />
          <Drawer.Screen 
            name="onboardingInstructions" 
            options={{ 
              title: "Getting Started",
              drawerItemStyle: { display: 'none' },
              headerShown: false  // Hide header for onboarding
            }} 
          />
        </Drawer>
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>
  );
}
import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors'; // Import your Colors

// Prevent splash screen from auto-hiding until assets are ready
SplashScreen.preventAutoHideAsync();

// Create combined Light and Dark themes using YOUR custom colors
const CombinedLightTheme = {
  ...NavigationDefaultTheme,
  ...MD3LightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    background: Colors.light.background, // Use your custom light background
    text: Colors.light.text,
    surface: Colors.light.surface,
    card: Colors.light.card,
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
    surface: Colors.dark.surface,
    surfaceVariant: Colors.dark.surfaceSecondary,
    card: Colors.dark.card,
  },
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme(); // Use destructured version
  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Slot />
      </PaperProvider>
    </AuthProvider>
  );
}
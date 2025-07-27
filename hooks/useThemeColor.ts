import { Colors } from '@/constants/Colors';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import { useMemo } from 'react';

export type ThemeColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export interface UseThemeColorProps {
  light?: string;
  dark?: string;
}

export interface UseThemeColorReturn {
  color: string;
  colorScheme: ColorScheme;
  isDark: boolean;
  isLight: boolean;
  colors: typeof Colors.light | typeof Colors.dark;
}

/**
 * Enhanced theme color hook that provides color values based on current theme
 * with support for custom overrides and full theme context
 */
export function useThemeColor(
  props: UseThemeColorProps,
  colorName: ThemeColorName
): string {
  const { colorScheme } = useColorScheme();
  
  // Early return if props has the color for current scheme
  const colorFromProps = props[colorScheme];
  if (colorFromProps) {
    return colorFromProps;
  }

  // Validate Colors object exists
  if (!Colors) {
    console.error('Colors object is undefined in useThemeColor');
    return '#000000'; // Fallback color
  }

  // Validate colorScheme exists in Colors
  if (!Colors[colorScheme]) {
    console.error(`Color scheme "${colorScheme}" not found in Colors object`);
    return Colors.light?.text || '#000000'; // Fallback to light text or black
  }

  // Validate colorName exists in the color scheme
  if (!Colors[colorScheme][colorName]) {
    console.error(`Color "${colorName}" not found in Colors.${colorScheme}`);
    return Colors[colorScheme].text || Colors.light.text || '#000000'; // Fallback to text color
  }

  return Colors[colorScheme][colorName];
}

/**
 * Extended hook that provides full theme context and utilities
 */
export function useTheme(): UseThemeColorReturn & {
  getColor: (colorName: ThemeColorName, overrides?: UseThemeColorProps) => string;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
} {
  const { colorScheme, isDark, isLight, toggleColorScheme, setColorScheme } = useColorScheme();
  
  const colors = useMemo(() => {
    if (!Colors || !Colors[colorScheme]) {
      console.error('Colors object or color scheme not available, using fallback');
      return Colors?.light || {
        text: '#000000',
        background: '#ffffff',
        tint: '#0a7ea4',
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: '#0a7ea4',
      };
    }
    return Colors[colorScheme];
  }, [colorScheme]);
  
  const getColor = useMemo(() => 
    (colorName: ThemeColorName, overrides?: UseThemeColorProps): string => {
      const colorFromOverrides = overrides?.[colorScheme];
      if (colorFromOverrides) return colorFromOverrides;
      
      if (!Colors || !Colors[colorScheme] || !Colors[colorScheme][colorName]) {
        console.error(`Cannot get color "${colorName}" for scheme "${colorScheme}"`);
        return '#000000'; // Fallback
      }
      
      return Colors[colorScheme][colorName];
    }, 
    [colorScheme]
  );

  return {
    color: colors.text,
    colorScheme,
    isDark,
    isLight,
    colors,
    getColor,
    toggleTheme: toggleColorScheme,
    setTheme: setColorScheme,
  };
}

/**
 * Hook for getting multiple theme colors at once
 */
export function useThemeColors<T extends Record<string, ThemeColorName>>(
  colorMap: T
): Record<keyof T, string> {
  const { colorScheme } = useColorScheme();
  
  return useMemo(() => {
    const result = {} as Record<keyof T, string>;
    
    for (const [key, colorName] of Object.entries(colorMap)) {
      if (Colors && Colors[colorScheme] && Colors[colorScheme][colorName as ThemeColorName]) {
        result[key as keyof T] = Colors[colorScheme][colorName as ThemeColorName];
      } else {
        console.error(`Color "${colorName}" not found for scheme "${colorScheme}"`);
        result[key as keyof T] = '#000000'; // Fallback
      }
    }
    
    return result;
  }, [colorMap, colorScheme]);
}

/**
 * Hook for conditional styling based on theme
 */
export function useThemedStyles<T>(
  lightStyles: T,
  darkStyles: T
): T {
  const { isDark } = useColorScheme();
  return isDark ? darkStyles : lightStyles;
}

// Legacy export for backward compatibility
export { useThemeColor as default };
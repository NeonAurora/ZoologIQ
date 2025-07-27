/**
 * Enhanced color system with more comprehensive theme support
 * Supports both light and dark modes with semantic color names
 */
const tintColorLight = '#4CAF50';
const tintColorDark = '#367c39';

// Test different grays by changing this number (1-10):
const grayTestNumber = 4; // You liked level 4, but you can change this to test others

const getGrayShade = (level: number): string => {
  const shades = [
    '#000000', // 0 - Pure black
    '#0a0a0a', // 1 - Very dark
    '#151718', // 2 - Original (very close to black)
    '#1a1a1a', // 3 - Slightly lighter
    '#202020', // 4 - More noticeable (your preferred choice)
    '#2a2a2a', // 5 - Medium gray
    '#353535', // 6 - Lighter
    '#404040', // 7 - Light gray
    '#4a4a4a', // 8 - Even lighter
    '#555555', // 9 - Very light
    '#666666', // 10 - Lightest (might be too light)
  ];
  return shades[Math.min(level, shades.length - 1)];
};

// Brand colors (consistent across themes)
export const BrandColors = {
  primary: '#0a7ea4',
  primaryDark: '#087296',
  secondary: '#2E86DE',
  accent: '#ff6b6b',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
} as const;

// Semantic colors that change with theme
export const Colors = {
  light: {
    // Text colors
    text: '#11181C',
    textSecondary: '#687076',
    textMuted: '#9BA1A6',
    
    // Background colors
    background: '#fff',
    backgroundSecondary: '#f8f9fa',
    backgroundTertiary: '#e9ecef',
    
    // Surface colors
    surface: '#fff',
    surfaceSecondary: '#f5f5f5',
    card: '#fff',
    
    // Border colors
    border: '#e1e4e8',
    borderSecondary: '#d0d7de',
    
    // Interactive colors
    tint: tintColorLight,
    link: tintColorLight,
    
    // Navigation colors
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    
    // Status colors
    success: BrandColors.success,
    warning: BrandColors.warning,
    error: BrandColors.error,
    info: BrandColors.info,
    
    // Legacy compatibility
    icon: '#687076',
  },
  dark: {
    // Text colors
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textMuted: '#6E7681',
    
    // Background colors - using the gray shade system
    background: getGrayShade(grayTestNumber), // Main background - easily testable!
    backgroundSecondary: getGrayShade(grayTestNumber + 1), // Slightly lighter
    backgroundTertiary: getGrayShade(grayTestNumber + 2), // Even lighter
    
    // Surface colors - using related grays
    surface: getGrayShade(grayTestNumber + 1), // Slightly lighter than main background
    surfaceSecondary: getGrayShade(grayTestNumber), // Same as main background
    card: getGrayShade(grayTestNumber + 1), // Slightly lighter for cards
    
    // Border colors
    border: '#747474',
    borderSecondary: '#21262d',
    
    // Interactive colors
    tint: tintColorDark,
    link: '#58a6ff',
    
    // Navigation colors
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    
    // Status colors
    success: '#3fb950',
    warning: '#d29922',
    error: '#f85149',
    info: '#58a6ff',
    
    // Legacy compatibility
    icon: '#9BA1A6',
  },
} as const;

// Type definitions
export type ColorTheme = keyof typeof Colors;
export type ColorName = keyof typeof Colors.light;

// Default export for easier importing
export default Colors;
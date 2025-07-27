import { useEffect, useState, useCallback } from 'react';

export type ColorScheme = 'light' | 'dark';

interface UseColorSchemeReturn {
  colorScheme: ColorScheme;
  isDark: boolean;
  isLight: boolean;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

/**
 * Web-optimized color scheme hook that handles SSR/SSG and hydration properly
 */
export function useColorScheme(): UseColorSchemeReturn {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [webColorScheme, setWebColorScheme] = useState<ColorScheme>('light');
  const [manualOverride, setManualOverride] = useState<ColorScheme | null>(null);

  // Hydration effect - runs only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get stored preference
      const stored = localStorage.getItem('color-scheme') as ColorScheme | null;
      
      if (stored === 'light' || stored === 'dark') {
        setWebColorScheme(stored);
        setManualOverride(stored);
      } else {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setWebColorScheme(prefersDark ? 'dark' : 'light');
      }
      
      setHasHydrated(true);
    }
  }, []);

  // Listen for system changes after hydration
  useEffect(() => {
    if (!hasHydrated || typeof window === 'undefined' || manualOverride) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!manualOverride) {
        setWebColorScheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [hasHydrated, manualOverride]);

  // Apply color scheme to document
  useEffect(() => {
    if (hasHydrated && typeof window !== 'undefined') {
      // Update CSS classes
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(webColorScheme);
      
      // Update CSS custom properties
      document.documentElement.style.setProperty('--color-scheme', webColorScheme);
      
      // Update meta theme-color for mobile browsers
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute(
        'content', 
        webColorScheme === 'dark' ? '#151718' : '#ffffff'
      );
    }
  }, [webColorScheme, hasHydrated]);

  // Function to manually set color scheme
  const updateColorScheme = useCallback((scheme: ColorScheme) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('color-scheme', scheme);
    setWebColorScheme(scheme);
    setManualOverride(scheme);
    
    // Trigger a storage event to notify other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'color-scheme',
      newValue: scheme,
      url: window.location.href
    }));
  }, []);

  // Toggle function
  const toggleColorScheme = useCallback(() => {
    const newScheme: ColorScheme = webColorScheme === 'dark' ? 'light' : 'dark';
    updateColorScheme(newScheme);
  }, [webColorScheme, updateColorScheme]);

  // Calculate derived values
  const colorScheme = hasHydrated ? webColorScheme : 'light';
  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';

  return {
    colorScheme,
    isDark,
    isLight,
    toggleColorScheme,
    setColorScheme: updateColorScheme,
  };
}

// Helper function to set color scheme on web
export const setWebColorScheme = (scheme: ColorScheme): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('color-scheme', scheme);
  
  // Trigger a storage event to notify other tabs
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'color-scheme',
    newValue: scheme,
    url: window.location.href
  }));
};

// Helper to get initial color scheme for SSR
export const getInitialColorScheme = (): ColorScheme => {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('color-scheme');
  if (stored === 'light' || stored === 'dark') return stored;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
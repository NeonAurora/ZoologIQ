// hooks/useTheme.js
import { useColorScheme } from '@/hooks/useColorScheme';

export function useTheme() {
  const { colorScheme, isDark, isLight, toggleColorScheme, setColorScheme } = useColorScheme();
  
  return {
    colorScheme,
    isDark,
    isLight,
    toggleColorScheme,
    setColorScheme
  };
}
import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useTheme = () => {
  const { theme, systemTheme, setSystemTheme } = useStore((state) => ({
    theme: state.theme,
    systemTheme: state.systemTheme,
    setSystemTheme: state.setSystemTheme,
  }));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setSystemTheme]);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return { isDark, currentTheme };
};
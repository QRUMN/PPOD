import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Theme } from '../types/theme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useStore();

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  ];

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 p-2 
                    bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-lg 
                    shadow-lg border border-primary-100 dark:border-primary-900">
      {themes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded-md flex items-center gap-2 transition-all
            ${theme === value 
              ? 'bg-primary-500 text-white shadow-sm' 
              : 'text-accent-500 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-accent-700'
            }`}
          aria-label={`Switch to ${label} theme`}
        >
          {icon}
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
};
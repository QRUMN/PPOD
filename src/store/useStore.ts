import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AccessibilitySettings, ChatMessage } from '../types';
import type { Theme } from '../types/theme';

interface Store {
  user: User | null;
  messages: ChatMessage[];
  isEmergencyMode: boolean;
  theme: Theme;
  systemTheme: 'light' | 'dark';
  accessibilitySettings: AccessibilitySettings;
  setUser: (user: User | null) => void;
  addMessage: (message: ChatMessage) => void;
  toggleEmergencyMode: () => void;
  setTheme: (theme: Theme) => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  updateAccessibilitySettings: (settings: Partial<AccessibilitySettings>) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      messages: [],
      isEmergencyMode: false,
      theme: 'system',
      systemTheme: 'light',
      accessibilitySettings: {
        highContrast: false,
        fontSize: 16,
        voiceCommands: false,
        screenReader: false,
        signLanguage: false,
        reducedMotion: false,
      },
      setUser: (user) => set({ user }),
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      toggleEmergencyMode: () => set((state) => ({ 
        isEmergencyMode: !state.isEmergencyMode 
      })),
      setTheme: (theme) => set({ theme }),
      setSystemTheme: (systemTheme) => set({ systemTheme }),
      updateAccessibilitySettings: (settings) => set((state) => ({
        accessibilitySettings: { ...state.accessibilitySettings, ...settings }
      })),
    }),
    {
      name: 'ppods-storage',
    }
  )
);
import React, { useState } from 'react';
import { 
  Bell, Shield, Eye, Volume2, Moon, Sun, Globe, 
  Lock, UserCog, Palette, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useAuth } from '../auth/AuthProvider';
import { VoiceToText } from '../VoiceToText';

export const Settings: React.FC = () => {
  const { theme, setTheme, accessibilitySettings, updateAccessibilitySettings } = useStore();
  const { user } = useAuth();
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const sections = [
    {
      title: 'Account',
      icon: UserCog,
      settings: [
        {
          name: 'Email Notifications',
          description: 'Manage email notification preferences',
          icon: Bell,
          component: (
            <div className="flex flex-col gap-3">
              {['Safety Alerts', 'Message Notifications', 'Updates & News'].map((item) => (
                <label key={item} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded
                             focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>
          ),
        },
        {
          name: 'Privacy',
          description: 'Control your privacy settings',
          icon: Shield,
          component: (
            <div className="flex flex-col gap-3">
              {[
                'Show online status',
                'Allow friend requests',
                'Show profile in search'
              ].map((item) => (
                <label key={item} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded
                             focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          name: 'Theme',
          description: 'Choose your preferred theme',
          icon: theme === 'dark' ? Moon : Sun,
          component: (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-primary-100 dark:bg-primary-900 text-primary-900 
                       dark:text-primary-100 hover:bg-primary-200 
                       dark:hover:bg-primary-800 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4" />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Switch to Dark Mode
                </>
              )}
            </button>
          ),
        },
      ],
    },
    {
      title: 'Accessibility',
      icon: Eye,
      settings: [
        {
          name: 'Text Size',
          description: 'Adjust the text size',
          icon: MessageSquare,
          component: (
            <input
              type="range"
              min="12"
              max="24"
              value={accessibilitySettings.fontSize}
              onChange={(e) => updateAccessibilitySettings({ 
                fontSize: parseInt(e.target.value) 
              })}
              className="w-full"
            />
          ),
        },
        {
          name: 'Voice Settings',
          description: 'Configure voice input and output',
          icon: Volume2,
          component: (
            <div className="space-y-4">
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-primary-100 dark:bg-primary-900 text-primary-900 
                         dark:text-primary-100 hover:bg-primary-200 
                         dark:hover:bg-primary-800 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                {showVoiceSettings ? 'Hide Voice Settings' : 'Show Voice Settings'}
              </button>
              
              {showVoiceSettings && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Test Voice Input
                    </label>
                    <VoiceToText
                      onTranscript={(text) => console.log('Voice input:', text)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Voice Output Volume
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      defaultValue="0.8"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Speech Rate
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      defaultValue="1"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          ),
        },
        {
          name: 'High Contrast',
          description: 'Increase visual contrast',
          icon: Eye,
          component: (
            <input
              type="checkbox"
              checked={accessibilitySettings.highContrast}
              onChange={(e) => updateAccessibilitySettings({ 
                highContrast: e.target.checked 
              })}
              className="w-4 h-4 text-primary-500 border-gray-300 rounded
                       focus:ring-primary-500"
            />
          ),
        },
      ],
    },
    {
      title: 'Language',
      icon: Globe,
      settings: [
        {
          name: 'App Language',
          description: 'Choose your preferred language',
          icon: Globe,
          component: (
            <select
              defaultValue="en"
              className="block w-full px-3 py-2 bg-white dark:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 rounded-md 
                       shadow-sm focus:outline-none focus:ring-primary-500 
                       focus:border-primary-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-primary-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="grid gap-6">
                  {section.settings.map((setting) => (
                    <div
                      key={setting.name}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <setting.icon className="w-5 h-5 text-primary-500" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {setting.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {setting.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      {setting.component}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
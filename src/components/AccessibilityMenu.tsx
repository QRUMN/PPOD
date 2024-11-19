import React from 'react';
import { Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AccessibilityMenu: React.FC = () => {
  const { accessibilitySettings, updateAccessibilitySettings } = useStore();

  const handleSettingChange = (setting: string, value: boolean | number) => {
    updateAccessibilitySettings({ [setting]: value });
  };

  return (
    <div className="fixed left-4 top-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Accessibility Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="highContrast" className="text-sm">
              High Contrast
            </label>
            <input
              type="checkbox"
              id="highContrast"
              checked={accessibilitySettings.highContrast}
              onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="fontSize" className="text-sm block">
              Font Size
            </label>
            <input
              type="range"
              id="fontSize"
              min="12"
              max="24"
              value={accessibilitySettings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="voiceCommands" className="text-sm">
              Voice Commands
            </label>
            <input
              type="checkbox"
              id="voiceCommands"
              checked={accessibilitySettings.voiceCommands}
              onChange={(e) => handleSettingChange('voiceCommands', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="screenReader" className="text-sm">
              Screen Reader Support
            </label>
            <input
              type="checkbox"
              id="screenReader"
              checked={accessibilitySettings.screenReader}
              onChange={(e) => handleSettingChange('screenReader', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="signLanguage" className="text-sm">
              Sign Language
            </label>
            <input
              type="checkbox"
              id="signLanguage"
              checked={accessibilitySettings.signLanguage}
              onChange={(e) => handleSettingChange('signLanguage', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="reducedMotion" className="text-sm">
              Reduced Motion
            </label>
            <input
              type="checkbox"
              id="reducedMotion"
              checked={accessibilitySettings.reducedMotion}
              onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
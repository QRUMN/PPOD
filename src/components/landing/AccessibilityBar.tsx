import React, { useState } from 'react';
import { 
  Volume2, Type, Sun, Languages, Mic, 
  ZoomIn, ZoomOut, MessageSquare
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { VoiceToText } from '../VoiceToText';

export const AccessibilityBar: React.FC = () => {
  const { accessibilitySettings, updateAccessibilitySettings } = useStore();
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  const controls = [
    { 
      icon: <Volume2 />, 
      label: 'Screen Reader',
      active: accessibilitySettings.screenReader,
      onClick: () => updateAccessibilitySettings({ 
        screenReader: !accessibilitySettings.screenReader 
      })
    },
    { 
      icon: <Languages />, 
      label: 'Sign Language',
      active: accessibilitySettings.signLanguage,
      onClick: () => updateAccessibilitySettings({ 
        signLanguage: !accessibilitySettings.signLanguage 
      })
    },
    { 
      icon: <MessageSquare />, 
      label: 'Voice to Text',
      active: showVoiceInput,
      onClick: () => setShowVoiceInput(!showVoiceInput)
    },
    { 
      icon: <Sun />, 
      label: 'High Contrast',
      active: accessibilitySettings.highContrast,
      onClick: () => updateAccessibilitySettings({ 
        highContrast: !accessibilitySettings.highContrast 
      })
    }
  ];

  const textControls = [
    { 
      icon: <ZoomIn />, 
      label: 'Increase Text',
      onClick: () => updateAccessibilitySettings({ 
        fontSize: Math.min(accessibilitySettings.fontSize + 2, 24) 
      })
    },
    { 
      icon: <ZoomOut />, 
      label: 'Decrease Text',
      onClick: () => updateAccessibilitySettings({ 
        fontSize: Math.max(accessibilitySettings.fontSize - 2, 12) 
      })
    }
  ];

  const handleTranscript = (text: string) => {
    console.log('Transcript:', text);
    // Handle the transcript text as needed
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-accent-800/80 
                    backdrop-blur-sm rounded-lg shadow-lg border border-primary-100 
                    dark:border-primary-900">
        {controls.map((control) => (
          <button
            key={control.label}
            onClick={control.onClick}
            className={`p-2 rounded-md transition-all ${
              control.active
                ? 'bg-primary-500 text-white'
                : 'text-accent-500 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-accent-700'
            }`}
            aria-label={control.label}
          >
            {control.icon}
          </button>
        ))}
        
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
        
        {textControls.map((control) => (
          <button
            key={control.label}
            onClick={control.onClick}
            className="p-2 rounded-md text-accent-500 dark:text-gray-300 
                     hover:bg-primary-50 dark:hover:bg-accent-700 transition-all"
            aria-label={control.label}
          >
            {control.icon}
          </button>
        ))}
        
        <select
          className="ml-2 p-2 rounded-md bg-transparent border border-primary-100 
                   dark:border-primary-900 text-accent-500 dark:text-gray-300
                   focus:ring-2 focus:ring-primary-500"
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {showVoiceInput && (
        <div className="w-80">
          <VoiceToText onTranscript={handleTranscript} />
        </div>
      )}
    </div>
  );
};
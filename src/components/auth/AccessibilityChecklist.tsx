import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Disorder {
  id: string;
  name: string;
  description: string;
}

const disorders: Disorder[] = [
  {
    id: 'visual',
    name: 'Visual Impairment',
    description: 'Difficulty seeing or processing visual information'
  },
  {
    id: 'hearing',
    name: 'Hearing Impairment',
    description: 'Partial or complete hearing loss'
  },
  {
    id: 'mobility',
    name: 'Motor Impairment',
    description: 'Limited mobility or dexterity'
  },
  {
    id: 'cognitive',
    name: 'Cognitive Processing',
    description: 'Difficulty processing or understanding information'
  },
  {
    id: 'speech',
    name: 'Speech Impairment',
    description: 'Difficulty with verbal communication'
  },
  {
    id: 'sensory',
    name: 'Sensory Processing',
    description: 'Sensitivity to sensory inputs like light or sound'
  }
];

export const AccessibilityChecklist: React.FC<{
  onSelectionChange: (selections: string[]) => void;
}> = ({ onSelectionChange }) => {
  const [selectedDisorders, setSelectedDisorders] = useState<string[]>([]);

  const toggleDisorder = (id: string) => {
    const newSelection = selectedDisorders.includes(id)
      ? selectedDisorders.filter(item => item !== id)
      : [...selectedDisorders, id];
    
    setSelectedDisorders(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Accessibility Profile
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Select any that apply to help us personalize your experience
      </p>

      <div className="grid gap-3">
        {disorders.map((disorder) => (
          <button
            key={disorder.id}
            onClick={() => toggleDisorder(disorder.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all
              ${selectedDisorders.includes(disorder.id)
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center
              ${selectedDisorders.includes(disorder.id)
                ? 'bg-primary-500 border-primary-500'
                : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {selectedDisorders.includes(disorder.id) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">
                {disorder.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {disorder.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
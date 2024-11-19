import React from 'react';
import { Power } from 'lucide-react';
import { useStore } from '../store/useStore';

export const EmergencyExit: React.FC = () => {
  const toggleEmergencyMode = useStore((state) => state.toggleEmergencyMode);

  const handleEmergencyExit = () => {
    toggleEmergencyMode();
    // Redirect to a safe page or show emergency resources
    window.location.href = 'https://www.plannedparenthood.org/';
  };

  return (
    <button
      onClick={handleEmergencyExit}
      className="fixed top-4 right-4 bg-red-600 text-white p-2 rounded-full 
                 hover:bg-red-700 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label="Emergency exit"
    >
      <Power className="w-5 h-5" />
    </button>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SaveLoginPromptProps {
  onSave: (remember: boolean) => void;
  onClose: () => void;
}

export const SaveLoginPrompt: React.FC<SaveLoginPromptProps> = ({ onSave, onClose }) => {
  const navigate = useNavigate();

  const handleSave = async (remember: boolean) => {
    await onSave(remember);
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Save Login Information?
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Would you like to stay signed in for future visits?
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => handleSave(true)}
            className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg
                     hover:bg-primary-600 transition-colors"
          >
            Remember Me
          </button>
          <button
            onClick={() => handleSave(false)}
            className="flex-1 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg
                     text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                     transition-colors"
          >
            Not Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};
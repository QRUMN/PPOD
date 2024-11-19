import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, AlertTriangle, UserCheck, MessageCircle, Lock } from 'lucide-react';

const scenarios = [
  {
    title: 'Dating Profile Safety',
    icon: <Shield className="w-6 h-6" />,
    description: 'Learn how to create a safe dating profile and protect your personal information',
    color: 'bg-purple-100 dark:bg-purple-900/50',
    textColor: 'text-purple-900 dark:text-purple-100',
  },
  {
    title: 'Spotting Red Flags',
    icon: <AlertTriangle className="w-6 h-6" />,
    description: 'Identify warning signs and potential dating scams',
    color: 'bg-red-100 dark:bg-red-900/50',
    textColor: 'text-red-900 dark:text-red-100',
  },
  {
    title: 'Healthy Boundaries',
    icon: <Lock className="w-6 h-6" />,
    description: 'Set and maintain personal boundaries in online relationships',
    color: 'bg-green-100 dark:bg-green-900/50',
    textColor: 'text-green-900 dark:text-green-100',
  },
  {
    title: 'Safe Meetups',
    icon: <UserCheck className="w-6 h-6" />,
    description: 'Guidelines for safely meeting online matches in person',
    color: 'bg-blue-100 dark:bg-blue-900/50',
    textColor: 'text-blue-900 dark:text-blue-100',
  },
  {
    title: 'Relationship Building',
    icon: <Heart className="w-6 h-6" />,
    description: 'Develop meaningful connections while staying safe online',
    color: 'bg-pink-100 dark:bg-pink-900/50',
    textColor: 'text-pink-900 dark:text-pink-100',
  },
  {
    title: 'Communication Skills',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Practice clear and effective communication in dating contexts',
    color: 'bg-indigo-100 dark:bg-indigo-900/50',
    textColor: 'text-indigo-900 dark:text-indigo-100',
  },
];

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {scenarios.map((scenario, index) => (
        <motion.button
          key={scenario.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${scenario.color} p-6 rounded-xl hover:scale-[1.02] transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            group relative overflow-hidden`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${scenario.color} ${scenario.textColor}`}>
              {scenario.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className={`text-lg font-semibold mb-2 ${scenario.textColor}`}>
                {scenario.title}
              </h3>
              <p className={`text-sm opacity-90 ${scenario.textColor}`}>
                {scenario.description}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Award, Heart } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "10,000+",
    label: "Active Users",
    description: "Learning safe online dating"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    value: "98%",
    label: "Success Rate",
    description: "In identifying red flags"
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: "50+",
    label: "Partner Organizations",
    description: "Supporting our mission"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    value: "15,000+",
    label: "Safe Connections",
    description: "Made through our platform"
  }
];

export const ImpactStats: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-accent-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 
                           bg-primary-100 dark:bg-primary-900/50 rounded-full 
                           text-primary-500 dark:text-primary-400 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-accent-500 dark:text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-accent-500 dark:text-gray-300 mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-accent-600 dark:text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
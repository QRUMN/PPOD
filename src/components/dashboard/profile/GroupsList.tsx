import React from 'react';
import { Users, Plus, MessageCircle } from 'lucide-react';

const groups = [
  {
    id: '1',
    name: 'Safety Support Group',
    members: 12,
    photo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=60&h=60&fit=crop',
  },
  {
    id: '2',
    name: 'Dating Tips & Advice',
    members: 28,
    photo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=60&h=60&fit=crop',
  },
  // Add more groups as needed
];

export const GroupsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Groups
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
                        text-primary-500 hover:text-primary-600 transition-colors">
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <div 
            key={group.id}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <img
                src={group.photo}
                alt={group.name}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 inline mr-1" />
                  {group.members} members
                </p>
              </div>
              <button 
                className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                aria-label="Open chat"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
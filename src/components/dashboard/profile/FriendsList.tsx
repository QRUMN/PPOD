import React from 'react';
import { UserPlus, MessageCircle, MoreVertical } from 'lucide-react';

const friends = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
    status: 'online',
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    status: 'offline',
  },
  // Add more friends as needed
];

export const FriendsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Friends
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
                        text-primary-500 hover:text-primary-600 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add Friend
        </button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {friends.map((friend) => (
          <div 
            key={friend.id}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={friend.photo}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 
                               border-white dark:border-gray-800 ${
                  friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {friend.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {friend.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                aria-label="Message"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
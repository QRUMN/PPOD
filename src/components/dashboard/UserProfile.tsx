import React, { useState, useRef } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Camera, Edit2, Users, MessageCircle, Settings } from 'lucide-react';
import { FriendsList } from './profile/FriendsList';
import { GroupsList } from './profile/GroupsList';
import { EditProfile } from './profile/EditProfile';
import { motion, AnimatePresence } from 'framer-motion';
import { storage, auth } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

type Tab = 'friends' | 'groups' | 'edit';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('friends');
  const [isUploading, setIsUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'groups', label: 'Groups', icon: MessageCircle },
    { id: 'edit', label: 'Edit Profile', icon: Settings },
  ];

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !auth.currentUser) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `profile-photos/${auth.currentUser.uid}`);
      const snapshot = await uploadBytes(storageRef, file);
      const newPhotoURL = await getDownloadURL(snapshot.ref);
      
      await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
      setPhotoURL(newPhotoURL); // Update local state
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500">
        <button 
          className="absolute bottom-4 right-4 p-2 bg-white/20 rounded-full
                   hover:bg-white/30 transition-colors"
          aria-label="Change cover photo"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 -mt-12">
          <div className="relative">
            <img
              src={photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop'}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`absolute bottom-0 right-0 p-1.5 rounded-full
                       transition-colors ${
                         isUploading 
                           ? 'bg-gray-400 cursor-not-allowed' 
                           : 'bg-primary-500 hover:bg-primary-600'
                       }`}
              aria-label="Change profile photo"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.displayName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium 
                       border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            {activeTab === 'friends' && <FriendsList />}
            {activeTab === 'groups' && <GroupsList />}
            {activeTab === 'edit' && <EditProfile />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
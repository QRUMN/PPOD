import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Shield, Bell, Settings, LogOut } from 'lucide-react';
import { auth } from '../../lib/firebase';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">PPODS</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              <Bell className="w-6 h-6" />
            </button>
            <Link 
              to="/dashboard/settings"
              className={`p-2 transition-colors ${
                location.pathname === '/dashboard/settings'
                  ? 'text-primary-500'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
              }`}
            >
              <Settings className="w-6 h-6" />
            </Link>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard/profile')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
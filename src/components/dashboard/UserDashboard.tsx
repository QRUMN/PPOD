import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useStore } from '../../store/useStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Shield, Award, Clock } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const progress = useStore((state) => state.user?.progress);

  const stats = [
    {
      label: 'Safety Score',
      value: progress?.safetyScore || 0,
      icon: Shield,
      color: 'text-green-500',
    },
    {
      label: 'Completed Scenarios',
      value: progress?.completedScenarios.length || 0,
      icon: Award,
      color: 'text-blue-500',
    },
    {
      label: 'Current Level',
      value: progress?.currentLevel || 1,
      icon: Clock,
      color: 'text-purple-500',
    },
  ];

  const chartData = [
    { name: 'Safety', value: 80 },
    { name: 'Boundaries', value: 65 },
    { name: 'Communication', value: 90 },
    { name: 'Awareness', value: 75 },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm max-w-md mx-auto">
        <img
          src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-primary-100 dark:border-primary-900"
        />
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold">{user?.displayName}</h1>
          <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
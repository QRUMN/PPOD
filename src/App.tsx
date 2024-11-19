import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { LandingPage } from './components/LandingPage';
import { ThemeToggle } from './components/ThemeToggle';
import { useStore } from './store/useStore';
import { useTheme } from './hooks/useTheme';
import { Toaster } from 'react-hot-toast';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { accessibilitySettings } = useStore();
  const { isDark } = useTheme();

  return (
    <BrowserRouter>
      <AuthProvider>
        <div 
          className={`min-h-screen transition-colors duration-200
            ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}
            ${accessibilitySettings.highContrast ? 'contrast-high' : ''}`}
          style={{ 
            fontSize: `${accessibilitySettings.fontSize}px`,
          }}
        >
          <ThemeToggle />
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route 
              path="/dashboard/*" 
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              } 
            />
          </Routes>

          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: isDark ? '#1F2937' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#1F2937',
                border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
              },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
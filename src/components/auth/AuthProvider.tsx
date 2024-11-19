import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: Error | null;
  updateUserPreferences: (preferences: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  updateUserPreferences: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const initializeAuth = async () => {
      try {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          try {
            if (firebaseUser) {
              const userRef = doc(db, 'users', firebaseUser.uid);
              const userDoc = await getDoc(userRef);

              if (!userDoc.exists()) {
                // Initialize new user document
                await setDoc(userRef, {
                  displayName: firebaseUser.displayName,
                  email: firebaseUser.email,
                  photoURL: firebaseUser.photoURL,
                  createdAt: new Date(),
                  accessibilitySettings: {
                    highContrast: false,
                    fontSize: 16,
                    voiceCommands: false,
                    screenReader: false,
                    signLanguage: false,
                    reducedMotion: false,
                  },
                });
              }

              const userData = userDoc.exists() ? userDoc.data() : {};
              setUser({ ...firebaseUser, ...userData } as User);
            } else {
              setUser(null);
            }
          } catch (err) {
            console.error('Error processing user:', err);
            toast.error('Error loading user data. Please try again.');
          } finally {
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const updateUserPreferences = async (preferences: any) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { preferences }, { merge: true });
      toast.success('Preferences updated successfully');
    } catch (err) {
      console.error('Error updating preferences:', err);
      toast.error('Failed to update preferences');
      throw err;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      isLoading: loading,
      user,
      error,
      updateUserPreferences,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
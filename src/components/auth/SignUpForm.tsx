import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Mail, Lock, User, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AccessibilityChecklist } from './AccessibilityChecklist';
import { PasswordStrength } from './PasswordStrength';
import { toast } from 'react-hot-toast';

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDisorders, setSelectedDisorders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessibility: {
          disorders: selectedDisorders,
          settings: {
            screenReader: selectedDisorders.includes('visual'),
            signLanguage: selectedDisorders.includes('hearing'),
            voiceCommands: selectedDisorders.includes('mobility'),
            highContrast: selectedDisorders.includes('visual'),
            textToSpeech: selectedDisorders.includes('cognitive'),
          }
        },
        createdAt: new Date(),
      });

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Google sign-up error:', err);
      toast.error('Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Create auth user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile
      await updateProfile(user, { displayName: name });
      
      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        displayName: name,
        email: email,
        accessibility: {
          disorders: selectedDisorders,
          settings: {
            screenReader: selectedDisorders.includes('visual'),
            signLanguage: selectedDisorders.includes('hearing'),
            voiceCommands: selectedDisorders.includes('mobility'),
            highContrast: selectedDisorders.includes('visual'),
            textToSpeech: selectedDisorders.includes('cognitive'),
          }
        },
        createdAt: new Date(),
      });

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Email sign-up error:', err);
      toast.error(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Join PPODS to start your learning journey
          </p>
        </div>

        <form onSubmit={handleEmailSignUp} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg
                           text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg
                           text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg
                           text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                  minLength={8}
                />
              </div>
              <PasswordStrength password={password} />
            </div>
          </div>

          <AccessibilityChecklist 
            onSelectionChange={(selections) => setSelectedDisorders(selections)} 
          />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 text-white p-3 rounded-lg font-medium
                       hover:bg-primary-600 transition-colors disabled:opacity-50
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 
                     dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                     transition-colors text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
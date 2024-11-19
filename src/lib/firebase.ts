import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBDldPUSlcFbt0MRTvF9MkF3Ebcyltvoio",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ppods-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ppods-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ppods-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "148629176269",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:148629176269:web:7b0d3ba013b5e04723ce84",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-M4TVFQSN83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Enable offline persistence for Firestore
const initializeFirestore = async () => {
  try {
    await db.enablePersistence({ synchronizeTabs: true });
    console.log('Firestore persistence enabled');
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence enabled in first tab only');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser does not support persistence');
    }
  }
};

// Initialize services with error handling
const initializeServices = async () => {
  try {
    await initializeFirestore();
    console.log('Firebase services initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase services:', error);
  }
};

// Initialize services
initializeServices();

export { app, auth, db, storage };
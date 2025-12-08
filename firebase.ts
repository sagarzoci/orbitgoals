import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Cast import.meta to any to avoid type errors in some environments
const env = (import.meta as any).env;

const firebaseConfig = {
  apiKey: env?.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: env?.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: env?.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: env?.VITE_FIREBASE_STORAGE_BUCKET || "demo.app",
  messagingSenderId: env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000",
  appId: env?.VITE_FIREBASE_APP_ID || "1:000000000:web:0000000000",
};

// Initialize Firebase with safety checks
let app;
let authExport;
let googleProviderExport;
let dbExport;

try {
  // Only try to initialize if we have a vaguely valid config or we want to try default
  // Wrapping in try/catch handles the case where config is empty/invalid string
  app = initializeApp(firebaseConfig);
  authExport = getAuth(app);
  googleProviderExport = new GoogleAuthProvider();
  dbExport = getFirestore(app, "default");
} catch (error) {
  console.warn("Firebase Initialization Failed. App running in offline/demo mode.", error);
}

// Export safe fallbacks if initialization failed to prevent import crashes
// Services must check availability before use
export const auth = authExport!;
export const googleProvider = googleProviderExport!;
export const db = dbExport!;

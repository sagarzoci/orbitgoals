import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Cast import.meta to any to avoid type errors in some environments
const env = (import.meta as any).env;

const firebaseConfig = {
  apiKey: env?.VITE_FIREBASE_API_KEY || "AIzaSyAzMAk7t5RyAr_6lXotUy9FuyRfZy6_PAw",
  authDomain: env?.VITE_FIREBASE_AUTH_DOMAIN || "orbitgoals.firebaseapp.com",
  projectId: env?.VITE_FIREBASE_PROJECT_ID || "orbitgoals",
  storageBucket: env?.VITE_FIREBASE_STORAGE_BUCKET || "orbitgoals.firebasestorage.app",
  messagingSenderId: env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "310528524086",
  appId: env?.VITE_FIREBASE_APP_ID || "1:310528524086:web:7f035bd3df11901d393d97",
  measurementId: "G-L69PPJQ1XP"
};

// Initialize Firebase
let app;
let authExport;
let googleProviderExport;
let dbExport;

try {
  app = initializeApp(firebaseConfig);
  authExport = getAuth(app);
  googleProviderExport = new GoogleAuthProvider();
  dbExport = getFirestore(app);
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

// Export the initialized instances
// We use non-null assertion (!) because in a valid setup these will exist
export const auth = authExport!;
export const googleProvider = googleProviderExport!;
export const db = dbExport!;

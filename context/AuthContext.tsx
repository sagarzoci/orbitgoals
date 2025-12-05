import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
// CORRECTED: Use explicit relative path to the root firebase.ts file
import { auth, googleProvider } from '../firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User'
        };
        setUser(appUser);
        localStorage.setItem('orbit_current_user', JSON.stringify(appUser));
        setLoading(false);
      } else {
        // If no Firebase user, check for Guest User persistence
        const stored = localStorage.getItem('orbit_current_user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.id === 'guest-user-123') {
              setUser(parsed);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error("Failed to parse stored user", e);
          }
        }
        
        setUser(null);
        localStorage.removeItem('orbit_current_user');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login Error:", error);
      throw new Error(mapAuthError(error.code));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name immediately after signup
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      const appUser: User = {
        id: userCredential.user.uid,
        email: email,
        name: name
      };
      setUser(appUser);
    } catch (error: any) {
      console.error("Signup Error:", error);
      throw new Error(mapAuthError(error.code));
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Google Login Error:", error);
      throw new Error(mapAuthError(error.code));
    }
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest-user-123',
      email: 'guest@orbitgoals.com',
      name: 'Guest Explorer'
    };
    setUser(guestUser);
    localStorage.setItem('orbit_current_user', JSON.stringify(guestUser));
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
    setUser(null);
    localStorage.removeItem('orbit_current_user');
  };

  // Helper to make Firebase error codes human readable
  const mapAuthError = (code: string): string => {
    switch (code) {
      case 'auth/invalid-email': return 'Invalid email address.';
      case 'auth/user-disabled': return 'This account has been disabled.';
      case 'auth/user-not-found': return 'No account found with this email.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/email-already-in-use': return 'Email is already registered.';
      case 'auth/weak-password': return 'Password should be at least 6 characters.';
      case 'auth/popup-closed-by-user': return 'Sign in was cancelled.';
      case 'auth/api-key-not-valid': return 'Firebase API Key is invalid. Try Guest Mode.';
      case 'auth/operation-not-allowed': return 'Google Sign-In not enabled in Firebase Console.';
      case 'auth/unauthorized-domain': return 'Domain not authorized. Add to Firebase Console > Auth > Settings.';
      default: return `Authentication failed (${code}). Try Guest Mode.`;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      loginWithGoogle,
      loginAsGuest,
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
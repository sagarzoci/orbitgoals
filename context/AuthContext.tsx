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
import { auth, googleProvider } from '../firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to merge Firebase user with local extra details (Bio, Phone)
  // Since Firebase Auth doesn't store 'bio' or 'phone' (without SMS verif) natively on the object easily
  const mergeUserWithLocalData = (firebaseUser: any): User => {
    const localDataKey = `orbit_user_extras_${firebaseUser.uid}`;
    const localData = localStorage.getItem(localDataKey);
    const parsedExtras = localData ? JSON.parse(localData) : {};

    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      photoURL: firebaseUser.photoURL || undefined,
      phoneNumber: parsedExtras.phoneNumber || undefined,
      bio: parsedExtras.bio || undefined
    };
  };

  useEffect(() => {
    let unsubscribe = () => {};
    
    try {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            const appUser = mergeUserWithLocalData(firebaseUser);
            setUser(appUser);
            setLoading(false);
        } else {
            // Check for Guest User persistence
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
            setLoading(false);
        }
        });
    } catch (e) {
        console.warn("Auth initialization failed", e);
        setLoading(false);
    }

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
      name: 'Guest Explorer',
      bio: 'Just exploring the universe of habits.',
      phoneNumber: ''
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

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;

    // 1. Guest Mode Update
    if (user.id === 'guest-user-123') {
       const updated = { ...user, ...data };
       setUser(updated);
       localStorage.setItem('orbit_current_user', JSON.stringify(updated));
       return;
    } 
    
    // 2. Firebase User Update
    if (auth.currentUser) {
       // Update core firebase profile (Name, Photo)
       if (data.name || data.photoURL) {
          await updateProfile(auth.currentUser, { 
            displayName: data.name || user.name, 
            photoURL: data.photoURL || user.photoURL 
          });
       }

       // Update Extras (Phone, Bio) in LocalStorage (Acting as DB)
       // In a full app, this would go to Firestore
       const extras = {
         phoneNumber: data.phoneNumber,
         bio: data.bio
       };
       localStorage.setItem(`orbit_user_extras_${user.id}`, JSON.stringify(extras));

       // Update Local State
       setUser(prev => prev ? { ...prev, ...data } : null);
    }
  };

  const mapAuthError = (code: string): string => {
    switch (code) {
      case 'auth/invalid-email': return 'Invalid email address.';
      case 'auth/user-disabled': return 'This account has been disabled.';
      case 'auth/user-not-found': return 'No account found with this email.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/email-already-in-use': return 'Email is already registered.';
      case 'auth/weak-password': return 'Password should be at least 6 characters.';
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
      updateUserProfile,
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

import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  orderBy,
  getDoc,
  setDoc
} from "firebase/firestore";
import { User } from "../types";

export interface PaymentRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: any; // Firestore Timestamp
  transactionId?: string; // Optional manual entry
}

// Circuit breaker for DB availability
const isDbAvailable = () => !!db;

// Helper to handle errors gracefully
const handleError = (error: any, action: string) => {
    console.warn(`Payment Service Error (${action}):`, error);
    if (error.code === 'permission-denied') {
        console.info('Firestore permissions missing. Functionality will be limited.');
    }
};

// User Side: Submit a request
export const submitPaymentRequest = async (user: User) => {
  if (!user.id) throw new Error("User ID required");
  
  if (!isDbAvailable()) {
      console.warn("Database unavailable. Simulating success for demo.");
      await new Promise(r => setTimeout(r, 1000));
      return;
  }

  try {
    // Check if pending request exists
    const q = query(
        collection(db, "payment_requests"), 
        where("userId", "==", user.id), 
        where("status", "==", "pending")
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
        return; // Already pending
    }

    await addDoc(collection(db, "payment_requests"), {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        amount: 30,
        status: 'pending',
        date: serverTimestamp()
    });
  } catch (error) {
    handleError(error, 'submitPaymentRequest');
    if ((error as any).code === 'permission-denied' || !db) {
        throw new Error("Demo Mode: Backend unavailable.");
    }
    throw error;
  }
};

// Admin Side: Get all requests
export const getPaymentRequests = async (): Promise<PaymentRequest[]> => {
  if (!isDbAvailable()) return [];

  try {
    const q = query(collection(db, "payment_requests"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaymentRequest));
  } catch (error) {
    handleError(error, 'getPaymentRequests');
    return []; // Return empty list on error
  }
};

// Admin Side: Approve Payment
export const approvePayment = async (requestId: string, userId: string) => {
  if (!isDbAvailable()) throw new Error("Database unavailable");

  try {
    // 1. Update Request Status
    const reqRef = doc(db, "payment_requests", requestId);
    await updateDoc(reqRef, { status: 'approved' });

    // 2. Update User Profile to Pro
    const userConfigRef = doc(db, "user_configs", userId);
    await setDoc(userConfigRef, { isPro: true, proSince: serverTimestamp() }, { merge: true });
  } catch (error) {
    handleError(error, 'approvePayment');
    throw error;
  }
};

// Admin Side: Reject Payment
export const rejectPayment = async (requestId: string) => {
  if (!isDbAvailable()) throw new Error("Database unavailable");
  
  try {
    const reqRef = doc(db, "payment_requests", requestId);
    await updateDoc(reqRef, { status: 'rejected' });
  } catch (error) {
    handleError(error, 'rejectPayment');
    throw error;
  }
};

// Admin Side: Get Stats
export const getAdminStats = async () => {
  if (!isDbAvailable()) return { totalUsers: 0, revenue: 0, activeSubs: 0 };

  try {
    const now = new Date();
    const monthlyId = `monthly_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lbRef = collection(db, 'leaderboards', monthlyId, 'users');
    
    // Fallback if collection doesn't exist or permissions denied
    let totalUsers = 0;
    try {
        const lbSnapshot = await getDocs(lbRef);
        totalUsers = lbSnapshot.size || 0;
    } catch(e) { /* ignore */ }

    // Calculate Revenue from approved requests
    let revenue = 0;
    let activeSubs = 0;
    try {
        const reqSnapshot = await getDocs(query(collection(db, "payment_requests"), where("status", "==", "approved")));
        activeSubs = reqSnapshot.size;
        revenue = activeSubs * 30;
    } catch (e) { /* ignore */ }

    return {
        totalUsers,
        revenue,
        activeSubs
    };
  } catch (error) {
    handleError(error, 'getAdminStats');
    return { totalUsers: 0, revenue: 0, activeSubs: 0 };
  }
};

// Client Side: Check pro status
export const checkProStatus = async (userId: string): Promise<boolean> => {
    if(!userId || !isDbAvailable()) return false;
    try {
        const docRef = doc(db, "user_configs", userId);
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().isPro) {
            return true;
        }
        return false;
    } catch (error) {
        // Silent failure for checking status on load
        return false;
    }
};
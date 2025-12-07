import { db } from "../firebase";
import { 
  doc, 
  setDoc, 
  increment, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp 
} from "firebase/firestore";
import { User, LeaderboardEntry } from "../types";

// Helper to generate doc IDs
const getDailyId = () => {
  const now = new Date();
  return `daily_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const getMonthlyId = () => {
  const now = new Date();
  return `monthly_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Mock data for fallback when Firestore is not configured or offline
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { userId: 'm1', displayName: 'Cosmic Voyager', points: 2450, tasksCompleted: 45, rank: 1, photoURL: '' },
  { userId: 'm2', displayName: 'Star Walker', points: 1980, tasksCompleted: 38, rank: 2, photoURL: '' },
  { userId: 'm3', displayName: 'Nebula Surfer', points: 1850, tasksCompleted: 32, rank: 3, photoURL: '' },
  { userId: 'm4', displayName: 'Orbit Pilot', points: 1720, tasksCompleted: 28, rank: 4, photoURL: '' },
  { userId: 'm5', displayName: 'Lunar Lander', points: 1640, tasksCompleted: 25, rank: 5, photoURL: '' },
  { userId: 'm6', displayName: 'Solar Sailor', points: 1500, tasksCompleted: 22, rank: 6, photoURL: '' },
  { userId: 'm7', displayName: 'Comet Chaser', points: 1350, tasksCompleted: 20, rank: 7, photoURL: '' },
];

export const updateLeaderboardScore = async (
  user: User, 
  pointsToAdd: number, 
  tasksToAdd: number
) => {
  // 1. Skip if Guest or no ID
  if (!user.id || user.id.startsWith('guest-')) return;

  const dailyId = getDailyId();
  const monthlyId = getMonthlyId();

  const userData = {
    userId: user.id,
    displayName: user.name,
    photoURL: user.photoURL || null,
    lastUpdated: serverTimestamp()
  };

  const incrementData = {
    points: increment(pointsToAdd),
    tasksCompleted: increment(tasksToAdd)
  };

  try {
    // 2. Update Daily Leaderboard
    const dailyRef = doc(db, 'leaderboards', dailyId, 'users', user.id);
    await setDoc(dailyRef, { ...userData, ...incrementData }, { merge: true });

    // 3. Update Monthly Leaderboard
    const monthlyRef = doc(db, 'leaderboards', monthlyId, 'users', user.id);
    await setDoc(monthlyRef, { ...userData, ...incrementData }, { merge: true });

  } catch (error) {
    // Silently fail for "Not Found" / Offline errors to prevent UI disruption
    console.warn("Leaderboard update skipped (Backend unavailable/misconfigured):", error);
  }
};

export const fetchLeaderboard = async (period: 'daily' | 'monthly'): Promise<LeaderboardEntry[]> => {
  const docId = period === 'daily' ? getDailyId() : getMonthlyId();
  
  try {
    const usersRef = collection(db, 'leaderboards', docId, 'users');
    // Query top 20 by points
    const q = query(usersRef, orderBy("points", "desc"), limit(20));

    const querySnapshot = await getDocs(q);
    
    // If we have no data, return mock data for demo purposes
    if (querySnapshot.empty) {
        return MOCK_LEADERBOARD;
    }

    const entries: LeaderboardEntry[] = [];
    let rank = 1;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        userId: data.userId,
        displayName: data.displayName,
        photoURL: data.photoURL,
        points: data.points,
        tasksCompleted: data.tasksCompleted,
        rank: rank++
      });
    });

    return entries;
  } catch (error) {
    console.warn("Firestore unavailable, returning mock leaderboard data:", error);
    // Return mock data so the UI doesn't break when DB is missing
    return MOCK_LEADERBOARD;
  }
};
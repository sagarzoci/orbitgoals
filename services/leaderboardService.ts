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
import { User, LeaderboardEntry, Goal, DailyLogs, COUNTRIES } from "../types";
import { calculateStats, getTierInfo } from "./gamification";

// Circuit breaker to stop trying if DB doesn't exist or permissions are blocked
let isFirestoreAvailable = true;

// Helper to generate doc IDs
const getDailyId = () => {
  const now = new Date();
  return `daily_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const getWeeklyId = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDays = (now.getTime() - startOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  return `weekly_${now.getFullYear()}-W${weekNum}`;
};

const getMonthlyId = () => {
  const now = new Date();
  return `monthly_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Mock data for fallback
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { userId: 'm1', displayName: 'Cosmic Voyager', points: 2450, tasksCompleted: 45, rank: 1, photoURL: '', country: 'US', tier: 'Diamond', avatarFrame: 'ring-4 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]' },
  { userId: 'm2', displayName: 'Star Walker', points: 1980, tasksCompleted: 38, rank: 2, photoURL: '', country: 'IN', tier: 'Gold' },
  { userId: 'm3', displayName: 'Nebula Surfer', points: 1850, tasksCompleted: 32, rank: 3, photoURL: '', country: 'JP', tier: 'Gold' },
  { userId: 'm4', displayName: 'Orbit Pilot', points: 1720, tasksCompleted: 28, rank: 4, photoURL: '', country: 'UK', tier: 'Silver' },
  { userId: 'm5', displayName: 'Lunar Lander', points: 1640, tasksCompleted: 25, rank: 5, photoURL: '', country: 'CA', tier: 'Silver' },
  { userId: 'm6', displayName: 'Solar Sailor', points: 1500, tasksCompleted: 22, rank: 6, photoURL: '', country: 'BR', tier: 'Bronze' },
  { userId: 'm7', displayName: 'Comet Chaser', points: 1350, tasksCompleted: 20, rank: 7, photoURL: '', country: 'DE', tier: 'Bronze' },
];

const LOCAL_LEADERBOARD_KEY = 'orbit_local_leaderboard_backup';

// Helper to calculate current user score from LocalStorage
const calculateCurrentUserScore = (userId: string) => {
  try {
    const goalsStr = localStorage.getItem(`orbit_goals_${userId}`);
    const logsStr = localStorage.getItem(`orbit_logs_${userId}`);
    const bonusStr = localStorage.getItem(`orbit_bonus_${userId}`);
    
    const goals: Goal[] = goalsStr ? JSON.parse(goalsStr) : [];
    const logs: DailyLogs = logsStr ? JSON.parse(logsStr) : {};
    const bonus = bonusStr ? parseInt(bonusStr, 10) : 0;
    
    return calculateStats(goals, logs, bonus);
  } catch (e) {
    return { totalPoints: 0, totalCompleted: 0, level: 1 };
  }
};

const getLocalFallback = (currentUser?: User | null, filter?: 'global' | 'country' | 'friends'): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(LOCAL_LEADERBOARD_KEY);
    let board: LeaderboardEntry[] = stored ? JSON.parse(stored) : [...MOCK_LEADERBOARD];
    
    // Ensure current user is in the list
    if (currentUser && currentUser.id) {
       const userIndex = board.findIndex(e => e.userId === currentUser.id);
       const stats = calculateCurrentUserScore(currentUser.id);
       const tier = getTierInfo(stats.level).name;

       const userEntry: LeaderboardEntry = {
          userId: currentUser.id,
          displayName: currentUser.name,
          photoURL: currentUser.photoURL,
          points: stats.totalPoints,
          tasksCompleted: stats.totalCompleted,
          rank: 0,
          country: currentUser.country || 'Global',
          tier: tier,
          avatarFrame: currentUser.activeAvatarFrame
       };

       if (userIndex === -1 && stats.totalPoints > 0) {
          board.push(userEntry);
       } else if (userIndex !== -1) {
          board[userIndex] = { ...board[userIndex], ...userEntry };
       }
    }

    // Filter Logic
    if (filter === 'country' && currentUser?.country) {
      board = board.filter(e => e.country === currentUser.country || e.userId === currentUser.id);
    } else if (filter === 'friends') {
      // Mock Friend Filter: Just show user and top 3 mock users
      const friendIds = ['m1', 'm3', 'm5', currentUser?.id];
      board = board.filter(e => friendIds.includes(e.userId));
    }

    // Sort and Rank
    board.sort((a, b) => b.points - a.points);
    return board.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  } catch (e) {
    return MOCK_LEADERBOARD;
  }
};

const saveLocalFallback = (entries: LeaderboardEntry[]) => {
  localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(entries));
};

export const updateLeaderboardScore = async (
  user: User, 
  pointsToAdd: number, 
  tasksToAdd: number
) => {
  if (!user.id || user.id.startsWith('guest-')) {
      updateLocalFallbackOnly(user, pointsToAdd, tasksToAdd);
      return;
  }

  if (!isFirestoreAvailable) {
    updateLocalFallbackOnly(user, pointsToAdd, tasksToAdd);
    return;
  }

  const dailyId = getDailyId();
  const weeklyId = getWeeklyId();
  const monthlyId = getMonthlyId();

  const stats = calculateCurrentUserScore(user.id);
  const tier = getTierInfo(stats.level).name;

  const userData = {
    userId: user.id,
    displayName: user.name,
    photoURL: user.photoURL || null,
    country: user.country || 'Global',
    tier: tier,
    avatarFrame: user.activeAvatarFrame || null, // Sync frame
    lastUpdated: serverTimestamp()
  };

  const incrementData = {
    points: increment(pointsToAdd),
    tasksCompleted: increment(tasksToAdd)
  };

  try {
    // Update all timeframes
    const dailyRef = doc(db, 'leaderboards', dailyId, 'users', user.id);
    await setDoc(dailyRef, { ...userData, ...incrementData }, { merge: true });

    const weeklyRef = doc(db, 'leaderboards', weeklyId, 'users', user.id);
    await setDoc(weeklyRef, { ...userData, ...incrementData }, { merge: true });

    const monthlyRef = doc(db, 'leaderboards', monthlyId, 'users', user.id);
    await setDoc(monthlyRef, { ...userData, ...incrementData }, { merge: true });

  } catch (error: any) {
    console.warn("Firestore unavailable/forbidden. Using local leaderboard.", error.code);
    if (error.code === 'permission-denied' || error.code === 'not-found' || (error.message && error.message.includes('database (default) does not exist'))) {
        isFirestoreAvailable = false;
    }
    updateLocalFallbackOnly(user, pointsToAdd, tasksToAdd);
  }
};

const updateLocalFallbackOnly = (user: User, pointsToAdd: number, tasksToAdd: number) => {
    const board = getLocalFallback(user);
    saveLocalFallback(board);
};

export const fetchLeaderboard = async (
  period: 'daily' | 'weekly' | 'monthly', 
  currentUser?: User | null,
  filter: 'global' | 'country' | 'friends' = 'global'
): Promise<LeaderboardEntry[]> => {
  
  if (!isFirestoreAvailable) {
      return getLocalFallback(currentUser, filter);
  }

  let docId = getMonthlyId();
  if (period === 'daily') docId = getDailyId();
  if (period === 'weekly') docId = getWeeklyId();
  
  try {
    const usersRef = collection(db, 'leaderboards', docId, 'users');
    const q = query(usersRef, orderBy("points", "desc"), limit(50));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        return getLocalFallback(currentUser, filter); 
    }

    let entries: LeaderboardEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        userId: data.userId,
        displayName: data.displayName,
        photoURL: data.photoURL,
        points: data.points,
        tasksCompleted: data.tasksCompleted,
        country: data.country,
        tier: data.tier,
        avatarFrame: data.avatarFrame, // Retrieve frame
        rank: 0 
      });
    });

    // Client-side filtering
    if (filter === 'country' && currentUser?.country) {
      entries = entries.filter(e => e.country === currentUser.country);
    } else if (filter === 'friends') {
      const friendIds = ['m1', 'm3', 'm5', currentUser?.id];
      entries = entries.filter(e => friendIds.includes(e.userId));
    }

    // Ensure current user is present
    if (currentUser && !entries.find(e => e.userId === currentUser.id)) {
       const stats = calculateCurrentUserScore(currentUser.id);
       if (stats.totalPoints > 0) {
          let shouldAdd = true;
          if (filter === 'country' && currentUser.country !== entries[0]?.country && entries.length > 0) shouldAdd = false;
          
          if (shouldAdd) {
            entries.push({
                userId: currentUser.id,
                displayName: currentUser.name,
                photoURL: currentUser.photoURL,
                points: stats.totalPoints,
                tasksCompleted: stats.totalCompleted,
                country: currentUser.country || 'Global',
                tier: getTierInfo(stats.level).name,
                avatarFrame: currentUser.activeAvatarFrame,
                rank: 0
            });
          }
       }
    }

    // Re-sort and Rank
    entries.sort((a, b) => b.points - a.points);
    entries = entries.map((e, i) => ({ ...e, rank: i + 1 }));

    return entries;
  } catch (error: any) {
    console.warn("Firestore unavailable/forbidden. Using local leaderboard.");
    if (error.code === 'permission-denied' || error.code === 'not-found' || (error.message && error.message.includes('database (default) does not exist'))) {
        isFirestoreAvailable = false;
    }
    return getLocalFallback(currentUser, filter);
  }
};
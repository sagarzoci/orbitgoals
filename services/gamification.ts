import { DailyLogs, Goal, UserStats } from "../types";

export const POINTS_PER_COMPLETION = 10;
export const POINTS_PER_PERFECT_DAY = 50;

export const calculateStats = (goals: Goal[], logs: DailyLogs): UserStats => {
  let totalCompleted = 0;
  let perfectDays = 0;
  
  // 1. Calculate Completions & Perfect Days
  Object.entries(logs).forEach(([dateStr, dayLog]) => {
    const statuses = Object.values(dayLog);
    const dayCompletedCount = statuses.filter(s => s === 'completed').length;
    
    if (dayCompletedCount > 0) {
      totalCompleted += dayCompletedCount;
    }

    if (goals.length > 0 && dayCompletedCount === goals.length) {
      perfectDays++;
    }
  });

  // 2. Calculate Streaks
  let currentStreak = 0;
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  goals.forEach(goal => {
    let goalStreak = 0;
    let d = new Date(today);
    
    const isTodayDone = logs[todayStr]?.[goal.id] === 'completed';
    if (isTodayDone) goalStreak++;

    for (let i = 1; i < 365; i++) {
      const prevDate = new Date(d);
      prevDate.setDate(prevDate.getDate() - i);
      const prevStr = prevDate.toISOString().split('T')[0];
      
      if (logs[prevStr]?.[goal.id] === 'completed') {
        goalStreak++;
      } else {
        break;
      }
    }
    if (goalStreak > currentStreak) currentStreak = goalStreak;
  });

  // 3. Calculate Points
  const totalPoints = (totalCompleted * POINTS_PER_COMPLETION) + (perfectDays * POINTS_PER_PERFECT_DAY);

  // 4. Calculate Level
  const level = Math.floor(totalPoints / 200) + 1;

  return {
    totalCompleted,
    currentStreak,
    perfectDays,
    totalPoints,
    level
  };
};

export const ACHIEVEMENTS_LIST = [
  {
    id: 'rookie',
    title: 'Rookie Orbit',
    description: 'Complete your first habit.',
    threshold: 1,
    metric: 'totalCompleted',
    icon: '🚀'
  },
  {
    id: 'streak_3',
    title: 'Ignition',
    description: 'Maintain a 3-day streak.',
    threshold: 3,
    metric: 'currentStreak',
    icon: '🔥'
  },
  {
    id: 'streak_7',
    title: 'Velocity',
    description: 'Reach a 7-day streak.',
    threshold: 7,
    metric: 'currentStreak',
    icon: '⚡'
  },
  {
    id: 'perfect_week',
    title: 'Perfect Alignment',
    description: 'Achieve 7 perfect days.',
    threshold: 7,
    metric: 'perfectDays',
    icon: '🌟'
  },
  {
    id: 'master',
    title: 'Orbit Master',
    description: 'Complete 100 habits total.',
    threshold: 100,
    metric: 'totalCompleted',
    icon: '👑'
  }
];

export const getUnlockedAchievements = (stats: UserStats) => {
  return ACHIEVEMENTS_LIST.filter(achievement => {
    return stats[achievement.metric as keyof UserStats] >= achievement.threshold;
  }).map(a => a.id);
};

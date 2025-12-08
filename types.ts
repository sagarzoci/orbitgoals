import React from 'react';

export interface Goal {
  id: string;
  title: string;
  color: string;
  icon: string;
  createdAt: string;
  time?: string;
  reminderEnabled?: boolean;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  smartReminders: boolean;
  reminderTime: string; // HH:MM format, e.g., "09:00"
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  phoneNumber?: string;
  bio?: string;
  coins?: number;
  country?: string; // ISO Code e.g. 'US', 'IN', 'JP'
  unlockedThemes?: string[];
  activeTheme?: string;
  // New Shop Features
  unlockedAvatars?: string[];
  activeAvatarFrame?: string;
  activeBoosterExpiry?: number; // Timestamp for when booster expires
  isPro?: boolean; // Premium status
  notificationSettings?: NotificationSettings;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  points: number;
  tasksCompleted: number;
  rank?: number;
  country?: string;
  tier?: string;
  avatarFrame?: string; // Visual frame class
}

export type CompletionStatus = 'completed' | 'skipped' | 'pending';

// Map of dateString (YYYY-MM-DD) -> { goalId: status }
export interface DailyLogs {
  [date: string]: {
    [goalId: string]: CompletionStatus;
  };
}

export interface AIAnalysisResult {
  summary: string;
  score: number;
  tips: string[];
  motivationalQuote: string;
}

export interface HabitSuggestion {
  title: string;
  reason: string;
  icon: string;
  color: string;
  time?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface WeeklyReviewData {
  weekScore: number;
  summary: string;
  bestDay: string;
  focusArea: string;
  actionItem: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // Store icon name or component ref logic
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalCompleted: number;
  currentStreak: number; // Highest current streak among all goals
  perfectDays: number;
  totalPoints: number;
  level: number;
}

export interface ShopItem {
  id: string;
  type: 'theme' | 'coupon' | 'badge' | 'avatar' | 'booster' | 'premium';
  title: string;
  description: string;
  cost: number; // 0 for real money items
  value?: string; // Hex code for theme, class for avatar, or coupon code
  icon: React.ReactNode;
}

export const ICONS = ['🎯', '💧', '🏃', '📚', '🧘', '💰', '🥦', '💻', '🎨', '🎵', '🛌', '💊', '🧹', '🧠'];
export const COLORS = [
  'bg-emerald-500', 
  'bg-blue-500', 
  'bg-purple-500', 
  'bg-rose-500', 
  'bg-amber-500', 
  'bg-cyan-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500'
];

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'Global', name: 'Earth', flag: '🌍' }
];
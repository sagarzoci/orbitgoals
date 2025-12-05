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

export interface User {
  id: string;
  email: string;
  name: string;
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

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'agent';
  timestamp: any;
  isTyping?: boolean;
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
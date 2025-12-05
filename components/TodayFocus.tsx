import React, { useState } from 'react';
import { Goal, DailyLogs, CompletionStatus } from '../types';
import { Check, X, Flame, RotateCcw, Clock, Bell, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { POINTS_PER_COMPLETION } from '../services/gamification';
import Mascot, { MascotMood } from './Mascot';

interface TodayFocusProps {
  goals: Goal[];
  logs: DailyLogs;
  onToggle: (goalId: string, status: CompletionStatus) => void;
}

// XP Pop-up Component
const XPPopup: React.FC<{ value: number; x: number; y: number }> = ({ value, x, y }) => (
  <motion.div
    initial={{ opacity: 1, y: 0, scale: 0.5 }}
    animate={{ opacity: 0, y: -50, scale: 1.5 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="fixed z-50 pointer-events-none text-amber-400 font-bold text-xl drop-shadow-md flex items-center gap-1"
    style={{ left: x, top: y }}
  >
    <Zap size={20} fill="currentColor" /> +{value} XP
  </motion.div>
);

const TodayFocus: React.FC<TodayFocusProps> = ({ goals, logs, onToggle }) => {
  const [xpPopups, setXpPopups] = useState<{ id: number; val: number; x: number; y: number }[]>([]);
  const [mascotMood, setMascotMood] = useState<MascotMood>(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const calculateStreak = (goalId: string) => {
    let streak = 0;
    const d = new Date(today);
    
    // Check if today is done
    const isTodayDone = logs[todayStr]?.[goalId] === 'completed';
    if (isTodayDone) streak++;

    // Iterate backwards
    for (let i = 1; i < 365; i++) {
      const prevDate = new Date(d);
      prevDate.setDate(prevDate.getDate() - i);
      const prevStr = prevDate.toISOString().split('T')[0];
      if (logs[prevStr]?.[goalId] === 'completed') streak++;
      else break;
    }
    return streak;
  };

  const handleAction = (e: React.MouseEvent, goalId: string, type: 'complete' | 'skip' | 'undo') => {
    // 1. Audio & Mascot
    if (type === 'complete') {
        audioService.playSuccess();
        setMascotMood('success');
    }
    if (type === 'skip') {
        audioService.playSkip();
        setMascotMood('skip');
    }
    if (type === 'undo') {
        audioService.playUndo();
        setMascotMood('undo');
    }

    // 2. Visual Rewards (Confetti & XP)
    if (type === 'complete') {
        // Trigger Confetti
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
        const yRatio = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 60,
            spread: 60,
            origin: { x: xRatio, y: yRatio },
            colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
            disableForReducedMotion: true,
            zIndex: 90
        });

        // Trigger XP Popup
        const newPopup = {
            id: Date.now(),
            val: POINTS_PER_COMPLETION,
            x: e.clientX,
            y: e.clientY - 20
        };
        setXpPopups(prev => [...prev, newPopup]);
        
        // Cleanup popup after animation
        setTimeout(() => {
            setXpPopups(prev => prev.filter(p => p.id !== newPopup.id));
        }, 1000);
    }

    // 3. State Update
    const statusMap = {
        'complete': 'completed',
        'skip': 'skipped',
        'undo': 'pending'
    };
    onToggle(goalId, statusMap[type] as CompletionStatus);
  };

  const completedCount = goals.filter(g => logs[todayStr]?.[g.id] === 'completed').length;
  const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;
  
  // Sort goals
  const sortedGoals = [...goals].sort((a, b) => {
    // Put pending first
    const statusA = logs[todayStr]?.[a.id] || 'pending';
    const statusB = logs[todayStr]?.[b.id] || 'pending';
    if (statusA === 'pending' && statusB !== 'pending') return -1;
    if (statusA !== 'pending' && statusB === 'pending') return 1;
    
    // Then by time
    if (a.time && b.time) return a.time.localeCompare(b.time);
    return 0;
  });

  return (
    <div className="mb-8 animate-fade-in relative">
      <Mascot mood={mascotMood} onComplete={() => setMascotMood(null)} />

      {/* Render XP Popups */}
      {xpPopups.map(p => (
        <XPPopup key={p.id} value={p.val} x={p.x} y={p.y} />
      ))}

      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Today's Focus
            <span className="text-sm font-normal text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700">
              {new Date().toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            You have completed <span className="text-indigo-400 font-bold">{completedCount}</span> of <span className="text-slate-300 font-bold">{goals.length}</span> goals today.
          </p>
        </div>
        
        {/* Progress Bar with Bounce Effect */}
        <div className="hidden sm:block w-32 md:w-48">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <motion.span 
                key={progress} 
                initial={{ scale: 1.5, color: '#fff' }} 
                animate={{ scale: 1, color: '#64748b' }}
            >
                {Math.round(progress)}%
            </motion.span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode='popLayout'>
        {sortedGoals.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="col-span-full p-8 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500"
          >
            No goals set yet. Click "New Goal" to get started!
          </motion.div>
        ) : (
          sortedGoals.map(goal => {
            const status = logs[todayStr]?.[goal.id] || 'pending';
            const streak = calculateStreak(goal.id);
            const isCompleted = status === 'completed';
            const isSkipped = status === 'skipped';

            return (
              <motion.div 
                layout
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`
                  relative p-4 rounded-2xl border transition-colors duration-300 group
                  ${isCompleted 
                    ? 'bg-slate-800/80 border-indigo-500/30 shadow-lg shadow-indigo-500/10' 
                    : isSkipped 
                      ? 'bg-slate-900/40 border-slate-800 opacity-60 grayscale-[0.5]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }
                `}
              >
                {/* Time Badge */}
                {goal.time && (
                    <div className={`absolute top-4 right-4 text-xs font-medium flex items-center gap-1.5 ${isCompleted ? 'text-indigo-300' : 'text-slate-400'}`}>
                        <Clock size={12} />
                        {goal.time}
                    </div>
                )}

                <div className="flex justify-between items-start mt-2">
                  <div className="flex items-center gap-3">
                    <motion.div 
                        whileTap={{ scale: 0.8 }}
                        className={`
                          w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors
                          ${isCompleted ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' : 'bg-slate-800 text-slate-400'}
                          ${isSkipped ? 'bg-slate-800 text-slate-600' : ''}
                        `}
                    >
                      {goal.icon}
                    </motion.div>
                    <div>
                      <h3 className={`font-bold ${isCompleted ? 'text-white' : 'text-slate-200'} pr-8`}>
                        {goal.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <Flame size={12} className={streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-600'} />
                        <span className={streak > 0 ? 'text-amber-500 font-bold' : ''}>
                          {streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-800/50">
                  {status === 'pending' ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, rotate: -5 }}
                        onClick={(e) => handleAction(e, goal.id, 'skip')}
                        className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-rose-400 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <X size={16} /> Skip
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleAction(e, goal.id, 'complete')}
                        className="flex-[2] py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <Check size={18} strokeWidth={3} /> DONE
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAction(e, goal.id, 'undo')}
                      className={`
                        w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider
                        ${isCompleted 
                          ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' 
                          : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                        }
                      `}
                    >
                      <RotateCcw size={12} />
                      Undo Status
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodayFocus;

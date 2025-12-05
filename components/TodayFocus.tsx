import React from 'react';
import { Goal, DailyLogs, CompletionStatus } from '../types';
import { Check, X, Flame, Circle, RotateCcw, Clock, Bell } from 'lucide-react';

interface TodayFocusProps {
  goals: Goal[];
  logs: DailyLogs;
  onToggle: (goalId: string, status: CompletionStatus) => void;
}

const TodayFocus: React.FC<TodayFocusProps> = ({ goals, logs, onToggle }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const calculateStreak = (goalId: string) => {
    let streak = 0;
    const d = new Date(today);
    
    // Check if today is done, if so start counting from today, else start from yesterday
    const isTodayDone = logs[todayStr]?.[goalId] === 'completed';
    if (isTodayDone) streak++;

    // Iterate backwards
    for (let i = 1; i < 365; i++) {
      const prevDate = new Date(d);
      prevDate.setDate(prevDate.getDate() - i);
      
      const pYear = prevDate.getFullYear();
      const pMonth = String(prevDate.getMonth() + 1).padStart(2, '0');
      const pDay = String(prevDate.getDate()).padStart(2, '0');
      const pDateStr = `${pYear}-${pMonth}-${pDay}`;

      if (logs[pDateStr]?.[goalId] === 'completed') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Helper to format 24h string "14:30" to "2:30 PM"
  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(h), parseInt(m));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const completedCount = goals.filter(g => logs[todayStr]?.[g.id] === 'completed').length;
  const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  // Sort goals: Time-based first (sorted by time), then others
  const sortedGoals = [...goals].sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time);
    if (a.time) return -1;
    if (b.time) return 1;
    return 0;
  });

  return (
    <div className="mb-8 animate-fade-in">
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
        
        {/* Simple Progress Bar */}
        <div className="hidden sm:block w-32 md:w-48">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedGoals.length === 0 ? (
          <div className="col-span-full p-8 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500">
            No goals set yet. Click "New Goal" to get started!
          </div>
        ) : (
          sortedGoals.map(goal => {
            const status = logs[todayStr]?.[goal.id] || 'pending';
            const streak = calculateStreak(goal.id);
            const isCompleted = status === 'completed';
            const isSkipped = status === 'skipped';

            return (
              <div 
                key={goal.id}
                className={`
                  relative p-4 rounded-2xl border transition-all duration-300 group
                  ${isCompleted 
                    ? 'bg-slate-800/80 border-indigo-500/30 shadow-lg shadow-indigo-500/10' 
                    : isSkipped 
                      ? 'bg-slate-800/40 border-rose-500/20 opacity-75'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }
                `}
              >
                {/* Time Badge (Top Right) */}
                {goal.time && (
                    <div className={`absolute top-4 right-4 text-xs font-medium flex items-center gap-1.5 ${isCompleted ? 'text-indigo-300' : 'text-slate-400'}`}>
                        <Clock size={12} />
                        {formatTime(goal.time)}
                        {goal.reminderEnabled && <Bell size={10} className={isCompleted ? 'text-indigo-400' : 'text-amber-500'} />}
                    </div>
                )}

                <div className="flex justify-between items-start mt-2">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors
                      ${isCompleted ? 'bg-indigo-500/20' : 'bg-slate-800'}
                    `}>
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isCompleted ? 'text-white' : 'text-slate-200'} pr-12`}>
                        {goal.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Flame size={12} className={streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-600'} />
                        <span className={streak > 0 ? 'text-amber-500 font-medium' : ''}>
                          {streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  {status === 'pending' ? (
                    <>
                      <button
                        onClick={() => onToggle(goal.id, 'skipped')}
                        className="p-2 rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                        title="Skip"
                      >
                        <X size={18} />
                      </button>
                      <button
                        onClick={() => onToggle(goal.id, 'completed')}
                        className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95"
                        title="Complete"
                      >
                        <Check size={18} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onToggle(goal.id, 'pending')}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors
                        ${isCompleted 
                          ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' 
                          : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                        }
                      `}
                    >
                      <RotateCcw size={12} />
                      Undo
                    </button>
                  )}
                </div>

                {/* Progress bar hint at bottom */}
                {isCompleted && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500/50 rounded-b-2xl animate-pulse" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodayFocus;
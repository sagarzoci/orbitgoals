import React, { useState } from 'react';
import { DailyLogs, Goal } from '../types';
import { ChevronLeft, ChevronRight, Check, Trophy, Calendar as CalendarIcon, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  logs: DailyLogs;
  goals: Goal[];
  onDayClick: (dateStr: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ 
  currentDate, 
  onDateChange, 
  logs, 
  goals,
  onDayClick
}) => {
  const [direction, setDirection] = useState(0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();
  
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Calculate Month Stats
  let monthCompleted = 0;
  let monthTotal = 0;
  
  // Iterate strictly through the days of this specific month
  for (let d = 1; d <= daysInMonth; d++) {
     const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
     const dayLogs = logs[dStr] || {};
     const completed = Object.values(dayLogs).filter(s => s === 'completed').length;
     // Only count towards total if there are goals
     if (goals.length > 0) {
         monthTotal += goals.length;
         monthCompleted += completed;
     }
  }
  
  const monthEfficiency = monthTotal > 0 ? Math.round((monthCompleted / monthTotal) * 100) : 0;

  const navigateMonth = (dir: number) => {
    setDirection(dir);
    onDateChange(new Date(year, month + dir, 1));
  };

  const jumpToToday = () => {
    const now = new Date();
    const diff = now.getMonth() - month + (12 * (now.getFullYear() - year));
    setDirection(diff > 0 ? 1 : -1);
    onDateChange(now);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0
    })
  };

  const generateDays = () => {
    const days = [];
    const todayStr = new Date().toISOString().split('T')[0];

    // Padding for start of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 sm:h-24 md:h-32 bg-transparent" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayLogs = logs[dateStr] || {};
      const completedCount = Object.values(dayLogs).filter(s => s === 'completed').length;
      const totalGoals = goals.length;
      
      const isToday = dateStr === todayStr;
      const isFuture = dateStr > todayStr;
      
      const intensity = totalGoals > 0 ? completedCount / totalGoals : 0;
      const isPerfect = totalGoals > 0 && completedCount === totalGoals;

      // Dynamic Background based on intensity
      const bgOpacity = isFuture ? 0 : Math.max(0.05, intensity * 0.4); 
      
      days.push(
        <motion.div 
          key={dateStr}
          onClick={() => onDayClick(dateStr)}
          whileHover={{ scale: 0.98, translateY: -2 }}
          className={`
            relative h-16 sm:h-24 md:h-32 rounded-xl sm:rounded-2xl border p-1 sm:p-3 cursor-pointer overflow-hidden group
            transition-colors duration-300 flex flex-col justify-between
            ${isToday ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] ring-1 ring-indigo-400' : 'border-slate-800 hover:border-slate-600'}
            ${isPerfect ? 'border-emerald-500/50' : ''}
          `}
        >
            {/* Background Heatmap Effect */}
            <div 
                className={`absolute inset-0 bg-indigo-600 transition-opacity duration-500 pointer-events-none`}
                style={{ opacity: bgOpacity }}
            />
            
            {/* Pulsing Glow for Today */}
            {isToday && (
                <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/40 animate-pulse pointer-events-none" />
            )}
            
            {/* Top Row: Date & Badges */}
            <div className="relative z-10 flex justify-between items-start">
                <span className={`
                  text-xs sm:text-sm font-bold w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg transition-colors
                  ${isToday ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'text-slate-400 bg-slate-900/40'}
                `}>
                  {day}
                </span>
                
                {isPerfect && !isFuture && (
                   <div className="bg-emerald-500 text-white p-0.5 sm:p-1 rounded-full shadow-lg shadow-emerald-900/20 animate-pulse">
                     <Trophy className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" />
                   </div>
                )}
            </div>

            {/* Bottom Row: Dots with Time Tooltips */}
            <div className="relative z-10 flex flex-wrap gap-0.5 sm:gap-1.5 content-end">
                {goals.slice(0, 8).map((g, i) => {
                  const status = dayLogs[g.id];
                  let dotClass = 'bg-slate-800 ring-1 ring-slate-700'; // Default pending/future
                  
                  if (status === 'completed') {
                      dotClass = `${g.color} ring-0 shadow-[0_0_8px_rgba(255,255,255,0.3)]`;
                  } else if (status === 'skipped') {
                      dotClass = 'bg-rose-500/20 ring-1 ring-rose-500/50';
                  }

                  // Format time for tooltip
                  const timeLabel = g.time ? ` @ ${g.time}` : '';
                  const tooltip = `${g.title}${timeLabel}: ${status || 'pending'}`;

                  // Hide dots > 5 on small screens to prevent overflow
                  const visibilityClass = i >= 4 ? 'hidden sm:block' : '';

                  return (
                    <div 
                      key={g.id} 
                      className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${dotClass} cursor-help ${visibilityClass}`}
                      title={tooltip}
                    />
                  );
                })}
                {goals.length > 8 && (
                    <span className="text-[8px] sm:text-[10px] text-slate-500 flex items-center">+</span>
                )}
            </div>
            
            {/* Hover Indicator */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
      );
    }
    return days;
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-4 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">{monthName}</h2>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                {monthEfficiency}% Consistency
            </div>
        </div>
        
        <div className="flex items-center bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
          <button 
             onClick={() => navigateMonth(-1)} 
             className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={jumpToToday}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition border-x border-slate-700 mx-1"
          >
            Today
          </button>
          <button 
             onClick={() => navigateMonth(1)} 
             className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-3 mb-2 sm:mb-4 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest py-1 sm:py-2">
            <span className="hidden sm:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</span>
            <span className="sm:hidden">{d}</span>
          </div>
        ))}
      </div>
      
      {/* Animated Grid */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={month + '-' + year}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-1 sm:gap-3"
        >
          {generateDays()}
        </motion.div>
      </AnimatePresence>
      
      {/* Legend / Footer info */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
         <div className="flex gap-2 sm:gap-4 flex-wrap">
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-500"></div>
                 <span>Done</span>
             </div>
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500"></div>
                 <span>Perfect</span>
             </div>
             <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-rose-500/20 ring-1 ring-rose-500/50"></div>
                 <span>Skip</span>
             </div>
         </div>
         <div className="hidden sm:block">
            {goals.length} active goals
         </div>
      </div>
    </div>
  );
};

export default Calendar;
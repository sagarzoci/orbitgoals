import React, { useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Goal, DailyLogs, User } from '../types';
import { Lock, Download, Crown, TrendingUp, Calendar, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { generatePDFReport } from '../services/reportService';
import { calculateStats } from '../services/gamification';

interface AnalyticsViewProps {
  user: User | null;
  goals: Goal[];
  logs: DailyLogs;
  currentDate: Date;
  onOpenShop: () => void;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ user, goals, logs, currentDate, onOpenShop }) => {
  const isPro = user?.isPro || false;

  // --- Data Preparation ---

  // 1. Habit Health (Success Rate per Goal)
  const habitHealthData = useMemo(() => {
    return goals.map(goal => {
      const logsValues = Object.values(logs);
      const totalDays = Object.keys(logs).length || 1; // Avoid div by zero
      const completed = Object.keys(logs).filter(d => logs[d][goal.id] === 'completed').length;
      return {
        name: goal.title,
        rate: Math.round((completed / totalDays) * 100),
        completed,
        color: goal.color
      };
    }).sort((a, b) => b.rate - a.rate);
  }, [goals, logs]);

  const bestHabit = habitHealthData[0];
  const worstHabit = habitHealthData[habitHealthData.length - 1];

  // 2. Consistency Trend (Last 30 Days)
  const trendData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayLogs = logs[dateStr] || {};
      const completed = Object.values(dayLogs).filter(s => s === 'completed').length;
      
      data.push({
        date: d.toLocaleDateString('default', { day: 'numeric', month: 'short' }),
        completed: completed
      });
    }
    return data;
  }, [logs]);

  // 3. Day of Week Analysis (Missed Day Analysis)
  const dayOfWeekData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = new Array(7).fill(0);
    const totals = new Array(7).fill(0);

    Object.keys(logs).forEach(dateStr => {
      const date = new Date(dateStr);
      const dayIndex = date.getDay(); // 0-6
      
      const dayLogs = logs[dateStr];
      goals.forEach(g => {
        totals[dayIndex]++;
        if (dayLogs[g.id] === 'completed') {
          counts[dayIndex]++;
        }
      });
    });

    return days.map((day, i) => ({
      day,
      rate: totals[i] > 0 ? Math.round((counts[i] / totals[i]) * 100) : 0,
      fullMark: 100
    }));
  }, [logs, goals]);

  // Helper to resolve tailwind color classes to hex for charts
  const getColorHex = (twClass: string) => {
    if (twClass.includes('emerald')) return '#10b981';
    if (twClass.includes('blue')) return '#3b82f6';
    if (twClass.includes('purple')) return '#a855f7';
    if (twClass.includes('rose')) return '#f43f5e';
    if (twClass.includes('amber')) return '#f59e0b';
    if (twClass.includes('cyan')) return '#06b6d4';
    if (twClass.includes('pink')) return '#ec4899';
    if (twClass.includes('indigo')) return '#6366f1';
    return '#94a3b8';
  };

  const handleDownloadReport = () => {
    if (user) {
       // Calc fresh stats
       const stats = calculateStats(goals, logs, user.coins || 0); // Reuse logic
       generatePDFReport(user, goals, logs, stats, currentDate);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
             Mission Analytics
             {isPro && <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-500/20">PRO ACTIVE</span>}
           </h2>
           <p className="text-slate-400 text-sm mt-1">Deep dive into your orbital trajectory.</p>
        </div>
        <button 
          onClick={handleDownloadReport}
          disabled={!isPro}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition shadow-lg
            ${isPro 
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}
          `}
        >
          {isPro ? <Download size={18} /> : <Lock size={18} />}
          <span>Export Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Target size={60} /></div>
            <div className="text-slate-400 text-sm font-medium mb-1">Best Performing Habit</div>
            <div className="text-xl font-bold text-emerald-400 truncate">{bestHabit?.name || 'N/A'}</div>
            <div className="text-xs text-slate-500 mt-2">{bestHabit?.rate || 0}% Success Rate</div>
         </div>

         <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><AlertTriangle size={60} /></div>
            <div className="text-slate-400 text-sm font-medium mb-1">Needs Attention</div>
            <div className="text-xl font-bold text-rose-400 truncate">{worstHabit?.name || 'N/A'}</div>
            <div className="text-xs text-slate-500 mt-2">{worstHabit?.rate || 0}% Success Rate</div>
         </div>

         <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Calendar size={60} /></div>
            <div className="text-slate-400 text-sm font-medium mb-1">Total Logs</div>
            <div className="text-xl font-bold text-indigo-400">{Object.keys(logs).length}</div>
            <div className="text-xs text-slate-500 mt-2">Data points collected</div>
         </div>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
         
         {/* 1. Habit Health (Available to All) */}
         <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <CheckCircle2 className="text-emerald-400" size={20} /> Habit Health
            </h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={habitHealthData} layout="vertical" margin={{ left: 10, right: 10 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                        cursor={{ fill: '#334155', opacity: 0.2 }}
                     />
                     <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={20}>
                        {habitHealthData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={getColorHex(entry.color)} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* 2. Consistency Trend (Partially Locked) */}
         <div className="relative bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <TrendingUp className="text-indigo-400" size={20} /> Consistency Trend
            </h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                     <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                     <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} minTickGap={30} />
                     <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                     <Area type="monotone" dataKey="completed" stroke="#6366f1" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* 3. Day Analysis (Premium Only) */}
         <div className="relative bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 overflow-hidden lg:col-span-2">
            
            {!isPro && (
               <div className="absolute inset-0 z-10 backdrop-blur-md bg-slate-900/60 flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-slate-800 p-4 rounded-full mb-4 shadow-xl border border-amber-500/30">
                     <Crown size={32} className="text-amber-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Unlock Advanced Analytics</h4>
                  <p className="text-slate-400 mb-6 max-w-md">See your Missed Day Analysis and download PDF reports with the Premium plan.</p>
                  <button 
                    onClick={onOpenShop}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-sm transition shadow-lg shadow-indigo-500/20"
                  >
                     Available in Shop
                  </button>
               </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1 w-full">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                     <Calendar className="text-purple-400" size={20} /> Weekday Performance
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">Which days do you crush it? Which do you miss?</p>
                  <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dayOfWeekData}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                           <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                           <Tooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                           <Bar dataKey="rate" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={32} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               
               {/* Radar Chart for visual flair */}
               <div className="w-full md:w-1/3 h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dayOfWeekData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Success Rate" dataKey="rate" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                     </RadarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
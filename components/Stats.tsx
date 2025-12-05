import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { Goal, DailyLogs } from '../types';

interface StatsProps {
  goals: Goal[];
  logs: DailyLogs;
  currentDate: Date;
}

const Stats: React.FC<StatsProps> = ({ goals, logs, currentDate }) => {
  // 1. Calculate completion rate per goal
  const goalStats = goals.map(goal => {
    let completed = 0;
    let totalDays = 0;
    
    // Filter logs for the current month only
    const currentMonthPrefix = currentDate.toISOString().slice(0, 7); // YYYY-MM
    
    Object.keys(logs).forEach(dateStr => {
      if (dateStr.startsWith(currentMonthPrefix)) {
        totalDays++;
        if (logs[dateStr][goal.id] === 'completed') {
          completed++;
        }
      }
    });

    return {
      name: goal.title,
      completed,
      rate: totalDays > 0 ? Math.round((completed / totalDays) * 100) : 0,
      color: goal.color.replace('bg-', 'text-').replace('-500', '-400') // Rough map to hex handled by css vars usually, but here using Tailwind colors in logic is tricky for recharts. 
      // We will use standard hex for charts
    };
  });

  // Helper to map tailwind class to rough hex
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

  const data = goalStats.sort((a, b) => b.rate - a.rate);

  // Overall Completion Pie Data
  let totalCompleted = 0;
  let totalSkipped = 0;
  let totalPending = 0;
  
  const currentMonthPrefix = currentDate.toISOString().slice(0, 7);
  // We need to count based on days in month vs logged days
  // Just summarizing existing logs for simplicity of visualization
  Object.keys(logs).forEach(dateStr => {
    if (dateStr.startsWith(currentMonthPrefix)) {
      goals.forEach(g => {
        const status = logs[dateStr][g.id];
        if (status === 'completed') totalCompleted++;
        else if (status === 'skipped') totalSkipped++;
        else totalPending++; // Note: 'pending' isn't explicitly stored usually, but if we stored it
      });
    }
  });
  
  const pieData = [
    { name: 'Done', value: totalCompleted, color: '#10b981' },
    { name: 'Skipped', value: totalSkipped, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  if (goals.length === 0) {
    return <div className="text-slate-500 text-center py-10">Add goals to see statistics.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Bar Chart: Goal Consistency */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Goal Consistency (%)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100} 
                tick={{ fill: '#cbd5e1', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                cursor={{ fill: '#334155', opacity: 0.4 }}
              />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorHex(goals.find(g => g.title === entry.name)?.color || '')} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart: Overall Status */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-slate-100 mb-2">Monthly Breakdown</h3>
        <div className="h-56 w-full flex items-center justify-center">
          {pieData.length > 0 ? (
             <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={pieData}
                 cx="50%"
                 cy="50%"
                 innerRadius={60}
                 outerRadius={80}
                 paddingAngle={5}
                 dataKey="value"
               >
                 {pieData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
             </PieChart>
           </ResponsiveContainer>
          ) : (
            <div className="text-slate-500">No logs yet this month</div>
          )}
        </div>
        <div className="flex gap-4 mt-4 text-sm">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-300">Completed</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <span className="text-slate-300">Skipped</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

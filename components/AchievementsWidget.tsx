
import React from 'react';
import { UserStats, DailyLogs } from '../types';
import { ACHIEVEMENTS_LIST, getUnlockedAchievements } from '../services/gamification';
import { Trophy, Award, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementsWidgetProps {
  stats: UserStats;
}

const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ stats }) => {
  const unlockedIds = getUnlockedAchievements(stats);
  const nextLevelPoints = stats.level * 200;
  const progress = Math.min(100, (stats.totalPoints / nextLevelPoints) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[50px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="text-amber-400" size={20} />
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">Level {stats.level}</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Explorer</h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-400">{stats.totalPoints}</div>
            <div className="text-xs text-slate-500 uppercase font-medium">Total Points</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-8">
           <div className="flex justify-between text-xs text-slate-400 mb-2">
             <span>Progress to Level {stats.level + 1}</span>
             <span>{stats.totalPoints} / {nextLevelPoints} XP</span>
           </div>
           <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
             />
           </div>
        </div>

        {/* Badges Grid */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <Award size={16} className="text-slate-500" />
            Badges ({unlockedIds.length}/{ACHIEVEMENTS_LIST.length})
          </h3>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {ACHIEVEMENTS_LIST.map((achievement) => {
              const isUnlocked = unlockedIds.includes(achievement.id);
              return (
                <div 
                  key={achievement.id}
                  className={`
                    group relative aspect-square rounded-xl flex items-center justify-center border transition-all duration-300
                    ${isUnlocked 
                      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                      : 'bg-slate-900 border-slate-800 opacity-50 grayscale'}
                  `}
                  title={isUnlocked ? `${achievement.title}: Unlocked!` : `${achievement.title}: ${achievement.description}`}
                >
                  <span className={`text-2xl ${isUnlocked ? 'scale-100' : 'scale-75 opacity-50'}`}>
                    {achievement.icon}
                  </span>
                  
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                      <Lock size={12} className="text-slate-600" />
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-slate-900 border border-slate-700 text-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                    <div className={`text-xs font-bold mb-0.5 ${isUnlocked ? 'text-amber-400' : 'text-slate-400'}`}>{achievement.title}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsWidget;

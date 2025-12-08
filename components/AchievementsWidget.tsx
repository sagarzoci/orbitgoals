import React from 'react';
import { UserStats } from '../types';
import { ACHIEVEMENTS_LIST, getUnlockedAchievements, getTierInfo } from '../services/gamification';
import { Trophy, Award, Zap, Lock, Crown, Gem } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementsWidgetProps {
  stats: UserStats;
}

const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ stats }) => {
  const unlockedIds = getUnlockedAchievements(stats);
  const tierInfo = getTierInfo(stats.level);
  
  // Calculate progress within current level logic
  // Since level = floor(points / 200) + 1
  // Current Level Start Points = (Level - 1) * 200
  // Next Level Points = Level * 200
  const currentLevelStart = (stats.level - 1) * 200;
  const nextLevelThreshold = stats.level * 200;
  const pointsInLevel = stats.totalPoints - currentLevelStart;
  const progressPercent = Math.min(100, (pointsInLevel / 200) * 100);

  const getTierIcon = () => {
    if (tierInfo.name === 'Diamond') return <Gem size={24} className={tierInfo.color} />;
    if (tierInfo.name === 'Gold') return <Crown size={24} className={tierInfo.color} />;
    return <Trophy size={24} className={tierInfo.color} />;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] pointer-events-none opacity-20 ${tierInfo.name === 'Diamond' ? 'bg-cyan-500' : tierInfo.name === 'Gold' ? 'bg-yellow-500' : 'bg-amber-700'}`} />

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getTierIcon()}
              <span className={`text-xs font-bold tracking-wider uppercase ${tierInfo.color}`}>{tierInfo.name} Tier</span>
            </div>
            <div className="flex items-baseline gap-2">
               <h2 className="text-3xl font-bold text-white">Level {stats.level}</h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-400 flex items-center justify-end gap-1">
              <Zap size={20} className="fill-indigo-400" />
              {stats.totalPoints}
            </div>
            <div className="text-xs text-slate-500 uppercase font-medium">Total XP</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-8 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
           <div className="flex justify-between text-xs text-slate-300 mb-2 font-medium">
             <span>Progress to Level {stats.level + 1}</span>
             <span>{Math.floor(pointsInLevel)} / 200 XP</span>
           </div>
           <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progressPercent}%` }}
               transition={{ duration: 1, ease: "easeOut" }}
               className={`h-full bg-gradient-to-r ${tierInfo.name === 'Diamond' ? 'from-cyan-500 to-blue-600' : tierInfo.name === 'Gold' ? 'from-yellow-400 to-amber-600' : 'from-indigo-500 to-purple-600'}`}
             />
           </div>
           <p className="text-[10px] text-slate-500 mt-2 text-center">
             {tierInfo.nextTierLevel > stats.level 
                ? `Reach Level ${tierInfo.nextTierLevel} to unlock ${getTierInfo(tierInfo.nextTierLevel).name} Tier` 
                : "Maximum Tier Reached!"}
           </p>
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
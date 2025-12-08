import React from 'react';
import { LeaderboardEntry, COUNTRIES } from '../types';
import { UserCircle, Trophy, Medal, Zap, CheckCircle2, Crown, Shield, Gem } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
  index: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, isCurrentUser, index }) => {
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <div className="relative"><Trophy className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" size={28} /><motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-amber-400 blur-xl opacity-20 rounded-full" /></div>;
      case 2: return <Medal className="text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" size={26} />;
      case 3: return <Medal className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" size={26} />;
      default: return <span className="font-bold text-slate-500 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm border border-slate-700">{rank}</span>;
    }
  };

  const getTierIcon = (tier?: string) => {
    switch(tier) {
      case 'Diamond': return <Gem size={14} className="text-cyan-400" />;
      case 'Gold': return <Crown size={14} className="text-amber-400" />;
      case 'Silver': return <Shield size={14} className="text-slate-300" />;
      case 'Bronze': return <Shield size={14} className="text-amber-700" />;
      default: return null;
    }
  };

  const flag = COUNTRIES.find(c => c.code === entry.country)?.flag || '🌍';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group
        ${isCurrentUser 
          ? 'bg-gradient-to-r from-indigo-900/40 to-slate-900/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
          : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/60'
        }
      `}
    >
      {/* Highlight effect for user */}
      {isCurrentUser && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>}

      {/* Rank */}
      <div className="flex-shrink-0 w-10 flex justify-center items-center">
        {getRankIcon(entry.rank || index + 1)}
      </div>

      {/* Avatar with Frame */}
      <div className="flex-shrink-0 relative">
        <div className={`rounded-full p-0.5 ${entry.avatarFrame || ''}`}>
          {entry.photoURL ? (
            <img 
              src={entry.photoURL} 
              alt={entry.displayName} 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-slate-600 transition-all relative z-10"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 flex items-center justify-center ring-2 ring-slate-800 group-hover:ring-slate-600 transition-all text-slate-500 relative z-10">
              <UserCircle size={28} />
            </div>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 z-20 bg-slate-900 rounded-full p-0.5 border border-slate-700 text-xs shadow-sm" title={entry.country}>
          {flag}
        </div>
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
            <h3 className={`font-bold truncate text-sm sm:text-base ${isCurrentUser ? 'text-indigo-300' : 'text-slate-200'}`}>
            {entry.displayName} {isCurrentUser && '(You)'}
            </h3>
            {entry.tier && (
                <div className="hidden xs:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {getTierIcon(entry.tier)}
                    {entry.tier}
                </div>
            )}
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1"><CheckCircle2 size={10} /> {entry.tasksCompleted} tasks</span>
          {entry.tier && <span className="xs:hidden opacity-70">{entry.tier}</span>}
        </div>
      </div>

      {/* Points */}
      <div className="flex-shrink-0 text-right min-w-[80px]">
        <div className="font-black text-white text-lg sm:text-xl flex items-center justify-end gap-1 tracking-tight">
          <Zap size={16} className="text-amber-400 fill-amber-400" />
          {entry.points.toLocaleString()}
        </div>
        <div className="text-[10px] text-indigo-400/60 uppercase tracking-widest font-bold">Points</div>
      </div>
    </motion.div>
  );
};

export default LeaderboardRow;
import React from 'react';
import { LeaderboardEntry } from '../types';
import { UserCircle, Trophy, Medal, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
  index: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, isCurrentUser, index }) => {
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" size={24} />;
      case 2: return <Medal className="text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" size={24} />;
      case 3: return <Medal className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" size={24} />;
      default: return <span className="font-bold text-slate-500 w-6 text-center">{rank}</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
        ${isCurrentUser 
          ? 'bg-indigo-900/30 border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
          : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/60'
        }
      `}
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-8 flex justify-center">
        {getRankIcon(entry.rank || index + 1)}
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0">
        {entry.photoURL ? (
          <img 
            src={entry.photoURL} 
            alt={entry.displayName} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center ring-2 ring-slate-800">
            <UserCircle className="text-slate-500" size={24} />
          </div>
        )}
      </div>

      {/* Name */}
      <div className="flex-grow min-w-0">
        <h3 className={`font-semibold truncate ${isCurrentUser ? 'text-indigo-300' : 'text-slate-200'}`}>
          {entry.displayName} {isCurrentUser && '(You)'}
        </h3>
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <CheckCircle2 size={10} />
          {entry.tasksCompleted} tasks done
        </div>
      </div>

      {/* Points */}
      <div className="flex-shrink-0 text-right min-w-[80px]">
        <div className="font-bold text-white text-lg flex items-center justify-end gap-1">
          <Zap size={14} className="text-amber-400 fill-amber-400" />
          {entry.points}
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Points</div>
      </div>
    </motion.div>
  );
};

export default LeaderboardRow;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchLeaderboard } from '../services/leaderboardService';
import { LeaderboardEntry } from '../types';
import LeaderboardRow from '../components/LeaderboardRow';
import { ArrowLeft, Trophy, Calendar, Clock, RefreshCw, Filter, Users, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

type FilterType = 'global' | 'country' | 'friends';

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [filter, setFilter] = useState<FilterType>('global');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(period, user, filter);
      setEntries(data);
      setLoading(false);
    };
    loadData();
  }, [period, filter, user]);

  const currentUserEntry = entries.find(e => e.userId === user?.id);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-indigo-500/30 pb-24">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/app')} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-2 font-bold text-white">
            <Trophy className="text-amber-500" size={20} />
            <span className="hidden xs:inline">Leaderboard</span>
          </div>
          <div className="w-8"></div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
        
        {/* Header Section */}
        <div className="text-center mb-8 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full mb-4 border border-amber-500/20 shadow-lg shadow-amber-900/20">
              <Trophy size={40} className="text-amber-400" />
           </div>
           <h1 className="text-3xl font-bold text-white mb-2">Rankings</h1>
           <p className="text-slate-500 text-sm">Rise through the tiers. Earn glory.</p>
        </div>

        {/* Controls Container */}
        <div className="bg-slate-900/50 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm mb-6 flex flex-col sm:flex-row gap-3">
            
            {/* Timeframe Tabs */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 relative flex-1">
              {['daily', 'weekly', 'monthly'].map((t) => (
                <button
                  key={t}
                  onClick={() => setPeriod(t as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative z-10 ${period === t ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                   {period === t && (
                      <motion.div layoutId="tab-bg" className="absolute inset-0 bg-indigo-600 rounded-lg shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                   )}
                   <span className="relative z-10">{t}</span>
                </button>
              ))}
            </div>

            {/* Filter Dropdown (Visual) */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 flex-1 sm:flex-none sm:w-auto overflow-x-auto">
               <button onClick={() => setFilter('global')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${filter === 'global' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  <Globe size={14} /> Global
               </button>
               <button onClick={() => setFilter('country')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${filter === 'country' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  <MapPin size={14} /> National
               </button>
               <button onClick={() => setFilter('friends')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${filter === 'friends' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  <Users size={14} /> Friends
               </button>
            </div>
        </div>

        {/* List */}
        <div className="space-y-3 min-h-[400px]">
           {loading ? (
             <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
                <RefreshCw className="animate-spin" size={32} />
                <p>Syncing satellites...</p>
             </div>
           ) : entries.length === 0 ? (
             <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
                <Filter size={48} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-slate-400">No Pilots Found</h3>
                <p className="text-slate-600 text-sm mt-1 max-w-xs mx-auto">
                  {filter === 'friends' ? "Add friends to compete with them!" : "Be the first to orbit the leaderboard in this sector."}
                </p>
             </div>
           ) : (
             <>
                {entries.map((entry, idx) => (
                  <LeaderboardRow 
                    key={entry.userId} 
                    entry={entry} 
                    index={idx}
                    isCurrentUser={entry.userId === user?.id}
                  />
                ))}
             </>
           )}
        </div>
        
        {/* User Stats Summary (Footer Sticky) */}
        {!loading && user && !user.id.startsWith('guest-') && (
           <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
             <div className="max-w-3xl mx-auto flex items-center justify-between">
                <div className="text-sm">
                   <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Your Rank</span>
                   <div className="font-bold text-white flex items-center gap-2 text-lg">
                      {currentUserEntry 
                        ? <span className="text-indigo-400">#{currentUserEntry.rank}</span>
                        : <span className="text-slate-500 text-xs italic">Unranked</span>}
                   </div>
                </div>
                {currentUserEntry && (
                  <div className="text-right">
                     <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Points</span>
                     <div className="text-white font-bold">{currentUserEntry.points}</div>
                  </div>
                )}
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default LeaderboardPage;
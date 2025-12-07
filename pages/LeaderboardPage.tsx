import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchLeaderboard } from '../services/leaderboardService';
import { LeaderboardEntry } from '../types';
import LeaderboardRow from '../components/LeaderboardRow';
import { ArrowLeft, Trophy, Calendar, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState<'daily' | 'monthly'>('daily');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(period);
      setEntries(data);
      setLoading(false);
    };
    loadData();
  }, [period]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-indigo-500/30 pb-20">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/app')} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-2 font-bold text-white">
            <Trophy className="text-amber-500" />
            Global Leaderboard
          </div>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        
        {/* Header Section */}
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full mb-4 border border-amber-500/20">
              <Trophy size={40} className="text-amber-400" />
           </div>
           <h1 className="text-3xl font-bold text-white mb-2">Top Orbiters</h1>
           <p className="text-slate-500 text-sm">Compete with the community. Rise to the top.</p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-slate-900 rounded-xl mb-8 border border-slate-800 relative">
          <button
            onClick={() => setPeriod('daily')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all relative z-10 ${period === 'daily' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Clock size={16} /> Daily
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all relative z-10 ${period === 'monthly' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Calendar size={16} /> Monthly
          </button>
          
          {/* Active Tab Background Animation */}
          <motion.div 
            className="absolute top-1 bottom-1 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/50"
            initial={false}
            animate={{ 
              left: period === 'daily' ? '4px' : '50%', 
              right: period === 'daily' ? '50%' : '4px',
              width: 'calc(50% - 6px)' 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* List */}
        <div className="space-y-3 min-h-[400px]">
           {loading ? (
             <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
                <RefreshCw className="animate-spin" size={32} />
                <p>Syncing satellites...</p>
             </div>
           ) : entries.length === 0 ? (
             <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
                <Trophy size={48} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-slate-400">No Data Yet</h3>
                <p className="text-slate-600 text-sm mt-1">Be the first to complete a habit today!</p>
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
           <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-40">
             <div className="max-w-2xl mx-auto flex items-center justify-between">
                <div className="text-sm">
                   <span className="text-slate-400">Your current standing:</span>
                   <div className="font-bold text-white">
                      {entries.find(e => e.userId === user.id)?.rank 
                        ? `#${entries.find(e => e.userId === user.id)?.rank} Place`
                        : 'Unranked'}
                   </div>
                </div>
                <button 
                  onClick={() => navigate('/app')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg"
                >
                  Go Track
                </button>
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default LeaderboardPage;
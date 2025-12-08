import React, { useState } from 'react';
import { getDailyQuote } from '../services/motivationService';
import { getPersonalizedMotivation } from '../services/geminiService';
import { Quote, X, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MotivationBannerProps {
  userName?: string;
  userStreak?: number;
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({ userName, userStreak }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [mode, setMode] = useState<'quote' | 'ai'>('quote');
  const [aiMessage, setAiMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const quote = getDailyQuote();

  const handleGetAiMotivation = async () => {
    setLoading(true);
    setMode('ai');
    const msg = await getPersonalizedMotivation(userName || 'Friend', userStreak || 0);
    setAiMessage(msg);
    setLoading(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/20 shadow-lg"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
           <Quote size={80} className="text-white transform rotate-12" />
        </div>
        
        <div className="p-5 flex flex-col sm:flex-row items-start gap-4 relative z-10">
           <div className={`p-2 rounded-lg text-indigo-300 hidden sm:block ${mode === 'ai' ? 'bg-amber-500/20 text-amber-400' : 'bg-indigo-500/20'}`}>
              {mode === 'ai' ? <Sparkles size={20} /> : <Quote size={20} />}
           </div>
           
           <div className="flex-1 w-full">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1 flex justify-between items-center">
                 {mode === 'ai' ? 'AI Coach Says' : 'Daily Wisdom'}
                 <button 
                    onClick={handleGetAiMotivation}
                    className="flex items-center gap-1 text-[10px] bg-indigo-500/20 hover:bg-indigo-500/40 px-2 py-0.5 rounded-full transition text-indigo-200"
                    disabled={loading}
                 >
                    {loading ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
                    {mode === 'ai' ? 'Refresh' : 'Get AI Hype'}
                 </button>
              </h4>
              
              <AnimatePresence mode="wait">
                 {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-6 flex items-center">
                       <span className="text-slate-400 text-sm animate-pulse">Consulting the oracle...</span>
                    </motion.div>
                 ) : (
                    <motion.div key={mode} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                       {mode === 'quote' ? (
                          <>
                            <p className="text-white font-medium text-lg leading-snug italic">"{quote.text}"</p>
                            <p className="text-slate-400 text-sm mt-1">— {quote.author}</p>
                          </>
                       ) : (
                          <p className="text-white font-bold text-lg leading-snug text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-white">
                             {aiMessage}
                          </p>
                       )}
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>

           <button 
             onClick={() => setIsVisible(false)}
             className="absolute top-2 right-2 sm:static text-slate-500 hover:text-white transition p-1 hover:bg-white/10 rounded-full"
           >
             <X size={18} />
           </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MotivationBanner;
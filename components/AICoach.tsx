import React, { useState } from 'react';
import { Goal, DailyLogs, AIAnalysisResult, HabitSuggestion, WeeklyReviewData } from '../types';
import { analyzeProgress, suggestHabits, analyzeWeekly } from '../services/geminiService';
import { Sparkles, RefreshCw, Quote, Lightbulb, Calendar, Plus, ArrowRight, BrainCircuit, Target, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AICoachProps {
  userBio?: string;
  goals: Goal[];
  logs: DailyLogs;
  currentDate: Date;
  onAddGoal?: (goal: Partial<Goal>) => void;
}

type Tab = 'insights' | 'discover' | 'review';

const AICoach: React.FC<AICoachProps> = ({ userBio, goals, logs, currentDate, onAddGoal }) => {
  const [activeTab, setActiveTab] = useState<Tab>('insights');
  const [loading, setLoading] = useState(false);
  
  // State for each tab's data
  const [insightResult, setInsightResult] = useState<AIAnalysisResult | null>(null);
  const [suggestions, setSuggestions] = useState<HabitSuggestion[]>([]);
  const [weeklyResult, setWeeklyResult] = useState<WeeklyReviewData | null>(null);

  // Handlers
  const handleGenerateInsights = async () => {
    setLoading(true);
    const res = await analyzeProgress(goals, logs, currentDate);
    setInsightResult(res);
    setLoading(false);
  };

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    const res = await suggestHabits(userBio || '', goals);
    setSuggestions(res);
    setLoading(false);
  };

  const handleGenerateReview = async () => {
    setLoading(true);
    const res = await analyzeWeekly(goals, logs);
    setWeeklyResult(res);
    setLoading(false);
  };

  // Helper to trigger initial load if empty
  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    // Auto-fetch if no data yet
    if (tab === 'insights' && !insightResult && !loading) handleGenerateInsights();
    if (tab === 'discover' && suggestions.length === 0 && !loading) handleGenerateSuggestions();
    if (tab === 'review' && !weeklyResult && !loading) handleGenerateReview();
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/30 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-2xl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <BrainCircuit size={150} className="text-indigo-400" />
      </div>
      
      <div className="relative z-10">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                <Sparkles className="text-indigo-400" size={20} />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white">AI Coach</h2>
                <p className="text-indigo-300/60 text-xs font-medium uppercase tracking-wider">Powered by Gemini</p>
             </div>
          </div>

          <div className="flex p-1 bg-slate-900/60 rounded-xl border border-slate-700/50 backdrop-blur-md">
             {[
               { id: 'insights', label: 'Insights', icon: <Target size={14} /> },
               { id: 'discover', label: 'Discover', icon: <Lightbulb size={14} /> },
               { id: 'review', label: 'Review', icon: <Calendar size={14} /> }
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => switchTab(tab.id as Tab)}
                 className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                    ${activeTab === tab.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                 `}
               >
                 {tab.icon}
                 <span className="hidden sm:inline">{tab.label}</span>
               </button>
             ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[250px]">
           <AnimatePresence mode='wait'>
             
             {/* 1. INSIGHTS TAB */}
             {activeTab === 'insights' && (
               <motion.div 
                 key="insights"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="space-y-6"
               >
                 {!insightResult && !loading && (
                    <div className="text-center py-10">
                       <button onClick={handleGenerateInsights} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition">Start Analysis</button>
                    </div>
                 )}
                 
                 {loading && <LoadingState text="Analyzing your patterns..." />}

                 {insightResult && !loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-950/30 rounded-2xl p-6 border border-slate-800/50 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Performance Score</h3>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-5xl font-black text-white">{insightResult.score}</span>
                                    <span className="text-xl text-slate-500 mb-1">/100</span>
                                </div>
                                <p className="text-slate-300 leading-relaxed">{insightResult.summary}</p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-800/50">
                                <div className="flex items-start gap-3">
                                   <Quote className="text-indigo-500 shrink-0" size={20} />
                                   <p className="italic text-indigo-200 text-sm">"{insightResult.motivationalQuote}"</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950/30 rounded-2xl p-6 border border-slate-800/50">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Coach Tips</h3>
                            <ul className="space-y-3">
                                {insightResult.tips.map((tip, idx) => (
                                    <li key={idx} className="flex gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                                            {idx + 1}
                                        </div>
                                        <span className="text-sm text-slate-300">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-right">
                                <button onClick={handleGenerateInsights} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-end gap-1">
                                    <RefreshCw size={12} /> Refresh Insights
                                </button>
                            </div>
                        </div>
                    </div>
                 )}
               </motion.div>
             )}

             {/* 2. DISCOVER TAB (Suggestions) */}
             {activeTab === 'discover' && (
               <motion.div 
                 key="discover"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               >
                 {loading && <LoadingState text="Curating habits for you..." />}
                 
                 {!loading && (
                    <>
                      <div className="flex justify-between items-center mb-4">
                         <p className="text-slate-400 text-sm">Personalized suggestions based on your profile.</p>
                         <button onClick={handleGenerateSuggestions} className="text-xs flex items-center gap-1 text-indigo-400 hover:text-white transition">
                            <RefreshCw size={12} /> New Ideas
                         </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         {suggestions.map((habit, idx) => (
                            <div key={idx} className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800 hover:border-indigo-500/30 transition group relative overflow-hidden">
                               <div className={`absolute top-0 right-0 px-2 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${habit.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : habit.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                  {habit.difficulty}
                               </div>
                               
                               <div className="text-3xl mb-3">{habit.icon}</div>
                               <h3 className="font-bold text-white mb-1">{habit.title}</h3>
                               <p className="text-xs text-slate-400 mb-4 h-10 overflow-hidden">{habit.reason}</p>
                               
                               <div className="flex items-center justify-between mt-auto">
                                  {habit.time && (
                                     <div className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
                                        @{habit.time}
                                     </div>
                                  )}
                                  <button 
                                    onClick={() => onAddGoal && onAddGoal({ title: habit.title, icon: habit.icon, color: habit.color, time: habit.time })}
                                    className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition shadow-lg shadow-indigo-600/20 group-hover:scale-105"
                                    title="Add to Dashboard"
                                  >
                                     <Plus size={16} />
                                  </button>
                               </div>
                            </div>
                         ))}
                         {suggestions.length === 0 && !loading && (
                             <div className="col-span-3 text-center py-8 text-slate-500">
                                No suggestions yet. Click refresh to generate.
                             </div>
                         )}
                      </div>
                    </>
                 )}
               </motion.div>
             )}

             {/* 3. REVIEW TAB */}
             {activeTab === 'review' && (
               <motion.div 
                 key="review"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               >
                  {loading && <LoadingState text="Compiling weekly report..." />}

                  {weeklyResult && !loading && (
                     <div className="bg-slate-950/30 rounded-2xl border border-slate-800/50 overflow-hidden">
                        <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-white/5">
                           <div>
                              <h3 className="text-lg font-bold text-white">Weekly Debrief</h3>
                              <p className="text-xs text-slate-400">Last 7 Days Analysis</p>
                           </div>
                           <div className="text-right">
                              <div className="text-2xl font-black text-emerald-400">{weeklyResult.weekScore}%</div>
                              <div className="text-[10px] text-slate-500 uppercase font-bold">Consistency</div>
                           </div>
                        </div>
                        
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-3">
                               <p className="text-slate-300 text-lg font-light leading-relaxed">
                                  "{weeklyResult.summary}"
                               </p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                               <div className="text-xs text-slate-500 uppercase font-bold mb-1">Best Day</div>
                               <div className="text-white font-bold text-lg flex items-center gap-2">
                                  <Calendar className="text-amber-400" size={18} />
                                  {weeklyResult.bestDay}
                               </div>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                               <div className="text-xs text-slate-500 uppercase font-bold mb-1">Focus Area</div>
                               <div className="text-white font-bold text-lg flex items-center gap-2">
                                  <Target className="text-rose-400" size={18} />
                                  {weeklyResult.focusArea}
                               </div>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                               <div className="text-xs text-slate-500 uppercase font-bold mb-1">Next Action</div>
                               <div className="text-white font-bold text-lg flex items-center gap-2">
                                  <CheckCircle2 className="text-emerald-400" size={18} />
                                  Next Step
                               </div>
                               <div className="text-xs text-slate-400 mt-1">{weeklyResult.actionItem}</div>
                            </div>
                        </div>
                     </div>
                  )}
                  
                  {!weeklyResult && !loading && (
                      <div className="text-center py-10">
                        <p className="text-slate-400 mb-4">Get a detailed breakdown of your last week.</p>
                        <button onClick={handleGenerateReview} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition">Generate Report</button>
                      </div>
                  )}
               </motion.div>
             )}

           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const LoadingState = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-indigo-400">
     <RefreshCw className="animate-spin mb-4" size={32} />
     <p className="text-sm font-medium animate-pulse">{text}</p>
  </div>
);

export default AICoach;
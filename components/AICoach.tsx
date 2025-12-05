import React, { useState } from 'react';
import { Goal, DailyLogs, AIAnalysisResult } from '../types';
import { analyzeProgress } from '../services/geminiService';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';

interface AICoachProps {
  goals: Goal[];
  logs: DailyLogs;
  currentDate: Date;
}

const AICoach: React.FC<AICoachProps> = ({ goals, logs, currentDate }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    const analysis = await analyzeProgress(goals, logs, currentDate);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} className="text-indigo-400" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-indigo-100 flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={20} />
              AI Goal Coach
            </h2>
            <p className="text-indigo-200/60 text-sm mt-1">Get personalized insights based on your monthly performance.</p>
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading || goals.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? 'Analyzing...' : 'Analyze Progress'}
          </button>
        </div>

        {result && (
          <div className="animate-fade-in space-y-4 bg-slate-950/30 rounded-xl p-4 border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium text-slate-200">{result.summary}</div>
              <div className="text-3xl font-bold text-emerald-400">{result.score}<span className="text-sm text-slate-500 font-normal">/100</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Tips for You</h4>
                <ul className="space-y-2">
                  {result.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/40 rounded-lg p-4 flex flex-col justify-center relative">
                 <Quote className="absolute top-2 left-2 text-slate-600 opacity-20" size={32} />
                 <p className="text-slate-300 italic text-center text-sm relative z-10">
                   "{result.motivationalQuote}"
                 </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoach;

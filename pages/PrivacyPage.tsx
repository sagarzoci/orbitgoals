import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-indigo-500/30">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
        <header className="mb-12">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
            <Shield size={32} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="space-y-12">
          <section className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Database size={24} className="text-emerald-400" />
              1. Information Collection
            </h2>
            <p className="leading-relaxed mb-4">
              At OrbitGoals, we prioritize data minimalism. We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong>Account Information:</strong> Name and email address used for authentication.</li>
              <li><strong>Goal Data:</strong> Titles, colors, icons, and schedules of the habits you track.</li>
              <li><strong>Progress Logs:</strong> Daily records of completions, skips, and streak data.</li>
            </ul>
          </section>

          <section className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye size={24} className="text-indigo-400" />
              2. How We Use Your Data
            </h2>
            <p className="leading-relaxed mb-4">
              Your data is used exclusively to provide and improve the habit-tracking experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>To visualize your progress through charts and heatmaps.</li>
              <li>To send browser notifications for scheduled reminders (if enabled).</li>
              <li>To generate personalized insights via our AI Coach feature.</li>
            </ul>
            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-200 flex gap-3">
              <div className="mt-0.5"><Shield size={16} /></div>
              <div>
                 <strong>Note on AI:</strong> When you use the AI Coach, anonymized summaries of your goal progress are sent to Google's Gemini API to generate tips. We do not share your personally identifiable information (PII) with the AI provider.
              </div>
            </div>
          </section>

          <section className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock size={24} className="text-rose-400" />
              3. Data Storage & Security
            </h2>
            <p className="leading-relaxed mb-4">
              We use a hybrid storage approach focused on privacy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong>Local First:</strong> Your interaction data is persisted using your browser's LocalStorage technology.</li>
              <li><strong>No Third-Party Sales:</strong> We never sell your personal data to advertisers or third parties.</li>
            </ul>
          </section>

           <section className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@orbitgoals.com" className="text-indigo-400 hover:text-indigo-300">privacy@orbitgoals.com</a>.
            </p>
          </section>
        </div>
      </main>
      
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} OrbitGoals. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Heart, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-indigo-500/30">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-6 ring-1 ring-indigo-500/20"
          >
            <Rocket size={32} className="text-indigo-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Trajectory.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            OrbitGoals isn't just a tracker. It's a philosophy that small, consistent actions create massive orbital shifts in your life.
          </motion.p>
        </div>

        {/* The Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Why We Built This</h2>
              <p className="leading-relaxed text-slate-400">
                In a world full of distractions, maintaining focus on long-term goals is harder than ever. We realized that most productivity tools are either too complex or too boring.
              </p>
              <p className="leading-relaxed text-slate-400">
                We wanted to build something that felt <strong>alive</strong>. A tool that celebrates your wins, gently nudges you when you drift, and uses modern AI to help you understand your own patterns.
              </p>
           </div>
           <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10 grid gap-4">
                 <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">1%</div>
                    <div>
                       <div className="font-bold text-white">Better Every Day</div>
                       <div className="text-xs text-slate-500">The compound effect of habits</div>
                    </div>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">30+</div>
                    <div>
                       <div className="font-bold text-white">Days to Form a Habit</div>
                       <div className="text-xs text-slate-500">Consistency over intensity</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Values */}
        <section className="mb-24">
           <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Heart size={24} />, title: "User First", desc: "We don't sell data. We don't flood you with ads. We build for you." },
                { icon: <Users size={24} />, title: "Community Driven", desc: "We listen to feedback and iterate fast based on what actually helps you grow." },
                { icon: <Globe size={24} />, title: "Universal Access", desc: "Habit tracking should be accessible, simple, and intuitive for everyone." }
              ].map((val, i) => (
                <div key={i} className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 hover:bg-slate-800/50 transition duration-300">
                   <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400 mb-6 border border-slate-700">
                      {val.icon}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                   <p className="text-slate-400 leading-relaxed text-sm">{val.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-indigo-900/20 to-slate-900/50 p-12 rounded-3xl border border-indigo-500/20">
           <h2 className="text-3xl font-bold text-white mb-6">Join the Orbit</h2>
           <p className="text-slate-400 mb-8 max-w-xl mx-auto">
             Ready to start your journey? It takes less than a minute to set up your first goal.
           </p>
           <button
             onClick={() => navigate('/signup')}
             className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-900/20"
           >
             Get Started for Free
           </button>
        </div>

      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} OrbitGoals. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Target, BarChart2, Zap, Shield, ArrowRight, Star, CheckCircle2, Clock, Calendar } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Mouse parallax for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / innerWidth;
    const y = (clientY - innerHeight / 2) / innerHeight;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  // Smooth out the rotation
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  return (
    <div 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="min-h-screen bg-slate-950 text-slate-50 font-sans overflow-hidden relative selection:bg-indigo-500/30 perspective-1000"
    >
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] opacity-30" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="bg-gradient-to-tr from-indigo-600 to-indigo-400 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20 group-hover:rotate-12 transition-transform duration-300">
            <Target size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">OrbitGoals</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <button 
            onClick={() => navigate('/login')}
            className="hidden sm:block px-5 py-2.5 rounded-full bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white text-sm font-medium transition backdrop-blur-md"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition shadow-lg shadow-indigo-900/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-32 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md shadow-xl"
          >
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
             <span className="text-sm font-medium text-slate-300">New: Time-based reminders</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Build habits that</span><br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">stick to orbit.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Stop losing track. OrbitGoals combines visual heatmaps, AI coaching, and smart notifications to help you maintain your trajectory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <button 
              onClick={() => navigate('/signup')}
              className="group px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-indigo-900/20 flex items-center gap-2"
            >
              Start Tracking Free 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
               onClick={() => {
                 document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="px-8 py-4 bg-slate-800/40 hover:bg-slate-800/60 text-white rounded-full font-medium text-lg transition-all backdrop-blur-sm border border-slate-700/50"
            >
              See Features
            </button>
          </div>
        </motion.div>

        {/* 3D Dashboard Mockup */}
        <div className="flex-1 w-full max-w-xl lg:max-w-none perspective-1000">
           <motion.div
             style={{ 
               rotateX: smoothRotateX, 
               rotateY: smoothRotateY,
               transformStyle: "preserve-3d"
             }}
             className="relative aspect-[4/3] w-full"
           >
              {/* Glass Card Container */}
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-indigo-500/20 overflow-hidden transform-gpu">
                  {/* Mock UI Header */}
                  <div className="h-14 border-b border-slate-800 flex items-center px-6 gap-4">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                      </div>
                      <div className="h-2 w-32 bg-slate-800 rounded-full"></div>
                  </div>
                  {/* Mock UI Body */}
                  <div className="p-6 grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-4">
                          <div className="h-32 rounded-xl bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-slate-700/50 p-4">
                              <div className="flex gap-2 mb-3">
                                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20"></div>
                                  <div className="space-y-1">
                                      <div className="h-2 w-24 bg-slate-700 rounded"></div>
                                      <div className="h-2 w-16 bg-slate-800 rounded"></div>
                                  </div>
                              </div>
                              <div className="h-12 w-full bg-slate-800/30 rounded-lg"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="h-24 rounded-xl bg-slate-800/40 border border-slate-700/30"></div>
                              <div className="h-24 rounded-xl bg-slate-800/40 border border-slate-700/30"></div>
                          </div>
                      </div>
                      <div className="col-span-1 space-y-3">
                          {[1,2,3,4].map(i => (
                              <div key={i} className="h-10 rounded-lg bg-slate-800/30 border border-slate-700/30 w-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Floating 3D Elements */}
              <motion.div 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -right-8 top-10 bg-indigo-600 p-4 rounded-2xl shadow-xl shadow-indigo-900/40 border border-indigo-400/20"
                 style={{ transform: "translateZ(50px)" }}
              >
                  <CheckCircle2 size={32} className="text-white" />
              </motion.div>

              <motion.div 
                 animate={{ y: [10, -10, 10] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 className="absolute -left-8 bottom-20 bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-600"
                 style={{ transform: "translateZ(80px)" }}
              >
                 <div className="flex items-center gap-3">
                     <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <Calendar size={24} className="text-emerald-400" />
                     </div>
                     <div>
                         <div className="text-xs text-slate-400">Streak</div>
                         <div className="text-lg font-bold text-white">12 Days</div>
                     </div>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </main>

      {/* Workflow Section */}
      <section className="py-24 bg-slate-900/30 relative border-y border-slate-800/50">
         <div className="max-w-7xl mx-auto px-6">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
             >
                 <h2 className="text-3xl font-bold text-white mb-4">How OrbitGoals Works</h2>
                 <p className="text-slate-400 max-w-2xl mx-auto">Three simple steps to build a life of consistency.</p>
             </motion.div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                 {/* Connecting Line (Desktop) */}
                 <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0"></div>

                 {[
                     { 
                         icon: <Target className="text-indigo-400" />, 
                         title: "Set Your Targets", 
                         desc: "Define your daily habits. Add detailed schedules and icons to make them yours." 
                     },
                     { 
                         icon: <Clock className="text-purple-400" />, 
                         title: "Track & Notify", 
                         desc: "Get timely reminders. Log your progress in seconds with our minimalist dashboard." 
                     },
                     { 
                         icon: <BarChart2 className="text-emerald-400" />, 
                         title: "Analyze & Improve", 
                         desc: "Review monthly heatmaps and get AI-powered advice to optimize your routine." 
                     }
                 ].map((step, idx) => (
                     <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative z-10 flex flex-col items-center text-center group"
                     >
                         <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-950 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                             <div className="bg-slate-900/80 p-4 rounded-full">
                                {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 })}
                             </div>
                         </div>
                         <h3 className="text-xl font-bold text-slate-200 mb-3">{step.title}</h3>
                         <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                     </motion.div>
                 ))}
             </div>
         </div>
      </section>

      {/* Feature Grid */}
      <div id="features" className="py-24 max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <BarChart2 className="text-emerald-400" size={32} />,
                title: "Visual Analytics",
                desc: "Beautiful charts and heatmaps to visualize your consistency and identify patterns over time.",
                color: "from-emerald-500/10 to-emerald-500/5"
              },
              {
                icon: <Zap className="text-amber-400" size={32} />,
                title: "AI Coaching",
                desc: "Receive personalized tips and motivation from our Gemini-powered coach based on your actual data.",
                color: "from-amber-500/10 to-amber-500/5"
              },
              {
                icon: <Shield className="text-indigo-400" size={32} />,
                title: "Privacy First",
                desc: "Your data is yours. We prioritize privacy and security, keeping your habits personal.",
                color: "from-indigo-500/10 to-indigo-500/5"
              },
              {
                icon: <Clock className="text-pink-400" size={32} />,
                title: "Smart Reminders",
                desc: "Never miss a beat. Set specific times for your goals and get notified right when it matters.",
                color: "from-pink-500/10 to-pink-500/5"
              },
              {
                icon: <Calendar className="text-cyan-400" size={32} />,
                title: "Flexible Scheduling",
                desc: "Skip days without guilt, or lock in strict modes. Your calendar adapts to your lifestyle.",
                color: "from-cyan-500/10 to-cyan-500/5"
              },
              {
                icon: <Star className="text-purple-400" size={32} />,
                title: "Gamified Streaks",
                desc: "Earn badges and watch your daily streaks grow. Motivation built right into the design.",
                color: "from-purple-500/10 to-purple-500/5"
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className={`
                  group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/30 
                  hover:border-slate-700 hover:bg-slate-900/50 transition duration-300
                  overflow-hidden
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition duration-500`} />
                <div className="relative z-10">
                  <div className="bg-slate-800/80 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-700/50 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
      </div>

      {/* Stats / Social Proof */}
      <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="border-y border-slate-800/50 bg-slate-900/20 py-16 backdrop-blur-sm"
        >
           <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
              {[
                { label: "Active Users", value: "2k+" },
                { label: "Habits Tracked", value: "50k+" },
                { label: "Completion Rate", value: "85%" },
                { label: "User Rating", value: "4.9/5" },
              ].map((stat, i) => (
                <div key={i} className="px-4">
                  <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-slate-500 uppercase text-xs tracking-wider font-semibold">{stat.label}</div>
                </div>
              ))}
           </div>
        </motion.div>

      {/* Bottom CTA */}
      <div className="py-32 text-center px-6">
          <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/50 to-slate-900/50 rounded-3xl p-12 border border-indigo-500/20 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-indigo-500/20 transition duration-500" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none group-hover:bg-cyan-500/20 transition duration-500" />
             
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to launch your potential?</h2>
             <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">Join the community of achievers. No credit card required, just your goals.</p>
             <button 
                onClick={() => navigate('/signup')}
                className="relative z-10 px-8 py-4 bg-white text-slate-950 hover:bg-indigo-50 rounded-full font-bold text-lg transition shadow-xl hover:shadow-2xl hover:-translate-y-1"
             >
                Get Started Now
             </button>
          </motion.div>
      </div>

      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition">
              <Target size={20} />
              <span className="font-semibold">OrbitGoals</span>
           </div>
           <div className="flex gap-6 text-sm text-slate-500">
               <button onClick={() => navigate('/about')} className="hover:text-white transition">About Us</button>
               <button onClick={() => navigate('/privacy')} className="hover:text-white transition">Privacy</button>
               <a href="#" className="hover:text-white transition">Terms</a>
               <a href="#" className="hover:text-white transition">Contact</a>
           </div>
           <p className="text-slate-600 text-sm">
             &copy; {new Date().getFullYear()} OrbitGoals. All rights reserved.
           </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type MascotMood = 'success' | 'skip' | 'undo' | null;

interface MascotProps {
  mood: MascotMood;
  onComplete: () => void;
}

const Mascot: React.FC<MascotProps> = ({ mood, onComplete }) => {
  useEffect(() => {
    if (mood) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [mood, onComplete]);

  return (
    <AnimatePresence>
      {mood && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-end justify-center pb-12 sm:pb-24"
        >
           {/* SVG Robot Character "Orbit" */}
           <motion.div
             className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-2xl filter"
             initial={{ y: 100, scale: 0.5 }}
             animate={
                mood === 'success' 
                  ? { y: [100, -20, 0, -10, 0], scale: 1, rotate: [0, -5, 5, 0] } 
                  : mood === 'skip'
                  ? { y: [100, 0], scale: 1, rotate: [0, 5] }
                  : { y: [100, 0], scale: 1, rotate: [0, -360] } // Undo spin
             }
             exit={{ y: 100, opacity: 0, scale: 0.5 }}
             transition={{ type: "spring", stiffness: 200, damping: 15 }}
           >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Legs */}
                  <path d="M70 150 L70 170" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                  <path d="M130 150 L130 170" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                  
                  {/* Body */}
                  <rect x="50" y="80" width="100" height="80" rx="20" fill={mood === 'skip' ? '#94a3b8' : '#6366f1'} />
                  <rect x="60" y="90" width="80" height="50" rx="10" fill="#e2e8f0" />
                  
                  {/* Face Expression */}
                  {mood === 'success' && (
                     <g>
                        {/* Happy Eyes */}
                        <path d="M75 110 Q85 105 95 110" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        <path d="M105 110 Q115 105 125 110" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        {/* Smile */}
                        <path d="M85 125 Q100 135 115 125" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                     </g>
                  )}
                  
                  {mood === 'skip' && (
                     <g>
                        {/* Sad/Neutral Eyes */}
                        <circle cx="85" cy="115" r="3" fill="#1e293b" />
                        <circle cx="115" cy="115" r="3" fill="#1e293b" />
                        {/* Flat Mouth */}
                        <line x1="90" y1="130" x2="110" y2="130" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                        {/* Tear */}
                        <motion.circle 
                           cx="120" cy="120" r="3" fill="#38bdf8"
                           animate={{ y: [0, 10], opacity: [1, 0] }}
                           transition={{ repeat: Infinity, duration: 1 }}
                        />
                     </g>
                  )}

                  {mood === 'undo' && (
                     <g>
                        {/* Confused/Spin Eyes */}
                        <circle cx="85" cy="115" r="4" stroke="#1e293b" strokeWidth="2" />
                        <circle cx="115" cy="115" r="4" stroke="#1e293b" strokeWidth="2" />
                        {/* O Mouth */}
                        <circle cx="100" cy="130" r="3" fill="#1e293b" />
                     </g>
                  )}

                  {/* Antenna */}
                  <line x1="100" y1="80" x2="100" y2="60" stroke={mood === 'skip' ? '#64748b' : '#6366f1'} strokeWidth="4" />
                  <motion.circle 
                    cx="100" cy="55" r="8" 
                    fill={mood === 'success' ? '#f43f5e' : '#cbd5e1'}
                    animate={mood === 'success' ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                    transition={mood === 'success' ? { duration: 0.5, repeat: Infinity } : {}}
                  />

                  {/* Arms */}
                  <motion.path 
                     d="M50 100 L30 120" 
                     stroke={mood === 'skip' ? '#94a3b8' : '#6366f1'} 
                     strokeWidth="8" 
                     strokeLinecap="round"
                     animate={mood === 'success' ? { d: "M50 100 L20 60" } : {}}
                  />
                  <motion.path 
                     d="M150 100 L170 120" 
                     stroke={mood === 'skip' ? '#94a3b8' : '#6366f1'} 
                     strokeWidth="8" 
                     strokeLinecap="round"
                     animate={mood === 'success' ? { d: "M150 100 L180 60" } : {}}
                  />
              </svg>
              
              {/* Text Bubble */}
              <motion.div
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.2 }}
                 className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap shadow-lg border border-slate-200"
              >
                  {mood === 'success' && "Awesome! 🎉"}
                  {mood === 'skip' && "Don't give up! 💪"}
                  {mood === 'undo' && "Rewinding... ⏪"}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
              </motion.div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Mascot;
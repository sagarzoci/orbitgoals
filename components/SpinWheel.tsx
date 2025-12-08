import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpinWheelProps {
  onComplete: (points: number) => void;
  onClose: () => void;
}

const PRIZES = [
  { label: '50 XP', value: 50, color: '#3b82f6' },
  { label: '20 XP', value: 20, color: '#64748b' },
  { label: '100 XP', value: 100, color: '#8b5cf6' },
  { label: '50 XP', value: 50, color: '#3b82f6' },
  { label: 'JACKPOT', value: 500, color: '#f59e0b' },
  { label: '20 XP', value: 20, color: '#64748b' },
];

const SpinWheel: React.FC<SpinWheelProps> = ({ onComplete, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<{ label: string; value: number } | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Calculate random rotation
    // 6 segments, 60 degrees each.
    // Base spins (5 full rotations) + random segment
    const segmentAngle = 360 / PRIZES.length;
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const randomOffset = Math.floor(Math.random() * (segmentAngle - 10)) + 5; // Add randomness within segment
    
    // Determine target rotation
    // Note: Wheel rotates clockwise. 
    // To land on index i, we need to rotate such that index i is at the top (or pointer).
    // Let's assume pointer is at top (0 deg).
    const targetRotation = 1800 + (360 - (randomIndex * segmentAngle)) - (segmentAngle / 2); // 5 spins + alignment

    setRotation(targetRotation);

    setTimeout(() => {
      const wonPrize = PRIZES[randomIndex];
      setPrize(wonPrize);
      setIsSpinning(false);
      
      // Fire confetti for big wins
      if (wonPrize.value >= 100) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Delay before closing/saving to let user see prize
      setTimeout(() => {
        onComplete(wonPrize.value);
      }, 2000);
    }, 4000); // Animation duration match
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="relative max-w-sm w-full"
      >
        <button 
           onClick={onClose} 
           className="absolute -top-12 right-0 text-slate-400 hover:text-white p-2"
           disabled={isSpinning}
        >
          <X size={24} />
        </button>

        <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl flex flex-col items-center relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-6 relative z-10">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-1">
              Daily Bonus!
            </h3>
            <p className="text-slate-400 text-sm">All tasks done. Spin for XP.</p>
          </div>

          {/* Wheel Container */}
          <div className="relative w-64 h-64 mb-6">
            {/* Pointer */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-amber-500 filter drop-shadow-lg">
               <div className="w-8 h-8 bg-slate-900 rotate-45 border-r border-b border-slate-700 absolute top-2 left-0 -z-10"></div>
               <Zap size={32} fill="currentColor" />
            </div>

            {/* The Wheel */}
            <motion.div
              className="w-full h-full rounded-full border-4 border-slate-700 relative overflow-hidden bg-slate-800"
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.15, 0, 0.2, 1] }} // Bezier for spin up and slow down
            >
              {PRIZES.map((p, i) => {
                const rotate = i * (360 / PRIZES.length);
                return (
                  <div
                    key={i}
                    className="absolute w-full h-full top-0 left-0"
                    style={{ transform: `rotate(${rotate}deg)` }}
                  >
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[60px] border-r-[60px] border-t-[130px] border-l-transparent border-r-transparent origin-bottom"
                      style={{ 
                          borderTopColor: p.color,
                          opacity: 0.8,
                          transformOrigin: '50% 100%',
                          transform: 'translateY(128px) scaleY(-1)' // Hacky CSS triangle wedge logic
                      }}
                    />
                    <div 
                        className="absolute top-8 left-1/2 -translate-x-1/2 font-bold text-white text-xs whitespace-nowrap"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                    >
                        {p.label}
                    </div>
                  </div>
                );
              })}
              
              {/* Center Cap */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 rounded-full border-2 border-slate-600 flex items-center justify-center shadow-lg z-10">
                  <Star size={16} className="text-amber-400" />
              </div>
            </motion.div>
          </div>

          {/* Action Button */}
          {!prize ? (
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSpinning ? 'Spinning...' : 'SPIN NOW'}
            </button>
          ) : (
             <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-white mb-2">+{prize.value} XP</div>
                <div className="text-emerald-400 font-medium">Claimed!</div>
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SpinWheel;
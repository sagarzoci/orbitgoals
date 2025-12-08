import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Trophy, Zap, CheckCircle2 } from 'lucide-react';

interface FeedItem {
  id: string;
  user: string;
  action: string;
  type: 'milestone' | 'completion' | 'streak';
  timestamp: number;
}

interface ProgressFeedProps {
  newEvents: FeedItem[];
}

const MOCK_NAMES = ['Cosmic Voyager', 'Star Walker', 'Nebula Surfer', 'Orbit Pilot', 'Lunar Lander', 'Solar Sailor'];
const MOCK_ACTIONS = [
  { action: 'completed all habits today! 🎉', type: 'completion' },
  { action: 'reached a 7-day streak! 🔥', type: 'streak' },
  { action: 'leveled up to Gold Tier! 🏆', type: 'milestone' },
  { action: 'just joined the challenge.', type: 'milestone' }
];

const ProgressFeed: React.FC<ProgressFeedProps> = ({ newEvents }) => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Initial Seed
  useEffect(() => {
    const initialItems: FeedItem[] = [
      { id: 'init-1', user: 'System', action: 'Welcome to the Orbit Feed.', type: 'milestone', timestamp: Date.now() }
    ];
    setItems(initialItems);
  }, []);

  // Handle incoming real events
  useEffect(() => {
    if (newEvents.length > 0) {
      const latest = newEvents[newEvents.length - 1];
      addItem(latest);
    }
  }, [newEvents]);

  // Simulate Community Activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 8 seconds
        const randomName = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
        const randomAction = MOCK_ACTIONS[Math.floor(Math.random() * MOCK_ACTIONS.length)];
        
        addItem({
          id: `sim-${Date.now()}`,
          user: randomName,
          action: randomAction.action,
          type: randomAction.type as any,
          timestamp: Date.now()
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const addItem = (item: FeedItem) => {
    setItems(prev => {
      const updated = [item, ...prev].slice(0, 5); // Keep last 5
      return updated;
    });
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'streak': return <Zap size={14} className="text-amber-400" />;
      case 'milestone': return <Trophy size={14} className="text-purple-400" />;
      default: return <CheckCircle2 size={14} className="text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-4 w-full overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <Activity size={14} /> Live Orbit Feed
      </div>
      
      <div className="space-y-3 relative min-h-[150px]" ref={listRef}>
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0, x: -20 }}
              animate={{ opacity: 1, height: 'auto', x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-start gap-3 text-sm border-b border-slate-800/50 pb-2 last:border-0 last:pb-0"
            >
               <div className="mt-0.5 flex-shrink-0 bg-slate-800 p-1.5 rounded-full">
                  {getIcon(item.type)}
               </div>
               <div>
                  <span className="font-bold text-slate-200">{item.user}</span>{' '}
                  <span className="text-slate-400">{item.action}</span>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    {Math.floor((Date.now() - item.timestamp) / 1000)}s ago
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Empty State Overlay if needed */}
        {items.length === 0 && (
           <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">
              Listening for signals...
           </div>
        )}
      </div>
    </div>
  );
};

export default ProgressFeed;
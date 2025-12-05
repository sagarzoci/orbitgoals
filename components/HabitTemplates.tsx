
import React from 'react';
import { ICONS, COLORS } from '../types';

interface Template {
  title: string;
  icon: string;
  color: string;
}

const TEMPLATES: Template[] = [
  { title: "Drink 2L Water", icon: "💧", color: "bg-blue-500" },
  { title: "Read 15 Mins", icon: "📚", color: "bg-purple-500" },
  { title: "Morning Jog", icon: "🏃", color: "bg-emerald-500" },
  { title: "Meditate", icon: "🧘", color: "bg-indigo-500" },
  { title: "Save Money", icon: "💰", color: "bg-amber-500" },
  { title: "Code", icon: "💻", color: "bg-slate-700" }, // Using slate for code manually, mapping to nearest available or just passing class
  { title: "No Sugar", icon: "🥦", color: "bg-rose-500" },
  { title: "Sleep 8h", icon: "🛌", color: "bg-cyan-500" },
];

interface HabitTemplatesProps {
  onSelect: (template: Template) => void;
}

const HabitTemplates: React.FC<HabitTemplatesProps> = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Quick Templates
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.title}
            onClick={() => onSelect(t)}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-500 transition group"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{t.icon}</span>
            <span className="text-xs text-slate-300 font-medium text-center leading-tight">{t.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HabitTemplates;

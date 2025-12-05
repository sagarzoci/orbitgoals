import React, { useState, useEffect, useRef, useMemo } from 'react';
import Calendar from '../components/Calendar';
import Stats from '../components/Stats';
import AICoach from '../components/AICoach';
import TodayFocus from '../components/TodayFocus';
import AchievementsWidget from '../components/AchievementsWidget';
import HabitTemplates from '../components/HabitTemplates';
import ChatWidget from '../components/ChatWidget';
import Mascot, { MascotMood } from '../components/Mascot';
import { Goal, DailyLogs, ICONS, COLORS, CompletionStatus } from '../types';
import { calculateStats } from '../services/gamification';
import { Plus, X, Check, Target, LogOut, Settings, Lock, Clock, Bell, Award, User as UserIcon, Camera, Save, Loader, Mail, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Storage Keys based on User ID
  const goalsKey = `orbit_goals_${user?.id}`;
  const logsKey = `orbit_logs_${user?.id}`;

  // State
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(goalsKey);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [logs, setLogs] = useState<DailyLogs>(() => {
    const saved = localStorage.getItem(logsKey);
    return saved ? JSON.parse(saved) : {};
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  
  // UI State
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'profile'>('overview');
  const [mascotMood, setMascotMood] = useState<MascotMood>(null);
  
  // Profile State
  const [profileName, setProfileName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // New Goal Form State
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalIcon, setNewGoalIcon] = useState(ICONS[0]);
  const [newGoalColor, setNewGoalColor] = useState(COLORS[0]);
  const [newGoalTime, setNewGoalTime] = useState('');
  const [newGoalReminder, setNewGoalReminder] = useState(false);

  // Notification State
  const lastNotifiedRef = useRef<Set<string>>(new Set());

  // Calculate Stats for Gamification (Memoized)
  const userStats = useMemo(() => calculateStats(goals, logs), [goals, logs]);

  // Calculate Longest Streak (All time)
  const longestStreak = useMemo(() => {
    const dates = Object.keys(logs).filter(date => 
        Object.values(logs[date]).some(status => status === 'completed')
    ).sort();
    if (!dates.length) return 0;
    
    let max = 0;
    let current = 0;
    let prevDate: Date | null = null;
    
    dates.forEach(dateStr => {
        const d = new Date(dateStr);
        // Normalize time component to avoid timezone issues
        d.setHours(0,0,0,0);
        
        if (!prevDate) {
            current = 1;
        } else {
            const diffTime = Math.abs(d.getTime() - prevDate.getTime());
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) current++;
            else if (diffDays > 1) current = 1;
        }
        if (current > max) max = current;
        prevDate = d;
    });
    return max;
  }, [logs]);

  // Calculate Today String for Strict Mode
  const todayDate = new Date();
  const tYear = todayDate.getFullYear();
  const tMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
  const tDay = String(todayDate.getDate()).padStart(2, '0');
  const todayStr = `${tYear}-${tMonth}-${tDay}`;

  // Persistence (Update whenever goals/logs change OR user changes)
  useEffect(() => {
    if (user?.id) {
       localStorage.setItem(goalsKey, JSON.stringify(goals));
    }
  }, [goals, user?.id, goalsKey]);

  useEffect(() => {
    if (user?.id) {
       localStorage.setItem(logsKey, JSON.stringify(logs));
    }
  }, [logs, user?.id, logsKey]);

  // Load data when component mounts or user ID confirms
  useEffect(() => {
    if (user?.id) {
       const savedGoals = localStorage.getItem(goalsKey);
       if (savedGoals) setGoals(JSON.parse(savedGoals));
       else setGoals([]);

       const savedLogs = localStorage.getItem(logsKey);
       if (savedLogs) setLogs(JSON.parse(savedLogs));
       else setLogs({});
       
       // Init profile inputs
       setProfileName(user.name);
       setProfilePhoto(auth.currentUser?.photoURL || '');
    }
  }, [user?.id, goalsKey, logsKey]);

  // Request Notification Permission on Mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Notification Check Loop
  useEffect(() => {
    const checkReminders = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;

      const now = new Date();
      // Manual formatting to ensure HH:MM matches input type="time"
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${hours}:${minutes}`;

      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const currentDayStr = `${y}-${m}-${d}`;

      goals.forEach(goal => {
        if (goal.reminderEnabled && goal.time === currentTimeStr) {
          const notificationKey = `${currentDayStr}-${goal.id}-${currentTimeStr}`;
          
          // Check if user has already completed OR skipped the task today
          const status = logs[currentDayStr]?.[goal.id];
          const isDone = status === 'completed' || status === 'skipped';

          if (!isDone && !lastNotifiedRef.current.has(notificationKey)) {
            // Send Notification
            try {
                new Notification(`Time for: ${goal.title}`, {
                    body: `It's ${currentTimeStr}. Time to track your habit!`,
                    icon: '/vite.svg', // Fallback icon path
                    tag: notificationKey,
                    silent: false
                });
            } catch (e) {
                console.error("Notification trigger failed", e);
            }

            lastNotifiedRef.current.add(notificationKey);
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 5000);
    return () => clearInterval(intervalId);
  }, [goals, logs]);


  // Handlers
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setIsProfileUpdating(true);
    setProfileMessage(null);
    
    try {
      await updateProfile(auth.currentUser, {
        displayName: profileName,
        photoURL: profilePhoto || null
      });
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Profile update failed", error);
      setProfileMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsProfileUpdating(false);
    }
  };

  const addGoal = async () => {
    if (!newGoalTitle.trim()) return;

    if (newGoalReminder && 'Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
    }

    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title: newGoalTitle,
      icon: newGoalIcon,
      color: newGoalColor,
      createdAt: new Date().toISOString(),
      time: newGoalTime || undefined,
      reminderEnabled: newGoalReminder
    };
    setGoals([...goals, newGoal]);
    
    // Reset Form
    setNewGoalTitle('');
    setNewGoalTime('');
    setNewGoalReminder(false);
    setIsGoalModalOpen(false);
  };

  const removeGoal = (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal? History will be preserved but it won't appear in future lists.")) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const toggleLog = (date: string, goalId: string, status: CompletionStatus) => {
    setLogs(prev => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [goalId]: status
      }
    }));
  };

  const handleTodayToggle = (goalId: string, status: CompletionStatus) => {
    toggleLog(todayStr, goalId, status);
  };

  const handleModalAction = (e: React.MouseEvent, date: string, goalId: string, newStatus: CompletionStatus) => {
    // 1. Audio & Mascot Effect
    if (newStatus === 'completed') {
        audioService.playSuccess();
        setMascotMood('success');
    }
    else if (newStatus === 'skipped') {
        audioService.playSkip();
        setMascotMood('skip');
    }
    // "Undo" in the modal is essentially toggling back to pending
    else if (newStatus === 'pending') {
        audioService.playUndo();
        setMascotMood('undo');
    }

    // 2. Visual Effect (Confetti for completion)
    if (newStatus === 'completed') {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        // Normalize coordinates
        const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
        const yRatio = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 50,
            spread: 50,
            origin: { x: xRatio, y: yRatio },
            colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
            zIndex: 9999, // Ensure it's above the modal
            disableForReducedMotion: true
        });
    }

    // 3. Update State
    toggleLog(date, goalId, newStatus);
  };

  // Template Selection Handler
  const handleTemplateSelect = (template: { title: string, icon: string, color: string }) => {
    setNewGoalTitle(template.title);
    setNewGoalIcon(template.icon);
    setNewGoalColor(template.color);
  };

  const selectedDateObject = selectedDay 
    ? new Date(parseInt(selectedDay.split('-')[0]), parseInt(selectedDay.split('-')[1]) - 1, parseInt(selectedDay.split('-')[2])) 
    : null;

  const formattedSelectedDate = selectedDateObject?.toLocaleDateString('default', { 
    weekday: 'long', month: 'long', day: 'numeric' 
  });

  const isSelectedDayEditable = selectedDay === todayStr;
  const isFutureDate = selectedDay ? selectedDay > todayStr : false;

  return (
    <div className="min-h-screen pb-20 bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30">
      
      {/* Mascot Overlay */}
      <Mascot mood={mascotMood} onComplete={() => setMascotMood(null)} />

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Target size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">OrbitGoals</h1>
          </div>
          
          <div className="flex gap-4 items-center">
             <div 
               className="hidden md:flex flex-col items-end mr-2 cursor-pointer hover:opacity-80 transition"
               onClick={() => setActiveTab('profile')}
             >
                <span className="text-sm text-white font-medium">{profileName || user?.name}</span>
                <span className="text-xs text-amber-500 font-bold">Lvl {userStats.level} • {userStats.totalPoints} pts</span>
             </div>
            
            <button 
              onClick={() => setActiveTab(activeTab === 'achievements' ? 'overview' : 'achievements')}
              className={`p-2 rounded-lg transition ${activeTab === 'achievements' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Achievements"
            >
              <Award size={20} />
            </button>

             <button 
              onClick={() => setActiveTab('profile')}
              className={`p-2 rounded-lg transition ${activeTab === 'profile' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
              title="Profile"
            >
              <UserIcon size={20} />
            </button>

            <button 
              onClick={() => setIsGoalModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition"
              title="Manage Goals"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={() => setIsGoalModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-indigo-900/20"
            >
              <Plus size={16} /> <span className="hidden sm:inline">New Goal</span>
            </button>
            <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
        
        {activeTab === 'overview' && (
          <>
            <TodayFocus 
              goals={goals} 
              logs={logs} 
              onToggle={handleTodayToggle} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
               <div className="lg:col-span-3">
                 <AICoach goals={goals} logs={logs} currentDate={currentDate} />
               </div>
            </div>

            <Stats goals={goals} logs={logs} currentDate={currentDate} />

            <Calendar 
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              logs={logs}
              goals={goals}
              onDayClick={setSelectedDay}
            />
          </>
        )}
        
        {activeTab === 'achievements' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-bold text-white">Your Achievements</h2>
             </div>
             
             <AchievementsWidget stats={userStats} />

             {/* Stat Cards */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Completed", value: userStats.totalCompleted, color: "text-emerald-400" },
                  { label: "Longest Streak", value: userStats.currentStreak, color: "text-amber-400" },
                  { label: "Perfect Days", value: userStats.perfectDays, color: "text-indigo-400" },
                  { label: "Total Points", value: userStats.totalPoints, color: "text-cyan-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center">
                    <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
             <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-bold text-white">Commander Profile</h2>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
                   {/* Avatar Section */}
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-slate-800 ring-4 ring-slate-800 overflow-hidden flex items-center justify-center shadow-lg">
                        {profilePhoto ? (
                          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon size={40} className="text-slate-500" />
                        )}
                      </div>
                      <div className="text-center">
                         <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">Level {userStats.level}</div>
                         <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">{userStats.totalPoints} XP</div>
                      </div>
                   </div>

                   {/* Info & Stats Section */}
                   <div className="flex-1 w-full">
                      <div className="grid grid-cols-2 gap-4 mb-8">
                         <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-white">{goals.length}</div>
                            <div className="text-[10px] uppercase text-slate-500 font-semibold">Total Habits</div>
                         </div>
                         <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-emerald-400">{userStats.totalCompleted}</div>
                            <div className="text-[10px] uppercase text-slate-500 font-semibold">Completed</div>
                         </div>
                         <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-amber-400">{userStats.currentStreak}</div>
                            <div className="text-[10px] uppercase text-slate-500 font-semibold">Current Streak</div>
                         </div>
                         <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-center">
                            <div className="text-2xl font-bold text-indigo-400">{longestStreak}</div>
                            <div className="text-[10px] uppercase text-slate-500 font-semibold">Longest Streak</div>
                         </div>
                      </div>

                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                         <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
                            <input 
                              type="text" 
                              value={profileName}
                              onChange={(e) => setProfileName(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                              placeholder="Your Name"
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                               <span>Profile Photo URL</span>
                               <span className="text-[10px] normal-case font-normal text-slate-600">Optional</span>
                            </label>
                            <div className="relative">
                               <Camera size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                               <input 
                                 type="text" 
                                 value={profilePhoto}
                                 onChange={(e) => setProfilePhoto(e.target.value)}
                                 className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg pl-10 p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                 placeholder="https://..."
                               />
                            </div>
                         </div>
                         
                         {/* Read Only Details */}
                         <div className="pt-2 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                               <Mail size={16} />
                               <span className="truncate">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                               <Shield size={16} />
                               <span className="truncate font-mono text-xs opacity-70">UID: {user?.id}</span>
                            </div>
                         </div>

                         {profileMessage && (
                            <div className={`text-sm p-3 rounded-lg flex items-center gap-2 ${profileMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                               {profileMessage.type === 'success' ? <Check size={16} /> : <X size={16} />}
                               {profileMessage.text}
                            </div>
                         )}

                         <div className="flex gap-4 pt-4">
                            <button 
                              type="submit" 
                              disabled={isProfileUpdating}
                              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                               {isProfileUpdating ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                               Save Changes
                            </button>
                            <button 
                              type="button"
                              onClick={handleLogout}
                              className="px-6 py-2.5 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-300 rounded-xl font-medium transition border border-slate-700 hover:border-rose-500/30 flex items-center gap-2"
                            >
                               <LogOut size={18} />
                               Logout
                            </button>
                         </div>
                      </form>
                   </div>
                </div>
             </div>
          </div>
        )}

        <ChatWidget goals={goals} logs={logs} />
      </main>

      {/* Daily Log Modal (Calendar Drill-down) */}
      <AnimatePresence>
      {selectedDay && (
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {formattedSelectedDate}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {!isSelectedDayEditable && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold">
                       {isFutureDate ? <Clock size={12} /> : <Lock size={12} />}
                       <span>{isFutureDate ? 'Future Date' : 'Past Locked'}</span>
                    </div>
                  )}
                  <p className="text-slate-400 text-sm">
                    {isSelectedDayEditable ? 'Update your progress' : 'View only mode'}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {goals.length === 0 ? (
                 <div className="text-center text-slate-500 py-8">No goals set for this month.</div>
              ) : (
                goals.map(goal => {
                  const status = logs[selectedDay]?.[goal.id] || 'pending';
                  const isCompleted = status === 'completed';
                  const isSkipped = status === 'skipped';

                  return (
                    <motion.div 
                        layout
                        key={goal.id} 
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div className={!isSelectedDayEditable ? 'opacity-70' : ''}>
                          <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-200 block">{goal.title}</span>
                              {goal.time && (
                                  <span className="text-xs text-indigo-400 flex items-center gap-0.5 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                      <Clock size={10} />
                                      {goal.time}
                                  </span>
                              )}
                          </div>
                          {!isSelectedDayEditable && status !== 'pending' && (
                             <span className="text-xs text-slate-500 capitalize">Recorded: {status}</span>
                          )}
                          {!isSelectedDayEditable && status === 'pending' && (
                             <span className="text-xs text-slate-600 italic">No record</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                         <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          disabled={!isSelectedDayEditable}
                          onClick={(e) => handleModalAction(e, selectedDay, goal.id, status === 'skipped' ? 'pending' : 'skipped')}
                          className={`
                            p-2 rounded-lg transition-all
                            ${!isSelectedDayEditable 
                                ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-600' 
                                : isSkipped 
                                  ? 'bg-rose-500 text-white' 
                                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}
                          `}
                          title={isSelectedDayEditable ? "Skip for today" : "Locked"}
                        >
                          <X size={16} />
                        </motion.button>
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          disabled={!isSelectedDayEditable}
                          onClick={(e) => handleModalAction(e, selectedDay, goal.id, status === 'completed' ? 'pending' : 'completed')}
                          className={`
                            p-2 rounded-lg transition-all flex items-center gap-2
                            ${!isSelectedDayEditable
                                ? `opacity-30 cursor-not-allowed ${isCompleted ? goal.color + ' text-white' : 'bg-slate-800 text-slate-600'}`
                                : isCompleted 
                                  ? `${goal.color} text-white shadow-lg` 
                                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}
                          `}
                          title={isSelectedDayEditable ? "Complete" : "Locked"}
                        >
                          <Check size={16} />
                          {isCompleted && <span className="text-xs font-bold">Done</span>}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
            <div className="p-4 bg-slate-800/30 text-center">
              <button onClick={() => setSelectedDay(null)} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Goal Management Modal */}
      <AnimatePresence>
      {isGoalModalOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Manage Goals</h3>
                <button onClick={() => setIsGoalModalOpen(false)} className="text-slate-500 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              {/* Habit Templates Integration */}
              <HabitTemplates onSelect={handleTemplateSelect} />

              <div className="space-y-4 border-t border-slate-800 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Goal Title</label>
                  <input 
                    type="text" 
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="e.g., Read 30 mins, Drink 2L water"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    autoFocus
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                     <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        <span className="flex items-center gap-1"><Clock size={12}/> Time (Optional)</span>
                     </label>
                     <input 
                        type="time"
                        value={newGoalTime}
                        onChange={(e) => setNewGoalTime(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                     />
                  </div>
                  <div className="flex items-center pt-6">
                     <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition">
                       <input 
                          type="checkbox" 
                          checked={newGoalReminder}
                          onChange={(e) => setNewGoalReminder(e.target.checked)}
                          className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900" 
                        />
                       <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Bell size={14} className={newGoalReminder ? 'text-amber-400' : 'text-slate-500'} /> 
                          Notify
                       </span>
                     </label>
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Icon</label>
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                     {ICONS.map(icon => (
                       <button 
                        key={icon}
                        onClick={() => setNewGoalIcon(icon)}
                        className={`
                          w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-xl transition-all
                          ${newGoalIcon === icon ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
                        `}
                       >
                         {icon}
                       </button>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Color Tag</label>
                   <div className="flex gap-2 flex-wrap">
                     {COLORS.map(color => (
                       <button 
                        key={color}
                        onClick={() => setNewGoalColor(color)}
                        className={`
                          w-8 h-8 rounded-full transition-all ring-2 ring-offset-2 ring-offset-slate-900
                          ${color}
                          ${newGoalColor === color ? 'ring-white scale-110' : 'ring-transparent opacity-70 hover:opacity-100'}
                        `}
                       />
                     ))}
                   </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={addGoal}
                  disabled={!newGoalTitle.trim()}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                >
                  Add New Goal
                </button>
              </div>
            </div>
            
            {goals.length > 0 && (
              <div className="border-t border-slate-800 p-6 bg-slate-950/30 flex-shrink-0">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your Goals</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {goals.map(g => (
                     <div key={g.id} className="flex justify-between items-center text-sm p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{g.icon}</span>
                          <div>
                            <span className="text-slate-200 font-medium block">{g.title}</span>
                            <div className="flex gap-2">
                               <span className="text-slate-500 text-xs">Created {new Date(g.createdAt).toLocaleDateString()}</span>
                               {g.time && (
                                   <span className="text-indigo-400 text-xs flex items-center gap-1">
                                       <Clock size={10} />
                                       {g.time}
                                       {g.reminderEnabled && <Bell size={10} />}
                                   </span>
                               )}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeGoal(g.id)} 
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                          title="Delete Goal"
                        >
                          <X size={16} />
                        </button>
                     </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;

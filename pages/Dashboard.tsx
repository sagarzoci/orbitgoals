import React, { useState, useEffect, useRef, useMemo } from 'react';
import Calendar from '../components/Calendar';
import Stats from '../components/Stats';
import AICoach from '../components/AICoach';
import TodayFocus from '../components/TodayFocus';
import AchievementsWidget from '../components/AchievementsWidget';
import HabitTemplates from '../components/HabitTemplates';
import Mascot, { MascotMood } from '../components/Mascot';
import { Goal, DailyLogs, ICONS, COLORS, CompletionStatus } from '../types';
import { calculateStats, POINTS_PER_COMPLETION } from '../services/gamification';
import { updateLeaderboardScore } from '../services/leaderboardService';
import { Plus, X, Check, Target, LogOut, Settings, Lock, Clock, Bell, Award, User as UserIcon, Camera, Save, Loader, Mail, Shield, Phone, Edit3, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useAuth();

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
  
  // Profile Form State
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(''); // Stores Base64 or URL
  
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const todayDate = new Date();
  const tYear = todayDate.getFullYear();
  const tMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
  const tDay = String(todayDate.getDate()).padStart(2, '0');
  const todayStr = `${tYear}-${tMonth}-${tDay}`;

  // Persistence
  useEffect(() => {
    if (user?.id) localStorage.setItem(goalsKey, JSON.stringify(goals));
  }, [goals, user?.id, goalsKey]);

  useEffect(() => {
    if (user?.id) localStorage.setItem(logsKey, JSON.stringify(logs));
  }, [logs, user?.id, logsKey]);

  // Load Data
  useEffect(() => {
    if (user?.id) {
       const savedGoals = localStorage.getItem(goalsKey);
       if (savedGoals) setGoals(JSON.parse(savedGoals));
       else setGoals([]);

       const savedLogs = localStorage.getItem(logsKey);
       if (savedLogs) setLogs(JSON.parse(savedLogs));
       else setLogs({});
       
       // Init profile inputs from AuthContext
       setProfileName(user.name);
       setProfilePhoto(user.photoURL || '');
       setProfilePhone(user.phoneNumber || '');
       setProfileBio(user.bio || '');
    }
  }, [user?.id, goalsKey, logsKey, user]);

  // Notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const now = new Date();
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
          const status = logs[currentDayStr]?.[goal.id];
          const isDone = status === 'completed' || status === 'skipped';
          if (!isDone && !lastNotifiedRef.current.has(notificationKey)) {
            try {
                new Notification(`Time for: ${goal.title}`, {
                    body: `It's ${currentTimeStr}. Time to track your habit!`,
                    icon: '/vite.svg',
                    tag: notificationKey,
                });
            } catch (e) { console.error(e); }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePhoto(reader.result); // Set base64 string
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileUpdating(true);
    setProfileMessage(null);
    
    try {
      await updateUserProfile({
        name: profileName,
        photoURL: profilePhoto,
        phoneNumber: profilePhone,
        bio: profileBio
      });
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
      // Reset message after 3 seconds
      setTimeout(() => setProfileMessage(null), 3000);
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
    setNewGoalTitle('');
    setNewGoalTime('');
    setNewGoalReminder(false);
    setIsGoalModalOpen(false);
  };

  const removeGoal = (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const toggleLog = async (date: string, goalId: string, status: CompletionStatus) => {
    const previousStatus = logs[date]?.[goalId] || 'pending';
    
    // Update Local State
    setLogs(prev => ({
      ...prev,
      [date]: { ...(prev[date] || {}), [goalId]: status }
    }));

    // Update Global Leaderboard if Today's action
    if (user && date === todayStr) {
      let pointsDelta = 0;
      let tasksDelta = 0;

      // Logic for Points Calculation
      if (status === 'completed' && previousStatus !== 'completed') {
        pointsDelta = POINTS_PER_COMPLETION;
        tasksDelta = 1;
      } else if (status !== 'completed' && previousStatus === 'completed') {
        // User undid a completion
        pointsDelta = -POINTS_PER_COMPLETION;
        tasksDelta = -1;
      }

      if (pointsDelta !== 0) {
        await updateLeaderboardScore(user, pointsDelta, tasksDelta);
      }
    }
  };

  const handleTodayToggle = (goalId: string, status: CompletionStatus) => {
    toggleLog(todayStr, goalId, status);
  };

  const handleModalAction = (e: React.MouseEvent, date: string, goalId: string, newStatus: CompletionStatus) => {
    if (newStatus === 'completed') {
        audioService.playSuccess();
        setMascotMood('success');
    } else if (newStatus === 'skipped') {
        audioService.playSkip();
        setMascotMood('skip');
    } else if (newStatus === 'pending') {
        audioService.playUndo();
        setMascotMood('undo');
    }

    if (newStatus === 'completed') {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
        const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
            particleCount: 50, spread: 50, origin: { x: xRatio, y: yRatio },
            colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
            zIndex: 9999, disableForReducedMotion: true
        });
    }
    toggleLog(date, goalId, newStatus);
  };

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
      
      <Mascot mood={mascotMood} onComplete={() => setMascotMood(null)} />

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0" onClick={() => navigate('/')}>
            <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Target size={20} className="text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hidden xs:block">OrbitGoals</h1>
          </div>
          
          <div className="flex gap-2 sm:gap-4 items-center">
             <div 
               className="hidden md:flex flex-col items-end mr-2 cursor-pointer hover:opacity-80 transition"
               onClick={() => setActiveTab('profile')}
             >
                <span className="text-sm text-white font-medium">{profileName || user?.name}</span>
                <span className="text-xs text-amber-500 font-bold">Lvl {userStats.level}</span>
             </div>
             
             {/* Mobile-friendly action bar */}
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient-right pb-1 sm:pb-0">
                <button 
                  onClick={() => navigate('/leaderboard')}
                  className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-700 transition flex-shrink-0"
                  title="Global Leaderboard"
                >
                  <Trophy size={18} />
                </button>

                <button onClick={() => setActiveTab(activeTab === 'achievements' ? 'overview' : 'achievements')} className={`p-2 rounded-lg transition flex-shrink-0 ${activeTab === 'achievements' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>
                  <Award size={18} />
                </button>
                <button onClick={() => setActiveTab('profile')} className={`p-2 rounded-lg transition flex-shrink-0 ${activeTab === 'profile' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>
                  <UserIcon size={18} />
                </button>
                <button onClick={() => setIsGoalModalOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition flex-shrink-0">
                  <Settings size={18} />
                </button>
                <button onClick={() => setIsGoalModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 sm:px-4 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-indigo-900/20 flex-shrink-0 whitespace-nowrap">
                  <Plus size={16} /> <span className="hidden sm:inline">New Goal</span>
                </button>
                <button onClick={handleLogout} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition flex-shrink-0">
                    <LogOut size={18} />
                </button>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 animate-fade-in">
        {activeTab === 'overview' && (
          <>
            <TodayFocus goals={goals} logs={logs} onToggle={handleTodayToggle} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
               <div className="lg:col-span-3"><AICoach goals={goals} logs={logs} currentDate={currentDate} /></div>
            </div>
            <Stats goals={goals} logs={logs} currentDate={currentDate} />
            <Calendar currentDate={currentDate} onDateChange={setCurrentDate} logs={logs} goals={goals} onDayClick={setSelectedDay} />
          </>
        )}
        
        {activeTab === 'achievements' && (
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"><X size={24} /></button>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Achievements</h2>
             </div>
             <AchievementsWidget stats={userStats} />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto animate-fade-in pb-12">
             <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"><X size={24} /></button>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Commander Profile</h2>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>

                <form onSubmit={handleUpdateProfile} className="relative z-10 flex flex-col gap-6 sm:gap-8">
                   
                   {/* Avatar Upload Section */}
                   <div className="flex flex-col items-center">
                      <div className="relative group">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-slate-800 overflow-hidden bg-slate-800 shadow-xl cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                           {profilePhoto ? (
                              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover group-hover:opacity-70 transition-opacity" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 group-hover:bg-slate-700 transition">
                                 <UserIcon size={40} className="sm:w-12 sm:h-12" />
                              </div>
                           )}
                           
                           {/* Overlay Icon */}
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                              <Camera size={24} className="text-white drop-shadow-md" />
                           </div>
                        </div>
                        <input 
                           type="file" 
                           ref={fileInputRef} 
                           onChange={handleFileChange} 
                           className="hidden" 
                           accept="image/*"
                        />
                      </div>
                      <p className="mt-3 text-sm text-slate-500">Tap to upload photo</p>
                   </div>

                   {/* Fields Container */}
                   <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><Edit3 size={16} /></div>
                               <input 
                                 type="text" 
                                 value={profileName}
                                 onChange={(e) => setProfileName(e.target.value)}
                                 className="w-full bg-slate-950/50 border border-slate-700 focus:border-indigo-500 text-white rounded-xl pl-10 p-3 outline-none transition"
                                 placeholder="e.g. Captain Orbit"
                               />
                            </div>
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                            <div className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><Phone size={16} /></div>
                               <input 
                                 type="tel" 
                                 value={profilePhone}
                                 onChange={(e) => setProfilePhone(e.target.value)}
                                 className="w-full bg-slate-950/50 border border-slate-700 focus:border-indigo-500 text-white rounded-xl pl-10 p-3 outline-none transition"
                                 placeholder="+1 (555) 000-0000"
                               />
                            </div>
                         </div>
                      </div>

                      <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stress-Free Details (Bio)</label>
                         <textarea 
                           value={profileBio}
                           onChange={(e) => setProfileBio(e.target.value)}
                           className="w-full bg-slate-950/50 border border-slate-700 focus:border-indigo-500 text-white rounded-xl p-4 outline-none transition h-24 resize-none leading-relaxed"
                           placeholder="What drives your orbit? Keep it simple."
                         />
                      </div>
                   </div>

                   {/* Read-Only Info */}
                   <div className="bg-slate-950/30 rounded-xl p-4 border border-slate-800/50 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                         <Mail size={14} />
                         <span className="break-all">{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Shield size={14} />
                         <span className="font-mono opacity-70">ID: {user?.id.slice(0, 8)}...</span>
                      </div>
                   </div>

                   {profileMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl flex items-center gap-3 ${profileMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}
                      >
                         {profileMessage.type === 'success' ? <Check size={18} /> : <X size={18} />}
                         <span className="font-medium">{profileMessage.text}</span>
                      </motion.div>
                   )}

                   <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button 
                        type="submit" 
                        disabled={isProfileUpdating}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                         {isProfileUpdating ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                         Save Profile
                      </button>
                      <button 
                        type="button"
                        onClick={handleLogout}
                        className="px-8 py-3 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-300 rounded-xl font-bold transition border border-slate-700 hover:border-rose-500/30 flex items-center justify-center gap-2"
                      >
                         <LogOut size={18} />
                         Logout
                      </button>
                   </div>
                </form>
             </div>
          </div>
        )}
      </main>

      {/* Modals remain unchanged... */}
      <AnimatePresence>
      {selectedDay && (
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
             initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
             className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">{formattedSelectedDate}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {!isSelectedDayEditable && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold">
                       {isFutureDate ? <Clock size={12} /> : <Lock size={12} />} <span>{isFutureDate ? 'Future Date' : 'Past Locked'}</span>
                    </div>
                  )}
                  <p className="text-slate-400 text-sm">{isSelectedDayEditable ? 'Update your progress' : 'View only mode'}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDay(null)} className="text-slate-400 hover:text-white transition"><X size={24} /></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {goals.length === 0 ? <div className="text-center text-slate-500 py-8">No goals set for this month.</div> : (
                goals.map(goal => {
                  const status = logs[selectedDay]?.[goal.id] || 'pending';
                  const isCompleted = status === 'completed';
                  const isSkipped = status === 'skipped';
                  return (
                    <motion.div layout key={goal.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div className={!isSelectedDayEditable ? 'opacity-70' : ''}>
                          <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-200 block">{goal.title}</span>
                              {goal.time && <span className="text-xs text-indigo-400 flex items-center gap-0.5 bg-indigo-500/10 px-1.5 py-0.5 rounded"><Clock size={10} />{goal.time}</span>}
                          </div>
                          {!isSelectedDayEditable && status !== 'pending' && <span className="text-xs text-slate-500 capitalize">Recorded: {status}</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <motion.button whileTap={{ scale: 0.9 }} disabled={!isSelectedDayEditable} onClick={(e) => handleModalAction(e, selectedDay, goal.id, status === 'skipped' ? 'pending' : 'skipped')} className={`p-2 rounded-lg transition-all ${!isSelectedDayEditable ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-600' : isSkipped ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}><X size={16} /></motion.button>
                        <motion.button whileTap={{ scale: 0.9 }} disabled={!isSelectedDayEditable} onClick={(e) => handleModalAction(e, selectedDay, goal.id, status === 'completed' ? 'pending' : 'completed')} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${!isSelectedDayEditable ? `opacity-30 cursor-not-allowed ${isCompleted ? goal.color + ' text-white' : 'bg-slate-800 text-slate-600'}` : isCompleted ? `${goal.color} text-white shadow-lg` : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}><Check size={16} /></motion.button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
            <div className="p-4 bg-slate-800/30 text-center"><button onClick={() => setSelectedDay(null)} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Close</button></div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {isGoalModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-white">Manage Goals</h3><button onClick={() => setIsGoalModalOpen(false)} className="text-slate-500 hover:text-white"><X size={20} /></button></div>
              <HabitTemplates onSelect={handleTemplateSelect} />
              <div className="space-y-4 border-t border-slate-800 pt-4">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Goal Title</label><input type="text" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} placeholder="e.g., Read 30 mins" className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" autoFocus /></div>
                <div className="flex gap-4">
                  <div className="flex-1"><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Time</label><input type="time" value={newGoalTime} onChange={(e) => setNewGoalTime(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                  <div className="flex items-center pt-6"><label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition"><input type="checkbox" checked={newGoalReminder} onChange={(e) => setNewGoalReminder(e.target.checked)} className="w-5 h-5 rounded border-slate-700 text-indigo-600 bg-slate-900" /><span className="text-sm font-medium text-slate-300 flex items-center gap-2"><Bell size={14} className={newGoalReminder ? 'text-amber-400' : 'text-slate-500'} /> Notify</span></label></div>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Icon</label><div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">{ICONS.map(icon => (<button key={icon} onClick={() => setNewGoalIcon(icon)} className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-xl transition-all ${newGoalIcon === icon ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{icon}</button>))}</div></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Color</label><div className="flex gap-2 flex-wrap">{COLORS.map(color => (<button key={color} onClick={() => setNewGoalColor(color)} className={`w-8 h-8 rounded-full transition-all ring-2 ring-offset-2 ring-offset-slate-900 ${color} ${newGoalColor === color ? 'ring-white scale-110' : 'ring-transparent opacity-70 hover:opacity-100'}`} />))}</div></div>
              </div>
              <div className="mt-8 flex gap-3"><button onClick={addGoal} disabled={!newGoalTitle.trim()} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20">Add New Goal</button></div>
            </div>
            {goals.length > 0 && (
              <div className="border-t border-slate-800 p-6 bg-slate-950/30 flex-shrink-0">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your Goals</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {goals.map(g => (
                     <div key={g.id} className="flex justify-between items-center text-sm p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                        <div className="flex items-center gap-3"><span className="text-lg">{g.icon}</span><div><span className="text-slate-200 font-medium block">{g.title}</span><div className="flex gap-2"><span className="text-slate-500 text-xs">Created {new Date(g.createdAt).toLocaleDateString()}</span>{g.time && (<span className="text-indigo-400 text-xs flex items-center gap-1"><Clock size={10} />{g.time}</span>)}</div></div></div>
                        <button onClick={() => removeGoal(g.id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"><X size={16} /></button>
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
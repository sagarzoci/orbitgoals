import React, { useState, useEffect, useRef, useMemo } from 'react';
import Calendar from '../components/Calendar';
import Stats from '../components/Stats';
import AICoach from '../components/AICoach';
import TodayFocus from '../components/TodayFocus';
import AchievementsWidget from '../components/AchievementsWidget';
import HabitTemplates from '../components/HabitTemplates';
import Mascot, { MascotMood } from '../components/Mascot';
import SpinWheel from '../components/SpinWheel';
import RewardsShop from '../components/RewardsShop';
import AnalyticsView from '../components/AnalyticsView';
import MotivationBanner from '../components/MotivationBanner';
import ProgressFeed from '../components/ProgressFeed';
import { Goal, DailyLogs, ICONS, COLORS, CompletionStatus, COUNTRIES, ShopItem, NotificationSettings } from '../types';
import { calculateStats, POINTS_PER_COMPLETION } from '../services/gamification';
import { updateLeaderboardScore } from '../services/leaderboardService';
import { checkProStatus } from '../services/paymentService';
import { Plus, X, Check, Target, LogOut, Settings, Lock, Clock, Bell, Award, User as UserIcon, Camera, Save, Loader, Mail, Shield, Phone, Edit3, Trophy, ShoppingBag, Globe, Flame, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const goalsKey = `orbit_goals_${user?.id}`;
  const logsKey = `orbit_logs_${user?.id}`;
  const bonusKey = `orbit_bonus_${user?.id}`;
  const coinsKey = `orbit_coins_${user?.id}`;
  const lastSpinKey = `orbit_last_spin_${user?.id}`;
  const themesKey = `orbit_themes_${user?.id}`;
  const avatarsKey = `orbit_avatars_${user?.id}`;
  const activeFrameKey = `orbit_active_frame_${user?.id}`;
  const boosterKey = `orbit_booster_${user?.id}`;
  const proKey = `orbit_is_pro_${user?.id}`;
  const settingsKey = `orbit_settings_${user?.id}`;

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(goalsKey);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [logs, setLogs] = useState<DailyLogs>(() => {
    const saved = localStorage.getItem(logsKey);
    return saved ? JSON.parse(saved) : {};
  });

  const [bonusPoints, setBonusPoints] = useState<number>(() => { const saved = localStorage.getItem(bonusKey); return saved ? parseInt(saved, 10) : 0; });
  const [coins, setCoins] = useState<number>(() => { const saved = localStorage.getItem(coinsKey); return saved ? parseInt(saved, 10) : 0; });
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>(() => { const saved = localStorage.getItem(themesKey); return saved ? JSON.parse(saved) : []; });
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(() => { const saved = localStorage.getItem(avatarsKey); return saved ? JSON.parse(saved) : []; });
  const [activeAvatarFrame, setActiveAvatarFrame] = useState<string>(() => { const saved = localStorage.getItem(activeFrameKey); return saved || ''; });
  const [activeBoosterExpiry, setActiveBoosterExpiry] = useState<number>(() => { const saved = localStorage.getItem(boosterKey); return saved ? parseInt(saved, 10) : 0; });
  const [isPro, setIsPro] = useState<boolean>(() => { const saved = localStorage.getItem(proKey); return saved === 'true'; });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => { const saved = localStorage.getItem(settingsKey); return saved ? JSON.parse(saved) : { pushEnabled: false, emailEnabled: false, smartReminders: true, reminderTime: "09:00" }; });

  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'profile' | 'analytics'>('overview');
  const [mascotMood, setMascotMood] = useState<MascotMood>(null);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [feedEvents, setFeedEvents] = useState<{ id: string; user: string; action: string; type: any; timestamp: number }[]>([]);

  // Profile Inputs
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileCountry, setProfileCountry] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // New Goal Inputs
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalIcon, setNewGoalIcon] = useState(ICONS[0]);
  const [newGoalColor, setNewGoalColor] = useState(COLORS[0]);
  const [newGoalTime, setNewGoalTime] = useState('');
  const [newGoalReminder, setNewGoalReminder] = useState(false);

  const lastNotifiedRef = useRef<Set<string>>(new Set());
  const userStats = useMemo(() => calculateStats(goals, logs, bonusPoints), [goals, logs, bonusPoints]);

  const todayDate = new Date();
  const tYear = todayDate.getFullYear();
  const tMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
  const tDay = String(todayDate.getDate()).padStart(2, '0');
  const todayStr = `${tYear}-${tMonth}-${tDay}`;
  const isBoosterActive = activeBoosterExpiry > Date.now();
  const extendedUser = user ? { ...user, isPro, coins } : null;

  // Persistence Effects
  useEffect(() => { if (user?.id) localStorage.setItem(goalsKey, JSON.stringify(goals)); }, [goals, user?.id, goalsKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(logsKey, JSON.stringify(logs)); }, [logs, user?.id, logsKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(bonusKey, bonusPoints.toString()); }, [bonusPoints, user?.id, bonusKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(coinsKey, coins.toString()); }, [coins, user?.id, coinsKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(themesKey, JSON.stringify(unlockedThemes)); }, [unlockedThemes, user?.id, themesKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(avatarsKey, JSON.stringify(unlockedAvatars)); }, [unlockedAvatars, user?.id, avatarsKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(activeFrameKey, activeAvatarFrame); }, [activeAvatarFrame, user?.id, activeFrameKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(boosterKey, activeBoosterExpiry.toString()); }, [activeBoosterExpiry, user?.id, boosterKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(proKey, String(isPro)); }, [isPro, user?.id, proKey]);
  useEffect(() => { if (user?.id) localStorage.setItem(settingsKey, JSON.stringify(notificationSettings)); }, [notificationSettings, user?.id, settingsKey]);

  useEffect(() => {
    if (user?.id) {
       // Init from user object
       setProfileName(user.name);
       setProfilePhoto(user.photoURL || '');
       setProfilePhone(user.phoneNumber || '');
       setProfileBio(user.bio || '');
       setProfileCountry(user.country || '');

       if (!isPro) {
           checkProStatus(user.id).then(serverPro => {
               if (serverPro) {
                   setIsPro(true);
                   showToast("PRO subscription activated!", 'success');
                   audioService.playLevelUp();
               }
           });
       }
    }
  }, [user]);

  // Spin Wheel Check
  useEffect(() => {
    if (!user?.id || goals.length === 0) return;
    const todaysLogs = logs[todayStr] || {};
    const completedCount = goals.filter(g => todaysLogs[g.id] === 'completed').length;
    
    if (completedCount === goals.length && goals.length > 0) {
        if (!logs[todayStr]?.['_feed_posted']) {
            setFeedEvents(prev => [...prev, {
                id: `completion-${Date.now()}`,
                user: user.name || 'You',
                action: 'completed all habits today! 🎉',
                type: 'completion',
                timestamp: Date.now()
            }]);
        }
        const lastSpin = localStorage.getItem(lastSpinKey);
        if (lastSpin !== todayStr) {
            const timer = setTimeout(() => setShowSpinWheel(true), 1000);
            return () => clearTimeout(timer);
        }
    }
  }, [logs, goals, user?.id, todayStr, lastSpinKey]);

  // Actions
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileUpdating(true);
    try {
      await updateUserProfile({
        name: profileName,
        photoURL: profilePhoto,
        phoneNumber: profilePhone,
        bio: profileBio,
        country: profileCountry,
        activeAvatarFrame: activeAvatarFrame,
        notificationSettings: notificationSettings
      });
      if (user) {
        updateLeaderboardScore({...user, name: profileName, photoURL: profilePhoto, country: profileCountry, activeAvatarFrame}, 0, 0);
      }
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    } finally {
      setIsProfileUpdating(false);
    }
  };

  const addGoal = async () => {
    if (!newGoalTitle.trim()) return;
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
    showToast('New goal created', 'success');
  };

  const removeGoal = (id: string) => {
    if (window.confirm("Delete this goal? Data will be preserved.")) {
      setGoals(goals.filter(g => g.id !== id));
      showToast('Goal removed', 'info');
    }
  };

  const toggleLog = async (date: string, goalId: string, status: CompletionStatus) => {
    const previousStatus = logs[date]?.[goalId] || 'pending';
    setLogs(prev => ({
      ...prev,
      [date]: { ...(prev[date] || {}), [goalId]: status }
    }));

    if (user && date === todayStr) {
      let pointsDelta = 0;
      let tasksDelta = 0;
      let coinsDelta = 0;
      const multiplier = isBoosterActive ? 2 : 1;

      if (status === 'completed' && previousStatus !== 'completed') {
        pointsDelta = POINTS_PER_COMPLETION * multiplier;
        tasksDelta = 1;
        coinsDelta = 1 * multiplier; 
      } else if (status !== 'completed' && previousStatus === 'completed') {
        pointsDelta = -(POINTS_PER_COMPLETION * multiplier);
        tasksDelta = -1;
        coinsDelta = -(1 * multiplier);
      }
      setCoins(prev => Math.max(0, prev + coinsDelta));
      if (pointsDelta !== 0) await updateLeaderboardScore(user, pointsDelta, tasksDelta);
    }
  };

  const handleModalAction = (e: React.MouseEvent, date: string, goalId: string, newStatus: CompletionStatus) => {
    if (newStatus === 'completed') {
        audioService.playSuccess();
        setMascotMood('success');
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
        const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
            particleCount: 50, spread: 50, origin: { x: xRatio, y: yRatio },
            colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
            zIndex: 9999, disableForReducedMotion: true
        });
    } else if (newStatus === 'skipped') {
        audioService.playSkip();
        setMascotMood('skip');
    } else {
        audioService.playUndo();
        setMascotMood('undo');
    }
    toggleLog(date, goalId, newStatus);
  };

  const handleSpinComplete = (points: number) => {
     const multiplier = isBoosterActive ? 2 : 1;
     const finalPoints = points * multiplier;
     audioService.playLevelUp();
     setBonusPoints(prev => prev + finalPoints);
     setCoins(prev => prev + Math.floor(finalPoints / 2));
     if (user) updateLeaderboardScore(user, finalPoints, 0);
     localStorage.setItem(lastSpinKey, todayStr);
     setTimeout(() => setShowSpinWheel(false), 2000);
  };

  const handleShopPurchase = (item: ShopItem) => {
      if (item.type === 'premium') return;
      setCoins(prev => prev - item.cost);
      if (item.type === 'theme' && item.value) setUnlockedThemes(prev => [...prev, item.id]);
      else if (item.type === 'avatar' && item.value) {
          setUnlockedAvatars(prev => [...prev, item.id]);
          setActiveAvatarFrame(item.value);
      } else if (item.type === 'booster') setActiveBoosterExpiry(Date.now() + 24 * 60 * 60 * 1000);
      else if (item.type === 'coupon' && item.value === 'PRO-FREE-1M') setIsPro(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => { if (typeof reader.result === 'string') setProfilePhoto(reader.result); };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30">
      <Mascot mood={mascotMood} onComplete={() => setMascotMood(null)} />
      <AnimatePresence>
        {isShopOpen && (
            <RewardsShop coins={coins} unlockedThemes={unlockedThemes} unlockedAvatars={unlockedAvatars} activeBoosterExpiry={activeBoosterExpiry} onPurchase={handleShopPurchase} onClose={() => setIsShopOpen(false)} />
        )}
        {showSpinWheel && <SpinWheel onComplete={handleSpinComplete} onClose={() => setShowSpinWheel(false)} />}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0" onClick={() => navigate('/')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Target size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hidden xs:block">OrbitGoals</h1>
          </div>
          
          <div className="flex gap-2 sm:gap-4 items-center flex-1 justify-end min-w-0">
             <div className="hidden md:flex flex-col items-end mr-2 cursor-pointer hover:opacity-80 transition" onClick={() => setActiveTab('profile')}>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white font-medium truncate max-w-[100px]">{profileName || user?.name}</span>
                    {activeAvatarFrame && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>}
                </div>
                <span className="text-xs text-amber-500 font-bold">Lvl {userStats.level}</span>
             </div>
             
             {/* Mobile Scrollable Action Bar */}
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient-right pb-1 sm:pb-0 max-w-full">
                <button onClick={() => setIsShopOpen(true)} className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition flex-shrink-0 flex items-center gap-1 font-bold relative overflow-hidden" title="Rewards">
                  <ShoppingBag size={18} /> <span className="text-xs hidden sm:inline">{coins}</span>
                  {isBoosterActive && <div className="absolute inset-0 bg-orange-500/10 animate-pulse pointer-events-none"></div>}
                </button>
                <button onClick={() => navigate('/leaderboard')} className="p-2 rounded-lg bg-slate-800 text-indigo-400 hover:text-white hover:bg-slate-700 transition flex-shrink-0"><Trophy size={18} /></button>
                <button onClick={() => setActiveTab(activeTab === 'analytics' ? 'overview' : 'analytics')} className={`p-2 rounded-lg transition flex-shrink-0 ${activeTab === 'analytics' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}><BarChart2 size={18} /></button>
                <button onClick={() => setActiveTab(activeTab === 'achievements' ? 'overview' : 'achievements')} className={`p-2 rounded-lg transition flex-shrink-0 ${activeTab === 'achievements' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}><Award size={18} /></button>
                <button onClick={() => setActiveTab('profile')} className={`p-2 rounded-lg transition flex-shrink-0 ${activeTab === 'profile' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-300 hover:text-white'}`}><UserIcon size={18} /></button>
                <button onClick={() => setIsGoalModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-lg flex-shrink-0"><Plus size={16} /> <span className="hidden sm:inline">Add</span></button>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 animate-fade-in">
        {isBoosterActive && (
             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center gap-2 text-orange-400 text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <Flame size={16} className="animate-bounce" /> Double XP Active! Ends: {new Date(activeBoosterExpiry).toLocaleTimeString()}
             </motion.div>
        )}

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
               <div className="lg:col-span-3">
                  <MotivationBanner userName={user?.name} userStreak={userStats.currentStreak} />
                  <TodayFocus goals={goals} logs={logs} onToggle={(gid, status) => toggleLog(todayStr, gid, status)} />
               </div>
               <div className="lg:col-span-1">
                  <ProgressFeed newEvents={feedEvents} />
                  <div className="mt-6 hidden lg:block"><AchievementsWidget stats={userStats} /></div>
               </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
               <div className="lg:col-span-3">
                  <AICoach userBio={user?.bio} goals={goals} logs={logs} currentDate={currentDate} onAddGoal={(g) => { setGoals(p => [...p, {id: crypto.randomUUID(), title: g.title!, icon: g.icon!, color: g.color!, createdAt: new Date().toISOString(), time: g.time, reminderEnabled: !!g.time}]); showToast('Added from AI Coach', 'success'); }} />
               </div>
            </div>
            <Stats goals={goals} logs={logs} currentDate={currentDate} />
            <Calendar currentDate={currentDate} onDateChange={setCurrentDate} logs={logs} goals={goals} onDayClick={setSelectedDay} />
          </>
        )}
        
        {activeTab === 'analytics' && <AnalyticsView user={extendedUser} goals={goals} logs={logs} currentDate={currentDate} onOpenShop={() => setIsShopOpen(true)} />}

        {activeTab === 'achievements' && (
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"><X size={24} /></button>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Achievements</h2>
             </div>
             <AchievementsWidget stats={userStats} />
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto animate-fade-in pb-12">
             <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"><X size={24} /></button>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Profile</h2>
             </div>
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
                <form onSubmit={handleUpdateProfile} className="relative z-10 flex flex-col gap-6">
                   <div className="flex flex-col items-center">
                      <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 ${activeAvatarFrame}`}>
                          <div className="w-full h-full rounded-full ring-4 ring-slate-800 overflow-hidden bg-slate-800 shadow-xl cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            {profilePhoto ? <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500"><UserIcon size={40} /></div>}
                          </div>
                      </div>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                      <p className="mt-3 text-sm text-slate-500">Tap to upload</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Name</label><input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl p-3" /></div>
                      <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label><input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl p-3" /></div>
                   </div>
                   
                   <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Region</label><select value={profileCountry} onChange={(e) => setProfileCountry(e.target.value)} className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl p-3"><option value="">Select...</option>{COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</select></div>
                   <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bio</label><textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl p-3 h-24" /></div>

                   {/* Frame Selection */}
                   {unlockedAvatars.length > 0 && (
                       <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-3 text-center">Frames</label>
                           <div className="flex flex-wrap justify-center gap-3">
                                <button type="button" onClick={() => setActiveAvatarFrame('')} className={`w-10 h-10 rounded-full bg-slate-800 border-2 ${!activeAvatarFrame ? 'border-indigo-500' : 'border-slate-700'} text-xs text-slate-400`}>Off</button>
                               {unlockedAvatars.map(id => {
                                   const frameClass = id === 'frame_gold' ? 'ring-4 ring-amber-400' : id === 'frame_neon' ? 'ring-4 ring-cyan-500' : 'ring-4 ring-rose-500';
                                   return <button key={id} type="button" onClick={() => setActiveAvatarFrame(frameClass)} className={`w-10 h-10 rounded-full bg-slate-800 ${frameClass} ${activeAvatarFrame === frameClass ? 'scale-110' : 'opacity-70'}`} />
                               })}
                           </div>
                       </div>
                   )}

                   <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button type="submit" disabled={isProfileUpdating} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-2">{isProfileUpdating ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save</button>
                      <button type="button" onClick={() => { logout(); navigate('/'); }} className="px-8 py-3 bg-slate-800 hover:text-rose-500 text-slate-300 rounded-xl font-bold transition border border-slate-700 flex items-center justify-center gap-2"><LogOut size={18} /> Logout</button>
                   </div>
                </form>
             </div>
          </div>
        )}
      </main>

      {/* Goal Modal */}
      <AnimatePresence>
      {isGoalModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-white">New Goal</h3><button onClick={() => setIsGoalModalOpen(false)} className="text-slate-500 hover:text-white"><X size={20} /></button></div>
              <HabitTemplates onSelect={(t) => { setNewGoalTitle(t.title); setNewGoalIcon(t.icon); setNewGoalColor(t.color); }} />
              <div className="space-y-4 border-t border-slate-800 pt-4">
                <input type="text" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} placeholder="Goal Title" className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3" />
                <div className="flex gap-4">
                  <input type="time" value={newGoalTime} onChange={(e) => setNewGoalTime(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3" />
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-800"><input type="checkbox" checked={newGoalReminder} onChange={(e) => setNewGoalReminder(e.target.checked)} className="w-5 h-5 rounded bg-slate-900" /><span className="text-sm font-medium text-slate-300"><Bell size={14} /></span></label>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">{ICONS.map(i => <button key={i} onClick={() => setNewGoalIcon(i)} className={`w-10 h-10 flex-shrink-0 rounded-lg text-xl ${newGoalIcon === i ? 'bg-indigo-600' : 'bg-slate-800'}`}>{i}</button>)}</div>
                <div className="flex gap-2 flex-wrap">{COLORS.map(c => <button key={c} onClick={() => setNewGoalColor(c)} className={`w-8 h-8 rounded-full ${c} ${newGoalColor === c ? 'ring-2 ring-white' : 'opacity-70'}`} />)}</div>
              </div>
              <button onClick={addGoal} disabled={!newGoalTitle.trim()} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium mt-6">Create Goal</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Date Modal */}
      <AnimatePresence>
      {selectedDay && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{new Date(selectedDay).toLocaleDateString()}</h3>
                <button onClick={() => setSelectedDay(null)}><X size={24} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {goals.map(g => {
                    const status = logs[selectedDay]?.[g.id] || 'pending';
                    return (
                        <div key={g.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{g.icon}</span>
                                <div><div className="text-sm font-bold text-white">{g.title}</div><div className="text-xs text-slate-500 capitalize">{status}</div></div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={(e) => handleModalAction(e, selectedDay, g.id, 'skipped')} className={`p-2 rounded-lg ${status === 'skipped' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400'}`}><X size={16}/></button>
                                <button onClick={(e) => handleModalAction(e, selectedDay, g.id, 'completed')} className={`p-2 rounded-lg ${status === 'completed' ? g.color + ' text-white' : 'bg-slate-700 text-slate-400'}`}><Check size={16}/></button>
                            </div>
                        </div>
                    )
                })}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
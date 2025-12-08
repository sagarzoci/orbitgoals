import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopItem } from '../types';
import { ShoppingBag, Check, Zap, Palette, Ticket, Shield, Crown, Flame, Smartphone, Loader, Clock, X, SmartphoneNfc } from 'lucide-react';
import { audioService } from '../services/audioService';
import { submitPaymentRequest } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface RewardsShopProps {
  coins: number;
  unlockedThemes: string[];
  unlockedAvatars: string[];
  activeBoosterExpiry?: number;
  isPro: boolean;
  onPurchase: (item: ShopItem) => void;
  onClose: () => void;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 'premium_lifetime', type: 'premium', title: 'Orbit Premium (Lifetime)', description: 'Unlock Advanced Analytics, PDF Reports & Exclusive Badges. Only NPR 30.', cost: 0, value: 'PRO', icon: <Crown className="text-amber-400" /> },
  { id: 'booster_xp_2x', type: 'booster', title: 'Double XP Potion', description: 'Earn 2x XP & Coins for 24 hours.', cost: 400, value: '24h', icon: <Flame className="text-orange-500" /> },
  { id: 'frame_gold', type: 'avatar', title: 'Golden Halo', description: 'Shine on the leaderboard.', cost: 1000, value: 'ring-4 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]', icon: <div className="w-8 h-8 rounded-full border-4 border-amber-400 bg-slate-800"></div> },
  { id: 'frame_neon', type: 'avatar', title: 'Cyber Pulse', description: 'Neon cyan border.', cost: 800, value: 'ring-4 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]', icon: <div className="w-8 h-8 rounded-full border-4 border-cyan-500 bg-slate-800"></div> },
  { id: 'frame_rose', type: 'avatar', title: 'Rose Aura', description: 'Elegant rose glow.', cost: 600, value: 'ring-4 ring-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]', icon: <div className="w-8 h-8 rounded-full border-4 border-rose-500 bg-slate-800"></div> },
  { id: 'theme_sunset', type: 'theme', title: 'Sunset Blvd', description: 'Warm gradients for cold days.', cost: 500, value: 'bg-gradient-to-br from-orange-500 to-rose-500', icon: <Palette className="text-orange-400" /> },
  { id: 'theme_cyber', type: 'theme', title: 'Cyberpunk', description: 'Neon vibes only.', cost: 800, value: 'bg-gradient-to-br from-cyan-500 to-fuchsia-600', icon: <Palette className="text-fuchsia-400" /> },
  { id: 'theme_forest', type: 'theme', title: 'Deep Forest', description: 'Calm and focused green.', cost: 300, value: 'bg-gradient-to-br from-emerald-600 to-teal-800', icon: <Palette className="text-emerald-400" /> },
  { id: 'coupon_streak_freeze', type: 'coupon', title: 'Streak Freeze', description: 'Save your streak for one day.', cost: 150, value: 'FREEZE-1', icon: <Ticket className="text-blue-400" /> },
  { id: 'badge_supporter', type: 'badge', title: 'Early Supporter', description: 'Show you were here first.', cost: 1000, icon: <Shield className="text-indigo-400" /> },
];

const RewardsShop: React.FC<RewardsShopProps> = ({ coins, unlockedThemes, unlockedAvatars, activeBoosterExpiry, isPro, onPurchase, onClose }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'premium' | 'theme' | 'coupon' | 'badge' | 'avatar' | 'booster'>('all');
  const [paymentItem, setPaymentItem] = useState<ShopItem | null>(null);
  const [paymentStep, setPaymentStep] = useState<'scan' | 'verifying' | 'success' | 'pending_admin'>('scan');

  const filteredItems = filter === 'all' ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.type === filter);
  const isBoosterActive = activeBoosterExpiry ? activeBoosterExpiry > Date.now() : false;

  const handleBuy = (item: ShopItem) => {
    if (item.type === 'theme' && unlockedThemes.includes(item.id)) return;
    if (item.type === 'avatar' && unlockedAvatars.includes(item.id)) return;
    if (item.type === 'booster' && isBoosterActive) return;

    if (item.type === 'premium') {
      if (isPro) {
          showToast("You are already a Premium member!", "success");
          return;
      }
      setPaymentItem(item);
      setPaymentStep('scan');
      return;
    }

    if (coins >= item.cost) {
      onPurchase(item);
      audioService.playLevelUp();
      showToast(`Purchased ${item.title}!`, 'success');
    } else {
      audioService.playUndo();
      showToast('Not enough coins!', 'error');
    }
  };

  const handlePaymentVerify = async () => {
    setPaymentStep('verifying');
    if (user && paymentItem?.type === 'premium') {
        try {
            await submitPaymentRequest(user);
            setTimeout(() => {
                setPaymentStep('pending_admin');
                showToast('Request sent to admin', 'success');
            }, 1500);
        } catch (e: any) {
            if (e.message === 'REQUEST_PENDING') {
                setPaymentStep('pending_admin');
                showToast('You already have a pending request.', 'info');
            } else if (e.message === 'ALREADY_PRO') {
                setPaymentItem(null);
                showToast('You are already PRO!', 'success');
            } else {
                setPaymentStep('scan'); 
                showToast('Submission failed. Try again.', 'error');
            }
        }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 bg-black/80 backdrop-blur-md">
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl bg-slate-900 border-none sm:border border-slate-800 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center z-10 sticky top-0 backdrop-blur-xl">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <ShoppingBag className="text-amber-400" size={24} />
             </div>
             <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Rewards</h2>
                <p className="text-xs text-slate-400 hidden sm:block">Upgrade your experience</p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
                <Zap size={16} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-white text-sm">{coins}</span>
             </div>
             <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition">
                <X size={20} />
             </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-3 sm:p-4 flex gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar bg-slate-900/30">
           {['all', 'premium', 'booster', 'avatar', 'theme', 'coupon'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition whitespace-nowrap ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {f}
              </button>
           ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24 sm:pb-6">
           {filteredItems.map(item => {
             const isUnlockedTheme = item.type === 'theme' && unlockedThemes.includes(item.id);
             const isUnlockedAvatar = item.type === 'avatar' && unlockedAvatars.includes(item.id);
             const isBoosterRunning = item.type === 'booster' && isBoosterActive;
             const isPremiumItem = item.type === 'premium';
             const isOwned = isUnlockedTheme || isUnlockedAvatar || isBoosterRunning || (isPremiumItem && isPro);
             const canAfford = isPremiumItem || coins >= item.cost;
             
             return (
               <div key={item.id} className={`border rounded-2xl p-4 sm:p-5 flex flex-col relative group transition-all ${isPremiumItem ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30' : 'bg-slate-800/40 border-slate-700'}`}>
                  <div className="flex justify-between items-start mb-3">
                     <div className={`p-2.5 rounded-xl text-xl ${isPremiumItem ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800'}`}>
                        {item.icon}
                     </div>
                     {isOwned ? (
                       <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20"><Check size={10} /> Owned</span>
                     ) : isPremiumItem ? (
                       <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">PRO</span>
                     ) : (
                       <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${canAfford ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-700 text-slate-500'}`}>
                          <Zap size={10} className="fill-current" /> {item.cost}
                       </span>
                     )}
                  </div>
                  
                  <h3 className="text-base font-bold mb-1 text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 mb-4 flex-grow leading-relaxed">{item.description}</p>
                  
                  <button 
                    onClick={() => handleBuy(item)}
                    disabled={isOwned || !canAfford}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${isOwned ? 'bg-slate-700 text-slate-400' : isPremiumItem ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' : canAfford ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                  >
                    {isOwned ? (item.type === 'booster' ? 'Active' : 'Purchased') : isPremiumItem ? 'Unlock' : canAfford ? 'Buy' : 'Need Coins'}
                  </button>
               </div>
             );
           })}
        </div>
      </motion.div>

      {/* Payment QR Modal */}
      <AnimatePresence>
        {paymentItem && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center p-4 bg-slate-950/95 z-[60]"
            >
                <div className="w-full max-w-sm bg-slate-100 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col items-center max-h-[90vh] overflow-y-auto">
                    {/* Close Button on Header for visibility */}
                    <button onClick={() => setPaymentItem(null)} className="absolute top-4 right-4 text-white/90 hover:text-white z-20 p-2 bg-black/10 rounded-full backdrop-blur-sm transition"><X size={20} /></button>
                    
                    {paymentStep === 'scan' && (
                        <div className="w-full flex flex-col items-center">
                            {/* Fonepay-style Header */}
                            <div className="w-full bg-[#c32128] pt-8 pb-16 px-6 relative flex flex-col items-center text-white">
                                <div className="font-bold text-2xl tracking-tighter mb-1 lowercase">fonepay</div>
                                <div className="text-xs opacity-90 font-medium">Scan and Pay</div>
                            </div>

                            {/* Floating Card */}
                            <div className="w-[85%] -mt-10 bg-white rounded-xl shadow-xl border border-slate-200/50 p-4 flex flex-col items-center z-10">
                                {/* QR Container */}
                                <div className="border-2 border-dashed border-red-100 rounded-lg p-3 mb-4 bg-white relative">
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                        <SmartphoneNfc size={80} className="text-[#c32128]" />
                                    </div>
                                    <img 
                                        src="/payment-qr.png" 
                                        alt="Payment QR" 
                                        className="w-48 h-48 object-contain relative z-10"
                                        onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200/D32F2F/FFFFFF?text=Fonepay+QR"; }}
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#c32128] rounded-full flex items-center justify-center border-2 border-white">
                                        <SmartphoneNfc size={14} className="text-white" />
                                    </div>
                                </div>
                                
                                <h3 className="font-bold text-lg text-slate-900 text-center leading-tight mb-1">Kanchan Prasant Store</h3>
                                <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1">
                                    PAN: <span className="font-mono">649712345</span>
                                </p>

                                <div className="w-full bg-red-50 rounded-lg py-3 px-4 flex justify-between items-center border border-red-100 mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</span>
                                    <span className="text-xl font-black text-[#c32128]">NPR 30.00</span>
                                </div>
                            </div>

                            {/* Footer Area */}
                            <div className="p-6 w-full bg-slate-100">
                                <p className="text-[10px] text-center text-slate-400 mb-4 font-medium uppercase tracking-widest">
                                    Accepted by Mobile Banking & Wallets
                                </p>
                                
                                <button 
                                    onClick={handlePaymentVerify}
                                    className="w-full py-4 bg-[#c32128] text-white rounded-xl font-bold shadow-lg shadow-red-500/20 active:scale-95 transition flex items-center justify-center gap-2 hover:bg-[#a01a1f]"
                                >
                                    <Check size={20} strokeWidth={3} /> I Have Paid
                                </button>
                                
                                <div className="flex justify-center gap-2 mt-4 opacity-40">
                                   <div className="h-1 w-8 bg-slate-400 rounded-full"></div>
                                   <div className="h-1 w-8 bg-slate-400 rounded-full"></div>
                                   <div className="h-1 w-8 bg-slate-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentStep === 'verifying' && (
                        <div className="py-16 text-center w-full px-6 bg-white flex-1 flex flex-col justify-center items-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
                                <div className="bg-red-50 p-4 rounded-full">
                                    <Loader className="animate-spin text-[#c32128]" size={40} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Verifying Payment</h3>
                            <p className="text-slate-500 text-sm">Please wait while we confirm your transaction...</p>
                        </div>
                    )}

                    {paymentStep === 'pending_admin' && (
                        <div className="py-12 text-center w-full px-6 bg-white flex-1 flex flex-col justify-center items-center">
                            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-amber-100">
                                <Clock size={40} className="text-amber-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent</h3>
                            <p className="text-slate-500 text-sm mb-8 px-4 leading-relaxed">
                                Your payment screenshot/request has been sent to the admin. Your <strong>PRO</strong> status will be activated shortly after approval.
                            </p>
                            <button onClick={() => setPaymentItem(null)} className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/10">
                                Back to Shop
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewardsShop;
import React, { useState } from 'react';
import { 
  Shield, Users, DollarSign, Clock, Check, X, RefreshCw, LogOut, 
  Search, Lock, AlertCircle, BarChart3, User, Smartphone, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getPaymentRequests, approvePayment, rejectPayment, getAdminStats, PaymentRequest } from '../services/paymentService';
import { useToast } from '../context/ToastContext';

const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Data State
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, revenue: 0, activeSubs: 0 });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Auth Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
      loadData();
      showToast('Welcome back, Commander.', 'success');
    } else {
      setError('Invalid Access Credentials');
      showToast('Access Denied', 'error');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqs, statistics] = await Promise.all([
        getPaymentRequests(),
        getAdminStats()
      ]);
      setRequests(reqs);
      setStats(statistics);
    } catch (e) {
      console.error("Admin Load Error", e);
      showToast('Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (req: PaymentRequest) => {
    if (!window.confirm(`Confirm PRO activation for ${req.userName}?`)) return;
    
    setActionLoading(req.id);
    try {
      await approvePayment(req.id, req.userId);
      showToast(`Activated PRO for ${req.userName}`, 'success');
      await loadData();
    } catch (e) {
      showToast("Database update failed", 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;
    
    setActionLoading(id);
    try {
      await rejectPayment(id);
      showToast("Payment request rejected", 'info');
      await loadData();
    } catch (e) {
      showToast("Failed to reject", 'error');
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
              <Shield size={32} className="text-indigo-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-1">Orbit Admin</h1>
          <p className="text-slate-500 text-center mb-8 text-sm">Secure Access Portal</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white pl-10 p-3 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-sm"
                  placeholder="admin"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white pl-10 p-3 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-sm"
                  placeholder="••••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}
            
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-900/20 mt-2 flex items-center justify-center gap-2">
              <Lock size={16} /> Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-20">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-red-500/10 p-1.5 sm:p-2 rounded-lg border border-red-500/20">
               <Shield size={18} className="text-red-500" />
            </div>
            <span className="font-bold text-white text-sm sm:text-base">Orbit<span className="text-slate-500">Admin</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">
               {username}
            </span>
            <button 
              onClick={loadData} 
              className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white" 
              title="Refresh Data"
            >
               <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={() => { setIsAuthenticated(false); setPassword(''); setUsername(''); }} 
              className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white"
              title="Logout"
            >
               <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8">
           <StatsCard 
             title="Total Users" 
             value={stats.totalUsers} 
             icon={<Users size={20} className="text-blue-400" />} 
             trend="+12% mo"
           />
           <StatsCard 
             title="Revenue" 
             value={`Rs.${stats.revenue}`} 
             icon={<DollarSign size={20} className="text-emerald-400" />} 
             trend="Est."
           />
           <StatsCard 
             title="Avg Time" 
             value="8m" 
             icon={<Clock size={20} className="text-amber-400" />} 
             trend="Session"
           />
           <StatsCard 
             title="Active Pro" 
             value={stats.activeSubs} 
             icon={<BarChart3 size={20} className="text-purple-400" />} 
             trend="Subs"
           />
        </div>

        {/* Payment Verification Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
           <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                 <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    Payment Verification
                    {requests.filter(r => r.status === 'pending').length > 0 && (
                        <span className="bg-amber-500 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                            {requests.filter(r => r.status === 'pending').length} New
                        </span>
                    )}
                 </h2>
                 <p className="text-slate-500 text-xs sm:text-sm">Review manual QR payments</p>
              </div>
              <div className="relative w-full sm:w-auto">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                 <input type="text" placeholder="Search..." className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 focus:border-indigo-500 outline-none" />
              </div>
           </div>

           {/* Desktop Table View */}
           <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-950/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                       <th className="p-4">User Info</th>
                       <th className="p-4">Amount</th>
                       <th className="p-4">Date</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800">
                    {requests.length === 0 ? (
                       <tr><td colSpan={5} className="p-8 text-center text-slate-500">No requests found.</td></tr>
                    ) : (
                       requests.map((req) => (
                          <RequestRow 
                            key={req.id} 
                            req={req} 
                            onApprove={() => handleApprove(req)} 
                            onReject={() => handleReject(req.id)}
                            loading={actionLoading === req.id}
                          />
                       ))
                    )}
                 </tbody>
              </table>
           </div>

           {/* Mobile Card View */}
           <div className="md:hidden divide-y divide-slate-800">
                {requests.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No requests found.</div>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">{req.userName}</div>
                                        <div className="text-xs text-slate-500">{req.userEmail}</div>
                                    </div>
                                </div>
                                <StatusBadge status={req.status} />
                            </div>
                            
                            <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                                <div className="text-xs text-slate-500">
                                    <div className="mb-1 flex items-center gap-1"><Smartphone size={10}/> ID: {req.userId.slice(0,6)}...</div>
                                    <div>{req.date?.seconds ? new Date(req.date.seconds * 1000).toLocaleDateString() : 'Now'}</div>
                                </div>
                                <div className="font-mono text-emerald-400 font-bold">NPR {req.amount}</div>
                            </div>

                            {req.status === 'pending' && (
                                <div className="flex gap-2 mt-1">
                                    <button 
                                        onClick={() => handleReject(req.id)}
                                        disabled={!!actionLoading}
                                        className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-medium hover:bg-slate-800 transition"
                                    >
                                        Reject
                                    </button>
                                    <button 
                                        onClick={() => handleApprove(req)}
                                        disabled={!!actionLoading}
                                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/20 transition flex items-center justify-center gap-2"
                                    >
                                        {actionLoading === req.id ? <RefreshCw size={14} className="animate-spin"/> : <Check size={14} />}
                                        Approve
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
           </div>
        </div>
      </main>
    </div>
  );
};

// Components extracted for cleaner render
const RequestRow = ({ req, onApprove, onReject, loading }: any) => (
    <motion.tr 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-slate-800/30 transition group"
    >
       <td className="p-4">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold">
                  {req.userName.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{req.userName}</div>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1"><Mail size={10}/> {req.userEmail}</div>
              </div>
          </div>
       </td>
       <td className="p-4 font-mono text-emerald-400 font-medium">NPR {req.amount}</td>
       <td className="p-4 text-sm text-slate-400">
          {req.date?.seconds ? new Date(req.date.seconds * 1000).toLocaleDateString() : 'Just now'}
       </td>
       <td className="p-4">
          <StatusBadge status={req.status} />
       </td>
       <td className="p-4 text-right">
          {req.status === 'pending' && (
             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={onApprove}
                  disabled={loading}
                  className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30 transition disabled:opacity-50"
                  title="Approve"
                >
                   {loading ? <RefreshCw className="animate-spin" size={16} /> : <Check size={16} />}
                </button>
                <button 
                  onClick={onReject}
                  disabled={loading}
                  className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/30 transition disabled:opacity-50"
                  title="Reject"
                >
                   <X size={16} />
                </button>
             </div>
          )}
       </td>
    </motion.tr>
);

const StatsCard = ({ title, value, icon, trend }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl relative overflow-hidden">
     <div className="absolute top-0 right-0 p-3 opacity-10 scale-125 sm:scale-150">{icon}</div>
     <div className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">{title}</div>
     <div className="text-xl sm:text-3xl font-bold text-white mb-1">{value}</div>
     <div className="text-[10px] sm:text-xs text-indigo-400 bg-indigo-500/10 inline-block px-1.5 py-0.5 rounded">{trend}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };
  return (
    <span className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold uppercase border ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;
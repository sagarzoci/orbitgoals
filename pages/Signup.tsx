import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Target, ArrowRight, AlertCircle, UserCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { signup, loginWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await signup(name, email, password);
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate with Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] opacity-30" />

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 animate-fade-in">
        <div className="flex justify-center mb-8">
          <Link to="/" className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform">
            <Target size={32} className="text-white" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">Create Account</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Start your journey to consistency</p>

        {error && (
          <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 text-rose-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <span className="text-sm">Connecting...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </>
            )}
          </button>
          
          <button
            onClick={handleGuestLogin}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full py-3 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white rounded-xl font-bold transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
          >
            <UserCircle size={20} />
            Continue as Guest
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider">Or register with email</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Min. 8 characters"
                minLength={8}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || isGoogleLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Creating Account...' : 'Get Started'}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
import { useState, FormEvent, ChangeEvent } from 'react';
import { Compass, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User } from '../types';

type Mode = 'login' | 'signup';

const avatars = [
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
];

export default function AuthPage() {
  const { setUser, navigateTo } = useApp();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user: User = {
        id: crypto.randomUUID(),
        name: mode === 'signup' ? name : email.split('@')[0],
        email,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      };
      setUser(user);
      navigateTo('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <img
          src="https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-3 shadow-xl">
            <Compass size={28} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Voya</h1>
          <p className="text-white/80 text-sm mt-1 font-medium">AI-powered trip planning</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-7 pb-10 max-w-lg mx-auto w-full shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {(['login', 'signup'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === m
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-orange-200 mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Start Exploring'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-5 p-3 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-xs text-orange-700 text-center font-medium">
            Demo mode — use any email & password to continue
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: '✈️', label: 'AI Itineraries' },
            { icon: '📍', label: 'GPS Spots' },
            { icon: '📸', label: 'Smart Captions' },
          ].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
              <span className="text-xl">{f.icon}</span>
              <span className="text-[11px] font-medium text-gray-600 text-center">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

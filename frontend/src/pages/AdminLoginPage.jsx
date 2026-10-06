import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';
import Logo from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  // Enforce logged-out state by default when visiting login page
  React.useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Authentication denied. Check credentials.');
      }
    } catch (err) {
      setError('Connection failure communicating with authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080D1D] px-4 py-12 text-nex-primary selection:bg-nex-cyan/20">
      <div className="max-w-md w-full space-y-8">
        {/* Top Brand Bar */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" glow={true} />
          </div>
          <div className="text-mono text-xs text-nex-cyan tracking-widest pt-2">
            NEXORAA CONSOLE // RESTRICTED ACCESS
          </div>
          <p className="text-xs text-nex-muted">
            AUTHENTICATE WITH JWT CREDENTIALS TO ACCESS ADMIN CMS
          </p>
        </div>

        {/* Login Card */}
        <div className="card-glass-active p-8 rounded-2xl border border-white/15 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-mono text-xs">
            <span className="text-nex-primary font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-nex-cyan" />
              ROOT AUTHENTICATION
            </span>
            <span className="text-emerald-400 text-[11px]">PORT 5000</span>
          </div>

          {error && (
            <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-300 text-xs text-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-mono text-xs text-nex-muted mb-1.5">
                ADMINISTRATOR EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                  placeholder="admin@domain.com"
                />
                <Mail className="w-4 h-4 text-nex-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-mono text-xs text-nex-muted mb-1.5">
                SECRET PASSPHRASE
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                  placeholder="Enter secret passphrase"
                />
                <Lock className="w-4 h-4 text-nex-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-nex-electric to-nex-cyan hover:from-nex-cyan hover:to-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'AUTHENTICATING TOKEN...' : 'ENTER CONSOLE →'}</span>
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link to="/" className="text-mono text-xs text-nex-muted hover:text-nex-cyan transition-colors">
            ← RETURN TO NEXORAA FRONTEND
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

// pages/admin/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Moon, Sun } from 'lucide-react';
import ThreeBackground from '../../components/ThreeBackground';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check and apply theme
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Redirect if already logged in as admin
    if (isAuthenticated && user?.role === 'ADMIN') {
      navigate('/admin/stats');
    }
  }, [isAuthenticated, user, navigate]);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    toast.success(`Mode ${newDarkMode ? 'sombre' : 'clair'} activé`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        if (result.user?.role === 'ADMIN') {
          toast.success('Bienvenue dans le tableau de bord administrateur !');
          navigate('/admin/stats');
        } else {
          toast.error('Accès non autorisé. Cette page est réservée aux administrateurs.');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erreur de connexion. Veuillez vérifier vos identifiants.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Overlay gradient - meilleur contraste selon le thème */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-black/70 via-black/50 to-transparent' 
            : 'bg-gradient-to-br from-white/30 via-white/20 to-transparent'
        }`}
        style={{ zIndex: 1 }}
      />
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-20 p-3 rounded-full transition-all duration-300 hover:scale-110"
        style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(10px)'
        }}
        type="button"
      >
        {isDark ? (
          <Sun className="w-5 h-5" style={{ color: '#F59E0B' }} />
        ) : (
          <Moon className="w-5 h-5" style={{ color: '#4F46E5' }} />
        )}
      </button>
      
      {/* Content */}
      <div className="relative" style={{ zIndex: 10, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div className="w-full" style={{ maxWidth: '28rem' }}>
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl mb-6"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            >
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              Administration
            </h1>
            <p className="text-lg font-medium" style={{ color: 'var(--color-neutral-light)' }}>
              Accès réservé aux administrateurs
            </p>
          </div>

          {/* Glass Card */}
          <div 
            className="rounded-2xl shadow-2xl p-8 transition-all duration-300"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: `1px solid var(--border-color)`,
              boxShadow: isDark 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Email administrateur
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5" style={{ color: 'var(--color-neutral-mid)' }} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--color-text)'
                    }}
                    placeholder="admin@orientation.mg"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" style={{ color: 'var(--color-neutral-mid)' }} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--color-text)'
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 transition-colors hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                    ) : (
                      <Eye className="h-5 w-5 transition-colors hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Hint */}
              <div 
                className="rounded-lg p-4 transition-all duration-300"
                style={{
                  background: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
                  border: `1px solid ${isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)'}`
                }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                      Identifiants de démonstration
                    </p>
                    <div className="space-y-1 text-sm" style={{ color: 'var(--color-neutral-light)' }}>
                      <p>📧 Email : <span className="text-cyan-500 font-mono">admin@orientation.mg</span></p>
                      <p>🔑 Mot de passe : <span className="text-cyan-500 font-mono">password123</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-300 overflow-hidden group"
                style={{
                  background: loading 
                    ? 'var(--color-neutral-mid)' 
                    : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 transition-transform group-hover:scale-110" />
                      Se connecter
                    </>
                  )}
                </span>
                
                {/* Animated gradient overlay on hover - Supprimé car cause des warnings */}
              </button>
            </form>

            {/* Back to home link */}
            <div className="mt-6 text-center">
              <a 
                href="/" 
                className="inline-flex items-center gap-1 text-sm transition-all duration-300 hover:gap-2"
                style={{ color: 'var(--color-neutral-mid)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-neutral-mid)';
                }}
              >
                ← Retour à l'accueil
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs" style={{ color: 'var(--color-neutral-mid)' }}>
              Plateforme d'Orientation Universitaire - Accès Administrateur
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        input::placeholder {
          color: var(--color-neutral-mid);
          opacity: 0.5;
        }
        
        input:focus::placeholder {
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
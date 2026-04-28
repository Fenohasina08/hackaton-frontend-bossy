// pages/Signin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Moon, Sun, User, ArrowRight, GraduationCap } from 'lucide-react';
import ThreeBackground from '../../../components/ThreeBackground';
import toast from 'react-hot-toast';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Thème management
  useEffect(() => {
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

  // CSS variables pour les thèmes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-glass', 'rgba(17, 24, 39, 0.6)');
      root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--color-text', '#FFFFFF');
      root.style.setProperty('--color-neutral-light', '#9CA3AF');
      root.style.setProperty('--color-neutral-mid', '#6B7280');
      root.style.setProperty('--color-secondary', '#06B6D4');
    } else {
      root.style.setProperty('--bg-glass', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--color-text', '#1F2937');
      root.style.setProperty('--color-neutral-light', '#6B7280');
      root.style.setProperty('--color-neutral-mid', '#9CA3AF');
      root.style.setProperty('--color-secondary', '#0891B2');
    }
  }, [isDark]);

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
        toast.success('Bienvenue sur UniGuide !');
        navigate("/home");
      } else {
        toast.error(result.message || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erreur de connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Overlay gradient */}
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
        className="fixed top-6 right-6 z-20 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-lg"
        style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-color)',
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
          <div className="text-center mb-8 animate-float">
            <div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl mb-6"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            >
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              UniGuide
            </h1>
            <p className="text-lg font-medium" style={{ color: 'var(--color-neutral-light)' }}>
              Connectez-vous à votre avenir
            </p>
          </div>

          {/* Glass Card */}
          <div 
            className="rounded-2xl shadow-2xl p-8 transition-all duration-300 backdrop-blur-xl"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: `1px solid var(--border-color)`,
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Email ou nom d'utilisateur
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 transition-colors group-hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--color-text)'
                    }}
                    placeholder="exemple@email.com"
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
                    <Lock className="h-5 w-5 transition-colors group-hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm transition-all duration-300 hover:underline"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  Mot de passe oublié ?
                </Link>
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
                  opacity: loading ? 0.7 : 1,
                  transform: isHovered && !loading ? 'translateY(-2px)' : 'translateY(0)'
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
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--border-color)' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 backdrop-blur-sm" style={{ background: 'var(--bg-glass)', color: 'var(--color-neutral-mid)' }}>
                  Ou continuer avec
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                border: `1px solid var(--border-color)`,
                color: 'var(--color-text)'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium">Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: 'var(--color-neutral-light)' }}>
                Pas encore de compte ?{' '}
                <Link 
                  to="/signup" 
                  className="font-semibold transition-all duration-300 hover:underline inline-flex items-center gap-1"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  Créer un compte
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs" style={{ color: 'var(--color-neutral-mid)' }}>
              Plateforme d'Orientation Universitaire - Guidez votre avenir
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
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--border-color);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--color-secondary);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #0EA5E9;
        }
      `}</style>
    </div>
  );
};

export default Signin;
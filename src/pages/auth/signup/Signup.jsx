// pages/auth/signup/Signup.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Eye, EyeOff, User, Mail, Lock, Shield, Sparkles, 
  Moon, Sun, ArrowRight, CheckCircle, XCircle, 
  GraduationCap, AlertCircle 
} from 'lucide-react';
import ThreeBackground from '../../../components/ThreeBackground';
import toast from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  const { register } = useAuth();
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
      root.style.setProperty('--color-success', '#10B981');
      root.style.setProperty('--color-error', '#EF4444');
      root.style.setProperty('--color-warning', '#F59E0B');
    } else {
      root.style.setProperty('--bg-glass', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--color-text', '#1F2937');
      root.style.setProperty('--color-neutral-light', '#6B7280');
      root.style.setProperty('--color-neutral-mid', '#9CA3AF');
      root.style.setProperty('--color-secondary', '#0891B2');
      root.style.setProperty('--color-success', '#059669');
      root.style.setProperty('--color-error', '#DC2626');
      root.style.setProperty('--color-warning', '#D97706');
    }
  }, [isDark]);

  // Vérification de la force du mot de passe
  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordChecks(checks);
    
    const strength = Object.values(checks).filter(Boolean).length;
    setPasswordStrength(strength);
  }, [password]);

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

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return { text: 'Très faible', color: 'var(--color-error)', progress: 10 };
      case 1: return { text: 'Faible', color: 'var(--color-error)', progress: 30 };
      case 2: return { text: 'Moyen', color: 'var(--color-warning)', progress: 50 };
      case 3: return { text: 'Bon', color: 'var(--color-secondary)', progress: 70 };
      case 4: return { text: 'Fort', color: '#10B981', progress: 90 };
      case 5: return { text: 'Très fort', color: '#10B981', progress: 100 };
      default: return { text: '', color: 'var(--color-neutral-mid)', progress: 0 };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    if (passwordStrength < 3) {
      toast.error('Veuillez utiliser un mot de passe plus fort');
      return;
    }
    
    if (!acceptTerms) {
      toast.error('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);
    
    try {
      const result = await register({ username, email, password });
      
      if (result.success) {
        toast.success('Compte créé avec succès ! Bienvenue sur UniGuide !');
        navigate("/home");
      } else {
        toast.error(result.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
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
              Rejoignez UniGuide
            </h1>
            <p className="text-lg font-medium" style={{ color: 'var(--color-neutral-light)' }}>
              Créez votre compte et commencez votre aventure
            </p>
          </div>

          {/* Glass Card */}
          <div 
            className="rounded-2xl shadow-2xl p-8 transition-all duration-300 backdrop-blur-xl max-h-[85vh] overflow-y-auto"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: `1px solid var(--border-color)`,
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Nom d'utilisateur
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 transition-colors group-hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--color-text)'
                    }}
                    placeholder="john_doe"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 transition-colors group-hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
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
                    autoComplete="new-password"
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

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--color-neutral-light)' }}>
                        Force du mot de passe :
                      </span>
                      <span className="text-xs font-semibold" style={{ color: getPasswordStrengthText().color }}>
                        {getPasswordStrengthText().text}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${getPasswordStrengthText().progress}%`,
                          background: `linear-gradient(90deg, var(--color-error), var(--color-success))`
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(passwordChecks).map(([key, valid]) => (
                        <div key={key} className="flex items-center gap-1">
                          {valid ? (
                            <CheckCircle className="w-3 h-3" style={{ color: 'var(--color-success)' }} />
                          ) : (
                            <XCircle className="w-3 h-3" style={{ color: 'var(--color-neutral-mid)' }} />
                          )}
                          <span style={{ color: valid ? 'var(--color-success)' : 'var(--color-neutral-mid)' }}>
                            {key === 'length' && '8+ caractères'}
                            {key === 'uppercase' && 'Majuscule'}
                            {key === 'lowercase' && 'Minuscule'}
                            {key === 'number' && 'Chiffre'}
                            {key === 'special' && 'Caractère spécial'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Confirmer le mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 transition-colors group-hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      border: `1px solid var(--border-color)`,
                      color: 'var(--color-text)'
                    }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 transition-colors hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                    ) : (
                      <Eye className="h-5 w-5 transition-colors hover:text-cyan-500" style={{ color: 'var(--color-neutral-mid)' }} />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs flex items-center gap-1" style={{ color: 'var(--color-error)' }}>
                    <AlertCircle className="w-3 h-3" />
                    Les mots de passe ne correspondent pas
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded transition-colors focus:ring-2 focus:ring-cyan-500"
                  style={{ accentColor: 'var(--color-secondary)' }}
                />
                <label htmlFor="terms" className="text-xs" style={{ color: 'var(--color-neutral-light)' }}>
                  J'accepte les{' '}
                  <Link to="/terms" className="hover:underline" style={{ color: 'var(--color-secondary)' }}>
                    conditions d'utilisation
                  </Link>
                  {' '}et la{' '}
                  <Link to="/privacy" className="hover:underline" style={{ color: 'var(--color-secondary)' }}>
                    politique de confidentialité
                  </Link>
                </label>
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
                      Création du compte...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
                      Créer mon compte
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: 'var(--color-neutral-light)' }}>
                Vous avez déjà un compte ?{' '}
                <Link 
                  to="/signin" 
                  className="font-semibold transition-all duration-300 hover:underline inline-flex items-center gap-1"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs" style={{ color: 'var(--color-neutral-mid)' }}>
              Rejoignez des milliers d'étudiants qui nous font confiance
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
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: var(--border-color);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: var(--color-secondary);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #0EA5E9;
        }
      `}</style>
    </div>
  );
};

export default Signup;
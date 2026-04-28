import { useState, useEffect } from 'react';
import { Search, Filter, Sun, Moon, Globe, User, LogOut, CheckSquare, Square, X } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Header({ isAuthenticated, toggleTheme, isDark, toggleLang, lang }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filters, setFilters] = useState({ universities: false, orientation: false, formation: false });
  const [ecolage, setEcolage] = useState('');

  const toggleFilter = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

  // Immediately apply the theme class to the root element
  const applyThemeToDocument = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // Sync the theme on mount and whenever isDark changes
  useEffect(() => {
    applyThemeToDocument(isDark);
  }, [isDark]);

  // Local handler that applies the theme AND notifies the parent
  const handleToggleTheme = () => {
    const nextDark = !isDark;
    applyThemeToDocument(nextDark);
    toggleTheme();
  };

  return (
    <header className="h-16 glass flex items-center justify-between px-4 md:px-6 border-b border-neutral-dark z-40 relative">
      
      {/* Logo / Marque - centré sur mobile, à gauche sur desktop */}
      <div className="flex-1 flex justify-start">
        <Link to="/" className="text-xl font-bold text-secondary">
          I-Bosy
        </Link>
      </div>

      {/* Espace central vide - pour équilibrer le layout */}
      <div className="flex-1 hidden md:block"></div>

      {/* Actions droite : masquées ou réduites sur mobile */}
      <div className="flex items-center gap-2 md:gap-3 z-50">
        <button onClick={handleToggleTheme} className="p-2 bg-neutral-dark rounded-lg transition-colors">
          {isDark ? <Moon size={18} className="text-white" /> : <Sun size={18} className="text-yellow-400" />}
        </button>

        <button onClick={toggleLang} className="hidden md:flex items-center gap-1 px-3 py-1 bg-neutral-dark rounded-lg text-sm font-bold hover:bg-neutral-white/10">
          <Globe size={16} /> 
          <span className={lang === 'fr' ? 'text-yellow-400' : 'text-neutral-mid'}>FR</span>
          <span>/</span>
          <span className={lang === 'en' ? 'text-yellow-400' : 'text-neutral-mid'}>EN</span>
        </button>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <button className="hidden md:flex text-sm text-red-400 items-center gap-2 hover:text-red-300 transition">
              <LogOut size={16}/>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-1 md:gap-2 ml-2 md:ml-4">
            <Link
              to="/signin"
              className="px-3 md:px-4 py-2 bg-secondary text-primary rounded-lg text-xs md:text-sm font-bold hover:opacity-90 transition-all"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="hidden md:block px-4 py-2 bg-secondary text-primary rounded-lg text-sm font-bold hover:opacity-90 transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
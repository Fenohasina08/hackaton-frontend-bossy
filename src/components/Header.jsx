import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Sun, Moon, Globe, User, LogOut } from 'lucide-react';

export default function Header({ isAuthenticated, toggleTheme, isDark, toggleLang, lang }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Immediately apply the theme class to the root element
  const applyThemeToDocument = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      // Optionally inject a CSS variable directly:
      // document.documentElement.style.setProperty('--theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      // document.documentElement.style.setProperty('--theme', 'light');
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
    toggleTheme(); // inform the parent for persistence
  };

  return (
    <header className="h-16 glass flex items-center justify-between px-6 border-b border-neutral-dark z-40">
      
      {/* Search area */}
      <div className="relative">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)} 
          className="flex items-center gap-2 bg-neutral-dark p-2 rounded-lg text-neutral-light border border-neutral-white/10"
        >
          <Search size={18} /> <span>Search...</span> <Filter size={18} />
        </button>
        
        {isSearchOpen && (
          <div className="absolute top-14 left-0 w-80 glass p-4 rounded-xl border border-neutral-white/10 shadow-xl z-50">
            <input 
              type="text" 
              autoFocus
              placeholder="Search content..." 
              className="w-full bg-neutral-dark/50 text-white p-2 rounded-lg outline-none border border-secondary/30"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme button with direct handling */}
        <button 
          onClick={handleToggleTheme} 
          className="p-2 bg-neutral-dark rounded-lg hover:bg-neutral-white/10"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          onClick={toggleLang} 
          className="px-3 py-1 bg-neutral-dark rounded-lg text-sm font-bold hover:bg-neutral-white/10"
        >
          {lang.toUpperCase()}
        </button>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3 ml-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User size={16}/>
            </div>
            <button className="flex items-center gap-2 text-sm text-red-400">
              <LogOut size={16}/> Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 ml-4">
            <Link
              to="/signin"
              className="px-4 py-1 bg-secondary rounded-lg text-sm font-bold"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-1 bg-secondary rounded-lg text-sm font-bold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
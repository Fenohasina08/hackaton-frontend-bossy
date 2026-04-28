import { useState } from 'react';
import { Search, Filter, Sun, Moon, Globe, User, LogOut, CheckSquare, Square, X } from 'lucide-react';

export default function Header({ isAuthenticated, toggleTheme, isDark, toggleLang, lang }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filters, setFilters] = useState({ universities: false, orientation: false, formation: false });
  const [ecolage, setEcolage] = useState('');

  const toggleFilter = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <header className="h-16 glass flex items-center justify-between px-4 md:px-6 border-b border-neutral-dark z-40 relative">
      
      {/* Overlay pour fermer la recherche */}
      {isSearchOpen && <div className="fixed inset-0 z-40" onClick={() => setIsSearchOpen(false)}></div>}

      {/* Barre de recherche : s'adapte à la largeur */}
      <div className="flex-1 max-w-lg md:max-w-2xl mx-2 md:mx-auto px-2 relative z-50">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)} 
          className="w-full flex items-center gap-3 bg-neutral-dark p-2.5 md:p-3 rounded-xl text-neutral-light border border-neutral-white/10 hover:border-secondary/50 transition-all"
        >
          <Search size={20} /> <span className="hidden md:inline">Search content...</span>
        </button>
        
        {isSearchOpen && (
          <div className="absolute top-16 left-0 w-full glass p-4 md:p-6 rounded-2xl border border-neutral-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Search & Filters</h3>
              <button onClick={() => setIsSearchOpen(false)}><X size={20} /></button>
            </div>
            <input type="text" autoFocus placeholder="Type your search..." className="w-full bg-neutral-dark/50 text-white p-3 mb-6 rounded-xl outline-none border border-secondary/30" />
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="text-neutral-mid text-sm w-full">Category:</span>
              {Object.keys(filters).map((key) => (
                <button key={key} onClick={() => toggleFilter(key)} className="flex items-center gap-2 text-sm text-neutral-white">
                  {filters[key] ? <CheckSquare size={18} className="text-secondary" /> : <Square size={18} />}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-neutral-mid text-sm">Écolage:</span>
              <div className="flex flex-wrap gap-2">
                {['< 1.200.000', '> 1.200.000', '1.2M - 1.8M'].map((range) => (
                  <button key={range} onClick={() => setEcolage(range)} className={`px-3 py-1 rounded-lg text-xs border ${ecolage === range ? 'bg-secondary text-primary border-secondary' : 'bg-neutral-dark border-neutral-mid'}`}>
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions droite : masquées ou réduites sur mobile */}
      <div className="flex items-center gap-2 md:gap-3 z-50">
        <button onClick={toggleTheme} className="p-2 bg-neutral-dark rounded-lg transition-colors">
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
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><User size={16}/></div>
            <button className="hidden md:flex text-sm text-red-400 items-center gap-2"><LogOut size={16}/>Logout</button>
          </div>
        ) : (
          <div className="flex gap-1 md:gap-2 ml-2 md:ml-4">
            <button className="px-3 md:px-4 py-2 bg-secondary text-primary rounded-lg text-xs md:text-sm font-bold hover:opacity-90 transition-all">Sign In</button>
            <button className="hidden md:block px-4 py-2 bg-secondary text-primary rounded-lg text-sm font-bold hover:opacity-90 transition-all">Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
}
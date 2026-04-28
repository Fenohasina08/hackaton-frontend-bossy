// pages/admin/AdminSidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BookOpen, Compass, GraduationCap, Info, Settings, 
  LayoutDashboard, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fonction pour vérifier si le lien est actif
  const isLinkActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/stats';
    }
    return location.pathname === path;
  };

  const linkClass = ({ isActive }) => {
    // Utiliser notre propre logique au lieu de isActive
    const active = isLinkActive('/admin');
    
    return `flex items-center gap-3 p-4 mx-2 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
      active 
        ? 'bg-secondary/20 text-secondary border border-secondary/50' 
        : 'hover:bg-neutral-white/5 text-neutral-light'
    }`;
  };

  const menuItemClass = (path) => {
    const active = isLinkActive(path);
    
    return `flex items-center gap-3 p-4 mx-2 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
      active 
        ? 'bg-secondary/20 text-secondary border border-secondary/50' 
        : 'hover:bg-neutral-white/5 text-neutral-light'
    }`;
  };

  return (
    <nav className={`flex flex-col h-full glass transition-all duration-300 border-r border-neutral-white/10 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Header : Logo disparaît quand isCollapsed est true */}
      <div className="p-6 flex items-center justify-between shrink-0">
        {!isCollapsed && (
          <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent-blue text-xl">
            ADMIN PANEL
          </span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1.5 rounded-lg bg-neutral-white/5 hover:bg-neutral-white/10 text-neutral-light transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Liste principale */}
      <ul className="flex-1 space-y-2 overflow-y-auto py-2">
        {/* Stats / Dashboard */}
        <li>
          <NavLink 
            to="/admin/stats" 
            end
            className={({ isActive }) => menuItemClass('/admin/stats')}
          >
            <span className="shrink-0"><LayoutDashboard size={20} /></span>
            {!isCollapsed && <span className="transition-opacity duration-300">Dashboard</span>}
          </NavLink>
        </li>

        {/* Universities */}
        <li>
          <NavLink 
            to="/admin/universities" 
            className={({ isActive }) => menuItemClass('/admin/universities')}
          >
            <span className="shrink-0"><BookOpen size={20} /></span>
            {!isCollapsed && <span className="transition-opacity duration-300">Universités</span>}
          </NavLink>
        </li>

        {/* Scholarships */}
        <li>
          <NavLink 
            to="/admin/scholarships" 
            className={({ isActive }) => menuItemClass('/admin/scholarships')}
          >
            <span className="shrink-0"><Compass size={20} /></span>
            {!isCollapsed && <span className="transition-opacity duration-300">Bourses</span>}
          </NavLink>
        </li>
      </ul>

      {/* Settings : Fixé en bas, toujours visible */}
      <div className="mt-auto border-t border-neutral-white/10 pt-2 shrink-0">
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `flex items-center gap-3 p-4 mx-2 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
            isActive 
              ? 'bg-secondary/20 text-secondary border border-secondary/50' 
              : 'hover:bg-neutral-white/5 text-neutral-light'
          }`}
        >
          <span className="shrink-0"><Settings size={20} /></span>
          {!isCollapsed && <span className="transition-opacity duration-300">Paramètres</span>}
        </NavLink>
      </div>
    </nav>
  );
}
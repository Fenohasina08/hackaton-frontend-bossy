import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Compass, GraduationCap, Info, Settings, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';

 export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-4 mx-2 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
      isActive 
        ? 'bg-secondary/20 text-secondary border border-secondary/50' 
        : 'hover:bg-neutral-white/5 text-neutral-light'
    }`;

  return (
    <nav className={`flex flex-col h-full glass transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Header : Logo disparaît quand isCollapsed est true */}
      <div className="p-6 flex items-center justify-between shrink-0">
        {!isCollapsed && (
          <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent-blue text-xl">
            MY APP
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
        {[
          { to: "/home", icon: <LayoutDashboard size={20} />, label: "Home" },
          { to: "/universities", icon: <BookOpen size={20} />, label: "Universities" },
          { to: "/orientation", icon: <Compass size={20} />, label: "Orientation" },
          { to: "/formation", icon: <GraduationCap size={20} />, label: "Formation" },
          { to: "/about", icon: <Info size={20} />, label: "About" },
        ].map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={linkClass}>
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="transition-opacity duration-300">{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Settings : Fixé en bas, toujours visible */}
      <div className="mt-auto border-t border-neutral-white/10 pt-2 shrink-0">
        <NavLink to="/settings" className={linkClass}>
          <span className="shrink-0"><Settings size={20} /></span>
          {!isCollapsed && <span className="transition-opacity duration-300">Settings</span>}
        </NavLink>
      </div>
    </nav>
  );
}

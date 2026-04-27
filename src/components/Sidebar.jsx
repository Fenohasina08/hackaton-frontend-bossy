// src/components/Sidebar.jsx
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
    `flex items-center gap-3 p-4 mx-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-secondary/20 text-secondary' : 'text-neutral-light hover:bg-neutral-white/5'}`;

  return (
    <nav className={`h-full glass flex flex-col border-r border-neutral-dark transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-8 flex items-center justify-between">
        {!isCollapsed && <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent-blue">LOGO</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-neutral-light p-2 hover:bg-neutral-white/10 rounded-lg">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {/* Liste de navigation scrollable */}
      <ul className="flex-1 space-y-2 overflow-y-auto">
        {[
          {to: "/home", icon: <LayoutDashboard size={20}/>, label: "Home"}, 
          {to: "/universities", icon: <BookOpen size={20}/>, label: "Universities"}, 
          {to: "/orientation", icon: <Compass size={20}/>, label: "Orientation"}, 
          {to: "/formation", icon: <GraduationCap size={20}/>, label: "Formation"}, 
          {to: "/about", icon: <Info size={20}/>, label: "About"}
        ].map(item => (
          <li key={item.to}>
            <NavLink to={item.to} className={linkClass}>
              {item.icon} {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
      
      {/* Settings fixé en bas (hors du bloc scrollable) */}
      <div className="mt-auto p-4 border-t border-neutral-dark">
        <NavLink to="/Settings" className={linkClass}>
          <Settings size={20} /> {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </nav>
  );
}
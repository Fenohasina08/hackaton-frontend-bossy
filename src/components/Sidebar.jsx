// components/SidebarContent.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, LayoutTemplate, Settings, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import LogoutModal from './LogoutModal';

export default function SidebarContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-4 mx-2 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${isActive ? 'bg-secondary/20 text-secondary border border-secondary/50' : 'hover:bg-neutral-white/5 text-neutral-light'}`;

  const handleLogout = () => {
    setIsModalOpen(false);
    console.log("User logged out");
  };

  return (
    <>
      <nav className={`flex flex-col h-full glass transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent-blue text-xl">Mon App CV</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-lg bg-neutral-white/5 hover:bg-neutral-white/10 text-neutral-light transition-colors">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <ul className="flex-1 space-y-2">
          {[
            { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
            { to: "/dashboard/profil", icon: <User size={20} />, label: "Profil" },
            { to: "/dashboard/entretien", icon: <Briefcase size={20} />, label: "Entretien" },
            { to: "/dashboard/model", icon: <LayoutTemplate size={20} />, label: "Model" },
            { to: "/dashboard/setting", icon: <Settings size={20} />, label: "Setting" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === "/dashboard"} className={linkClass}>
                <span className="shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="transition-opacity duration-300">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-3 p-4 m-4 rounded-xl  bg-button text-white transition-all duration-300  hover:bg-button hover:text-neutral-white ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </nav>

      <LogoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </>
  );
}
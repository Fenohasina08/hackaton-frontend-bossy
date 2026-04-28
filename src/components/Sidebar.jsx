import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Compass, GraduationCap, Info, Settings, 
  LayoutDashboard, ChevronLeft, ChevronRight, LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Setting from './Setting';

export default function Sidebar() {  // ← Assurez-vous d'avoir "export default"
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 mx-2 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const getInitials = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <>
      <nav className={`h-screen fixed left-0 top-0 glass flex flex-col border-r border-gray-700 bg-gray-900 transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Iboss
            </span>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-gray-400 p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        {user && (
          <div 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-3 p-3 m-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-800 mb-2 border border-gray-700"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {getInitials()}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user?.role || 'USER'}</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Links */}
        <ul className="flex-1 space-y-1 overflow-y-auto p-2">
          {[
            { to: "/home", icon: <LayoutDashboard size={20}/>, label: "Accueil" }, 
            { to: "/universities", icon: <BookOpen size={20}/>, label: "Universités" }, 
            { to: "/orientation", icon: <Compass size={20}/>, label: "Orientation" }, 
            { to: "/about", icon: <Info size={20}/>, label: "À propos" }
          ].map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.icon} {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Bottom Section */}
        <div className="p-2 border-t border-gray-700 space-y-1">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-gray-400 hover:bg-gray-800 hover:text-white w-full`}
          >
            <Settings size={20} />
            {!isCollapsed && <span>Paramètres</span>}
          </button>
          
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </nav>

      {/* Settings Modal */}
      <Setting isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}

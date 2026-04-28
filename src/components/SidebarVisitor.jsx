// src/components/SidebarVisitor.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Compass, Info, 
  LayoutDashboard, ChevronLeft, ChevronRight, LogIn,
  GraduationCap
} from 'lucide-react';

export default function SidebarVisitor() {
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  return (
    <nav className={`h-screen fixed left-0 top-0 glass flex flex-col border-r border-gray-700 bg-gray-900 transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ">
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
      
      {/* Visitor Info */}
      <div className="flex items-center gap-3 p-3 m-2 rounded-xl bg-gray-800/50 mb-4 border border-gray-700">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center">
          <GraduationCap size={18} className="text-gray-400" />
        </div>
        {!isCollapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-300 truncate">
              Visitor Mode
            </p>
            <p className="text-xs text-gray-500">Guest</p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 space-y-1 overflow-y-auto p-2">
        {[
          { to: "/", icon: <LayoutDashboard size={20}/>, label: "Accueil" }, 
          { to: "/universities", icon: <BookOpen size={20}/>, label: "Universités" }, 
          { to: "/orientation", icon: <Compass size={20}/>, label: "Orientation" }, 
          { to: "/about", icon: <Info size={20}/>, label: "À propos" }
        ].map(item => (
          <li key={item.to}>
            <NavLink to={item.to} className={linkClass} end>
              {item.icon} {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
      
      {/* Bottom Section - Sign In Button */}
      <div className="p-2 border-t border-gray-700 space-y-1">
        <button
          onClick={() => navigate('/signin')}
          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg w-full"
        >
          <LogIn size={20} />
          {!isCollapsed && <span>Sign In</span>}
        </button>
        
        <button
          onClick={() => navigate('/signup')}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-gray-400 hover:bg-gray-800 hover:text-white w-full`}
        >
          <LogIn size={20} />
          {!isCollapsed && <span>Create Account</span>}
        </button>
      </div>
    </nav>
  );
}
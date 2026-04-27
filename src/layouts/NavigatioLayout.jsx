// components/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarContent from './SidebarContent';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen gradient-bg text-neutral-white overflow-hidden">
      {/* Sidebar passe l'état en prop */}
      <SidebarContent 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <main className="flex-1 overflow-y-auto p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
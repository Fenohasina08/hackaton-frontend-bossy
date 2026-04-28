import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../pages/admin/AdminSidebar';

export default function AdminLayout() {
  const [isAuthenticated] = useState(false); // Remplacez par votre logique AuthContext
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('fr');

  return (
    <div className={`${isDark ? 'dark' : ''} flex h-screen bg-background text-neutral-white`}>
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isAuthenticated={isAuthenticated}
          toggleTheme={() => setIsDark(!isDark)} 
          isDark={isDark} 
          toggleLang={() => setLang(lang === 'fr' ? 'en' : 'fr')} 
          lang={lang} 
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
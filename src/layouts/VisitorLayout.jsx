// src/layouts/VisitorLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarVisitor from "../components/SidebarVisitor";
import Footer from "../components/Footer";

export default function VisitorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarVisitor />
      <div className="flex-1 ml-20 lg:ml-64 transition-all duration-300">
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex bg-gray-100 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <Sidebar />
      <main className={`flex-1 relative ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="h-full pl-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

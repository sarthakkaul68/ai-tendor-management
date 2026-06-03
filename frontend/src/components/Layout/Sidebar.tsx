import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderOpen,
  Users,
  Settings,
  BarChart3,
  FileText,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Activity 
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "users", label: "Users", icon: Users, path: "/Users" },
    { id: "projects", label: "Tenders", icon: FolderOpen, path: "/projects" },
    { id: "documents", label: "Documents", icon: FileText, path: "/Documents" },
    { id: "timeline", label: "Timeline", icon: TrendingUp, path: "/Timeline" },
    { id: "reports", label: "Reports", icon: BarChart3, path: "/Reports" },
    { id: "workflow", label: "Work Flow", icon: Activity, path: "/Workflow" },
    { id: "settings", label: "Settings", icon: Settings, path: "/Setting" },
  ];

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
 
    navigate("/"); 
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white sticky top-0 z-40">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">AI-DMS</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col justify-between shadow-lg z-50 transform transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 w-64`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center space-x-2 px-6 py-4 border-b border-gray-700">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DMS</span>
          </div>
          <span className="text-xl font-bold">AI-DMS</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

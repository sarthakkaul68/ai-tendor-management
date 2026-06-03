import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import axios from "axios";

const Header: React.FC = () => {

    const [role, setRole] = useState(null);
     useEffect(() => {
  const fetchUser = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token"); 
      const res = await axios.get(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(res.data.user.role);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  fetchUser();
}, []);


  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left placeholder (can add buttons later) */}
        <div className="flex items-center space-x-2"></div>
         <div className="flex items-center space-x-2"></div>

        {/* Title */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#038EDC] text-center">
            AI-Tender  Management System
          </h1>
        </div>

        {/* Profile / User section */}
        <div className="flex items-center space-x-4">
          {/* Future search/notifications/settings can go here */}

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

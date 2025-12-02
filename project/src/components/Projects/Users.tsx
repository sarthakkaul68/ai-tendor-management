import React, { useState,useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  UserPlus,
  RefreshCw,
  Shield,
  Trash2,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  srNo: number;
  userId: string;
  userName: string;
  mobile: string;
  email: string;
  division: string;
  dept: string;
  role: string;
  available: boolean;
  avatar: string;
  lastLogin: string;
}

interface SortConfig {
  key: keyof User | null;
  direction: "ascending" | "descending";
}

const Users: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });
  const [activeFilters, setActiveFilters] = useState<Partial<User>>({});
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  // const [users, setUsers] = useState<User[]>([
  //   {
  //     id: 1,
  //     srNo: 1,
  //     userId: "41001461",
  //     userName: "Vinit Yadav",
  //     mobile: "8090409868",
  //     email: "Vinit.Yadav@redian.com",
  //     division: "BIDC",
  //     dept: "IT",
  //     role: "Admin",
  //     active: true,
  //     avatar: "VY",
  //     lastLogin: "2023-12-15T10:30:00",
  //   },
  //   {
  //     id: 2,
  //     srNo: 2,
  //     userId: "41001462",
  //     userName: "Sarah Johnson",
  //     mobile: "9390409845",
  //     email: "sarah.johnson@redian.com",
  //     division: "BIDC",
  //     dept: "Finance",
  //     role: "Manager",
  //     active: false,
  //     avatar: "SJ",
  //     lastLogin: "2023-12-10T14:22:00",
  //   },
  //   {
  //     id: 3,
  //     srNo: 3,
  //     userId: "41001463",
  //     userName: "Michael Chen",
  //     mobile: "8390409811",
  //     email: "michael.chen@redian.com",
  //     division: "BIDC",
  //     dept: "Operations",
  //     role: "User",
  //     active: true,
  //     avatar: "MC",
  //     lastLogin: "2023-12-18T09:15:00",
  //   },
  //   {
  //     id: 4,
  //     srNo: 4,
  //     userId: "41001464",
  //     userName: "Priya Sharma",
  //     mobile: "7890123456",
  //     email: "priya.sharma@redian.com",
  //     division: "Operations",
  //     dept: "Logistics",
  //     role: "User",
  //     active: true,
  //     avatar: "PS",
  //     lastLogin: "2023-12-17T16:45:00",
  //   },
  //   {
  //     id: 5,
  //     srNo: 5,
  //     userId: "41001465",
  //     userName: "Rajesh Kumar",
  //     mobile: "8901234567",
  //     email: "rajesh.kumar@redian.com",
  //     division: "Finance",
  //     dept: "Accounts",
  //     role: "Manager",
  //     active: true,
  //     avatar: "RK",
  //     lastLogin: "2023-12-16T11:20:00",
  //   },
  // ]);




  useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/api/users/all`); 
    const data = await res.json();
    if (data.success) {
      
      const formattedUsers = data.users.map((u: any, index: number) => ({
        id: index + 1,
        srNo: index + 1,
        userId: u.employeeId,
        userName: u.name,
        mobile: u.mobile,
        email: u.email,
        division: u.division || "-",  
        dept: u.department || "-",         
        role: u.role || "User",
        available: u.available ?? true,  
        avatar: u.name ? u.name[0] + (u.name.split(" ")[1]?.[0] || "") : "",
        lastLogin: u.lastLogin || new Date().toISOString(),
      }));
      setUsers(formattedUsers);
    }
  } catch (err) {
    console.error("Failed to fetch users", err);
  }
};


  const handleSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const addUser = () => navigate("");

  const handleFilterChange = (filterType: keyof User, value: string | null) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]:
        value === null || value === "all"
          ? undefined
          : filterType === "active"
          ? value === "true"
          : value,
    }));
  };

  const exportUsers = () => {
    alert(`Exporting ${selectedUsers.length} users`);
  };

  const deleteUsers = () => {
    if (selectedUsers.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedUsers.length} user(s)?`
      )
    ) {
      setUsers((prev) =>
        prev.filter((user) => !selectedUsers.includes(user.id))
      );
      setSelectedUsers([]);
    }
  };

  const getUniqueValues = (key: keyof User) =>
    Array.from(new Set(users.map((user) => user[key])));

  const formatLastLogin = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-GB", options); // Example: 11/10/2025, 03:45 PM
};

  return (
    <main className="flex-1 min-h-screen bg-gray-50 p-2 md:p-4 md:ml-64 transition-all duration-300 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl shadow-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-slate-600">
              Manage roles, permissions, and access for your users
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={addUser}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            <UserPlus className="w-4 h-4" /> Add User
          </button>

          {selectedUsers.length > 0 && (
            <>
              <button
                onClick={exportUsers}
                className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                <Download className="w-4 h-4" /> Export
              </button>
              <button
                onClick={deleteUsers}
                className="flex items-center gap-2 px-3 md:px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm md:text-base"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              <Filter className="w-4 h-4" /> Filters
              {Object.values(activeFilters).filter(Boolean).length > 0 && (
                <span className="bg-blue-600 text-white text-xs md:text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(activeFilters).filter(Boolean).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveFilters({});
                setSearchTerm("");
                setSortConfig({ key: null, direction: "ascending" });
              }}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                onChange={(e) => handleFilterChange("active", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                onChange={(e) => handleFilterChange("role", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Roles</option>
                {getUniqueValues("role").map((role) => (
                  <option key={String(role)} value={String(role)}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                onChange={(e) => handleFilterChange("dept", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Departments</option>
                {getUniqueValues("dept").map((dept) => (
                  <option key={String(dept)} value={String(dept)}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              {[
                "srNo",
                "userId",
                "userName",
                "mobile",
                "email",
                "division",
                "dept",
                "role",
                "Status",
                "Last Login",
              ].map((key) => (
                <th
                  key={key}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(key as keyof User)}
                >
                  <div className="flex items-center gap-1">
                    {key.toUpperCase()}
                    {sortConfig.key === key && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          sortConfig.direction === "descending"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="px-3 py-2 text-sm text-gray-900">{user.srNo}</td>
                <td className="px-3 py-2 text-sm text-gray-900 font-mono">
                  {user.userId}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900">
                  {user.userName}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900">
                  {user.mobile}
                </td>
                <td className="px-3 py-2 text-sm text-blue-600">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="px-3 py-2 text-sm text-gray-900">
                  {user.division}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900">
                  {user.dept}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "Manager"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-3 py-2 text-sm text-gray-600">
                  {user.available ? "Available" : "Not Available"}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500">
                  {formatLastLogin(user.lastLogin)}
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => navigate("", { state: { user } })}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;

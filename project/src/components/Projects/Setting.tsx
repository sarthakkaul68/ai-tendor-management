import React, { useState } from "react";
import { User,  FileText, Bell, Save, Shield, Mail, Phone, Key, Settings as SettingsIcon } from "lucide-react";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User, description: "Manage your personal information" },
    { id: "security", label: "Security", icon: Shield, description: "Password and authentication settings" },
    { id: "permissions", label: "Permissions", icon: FileText, description: "User roles and access control" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Email and alert preferences" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="p-2 space-y-2 md:ml-64 transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-slate-600">Manage your account preferences and security settings</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 group ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm"
                        : "hover:bg-slate-50/50 border border-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeTab === tab.id 
                        ? "bg-blue-600 text-white" 
                        : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}>
                      <tab.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm ${
                        activeTab === tab.id ? "text-blue-900" : "text-slate-800"
                      }`}>
                        {tab.label}
                      </div>
                      <div className={`text-xs ${
                        activeTab === tab.id ? "text-blue-700" : "text-slate-500"
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Profile Information</h2>
                      <p className="text-sm text-slate-600">Update your personal details and contact information</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Full Name</span>
                        </label>
                        <input 
                          type="text" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="John Doe" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </label>
                        <input 
                          type="email" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="john.doe@example.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Number</span>
                        </label>
                        <input 
                          type="tel" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="+1 234 567 890" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                        <input 
                          type="text" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="Project Manager" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Security Settings</h2>
                      <p className="text-sm text-slate-600">Manage your password and authentication methods</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center space-x-2">
                          <Key className="w-4 h-4" />
                          <span>Current Password</span>
                        </label>
                        <input 
                          type="password" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="••••••••" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                        <input 
                          type="password" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="••••••••" 
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="••••••••" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Two-Factor Authentication</label>
                        <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50">
                          <option>Disabled</option>
                          <option>Enabled (SMS)</option>
                          <option>Enabled (Authenticator App)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Permissions Settings */}
              {activeTab === "permissions" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Permissions & Roles</h2>
                      <p className="text-sm text-slate-600">Manage user roles and document access levels</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Default Role</label>
                      <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50">
                        <option>Viewer (Read-only access)</option>
                        <option>Editor (Can edit documents)</option>
                        <option>Admin (Full access and user management)</option>
                      </select>
                    </div>
                    
                    <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-3">Role Permissions</h4>
                      <div className="space-y-3">
                        {[
                          "View documents and projects",
                          "Create new documents",
                          "Edit existing documents",
                          "Delete documents",
                          "Manage user permissions",
                          "Access analytics dashboard"
                        ].map((permission, index) => (
                          <label key={index} className="flex items-center space-x-3 text-sm text-slate-700">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                              defaultChecked={index < 3}
                            />
                            <span>{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Notification Preferences</h2>
                      <p className="text-sm text-slate-600">Choose how you want to receive updates and alerts</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-4">Email Notifications</h4>
                      <div className="space-y-4">
                        {[
                          { label: "Project updates and changes", description: "Get notified when projects are modified" },
                          { label: "Document approvals", description: "Receive alerts for document approval requests" },
                          { label: "Team invitations", description: "Notifications for new team member invitations" },
                          { label: "Weekly summary report", description: "Weekly digest of all activities" }
                        ].map((item, index) => (
                          <label key={index} className="flex items-start space-x-3">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-1" 
                              defaultChecked={index < 2}
                            />
                            <div>
                              <div className="font-medium text-slate-800">{item.label}</div>
                              <div className="text-sm text-slate-600">{item.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-4">Push Notifications</h4>
                      <div className="space-y-3">
                        {[
                          "Real-time document updates",
                          "Deadline reminders",
                          "Team mentions and comments",
                          "System maintenance alerts"
                        ].map((item, index) => (
                          <label key={index} className="flex items-center space-x-3 text-sm text-slate-700">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                              defaultChecked={index === 0}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isSaving
                      ? "bg-slate-400 text-slate-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;    
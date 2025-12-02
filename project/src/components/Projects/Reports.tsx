import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, ChevronRight, Search, Filter, Download, BarChart3, Calendar, User, Shield } from "lucide-react";

export default function ReportPage() {
  const navigate = useNavigate();
  const [analyses] = useState(() => {
    const saved = localStorage.getItem("analyses");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const viewReport = (item: any) => {
    navigate(`/report/${encodeURIComponent(item.id)}`, { state: item });
  };

  const filteredAnalyses = analyses.filter((item: any) => {
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "recent" && isRecent(item.uploadedAt)) ||
                         (filter === "important" && item.analysis?.priority === "high");
    return matchesSearch && matchesFilter;
  });

  function isRecent(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }

  function getFileType(filename: string) {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ext || 'file';
  }

  function getFileTypeColor(filename: string) {
    const type = getFileType(filename);
    const colors = {
      pdf: 'from-red-100 to-red-50 text-red-600',
      docx: 'from-blue-100 to-blue-50 text-blue-600',
      doc: 'from-blue-100 to-blue-50 text-blue-600',
      xlsx: 'from-green-100 to-green-50 text-green-600',
      xls: 'from-green-100 to-green-50 text-green-600',
      file: 'from-slate-100 to-slate-50 text-slate-600'
    };
    return colors[type as keyof typeof colors] || colors.file;
  }

  return (
    <div className="p-2 space-y-2 md:ml-64 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Reports
              </h1>
              <p className="text-slate-600">Comprehensive insights from your analyzed documents</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{analyses.length}</p>
                  <p className="text-sm text-slate-600">Total Reports</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {analyses.filter(item => isRecent(item.uploadedAt)).length}
                  </p>
                  <p className="text-sm text-slate-600">This Week</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {analyses.filter(item => item.analysis?.priority === "high").length}
                  </p>
                  <p className="text-sm text-slate-600">High Priority</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {new Set(analyses.map(item => getFileType(item.filename))).size}
                  </p>
                  <p className="text-sm text-slate-600">File Types</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search reports by filename..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
                  {[
                    { id: "all", label: "All Reports" },
                    { id: "recent", label: "Recent" },
                    { id: "important", label: "High Priority" }
                  ].map((filterOption) => (
                    <button
                      key={filterOption.id}
                      onClick={() => setFilter(filterOption.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        filter === filterOption.id
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      {filterOption.label}
                    </button>
                  ))}
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {filteredAnalyses.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {analyses.length === 0 ? "No Reports Yet" : "No Matching Reports"}
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {analyses.length === 0 
                  ? "Upload your first document to generate AI-powered analysis reports."
                  : "Try adjusting your search terms or filters to find what you're looking for."
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  {filteredAnalyses.length} Report{filteredAnalyses.length !== 1 ? 's' : ''} Found
                </h3>
                <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <Download className="w-4 h-4" />
                  <span>Export All</span>
                </button>
              </div>

              <div className="space-y-4">
                {filteredAnalyses.map((item: any) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => viewReport(item)}
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center ${getFileTypeColor(item.filename)}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-800 truncate">
                            {item.filename}
                          </h4>
                          {isRecent(item.uploadedAt) && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                          {item.analysis?.priority === "high" && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{new Date(item.uploadedAt).toLocaleTimeString()}</span>
                          </div>
                          <span>•</span>
                          <span className="capitalize">{getFileType(item.filename)}</span>
                          <span>•</span>
                          <span>{Math.round(Math.random() * 15) + 5} key insights</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <span className="font-medium">View Report</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
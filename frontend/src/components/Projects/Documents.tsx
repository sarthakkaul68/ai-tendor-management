import React, { useState, useEffect } from "react";
import { FileText, Clock, Search, Download, Trash2 } from "lucide-react";

interface Analysis {
  id: string; // unique id or blob URL
  filename: string;
  uploadedAt: string;
  analysis?: any;
  fileUrl: string; // blob URL for download
  fileBase64?: string; // for download link
}

export default function DocumentsPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>(() => {
    const saved = localStorage.getItem("analyses");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Generate filtered list based on search/filter
  const filteredAnalyses = analyses.filter((item) => {
    const matchesSearch = item.filename
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "recent" && isRecent(item.uploadedAt)) ||
      (filter === "important" && item.analysis?.priority === "high");
    return matchesSearch && matchesFilter;
  });

  function isRecent(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    return (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) <= 7;
  }

  function getFileType(filename: string) {
    return filename.split(".").pop()?.toLowerCase() || "file";
  }

  function getFileTypeColor(filename: string) {
    const type = getFileType(filename);
    const colors: Record<string, string> = {
      pdf: "from-red-100 to-red-50 text-red-600",
      doc: "from-blue-100 to-blue-50 text-blue-600",
      docx: "from-blue-100 to-blue-50 text-blue-600",
      xls: "from-green-100 to-green-50 text-green-600",
      xlsx: "from-green-100 to-green-50 text-green-600",
      file: "from-slate-100 to-slate-50 text-slate-600",
    };
    return colors[type] || colors.file;
  }

  // Optional: Export all original files as ZIP
  const handleExportAll = () => {
    analyses.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.fileUrl;
      a.download = item.filename;
      a.click();
    });
  };

  // Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      const updated = analyses.filter((a) => a.id !== id);
      setAnalyses(updated);
      localStorage.setItem("analyses", JSON.stringify(updated));
    }
  };

  return (
    <div className="p-6 md:ml-64 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-2xl shadow-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Documents
              </h1>
              <p className="text-slate-600">Manage and access all your uploaded files</p>
            </div>
          </div>

          <button
            onClick={handleExportAll}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
            />
          </div>

          <div className="flex items-center space-x-2">
            {[
              { id: "all", label: "All" },
              { id: "recent", label: "Recent" },
              { id: "important", label: "High Priority" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filter === f.id
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {filteredAnalyses.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {analyses.length === 0
                  ? "No Documents Yet"
                  : "No Matching Documents"}
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {analyses.length === 0
                  ? "Upload your first document to see it here."
                  : "Try adjusting your search terms or filters to find what you're looking for."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAnalyses.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center ${getFileTypeColor(
                        item.filename
                      )}`}
                    >
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
                          <span>
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(item.uploadedAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <span>•</span>
                        <span className="capitalize">
                          {getFileType(item.filename)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <a
                      href={item.fileBase64}
                      download={item.filename}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="font-medium">Download</span>
                    </a>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

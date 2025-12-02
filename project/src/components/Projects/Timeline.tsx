import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Download,
  BarChart3,
  Calendar,
  User,
  Shield,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  MoreVertical,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

interface Analysis {
  id: string;
  filename: string;
  uploadedAt: string;
  analysis?: any;
  fileUrl?: string;
}

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "rejected" | "in-progress";
  duration?: string;
  assignee?: string;
}

export default function ReportPage() {
  const [analyses] = useState<Analysis[]>(() => {
    const saved = localStorage.getItem("analyses");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("timeline");

  const filteredAnalyses = analyses.filter((item: Analysis) => {
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
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }

  function getFileType(filename: string) {
    const ext = filename.split(".").pop()?.toLowerCase();
    return ext || "file";
  }

  function getFileTypeColor(filename: string) {
    const type = getFileType(filename);
    const colors: Record<string, string> = {
      pdf: "from-red-100 to-red-50 text-red-600",
      docx: "from-blue-100 to-blue-50 text-blue-600",
      doc: "from-blue-100 to-blue-50 text-blue-600",
      xlsx: "from-green-100 to-green-50 text-green-600",
      xls: "from-green-100 to-green-50 text-green-600",
      file: "from-slate-100 to-slate-50 text-slate-600",
    };
    return colors[type] || colors.file;
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    };
    return colors[status] || colors.pending;
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <PlayCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  }

  // Enhanced timeline with realistic data
  function buildTimeline(doc: Analysis): TimelineEvent[] {
    const uploadedDate = new Date(doc.uploadedAt);

    return [
      {
        id: 1,
        title: "Document Uploaded",
        description: `"${doc.filename}" was successfully uploaded to the system.`,
        date: uploadedDate.toISOString(),
        status: "completed",
        duration: "2 min",
        assignee: "System",
      },
      {
        id: 2,
        title: "AI Analysis Processing",
        description:
          "Document is being analyzed by AI for key insights and data extraction.",
        date: new Date(uploadedDate.getTime() + 5 * 60000).toISOString(),
        status: "completed",
        duration: "3 min",
        assignee: "AI Engine",
      },
      {
        id: 3,
        title: "Quality Review",
        description: "Analysis results are under quality assurance review.",
        date: new Date(uploadedDate.getTime() + 15 * 60000).toISOString(),
        status: "in-progress",
        duration: "Estimated 10 min",
        assignee: "Quality Team",
      },
      {
        id: 4,
        title: "Stakeholder Notification",
        description:
          "Key stakeholders will be notified of analysis completion.",
        date: new Date(uploadedDate.getTime() + 30 * 60000).toISOString(),
        status: "pending",
        assignee: "Project Manager",
      },
      {
        id: 5,
        title: "Final Report Generation",
        description: "Comprehensive report will be generated and distributed.",
        date: new Date(uploadedDate.getTime() + 45 * 60000).toISOString(),
        status: "pending",
        assignee: "Reporting System",
      },
    ];
  }

  const getProgressPercentage = (timeline: TimelineEvent[]) => {
    const completed = timeline.filter(
      (event) => event.status === "completed"
    ).length;
    return (completed / timeline.length) * 100;
  };
  const navigate = useNavigate();
  return (
    <div className="p-6 md:ml-64 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Document Timeline
                </h1>
                <p className="text-slate-600">
                  Track your document analysis progress and status
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "timeline"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Timeline View
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Grid View
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {analyses.length}
                  </p>
                  <p className="text-sm text-slate-600">Total Documents</p>
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
                    {
                      analyses.filter((item) => isRecent(item.uploadedAt))
                        .length
                    }
                  </p>
                  <p className="text-sm text-slate-600">Active</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {
                      analyses.filter(
                        (item) => item.analysis?.priority === "high"
                      ).length
                    }
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
                  <p className="text-2xl font-bold text-slate-800">92%</p>
                  <p className="text-sm text-slate-600">Avg. Completion</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
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
                    placeholder="Search documents by filename..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
                  {[
                    { id: "all", label: "All Documents" },
                    { id: "recent", label: "Active" },
                    { id: "important", label: "High Priority" },
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
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline View */}
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
                  ? "Upload your first document to start tracking its analysis timeline."
                  : "Try adjusting your search terms or filters to find what you're looking for."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">
                  {filteredAnalyses.length} Document
                  {filteredAnalyses.length !== 1 ? "s" : ""} Found
                </h3>
                <div className="text-sm text-slate-600">
                  Sorted by: Most Recent
                </div>
              </div>

              <div className="space-y-6">
                {filteredAnalyses.map((item: Analysis) => {
                  const timeline = buildTimeline(item);
                  const isOpen = expanded === item.id;
                  const progress = getProgressPercentage(timeline);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Document Header */}
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div
                              className={`w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center ${getFileTypeColor(
                                item.filename
                              )}`}
                            >
                              <FileText className="w-7 h-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-xl font-semibold text-slate-800 truncate">
                                  {item.filename}
                                </h4>
                                {isRecent(item.uploadedAt) && (
                                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200">
                                    Active
                                  </span>
                                )}
                                {item.analysis?.priority === "high" && (
                                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full border border-red-200">
                                    High Priority
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-6 text-sm text-slate-600">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    Uploaded:{" "}
                                    {new Date(
                                      item.uploadedAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <span className="capitalize bg-slate-100 px-2 py-1 rounded text-slate-700">
                                  {getFileType(item.filename)}
                                </span>
                                <span>
                                  {Math.round(Math.random() * 15) + 5} key
                                  insights
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700">
                                    Analysis Progress
                                  </span>
                                  <span className="text-sm text-slate-600">
                                    {Math.round(progress)}% Complete
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {/* <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5 text-slate-400" />
                            </button> */}
                            <ChevronRight
                              className={`w-5 h-5 text-slate-400 transform transition-transform ${
                                isOpen ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expandable Timeline */}
                      {isOpen && (
                        <div className="border-t border-slate-200 p-6">
                          <div className="mb-6">
                            <h5 className="text-lg font-semibold text-slate-800 mb-4">
                              Analysis Timeline
                            </h5>

                            {/* Enhanced Timeline */}
                            <div className="relative">
                              {timeline.map((event, index) => (
                                <div
                                  key={event.id}
                                  className="flex items-start space-x-4 mb-6 last:mb-0"
                                >
                                  {/* Timeline Line */}
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${getStatusColor(
                                        event.status
                                      )}`}
                                    >
                                      {getStatusIcon(event.status)}
                                    </div>
                                    {index < timeline.length - 1 && (
                                      <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                                    )}
                                  </div>

                                  {/* Event Content */}
                                  <div className="flex-1 bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                      <h6 className="font-semibold text-slate-800">
                                        {event.title}
                                      </h6>
                                      <div className="flex items-center space-x-3">
                                        {event.duration && (
                                          <span className="text-xs bg-white px-2 py-1 rounded border text-slate-600">
                                            {event.duration}
                                          </span>
                                        )}
                                        <span className="text-sm text-slate-500">
                                          {new Date(
                                            event.date
                                          ).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-2">
                                      {event.description}
                                    </p>
                                    {event.assignee && (
                                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                                        <User className="w-3 h-3" />
                                        <span>
                                          Assigned to: {event.assignee}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                            {/* Dynamic View Full Report */}
                            <button
                              onClick={() =>
                                navigate(
                                  `/report/${encodeURIComponent(item.id)}`,
                                  { state: item }
                                )
                              }
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View Full Report</span>
                            </button>

                            {/* Download original file */}
                            <a
                              href={item.fileUrl}
                              download={item.filename}
                              className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

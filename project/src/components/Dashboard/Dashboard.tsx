import React, { useState } from "react";
import MetricCard from "./MetricCard";
import SimpleMetricCard from "./SimpleMetricCard";
import { dashboardMetrics, simpleMetrics } from "../../data/mockData";
import {
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Target,
  Calendar,
} from "lucide-react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Dashboard: React.FC = () => {
  const [statuscard, setStatuscard] = useState([
    {
      id: "1",
      title: "Open",
      primaryValue: 144,
      primaryLabel: "In Progress",
      icon: <CheckCircleIcon fontSize="large" />,
    },
    {
      id: "2",
      title: "Pending",
      primaryValue: 88,
      primaryLabel: "Waiting",
      icon: <AccessTimeIcon fontSize="large" />,
    },
    {
      id: "3",
      title: "Inprogress",
      primaryValue: 52,
      primaryLabel: "Ongoing",
      icon: <AutorenewIcon fontSize="large"  />,
    },
    {
      id: "4",
      title: "Overdue",
      primaryValue: 12,
      primaryLabel: "Late",
      icon: <WarningAmberIcon fontSize="large" />,
    },
  ]);
  const gradientColors = [
    "from-purple-400 via-pink-500 to-red-500",
    "from-green-400 via-blue-500 to-purple-500",
    "from-yellow-400 via-red-500 to-pink-500",
    "from-blue-400 via-indigo-500 to-purple-500",
  ];

  return (
    <main
      className="
        flex-1
        min-h-screen
        bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20
        p-6
        space-y-8
        md:ml-64   /* ensures sidebar spacing on desktop */
        transition-all duration-300
      "
    >
      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statuscard.map((data, index) => (
          <div
            key={data.id}
            className={`px-4 py-2 rounded-xl text-white shadow-lg bg-gradient-to-r ${
              gradientColors[index % gradientColors.length]
            }`}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{data.title}</h1>
              <div>{data.icon}</div>
            </div>
            <h1 className="text-3xl font-bold mt-4">{data.primaryValue}</h1>
            <h1 className="text-sm mt-1 opacity-90">{data.primaryLabel}</h1>
          </div>
        ))}
      </div>

      {/* Simple Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {simpleMetrics.map((metric) => (
          <SimpleMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Status & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tender Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Tender Status
              </h3>
              <p className="text-sm text-slate-500">Current tender progress</p>
            </div>
          </div>
          <div className="space-y-4">
            {["Open", "In Progress", "Completed", "On Hold"].map(
              (status, index) => {
                const width = Math.random() * 80 + 20;
                return (
                  <div
                    key={status}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-orange-500"
                            : index === 2
                            ? "bg-green-500"
                            : "bg-slate-500"
                        }`}
                      ></div>
                      <span className="text-slate-700 font-medium text-sm">
                        {status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {/* <span className="text-slate-600 text-sm font-medium min-w-[40px] text-right">
                        {Math.round(width)}%
                      </span> */}
                      <div className="w-24 bg-slate-200 rounded-full h-2 group-hover:bg-slate-300 transition-colors">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                            index === 0
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : index === 1
                              ? "bg-gradient-to-r from-orange-500 to-orange-600"
                              : index === 2
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-slate-500 to-slate-600"
                          }`}
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Tasks Status */}
        {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Tasks Status
              </h3>
              <p className="text-sm text-slate-500">Project task progress</p>
            </div>
          </div>
          <div className="space-y-4">
            {["Pending", "In Progress", "Completed", "Overdue"].map(
              (status, index) => {
                const width = Math.random() * 80 + 20;
                const Icon =
                  index === 0
                    ? Clock
                    : index === 1
                    ? BarChart3
                    : index === 2
                    ? CheckCircle
                    : AlertCircle;
                return (
                  <div
                    key={status}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-600"
                            : index === 1
                            ? "bg-blue-100 text-blue-600"
                            : index === 2
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">
                        {status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-600 text-sm font-medium min-w-[40px] text-right">
                        {Math.round(width)}%
                      </span>
                      <div className="w-24 bg-slate-200 rounded-full h-2 group-hover:bg-slate-300 transition-colors">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                              : index === 1
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : index === 2
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-red-500 to-red-600"
                          }`}
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div> */}

        {/* Monthly Report */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Monthly Report 2025
              </h3>
              <p className="text-sm text-slate-500">Quarterly performance</p>
            </div>
          </div>
          <div className="space-y-4">
            {["January", "February", "March", "April"].map((month, index) => {
              const width = Math.random() * 80 + 20;
              return (
                <div
                  key={month}
                  className="flex justify-between items-center group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm">
                      {month}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* <span className="text-slate-600 text-sm font-medium min-w-[40px] text-right">
                      {Math.round(width)}%
                    </span> */}
                    <div className="w-24 bg-slate-200 rounded-full h-2 group-hover:bg-slate-300 transition-colors">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
                        style={{ width: `${width}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Overall Progress</span>
              <span className="font-semibold text-green-600">+15.2% ↑</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {[
          {
            label: "Active Tenders",
            value: "12",
            change: "+2",
            color: "text-blue-600",
          },
          {
            label: "Completed Tasks",
            value: "89",
            change: "+12",
            color: "text-green-600",
          },
          {
            label: "Pending Review",
            value: "7",
            change: "-3",
            color: "text-orange-600",
          },
          {
            label: "Team Members",
            value: "24",
            change: "+4",
            color: "text-purple-600",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="text-2xl font-bold text-slate-800">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
            <div className={`text-xs font-medium ${stat.color}`}>
              {stat.change} this month
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;

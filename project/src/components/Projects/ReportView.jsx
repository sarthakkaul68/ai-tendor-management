import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Document, Packer, Paragraph, TextRun } from "docx";
import stringSimilarity from "string-similarity";

export default function ReportView() {
  const { id } = useParams();
  const location = useLocation();
  const decodedId = decodeURIComponent(id);
  const navigate = useNavigate();

  const [report, setReport] = useState(location.state || null);
  const [downloading, setDownloading] = useState({ pdf: false, word: false });
  const [status, setStatus] = useState("idle");
  const [winningRate, setWinningRate] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (!report) {
      const stored = localStorage.getItem("analyses");
      if (stored) {
        const allAnalyses = JSON.parse(stored);
        const match = allAnalyses.find((r) => r.id === decodedId);
        if (match) setReport(match);
      }
    }
  }, [decodedId, report]);

  const keysToDisplay = [
    "objective",
    "requirement",
    "goal",
    "scope",
    "brief description",
    "closing date",
    "agreement",
    "estimation cost",
    "BOQ",
    "bid submission date",
  ];

  const formatKey = (key) =>
    key
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleSubmit = async () => {
    setStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("submitted");
  };

  const handleDownloadPDF = async () => {
    if (!report?.analysis) return;
    setDownloading((prev) => ({ ...prev, pdf: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const doc = new jsPDF();
      doc.text(`Report: ${report.filename}`, 14, 20);
      const tableData = keysToDisplay.map((key) => [
        key,
        report.analysis[key] ?? "Not specified",
      ]);
      autoTable(doc, { head: [["Field", "Value"]], body: tableData, startY: 30 });
      doc.save(`${report.filename}.pdf`);
    } finally {
      setDownloading((prev) => ({ ...prev, pdf: false }));
    }
  };


  const handleSaveAnalysis = async () => {
  if (!report) return;
  setSaving(true);

  try {
    const payload = {
      reportId: report.id,
      filename: report.filename,
      uploadedAt: report.uploadedAt,
      analysis: report.analysis,
      winningRate, 
    };

     const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/api/tender-reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Analysis saved successfully!");
    } else {
      alert("Failed to save analysis: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error saving analysis.");
  } finally {
    setSaving(false);
  }
};


  const handleDownloadWord = async () => {
    if (!report?.analysis) return;
    setDownloading((prev) => ({ ...prev, word: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: `Report: ${report.filename}`,
                heading: "Heading1",
              }),
              ...keysToDisplay.map(
                (key) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${key}: `, bold: true }),
                      new TextRun(report.analysis[key] ?? "Not specified"),
                    ],
                  })
              ),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${report.filename}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading((prev) => ({ ...prev, word: false }));
    }
  };

  const analyzeTender = () => {
    const stored = localStorage.getItem("analyses");
    if (!stored) {
      alert("No other reports found for analysis.");
      return;
    }

    const allAnalyses = JSON.parse(stored).filter((r) => r.id !== report.id);
    if (allAnalyses.length === 0) {
      alert("No other reports to compare.");
      return;
    }

    let totalWinningRate = 0;

    allAnalyses.forEach((otherReport) => {
      let similaritySum = 0;
      let count = 0;

      keysToDisplay.forEach((key) => {
        const currentValue = report.analysis[key];
        const otherValue = otherReport.analysis[key];

        if (
          currentValue &&
          otherValue &&
          currentValue !== "Not specified" &&
          otherValue !== "Not specified"
        ) {
          const similarity = stringSimilarity.compareTwoStrings(
            currentValue.toString().toLowerCase(),
            otherValue.toString().toLowerCase()
          );
          similaritySum += similarity;
          count++;
        }
      });

      const winningRateForThisDoc = count > 0 ? (similaritySum / count) * 100 : 0;
      totalWinningRate += winningRateForThisDoc;
    });

    const finalWinningRate = totalWinningRate / allAnalyses.length;
    setWinningRate(Math.round(finalWinningRate));
  };

  const getWinningRateColor = (rate) => {
    if (rate >= 80) return "from-green-500 to-emerald-600";
    if (rate >= 60) return "from-yellow-500 to-amber-600";
    if (rate >= 40) return "from-orange-500 to-red-500";
    return "from-red-500 to-rose-600";
  };

  if (!report) {
    return (
      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 md:ml-64 transition-all duration-300 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-600 hover:text-slate-800 transition-all duration-200 group font-medium"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Report Not Found
            </h2>
            <p className="text-slate-600 text-lg mb-6">
              The requested report could not be loaded or has been moved.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 md:ml-64 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-600 hover:text-slate-800 transition-all duration-200 group font-medium bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md border border-slate-200"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Tender Analysis</h1>
              <p className="text-slate-600">Detailed review and insights</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">

             <button
  onClick={handleSaveAnalysis}
  disabled={!report || saving}
  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
>
  {saving ? (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
  ) : (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )}
  Save Analysis
</button>

            <button
              onClick={analyzeTender}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Analyze Winning Chance
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={status !== "idle"}
              className={`px-6 py-3 rounded-xl text-white transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                status === "idle"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  : "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
              }`}
            >
              {status === "idle" && "Submit for Approval"}
              {status === "processing" && "Processing..."}
              {status === "submitted" && "✓ Submitted"}
            </button>
          </div>
        </div>

        {/* Winning Rate Card */}
        {winningRate !== null && (
          <div className="mb-8">
            <div className={`bg-gradient-to-r ${getWinningRateColor(winningRate)} text-white rounded-2xl p-8 shadow-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Winning Probability Analysis</h3>
                  <p className="text-blue-100 text-lg">Based on historical tender comparisons</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold mb-2">{winningRate}%</div>
                  <div className="text-blue-100 font-medium">
                    {winningRate >= 80 ? "High Chance" : 
                     winningRate >= 60 ? "Good Chance" : 
                     winningRate >= 40 ? "Moderate Chance" : "Low Chance"}
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${winningRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{report.filename}</h2>
                  <p className="text-slate-300">
                    Analyzed on {new Date(report.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={downloading.pdf}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {downloading.pdf ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>PDF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadWord}
                  disabled={downloading.word}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {downloading.word ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Word</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "overview" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "details" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Detailed Analysis
              </button>
              <button
                onClick={() => setActiveTab("export")}
                className={`py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "export" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Export Options
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keysToDisplay.slice(0, 6).map((key, index) => (
                  <div key={key} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-200 group hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <span className="text-blue-600 font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 uppercase tracking-wide text-sm mb-2">
                          {formatKey(key)}
                        </h3>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {String(report.analysis[key] ?? "Not specified")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                {keysToDisplay.map((key, index) => (
                  <div key={key} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-200 group hover:shadow-md">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200 shadow-lg">
                        <span className="font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide mb-3">
                          {formatKey(key)}
                        </h3>
                        <div className="text-slate-700 leading-relaxed bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          {String(report.analysis[key] ?? "Not specified")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "export" && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Export Options</h3>
                <p className="text-slate-600 mb-6">Download your analysis in various formats</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloading.pdf}
                    className="flex items-center space-x-2 px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>PDF Export</span>
                  </button>
                  <button
                    onClick={handleDownloadWord}
                    disabled={downloading.word}
                    className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Word Export</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-between text-sm text-slate-500">
            <span className="mb-2 sm:mb-0">
              Report ID: <code className="bg-slate-200 px-2 py-1 rounded">{report.id}</code>
            </span>
            <span>AI-Powered Tender Analysis System</span>
          </div>
        </div>
      </div>
    </main>
  );
}
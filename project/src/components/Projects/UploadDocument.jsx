import React, { useRef, useState ,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid"; 
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  X, 
  ChevronRight, 
  FolderOpen,
  Shield,
  Zap,
  Cloud,
  Download
} from "lucide-react";

const GEMINI_API_KEY = `AIzaSyAMv3HIBdCrkbhHuHsD8G3Pb5MTd6EIjic`;
const UPLOAD_URL = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}`;
const GENERATE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const UploadDocument = () => {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [analyses, setAnalyses] = useState(() => {
    const saved = localStorage.getItem("analyses");
    return saved ? JSON.parse(saved) : [];
  });

  const { id } = useParams(); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenderDocument = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}/api/tenders/${id}/document`, {
          responseType: "blob", // important for files
        });
          console.log('res',res);
        // Convert blob to File object
        const fileData = new File([res.data], "tender.pdf", { type: res.data.type });
        setFile(fileData);
      } catch (err) {
        console.error("Failed to fetch tender document:", err);
      }
    };

    fetchTenderDocument();
  }, [id]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function onDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  // Convert Word/Excel → PDF
  async function convertToPdf(file) {
    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "pdf") return file;

    if (ext === "docx" || ext === "doc") {
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      const element = document.createElement("div");
      element.innerHTML = `<h1>${file.name}</h1><pre>${value}</pre>`;
      const pdfBlob = await html2pdf().from(element).outputPdf("blob");
      return new File([pdfBlob], file.name.replace(/\.[^.]+$/, ".pdf"), { type: "application/pdf" });
    }

    if (ext === "xlsx" || ext === "xls") {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      let html = `<h1>${file.name}</h1>`;
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        html += `<h2>Sheet: ${sheetName}</h2>`;
        html += XLSX.utils.sheet_to_html(sheet);
      });

      const element = document.createElement("div");
      element.innerHTML = html;
      const pdfBlob = await html2pdf().from(element).outputPdf("blob");
      return new File([pdfBlob], file.name.replace(/\.[^.]+$/, ".pdf"), { type: "application/pdf" });
    }

    throw new Error("Unsupported file type");
  }

  async function handleUpload() {
    if (!file) return alert("Please select a file first.");

    const allowed = [".pdf", ".docx", ".doc", ".xlsx", ".xls"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) return alert("Only PDF, DOCX, XLSX, XLS files are allowed.");

    setLoading(true);
    setStatus("Processing...");

    try {
      const pdfFile = await convertToPdf(file);

      setStatus("Uploading File...");
      const formData = new FormData();
      formData.append("file", pdfFile);

      const uploadRes = await axios.post(UPLOAD_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const fileUri = uploadRes.data.file.uri;

      setStatus("Analyzing With AI...");
      const prompt =
        "Analyse the given file and create a JSON object containing: 'objective', 'requirement', 'goal', 'scope', 'brief description', 'closing date', 'agreement', 'estimation cost', 'BOQ', and 'bid submission date'. If not found, return 'Not specified'.";

      const body = {
        contents: [
          { parts: [{ text: prompt }, { fileData: { fileUri, mimeType: "application/pdf" } }] },
        ],
      };

      const genRes = await axios.post(GENERATE_URL, body, { headers: { "Content-Type": "application/json" } });
      let rawText = genRes.data.candidates[0].content.parts[0].text;
      let cleaned = rawText.replace(/```json|```/g, "").trim();
      let parsed;
      try { parsed = JSON.parse(cleaned); } catch { parsed = { raw: rawText }; }
      const fileUrl = URL.createObjectURL(file);

      const newAnalysis = {
        id: fileUri,
        filename: file.name,
        analysis: parsed,
        uploadedAt: new Date().toISOString(),
        fileUrl,
      };

      const updated = [newAnalysis, ...analyses];
      setAnalyses(updated);
      localStorage.setItem("analyses", JSON.stringify(updated));

      setStatus("Done!");
      setFile(null);
    } catch (err) {
      console.error("Api error:", err.response?.data || err.message);
      alert("Analysis failed. Check console for details.");
      setStatus("Failed");
    } finally {
      setLoading(false);
    }
  }

  function viewReportById(item) {
    navigate(`/report/${encodeURIComponent(item.id)}`, { state: item });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="p-2 space-y-2 md:ml-64 transition-all duration-300">
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
      
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Upload Tender Document</h2>
                  <p className="text-sm text-slate-600">Analyze PDF, DOCX, and Excel files with AI</p>
                </div>
              </div>
              
              <div
                onClick={() => !loading && fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className={`relative rounded-xl p-8 text-center cursor-pointer border-2 border-dashed transition-all duration-300 ${
                  file 
                    ? "border-blue-500 bg-blue-50/50 shadow-inner" 
                    : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/30"
                } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange} 
                  disabled={loading} 
                />
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <FolderOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold mb-2">
                      {file ? "Document Ready" : "Drag & Drop or Click to Upload"}
                    </p>
                    <p className="text-xs text-slate-500">Supported: PDF, DOCX, XLSX, XLS • Max 10MB</p>
                  </div>
                </div>
                
                {file && (
                  <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <span className="text-sm font-medium text-slate-700 block truncate max-w-xs">{file.name}</span>
                          <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      {/* <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Status and Action Bar */}
              <div className="mt-6 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {loading && (
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span className={`text-sm font-medium ${
                      loading ? "text-blue-600" : 
                      file ? "text-green-600" : 
                      "text-slate-500"
                    }`}>
                      {loading ? status : file ? "Ready for analysis" : "Awaiting document"}
                    </span>
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                      loading || !file 
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Analyze Document</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Analyses Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Recent Analyses</h3>
                <p className="text-sm text-slate-600">Your previously analyzed documents</p>
              </div>
            </div>
            
            {analyses.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-2">No analyses yet</p>
                <p className="text-sm text-slate-400">Upload a document to get started with AI analysis</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analyses.map((item, index) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200 hover:bg-slate-100/50 transition-all duration-200 hover:shadow-md hover:border-slate-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.filename}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <p className="text-xs text-slate-500">
                            {new Date(item.uploadedAt).toLocaleDateString()} • 
                            {new Date(item.uploadedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-all duration-200 flex items-center space-x-1 group-hover:translate-x-1"
                      onClick={() => viewReportById(item)}
                    >
                      <span>View Report</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "AI-Powered Analysis",
              description: "Advanced machine learning extracts key tender information automatically"
            },
            {
              icon: Shield,
              title: "Secure Processing",
              description: "Enterprise-grade security with end-to-end encryption for your documents"
            },
            {
              icon: Download,
              title: "Multiple Formats",
              description: "Supports PDF, Word, and Excel documents with seamless conversion"
            }
          ].map((feature, index) => (
            <div key={feature.title} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
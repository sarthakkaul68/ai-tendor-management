import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload, FileImage, File } from "lucide-react";
import { Project } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CreateProjectProps {
  onBack: () => void;
  onSave: (Project: Partial<Project>) => void;
  Project?: Project | null;

  onUploadDocument?: () => void;
  viewReport?: () => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({
  onBack,
  onSave,
  Project,
}) => {
  const [formData, setFormData] = useState({
    name: Project?.name || "",
    version: Project?.version || "1.0",
    clientName: Project?.clientName || "",
    // assignedGroup: Project?.assignedGroup || "",
    assignedTo: Project?.assignedTo?.join(", ") || "",
    // demoUrl: Project?.demoUrl || "",
    status: Project?.status || "Open",
    startDate: Project?.startDate || "",
    endDate: Project?.endDate || "",
    // billingType: Project?.billingType || "",
    fixedPrice: Project?.fixedPrice || 0,
    estimateHours: Project?.estimateHours || "00:00",
    // autoProgress: Project?.autoProgress || false,
  });
  const [availableUsers, setAvailableUsers] = useState([]);

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  const fetchAvailableUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // const res = await fetch("http://localhost:5000/api/users/available");
      const res = await fetch(`${apiUrl}/api/users/available`);
      const data = await res.json();
      setAvailableUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => form.append(key, v));
      } else {
        form.append(key, value as any);
      }
    });

    if (file) {
      form.append("document", file);
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    //  axios.post("http://localhost:5000/api/tenders/create", form, {
    axios
      .post(`${apiUrl}/api/tenders/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
         
           navigate("/projects");
        } else {
          alert("Unexpected response from server");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
          alert("Some error from server. Please Try Again later");
        }
      });

    // onSave({
    //   ...formData,
    //   assignedTo: formData.assignedTo
    //     .split(",")
    //     .map((name) => name.trim())
    //     .filter((name) => name),
    //   progress: Project?.progress || 0,
    //   creator: "Admin",
    //   id: Project?.id || `P${String(Date.now()).slice(-5)}`,
    // });
  };

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const fileTypes = [
    { icon: FileImage, label: "AI", color: "text-orange-500" },
    { icon: File, label: "PSD", color: "text-blue-500" },
    { icon: File, label: "FIG", color: "text-green-500" },
    { icon: File, label: "SKETCH", color: "text-purple-500" },
    { icon: File, label: "SVG", color: "text-red-500" },
    { icon: File, label: "PNG", color: "text-indigo-500" },
    { icon: File, label: "JPG", color: "text-pink-500" },
    { icon: File, label: "GIF", color: "text-yellow-500" },
  ];

  return (
    // <div className="p-2 space-y-2 md:ml-64 transition-all duration-300">
    //   {/* Header Section */}
    //   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    //     <button
    //       onClick={() => {
    //         navigate("/projects");
    //       }}
    //       className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
    //     >
    //       <ArrowLeft size={20} />
    //       <span>Back to Tenders</span>
    //     </button>
    //   </div>

    //   <div className="bg-white rounded-xl shadow-md">
    //     <div className="p-6 border-b border-gray-200">
    //       <h1 className="text-2xl font-bold text-gray-900">
    //         {Project ? "Edit Tender" : "Create Tender"}
    //       </h1>
    //     </div>

    //     <form onSubmit={handleSubmit} className="p-6 space-y-8">
    //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //         {/* Project Info Section */}
    //         <div>
    //           <div className="flex items-center space-x-2 mb-6">
    //             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
    //               <span className="text-white text-xs">⚡</span>
    //             </div>
    //             <h2 className="text-xl font-bold text-gray-900">Tender Info</h2>
    //           </div>

    //           <div className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   Tender NAME <span className="text-red-500">*</span>
    //                 </label>
    //                 <input
    //                   type="text"
    //                   value={formData.name}
    //                   onChange={(e) =>
    //                     handleInputChange("name", e.target.value)
    //                   }
    //                   placeholder="Enter Tender Name"
    //                   required
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 />
    //               </div>
    //               <div>
    //                 {/* <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   VERSION <span className="text-red-500">*</span>
    //                 </label>
    //                 <input
    //                   type="text"
    //                   value={formData.version}
    //                   onChange={(e) =>
    //                     handleInputChange("version", e.target.value)
    //                   }
    //                   placeholder="1.0"
    //                   required
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 /> */}
    //                 {/* <p className="text-xs text-gray-500 mt-1">
    //                   Version: 1.0, 1.1, 1.2
    //                 </p> */}
    //               </div>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   CLIENT NAME
    //                 </label>
    //                 <select
    //                   value={formData.clientName}
    //                   onChange={(e) =>
    //                     handleInputChange("clientName", e.target.value)
    //                   }
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 >
    //                   <option value="">-- Select Client --</option>
    //                   <option value="TenancyBox Ltd">TenancyBox Ltd</option>
    //                   <option value="BADAWI Corp">BADAWI Corp</option>
    //                   <option value="Peppino Restaurant">
    //                     Peppino Restaurant
    //                   </option>
    //                   <option value="Internal">Internal</option>
    //                 </select>
    //               </div>
    //               {/* <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   ASSIGNED GROUP
    //                 </label>
    //                 <select
    //                   value={formData.assignedGroup}
    //                   onChange={(e) =>
    //                     handleInputChange("assignedGroup", e.target.value)
    //                   }
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 >
    //                   <option value="">-- Select Assigned Group --</option>
    //                   <option value="Development Team">Development Team</option>
    //                   <option value="Mobile Team">Mobile Team</option>
    //                   <option value="Web Team">Web Team</option>
    //                   <option value="Full Stack Team">Full Stack Team</option>
    //                   <option value="QA Team">QA Team</option>
    //                 </select>
    //               </div> */}
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">
    //                 ASSIGNED TO
    //               </label>
    //               <select
    //     value={formData.assignedTo}
    //     onChange={(e) => handleInputChange("assignedTo", e.target.value)}
    //     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //   >
    //     <option value="">Select a team member</option>
    //     {availableUsers.map((user) => (
    //       <option key={user._id} value={user._id}>
    //         {user.name}
    //       </option>
    //     ))}
    //   </select>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               {/* <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   DEMO URL
    //                 </label>
    //                 <input
    //                   type="url"
    //                   value={formData.demoUrl}
    //                   onChange={(e) =>
    //                     handleInputChange("demoUrl", e.target.value)
    //                   }
    //                   placeholder="https://example.com"
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 />
    //               </div> */}
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   STATUS <span className="text-red-500">*</span>
    //                 </label>
    //                 <select
    //                   value={formData.status}
    //                   onChange={(e) =>
    //                     handleInputChange("status", e.target.value)
    //                   }
    //                   required
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 >
    //                   <option value="Open">Open</option>
    //                   <option value="In-Progress">In Progress</option>
    //                   <option value="Overdue">Overdue</option>
    //                   <option value="Closed">Closed</option>
    //                 </select>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="mt-8">
    //             <div className="flex items-center space-x-2 mb-4">
    //               <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
    //                 <span className="text-white text-xs">📅</span>
    //               </div>
    //               <h3 className="text-lg font-semibold text-gray-900">
    //                 Tender Dates
    //               </h3>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   START DATE
    //                 </label>
    //                 <input
    //                   type="date"
    //                   value={formData.startDate}
    //                   onChange={(e) =>
    //                     handleInputChange("startDate", e.target.value)
    //                   }
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 />
    //               </div>
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   END DATE
    //                 </label>
    //                 <input
    //                   type="date"
    //                   value={formData.endDate}
    //                   onChange={(e) =>
    //                     handleInputChange("endDate", e.target.value)
    //                   }
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Other Info Section */}
    //         <div>
    //           <div className="flex items-center space-x-2 mb-6">
    //             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
    //               <span className="text-white text-xs">📋</span>
    //             </div>
    //             <h2 className="text-xl font-bold text-gray-900">Other Info</h2>
    //           </div>

    //           <div className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   BILLING TYPE
    //                 </label>
    //                 <select
    //                   value={formData.billingType}
    //                   onChange={(e) =>
    //                     handleInputChange("billingType", e.target.value)
    //                   }
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 >
    //                   <option value="">-- Select Billing Type --</option>
    //                   <option value="one_time">One Time</option>
    //                   <option value="regular">Regular</option>
    //                   {/* <option value="Internal">Internal</option> */}
    //                 </select>
    //               </div>
    //               {/* <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   FIXED PRICE($)
    //                 </label>
    //                 <input
    //                   type="number"
    //                   value={formData.fixedPrice}
    //                   onChange={(e) =>
    //                     handleInputChange(
    //                       "fixedPrice",
    //                       parseInt(e.target.value) || 0
    //                     )
    //                   }
    //                   placeholder="Enter Price Rate"
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 />
    //               </div> */}
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               {/* <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   ESTIMATE HOURS
    //                 </label>
    //                 <input
    //                   type="text"
    //                   value={formData.estimateHours}
    //                   onChange={(e) =>
    //                     handleInputChange("estimateHours", e.target.value)
    //                   }
    //                   placeholder="00:00"
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                 />
    //               </div> */}
    //               {/* <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1">
    //                   AUTO PROGRESS
    //                 </label>
    //                 <div className="mt-2">
    //                   <label className="flex items-center">
    //                     <input
    //                       type="checkbox"
    //                       checked={formData.autoProgress}
    //                       onChange={(e) =>
    //                         handleInputChange("autoProgress", e.target.checked)
    //                       }
    //                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    //                     />
    //                     <span className="ml-2 text-sm text-gray-600">
    //                       Enable auto progress
    //                     </span>
    //                   </label>
    //                 </div>
    //               </div> */}
    //             </div>

    //             <div>
    //               {/* <label className="block text-sm font-medium text-gray-700 mb-1">
    //                 Tender LOGO
    //               </label>
    //               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
    //                 <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
    //                 <p className="text-gray-600 mb-2">
    //                   Drop files here or click to upload.
    //                 </p>
    //                 <div className="flex justify-center space-x-2 flex-wrap">
    //                   {fileTypes.map(({ icon: Icon, label, color }) => (
    //                     <div
    //                       key={label}
    //                       className="flex flex-col items-center m-1"
    //                     >
    //                       <Icon className={`w-6 h-6 ${color}`} />
    //                       <span className="text-xs text-gray-500 mt-1">
    //                         {label}
    //                       </span>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div> */}

    //               <div className="mt-4 text-center">

    //                 <button
    //                   type="button"
    //                   onClick={() => {
    //                     navigate("/projects/upload");
    //                   }}
    //                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    //                 >
    //                   Upload Document
    //                 </button>
    //               </div>

    //              <div className="mt-4 text-center flex items-center justify-center gap-2">
    //               <label htmlFor="fileUpload" className="text-sm font-medium text-gray-700">
    //                 Upload File:
    //               </label>
    //              <input
    //                 type="file"
    //                 id="fileUpload"
    //                 accept=".pdf, .doc, .docx, .xls, .xlsx"
    //                 onChange={(e) => setFile(e.target.files?.[0] || null)}
    //               />
    //             </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
    //         <button
    //           type="button"
    //           onClick={onBack}
    //           className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           type="submit"
    //           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    //         >
    //           {Project ? "Update Tender" : "Create Tender"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="p-6 md:ml-64 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Tenders</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {Project ? "Edit Tender" : "Create Tender"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tender Info Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tender Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter Tender Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <select
                  value={formData.clientName}
                  onChange={(e) =>
                    handleInputChange("clientName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Client --</option>
                  <option value="TenancyBox Ltd">TenancyBox Ltd</option>
                  <option value="BADAWI Corp">BADAWI Corp</option>
                  <option value="Peppino Restaurant">Peppino Restaurant</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) =>
                    handleInputChange("assignedTo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a team member</option>
                  {availableUsers.map((user: any) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  value="Open" 
                  readOnly 
                  className="w-full px-3 py-2 border rounded-lg bg-red-50 focus:outline-none"
                />
              </div>
            </div>

            {/* Tender Dates & File Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }  min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }  min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BILLING TYPE
                </label>
                <select
                  value={formData.billingType}
                  onChange={(e) =>
                    handleInputChange("billingType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Select Billing Type --</option>
                  <option value="one_time">One Time</option>
                  <option value="regular">Regular</option>
                  {/* <option value="Internal">Internal</option> */}
                </select>
              </div>
{/*               
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/projects/upload")}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Upload Document
                </button>
              </div> */}

              <div className="flex items-center justify-center gap-3">
                <label
                  htmlFor="fileUpload"
                  className="text-sm font-medium text-gray-700"
                >
                  Upload File:
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".pdf, .doc, .docx, .xls, .xlsx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {Project ? "Update Tender" : "Create Tender"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;

import React, { useEffect, useState } from "react";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const WorkFlow = () => {
  const [workflows, setWorkflows] = useState([]);
   const [editingId, setEditingId] = useState(null); 
  const [newDays, setNewDays] = useState(""); 

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
         const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}/api/workflows`); 
        setWorkflows(res.data);
      } catch (err) {
        console.error("Error fetching workflows:", err);
      }
    };
    fetchWorkflows();
  }, []);

  const getIcon = (title) => {
    if (title.toLowerCase().includes("overdue"))
      return <AlertCircle className="w-6 h-6 text-red-500" />;
    if (title.toLowerCase().includes("relieving"))
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    return <FileText className="w-6 h-6 text-blue-500" />;
  };

   const handleUpdate = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(`${apiUrl}/api/workflows/${id}`, { days: Number(newDays) });
      setEditingId(null); 
      setNewDays("");
      const res = await axios.get(`${apiUrl}/api/workflows`);
      setWorkflows(res.data);
    } catch (err) {
      console.error("Error updating workflow:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="p-2 space-y-4 md:ml-64 transition-all duration-300">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-800 bg-clip-text text-transparent">
              Work Flow
            </h1>
            <p className="text-slate-600 mt-1">
              Overview of current workflow tasks
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {workflows.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-inner flex items-center justify-center">
                  {getIcon(item.title)}
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {item.title}
                </h2>
              </div>

              <div className="flex items-center justify-between mt-auto">
                 {editingId === item._id ? (
                  <input
                    type="number"
                    value={newDays}
                    onChange={(e) => setNewDays(e.target.value)}
                    className="text-2xl font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-xl shadow w-20"
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-xl shadow">
                    {item.days}
                  </span>
                )}

                {/* CHANGE HERE: Edit / Update button */}
                {editingId === item._id ? (
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="px-5 py-2 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-all duration-200"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(item._id);
                      setNewDays(item.days);
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;

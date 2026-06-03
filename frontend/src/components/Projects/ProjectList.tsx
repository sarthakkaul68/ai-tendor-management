import React, { useState,useEffect } from 'react';
import { Search, Download, Upload, Plus, FolderOpen } from 'lucide-react';
import StatusFilter from './StatusFilter';
import ProjectRow from './ProjectRow';
// import { Projects } from '../../data/mockData';
import { Project } from '../../types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProjectListProps {
  onCreateProject: () => void;
  onEditProject: (Project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onEditProject }) => {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCount, setShowCount] = useState(10);
   const [projects, setProjects] = useState<any[]>([]);
 // projects from backend


  const navigate = useNavigate();

useEffect(() => {
  const fetchProjects = async () => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
      // const response = await axios.get('http://localhost:5000/api/tenders/listing');
      const response = await axios.get(`${apiUrl}/api/tenders/listing`);
       setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
    
  };

  fetchProjects(); 
}, []);

const filteredProjects = projects.filter((project: any) => {
  const matchesStatus = !activeStatus || project.status === activeStatus;

  const matchesSearch =
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project._id?.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesStatus && matchesSearch;
});

const displayedProjects = filteredProjects.slice(0, showCount);


  return (
    <div className="p-2 space-y-2 md:ml-64 transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4 mb-6">
  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center">
    <FolderOpen className="w-6 h-6 text-white" />
  </div>
  <div>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
      Tenders
    </h1>
    <p className="text-slate-600">View and manage tender documents efficiently</p>
  </div>
</div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
            <Upload size={16} />
            <span>Import</span>
          </button>
          <button
            onClick={() => {
              navigate('/projects/create');
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <StatusFilter activeStatus={activeStatus} onStatusChange={setActiveStatus} />

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Show</span>
              <select
                value={showCount}
                onChange={(e) => setShowCount(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="relative w-full md:w-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedProjects.map((project) => (
                <ProjectRow key={project._id} Project={project}  /> //onEdit={onEditProject}
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {displayedProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No Tenders found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;

import React,{useState} from "react";
import { MoreVertical, Calendar, Sparkles } from "lucide-react";
import { Project } from "../../types";
import { useNavigate } from "react-router-dom";

interface ProjectRowProps {
  Project: Project;
  // onEdit: (Project: Project) => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ Project }) => {
     

    const navigate = useNavigate(); // <-- initialize

  const handleAnalyseClick = () => {
     navigate(`/projects/upload/${Project._id}`);
  };


const getStatusBadge = (status: string) => {
  const statusColors: Record<string, string> = {
    Open: "bg-cyan-500 text-white",
    "In-Progress": "bg-orange-500 text-white",
    Overdue: "bg-red-500 text-white",
    Closed: "bg-green-500 text-white",
  };


    return (
      <span
        className={`${
          statusColors[status as keyof typeof statusColors]
        } text-white px-3 py-1 rounded-lg text-sm font-medium`}
      >
        {status}
      </span>
    );
  };

    const [showDropdown, setShowDropdown] = useState(false);


  const getProgressBar = (progress: number) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          progress === 100
            ? "bg-green-500"
            : progress >= 75
            ? "bg-blue-500"
            : progress >= 50
            ? "bg-orange-500"
            : progress >= 25
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const generateAvatar = (name?: string) => {
    const displayName = name || "?";
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
    ];
    const colorIndex = displayName.length % colors.length;
    return (
      <div
        className={`w-8 h-8 ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-xs font-medium`}
      >
        {displayName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}
      </div>
    );
    
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {Project.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-blue-600">
        {Project.tenderId}
      </td>
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{Project.name}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1 mb-1">
          <Calendar size={14} />
          <span>
            {" "}
            Start:{" "}
            {new Date(Project.startDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>
            End:
            {new Date(Project.endDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
        </div>
      </td>
 
      <td className="px-6 py-4">
          <span title={Project.creator.name}>
        {generateAvatar(Project.creator.name)}
        </span>
        </td>
      <td className="px-6 py-4">
        <div className="flex -space-x-2">
              <span title={Project.assignedTo ?  Project.assignedTo.name : "Not Assigned"}>
          {Project.assignedTo ? generateAvatar(Project.assignedTo.name) : "Not Assigned"}
          </span>
          {/* {(Array.isArray(Project.assignedTo) ? Project.assignedTo : [])
            .slice(0, 3)
            .map((person, index) => (
              <div key={index} className="relative">
                {generateAvatar(person)}
              </div>
            ))}

          {Array.isArray(Project.assignedTo) &&
            Project.assignedTo.length > 3 && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                +{Project.assignedTo.length - 3}
              </div>
            )} */}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(Project.status)}</td>
      <td className="px-6 py-4">
        <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
  >
    <MoreVertical size={20} />
  </button>

  <div
    className={`absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10 transform transition-all duration-300 ease-out ${
      showDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
    }`}
  >
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={handleAnalyseClick} 
    >
      Analyse       
      <Sparkles className="w-4 h-4" />
    </button>
  </div>
      </td>
    </tr>
  );
};

export default ProjectRow;

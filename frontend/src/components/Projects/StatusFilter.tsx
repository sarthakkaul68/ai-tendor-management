import React from 'react';
import { statusCounts } from '../../data/mockData';

interface StatusFilterProps {
  activeStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ activeStatus, onStatusChange }) => {
  const statuses = [
    { key: 'Open', label: 'Open', count: statusCounts.Open, color: 'bg-cyan-500' },
    { key: 'In Progress', label: 'In Progress', count: statusCounts['In Progress'], color: 'bg-orange-500' },
    { key: 'On Hold', label: 'On Hold', count: statusCounts['On Hold'], color: 'bg-gray-500' },
    { key: 'Cancel', label: 'Cancel', count: statusCounts.Cancel, color: 'bg-pink-500' },
    { key: 'Completed', label: 'Completed', count: statusCounts.Completed, color: 'bg-green-500' },
    { key: 'Overdue', label: 'Overdue', count: statusCounts.Overdue, color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map((status) => (
        <button
          key={status.key}
          onClick={() => onStatusChange(activeStatus === status.key ? null : status.key)}
          className={`${status.color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 ${
            activeStatus === status.key ? 'ring-2 ring-offset-2 ring-gray-400' : ''
          }`}
        >
          <span className="font-medium">{status.label}</span>
          <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
            {status.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
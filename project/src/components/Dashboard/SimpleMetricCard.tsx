import React from 'react';
import * as Icons from 'lucide-react';
import { SimpleMetric } from '../../types';

interface SimpleMetricCardProps {
  metric: SimpleMetric;
}

const SimpleMetricCard: React.FC<SimpleMetricCardProps> = ({ metric }) => {
  const IconComponent = Icons[metric.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-4">
        <div className={`${metric.color} p-3 rounded-lg`}>
          {IconComponent && <IconComponent size={24} className="text-white" />}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
          <div className="text-gray-600">{metric.label}</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMetricCard;
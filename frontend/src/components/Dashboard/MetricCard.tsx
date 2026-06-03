import React from 'react';
import * as Icons from 'lucide-react';
import { DashboardMetric } from '../../types';

interface MetricCardProps {
  metric: DashboardMetric;
}


const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const IconComponent = Icons[metric.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <>
    <div className={`${metric.bgColor} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            {IconComponent && <IconComponent size={24} />}
          </div>
          <h3 className="text-lg font-semibold">{metric.title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold">{metric.primaryValue}</div>
          <div className="text-sm opacity-90">{metric.primaryLabel}</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{metric.secondaryValue}</div>
          <div className="text-sm opacity-90">{metric.secondaryLabel}</div>
        </div>
      </div>
    </div>

    </>
    
  );
};

export default MetricCard;
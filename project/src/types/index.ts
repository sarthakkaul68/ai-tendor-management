export interface Project {
  id: string;
  name: string;
  version: string;
  clientName: string;
  assignedGroup: string;
  assignedTo: string[];
  demoUrl: string;
  status: 'Open' | 'In Progress' | 'On Hold' | 'Cancel' | 'Completed' | 'Overdue';
  startDate: string;
  endDate: string;
  progress: number;
  creator: string;
  logo?: string;
  billingType: string;
  fixedPrice: number;
  estimateHours: string;
  autoProgress: boolean;
}

export interface DashboardMetric {
  id: string;
  title: string;
  icon: string;
  primaryValue: number;
  primaryLabel: string;
  secondaryValue: number;
  secondaryLabel: string;
  gradient: string;
  bgColor: string;
}

export interface SimpleMetric {
  id: string;
  value: number;
  label: string;
  color: string;
  icon: string;
}

export interface NetworkMetric {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

export interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  connections: number;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChartData {
  timestamp: string;
  value: number;
  label: string;
}

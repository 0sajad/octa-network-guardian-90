
import React, { useState, useEffect } from 'react';
import StatsCards from './StatsCards';
import NetworkChart from './NetworkChart';
import AlertsPanel from './AlertsPanel';
import { SystemStats, ChartData, Alert } from '@/types/dashboard';

const Dashboard = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 45,
    memory: 68,
    disk: 82,
    network: 156,
    uptime: '15 يوم 7 ساعات',
    connections: 847
  });

  const [networkData, setNetworkData] = useState<ChartData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Generate mock data
  useEffect(() => {
    // Generate initial chart data
    const generateChartData = () => {
      const data: ChartData[] = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          timestamp: time.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
          value: Math.floor(Math.random() * 100) + 50,
          label: `Network Traffic ${i}h ago`
        });
      }
      return data;
    };

    setNetworkData(generateChartData());

    // Generate mock alerts
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'warning',
        title: 'استخدام مرتفع للذاكرة',
        message: 'تم تسجيل استخدام الذاكرة بنسبة 85% على الخادم الرئيسي',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false
      },
      {
        id: '2',
        type: 'info',
        title: 'تحديث النظام',
        message: 'تم تثبيت التحديث الأمني الجديد بنجاح',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: false
      },
      {
        id: '3',
        type: 'success',
        title: 'اختبار الشبكة مكتمل',
        message: 'تم إكمال فحص الشبكة الشامل بنجاح - لا توجد مشاكل',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: true
      }
    ];

    setAlerts(mockAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(50, Math.min(200, prev.network + (Math.random() - 0.5) * 20)),
        connections: Math.max(500, Math.min(1000, prev.connections + Math.floor((Math.random() - 0.5) * 50)))
      }));

      // Update chart data
      setNetworkData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        newData.push({
          timestamp: now.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
          value: Math.floor(Math.random() * 100) + 50,
          label: `Network Traffic Now`
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cpuData: ChartData[] = networkData.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 60) + 20
  }));

  const memoryData: ChartData[] = networkData.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 40) + 40
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم الرئيسية</h1>
          <p className="text-gray-400">مراقبة شاملة لأداء الشبكة والنظام في الوقت الفعلي</p>
        </div>
        <div className="flex items-center space-x-reverse space-x-4">
          <div className="glass-dark rounded-lg px-4 py-2 border border-white/20">
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white text-sm">النظام يعمل بشكل طبيعي</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetworkChart 
          data={networkData}
          title="حركة مرور الشبكة"
          color="#3b82f6"
        />
        <NetworkChart 
          data={cpuData}
          title="استخدام المعالج"
          color="#10b981"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetworkChart 
          data={memoryData}
          title="استخدام الذاكرة"
          color="#8b5cf6"
        />
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
};

export default Dashboard;

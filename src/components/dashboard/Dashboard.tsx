
import React, { useState, useEffect } from 'react';
import StatsCards from './StatsCards';
import NetworkChart from './NetworkChart';
import CPUChart from './CPUChart';
import MemoryChart from './MemoryChart';
import TrafficChart from './TrafficChart';
import AlertsPanel from './AlertsPanel';
import { SystemStats, ChartData, Alert } from '@/types/dashboard';

const Dashboard = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 35,
    memory: 52,
    disk: 67,
    network: 125,
    uptime: '7 أيام 14 ساعة',
    connections: 234
  });

  const [networkData, setNetworkData] = useState<ChartData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Generate realistic mock data
  useEffect(() => {
    // Generate initial chart data with realistic values
    const generateChartData = () => {
      const data: ChartData[] = [];
      const now = new Date();
      const baseTraffic = 80; // Base network traffic
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        // Create realistic network patterns (higher during day, lower at night)
        const hour = time.getHours();
        const isBusinessHours = hour >= 8 && hour <= 18;
        const baseValue = isBusinessHours ? baseTraffic + 20 : baseTraffic - 10;
        const randomVariation = (Math.random() - 0.5) * 20;
        
        data.push({
          timestamp: time.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(10, Math.min(150, baseValue + randomVariation)),
          label: `حركة الشبكة ${i}س مضت`
        });
      }
      return data;
    };

    setNetworkData(generateChartData());

    // Generate realistic alerts
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'info',
        title: 'تحديث النظام مكتمل',
        message: 'تم تثبيت التحديث الأمني v2.1.4 بنجاح على جميع الخوادم',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        isRead: false
      },
      {
        id: '2',
        type: 'success',
        title: 'فحص الشبكة مكتمل',
        message: 'تم إكمال الفحص الشامل للشبكة - لا توجد مشاكل أمنية',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        isRead: false
      },
      {
        id: '3',
        type: 'warning',
        title: 'اتصالات عالية',
        message: 'تم تسجيل عدد اتصالات أعلى من المتوسط في الساعة الماضية',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isRead: true
      }
    ];

    setAlerts(mockAlerts);

    // Simulate realistic real-time updates
    const interval = setInterval(() => {
      setStats(prev => {
        // More realistic CPU fluctuations (30-70%)
        const newCpu = Math.max(25, Math.min(75, prev.cpu + (Math.random() - 0.5) * 8));
        // More realistic Memory usage (40-80%)
        const newMemory = Math.max(35, Math.min(85, prev.memory + (Math.random() - 0.5) * 4));
        // Network speed realistic range (50-200 Mbps)
        const newNetwork = Math.max(45, Math.min(200, prev.network + (Math.random() - 0.5) * 15));
        // Realistic connection count (150-400)
        const newConnections = Math.max(150, Math.min(400, prev.connections + Math.floor((Math.random() - 0.5) * 20)));

        return {
          ...prev,
          cpu: Math.round(newCpu),
          memory: Math.round(newMemory),
          network: Math.round(newNetwork),
          connections: newConnections
        };
      });

      // Update chart data with realistic patterns
      setNetworkData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        const hour = now.getHours();
        const isBusinessHours = hour >= 8 && hour <= 18;
        const baseValue = isBusinessHours ? 100 : 60;
        const randomVariation = (Math.random() - 0.5) * 25;
        
        newData.push({
          timestamp: now.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(20, Math.min(150, baseValue + randomVariation)),
          label: 'حركة الشبكة الآن'
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate CPU and Memory data based on network patterns
  const cpuData: ChartData[] = networkData.map(item => ({
    ...item,
    value: Math.max(20, Math.min(80, item.value * 0.4 + Math.random() * 15))
  }));

  const memoryData: ChartData[] = networkData.map(item => ({
    ...item,
    value: Math.max(30, Math.min(90, item.value * 0.5 + 20 + Math.random() * 10))
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
          <div className="glass-dark rounded-lg px-3 py-2 border border-white/20">
            <span className="text-gray-300 text-sm">
              {new Date().toLocaleString('ar-SA', { 
                hour: '2-digit', 
                minute: '2-digit',
                day: 'numeric',
                month: 'short'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficChart data={networkData} />
        <CPUChart data={cpuData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemoryChart data={memoryData} />
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
};

export default Dashboard;

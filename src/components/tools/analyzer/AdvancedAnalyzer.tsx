
import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Activity, Wifi, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const runAnalysis = async () => {
    setAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const data = {
      networkPerformance: [
        { time: '00:00', speed: 85, latency: 12 },
        { time: '04:00', speed: 92, latency: 8 },
        { time: '08:00', speed: 76, latency: 15 },
        { time: '12:00', speed: 68, latency: 22 },
        { time: '16:00', speed: 71, latency: 18 },
        { time: '20:00', speed: 88, latency: 10 }
      ],
      trafficDistribution: [
        { name: 'HTTP/HTTPS', value: 65, color: '#3b82f6' },
        { name: 'DNS', value: 15, color: '#10b981' },
        { name: 'FTP', value: 8, color: '#f59e0b' },
        { name: 'SSH', value: 7, color: '#ef4444' },
        { name: 'أخرى', value: 5, color: '#8b5cf6' }
      ],
      securityAlerts: [
        { type: 'تسجيل دخول مشبوه', severity: 'عالي', count: 3 },
        { type: 'محاولة اختراق', severity: 'متوسط', count: 7 },
        { type: 'حركة مرور غير عادية', severity: 'منخفض', count: 12 }
      ],
      deviceCount: 24,
      totalBandwidth: '847 MB',
      uptime: '99.8%',
      threatsBlocked: 156
    };
    
    setAnalysisData(data);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">محلل الشبكة المتقدم</h1>
          <p className="text-gray-400">تحليل شامل لأداء وأمان الشبكة</p>
        </div>
        <Button
          onClick={runAnalysis}
          disabled={analyzing}
          className="bg-primary-600 hover:bg-primary-700"
        >
          {analyzing ? 'جاري التحليل...' : 'بدء التحليل الشامل'}
        </Button>
      </div>

      {analyzing && (
        <Card className="glass-dark border-white/20 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-reverse space-x-3">
              <Activity className="w-6 h-6 text-blue-400 animate-spin" />
              <span className="text-white">جاري تحليل الشبكة...</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-gray-400 text-sm">فحص الأجهزة المتصلة وتحليل حركة المرور...</p>
          </div>
        </Card>
      )}

      {analysisData && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-dark border-white/20 p-6">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">الأجهزة المتصلة</p>
                  <p className="text-2xl font-bold text-white">{analysisData.deviceCount}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-dark border-white/20 p-6">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">وقت التشغيل</p>
                  <p className="text-2xl font-bold text-green-400">{analysisData.uptime}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-dark border-white/20 p-6">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">استهلاك البيانات</p>
                  <p className="text-2xl font-bold text-white">{analysisData.totalBandwidth}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-dark border-white/20 p-6">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">التهديدات المحجوبة</p>
                  <p className="text-2xl font-bold text-red-400">{analysisData.threatsBlocked}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-dark border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">أداء الشبكة خلال 24 ساعة</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analysisData.networkPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                  <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={2} name="السرعة (Mbps)" />
                  <Line type="monotone" dataKey="latency" stroke="#ef4444" strokeWidth={2} name="زمن الاستجابة (ms)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glass-dark border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">توزيع حركة المرور</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <RechartsPieChart data={analysisData.trafficDistribution} cx="50%" cy="50%" outerRadius={100}>
                    {analysisData.trafficDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {analysisData.trafficDistribution.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-300 text-sm">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Security Alerts */}
          <Card className="glass-dark border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">تنبيهات الأمان</h3>
            <div className="space-y-3">
              {analysisData.securityAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'عالي' ? 'bg-red-500' : 
                      alert.severity === 'متوسط' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-white">{alert.type}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-4">
                    <span className={`text-sm px-2 py-1 rounded ${
                      alert.severity === 'عالي' ? 'bg-red-500/20 text-red-400' : 
                      alert.severity === 'متوسط' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-gray-400">{alert.count} مرة</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalyzer;

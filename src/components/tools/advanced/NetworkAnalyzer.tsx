
import React, { useState } from 'react';
import { Activity, Wifi, Signal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const NetworkAnalyzer = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const startAnalysis = async () => {
    setIsScanning(true);
    setResults(null);
    
    // Simulate network analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResults({
      connectedDevices: Math.floor(Math.random() * 15) + 5,
      networkLoad: Math.floor(Math.random() * 50) + 30,
      signalStrength: Math.floor(Math.random() * 30) + 70,
      latency: Math.floor(Math.random() * 20) + 10,
      throughput: Math.floor(Math.random() * 100) + 50,
      securityLevel: 'WPA3',
      vulnerabilities: Math.floor(Math.random() * 3)
    });
    
    setIsScanning(false);
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-reverse space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">محلل الشبكة المتقدم</h3>
            <p className="text-gray-400 text-sm">تحليل شامل لحالة الشبكة والأمان</p>
          </div>
        </div>
        <Button 
          onClick={startAnalysis}
          disabled={isScanning}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isScanning ? 'جاري التحليل...' : 'بدء التحليل'}
        </Button>
      </div>

      {isScanning && (
        <div className="space-y-4">
          <Progress value={75} className="h-2" />
          <div className="text-center text-gray-400">
            <p>جاري فحص الشبكة وتحليل الأمان...</p>
          </div>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-reverse space-x-2 mb-2">
                <Wifi className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">الأجهزة المتصلة</span>
              </div>
              <span className="text-2xl font-bold text-white">{results.connectedDevices}</span>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-reverse space-x-2 mb-2">
                <Signal className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">قوة الإشارة</span>
              </div>
              <span className="text-2xl font-bold text-white">{results.signalStrength}%</span>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-reverse space-x-2 mb-2">
                <Activity className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">زمن الاستجابة</span>
              </div>
              <span className="text-2xl font-bold text-white">{results.latency}ms</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">تقرير الأمان</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">نوع التشفير:</span>
                <span className="text-green-400">{results.securityLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">الثغرات المكتشفة:</span>
                <span className={results.vulnerabilities > 0 ? "text-red-400" : "text-green-400"}>
                  {results.vulnerabilities}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkAnalyzer;

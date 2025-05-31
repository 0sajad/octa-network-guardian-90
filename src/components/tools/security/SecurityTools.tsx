
import React, { useState } from 'react';
import { Shield, AlertTriangle, Lock, Eye, Scan, FileX, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const SecurityTools = () => {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const securityTools = [
    {
      id: 'vulnerability-scan',
      name: 'فحص الثغرات الأمنية',
      description: 'فحص شامل للثغرات الأمنية في النظام',
      icon: Shield,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'threat-detection',
      name: 'كشف التهديدات',
      description: 'مراقبة التهديدات في الوقت الفعلي',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'firewall-check',
      name: 'فحص جدار الحماية',
      description: 'التحقق من إعدادات جدار الحماية',
      icon: Lock,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'intrusion-detection',
      name: 'كشف الاختراق',
      description: 'مراقبة محاولات الاختراق',
      icon: Eye,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'malware-scan',
      name: 'فحص البرمجيات الخبيثة',
      description: 'البحث عن البرمجيات الضارة',
      icon: Scan,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'security-audit',
      name: 'تدقيق أمني شامل',
      description: 'تقييم شامل لحالة الأمان',
      icon: FileX,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const runSecurityScan = async (toolId: string) => {
    setScanning(true);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockResults = {
      'vulnerability-scan': {
        critical: Math.floor(Math.random() * 3),
        high: Math.floor(Math.random() * 5),
        medium: Math.floor(Math.random() * 8),
        low: Math.floor(Math.random() * 10),
        status: 'completed'
      },
      'threat-detection': {
        threats: Math.floor(Math.random() * 2),
        blocked: Math.floor(Math.random() * 5),
        monitoring: true,
        status: 'active'
      },
      'firewall-check': {
        status: 'active',
        rules: 45,
        blocked: 234,
        allowed: 1567
      }
    };

    setResults(mockResults[toolId] || { status: 'completed', message: 'تم الفحص بنجاح' });
    setScanning(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="glass-dark rounded-xl p-6 border border-white/20 hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Button
                  onClick={() => runSecurityScan(tool.id)}
                  disabled={scanning}
                  size="sm"
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {scanning ? 'جاري الفحص...' : 'فحص'}
                </Button>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-400 text-sm">{tool.description}</p>

              {scanning && (
                <div className="mt-4 space-y-2">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-400">جاري الفحص...</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {results && (
        <div className="glass-dark rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">نتائج الفحص الأمني</h3>
          {results.critical !== undefined && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-500/20 rounded-lg p-4">
                <h4 className="text-red-400 font-medium">حرجة</h4>
                <p className="text-2xl font-bold text-white">{results.critical}</p>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-4">
                <h4 className="text-orange-400 font-medium">عالية</h4>
                <p className="text-2xl font-bold text-white">{results.high}</p>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium">متوسطة</h4>
                <p className="text-2xl font-bold text-white">{results.medium}</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium">منخفضة</h4>
                <p className="text-2xl font-bold text-white">{results.low}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityTools;

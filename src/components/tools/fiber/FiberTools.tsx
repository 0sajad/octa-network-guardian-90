
import React, { useState } from 'react';
import { Zap, Activity, Signal, AlertCircle, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const FiberTools = () => {
  const { t } = useLanguage();
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const fiberTools = [
    {
      id: 'otdr-test',
      name: 'اختبار OTDR',
      description: 'قياس انعكاس الألياف البصرية',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'loss-measurement',
      name: 'قياس الفقدان',
      description: 'قياس فقدان الإشارة في الكابل',
      icon: Activity,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'signal-quality',
      name: 'جودة الإشارة',
      description: 'تحليل جودة إشارة الألياف',
      icon: Signal,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'fault-detection',
      name: 'كشف الأعطال',
      description: 'تحديد مواقع الأعطال في الكابلات',
      icon: AlertCircle,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'power-meter',
      name: 'مقياس القدرة البصرية',
      description: 'قياس قوة الإشارة البصرية',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'visual-inspector',
      name: 'الفحص البصري',
      description: 'فحص نهايات الألياف البصرية',
      icon: Eye,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const runFiberTest = async (toolId: string) => {
    setTesting(true);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 4000));

    const mockResults = {
      'otdr-test': {
        distance: '12.5 km',
        loss: '0.34 dB',
        reflectance: '-45 dB',
        events: 3,
        status: 'pass'
      },
      'loss-measurement': {
        insertion_loss: '0.28 dB',
        return_loss: '-42 dB',
        wavelength: '1550 nm',
        status: 'pass'
      },
      'signal-quality': {
        snr: '28.5 dB',
        ber: '1e-12',
        dispersion: '2.1 ps/nm',
        status: 'excellent'
      }
    };

    setResults(mockResults[toolId] || { status: 'completed', message: 'تم الاختبار بنجاح' });
    setTesting(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fiberTools.map((tool, index) => {
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
                  onClick={() => runFiberTest(tool.id)}
                  disabled={testing}
                  size="sm"
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {testing ? 'جاري الاختبار...' : 'اختبار'}
                </Button>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-400 text-sm">{tool.description}</p>

              {testing && (
                <div className="mt-4 space-y-2">
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-400">جاري الاختبار...</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {results && (
        <div className="glass-dark rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">نتائج اختبار الألياف البصرية</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(results).map(([key, value]) => {
              if (key === 'status') return null;
              return (
                <div key={key} className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-gray-300 text-sm capitalize">{key.replace('_', ' ')}</h4>
                  <p className="text-white font-bold">{String(value)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
            <p className="text-green-400 font-medium">
              الحالة: {results.status === 'pass' ? 'نجح الاختبار' : 
                      results.status === 'excellent' ? 'ممتاز' : 'مكتمل'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiberTools;


import React, { useState } from 'react';
import { Play, Settings, BarChart3, Cpu, Network, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const SimulationTools = () => {
  const { t } = useLanguage();
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const simulations = [
    {
      id: 'network-load',
      name: 'محاكاة حمل الشبكة',
      description: 'اختبار أداء الشبكة تحت أحمال مختلفة',
      icon: Network,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'attack-simulation',
      name: 'محاكاة الهجمات',
      description: 'اختبار مقاومة النظام للهجمات الأمنية',
      icon: Zap,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'performance-test',
      name: 'اختبار الأداء',
      description: 'قياس أداء النظام في ظروف مختلفة',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'cpu-stress',
      name: 'اختبار إجهاد المعالج',
      description: 'اختبار قدرة المعالج على تحمل الأحمال',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const runSimulation = async (simId: string) => {
    setRunning(true);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 5000));

    const mockResults = {
      'network-load': {
        maxThroughput: '985 Mbps',
        latency: '12ms',
        packetLoss: '0.02%',
        concurrent: 1500,
        status: 'success'
      },
      'attack-simulation': {
        attacks: 150,
        blocked: 148,
        detected: '98.7%',
        response: '0.3s',
        status: 'secure'
      },
      'performance-test': {
        score: 8.7,
        cpu: '65%',
        memory: '72%',
        disk: '45%',
        status: 'excellent'
      }
    };

    setResults(mockResults[simId] || { status: 'completed' });
    setRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulations.map((sim, index) => {
          const Icon = sim.icon;
          return (
            <div
              key={sim.id}
              className="glass-dark rounded-xl p-6 border border-white/20 hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sim.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Button
                  onClick={() => runSimulation(sim.id)}
                  disabled={running}
                  size="sm"
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {running ? 'جاري التشغيل...' : 'تشغيل'}
                </Button>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{sim.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{sim.description}</p>

              {running && (
                <div className="space-y-2">
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-gray-400">جاري تنفيذ المحاكاة...</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {results && (
        <div className="glass-dark rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">نتائج المحاكاة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(results).map(([key, value]) => {
              if (key === 'status') return null;
              return (
                <div key={key} className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-gray-300 text-sm capitalize">{key}</h4>
                  <p className="text-white font-bold">{String(value)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationTools;

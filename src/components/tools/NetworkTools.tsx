
import React, { useState } from 'react';
import { Wifi, Gauge, Search, Shield, Activity, Zap, Network, Calculator, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import NetworkAnalyzer from './advanced/NetworkAnalyzer';
import SubnetCalculator from './advanced/SubnetCalculator';
import WhoisLookup from './advanced/WhoisLookup';

const NetworkTools = () => {
  const { t } = useLanguage();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeAdvancedTool, setActiveAdvancedTool] = useState<string | null>(null);

  const basicTools = [
    {
      id: 'speed',
      name: t('tools.speedTest'),
      icon: Gauge,
      description: 'قياس سرعة التحميل والرفع',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ping',
      name: t('tools.ping'),
      icon: Activity,
      description: 'اختبار زمن الاستجابة',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'dns',
      name: t('tools.dns'),
      icon: Search,
      description: 'فحص إعدادات DNS',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'port',
      name: t('tools.portScan'),
      icon: Shield,
      description: 'مسح المنافذ المفتوحة',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'bandwidth',
      name: t('tools.bandwidth'),
      icon: Wifi,
      description: 'تحليل استخدام الشبكة',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'trace',
      name: t('tools.traceroute'),
      icon: Zap,
      description: 'تتبع مسار البيانات',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const advancedTools = [
    {
      id: 'analyzer',
      name: 'محلل الشبكة المتقدم',
      icon: Network,
      description: 'تحليل شامل لحالة الشبكة',
      color: 'from-blue-500 to-cyan-500',
      component: NetworkAnalyzer
    },
    {
      id: 'subnet',
      name: 'حاسبة الشبكات الفرعية',
      icon: Calculator,
      description: 'حساب معلومات الشبكة الفرعية',
      color: 'from-purple-500 to-pink-500',
      component: SubnetCalculator
    },
    {
      id: 'whois',
      name: 'بحث معلومات النطاق',
      icon: Globe,
      description: 'الحصول على معلومات WHOIS',
      color: 'from-orange-500 to-red-500',
      component: WhoisLookup
    }
  ];

  const runTool = async (toolId: string) => {
    setIsRunning(true);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    switch (toolId) {
      case 'speed':
        setResults({
          download: Math.floor(Math.random() * 100) + 50,
          upload: Math.floor(Math.random() * 50) + 20,
          ping: Math.floor(Math.random() * 30) + 10
        });
        break;
      case 'ping':
        setResults({
          host: 'google.com',
          packets: 4,
          received: 4,
          loss: 0,
          avgTime: Math.floor(Math.random() * 20) + 10
        });
        break;
      case 'dns':
        setResults({
          primary: '8.8.8.8',
          secondary: '8.8.4.4',
          responseTime: Math.floor(Math.random() * 50) + 10,
          status: 'working'
        });
        break;
      default:
        setResults({ status: 'completed', message: 'تم تنفيذ الأداة بنجاح' });
    }

    setIsRunning(false);
  };

  const renderAdvancedTool = () => {
    const tool = advancedTools.find(t => t.id === activeAdvancedTool);
    if (!tool) return null;
    
    const Component = tool.component;
    return <Component />;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('tools.title')}</h1>
          <p className="text-gray-400">{t('tools.subtitle')}</p>
        </div>
        {activeAdvancedTool && (
          <Button
            onClick={() => setActiveAdvancedTool(null)}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            العودة للقائمة الرئيسية
          </Button>
        )}
      </div>

      {activeAdvancedTool ? (
        renderAdvancedTool()
      ) : (
        <>
          {/* Basic Tools Grid */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">الأدوات الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {basicTools.map((tool, index) => {
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
                        onClick={() => runTool(tool.id)}
                        disabled={isRunning}
                        size="sm"
                        className="bg-primary-600 hover:bg-primary-700"
                      >
                        {isRunning ? t('common.running') : t('common.run')}
                      </Button>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                    
                    {isRunning && (
                      <div className="space-y-2">
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-gray-400">جاري التنفيذ...</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advanced Tools Grid */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">الأدوات المتقدمة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="glass-dark rounded-xl p-6 border border-white/20 hover-lift transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${(basicTools.length + index) * 100}ms` }}
                    onClick={() => setActiveAdvancedTool(tool.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-400 text-sm">{tool.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Panel */}
          {results && (
            <div className="glass-dark rounded-xl p-6 border border-white/20 animate-fadeIn">
              <h3 className="text-lg font-semibold text-white mb-4">نتائج الفحص</h3>
              
              {results.download && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-green-400 font-medium">سرعة التحميل</h4>
                    <p className="text-2xl font-bold text-white">{results.download} Mbps</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium">سرعة الرفع</h4>
                    <p className="text-2xl font-bold text-white">{results.upload} Mbps</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-medium">زمن الاستجابة</h4>
                    <p className="text-2xl font-bold text-white">{results.ping} ms</p>
                  </div>
                </div>
              )}
              
              {results.host && (
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">نتائج Ping لـ {results.host}</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>الحزم المرسلة: {results.packets}</p>
                    <p>الحزم المستقبلة: {results.received}</p>
                    <p>نسبة الفقدان: {results.loss}%</p>
                    <p>متوسط الوقت: {results.avgTime}ms</p>
                  </div>
                </div>
              )}
              
              {results.primary && (
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">إعدادات DNS</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>الخادم الأساسي: {results.primary}</p>
                    <p>الخادم الثانوي: {results.secondary}</p>
                    <p>زمن الاستجابة: {results.responseTime}ms</p>
                    <p className="text-green-400">الحالة: يعمل بشكل طبيعي</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Test Panel */}
          <div className="glass-dark rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">اختبار سريع</h3>
            <div className="flex space-x-reverse space-x-4">
              <Input
                placeholder="أدخل عنوان IP أو اسم المضيف"
                className="flex-1 bg-white/10 border-white/20 text-white"
                dir="rtl"
              />
              <Button className="bg-primary-600 hover:bg-primary-700">
                {t('common.test')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NetworkTools;

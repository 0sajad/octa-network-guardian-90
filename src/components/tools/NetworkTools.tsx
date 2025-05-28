
import React, { useState } from 'react';
import { Wifi, Gauge, Search, Shield, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const NetworkTools = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const tools = [
    {
      id: 'speed',
      name: 'اختبار سرعة الإنترنت',
      icon: Gauge,
      description: 'قياس سرعة التحميل والرفع',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ping',
      name: 'فحص الاتصال (Ping)',
      icon: Activity,
      description: 'اختبار زمن الاستجابة',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'dns',
      name: 'تحليل DNS',
      icon: Search,
      description: 'فحص إعدادات DNS',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'port',
      name: 'فحص المنافذ',
      icon: Shield,
      description: 'مسح المنافذ المفتوحة',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'bandwidth',
      name: 'مراقبة النطاق الترددي',
      icon: Wifi,
      description: 'تحليل استخدام الشبكة',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'trace',
      name: 'تتبع المسار',
      icon: Zap,
      description: 'تتبع مسار البيانات',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const runTool = async (toolId: string) => {
    setIsRunning(true);
    setResults(null);

    // Simulate tool execution
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results based on tool
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

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">أدوات الشبكة</h1>
          <p className="text-gray-400">مجموعة شاملة من أدوات تشخيص ومراقبة الشبكة</p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
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
                  {isRunning ? 'جاري التشغيل...' : 'تشغيل'}
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
            اختبار
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkTools;

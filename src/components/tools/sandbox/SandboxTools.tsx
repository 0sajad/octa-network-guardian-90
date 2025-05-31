
import React, { useState } from 'react';
import { Play, Square, RotateCcw, Monitor, Code, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const SandboxTools = () => {
  const [environment, setEnvironment] = useState({
    running: false,
    config: {
      networkSpeed: '100',
      latency: '20',
      packetLoss: '0',
      firewallEnabled: true,
      vpnEnabled: false
    },
    script: `# مثال على سكريبت اختبار الشبكة
ping -c 4 google.com
nslookup google.com
netstat -an | head -10
ifconfig`,
    logs: []
  });

  const runSimulation = async () => {
    setEnvironment(prev => ({ ...prev, running: true, logs: [] }));
    
    const simulationSteps = [
      'بدء تشغيل البيئة الافتراضية...',
      'تطبيق إعدادات الشبكة...',
      'تنفيذ السكريبت...',
      'ping google.com: 64 bytes from 172.217.16.110: icmp_seq=1 ttl=57 time=22.1 ms',
      'ping google.com: 64 bytes from 172.217.16.110: icmp_seq=2 ttl=57 time=21.8 ms',
      'ping google.com: 64 bytes from 172.217.16.110: icmp_seq=3 ttl=57 time=22.3 ms',
      'ping google.com: 64 bytes from 172.217.16.110: icmp_seq=4 ttl=57 time=22.0 ms',
      'nslookup google.com: Server: 8.8.8.8, Address: 172.217.16.110',
      'netstat -an: Active Internet connections',
      'tcp4  0  0  192.168.1.100.52341  172.217.16.110.443  ESTABLISHED',
      'إنهاء المحاكاة بنجاح'
    ];

    for (let i = 0; i < simulationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEnvironment(prev => ({
        ...prev,
        logs: [...prev.logs, { 
          time: new Date().toLocaleTimeString('ar-EG'), 
          message: simulationSteps[i],
          type: i === 0 || i === simulationSteps.length - 1 ? 'system' : 'output'
        }]
      }));
    }
    
    setEnvironment(prev => ({ ...prev, running: false }));
  };

  const stopSimulation = () => {
    setEnvironment(prev => ({ 
      ...prev, 
      running: false,
      logs: [...prev.logs, { 
        time: new Date().toLocaleTimeString('ar-EG'), 
        message: 'تم إيقاف المحاكاة بواسطة المستخدم',
        type: 'system'
      }]
    }));
  };

  const clearLogs = () => {
    setEnvironment(prev => ({ ...prev, logs: [] }));
  };

  const updateConfig = (key: string, value: any) => {
    setEnvironment(prev => ({
      ...prev,
      config: { ...prev.config, [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">البيئة الافتراضية للاختبار</h1>
          <p className="text-gray-400">تجربة وفحص إعدادات الشبكة في بيئة آمنة</p>
        </div>
        <div className="flex space-x-reverse space-x-2">
          <Button
            onClick={runSimulation}
            disabled={environment.running}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 ml-2" />
            تشغيل
          </Button>
          <Button
            onClick={stopSimulation}
            disabled={!environment.running}
            variant="destructive"
          >
            <Square className="w-4 h-4 ml-2" />
            إيقاف
          </Button>
          <Button
            onClick={clearLogs}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            مسح
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="glass-dark border-white/20 p-6">
          <div className="flex items-center space-x-reverse space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">إعدادات البيئة</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm block mb-2">سرعة الشبكة (Mbps)</label>
              <Input
                type="number"
                value={environment.config.networkSpeed}
                onChange={(e) => updateConfig('networkSpeed', e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm block mb-2">زمن الاستجابة (ms)</label>
              <Input
                type="number"
                value={environment.config.latency}
                onChange={(e) => updateConfig('latency', e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm block mb-2">فقدان الحزم (%)</label>
              <Input
                type="number"
                value={environment.config.packetLoss}
                onChange={(e) => updateConfig('packetLoss', e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-reverse space-x-2">
                <input
                  type="checkbox"
                  checked={environment.config.firewallEnabled}
                  onChange={(e) => updateConfig('firewallEnabled', e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-300 text-sm">تفعيل جدار الحماية</span>
              </label>
              
              <label className="flex items-center space-x-reverse space-x-2">
                <input
                  type="checkbox"
                  checked={environment.config.vpnEnabled}
                  onChange={(e) => updateConfig('vpnEnabled', e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-300 text-sm">تفعيل VPN</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Script Editor and Console */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="script" className="w-full">
            <TabsList className="glass-dark border border-white/20">
              <TabsTrigger value="script" className="text-white">محرر السكريبت</TabsTrigger>
              <TabsTrigger value="console" className="text-white">وحدة التحكم</TabsTrigger>
            </TabsList>
            
            <TabsContent value="script">
              <Card className="glass-dark border-white/20 p-6">
                <div className="flex items-center space-x-reverse space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">سكريبت الاختبار</h3>
                </div>
                
                <Textarea
                  value={environment.script}
                  onChange={(e) => setEnvironment(prev => ({ ...prev, script: e.target.value }))}
                  className="min-h-[300px] bg-black/50 border-white/20 text-green-400 font-mono"
                  placeholder="اكتب أوامر shell هنا..."
                  dir="ltr"
                />
                
                <div className="mt-4 text-xs text-gray-400">
                  <p>الأوامر المدعومة: ping, nslookup, netstat, ifconfig, traceroute, dig</p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="console">
              <Card className="glass-dark border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">سجل التنفيذ</h3>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${environment.running ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                </div>
                
                <div className="bg-black/50 border border-white/20 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                  {environment.logs.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">لا توجد سجلات بعد. اضغط على "تشغيل" لبدء المحاكاة.</p>
                  ) : (
                    <div className="space-y-1">
                      {environment.logs.map((log, index) => (
                        <div key={index} className="flex items-start space-x-reverse space-x-3">
                          <span className="text-gray-500 text-xs shrink-0">[{log.time}]</span>
                          <span className={`text-sm font-mono ${
                            log.type === 'system' ? 'text-blue-400' : 'text-green-400'
                          }`}>
                            {log.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Quick Templates */}
      <Card className="glass-dark border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">قوالب سكريبت جاهزة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'اختبار الاتصال الأساسي',
              script: `ping -c 4 google.com\nping -c 4 8.8.8.8\nnslookup google.com`
            },
            {
              name: 'فحص المنافذ المفتوحة',
              script: `netstat -an | grep LISTEN\nss -tuln\nlsof -i :80`
            },
            {
              name: 'تحليل الشبكة المتقدم',
              script: `traceroute google.com\ndig google.com\nifconfig\nroute -n`
            }
          ].map((template, index) => (
            <div 
              key={index}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setEnvironment(prev => ({ ...prev, script: template.script }))}
            >
              <h4 className="text-white font-medium mb-2">{template.name}</h4>
              <p className="text-gray-400 text-xs">انقر للاستخدام</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SandboxTools;

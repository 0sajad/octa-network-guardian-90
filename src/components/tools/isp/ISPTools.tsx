
import React, { useState } from 'react';
import { Globe, Wifi, MapPin, Clock, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ISPTools = () => {
  const [ispData, setIspData] = useState({
    name: '',
    ip: '',
    location: '',
    testing: false,
    results: null
  });

  const testISP = async () => {
    setIspData(prev => ({ ...prev, testing: true }));
    
    // Simulate ISP testing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = {
      providerName: ispData.name || 'Unknown ISP',
      downloadSpeed: Math.floor(Math.random() * 100) + 50,
      uploadSpeed: Math.floor(Math.random() * 50) + 20,
      latency: Math.floor(Math.random() * 30) + 10,
      jitter: Math.floor(Math.random() * 5) + 1,
      packetLoss: (Math.random() * 2).toFixed(2),
      location: 'Iraq, Baghdad',
      ipInfo: {
        ip: '185.96.4.1',
        type: 'IPv4',
        organization: ispData.name || 'Test ISP'
      },
      coverage: Math.floor(Math.random() * 30) + 70,
      reliability: Math.floor(Math.random() * 20) + 80,
      customerSatisfaction: Math.floor(Math.random() * 15) + 85
    };
    
    setIspData(prev => ({ ...prev, testing: false, results }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">أدوات فحص مزودي الخدمة</h1>
          <p className="text-gray-400">اختبار وتحليل شركات الاتصالات والإنترنت</p>
        </div>
      </div>

      {/* ISP Input Form */}
      <Card className="glass-dark border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">معلومات مزود الخدمة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="اسم الشركة (مثال: زين العراق)"
            value={ispData.name}
            onChange={(e) => setIspData(prev => ({ ...prev, name: e.target.value }))}
            className="bg-white/10 border-white/20 text-white"
            dir="rtl"
          />
          <Input
            placeholder="عنوان IP أو خادم الاختبار"
            value={ispData.ip}
            onChange={(e) => setIspData(prev => ({ ...prev, ip: e.target.value }))}
            className="bg-white/10 border-white/20 text-white"
          />
          <Button 
            onClick={testISP}
            disabled={ispData.testing}
            className="bg-primary-600 hover:bg-primary-700"
          >
            {ispData.testing ? 'جاري الفحص...' : 'بدء الفحص'}
          </Button>
        </div>
        
        {ispData.testing && (
          <div className="mt-4 space-y-2">
            <Progress value={75} className="h-2" />
            <p className="text-sm text-gray-400">جاري اختبار الاتصال والسرعة...</p>
          </div>
        )}
      </Card>

      {/* Results */}
      {ispData.results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-dark border-white/20 p-6">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">اختبار السرعة</h3>
                <p className="text-gray-400 text-sm">{ispData.results.providerName}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">التحميل</span>
                  <span className="text-green-400 font-bold">{ispData.results.downloadSpeed} Mbps</span>
                </div>
                <Progress value={(ispData.results.downloadSpeed / 100) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">الرفع</span>
                  <span className="text-blue-400 font-bold">{ispData.results.uploadSpeed} Mbps</span>
                </div>
                <Progress value={(ispData.results.uploadSpeed / 50) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-yellow-400 text-lg font-bold">{ispData.results.latency}ms</p>
                  <p className="text-gray-400 text-xs">زمن الاستجابة</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-400 text-lg font-bold">{ispData.results.packetLoss}%</p>
                  <p className="text-gray-400 text-xs">فقدان الحزم</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-dark border-white/20 p-6">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">معلومات الموقع</h3>
                <p className="text-gray-400 text-sm">تفاصيل الشبكة</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 text-sm">عنوان IP</p>
                <p className="text-white font-mono">{ispData.results.ipInfo.ip}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">الموقع</p>
                <p className="text-white">{ispData.results.location}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">المؤسسة</p>
                <p className="text-white">{ispData.results.ipInfo.organization}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-dark border-white/20 p-6">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">تقييم الخدمة</h3>
                <p className="text-gray-400 text-sm">مؤشرات الجودة</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">التغطية</span>
                  <span className="text-green-400 font-bold">{ispData.results.coverage}%</span>
                </div>
                <Progress value={ispData.results.coverage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">الاستقرار</span>
                  <span className="text-blue-400 font-bold">{ispData.results.reliability}%</span>
                </div>
                <Progress value={ispData.results.reliability} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">رضا العملاء</span>
                  <span className="text-purple-400 font-bold">{ispData.results.customerSatisfaction}%</span>
                </div>
                <Progress value={ispData.results.customerSatisfaction} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Popular ISPs */}
      <Card className="glass-dark border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">شركات الاتصالات الشائعة في العراق</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'زين العراق', logo: '🟦', type: 'موبايل + إنترنت' },
            { name: 'آسياسيل', logo: '🟨', type: 'موبايل + إنترنت' },
            { name: 'كورك تيليكوم', logo: '🟩', type: 'إنترنت ثابت' },
            { name: 'ايرث لينك', logo: '🟪', type: 'إنترنت ثابت' },
            { name: 'نيو لاين', logo: '🟧', type: 'إنترنت ثابت' },
            { name: 'سريع نت', logo: '🟫', type: 'إنترنت ثابت' },
            { name: 'تراس', logo: '⬜', type: 'إنترنت ثابت' },
            { name: 'اكسترا نت', logo: '⬛', type: 'إنترنت ثابت' }
          ].map((isp, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">{isp.logo}</div>
              <h4 className="text-white font-medium text-sm">{isp.name}</h4>
              <p className="text-gray-400 text-xs">{isp.type}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ISPTools;

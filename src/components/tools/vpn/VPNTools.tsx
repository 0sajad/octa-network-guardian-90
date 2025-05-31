
import React, { useState } from 'react';
import { Shield, Globe, Lock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const VPNTools = () => {
  const [vpnTest, setVpnTest] = useState({
    server: '',
    port: '',
    protocol: 'OpenVPN',
    testing: false,
    results: null
  });

  const testVPN = async () => {
    setVpnTest(prev => ({ ...prev, testing: true }));
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const results = {
      connected: Math.random() > 0.3,
      serverLocation: vpnTest.server || 'Unknown Server',
      realIP: '185.96.4.15',
      vpnIP: '192.168.1.100',
      encryptionLevel: 'AES-256',
      protocol: vpnTest.protocol,
      speed: {
        download: Math.floor(Math.random() * 80) + 40,
        upload: Math.floor(Math.random() * 40) + 20,
        latency: Math.floor(Math.random() * 50) + 20
      },
      security: {
        dnsLeak: Math.random() > 0.8,
        ipLeak: Math.random() > 0.9,
        webrtcLeak: Math.random() > 0.7
      },
      anonymity: Math.floor(Math.random() * 20) + 80,
      killSwitch: Math.random() > 0.5
    };
    
    setVpnTest(prev => ({ ...prev, testing: false, results }));
  };

  const getSecurityScore = () => {
    if (!vpnTest.results) return 0;
    let score = 100;
    if (vpnTest.results.security.dnsLeak) score -= 30;
    if (vpnTest.results.security.ipLeak) score -= 40;
    if (vpnTest.results.security.webrtcLeak) score -= 20;
    if (!vpnTest.results.killSwitch) score -= 10;
    return Math.max(score, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">أدوات فحص VPN</h1>
          <p className="text-gray-400">اختبار وتحليل شبكات VPN الخاصة الافتراضية</p>
        </div>
      </div>

      {/* VPN Configuration */}
      <Card className="glass-dark border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">إعدادات VPN للاختبار</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="خادم VPN (مثال: us.vpn.com)"
            value={vpnTest.server}
            onChange={(e) => setVpnTest(prev => ({ ...prev, server: e.target.value }))}
            className="bg-white/10 border-white/20 text-white"
            dir="rtl"
          />
          <Input
            placeholder="المنفذ (مثال: 1194)"
            value={vpnTest.port}
            onChange={(e) => setVpnTest(prev => ({ ...prev, port: e.target.value }))}
            className="bg-white/10 border-white/20 text-white"
          />
          <select
            value={vpnTest.protocol}
            onChange={(e) => setVpnTest(prev => ({ ...prev, protocol: e.target.value }))}
            className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
          >
            <option value="OpenVPN">OpenVPN</option>
            <option value="IKEv2">IKEv2</option>
            <option value="WireGuard">WireGuard</option>
            <option value="L2TP">L2TP</option>
            <option value="PPTP">PPTP</option>
          </select>
          <Button 
            onClick={testVPN}
            disabled={vpnTest.testing}
            className="bg-primary-600 hover:bg-primary-700"
          >
            {vpnTest.testing ? 'جاري الفحص...' : 'اختبار VPN'}
          </Button>
        </div>
        
        {vpnTest.testing && (
          <div className="mt-4 space-y-2">
            <Progress value={60} className="h-2" />
            <p className="text-sm text-gray-400">جاري اختبار الاتصال والأمان...</p>
          </div>
        )}
      </Card>

      {/* VPN Status */}
      {vpnTest.results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-dark border-white/20 p-6">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${vpnTest.results.connected ? 'from-green-500 to-emerald-500' : 'from-red-500 to-pink-500'} flex items-center justify-center`}>
                {vpnTest.results.connected ? <CheckCircle className="w-6 h-6 text-white" /> : <AlertTriangle className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h3 className="text-white font-semibold">حالة الاتصال</h3>
                <p className={`text-sm ${vpnTest.results.connected ? 'text-green-400' : 'text-red-400'}`}>
                  {vpnTest.results.connected ? 'متصل' : 'غير متصل'}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 text-sm">IP الحقيقي</p>
                <p className="text-white font-mono">{vpnTest.results.realIP}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">IP عبر VPN</p>
                <p className="text-green-400 font-mono">{vpnTest.results.vpnIP}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">موقع الخادم</p>
                <p className="text-white">{vpnTest.results.serverLocation}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-dark border-white/20 p-6">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">اختبار السرعة</h3>
                <p className="text-gray-400 text-sm">عبر VPN</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">التحميل</span>
                  <span className="text-green-400 font-bold">{vpnTest.results.speed.download} Mbps</span>
                </div>
                <Progress value={(vpnTest.results.speed.download / 100) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">الرفع</span>
                  <span className="text-blue-400 font-bold">{vpnTest.results.speed.upload} Mbps</span>
                </div>
                <Progress value={(vpnTest.results.speed.upload / 50) * 100} className="h-2" />
              </div>
              <div className="text-center">
                <p className="text-yellow-400 text-lg font-bold">{vpnTest.results.speed.latency}ms</p>
                <p className="text-gray-400 text-xs">زمن الاستجابة</p>
              </div>
            </div>
          </Card>

          <Card className="glass-dark border-white/20 p-6">
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">مستوى الأمان</h3>
                <p className="text-gray-400 text-sm">{getSecurityScore()}% آمن</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">تسرب DNS</span>
                <span className={`text-sm ${vpnTest.results.security.dnsLeak ? 'text-red-400' : 'text-green-400'}`}>
                  {vpnTest.results.security.dnsLeak ? 'مكتشف' : 'آمن'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">تسرب IP</span>
                <span className={`text-sm ${vpnTest.results.security.ipLeak ? 'text-red-400' : 'text-green-400'}`}>
                  {vpnTest.results.security.ipLeak ? 'مكتشف' : 'آمن'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">تسرب WebRTC</span>
                <span className={`text-sm ${vpnTest.results.security.webrtcLeak ? 'text-red-400' : 'text-green-400'}`}>
                  {vpnTest.results.security.webrtcLeak ? 'مكتشف' : 'آمن'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Kill Switch</span>
                <span className={`text-sm ${vpnTest.results.killSwitch ? 'text-green-400' : 'text-red-400'}`}>
                  {vpnTest.results.killSwitch ? 'مفعل' : 'غير مفعل'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* VPN Recommendations */}
      <Card className="glass-dark border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">خدمات VPN الموصى بها</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'ExpressVPN', rating: 9.5, features: ['سرعة عالية', 'أمان قوي', 'خوادم متعددة'] },
            { name: 'NordVPN', rating: 9.2, features: ['سياسة عدم التسجيل', 'حماية مزدوجة', 'اسعار مناسبة'] },
            { name: 'Surfshark', rating: 8.8, features: ['أجهزة غير محدودة', 'سعر رخيص', 'Kill Switch'] },
            { name: 'CyberGhost', rating: 8.5, features: ['سهل الاستخدام', 'خوادم للتورنت', 'ضمان الاسترداد'] },
            { name: 'Private Internet Access', rating: 8.3, features: ['مفتوح المصدر', 'WireGuard', 'خصوصية عالية'] },
            { name: 'ProtonVPN', rating: 8.1, features: ['خدمة مجانية', 'من سويسرا', 'Secure Core'] }
          ].map((vpn, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-white font-medium">{vpn.name}</h4>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400 font-bold">{vpn.rating}</span>
                  <span className="text-yellow-400">⭐</span>
                </div>
              </div>
              <div className="space-y-1">
                {vpn.features.map((feature, idx) => (
                  <p key={idx} className="text-gray-400 text-xs">• {feature}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VPNTools;

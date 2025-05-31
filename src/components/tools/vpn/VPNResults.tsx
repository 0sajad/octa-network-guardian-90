
import React from 'react';
import { CheckCircle, AlertTriangle, Zap, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface VPNResultsProps {
  results: any;
}

const VPNResults: React.FC<VPNResultsProps> = ({ results }) => {
  if (!results) return null;

  const getSecurityScore = () => {
    let score = 100;
    if (results.security.dnsLeak) score -= 30;
    if (results.security.ipLeak) score -= 40;
    if (results.security.webrtcLeak) score -= 20;
    if (!results.killSwitch) score -= 10;
    return Math.max(score, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Connection Status Card */}
        <Card className="glass-dark border-white/20 p-6">
          <div className="flex items-center space-x-reverse space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${results.connected ? 'from-green-500 to-emerald-500' : 'from-red-500 to-pink-500'} flex items-center justify-center`}>
              {results.connected ? <CheckCircle className="w-6 h-6 text-white" /> : <AlertTriangle className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h3 className="text-white font-semibold">حالة الاتصال</h3>
              <p className={`text-sm ${results.connected ? 'text-green-400' : 'text-red-400'}`}>
                {results.connected ? 'متصل' : 'غير متصل'}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-300 text-sm">IP الحقيقي</p>
              <p className="text-white font-mono">{results.realIP}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">IP عبر VPN</p>
              <p className="text-green-400 font-mono">{results.vpnIP}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">موقع الخادم</p>
              <p className="text-white">{results.serverLocation}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">التشفير</p>
              <p className="text-white">{results.encryptionLevel}</p>
            </div>
          </div>
        </Card>

        {/* Speed Test Card */}
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
                <span className="text-green-400 font-bold">{results.speed.download} Mbps</span>
              </div>
              <Progress value={(results.speed.download / 100) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">الرفع</span>
                <span className="text-blue-400 font-bold">{results.speed.upload} Mbps</span>
              </div>
              <Progress value={(results.speed.upload / 50) * 100} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-yellow-400 text-lg font-bold">{results.speed.latency}ms</p>
              <p className="text-gray-400 text-xs">زمن الاستجابة</p>
            </div>
          </div>
        </Card>

        {/* Security Card */}
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
              <span className={`text-sm ${results.security.dnsLeak ? 'text-red-400' : 'text-green-400'}`}>
                {results.security.dnsLeak ? 'مكتشف' : 'آمن'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">تسرب IP</span>
              <span className={`text-sm ${results.security.ipLeak ? 'text-red-400' : 'text-green-400'}`}>
                {results.security.ipLeak ? 'مكتشف' : 'آمن'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">تسرب WebRTC</span>
              <span className={`text-sm ${results.security.webrtcLeak ? 'text-red-400' : 'text-green-400'}`}>
                {results.security.webrtcLeak ? 'مكتشف' : 'آمن'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Kill Switch</span>
              <span className={`text-sm ${results.killSwitch ? 'text-green-400' : 'text-red-400'}`}>
                {results.killSwitch ? 'مفعل' : 'غير مفعل'}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-dark border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">تقييم شامل</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">التقييم العام</span>
              <span className="text-yellow-400 font-bold">{results.rating}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">دعم التورنت</span>
              <span className={results.torrentSupport ? 'text-green-400' : 'text-red-400'}>
                {results.torrentSupport ? 'مدعوم' : 'غير مدعوم'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">دعم البث</span>
              <span className={results.streamingSupport ? 'text-green-400' : 'text-red-400'}>
                {results.streamingSupport ? 'مدعوم' : 'غير مدعوم'}
              </span>
            </div>
            <div>
              <span className="text-gray-300">السعر</span>
              <p className="text-white mt-1">{results.pricing}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-dark border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">المميزات</h3>
          <div className="space-y-2">
            {results.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass-dark border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">التوصية النهائية</h3>
        <p className="text-gray-300">{results.recommendation}</p>
      </Card>
    </div>
  );
};

export default VPNResults;

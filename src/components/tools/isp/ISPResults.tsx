
import React from 'react';
import { BarChart3, MapPin, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ISPResultsProps {
  results: any;
}

const ISPResults: React.FC<ISPResultsProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Speed Test Card */}
        <Card className="glass-dark border-white/20 p-6">
          <div className="flex items-center space-x-reverse space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">اختبار السرعة</h3>
              <p className="text-gray-400 text-sm">{results.providerName}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">التحميل</span>
                <span className="text-green-400 font-bold">{results.downloadSpeed} Mbps</span>
              </div>
              <Progress value={(results.downloadSpeed / 100) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">الرفع</span>
                <span className="text-blue-400 font-bold">{results.uploadSpeed} Mbps</span>
              </div>
              <Progress value={(results.uploadSpeed / 50) * 100} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-yellow-400 text-lg font-bold">{results.latency}ms</p>
                <p className="text-gray-400 text-xs">زمن الاستجابة</p>
              </div>
              <div className="text-center">
                <p className="text-purple-400 text-lg font-bold">{results.packetLoss}%</p>
                <p className="text-gray-400 text-xs">فقدان الحزم</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Location Info Card */}
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
              <p className="text-white font-mono">{results.ipInfo.ip}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">الموقع</p>
              <p className="text-white">{results.location}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">المؤسسة</p>
              <p className="text-white">{results.ipInfo.organization}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">الأسعار</p>
              <p className="text-white">{results.pricing}</p>
            </div>
          </div>
        </Card>

        {/* Service Quality Card */}
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
                <span className="text-green-400 font-bold">{results.coverage}%</span>
              </div>
              <Progress value={results.coverage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">الاستقرار</span>
                <span className="text-blue-400 font-bold">{results.reliability}%</span>
              </div>
              <Progress value={results.reliability} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">رضا العملاء</span>
                <span className="text-purple-400 font-bold">{results.customerSatisfaction}%</span>
              </div>
              <Progress value={results.customerSatisfaction} className="h-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-dark border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">نقاط القوة</h3>
          <div className="space-y-2">
            {results.strengths.map((strength: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">{strength}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-dark border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">نقاط الضعف</h3>
          <div className="space-y-2">
            {results.weaknesses.map((weakness: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                <span className="text-gray-300">{weakness}</span>
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

export default ISPResults;

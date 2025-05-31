
import React from 'react';
import { Card } from '@/components/ui/card';

interface VPNRecommendationsProps {
  onSelectVPN: (vpnName: string) => void;
}

const VPNRecommendations: React.FC<VPNRecommendationsProps> = ({ onSelectVPN }) => {
  const vpns = [
    { name: 'ExpressVPN', rating: 9.5, features: ['سرعة عالية', 'أمان قوي', 'خوادم متعددة'] },
    { name: 'NordVPN', rating: 9.2, features: ['سياسة عدم التسجيل', 'حماية مزدوجة', 'اسعار مناسبة'] },
    { name: 'Surfshark', rating: 8.8, features: ['أجهزة غير محدودة', 'سعر رخيص', 'Kill Switch'] },
    { name: 'CyberGhost', rating: 8.5, features: ['سهل الاستخدام', 'خوادم للتورنت', 'ضمان الاسترداد'] },
    { name: 'Private Internet Access', rating: 8.3, features: ['مفتوح المصدر', 'WireGuard', 'خصوصية عالية'] },
    { name: 'ProtonVPN', rating: 8.1, features: ['خدمة مجانية', 'من سويسرا', 'Secure Core'] }
  ];

  return (
    <Card className="glass-dark border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">خدمات VPN الموصى بها</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vpns.map((vpn, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => onSelectVPN(vpn.name)}
          >
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
  );
};

export default VPNRecommendations;

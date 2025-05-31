
import React from 'react';
import { Card } from '@/components/ui/card';

interface PopularISPsProps {
  onSelectISP: (ispName: string) => void;
}

const PopularISPs: React.FC<PopularISPsProps> = ({ onSelectISP }) => {
  const isps = [
    { name: 'زين العراق', logo: '🟦', type: 'موبايل + إنترنت' },
    { name: 'آسياسيل', logo: '🟨', type: 'موبايل + إنترنت' },
    { name: 'كورك تيليكوم', logo: '🟩', type: 'إنترنت ثابت' },
    { name: 'ايرث لينك', logo: '🟪', type: 'إنترنت ثابت' },
    { name: 'نيو لاين', logo: '🟧', type: 'إنترنت ثابت' },
    { name: 'سريع نت', logo: '🟫', type: 'إنترنت ثابت' },
    { name: 'تراس', logo: '⬜', type: 'إنترنت ثابت' },
    { name: 'اكسترا نت', logo: '⬛', type: 'إنترنت ثابت' }
  ];

  return (
    <Card className="glass-dark border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">شركات الاتصالات الشائعة في العراق</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isps.map((isp, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => onSelectISP(isp.name)}
          >
            <div className="text-2xl mb-2">{isp.logo}</div>
            <h4 className="text-white font-medium text-sm">{isp.name}</h4>
            <p className="text-gray-400 text-xs">{isp.type}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PopularISPs;

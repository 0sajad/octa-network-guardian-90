
import React from 'react';
import { Activity, Shield, Network, Zap, Users, Server } from 'lucide-react';
import { SystemStats } from '@/types/dashboard';

interface StatsCardsProps {
  stats: SystemStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'استخدام المعالج',
      value: `${stats.cpu}%`,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      status: stats.cpu > 80 ? 'critical' : stats.cpu > 60 ? 'warning' : 'normal'
    },
    {
      title: 'استخدام الذاكرة',
      value: `${stats.memory}%`,
      icon: Server,
      color: 'from-purple-500 to-pink-500',
      status: stats.memory > 85 ? 'critical' : stats.memory > 70 ? 'warning' : 'normal'
    },
    {
      title: 'مساحة القرص',
      value: `${stats.disk}%`,
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      status: stats.disk > 90 ? 'critical' : stats.disk > 75 ? 'warning' : 'normal'
    },
    {
      title: 'سرعة الشبكة',
      value: `${stats.network} Mbps`,
      icon: Network,
      color: 'from-orange-500 to-red-500',
      status: stats.network < 50 ? 'warning' : 'normal'
    },
    {
      title: 'الاتصالات النشطة',
      value: stats.connections.toString(),
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      status: 'normal'
    },
    {
      title: 'مدة التشغيل',
      value: stats.uptime,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      status: 'normal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-green-500/50 bg-green-500/10';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`glass-dark rounded-xl p-6 border ${getStatusColor(card.status)} hover-lift transition-all duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`w-3 h-3 rounded-full ${
                card.status === 'critical' ? 'bg-red-500 animate-pulse' :
                card.status === 'warning' ? 'bg-yellow-500 animate-pulse' :
                'bg-green-500'
              }`} />
            </div>
            
            <h3 className="text-gray-300 text-sm font-medium mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-1 rounded-full ${
                card.status === 'critical' ? 'bg-red-500/20 text-red-300' :
                card.status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {card.status === 'critical' ? 'حرج' :
                 card.status === 'warning' ? 'تحذير' :
                 'طبيعي'}
              </span>
              <span className="text-gray-400">تحديث مباشر</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;

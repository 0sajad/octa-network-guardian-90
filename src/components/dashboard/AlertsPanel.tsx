
import React from 'react';
import { AlertTriangle, Info, CheckCircle, X, Clock } from 'lucide-react';
import { Alert } from '@/types/dashboard';
import { Button } from '@/components/ui/button';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getAlertBorderColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'border-r-red-500';
      case 'warning':
        return 'border-r-yellow-500';
      case 'success':
        return 'border-r-green-500';
      default:
        return 'border-r-blue-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `منذ ${diffDays} يوم`;
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-reverse space-x-3">
          <h3 className="text-lg font-semibold text-white">التنبيهات النشطة</h3>
          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            {alerts.filter(alert => !alert.isRead).length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          عرض الكل
        </Button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-400">لا توجد تنبيهات جديدة</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white/5 rounded-lg p-4 border-r-4 ${getAlertBorderColor(alert.type)} ${
                !alert.isRead ? 'bg-white/10' : ''
              } transition-all duration-200 hover:bg-white/10`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-reverse space-x-3 flex-1">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{alert.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-reverse space-x-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            تمييز الكل كمقروء
          </Button>
          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
            مسح التنبيهات
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;

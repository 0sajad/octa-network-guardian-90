
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartData } from '@/types/dashboard';

interface NetworkChartProps {
  data: ChartData[];
  title: string;
  color: string;
}

const NetworkChart: React.FC<NetworkChartProps> = ({ data, title, color }) => {
  const formatTooltipValue = (value: number) => {
    if (title.includes('Mbps')) {
      return `${value.toFixed(1)} Mbps`;
    } else if (title.includes('%')) {
      return `${value.toFixed(1)}%`;
    }
    return value.toFixed(1);
  };

  const calculateAverage = () => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    return (sum / data.length).toFixed(1);
  };

  const getCurrentValue = () => {
    return data.length > 0 ? data[data.length - 1].value.toFixed(1) : '0';
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-white/20 hover-lift">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <div className="flex items-center space-x-reverse space-x-3">
            <span className="text-2xl font-bold text-white font-mono">
              {formatTooltipValue(parseFloat(getCurrentValue()))}
            </span>
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">مباشر</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="timestamp" 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              formatter={(value: number) => [formatTooltipValue(value), 'القيمة']}
              labelFormatter={(label) => `الوقت: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${color.replace('#', '')})`}
              dot={false}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-gray-400">
          آخر تحديث: {new Date().toLocaleTimeString('ar')}
        </span>
        <span className="text-gray-400">
          المتوسط: {formatTooltipValue(parseFloat(calculateAverage()))}
        </span>
      </div>
    </div>
  );
};

export default NetworkChart;

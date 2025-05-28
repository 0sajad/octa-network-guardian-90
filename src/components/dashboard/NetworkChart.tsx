
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartData } from '@/types/dashboard';

interface NetworkChartProps {
  data: ChartData[];
  title: string;
  color: string;
}

const NetworkChart: React.FC<NetworkChartProps> = ({ data, title, color }) => {
  return (
    <div className="glass-dark rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex space-x-reverse space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400">مباشر</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="timestamp" 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${color})`}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>آخر تحديث: {new Date().toLocaleTimeString('ar')}</span>
        <span>المعدل: {(data.reduce((sum, item) => sum + item.value, 0) / data.length).toFixed(1)}</span>
      </div>
    </div>
  );
};

export default NetworkChart;


import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NetworkChart = () => {
  // Generate realistic network performance data
  const generateRealisticData = () => {
    const data = [];
    const baseLatency = 45;
    const baseThroughput = 850;
    
    for (let i = 0; i < 24; i++) {
      const time = `${i.toString().padStart(2, '0')}:00`;
      const latencyVariation = Math.random() * 20 - 10;
      const throughputVariation = Math.random() * 200 - 100;
      
      data.push({
        time,
        latency: Math.max(5, baseLatency + latencyVariation),
        throughput: Math.max(100, baseThroughput + throughputVariation),
        errors: Math.floor(Math.random() * 5)
      });
    }
    return data;
  };

  const data = generateRealisticData();

  const formatTooltipValue = (value: number | string | Array<number | string>, name: string) => {
    if (typeof value === 'number') {
      if (name === 'latency') return [`${value.toFixed(1)} ms`, 'زمن الاستجابة'];
      if (name === 'throughput') return [`${value.toFixed(0)} Mbps`, 'سرعة النقل'];
      if (name === 'errors') return [`${value}`, 'الأخطاء'];
    }
    return [String(value), name];
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4 text-right">أداء الشبكة</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 58, 138, 0.9)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={formatTooltipValue}
              labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="latency" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="زمن الاستجابة (ms)"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="throughput" 
              stroke="#10b981" 
              strokeWidth={2}
              name="سرعة النقل (Mbps)"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="errors" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="الأخطاء"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetworkChart;

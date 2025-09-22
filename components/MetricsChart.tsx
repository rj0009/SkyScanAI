
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface MetricsChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#2F81F7', '#3FB950', '#F7B731', '#D83A56'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-primary border border-brand-border p-2 rounded-md shadow-lg">
        <p className="label text-brand-text-primary">{`${label} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};


const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#8B949E', fontSize: 12 }}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
          <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;

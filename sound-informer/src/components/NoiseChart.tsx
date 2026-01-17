import type { NoiseReading } from '@/types';
import { getNoiseColor } from '@/types';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface NoiseChartProps {
  readings: NoiseReading[];
}

export function NoiseChart({ readings }: NoiseChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={readings} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis 
          dataKey="hour" 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value}h`}
        />
        <YAxis 
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          label={{ value: 'dB', angle: -90, position: 'insideLeft' }}
        />
        <Bar dataKey="level" radius={[4, 4, 0, 0]}>
          {readings.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getNoiseColor(entry.level)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

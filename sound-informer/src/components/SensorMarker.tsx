import type { Sensor } from '@/types';
import { getNoiseColor } from '@/types';
import { useState } from 'react';

interface SensorMarkerProps {
  sensor: Sensor;
  onClick: (sensor: Sensor) => void;
}

export function SensorMarker({ sensor, onClick }: SensorMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const color = getNoiseColor(sensor.currentLevel);

  return (
    <div
      className="si-cursor-pointer si-transition-transform si-duration-200"
      style={{
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(sensor)}
    >
      <div
        className="si-rounded-full si-border-2 si-border-white si-shadow-lg"
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: color,
        }}
      />
    </div>
  );
}

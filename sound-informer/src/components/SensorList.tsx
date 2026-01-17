import { getNoiseColor, type Sensor } from '@/types';

import { getTranslations, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface SensorListProps {
  sensors: Sensor[];
  selectedSensor: Sensor | null;
  locale: Locale;
  onSensorClick: (sensor: Sensor) => void;
}

export function SensorList({ sensors, selectedSensor, locale, onSensorClick }: SensorListProps) {
  const t = getTranslations(locale);

  const groupedSensors = {
    paris: sensors.filter((s) => s.id.startsWith('paris-')),
    barcelona: sensors.filter((s) => s.id.startsWith('barcelona-')),
    dahab: sensors.filter((s) => s.id.startsWith('dahab-')),
  };

  const renderSensorItem = (sensor: Sensor) => {
    const isSelected = selectedSensor?.id === sensor.id;
    const noiseColor = getNoiseColor(sensor.currentLevel);

    return (
      <div
        key={sensor.id}
        onClick={() => onSensorClick(sensor)}
        className={cn(
          'si-flex si-items-center si-p-3 si-cursor-pointer si-transition-colors si-border-b si-border-gray-100 last:si-border-0 hover:si-bg-gray-50',
          isSelected && 'si-bg-blue-50 hover:si-bg-blue-50'
        )}
      >
        <div
          className="si-w-3 si-h-3 si-rounded-full si-mr-3 si-flex-shrink-0"
          style={{ backgroundColor: noiseColor }}
        />
        <div className="si-flex-grow si-min-w-0">
          <div className="si-text-sm si-font-medium si-truncate si-text-gray-900">
            {sensor.name}
          </div>
          <div className="si-text-xs si-text-gray-500 si-flex si-justify-between si-mt-0.5">
            <span>ID: {sensor.id}</span>
            <span className="si-font-semibold">{sensor.currentLevel} {t.db}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderGroup = (title: string, sensorsInGroup: Sensor[]) => {
    if (sensorsInGroup.length === 0) return null;
    
    return (
      <div className="si-mb-4 last:si-mb-0">
        <h3 className="si-px-3 si-py-2 si-text-xs si-font-bold si-text-gray-400 si-uppercase si-tracking-wider">
          {title}
        </h3>
        <div className="si-bg-white si-rounded-md si-overflow-hidden">
          {sensorsInGroup.map(renderSensorItem)}
        </div>
      </div>
    );
  };

  return (
    <div className="si-sensor-list si-flex si-flex-col si-h-full si-bg-gray-50 si-border-r si-border-gray-200 si-w-[280px] si-flex-shrink-0">
      <div className="si-p-4 si-border-b si-bg-white">
        <h2 className="si-text-lg si-font-bold si-text-gray-900">{t.sensorList}</h2>
      </div>
      <div className="si-flex-grow si-overflow-y-auto si-p-2">
        {renderGroup('Paris', groupedSensors.paris)}
        {renderGroup('Barcelona', groupedSensors.barcelona)}
        {renderGroup('Dahab', groupedSensors.dahab)}
      </div>
    </div>
  );
}

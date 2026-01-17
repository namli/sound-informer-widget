import { useState } from 'react';
import { MapView } from './MapView';
import { mockSensors } from '@/data/mockSensors';
import type { Sensor, SoundInformerConfig } from '@/types';
import { DEFAULT_CENTER, DEFAULT_ZOOM, getDefaultLocale } from '@/types';
import type { Locale } from '@/lib/i18n';

interface SoundInformerWidgetProps {
  config: SoundInformerConfig;
}

export function SoundInformerWidget({ config }: SoundInformerWidgetProps) {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  
  const center = config.center || DEFAULT_CENTER;
  const zoom = config.zoom || DEFAULT_ZOOM;
  const locale = (config.locale || getDefaultLocale()) as Locale;

  const handleMarkerClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const handleClosePopup = () => {
    setSelectedSensor(null);
  };

  return (
    <div className="si-widget-container">
      <MapView
        mapboxToken={config.mapboxToken}
        center={center}
        zoom={zoom}
        sensors={mockSensors}
        selectedSensor={selectedSensor}
        locale={locale}
        onMarkerClick={handleMarkerClick}
        onClosePopup={handleClosePopup}
      />
    </div>
  );
}

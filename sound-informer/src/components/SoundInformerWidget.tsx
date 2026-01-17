import { mockSensors } from '@/data/mockSensors';
import type { Locale } from '@/lib/i18n';
import type { Sensor, SoundInformerConfig } from '@/types';
import { DEFAULT_CENTER, DEFAULT_ZOOM, getDefaultLocale } from '@/types';
import { useState } from 'react';
import { MapView } from './MapView';
import { SensorList } from './SensorList';

interface SoundInformerWidgetProps {
  config: SoundInformerConfig;
}

export function SoundInformerWidget({ config }: SoundInformerWidgetProps) {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  
  const center = config.center || DEFAULT_CENTER;
  const zoom = config.zoom || DEFAULT_ZOOM;
  const locale = (config.locale || getDefaultLocale()) as Locale;

  const [viewState, setViewState] = useState({
    longitude: center[0],
    latitude: center[1],
    zoom: zoom,
  });

  const handleMarkerClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const handleSensorClick = (sensor: Sensor) => {
    setViewState({
      longitude: sensor.coordinates[0],
      latitude: sensor.coordinates[1],
      zoom: DEFAULT_ZOOM,
    });
    setSelectedSensor(sensor);
  };

  const handleClosePopup = () => {
    setSelectedSensor(null);
  };

  return (
    <div className="si-widget-container si-flex si-flex-row si-p-0 si-overflow-hidden">
      <SensorList
        sensors={mockSensors}
        selectedSensor={selectedSensor}
        locale={locale}
        onSensorClick={handleSensorClick}
      />
      <div className="si-flex-grow si-relative">
        <MapView
          mapboxToken={config.mapboxToken}
          viewState={viewState}
          onViewStateChange={setViewState}
          sensors={mockSensors}
          selectedSensor={selectedSensor}
          locale={locale}
          onMarkerClick={handleMarkerClick}
          onClosePopup={handleClosePopup}
        />
      </div>
    </div>
  );
}

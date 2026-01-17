import { generateMockReadings } from '@/data/mockSensors';
import type { Locale } from '@/lib/i18n';
import type { Sensor } from '@/types';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { NoisePopup } from './NoisePopup';
import { SensorMarker } from './SensorMarker';

interface MapViewProps {
  mapboxToken: string;
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  onViewStateChange: (viewState: any) => void;
  sensors: Sensor[];
  selectedSensor: Sensor | null;
  locale: Locale;
  onMarkerClick: (sensor: Sensor) => void;
  onClosePopup: () => void;
}

export function MapView({
  mapboxToken,
  viewState,
  onViewStateChange,
  sensors,
  selectedSensor,
  locale,
  onMarkerClick,
  onClosePopup,
}: MapViewProps) {
  const readings = useMemo(() => {
    if (selectedSensor) {
      return generateMockReadings(selectedSensor.id);
    }
    return [];
  }, [selectedSensor]);

  const handleMarkerClick = (sensor: Sensor) => {
    onMarkerClick(sensor);
  };

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      {...viewState}
      onMove={(evt) => onViewStateChange(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {sensors.map((sensor) => (
        <Marker
          key={sensor.id}
          longitude={sensor.coordinates[0]}
          latitude={sensor.coordinates[1]}
          anchor="center"
        >
          <SensorMarker sensor={sensor} onClick={handleMarkerClick} />
        </Marker>
      ))}

      {selectedSensor && (
        <Popup
          longitude={selectedSensor.coordinates[0]}
          latitude={selectedSensor.coordinates[1]}
          anchor="bottom"
          closeButton={false}
          closeOnClick={false}
        >
          <NoisePopup
            sensor={selectedSensor}
            readings={readings}
            locale={locale}
            onClose={onClosePopup}
          />
        </Popup>
      )}
    </Map>
  );
}

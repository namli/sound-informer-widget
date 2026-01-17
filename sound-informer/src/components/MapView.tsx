import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SensorMarker } from './SensorMarker';
import { NoisePopup } from './NoisePopup';
import type { Sensor, NoiseReading } from '@/types';
import { generateMockReadings } from '@/data/mockSensors';
import type { Locale } from '@/lib/i18n';

interface MapViewProps {
  mapboxToken: string;
  center: [number, number];
  zoom: number;
  sensors: Sensor[];
  selectedSensor: Sensor | null;
  locale: Locale;
  onMarkerClick: (sensor: Sensor) => void;
  onClosePopup: () => void;
}

export function MapView({
  mapboxToken,
  center,
  zoom,
  sensors,
  selectedSensor,
  locale,
  onMarkerClick,
  onClosePopup,
}: MapViewProps) {
  const [readings, setReadings] = useState<NoiseReading[]>([]);

  useEffect(() => {
    if (selectedSensor) {
      const mockReadings = generateMockReadings(selectedSensor.id);
      setReadings(mockReadings);
    } else {
      setReadings([]);
    }
  }, [selectedSensor]);

  const handleMarkerClick = (sensor: Sensor) => {
    onMarkerClick(sensor);
  };

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: center[0],
        latitude: center[1],
        zoom: zoom,
      }}
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

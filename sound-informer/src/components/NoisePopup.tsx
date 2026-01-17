import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { NoiseChart } from './NoiseChart';
import type { Sensor, NoiseReading } from '@/types';
import { getTranslations, type Locale } from '@/lib/i18n';
import { X } from 'lucide-react';

interface NoisePopupProps {
  sensor: Sensor;
  readings: NoiseReading[];
  locale: Locale;
  onClose: () => void;
}

export function NoisePopup({ sensor, readings, locale, onClose }: NoisePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const t = getTranslations(locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="si-w-80 si-animate-in si-fade-in-0 si-zoom-in-95"
    >
      <Card className="si-shadow-lg">
        <CardHeader className="si-pb-3">
          <div className="si-flex si-items-start si-justify-between">
            <div>
              <CardTitle className="si-text-lg">{sensor.name}</CardTitle>
              <p className="si-text-xs si-text-gray-500 si-mt-1">
                {t.sensor}: {sensor.id}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="si-h-6 si-w-6 si-rounded-full"
            >
              <X className="si-h-4 si-w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="si-mb-4">
            <p className="si-text-sm si-text-gray-600 si-mb-2">
              {t.noiseLevel}: <span className="si-font-semibold">{sensor.currentLevel} {t.db}</span>
            </p>
          </div>
          <NoiseChart readings={readings} />
        </CardContent>
      </Card>
    </div>
  );
}

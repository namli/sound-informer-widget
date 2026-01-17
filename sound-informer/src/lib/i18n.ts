/**
 * Локализация интерфейса
 */

export type Locale = 'en' | 'fr' | 'es' | 'ru';

export interface Translations {
  sensor: string;
  noiseLevel: string;
  sensorList: string;
  close: string;
  low: string;
  moderate: string;
  high: string;
  dangerous: string;
  db: string;
}

const translations: Record<Locale, Translations> = {
  en: {
    sensor: 'Sensor',
    noiseLevel: 'Noise Level',
    sensorList: 'Sensors',
    close: 'Close',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    dangerous: 'Dangerous',
    db: 'dB'
  },
  fr: {
    sensor: 'Capteur',
    noiseLevel: 'Niveau de bruit',
    sensorList: 'Capteurs',
    close: 'Fermer',
    low: 'Faible',
    moderate: 'Modéré',
    high: 'Élevé',
    dangerous: 'Dangereux',
    db: 'dB'
  },
  es: {
    sensor: 'Sensor',
    noiseLevel: 'Nivel de ruido',
    sensorList: 'Sensores',
    close: 'Cerrar',
    low: 'Bajo',
    moderate: 'Moderado',
    high: 'Alto',
    dangerous: 'Peligroso',
    db: 'dB'
  },
  ru: {
    sensor: 'Датчик',
    noiseLevel: 'Уровень шума',
    sensorList: 'Датчики',
    close: 'Закрыть',
    low: 'Низкий',
    moderate: 'Умеренный',
    high: 'Высокий',
    dangerous: 'Опасный',
    db: 'dB'
  }
};

/**
 * Получение переводов для локали
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
}

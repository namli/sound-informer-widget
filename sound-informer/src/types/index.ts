/**
 * Конфигурация виджета Sound Informer
 */
export interface SoundInformerConfig {
  /** CSS-селектор контейнера для виджета */
  container: string;
  
  /** 
   * Public Mapbox токен с URL restrictions
   * ВАЖНО: В настройках Mapbox укажите домены, где разрешено использование
   */
  mapboxToken: string;
  
  /** Начальный центр карты [longitude, latitude] (по умолчанию Париж) */
  center?: [number, number];
  
  /** Начальный уровень zoom (1-22) */
  zoom?: number;
  
  /** 
   * Высота виджета
   * - number: фиксированная высота в пикселях (например, 400)
   * - string: CSS значение ('50vh', '400px', '100%')
   * - 'auto': автоматический aspect-ratio 16:9 (адаптивный)
   * По умолчанию: 400 (пикселей)
   */
  height?: number | string | 'auto';
  
  /** 
   * Локализация интерфейса
   * По умолчанию определяется автоматически по navigator.language
   * Fallback: 'en'
   */
  locale?: 'en' | 'fr' | 'es' | 'ru';
}

/**
 * Данные датчика
 */
export interface Sensor {
  /** Уникальный идентификатор датчика */
  id: string;
  
  /** Название/описание местоположения */
  name: string;
  
  /** Координаты [longitude, latitude] */
  coordinates: [number, number];
  
  /** Текущий уровень шума (дБ) */
  currentLevel: number;
  
  /** Статус датчика */
  status: 'active' | 'inactive' | 'maintenance';
}

/**
 * Данные измерения уровня шума
 */
export interface NoiseReading {
  /** Временная метка измерения */
  timestamp: string;
  
  /** Уровень шума (дБ) */
  level: number;
  
  /** Час измерения (0-23) для отображения на графике */
  hour: number;
}

/**
 * Данные датчика с измерениями
 */
export interface SensorData {
  /** ID датчика */
  sensorId: string;
  
  /** Массив измерений за 24 часа */
  readings: NoiseReading[];
}

/**
 * Уровень шума
 */
export type NoiseLevel = 'low' | 'moderate' | 'high' | 'dangerous';

/**
 * Пороги уровней шума
 */
export const NOISE_THRESHOLDS = {
  low: { max: 50, color: '#22c55e', label: 'Низкий' },        // green
  moderate: { max: 70, color: '#eab308', label: 'Умеренный' }, // yellow
  high: { max: 85, color: '#f97316', label: 'Высокий' },      // orange
  dangerous: { max: Infinity, color: '#ef4444', label: 'Опасный' } // red
} as const;

/**
 * Определение уровня шума по значению
 */
export function getNoiseLevel(level: number): NoiseLevel {
  if (level <= NOISE_THRESHOLDS.low.max) return 'low';
  if (level <= NOISE_THRESHOLDS.moderate.max) return 'moderate';
  if (level <= NOISE_THRESHOLDS.high.max) return 'high';
  return 'dangerous';
}

/**
 * Получение цвета для уровня шума
 */
export function getNoiseColor(level: number): string {
  return NOISE_THRESHOLDS[getNoiseLevel(level)].color;
}

/**
 * Центр карты по умолчанию (Париж)
 */
export const DEFAULT_CENTER: [number, number] = [2.3522, 48.8566];

/**
 * Уровень zoom по умолчанию
 */
export const DEFAULT_ZOOM = 5;

/**
 * Определение локали по умолчанию
 */
export function getDefaultLocale(): string {
  const browserLang = navigator.language.split('-')[0];
  const supportedLocales = ['en', 'fr', 'es', 'ru'];
  return supportedLocales.includes(browserLang) ? browserLang : 'en';
}

/**
 * Разрешение размеров виджета
 */
export function resolveWidgetDimensions(container: HTMLElement, config: SoundInformerConfig) {
  // Ширина всегда 100% от контейнера
  const width = '100%';
  
  let height: string;
  
  if (config.height === 'auto') {
    // Используем aspect-ratio 16:9
    height = 'auto';
    container.style.aspectRatio = '16 / 9';
  } else if (typeof config.height === 'number') {
    height = `${config.height}px`;
  } else if (typeof config.height === 'string') {
    height = config.height;
  } else {
    // Default: 400px если ничего не указано
    height = '400px';
  }
  
  return { width, height };
}

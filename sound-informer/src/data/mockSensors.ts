import type { NoiseReading, Sensor } from '@/types';

/**
 * Фейковые данные датчиков
 */
export const mockSensors: Sensor[] = [
  // === ПАРИЖ (Paris) ===
  {
    id: 'paris-001',
    name: 'Champs-Élysées',
    coordinates: [2.3078, 48.8698],
    currentLevel: 75,
    status: 'active'
  },
  {
    id: 'paris-002',
    name: 'Tour Eiffel',
    coordinates: [2.2945, 48.8584],
    currentLevel: 68,
    status: 'active'
  },
  {
    id: 'paris-003',
    name: 'Gare du Nord',
    coordinates: [2.3553, 48.8809],
    currentLevel: 82,
    status: 'active'
  },
  
  // === БАРСЕЛОНА (Barcelona) ===
  {
    id: 'barcelona-001',
    name: 'La Rambla',
    coordinates: [2.1734, 41.3818],
    currentLevel: 71,
    status: 'active'
  },
  {
    id: 'barcelona-002',
    name: 'Sagrada Família',
    coordinates: [2.1744, 41.4036],
    currentLevel: 65,
    status: 'active'
  },
  {
    id: 'barcelona-003',
    name: 'Port Olímpic',
    coordinates: [2.2008, 41.3856],
    currentLevel: 58,
    status: 'active'
  },
  
  // === ДАХАБ (Dahab, Egypt) ===
  {
    id: 'dahab-001',
    name: 'Lighthouse Beach',
    coordinates: [34.5186, 28.4925],
    currentLevel: 42,
    status: 'active'
  },
  {
    id: 'dahab-002',
    name: 'Masbat Bay',
    coordinates: [34.5133, 28.5009],
    currentLevel: 38,
    status: 'active'
  },
  {
    id: 'dahab-003',
    name: 'Blue Hole',
    coordinates: [34.5389, 28.5722],
    currentLevel: 35,
    status: 'active'
  }
];

/**
 * Генерация фейковых данных измерений для датчика
 */
export function generateMockReadings(sensorId: string): NoiseReading[] {
  const baseLevel = mockSensors.find(s => s.id === sensorId)?.currentLevel ?? 50;
  
  return Array.from({ length: 24 }, (_, hour) => ({
    timestamp: new Date(Date.now() - (23 - hour) * 60 * 60 * 1000).toISOString(),
    hour,
    level: Math.max(20, Math.min(100, baseLevel + Math.random() * 20 - 10)) // ±10 dB от базового, ограничено 20-100 dB
  }));
}

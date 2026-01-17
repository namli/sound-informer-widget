import { createRoot } from 'react-dom/client';
import { SoundInformerWidget } from './components/SoundInformerWidget';
import type { SoundInformerConfig } from './types';
import { resolveWidgetDimensions } from './types';
import './styles/index.css';

/**
 * Глобальный API виджета Sound Informer
 */
interface SoundInformerAPI {
  /** Инициализация виджета */
  init(config: SoundInformerConfig): void;
  
  /** Уничтожение виджета */
  destroy(): void;
  
  /** Версия виджета */
  version: string;
}

let root: ReturnType<typeof createRoot> | null = null;
let containerElement: HTMLElement | null = null;

const SoundInformer: SoundInformerAPI = {
  init(config: SoundInformerConfig) {
    // Валидация конфигурации
    if (!config.container) {
      throw new Error('SoundInformer: container is required');
    }
    if (!config.mapboxToken) {
      throw new Error('SoundInformer: mapboxToken is required');
    }

    // Поиск контейнера
    const container = document.querySelector(config.container) as HTMLElement;
    if (!container) {
      throw new Error(`SoundInformer: container "${config.container}" not found`);
    }

    // Разрешение размеров виджета
    const { width, height } = resolveWidgetDimensions(container, config);
    container.style.width = width;
    container.style.height = height;

    // Сохранение ссылок
    containerElement = container;

    // Создание React root и рендер виджета
    root = createRoot(container);
    root.render(<SoundInformerWidget config={config} />);
  },

  destroy() {
    if (root) {
      root.unmount();
      root = null;
    }
    if (containerElement) {
      containerElement.innerHTML = '';
      containerElement = null;
    }
  },

  version: '1.0.0',
};

// Экспорт в глобальный объект window
declare global {
  interface Window {
    SoundInformer: SoundInformerAPI;
  }
}

if (typeof window !== 'undefined') {
  window.SoundInformer = SoundInformer;
}

export default SoundInformer;

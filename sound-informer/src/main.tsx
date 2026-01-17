import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { SoundInformerWidget } from './components/SoundInformerWidget'
import { DEFAULT_CENTER, DEFAULT_ZOOM, getDefaultLocale } from './types'

// Для разработки: используем виджет напрямую
// В production используется widget.tsx для сборки
const config = {
  container: '#root',
  mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  center: DEFAULT_CENTER,
  zoom: DEFAULT_ZOOM,
  height: 'auto' as const,
  locale: getDefaultLocale() as 'en' | 'fr' | 'es' | 'ru',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ width: '100%', height: '100vh' }}>
      <SoundInformerWidget config={config} />
    </div>
  </StrictMode>,
)

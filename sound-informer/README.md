# Sound Informer Widget

Встраиваемый виджет для отображения интерактивной карты с точками расположения датчиков мониторинга шумового загрязнения.

## Описание

Sound Informer Widget — это React-компонент, который можно легко встроить на любой веб-сайт. Виджет отображает интерактивную карту Mapbox с маркерами датчиков, при клике на которые открывается popup с графиком уровня шума за последние 24 часа.

## Технологии

- **React** 19.x
- **TypeScript** 5.x
- **Vite** 7.x (library mode)
- **Tailwind CSS** 4.x
- **Mapbox GL** 3.x
- **react-map-gl** 7.x
- **Recharts** 2.x
- **shadcn/ui**

## Установка и разработка

### Требования

- Node.js (версия указана в `.nvmrc`)
- npm или yarn

### Установка зависимостей

```bash
nvm use
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Для работы в режиме разработки создайте файл `.env` с вашим Mapbox токеном:

```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

### Сборка виджета

```bash
npm run build
```

Результат сборки: `dist/sound-informer.js` (один файл в формате IIFE)

## Использование виджета

### Базовое использование

```html
<!DOCTYPE html>
<html>
<head>
  <title>Sound Informer Example</title>
</head>
<body>
  <!-- Контейнер для виджета -->
  <div id="sound-informer" style="width: 100%; height: 600px;"></div>
  
  <!-- Подключение виджета -->
  <script src="https://your-cdn.com/sound-informer.js"></script>
  <script>
    SoundInformer.init({
      container: '#sound-informer',
      mapboxToken: 'pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNleGFtcGxlIn0.example'
    });
  </script>
</body>
</html>
```

### Расширенная конфигурация

```javascript
SoundInformer.init({
  container: '#sound-informer',
  mapboxToken: 'pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNleGFtcGxlIn0.example',
  center: [2.3522, 48.8566], // Париж (по умолчанию)
  zoom: 5, // Для отображения всех точек
  height: 'auto', // Адаптивная высота (aspect-ratio 16:9)
  locale: 'ru' // Локализация (en, fr, es, ru)
});
```

### Параметры конфигурации

| Параметр | Тип | Описание | По умолчанию |
|----------|-----|----------|--------------|
| `container` | `string` | CSS-селектор контейнера | **обязательно** |
| `mapboxToken` | `string` | Public Mapbox токен | **обязательно** |
| `center` | `[number, number]` | Центр карты [longitude, latitude] | `[2.3522, 48.8566]` (Париж) |
| `zoom` | `number` | Уровень zoom (1-22) | `5` |
| `height` | `number \| string \| 'auto'` | Высота виджета | `400` (px) |
| `locale` | `'en' \| 'fr' \| 'es' \| 'ru'` | Локализация интерфейса | Автоопределение |

### Варианты высоты виджета

```javascript
// Фиксированная высота в пикселях
height: 600

// Высота в viewport units
height: '50vh'

// Адаптивная высота (aspect-ratio 16:9)
height: 'auto'
```

## Безопасность Mapbox токена

**Критически важно**: Mapbox токен передается в открытом виде в клиентском коде JavaScript.

### Требования:

1. **Используйте только Public token** (не Secret token)
2. **Настройте URL restrictions** в Mapbox Dashboard
3. **Ограничьте список разрешенных доменов**

### Настройка токена:

1. Перейдите в [Mapbox Account → Tokens](https://account.mapbox.com/access-tokens/)
2. Выберите ваш Public token
3. В разделе "URL restrictions" укажите домены:
   ```
   https://example.com/*
   https://*.example.com/*
   http://localhost:* (для разработки)
   ```

**Документация Mapbox**:
- [How to use Mapbox securely](https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/)
- [Public vs Secret tokens](https://docs.mapbox.com/accounts/guides/tokens/#public-tokens)
- [URL restrictions](https://docs.mapbox.com/accounts/guides/tokens/#url-restrictions)

## Структура проекта

```
sound-informer/
├── src/
│   ├── main.tsx                    # Entry point для разработки
│   ├── widget.tsx                  # Entry point для сборки виджета
│   ├── components/                 # React компоненты
│   │   ├── SoundInformerWidget.tsx
│   │   ├── MapView.tsx
│   │   ├── SensorMarker.tsx
│   │   ├── NoisePopup.tsx
│   │   └── NoiseChart.tsx
│   ├── ui/                         # shadcn компоненты
│   ├── data/                       # Mock данные
│   ├── types/                      # TypeScript типы
│   ├── lib/                        # Утилиты
│   └── styles/                     # Стили
├── dist/                           # Результат сборки
└── package.json
```

## API виджета

### Методы

#### `SoundInformer.init(config)`

Инициализирует виджет в указанном контейнере.

#### `SoundInformer.destroy()`

Уничтожает виджет и очищает контейнер.

#### `SoundInformer.version`

Версия виджета (строка).

## Локализация

Виджет поддерживает следующие языки:
- `en` — Английский
- `fr` — Французский
- `es` — Испанский
- `ru` — Русский

Локаль определяется автоматически по `navigator.language` или может быть указана в конфигурации.

## Данные

На текущий момент виджет использует фейковые данные (mock data) для демонстрации функциональности. Датчики расположены в трех городах:
- **Париж** (3 датчика)
- **Барселона** (3 датчика)
- **Дахаб** (3 датчика)

## Браузерная совместимость

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Лицензия

MIT

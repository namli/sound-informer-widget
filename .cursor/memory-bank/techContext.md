# Tech Context: Sound Informer Widget

## Technologies Used

### Основной стек
- **React** 19.x — UI фреймворк
- **TypeScript** 5.x — типизация
- **Vite** 7.x — сборка (library mode)
- **Tailwind CSS** 4.x — стилизация
- **shadcn/ui** latest — UI компоненты

### Библиотеки для карт и графиков
- **mapbox-gl** 3.x — рендеринг карты
- **react-map-gl** 7.x — React обёртка для Mapbox
- **recharts** 2.x — графики (совместим с shadcn)

### Дополнительные зависимости
- **clsx** — условные CSS классы
- **tailwind-merge** — объединение Tailwind классов

## Development Setup

### Требования
- Node.js (версия указана в `.nvmrc`)
- npm или yarn

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка виджета
```bash
npm run build
```
Результат сборки: `dist/sound-informer.js` (один файл в формате IIFE)

### Структура проекта
```
sound-informer/
├── src/
│   ├── main.tsx                    # Entry point для разработки
│   ├── widget.tsx                  # Entry point для сборки виджета
│   ├── components/                 # React компоненты
│   ├── ui/                         # shadcn компоненты
│   ├── data/                       # Mock данные
│   ├── types/                      # TypeScript типы
│   ├── lib/                        # Утилиты
│   └── styles/                     # Стили
├── public/                         # Статические файлы
├── index.html                      # HTML для разработки
├── vite.config.ts                  # Конфигурация Vite
├── tailwind.config.ts              # Конфигурация Tailwind
├── tsconfig.json                   # Конфигурация TypeScript
└── components.json                 # Конфигурация shadcn
```

## Technical Constraints

### Браузерная совместимость
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Требования к хост-сайту
- Поддержка ES6+ в браузере
- Доступ к интернету для загрузки тайлов карты Mapbox
- Поддержка CSS `aspect-ratio` (для `height: 'auto'`) — все современные браузеры

### Ограничения текущей версии
- Данные фейковые (mock), backend не реализован
- Нет real-time обновлений
- Нет истории измерений (только последние 24 часа)
- Нет фильтрации/поиска датчиков

### Безопасность Mapbox токена
**Критически важно**: Mapbox токен передается в открытом виде в клиентском коде JavaScript.

**Требования**:
1. Использовать только **Public token** (не Secret token)
2. Настроить **URL restrictions** в Mapbox Dashboard
3. Ограничить список разрешенных доменов
4. Создать отдельный токен для каждого проекта/домена

**Документация Mapbox**:
- [How to use Mapbox securely](https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/)
- [Public vs Secret tokens](https://docs.mapbox.com/accounts/guides/tokens/#public-tokens)
- [URL restrictions](https://docs.mapbox.com/accounts/guides/tokens/#url-restrictions)

## Dependencies

### Production dependencies
```json
{
  "react": "^19.x",
  "react-dom": "^19.x",
  "mapbox-gl": "^3.x",
  "react-map-gl": "^7.x",
  "recharts": "^2.x",
  "clsx": "^latest",
  "tailwind-merge": "^latest"
}
```

### Development dependencies
```json
{
  "@types/react": "^19.x",
  "@types/react-dom": "^19.x",
  "@vitejs/plugin-react": "^latest",
  "typescript": "^5.x",
  "vite": "^7.x",
  "tailwindcss": "^4.x",
  "autoprefixer": "^latest",
  "postcss": "^latest"
}
```

### shadcn/ui компоненты
- card
- button
- (другие компоненты добавляются по мере необходимости)

## Tool Usage Patterns

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/widget.tsx',
      name: 'SoundInformer',
      fileName: 'sound-informer',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
```

### Tailwind Configuration
- Префикс `si-` для всех классов виджета
- CSS Variables для темизации (если потребуется)
- Поддержка Tailwind CSS 4.x

### TypeScript Configuration
- Строгая типизация
- Интерфейсы для всех данных
- Экспорт типов для использования в других файлах

### shadcn/ui Setup
- Компоненты в `src/ui/`
- Конфигурация в `components.json`
- Использование через импорт: `import { Card } from '@/ui/card'`

## Development Workflow

### 1. Разработка компонентов
- Использование `src/main.tsx` для разработки
- Hot Module Replacement (HMR) через Vite
- Тестирование в браузере на `localhost`

### 2. Тестирование виджета
- Создание тестовой HTML страницы
- Подключение собранного `sound-informer.js`
- Проверка интеграции и изоляции стилей

### 3. Сборка для production
- Запуск `npm run build`
- Проверка размера бандла
- Тестирование на различных браузерах

## Environment Variables

### Mapbox Token
Токен передается через конфигурацию при инициализации:
```typescript
SoundInformer.init({
  mapboxToken: 'pk.eyJ1Ijoi...'
});
```

**Не хранить токен в коде!** Токен должен передаваться с хост-сайта.

## Build Output

### Формат сборки
- **IIFE** (Immediately Invoked Function Expression)
- Один файл `sound-informer.js`
- Все зависимости инлайнятся в бандл

### Размер бандла
- Целевой размер: оптимизировать при необходимости
- Использование tree-shaking для уменьшения размера

## CSS Isolation Strategy

### Текущий подход: Префиксы
- Все классы имеют префикс `si-` (sound-informer)
- CSS Variables для темизации
- Изоляция через пространство имен

### Будущее улучшение: Shadow DOM
- Опционально для полной изоляции стилей
- Требует дополнительной реализации

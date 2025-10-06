# 🤖 Continuous Testing Agent - Агент постоянного тестирования

## Описание

Автоматический агент, который постоянно проверяет работоспособность сайта, отслеживает изменения в вёрстке и предупреждает о проблемах до того, как они попадут в продакшн.

## Возможности

### ✅ Автоматические проверки

1. **Layout Validation (Проверка вёрстки)**
   - Симметрия и выравнивание элементов
   - Консистентность отступов (padding, margin, gap)
   - Пропорции текста и элементов
   - Адаптивность на всех breakpoints

2. **Visual Regression (Визуальные изменения)**
   - Сравнение скриншотов до/после изменений
   - Детектирование непреднамеренных визуальных багов
   - Проверка позиционирования элементов

3. **Functional Testing (Функциональное тестирование)**
   - Работа переключателя языков (EN ↔ RU)
   - Корректность переводов
   - Работа навигации и ссылок
   - Формы и интерактивные элементы

4. **Performance Monitoring (Производительность)**
   - Время загрузки страниц
   - Размер bundle
   - Lighthouse scores (Performance, Accessibility, SEO)

5. **Accessibility Checks (Доступность)**
   - WCAG 2.1 AA compliance
   - Размеры кнопок (min 44px)
   - Контрастность текста
   - Aria-labels и семантика

## Как использовать

### Вариант 1: Ручной запуск

```bash
# Запустить полную проверку
npm run test:visual

# Проверить только вёрстку
npm run test:layout

# Проверить переводы
npm run test:i18n

# Проверить производительность
npm run test:performance
```

### Вариант 2: Автоматический мониторинг

```bash
# Запустить агента в фоновом режиме
npm run test:watch

# Агент будет проверять изменения каждые 30 секунд
# и уведомлять о найденных проблемах
```

### Вариант 3: Использование Claude Code Task

```javascript
// Запустить агента через Task tool
Task("Continuous Testing Agent", `
  You are the Continuous Testing Agent for the AiPlace website.

  YOUR MISSION:
  Monitor the website continuously and report any issues immediately.

  WHAT TO CHECK:
  1. Run visual comparison of all pages
  2. Validate layout symmetry and proportions
  3. Test language switching (EN ↔ RU)
  4. Check all interactive elements
  5. Monitor performance metrics

  COORDINATION:
  - Pre-task hook: npx claude-flow@alpha hooks pre-task --description "Testing agent monitoring"
  - Post-edit hook: After each test, store results in memory
  - Notification hook: Alert immediately if critical issues found
  - Post-task hook: Generate comprehensive report

  OUTPUT FORMAT:
  Create a report in /docs/testing/test-report-[timestamp].md with:
  - ✅ Passed tests
  - ❌ Failed tests
  - ⚠️ Warnings
  - 📊 Performance metrics
  - 🔧 Recommended fixes
`, "tester")
```

## Проверяемые критерии

### 🎨 Layout & Design

```yaml
checks:
  - Consistent padding: py-12 md:py-16 OR py-16 md:py-20
  - Consistent container: max-w-7xl mx-auto px-4/6 md:px-8/12 lg:px-12/16
  - Consistent gaps: gap-6 lg:gap-8
  - Typography scale:
      - H1: text-3xl md:text-4xl lg:text-5xl
      - H2: text-4xl md:text-5xl lg:text-6xl
      - Body: text-base md:text-lg
  - Logo size: h-32 md:h-40 lg:h-48
  - Button min-height: 44px (touch target)
```

### 🌐 Internationalization

```yaml
checks:
  - All navigation items translated
  - All buttons translated
  - All forms translated
  - No hardcoded English strings
  - Language switcher functional
  - Translations grammatically correct
```

### ⚡ Performance

```yaml
thresholds:
  - First Contentful Paint: < 1.5s
  - Largest Contentful Paint: < 2.5s
  - Time to Interactive: < 3.5s
  - Cumulative Layout Shift: < 0.1
  - Bundle size: < 500KB (gzipped)
```

### ♿ Accessibility

```yaml
checks:
  - All buttons: min 44x44px
  - Color contrast ratio: >= 4.5:1 for text
  - All images have alt text
  - All interactive elements have aria-labels
  - Semantic HTML structure
  - Keyboard navigation works
```

## Структура отчёта

```markdown
# Testing Report - 2025-10-06 15:30:00

## Summary
- ✅ 45 tests passed
- ❌ 3 tests failed
- ⚠️ 5 warnings
- 📊 Score: 89/100

## Critical Issues ❌

### 1. Services heading too large
- **File**: src/components/sections/services-grid.tsx:81
- **Current**: text-6xl sm:text-7xl lg:text-8xl
- **Expected**: text-4xl md:text-5xl lg:text-6xl
- **Severity**: HIGH
- **Impact**: Breaks visual hierarchy

### 2. Portfolio missing padding
- **File**: src/components/sections/portfolio-grid.tsx:142
- **Current**: No py-* class
- **Expected**: py-16 md:py-24
- **Severity**: HIGH
- **Impact**: Breaks consistent spacing

## Warnings ⚠️

### 1. Russian translation missing
- **File**: src/components/chat/MessageInput.tsx:45
- **String**: "Type your message..."
- **Severity**: MEDIUM
- **Fix**: Add t("chat.placeholder") translation key

## Passed Tests ✅

- ✅ Hero section layout (100%)
- ✅ Services grid alignment (100%)
- ✅ Portfolio cards symmetry (100%)
- ✅ Language switching works (100%)
- ✅ Navigation translations (100%)
- ✅ Button touch targets (100%)
- ✅ Performance score (94/100)

## Performance Metrics 📊

- First Contentful Paint: 1.2s ✅
- Largest Contentful Paint: 2.1s ✅
- Time to Interactive: 3.0s ✅
- Cumulative Layout Shift: 0.05 ✅
- Bundle size: 420KB ✅

## Accessibility Score ♿

- Score: 96/100 ✅
- All touch targets meet minimum size
- All images have alt text
- Minor: 2 buttons missing aria-labels

## Recommendations 🔧

1. **Immediate fixes**:
   - Reduce services heading size (5 min)
   - Add portfolio section padding (2 min)

2. **Short-term improvements**:
   - Add missing Russian translations (30 min)
   - Add aria-labels to remaining buttons (15 min)

3. **Long-term optimizations**:
   - Implement image lazy loading
   - Enable tree-shaking for unused code
   - Add service worker for offline support
```

## Интеграция с CI/CD

### GitHub Actions

```yaml
# .github/workflows/continuous-testing.yml
name: Continuous Testing

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 */2 * * *'  # Every 2 hours

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run Testing Agent
        run: |
          npx claude-flow sparc run tdd "Run comprehensive website tests"

      - name: Generate Report
        run: npm run test:report

      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: docs/testing/
```

## Уведомления

### Slack Integration

```javascript
// scripts/notify-slack.js
const results = require('./test-results.json')

if (results.failed > 0) {
  sendSlackNotification({
    channel: '#website-alerts',
    message: `🚨 Website tests failed!\n${results.failed} tests failed\nCheck report: ${results.reportUrl}`,
    color: 'danger'
  })
}
```

### Email Alerts

```javascript
// Отправить email при критических проблемах
if (results.critical > 0) {
  sendEmail({
    to: 'dev-team@aiplace.com',
    subject: '🚨 Critical Website Issues Detected',
    body: generateEmailReport(results)
  })
}
```

## Примеры использования

### Пример 1: Проверка после изменений

```bash
# После редактирования компонента
git add src/components/sections/hero.tsx

# Запустить проверку
npm run test:visual

# Если всё ОК, закоммитить
git commit -m "Update hero section"
```

### Пример 2: Регулярный мониторинг

```bash
# Запустить агента в фоне
npm run test:watch &

# Агент будет проверять каждые 30 секунд
# и создавать отчёты в docs/testing/

# Остановить агента
npm run test:stop
```

### Пример 3: Pre-commit hook

```bash
# .husky/pre-commit
#!/bin/sh
npm run test:quick || {
  echo "❌ Tests failed! Fix issues before committing."
  exit 1
}
```

## Конфигурация

### test.config.js

```javascript
module.exports = {
  // Проверки вёрстки
  layout: {
    enabled: true,
    thresholds: {
      paddingConsistency: 0.9,  // 90% должны совпадать
      gapConsistency: 0.9,
      typographyScale: 0.95
    }
  },

  // Визуальное тестирование
  visual: {
    enabled: true,
    threshold: 0.05,  // 5% допустимого отличия
    pages: ['/', '/services', '/portfolio', '/contact']
  },

  // Тестирование i18n
  i18n: {
    enabled: true,
    languages: ['en', 'ru'],
    checkCompleteness: true,
    checkGrammar: false  // Требует API
  },

  // Производительность
  performance: {
    enabled: true,
    thresholds: {
      fcp: 1500,
      lcp: 2500,
      tti: 3500,
      cls: 0.1,
      bundleSize: 512000  // 500KB
    }
  },

  // Уведомления
  notifications: {
    slack: {
      enabled: true,
      webhook: process.env.SLACK_WEBHOOK,
      channel: '#website-alerts'
    },
    email: {
      enabled: false,
      recipients: ['dev-team@aiplace.com']
    }
  }
}
```

## Команды NPM

```json
{
  "scripts": {
    "test:visual": "playwright test visual",
    "test:layout": "node scripts/test-layout.js",
    "test:i18n": "node scripts/test-i18n.js",
    "test:performance": "lighthouse http://localhost:3001 --output json",
    "test:accessibility": "pa11y http://localhost:3001",
    "test:all": "npm run test:layout && npm run test:i18n && npm run test:visual",
    "test:watch": "nodemon --watch src --exec 'npm run test:all'",
    "test:quick": "npm run test:layout && npm run test:i18n",
    "test:report": "node scripts/generate-report.js",
    "test:stop": "pkill -f 'npm run test:watch'"
  }
}
```

## Метрики успеха

### Целевые показатели

- ✅ **99% uptime** - сайт доступен 99% времени
- ✅ **< 5 min detection** - проблемы обнаруживаются за 5 минут
- ✅ **< 15 min fix** - критические проблемы исправляются за 15 минут
- ✅ **100% i18n coverage** - все тексты переведены
- ✅ **95+ accessibility score** - отличная доступность
- ✅ **90+ performance score** - высокая производительность

## FAQ

**Q: Как часто запускать агента?**
A: При разработке - при каждом сохранении. В продакшене - каждые 15-30 минут.

**Q: Что делать при ложных срабатываниях?**
A: Добавить исключения в test.config.js или обновить baseline скриншоты.

**Q: Можно ли запускать локально?**
A: Да! `npm run test:watch` запускает агента локально.

**Q: Как интегрировать с существующими тестами?**
A: Агент дополняет, а не заменяет unit/integration тесты.

---

## Поддержка

Вопросы и предложения: создайте issue в репозитории или напишите в #dev-testing канал Slack.

# Руководство по рабочему процессу

## 🎭 Как работает оркестрация команды

### Иерархия команды

```
Project Manager (Оркестратор)
    ├── UI/UX Designer
    ├── Frontend Developer ──┐
    ├── Backend Developer ───┼── Full-Stack Developer (Координатор)
    ├── DevOps Engineer ─────┘
    ├── QA Engineer
    └── SEO Specialist
```

## 🚀 Запуск проекта

### 1. Инициализация оркестратора

```bash
# Установка Claude Flow (если еще не установлен)
npm install -g claude-flow@alpha

# Инициализация swarm с иерархической топологией
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 8
```

### 2. Активация всей команды

Все агенты запускаются параллельно через Claude Code Task tool:

```javascript
// Одно сообщение - вся команда активируется
[Параллельный запуск агентов]:
  Task("Project Manager", "Coordinate team, plan sprint, setup milestones", "task-orchestrator")
  Task("UI/UX Designer", "Research users, create wireframes and design system", "researcher")
  Task("Frontend Dev", "Setup React/Next.js project, implement responsive UI", "coder")
  Task("Backend Dev", "Design API architecture, setup database schema", "backend-dev")
  Task("Full-Stack Dev", "Review architecture, coordinate integration", "system-architect")
  Task("DevOps Engineer", "Setup CI/CD pipeline, Docker configuration", "cicd-engineer")
  Task("QA Engineer", "Create test strategy, setup testing framework", "tester")
  Task("SEO Specialist", "Analyze competitors, plan content strategy", "researcher")
```

## 📋 Workflow для каждого агента

### Каждый агент следует протоколу:

**ПЕРЕД началом работы:**
```bash
npx claude-flow@alpha hooks pre-task --description "Task description"
npx claude-flow@alpha hooks session-restore --session-id "website-project"
```

**ВО ВРЕМЯ работы:**
```bash
# После каждого изменения файла
npx claude-flow@alpha hooks post-edit --file "path/to/file" --memory-key "team/agent/step"

# Уведомление команды
npx claude-flow@alpha hooks notify --message "Completed feature X"
```

**ПОСЛЕ завершения:**
```bash
npx claude-flow@alpha hooks post-task --task-id "task-123"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## 🎯 Примеры типовых задач

### Задача 1: Создание Landing Page

```bash
# PM запускает все параллельно:
Task("UI/UX", "Design landing page with hero, features, CTA sections", "researcher")
Task("Frontend", "Implement responsive landing with animations", "coder")
Task("Backend", "Setup contact form API and email service", "backend-dev")
Task("SEO", "Optimize meta tags, structure data, performance", "perf-analyzer")
Task("QA", "Test across devices and browsers", "tester")
```

### Задача 2: E-commerce платформа

```bash
Task("Architect", "Design microservices architecture for e-commerce", "system-architect")
Task("Backend", "Implement product catalog, cart, payment APIs", "backend-dev")
Task("Frontend", "Build product pages, cart, checkout flow", "coder")
Task("DevOps", "Setup Kubernetes cluster, monitoring", "cicd-engineer")
Task("QA", "E2E tests for purchase flow", "tdd-london-swarm")
```

### Задача 3: Корпоративный сайт

```bash
Task("Designer", "Create professional corporate design system", "base-template-generator")
Task("Content", "SEO-optimized content strategy", "researcher")
Task("Frontend", "Multi-language support, CMS integration", "coder")
Task("Backend", "Admin panel, content management API", "backend-dev")
```

## 🔄 Координация через Memory

### Shared Context между агентами:

```javascript
// Frontend делится API контрактом
memory.store("api/endpoints", {
  users: "/api/users",
  products: "/api/products"
})

// Backend читает и реализует
memory.retrieve("api/endpoints")

// QA использует для тестов
memory.retrieve("api/endpoints")
```

## 📊 Мониторинг прогресса

### Проверка статуса команды:

```bash
# Общий статус swarm
npx claude-flow@alpha swarm status

# Метрики агентов
npx claude-flow@alpha agent metrics

# Статус задач
npx claude-flow@alpha task status

# Производительность
npx claude-flow@alpha benchmark run
```

## 🎯 Best Practices

### ✅ Делать:
- Всегда запускать агентов параллельно в одном сообщении
- Использовать hooks для координации
- Хранить решения в shared memory
- Регулярно проверять статус команды
- Документировать все изменения

### ❌ Избегать:
- Последовательного запуска агентов
- Работы без coordination hooks
- Сохранения файлов в корень проекта
- Пропуска тестирования
- Игнорирования code review

## 🚀 Масштабирование

### Для больших проектов:

```bash
# Увеличить количество агентов
npx claude-flow@alpha swarm init --topology mesh --max-agents 15

# Добавить специализированных агентов:
Task("Security Auditor", "Security review and penetration testing", "reviewer")
Task("Performance Engineer", "Optimize loading time and Core Web Vitals", "perf-analyzer")
Task("Database Architect", "Design scalable database schema", "code-analyzer")
Task("Mobile Developer", "Create React Native mobile app", "mobile-dev")
```

## 📈 Метрики успеха

- **Velocity**: story points за спринт
- **Quality**: test coverage > 90%
- **Performance**: PageSpeed > 95
- **Deployment**: CI/CD < 10 минут
- **Bugs**: < 5 critical bugs в продакшне
- **Uptime**: 99.9%

## 🎓 Обучение команды

```bash
# Neural training от успешных паттернов
npx claude-flow@alpha neural train --pattern "successful-deployment"

# Экспорт лучших практик
npx claude-flow@alpha workflow export --format json
```

---

**Помните**: Оркестратор координирует, агенты исполняют! 🎯

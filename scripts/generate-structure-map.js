#!/usr/bin/env node

/**
 * 🗺️ Structure Map Generator
 * Генерация визуальной карты структуры проекта
 */

const fs = require('fs');
const path = require('path');

// Конфигурация
const CONFIG = {
  ignoreDirs: ['.git', 'node_modules', 'dist', 'build', '.next', 'coverage', 'tmp'],
  ignoreFiles: ['.DS_Store', 'Thumbs.db'],
  maxDepth: 4,
  outputFile: 'STRUCTURE.md'
};

// Эмодзи для разных типов файлов
const EMOJI = {
  folder: '📂',
  js: '📜',
  ts: '📘',
  tsx: '⚛️',
  jsx: '⚛️',
  css: '🎨',
  scss: '🎨',
  json: '📋',
  md: '📄',
  sh: '🔧',
  yml: '⚙️',
  yaml: '⚙️',
  env: '🔐',
  test: '🧪',
  config: '⚙️',
  image: '🖼️',
  default: '📄'
};

class StructureMapGenerator {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.tree = [];
  }

  // Получение эмодзи для файла
  getEmoji(fileName, isDirectory) {
    if (isDirectory) return EMOJI.folder;

    const ext = path.extname(fileName).slice(1);
    if (EMOJI[ext]) return EMOJI[ext];

    if (fileName.includes('.test.') || fileName.includes('.spec.')) return EMOJI.test;
    if (fileName.includes('config')) return EMOJI.config;
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(`.${ext}`)) return EMOJI.image;

    return EMOJI.default;
  }

  // Получение описания папки
  getDescription(dirPath) {
    const descriptions = {
      'src': 'Исходный код приложения',
      'components': 'React компоненты',
      'pages': 'Страницы приложения',
      'features': 'Функциональные модули',
      'services': 'Бизнес-логика и API клиенты',
      'utils': 'Вспомогательные функции',
      'hooks': 'React хуки',
      'contexts': 'React контексты',
      'store': 'Управление состоянием',
      'types': 'TypeScript типы и интерфейсы',
      'constants': 'Константы приложения',
      'tests': 'Тестирование',
      'docs': 'Документация проекта',
      'config': 'Файлы конфигурации',
      'scripts': 'Автоматизация и утилиты',
      'public': 'Статические ресурсы',
      '.github': 'GitHub конфигурация'
    };

    const dirName = path.basename(dirPath);
    return descriptions[dirName] || '';
  }

  // Подсчёт статистики
  getStats(dirPath) {
    let stats = {
      files: 0,
      dirs: 0,
      lines: 0,
      size: 0
    };

    const scan = (currentPath, depth = 0) => {
      if (depth > CONFIG.maxDepth) return;

      const items = fs.readdirSync(currentPath);

      items.forEach(item => {
        if (CONFIG.ignoreFiles.includes(item)) return;

        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          if (CONFIG.ignoreDirs.includes(item)) return;
          stats.dirs++;
          scan(itemPath, depth + 1);
        } else {
          stats.files++;
          stats.size += stat.size;

          // Подсчёт строк кода
          const ext = path.extname(item);
          if (['.js', '.ts', '.tsx', '.jsx', '.css', '.scss'].includes(ext)) {
            try {
              const content = fs.readFileSync(itemPath, 'utf8');
              stats.lines += content.split('\n').length;
            } catch (err) {}
          }
        }
      });
    };

    scan(dirPath);
    return stats;
  }

  // Построение дерева
  buildTree(dirPath, prefix = '', depth = 0) {
    if (depth > CONFIG.maxDepth) return;

    const items = fs.readdirSync(dirPath);
    const filteredItems = items.filter(item => {
      return !CONFIG.ignoreFiles.includes(item) &&
             !CONFIG.ignoreDirs.includes(item);
    });

    filteredItems.sort((a, b) => {
      const aPath = path.join(dirPath, a);
      const bPath = path.join(dirPath, b);
      const aIsDir = fs.statSync(aPath).isDirectory();
      const bIsDir = fs.statSync(bPath).isDirectory();

      // Папки сначала
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

    filteredItems.forEach((item, index) => {
      const isLast = index === filteredItems.length - 1;
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      const isDirectory = stat.isDirectory();

      const connector = isLast ? '└──' : '├──';
      const emoji = this.getEmoji(item, isDirectory);

      let line = `${prefix}${connector} ${emoji} ${item}`;

      // Добавляем описание для важных папок
      if (isDirectory && depth <= 1) {
        const description = this.getDescription(itemPath);
        if (description) {
          line += ` - ${description}`;
        }
      }

      this.tree.push(line);

      // Рекурсивно обходим подпапки
      if (isDirectory) {
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        this.buildTree(itemPath, newPrefix, depth + 1);
      }
    });
  }

  // Генерация markdown файла
  generate() {
    console.log('🗺️  Генерация карты структуры проекта...\n');

    // Строим дерево
    const projectName = path.basename(this.rootPath);
    this.tree.push(`📦 ${projectName}/`);
    this.buildTree(this.rootPath, '', 0);

    // Получаем статистику
    const stats = this.getStats(this.rootPath);

    // Формируем markdown
    const markdown = `# 🗺️ Структура проекта

> Автоматически сгенерировано: ${new Date().toLocaleString('ru-RU')}

## 📊 Статистика

| Метрика | Значение |
|---------|----------|
| 📂 Папок | ${stats.dirs} |
| 📄 Файлов | ${stats.files} |
| 📝 Строк кода | ${stats.lines.toLocaleString('ru-RU')} |
| 💾 Размер | ${this.formatSize(stats.size)} |

## 🌳 Дерево проекта

\`\`\`
${this.tree.join('\n')}
\`\`\`

## 📁 Описание основных директорий

### \`/src\` - Исходный код
Основная папка с исходным кодом приложения.

- \`/components\` - Переиспользуемые UI компоненты
- \`/features\` - Функциональные модули (feature-sliced design)
- \`/pages\` - Компоненты страниц
- \`/services\` - API клиенты и бизнес-логика
- \`/utils\` - Вспомогательные функции
- \`/hooks\` - Кастомные React хуки
- \`/types\` - TypeScript типы и интерфейсы

### \`/tests\` - Тестирование
Все типы тестов приложения.

- \`/unit\` - Юнит-тесты
- \`/integration\` - Интеграционные тесты
- \`/e2e\` - End-to-end тесты

### \`/docs\` - Документация
Проектная документация.

- \`/api\` - API документация
- \`/architecture\` - Архитектурные решения
- \`/guides\` - Руководства для разработчиков

### \`/config\` - Конфигурация
Файлы настроек для разных окружений.

### \`/scripts\` - Скрипты
Утилиты для автоматизации задач.

### \`/public\` - Статические файлы
Публичные ресурсы (изображения, шрифты, иконки).

## 🔢 Система нумерации

Мы используем префиксную нумерацию для организации файлов:

- \`00-09\` - Инфраструктура
- \`10-19\` - Базовые компоненты
- \`20-29\` - UI компоненты
- \`30-39\` - Бизнес-логика
- \`40-49\` - Интеграции
- \`50-59\` - Тесты
- \`60-69\` - Документация
- \`70-79\` - Автоматизация
- \`80-89\` - Конфигурация
- \`90-99\` - Экспериментальное

## 📝 Правила именования

### Файлы:
- **Компоненты React**: \`PascalCase.tsx\`
- **Хуки**: \`useCamelCase.ts\`
- **Утилиты**: \`camelCase.ts\`
- **Типы**: \`camelCase.types.ts\`
- **Тесты**: \`fileName.test.ts\`

### Папки:
- **Все папки**: \`kebab-case\`

## 🚀 Быстрая навигация

Для быстрого поиска используйте:

\`\`\`bash
# Найти все компоненты
find src/components -name "*.tsx"

# Найти тесты
find tests -name "*.test.*"

# Найти конфигурации
find config -name "*.json"
\`\`\`

## 🔄 Обновление карты

Для обновления этого файла запустите:

\`\`\`bash
npm run generate:structure-map
\`\`\`

---

*Создано File System Architect 🗂️*
`;

    // Сохраняем файл
    const outputPath = path.join(this.rootPath, CONFIG.outputFile);
    fs.writeFileSync(outputPath, markdown, 'utf8');

    console.log(`✅ Карта структуры создана: ${CONFIG.outputFile}`);
    console.log(`\n📊 Статистика:`);
    console.log(`   📂 Папок: ${stats.dirs}`);
    console.log(`   📄 Файлов: ${stats.files}`);
    console.log(`   📝 Строк кода: ${stats.lines.toLocaleString('ru-RU')}`);
    console.log(`   💾 Размер: ${this.formatSize(stats.size)}\n`);
  }

  // Форматирование размера
  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

// Запуск генератора
const rootPath = process.cwd();
const generator = new StructureMapGenerator(rootPath);
generator.generate();

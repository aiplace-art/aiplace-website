#!/usr/bin/env node

/**
 * 🔍 File System Validator
 * Проверка структуры проекта на соответствие стандартам
 */

const fs = require('fs');
const path = require('path');

// Конфигурация правил
const CONFIG = {
  maxDepth: 5,                    // Максимальная глубина вложенности
  maxFilesPerDir: 15,             // Максимум файлов в папке
  maxFileLines: 500,              // Максимум строк в файле
  requireReadme: true,            // README обязателен
  forbiddenInRoot: [              // Запрещены в корне
    '*.js', '*.ts', '*.tsx', '*.jsx',
    '*.css', '*.scss', '*.md'
  ],
  allowedInRoot: [                // Разрешены в корне
    'package.json', 'tsconfig.json', '.gitignore',
    'README.md', 'STRUCTURE.md', '.editorconfig',
    'next.config.js', 'vite.config.ts'
  ]
};

// Цвета для вывода
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

class StructureValidator {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  // Главный метод валидации
  validate() {
    console.log(`${colors.blue}🔍 Проверка структуры проекта...${colors.reset}\n`);

    this.checkRootFiles();
    this.checkDirectoryStructure(this.rootPath, 0);
    this.checkNamingConventions();
    this.checkDuplicates();

    this.printReport();
  }

  // Проверка файлов в корне
  checkRootFiles() {
    const files = fs.readdirSync(this.rootPath);

    files.forEach(file => {
      const filePath = path.join(this.rootPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && !CONFIG.allowedInRoot.includes(file)) {
        if (this.matchesPattern(file, CONFIG.forbiddenInRoot)) {
          this.errors.push({
            type: 'ROOT_FILE',
            message: `Файл "${file}" не должен быть в корне проекта`,
            path: filePath,
            severity: 'error'
          });
        }
      }
    });
  }

  // Рекурсивная проверка структуры
  checkDirectoryStructure(dirPath, depth) {
    if (depth > CONFIG.maxDepth) {
      this.warnings.push({
        type: 'MAX_DEPTH',
        message: `Превышена максимальная глубина вложенности (${CONFIG.maxDepth})`,
        path: dirPath,
        severity: 'warning'
      });
      return;
    }

    const files = fs.readdirSync(dirPath);
    const regularFiles = files.filter(f => {
      const stat = fs.statSync(path.join(dirPath, f));
      return stat.isFile();
    });

    // Проверка количества файлов
    if (regularFiles.length > CONFIG.maxFilesPerDir) {
      this.warnings.push({
        type: 'TOO_MANY_FILES',
        message: `Слишком много файлов в папке (${regularFiles.length}/${CONFIG.maxFilesPerDir})`,
        path: dirPath,
        severity: 'warning'
      });
    }

    // Проверка наличия README
    if (CONFIG.requireReadme && depth > 0 && depth <= 2) {
      const hasReadme = files.some(f => f.toLowerCase().startsWith('readme'));
      if (!hasReadme && regularFiles.length > 5) {
        this.warnings.push({
          type: 'NO_README',
          message: 'Отсутствует README.md в важной папке',
          path: dirPath,
          severity: 'warning'
        });
      }
    }

    // Проверка размера файлов
    regularFiles.forEach(file => {
      const filePath = path.join(dirPath, file);
      this.checkFileSize(filePath);
    });

    // Рекурсивная проверка подпапок
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.')) {
        this.checkDirectoryStructure(filePath, depth + 1);
      }
    });
  }

  // Проверка размера файла
  checkFileSize(filePath) {
    const ext = path.extname(filePath);
    if (['.js', '.ts', '.tsx', '.jsx'].includes(ext)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').length;

      if (lines > CONFIG.maxFileLines) {
        this.warnings.push({
          type: 'LARGE_FILE',
          message: `Файл слишком большой (${lines}/${CONFIG.maxFileLines} строк)`,
          path: filePath,
          severity: 'warning'
        });
      }
    }
  }

  // Проверка naming conventions
  checkNamingConventions() {
    const checkDir = (dirPath) => {
      const files = fs.readdirSync(dirPath);

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          // Папки должны быть в kebab-case
          if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(file) && !file.startsWith('.')) {
            this.warnings.push({
              type: 'NAMING',
              message: `Папка должна быть в kebab-case: "${file}"`,
              path: filePath,
              severity: 'warning'
            });
          }
          checkDir(filePath);
        } else {
          // Проверка файлов
          const ext = path.extname(file);
          const name = path.basename(file, ext);

          // Компоненты React должны быть в PascalCase
          if (['.tsx', '.jsx'].includes(ext) && file.match(/[A-Z]/)) {
            if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
              this.warnings.push({
                type: 'NAMING',
                message: `Компонент должен быть в PascalCase: "${file}"`,
                path: filePath,
                severity: 'info'
              });
            }
          }
        }
      });
    };

    checkDir(this.rootPath);
  }

  // Проверка дубликатов
  checkDuplicates() {
    const fileHashes = new Map();

    const scanDir = (dirPath) => {
      const files = fs.readdirSync(dirPath);

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.')) {
          scanDir(filePath);
        } else if (stat.isFile()) {
          const relativePath = path.relative(this.rootPath, filePath);
          const fileName = path.basename(file);

          if (!fileHashes.has(fileName)) {
            fileHashes.set(fileName, []);
          }
          fileHashes.get(fileName).push(relativePath);
        }
      });
    };

    scanDir(this.rootPath);

    // Ищем дубликаты
    fileHashes.forEach((paths, fileName) => {
      if (paths.length > 1 && !fileName.startsWith('.')) {
        this.info.push({
          type: 'DUPLICATE',
          message: `Найдены файлы с одинаковым именем: ${fileName}`,
          paths: paths,
          severity: 'info'
        });
      }
    });
  }

  // Вывод отчёта
  printReport() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${colors.blue}📊 ОТЧЁТ О ВАЛИДАЦИИ СТРУКТУРЫ${colors.reset}`);
    console.log(`${'='.repeat(60)}\n`);

    // Ошибки
    if (this.errors.length > 0) {
      console.log(`${colors.red}❌ ОШИБКИ (${this.errors.length}):${colors.reset}`);
      this.errors.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err.message}`);
        console.log(`     ${colors.gray}${err.path}${colors.reset}`);
      });
      console.log();
    }

    // Предупреждения
    if (this.warnings.length > 0) {
      console.log(`${colors.yellow}⚠️  ПРЕДУПРЕЖДЕНИЯ (${this.warnings.length}):${colors.reset}`);
      this.warnings.forEach((warn, i) => {
        console.log(`  ${i + 1}. ${warn.message}`);
        console.log(`     ${colors.gray}${warn.path}${colors.reset}`);
      });
      console.log();
    }

    // Информация
    if (this.info.length > 0) {
      console.log(`${colors.blue}ℹ️  ИНФОРМАЦИЯ (${this.info.length}):${colors.reset}`);
      this.info.slice(0, 5).forEach((info, i) => {
        console.log(`  ${i + 1}. ${info.message}`);
        if (info.paths) {
          info.paths.forEach(p => {
            console.log(`     ${colors.gray}→ ${p}${colors.reset}`);
          });
        }
      });
      console.log();
    }

    // Итоговая оценка
    const total = this.errors.length + this.warnings.length;
    const score = Math.max(0, 100 - (this.errors.length * 10) - (this.warnings.length * 2));

    let scoreColor = colors.green;
    let scoreEmoji = '🟢';
    let scoreText = 'Отлично';

    if (score < 90) {
      scoreColor = colors.yellow;
      scoreEmoji = '🟡';
      scoreText = 'Хорошо';
    }
    if (score < 70) {
      scoreColor = colors.yellow;
      scoreEmoji = '🟠';
      scoreText = 'Средне';
    }
    if (score < 50) {
      scoreColor = colors.red;
      scoreEmoji = '🔴';
      scoreText = 'Плохо';
    }

    console.log(`${scoreColor}${scoreEmoji} ОЦЕНКА КАЧЕСТВА: ${score}/100 (${scoreText})${colors.reset}\n`);

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(`${colors.green}✅ Структура проекта идеальна!${colors.reset}\n`);
    } else if (this.errors.length > 0) {
      console.log(`${colors.red}🔧 Необходимо исправить критические ошибки${colors.reset}\n`);
      process.exit(1);
    } else {
      console.log(`${colors.yellow}💡 Рекомендуется улучшить структуру${colors.reset}\n`);
    }
  }

  // Вспомогательный метод для проверки паттернов
  matchesPattern(fileName, patterns) {
    return patterns.some(pattern => {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(fileName);
    });
  }
}

// Запуск валидатора
const rootPath = process.cwd();
const validator = new StructureValidator(rootPath);
validator.validate();

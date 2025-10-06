#!/usr/bin/env node

/**
 * Translation Quality Validator
 *
 * Automated validation script for Russian translations at AiPlace
 * Integrates with Claude-Flow hooks for quality assurance
 *
 * Usage:
 *   node scripts/translation-quality-validator.js [options]
 *
 * Options:
 *   --file <path>       Path to translation file (default: locales/ru.json)
 *   --strict            Enable strict mode (fail on warnings)
 *   --report            Generate detailed report
 *   --hooks             Enable Claude-Flow hooks integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  translationFile: process.argv.includes('--file')
    ? process.argv[process.argv.indexOf('--file') + 1]
    : path.join(__dirname, '../locales/ru.json'),
  englishFile: path.join(__dirname, '../locales/en.json'),
  strictMode: process.argv.includes('--strict'),
  generateReport: process.argv.includes('--report'),
  enableHooks: process.argv.includes('--hooks'),
  maxButtonLength: 20,
  maxHeadingLength: 50,
  maxTooltipLength: 100,
  maxErrorLength: 200,
  maxLabelLength: 30,
};

// Quality metrics
const metrics = {
  total: 0,
  passed: 0,
  warnings: 0,
  errors: 0,
  coverage: 0,
};

// Issue tracking
const issues = {
  critical: [],
  warning: [],
  info: [],
};

// Technical terminology dictionary
const APPROVED_TERMS = {
  'AI': 'ИИ',
  'Machine Learning': 'Машинное обучение',
  'Neural Network': 'Нейронная сеть',
  'API': 'API',
  'Cloud': 'Облако',
  'Dashboard': 'Панель управления',
  'Workflow': 'Рабочий процесс',
  'Template': 'Шаблон',
  'Agent': 'Агент',
  'Dataset': 'Набор данных',
};

// Problematic patterns (machine translation artifacts)
const BAD_PATTERNS = [
  { pattern: /креатить|креативить/i, message: 'Anglicism detected: use "создавать" instead' },
  { pattern: /стартовать/i, message: 'Use "начать" or "запустить" instead of "стартовать"' },
  { pattern: /\bокей\b/i, message: 'Use "хорошо" or "ок" instead of "окей"' },
  { pattern: /имплементация/i, message: 'Use "реализация" or "внедрение"' },
  { pattern: /кастомизация/i, message: 'Use "настройка" or "персонализация"' },
  { pattern: /юзер/i, message: 'Use "пользователь"' },
  { pattern: /фича/i, message: 'Use "функция" or "возможность"' },
];

// Grammar checks (basic)
const GRAMMAR_CHECKS = [
  { pattern: /\s{2,}/, message: 'Multiple consecutive spaces' },
  { pattern: /\s[,.!?;:]/, message: 'Space before punctuation' },
  { pattern: /[а-яА-ЯёЁ][A-Za-z]|[A-Za-z][а-яА-ЯёЁ]/, message: 'Mixed Latin and Cyrillic characters' },
  { pattern: /[""'']/, message: 'Use Russian quotes: «»' },
];

/**
 * Execute Claude-Flow hook
 */
function executeHook(hookType, params = {}) {
  if (!CONFIG.enableHooks) return;

  try {
    const paramsStr = Object.entries(params)
      .map(([key, value]) => `--${key} "${value}"`)
      .join(' ');

    const cmd = `npx claude-flow@alpha hooks ${hookType} ${paramsStr}`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.warn(`Hook execution failed: ${hookType}`, error.message);
  }
}

/**
 * Load JSON file safely
 */
function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error.message);
    process.exit(1);
  }
}

/**
 * Flatten nested object to dot notation
 */
function flattenObject(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }

  return result;
}

/**
 * Check translation coverage
 */
function checkCoverage(englishTranslations, russianTranslations) {
  console.log('\n📊 Checking Translation Coverage...');

  const englishKeys = Object.keys(englishTranslations);
  const russianKeys = Object.keys(russianTranslations);

  const missing = englishKeys.filter(key => !russianKeys.includes(key));
  const extra = russianKeys.filter(key => !englishKeys.includes(key));

  metrics.coverage = ((russianKeys.length / englishKeys.length) * 100).toFixed(2);

  if (missing.length > 0) {
    issues.critical.push({
      type: 'MISSING_TRANSLATIONS',
      keys: missing,
      message: `${missing.length} keys are not translated`,
    });
  }

  if (extra.length > 0) {
    issues.warning.push({
      type: 'EXTRA_KEYS',
      keys: extra,
      message: `${extra.length} keys exist in Russian but not in English`,
    });
  }

  console.log(`  Coverage: ${metrics.coverage}%`);
  console.log(`  English keys: ${englishKeys.length}`);
  console.log(`  Russian keys: ${russianKeys.length}`);
  console.log(`  Missing: ${missing.length}`);
  console.log(`  Extra: ${extra.length}`);
}

/**
 * Check for untranslated strings
 */
function checkUntranslated(russianTranslations) {
  console.log('\n🔍 Checking for Untranslated Strings...');

  let untranslatedCount = 0;

  for (const [key, value] of Object.entries(russianTranslations)) {
    if (typeof value !== 'string') continue;

    // Check if value contains only Latin characters (likely untranslated)
    if (/^[A-Za-z0-9\s.,!?-]+$/.test(value)) {
      issues.critical.push({
        type: 'UNTRANSLATED',
        key,
        value,
        message: 'String appears to be untranslated (no Cyrillic characters)',
      });
      untranslatedCount++;
    }
  }

  console.log(`  Found ${untranslatedCount} potentially untranslated strings`);
}

/**
 * Check translation length constraints
 */
function checkLengthConstraints(russianTranslations) {
  console.log('\n📏 Checking Length Constraints...');

  const constraints = {
    button: CONFIG.maxButtonLength,
    heading: CONFIG.maxHeadingLength,
    tooltip: CONFIG.maxTooltipLength,
    error: CONFIG.maxErrorLength,
    label: CONFIG.maxLabelLength,
  };

  let violationCount = 0;

  for (const [key, value] of Object.entries(russianTranslations)) {
    if (typeof value !== 'string') continue;

    let maxLength = null;
    let constraintType = null;

    // Determine constraint based on key pattern
    if (key.includes('button') || key.includes('btn')) {
      maxLength = constraints.button;
      constraintType = 'button';
    } else if (key.includes('heading') || key.includes('title') || key.includes('h1') || key.includes('h2')) {
      maxLength = constraints.heading;
      constraintType = 'heading';
    } else if (key.includes('tooltip') || key.includes('hint')) {
      maxLength = constraints.tooltip;
      constraintType = 'tooltip';
    } else if (key.includes('error') || key.includes('warning')) {
      maxLength = constraints.error;
      constraintType = 'error';
    } else if (key.includes('label') || key.includes('placeholder')) {
      maxLength = constraints.label;
      constraintType = 'label';
    }

    if (maxLength && value.length > maxLength) {
      issues.warning.push({
        type: 'LENGTH_CONSTRAINT',
        key,
        value,
        length: value.length,
        maxLength,
        constraintType,
        message: `${constraintType} text exceeds ${maxLength} characters (${value.length})`,
      });
      violationCount++;
    }
  }

  console.log(`  Found ${violationCount} length constraint violations`);
}

/**
 * Check for bad patterns
 */
function checkBadPatterns(russianTranslations) {
  console.log('\n🚨 Checking for Translation Artifacts...');

  let artifactCount = 0;

  for (const [key, value] of Object.entries(russianTranslations)) {
    if (typeof value !== 'string') continue;

    for (const { pattern, message } of BAD_PATTERNS) {
      if (pattern.test(value)) {
        issues.warning.push({
          type: 'BAD_PATTERN',
          key,
          value,
          pattern: pattern.toString(),
          message,
        });
        artifactCount++;
      }
    }
  }

  console.log(`  Found ${artifactCount} potential translation artifacts`);
}

/**
 * Check basic grammar
 */
function checkGrammar(russianTranslations) {
  console.log('\n📝 Checking Basic Grammar...');

  let grammarIssueCount = 0;

  for (const [key, value] of Object.entries(russianTranslations)) {
    if (typeof value !== 'string') continue;

    for (const { pattern, message } of GRAMMAR_CHECKS) {
      if (pattern.test(value)) {
        issues.warning.push({
          type: 'GRAMMAR',
          key,
          value,
          message,
        });
        grammarIssueCount++;
      }
    }
  }

  console.log(`  Found ${grammarIssueCount} basic grammar issues`);
}

/**
 * Check character encoding
 */
function checkEncoding(filePath) {
  console.log('\n🔤 Checking Character Encoding...');

  const content = fs.readFileSync(filePath, 'utf-8');

  // Check for BOM
  if (content.charCodeAt(0) === 0xFEFF) {
    issues.warning.push({
      type: 'ENCODING',
      message: 'File contains UTF-8 BOM',
    });
  }

  // Check for invalid characters
  const invalidChars = content.match(/[^\x00-\x7F\u0400-\u04FF\s{}":,\[\]]/g);
  if (invalidChars) {
    issues.info.push({
      type: 'ENCODING',
      message: `Found ${invalidChars.length} potentially invalid characters`,
      characters: [...new Set(invalidChars)],
    });
  }

  console.log('  Encoding check complete');
}

/**
 * Generate quality report
 */
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    file: CONFIG.translationFile,
    metrics,
    issues: {
      critical: issues.critical.length,
      warning: issues.warning.length,
      info: issues.info.length,
    },
    details: issues,
  };

  const reportPath = path.join(__dirname, '../reports/translation-quality-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n📄 Report generated: ${reportPath}`);

  return report;
}

/**
 * Print summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('TRANSLATION QUALITY VALIDATION SUMMARY');
  console.log('='.repeat(60));

  console.log(`\n📊 Metrics:`);
  console.log(`  Coverage: ${metrics.coverage}%`);
  console.log(`  Total Checks: ${metrics.total}`);
  console.log(`  Passed: ${metrics.passed}`);
  console.log(`  Warnings: ${metrics.warnings}`);
  console.log(`  Errors: ${metrics.errors}`);

  console.log(`\n🚦 Issues:`);
  console.log(`  Critical: ${issues.critical.length}`);
  console.log(`  Warning: ${issues.warning.length}`);
  console.log(`  Info: ${issues.info.length}`);

  if (issues.critical.length > 0) {
    console.log('\n❌ CRITICAL ISSUES:');
    issues.critical.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.type}] ${issue.message}`);
      if (issue.key) console.log(`     Key: ${issue.key}`);
      if (issue.keys) console.log(`     Keys: ${issue.keys.slice(0, 5).join(', ')}${issue.keys.length > 5 ? '...' : ''}`);
    });
  }

  if (issues.warning.length > 0 && CONFIG.strictMode) {
    console.log('\n⚠️  WARNINGS (treating as errors in strict mode):');
    issues.warning.slice(0, 10).forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.type}] ${issue.message}`);
      if (issue.key) console.log(`     Key: ${issue.key}`);
    });
    if (issues.warning.length > 10) {
      console.log(`  ... and ${issues.warning.length - 10} more warnings`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

/**
 * Main validation function
 */
async function validateTranslations() {
  console.log('🚀 Translation Quality Validator\n');
  console.log(`File: ${CONFIG.translationFile}`);
  console.log(`Strict Mode: ${CONFIG.strictMode ? 'ON' : 'OFF'}`);
  console.log(`Hooks: ${CONFIG.enableHooks ? 'ENABLED' : 'DISABLED'}\n`);

  // Pre-task hook
  executeHook('pre-task', {
    description: 'Translation quality validation',
    agent: 'translation-quality-monitor',
  });

  // Session restore
  executeHook('session-restore', {
    'session-id': 'translation-qa-session',
    'memory-key': 'translations/russian/decisions',
  });

  // Load translations
  const russianTranslations = flattenObject(loadJSON(CONFIG.translationFile));
  const englishTranslations = flattenObject(loadJSON(CONFIG.englishFile));

  metrics.total = Object.keys(russianTranslations).length;

  // Run checks
  checkCoverage(englishTranslations, russianTranslations);
  checkUntranslated(russianTranslations);
  checkLengthConstraints(russianTranslations);
  checkBadPatterns(russianTranslations);
  checkGrammar(russianTranslations);
  checkEncoding(CONFIG.translationFile);

  // Calculate metrics
  metrics.errors = issues.critical.length;
  metrics.warnings = issues.warning.length;
  metrics.passed = metrics.total - metrics.errors - (CONFIG.strictMode ? metrics.warnings : 0);

  // Generate report
  if (CONFIG.generateReport) {
    generateReport();
  }

  // Print summary
  printSummary();

  // Post-task hook
  executeHook('post-task', {
    'task-id': 'translation-qa',
    results: `Critical: ${issues.critical.length}, Warnings: ${issues.warning.length}`,
  });

  // Notify
  const severity = issues.critical.length > 0 ? 'error' : issues.warning.length > 0 ? 'warning' : 'info';
  executeHook('notify', {
    message: `Translation validation complete: ${issues.critical.length} critical, ${issues.warning.length} warnings`,
    severity,
  });

  // Session end
  executeHook('session-end', {
    'export-metrics': 'true',
    'session-id': 'translation-qa-session',
  });

  // Exit with appropriate code
  if (issues.critical.length > 0) {
    console.log('\n❌ Validation FAILED: Critical issues found');
    process.exit(1);
  } else if (CONFIG.strictMode && issues.warning.length > 0) {
    console.log('\n⚠️  Validation FAILED: Warnings in strict mode');
    process.exit(1);
  } else {
    console.log('\n✅ Validation PASSED');
    process.exit(0);
  }
}

// Run validation
validateTranslations().catch(error => {
  console.error('Validation error:', error);
  process.exit(1);
});

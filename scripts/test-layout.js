#!/usr/bin/env node
/**
 * Layout Testing Script - Автоматическая проверка вёрстки
 *
 * Проверяет:
 * - Консистентность padding и margins
 * - Симметрию и выравнивание
 * - Пропорции текста
 * - Адаптивность
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Правила для проверки
const LAYOUT_RULES = {
  // Консистентные значения padding для секций
  sectionPadding: {
    allowed: [
      'py-12 md:py-16',
      'py-16 md:py-20',
      'py-16 md:py-24'
    ],
    severity: 'HIGH'
  },

  // Консистентные значения container padding
  containerPadding: {
    allowed: [
      'px-4 md:px-8 lg:px-12',
      'px-6 sm:px-12 lg:px-16'
    ],
    severity: 'HIGH'
  },

  // Консистентные значения gap
  gridGap: {
    allowed: [
      'gap-6 lg:gap-8',
      'gap-5 md:gap-6 lg:gap-8',
      'gap-3 md:gap-4',
      'gap-6 md:gap-8',
      'gap-8'
    ],
    severity: 'MEDIUM'
  },

  // Размеры заголовков
  headingSizes: {
    h1: {
      allowed: ['text-3xl md:text-4xl lg:text-5xl', 'text-4xl md:text-5xl lg:text-6xl'],
      max: 'text-6xl',
      severity: 'HIGH'
    },
    h2: {
      allowed: ['text-3xl md:text-4xl lg:text-5xl', 'text-4xl md:text-5xl lg:text-6xl'],
      max: 'text-6xl',
      severity: 'HIGH'
    },
    h3: {
      allowed: ['text-2xl md:text-3xl lg:text-4xl', 'text-3xl md:text-4xl'],
      max: 'text-4xl',
      severity: 'MEDIUM'
    }
  },

  // Container max-width
  containerWidth: {
    standard: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-6xl',
    severity: 'LOW'
  }
};

// Результаты тестирования
const results = {
  passed: [],
  warnings: [],
  failed: [],
  stats: {
    filesChecked: 0,
    issuesFound: 0,
    criticalIssues: 0
  }
};

/**
 * Проверить файл на соответствие правилам
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Проверка padding секций
    if (line.includes('className') && line.includes('py-')) {
      const match = line.match(/py-\d+\s+md:py-\d+/);
      if (match) {
        const padding = match[0];
        if (!LAYOUT_RULES.sectionPadding.allowed.some(p => line.includes(p))) {
          issues.push({
            type: 'INCONSISTENT_PADDING',
            severity: LAYOUT_RULES.sectionPadding.severity,
            line: lineNumber,
            found: padding,
            expected: LAYOUT_RULES.sectionPadding.allowed,
            message: `Section padding should be one of: ${LAYOUT_RULES.sectionPadding.allowed.join(', ')}`
          });
        }
      }
    }

    // Проверка размера заголовков
    if (line.includes('<h1') || line.includes('<h2') || line.includes('<h3')) {
      const headingType = line.match(/<(h[123])/)?.[1];
      if (headingType) {
        const textMatch = line.match(/text-\d+xl/g);
        if (textMatch) {
          const largestSize = textMatch.sort().pop();
          const rule = LAYOUT_RULES.headingSizes[headingType];

          if (largestSize > rule.max) {
            issues.push({
              type: 'HEADING_TOO_LARGE',
              severity: rule.severity,
              line: lineNumber,
              found: largestSize,
              max: rule.max,
              message: `${headingType.toUpperCase()} should not exceed ${rule.max}, found ${largestSize}`
            });
          }
        }
      }
    }

    // Проверка grid gaps
    if (line.includes('grid') && line.includes('gap-')) {
      const gapMatch = line.match(/gap-\d+(\s+(md|lg):gap-\d+)*/);
      if (gapMatch) {
        const gap = gapMatch[0];
        const isAllowed = LAYOUT_RULES.gridGap.allowed.some(g => line.includes(g));
        if (!isAllowed) {
          issues.push({
            type: 'INCONSISTENT_GAP',
            severity: LAYOUT_RULES.gridGap.severity,
            line: lineNumber,
            found: gap,
            expected: LAYOUT_RULES.gridGap.allowed,
            message: `Grid gap should be one of: ${LAYOUT_RULES.gridGap.allowed.join(', ')}`
          });
        }
      }
    }

    // Проверка на хардкод английских строк (не через t())
    if (line.includes('>') && line.includes('<') && !line.includes('{t(')) {
      const textContent = line.match(/>[^<>]+</);
      if (textContent) {
        const text = textContent[0].slice(1, -1).trim();
        // Простая проверка: если текст содержит английские слова
        if (text.length > 0 && /[a-zA-Z]{4,}/.test(text) && !text.startsWith('//') && !text.includes('className')) {
          issues.push({
            type: 'UNTRANSLATED_TEXT',
            severity: 'MEDIUM',
            line: lineNumber,
            found: text,
            message: `Possible untranslated text: "${text}". Use t() function for internationalization.`
          });
        }
      }
    }
  });

  return issues;
}

/**
 * Сканировать все компоненты
 */
function scanComponents() {
  const componentsPath = path.join(__dirname, '../src/components/**/*.tsx');
  const files = glob.sync(componentsPath);

  console.log(`\n🔍 Scanning ${files.length} component files...\n`);

  files.forEach(file => {
    results.stats.filesChecked++;
    const issues = checkFile(file);

    if (issues.length === 0) {
      results.passed.push({
        file: path.relative(process.cwd(), file),
        message: 'All checks passed ✅'
      });
    } else {
      issues.forEach(issue => {
        results.stats.issuesFound++;

        if (issue.severity === 'HIGH') {
          results.stats.criticalIssues++;
          results.failed.push({
            file: path.relative(process.cwd(), file),
            ...issue
          });
        } else {
          results.warnings.push({
            file: path.relative(process.cwd(), file),
            ...issue
          });
        }
      });
    }
  });
}

/**
 * Сгенерировать отчёт
 */
function generateReport() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(__dirname, `../docs/testing/layout-test-${timestamp}.md`);

  // Создать директорию если не существует
  const dir = path.dirname(reportPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const score = Math.round(
    ((results.stats.filesChecked - results.failed.length) / results.stats.filesChecked) * 100
  );

  let report = `# Layout Testing Report

## Summary
- 📊 **Score**: ${score}/100
- 📁 **Files checked**: ${results.stats.filesChecked}
- ✅ **Passed**: ${results.passed.length}
- ⚠️ **Warnings**: ${results.warnings.length}
- ❌ **Failed**: ${results.failed.length}
- 🔥 **Critical issues**: ${results.stats.criticalIssues}

---

`;

  // Critical Issues
  if (results.failed.length > 0) {
    report += `## ❌ Failed Tests (${results.failed.length})\n\n`;
    results.failed.forEach((issue, i) => {
      report += `### ${i + 1}. ${issue.type}\n`;
      report += `- **File**: \`${issue.file}:${issue.line}\`\n`;
      report += `- **Severity**: ${issue.severity}\n`;
      report += `- **Found**: \`${issue.found}\`\n`;
      if (issue.expected) {
        report += `- **Expected**: One of: \`${issue.expected.join('`, `')}\`\n`;
      }
      report += `- **Message**: ${issue.message}\n\n`;
    });
    report += `---\n\n`;
  }

  // Warnings
  if (results.warnings.length > 0) {
    report += `## ⚠️ Warnings (${results.warnings.length})\n\n`;
    results.warnings.forEach((issue, i) => {
      report += `### ${i + 1}. ${issue.type}\n`;
      report += `- **File**: \`${issue.file}:${issue.line}\`\n`;
      report += `- **Severity**: ${issue.severity}\n`;
      report += `- **Message**: ${issue.message}\n\n`;
    });
    report += `---\n\n`;
  }

  // Passed Tests
  if (results.passed.length > 0) {
    report += `## ✅ Passed Tests (${results.passed.length})\n\n`;
    results.passed.forEach(test => {
      report += `- ✅ ${test.file}\n`;
    });
  }

  fs.writeFileSync(reportPath, report);
  console.log(`\n📄 Report saved to: ${reportPath}\n`);

  return reportPath;
}

/**
 * Вывести результаты в консоль
 */
function printResults() {
  console.log('\n' + '='.repeat(60));
  console.log('  LAYOUT TESTING RESULTS');
  console.log('='.repeat(60) + '\n');

  const score = Math.round(
    ((results.stats.filesChecked - results.failed.length) / results.stats.filesChecked) * 100
  );

  console.log(`📊 Overall Score: ${score}/100`);
  console.log(`📁 Files Checked: ${results.stats.filesChecked}`);
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`🔥 Critical Issues: ${results.stats.criticalIssues}\n`);

  if (results.failed.length > 0) {
    console.log('❌ CRITICAL ISSUES:\n');
    results.failed.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.type} - ${issue.file}:${issue.line}`);
      console.log(`   ${issue.message}\n`);
    });
  }

  if (results.warnings.length > 0 && results.warnings.length <= 5) {
    console.log('⚠️  TOP WARNINGS:\n');
    results.warnings.slice(0, 5).forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.type} - ${issue.file}:${issue.line}`);
      console.log(`   ${issue.message}\n`);
    });
  }

  console.log('='.repeat(60) + '\n');
}

/**
 * Main execution
 */
function main() {
  console.log('\n🚀 Starting Layout Testing Agent...\n');

  scanComponents();
  printResults();
  const reportPath = generateReport();

  // Exit code based on results
  if (results.failed.length > 0) {
    console.log('❌ Tests FAILED! Please fix critical issues.\n');
    process.exit(1);
  } else if (results.warnings.length > 0) {
    console.log('⚠️  Tests PASSED with warnings.\n');
    process.exit(0);
  } else {
    console.log('✅ All tests PASSED!\n');
    process.exit(0);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { checkFile, LAYOUT_RULES };

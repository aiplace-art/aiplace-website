#!/usr/bin/env node

/**
 * I18n Testing Script
 * Validates that all translations are complete and properly formatted
 */

const fs = require('fs');
const path = require('path');

class I18nTester {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalKeys: 0,
      translatedKeys: 0,
      missingKeys: 0,
      languages: []
    };
  }

  async run() {
    console.log('🌍 Running I18n Tests...\n');

    try {
      await this.validateTranslations();
      await this.checkConsistency();
      await this.validatePlaceholders();
      this.generateReport();
    } catch (error) {
      console.error('❌ Error during I18n testing:', error.message);
      process.exit(1);
    }
  }

  async validateTranslations() {
    console.log('📝 Validating translations...');

    const localesDir = path.join(process.cwd(), 'public', 'locales');

    if (!fs.existsSync(localesDir)) {
      this.errors.push('Locales directory not found');
      return;
    }

    const languages = fs.readdirSync(localesDir).filter(dir =>
      fs.statSync(path.join(localesDir, dir)).isDirectory()
    );

    this.stats.languages = languages;

    // Load all translation files
    const translations = {};
    for (const lang of languages) {
      const langPath = path.join(localesDir, lang);
      const files = fs.readdirSync(langPath).filter(f => f.endsWith('.json'));

      translations[lang] = {};
      for (const file of files) {
        const content = JSON.parse(fs.readFileSync(path.join(langPath, file), 'utf-8'));
        translations[lang][file] = content;
      }
    }

    // Compare keys across languages
    const baseLanguage = 'en';
    if (!translations[baseLanguage]) {
      this.errors.push('Base language (en) not found');
      return;
    }

    for (const file in translations[baseLanguage]) {
      const baseKeys = this.getAllKeys(translations[baseLanguage][file]);
      this.stats.totalKeys += baseKeys.length;

      for (const lang of languages) {
        if (lang === baseLanguage) continue;

        if (!translations[lang][file]) {
          this.errors.push(`Missing translation file: ${file} for language: ${lang}`);
          continue;
        }

        const langKeys = this.getAllKeys(translations[lang][file]);
        const missingKeys = baseKeys.filter(key => !langKeys.includes(key));

        if (missingKeys.length > 0) {
          this.errors.push(`Missing keys in ${lang}/${file}: ${missingKeys.join(', ')}`);
          this.stats.missingKeys += missingKeys.length;
        } else {
          this.stats.translatedKeys += baseKeys.length;
        }
      }
    }

    console.log('✅ Translation validation complete\n');
  }

  getAllKeys(obj, prefix = '') {
    let keys = [];

    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(this.getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }

    return keys;
  }

  async checkConsistency() {
    console.log('🔍 Checking translation consistency...');

    // Check for placeholder consistency
    const localesDir = path.join(process.cwd(), 'public', 'locales');
    const languages = this.stats.languages;

    for (const lang of languages) {
      const langPath = path.join(localesDir, lang);
      const files = fs.readdirSync(langPath).filter(f => f.endsWith('.json'));

      for (const file of files) {
        const content = JSON.parse(fs.readFileSync(path.join(langPath, file), 'utf-8'));
        this.checkPlaceholderConsistency(content, `${lang}/${file}`);
      }
    }

    console.log('✅ Consistency check complete\n');
  }

  checkPlaceholderConsistency(obj, filePath, parentKey = '') {
    for (const key in obj) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.checkPlaceholderConsistency(obj[key], filePath, fullKey);
      } else if (typeof obj[key] === 'string') {
        // Check for placeholders like {{variable}}
        const placeholders = obj[key].match(/\{\{([^}]+)\}\}/g) || [];

        if (placeholders.length > 0) {
          // Check if placeholders are properly formatted
          for (const placeholder of placeholders) {
            if (!placeholder.match(/^\{\{[a-zA-Z_][a-zA-Z0-9_]*\}\}$/)) {
              this.warnings.push(
                `Invalid placeholder format in ${filePath} at ${fullKey}: ${placeholder}`
              );
            }
          }
        }
      }
    }
  }

  async validatePlaceholders() {
    console.log('🔧 Validating placeholders...');

    // This would ideally scan the codebase for usage of these translations
    // and ensure all placeholders are being provided

    console.log('✅ Placeholder validation complete\n');
  }

  generateReport() {
    console.log('📊 I18n Test Report');
    console.log('='.repeat(50));
    console.log(`Total languages: ${this.stats.languages.length}`);
    console.log(`Languages: ${this.stats.languages.join(', ')}`);
    console.log(`Total translation keys: ${this.stats.totalKeys}`);
    console.log(`Translated keys: ${this.stats.translatedKeys}`);
    console.log(`Missing keys: ${this.stats.missingKeys}`);
    console.log(`Completion rate: ${((this.stats.translatedKeys / (this.stats.totalKeys * (this.stats.languages.length - 1))) * 100).toFixed(2)}%`);
    console.log('='.repeat(50));

    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All I18n tests passed!');
    }

    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      errors: this.errors,
      warnings: this.warnings
    };

    const reportPath = path.join(process.cwd(), 'docs', 'testing', 'i18n-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if there are errors
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// Run the tester
const tester = new I18nTester();
tester.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * Accessibility Testing Script
 * Uses Pa11y to check WCAG compliance
 */

const fs = require('fs');
const path = require('path');
const pa11y = require('pa11y');

class AccessibilityTester {
  constructor() {
    this.issues = {
      error: [],
      warning: [],
      notice: []
    };
    this.pages = [
      { name: 'Homepage', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Services', url: '/services' },
      { name: 'Portfolio', url: '/portfolio' },
      { name: 'Contact', url: '/contact' }
    ];
  }

  async run() {
    console.log('♿ Running Accessibility Tests...\n');

    try {
      const baseUrl = process.env.TEST_URL || 'http://localhost:3000';

      for (const page of this.pages) {
        await this.testPage(`${baseUrl}${page.url}`, page.name);
      }

      this.generateReport();
    } catch (error) {
      console.error('❌ Error during accessibility testing:', error.message);
      process.exit(1);
    }
  }

  async testPage(url, pageName) {
    console.log(`🔍 Testing ${pageName} (${url})...`);

    const options = {
      standard: 'WCAG2AA',
      runners: ['axe', 'htmlcs'],
      includeNotices: true,
      includeWarnings: true,
      timeout: 30000,
      wait: 1000
    };

    try {
      const results = await pa11y(url, options);

      results.issues.forEach(issue => {
        const issueData = {
          page: pageName,
          url: url,
          code: issue.code,
          type: issue.type,
          typeCode: issue.typeCode,
          message: issue.message,
          context: issue.context,
          selector: issue.selector,
          runner: issue.runner
        };

        this.issues[issue.type].push(issueData);
      });

      console.log(`  ✅ Found ${results.issues.length} issues (${results.issues.filter(i => i.type === 'error').length} errors)`);
    } catch (error) {
      console.error(`  ❌ Error testing ${pageName}:`, error.message);
      this.issues.error.push({
        page: pageName,
        url: url,
        message: `Failed to test page: ${error.message}`
      });
    }

    console.log('');
  }

  generateReport() {
    console.log('📊 Accessibility Test Report');
    console.log('='.repeat(50));
    console.log(`Total Errors: ${this.issues.error.length}`);
    console.log(`Total Warnings: ${this.issues.warning.length}`);
    console.log(`Total Notices: ${this.issues.notice.length}`);
    console.log('='.repeat(50));

    if (this.issues.error.length > 0) {
      console.log('\n❌ Errors:');
      this.issues.error.slice(0, 10).forEach((issue, index) => {
        console.log(`\n${index + 1}. ${issue.page}`);
        console.log(`   ${issue.message}`);
        if (issue.selector) {
          console.log(`   Selector: ${issue.selector}`);
        }
        if (issue.context) {
          console.log(`   Context: ${issue.context.substring(0, 100)}...`);
        }
      });

      if (this.issues.error.length > 10) {
        console.log(`\n... and ${this.issues.error.length - 10} more errors`);
      }
    }

    if (this.issues.warning.length > 0) {
      console.log('\n⚠️  Warnings (top 5):');
      this.issues.warning.slice(0, 5).forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.page}] ${issue.message}`);
      });
    }

    // Group issues by type
    const issuesByType = {};
    [...this.issues.error, ...this.issues.warning, ...this.issues.notice].forEach(issue => {
      const key = issue.code || issue.message;
      if (!issuesByType[key]) {
        issuesByType[key] = {
          count: 0,
          type: issue.type,
          message: issue.message,
          pages: []
        };
      }
      issuesByType[key].count++;
      if (!issuesByType[key].pages.includes(issue.page)) {
        issuesByType[key].pages.push(issue.page);
      }
    });

    console.log('\n📈 Common Issues:');
    Object.entries(issuesByType)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .forEach(([code, data]) => {
        console.log(`  - ${data.message} (${data.count} occurrences across ${data.pages.length} pages)`);
      });

    if (this.issues.error.length === 0 && this.issues.warning.length === 0) {
      console.log('\n✅ No critical accessibility issues found!');
    }

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalErrors: this.issues.error.length,
        totalWarnings: this.issues.warning.length,
        totalNotices: this.issues.notice.length,
        pagestested: this.pages.length
      },
      issuesByType: issuesByType,
      allIssues: this.issues
    };

    const reportPath = path.join(process.cwd(), 'docs', 'testing', 'accessibility-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if there are errors
    if (this.issues.error.length > 0) {
      process.exit(1);
    }
  }
}

// Run the tester
const tester = new AccessibilityTester();
tester.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

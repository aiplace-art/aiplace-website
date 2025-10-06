#!/usr/bin/env node

/**
 * Test Report Generator
 * Combines all test results into a comprehensive dashboard
 */

const fs = require('fs');
const path = require('path');

class ReportGenerator {
  constructor() {
    this.reports = {
      layout: null,
      i18n: null,
      performance: null,
      accessibility: null
    };
  }

  async run() {
    console.log('📊 Generating Comprehensive Test Report...\n');

    try {
      this.loadReports();
      this.generateHtmlReport();
      this.generateMarkdownSummary();
      console.log('✅ Reports generated successfully!');
    } catch (error) {
      console.error('❌ Error generating reports:', error.message);
      process.exit(1);
    }
  }

  loadReports() {
    const testingDir = path.join(process.cwd(), 'docs', 'testing');

    // Load each report if it exists
    const reportFiles = {
      layout: 'layout-report.json',
      i18n: 'i18n-report.json',
      performance: 'performance-report.json',
      accessibility: 'accessibility-report.json'
    };

    for (const [key, filename] of Object.entries(reportFiles)) {
      const filePath = path.join(testingDir, filename);
      if (fs.existsSync(filePath)) {
        this.reports[key] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`✅ Loaded ${key} report`);
      } else {
        console.log(`⚠️  ${key} report not found`);
      }
    }
  }

  generateHtmlReport() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AiPlace Testing Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 2.5em;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
    .timestamp {
      background: #f0f0f0;
      padding: 10px 20px;
      border-radius: 10px;
      display: inline-block;
      margin-bottom: 30px;
      font-size: 0.9em;
      color: #666;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card h3 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 1.3em;
    }
    .score {
      font-size: 3em;
      font-weight: bold;
      margin: 10px 0;
    }
    .score.good { color: #10b981; }
    .score.warning { color: #f59e0b; }
    .score.error { color: #ef4444; }
    .metric {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .metric:last-child { border-bottom: none; }
    .section {
      margin-bottom: 40px;
    }
    .section h2 {
      color: #667eea;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #667eea;
    }
    .issue {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
    }
    .warning {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
    }
    .success {
      background: #f0fdf4;
      border-left: 4px solid #10b981;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
      margin-left: 10px;
    }
    .badge.pass { background: #d1fae5; color: #065f46; }
    .badge.fail { background: #fee2e2; color: #991b1b; }
    .badge.warn { background: #fef3c7; color: #92400e; }
    footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧪 AiPlace Testing Dashboard</h1>
    <p class="subtitle">Comprehensive automated testing results</p>
    <div class="timestamp">
      Last updated: ${new Date().toLocaleString()}
    </div>

    <!-- Score Cards -->
    <div class="grid">
      ${this.generateScoreCard('Performance', this.reports.performance?.scores?.performance)}
      ${this.generateScoreCard('Accessibility', this.reports.accessibility?.summary?.totalErrors === 0 ? 100 : 0)}
      ${this.generateScoreCard('I18n Coverage', this.reports.i18n?.stats ? Math.round((this.reports.i18n.stats.translatedKeys / (this.reports.i18n.stats.totalKeys * (this.reports.i18n.stats.languages.length - 1))) * 100) : null)}
      ${this.generateScoreCard('Layout', this.reports.layout?.summary?.totalErrors === 0 ? 100 : 0)}
    </div>

    ${this.generatePerformanceSection()}
    ${this.generateAccessibilitySection()}
    ${this.generateI18nSection()}
    ${this.generateLayoutSection()}

    <footer>
      <p>Generated by AiPlace Continuous Testing Agent</p>
      <p style="margin-top: 5px; font-size: 0.9em;">Automated testing infrastructure for quality assurance</p>
    </footer>
  </div>
</body>
</html>`;

    const reportPath = path.join(process.cwd(), 'docs', 'testing', 'dashboard.html');
    fs.writeFileSync(reportPath, html);
    console.log(`📄 HTML report saved to: ${reportPath}`);
  }

  generateScoreCard(title, score) {
    if (score === null || score === undefined) {
      return `
      <div class="card">
        <h3>${title}</h3>
        <div class="score">-</div>
        <p>No data available</p>
      </div>`;
    }

    const scoreClass = score >= 90 ? 'good' : score >= 70 ? 'warning' : 'error';
    return `
      <div class="card">
        <h3>${title}</h3>
        <div class="score ${scoreClass}">${score}</div>
        <p>${this.getScoreLabel(score)}</p>
      </div>`;
  }

  getScoreLabel(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 50) return 'Needs Improvement';
    return 'Critical';
  }

  generatePerformanceSection() {
    if (!this.reports.performance) return '';

    const { scores, metrics } = this.reports.performance;
    return `
    <div class="section">
      <h2>⚡ Performance Metrics</h2>
      <div class="grid">
        <div class="card">
          <h3>Core Web Vitals</h3>
          <div class="metric">
            <span>First Contentful Paint</span>
            <strong>${Math.round(metrics.firstContentfulPaint)}ms</strong>
          </div>
          <div class="metric">
            <span>Largest Contentful Paint</span>
            <strong>${Math.round(metrics.largestContentfulPaint)}ms</strong>
          </div>
          <div class="metric">
            <span>Cumulative Layout Shift</span>
            <strong>${metrics.cumulativeLayoutShift.toFixed(3)}</strong>
          </div>
          <div class="metric">
            <span>Total Blocking Time</span>
            <strong>${Math.round(metrics.totalBlockingTime)}ms</strong>
          </div>
        </div>
        <div class="card">
          <h3>Lighthouse Scores</h3>
          <div class="metric">
            <span>Performance</span>
            <strong>${scores.performance}/100</strong>
          </div>
          <div class="metric">
            <span>Best Practices</span>
            <strong>${scores.bestPractices}/100</strong>
          </div>
          <div class="metric">
            <span>SEO</span>
            <strong>${scores.seo}/100</strong>
          </div>
        </div>
      </div>
    </div>`;
  }

  generateAccessibilitySection() {
    if (!this.reports.accessibility) return '';

    const { summary, issuesByType } = this.reports.accessibility;
    const topIssues = Object.entries(issuesByType || {})
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5);

    return `
    <div class="section">
      <h2>♿ Accessibility</h2>
      <div class="grid">
        <div class="card">
          <h3>Summary</h3>
          <div class="metric">
            <span>Errors</span>
            <strong class="${summary.totalErrors === 0 ? 'good' : 'error'}">${summary.totalErrors}</strong>
          </div>
          <div class="metric">
            <span>Warnings</span>
            <strong>${summary.totalWarnings}</strong>
          </div>
          <div class="metric">
            <span>Pages Tested</span>
            <strong>${summary.pagesTest ed}</strong>
          </div>
        </div>
      </div>
      ${topIssues.length > 0 ? `
      <div style="margin-top: 20px;">
        <h3>Common Issues:</h3>
        ${topIssues.map(([_, data]) => `
          <div class="issue ${data.type === 'error' ? '' : 'warning'}">
            <strong>${data.message}</strong>
            <p style="margin-top: 5px; font-size: 0.9em;">
              ${data.count} occurrences across ${data.pages.length} pages
            </p>
          </div>
        `).join('')}
      </div>` : ''}
    </div>`;
  }

  generateI18nSection() {
    if (!this.reports.i18n) return '';

    const { stats, errors } = this.reports.i18n;
    return `
    <div class="section">
      <h2>🌍 Internationalization</h2>
      <div class="card">
        <h3>Translation Coverage</h3>
        <div class="metric">
          <span>Languages</span>
          <strong>${stats.languages.join(', ')}</strong>
        </div>
        <div class="metric">
          <span>Total Keys</span>
          <strong>${stats.totalKeys}</strong>
        </div>
        <div class="metric">
          <span>Missing Keys</span>
          <strong class="${stats.missingKeys === 0 ? 'good' : 'error'}">${stats.missingKeys}</strong>
        </div>
        <div class="metric">
          <span>Completion Rate</span>
          <strong>${((stats.translatedKeys / (stats.totalKeys * (stats.languages.length - 1))) * 100).toFixed(2)}%</strong>
        </div>
      </div>
      ${errors.length > 0 ? `
      <div style="margin-top: 20px;">
        <h3>Issues:</h3>
        ${errors.slice(0, 5).map(error => `
          <div class="issue">${error}</div>
        `).join('')}
      </div>` : ''}
    </div>`;
  }

  generateLayoutSection() {
    if (!this.reports.layout) return '';

    const { summary } = this.reports.layout;
    return `
    <div class="section">
      <h2>📐 Layout Validation</h2>
      <div class="card">
        <h3>Structure Check</h3>
        <div class="metric">
          <span>Files Validated</span>
          <strong>${summary.filesValidated}</strong>
        </div>
        <div class="metric">
          <span>Errors</span>
          <strong class="${summary.totalErrors === 0 ? 'good' : 'error'}">${summary.totalErrors}</strong>
        </div>
        <div class="metric">
          <span>Warnings</span>
          <strong>${summary.totalWarnings}</strong>
        </div>
      </div>
    </div>`;
  }

  generateMarkdownSummary() {
    const summary = `# Test Results Summary

**Generated:** ${new Date().toLocaleString()}

## Overall Status

${this.reports.performance ? `### Performance: ${this.reports.performance.scores.performance}/100` : '### Performance: No data'}
${this.reports.accessibility ? `### Accessibility: ${this.reports.accessibility.summary.totalErrors === 0 ? '✅ Pass' : '❌ Fail'}` : '### Accessibility: No data'}
${this.reports.i18n ? `### I18n: ${this.reports.i18n.stats.missingKeys === 0 ? '✅ Pass' : '⚠️ Warnings'}` : '### I18n: No data'}
${this.reports.layout ? `### Layout: ${this.reports.layout.summary.totalErrors === 0 ? '✅ Pass' : '❌ Fail'}` : '### Layout: No data'}

## Details

${this.generateMarkdownPerformance()}
${this.generateMarkdownAccessibility()}
${this.generateMarkdownI18n()}
${this.generateMarkdownLayout()}

---

*Automated report generated by AiPlace Testing Infrastructure*
`;

    const summaryPath = path.join(process.cwd(), 'docs', 'testing', 'SUMMARY.md');
    fs.writeFileSync(summaryPath, summary);
    console.log(`📄 Markdown summary saved to: ${summaryPath}`);
  }

  generateMarkdownPerformance() {
    if (!this.reports.performance) return '';
    const { scores, metrics } = this.reports.performance;
    return `
### Performance Metrics

- **Performance Score:** ${scores.performance}/100
- **FCP:** ${Math.round(metrics.firstContentfulPaint)}ms
- **LCP:** ${Math.round(metrics.largestContentfulPaint)}ms
- **CLS:** ${metrics.cumulativeLayoutShift.toFixed(3)}
- **TBT:** ${Math.round(metrics.totalBlockingTime)}ms
`;
  }

  generateMarkdownAccessibility() {
    if (!this.reports.accessibility) return '';
    const { summary } = this.reports.accessibility;
    return `
### Accessibility

- **Errors:** ${summary.totalErrors}
- **Warnings:** ${summary.totalWarnings}
- **Pages Tested:** ${summary.pagesTest ed}
`;
  }

  generateMarkdownI18n() {
    if (!this.reports.i18n) return '';
    const { stats } = this.reports.i18n;
    return `
### Internationalization

- **Languages:** ${stats.languages.join(', ')}
- **Total Keys:** ${stats.totalKeys}
- **Missing Keys:** ${stats.missingKeys}
- **Coverage:** ${((stats.translatedKeys / (stats.totalKeys * (stats.languages.length - 1))) * 100).toFixed(2)}%
`;
  }

  generateMarkdownLayout() {
    if (!this.reports.layout) return '';
    const { summary } = this.reports.layout;
    return `
### Layout

- **Files Validated:** ${summary.filesValidated}
- **Errors:** ${summary.totalErrors}
- **Warnings:** ${summary.totalWarnings}
`;
  }
}

// Run the generator
const generator = new ReportGenerator();
generator.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

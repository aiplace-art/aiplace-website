#!/usr/bin/env node

/**
 * Performance Testing Script
 * Uses Lighthouse to monitor website performance metrics
 */

const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

class PerformanceTester {
  constructor() {
    this.thresholds = {
      performance: 90,
      accessibility: 90,
      bestPractices: 85,
      seo: 90,
      firstContentfulPaint: 1800,
      largestContentfulPaint: 2500,
      cumulativeLayoutShift: 0.1,
      totalBlockingTime: 200,
      speedIndex: 3400
    };
    this.results = {};
  }

  async run() {
    console.log('⚡ Running Performance Tests...\n');

    try {
      const url = process.env.TEST_URL || 'http://localhost:3000';
      console.log(`Testing URL: ${url}\n`);

      await this.runLighthouse(url);
      this.analyzeResults();
      this.generateReport();
    } catch (error) {
      console.error('❌ Error during performance testing:', error.message);
      process.exit(1);
    }
  }

  async runLighthouse(url) {
    console.log('🚀 Running Lighthouse audit...');

    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
    });

    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1
      }
    };

    try {
      const runnerResult = await lighthouse(url, options);
      this.results = runnerResult.lhr;

      console.log('✅ Lighthouse audit complete\n');
    } finally {
      await chrome.kill();
    }
  }

  analyzeResults() {
    console.log('📊 Analyzing results...\n');

    const categories = this.results.categories;
    const audits = this.results.audits;

    this.scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100)
    };

    this.metrics = {
      firstContentfulPaint: audits['first-contentful-paint'].numericValue,
      largestContentfulPaint: audits['largest-contentful-paint'].numericValue,
      cumulativeLayoutShift: audits['cumulative-layout-shift'].numericValue,
      totalBlockingTime: audits['total-blocking-time'].numericValue,
      speedIndex: audits['speed-index'].numericValue,
      timeToInteractive: audits['interactive'].numericValue
    };

    this.issues = [];
    this.recommendations = [];

    // Check against thresholds
    for (const [key, value] of Object.entries(this.scores)) {
      if (value < this.thresholds[key]) {
        this.issues.push(`${key} score (${value}) is below threshold (${this.thresholds[key]})`);
      }
    }

    for (const [key, value] of Object.entries(this.metrics)) {
      if (this.thresholds[key] && value > this.thresholds[key]) {
        this.issues.push(`${key} (${Math.round(value)}ms) exceeds threshold (${this.thresholds[key]}ms)`);
      }
    }

    // Gather recommendations
    for (const auditKey in audits) {
      const audit = audits[auditKey];
      if (audit.score !== null && audit.score < 0.9 && audit.details) {
        this.recommendations.push({
          title: audit.title,
          description: audit.description,
          score: Math.round(audit.score * 100)
        });
      }
    }
  }

  generateReport() {
    console.log('📊 Performance Test Report');
    console.log('='.repeat(50));
    console.log('Scores:');
    console.log(`  Performance: ${this.scores.performance}/100`);
    console.log(`  Accessibility: ${this.scores.accessibility}/100`);
    console.log(`  Best Practices: ${this.scores.bestPractices}/100`);
    console.log(`  SEO: ${this.scores.seo}/100`);
    console.log('\nMetrics:');
    console.log(`  First Contentful Paint: ${Math.round(this.metrics.firstContentfulPaint)}ms`);
    console.log(`  Largest Contentful Paint: ${Math.round(this.metrics.largestContentfulPaint)}ms`);
    console.log(`  Cumulative Layout Shift: ${this.metrics.cumulativeLayoutShift.toFixed(3)}`);
    console.log(`  Total Blocking Time: ${Math.round(this.metrics.totalBlockingTime)}ms`);
    console.log(`  Speed Index: ${Math.round(this.metrics.speedIndex)}ms`);
    console.log(`  Time to Interactive: ${Math.round(this.metrics.timeToInteractive)}ms`);
    console.log('='.repeat(50));

    if (this.issues.length > 0) {
      console.log('\n⚠️  Issues Found:');
      this.issues.forEach(issue => console.log(`  - ${issue}`));
    }

    if (this.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.recommendations.slice(0, 5).forEach(rec => {
        console.log(`  - ${rec.title} (Score: ${rec.score})`);
      });
    }

    if (this.issues.length === 0) {
      console.log('\n✅ All performance metrics meet thresholds!');
    }

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      scores: this.scores,
      metrics: this.metrics,
      issues: this.issues,
      recommendations: this.recommendations,
      fullResults: this.results
    };

    const reportPath = path.join(process.cwd(), 'docs', 'testing', 'performance-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if there are critical issues
    if (this.issues.length > 0) {
      process.exit(1);
    }
  }
}

// Run the tester
const tester = new PerformanceTester();
tester.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

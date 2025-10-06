# AiPlace Testing Documentation

Comprehensive automated testing infrastructure for quality assurance.

## Overview

This testing infrastructure provides continuous monitoring and validation of:

- **Layout Validation**: Component structure and file organization
- **Internationalization (I18n)**: Translation completeness and consistency
- **Visual/E2E Testing**: User interface and functionality
- **Performance**: Lighthouse metrics and Core Web Vitals
- **Accessibility**: WCAG 2.0 AA compliance

## Quick Start

### Run All Tests

```bash
npm test
# or
npm run test:all
```

### Run Individual Test Suites

```bash
# Layout validation
npm run test:layout

# Translation validation
npm run test:i18n

# Visual/E2E tests with Playwright
npm run test:visual

# Performance tests with Lighthouse
npm run test:performance

# Accessibility tests with Pa11y
npm run test:accessibility
```

### Continuous Testing

```bash
# Watch mode - runs tests on file changes
npm run test:watch

# Quick tests (layout + i18n only)
npm run test:quick

# Generate comprehensive report
npm run test:report
```

## Test Suites

### 1. Layout Validation

**Purpose**: Ensures component files are properly structured and maintainable.

**What it checks**:
- File size limits (max 500 lines)
- Import statement organization
- Component structure
- Module boundaries

**Run**: `npm run test:layout`

**Output**: `/docs/testing/layout-report.json`

### 2. I18n Testing

**Purpose**: Validates all translations are complete and consistent.

**What it checks**:
- Translation completeness across all languages
- Missing translation keys
- Placeholder consistency
- File structure

**Supported Languages**:
- English (en) - Base language
- Spanish (es)
- French (fr)

**Run**: `npm run test:i18n`

**Output**: `/docs/testing/i18n-report.json`

### 3. Visual/E2E Testing

**Purpose**: Tests user interface and interactions across browsers and devices.

**Test Coverage**:
- Homepage layout and responsiveness
- Services section display
- Portfolio grid functionality
- Language switching
- Mobile/tablet viewports

**Browsers Tested**:
- Chrome (Desktop & Mobile)
- Firefox
- Safari/WebKit (Desktop & Mobile)
- iPad

**Run**: `npm run test:visual`

**Output**:
- `/docs/testing/playwright-report/` (HTML report)
- `/docs/testing/playwright-results.json`

### 4. Performance Testing

**Purpose**: Monitors website performance metrics using Lighthouse.

**Metrics Tracked**:
- **Performance Score**: Target 90+
- **First Contentful Paint (FCP)**: Target < 1.8s
- **Largest Contentful Paint (LCP)**: Target < 2.5s
- **Cumulative Layout Shift (CLS)**: Target < 0.1
- **Total Blocking Time (TBT)**: Target < 200ms
- **Speed Index**: Target < 3.4s

**Run**: `npm run test:performance`

**Requirements**: Application must be running (development or production)

**Output**: `/docs/testing/performance-report.json`

### 5. Accessibility Testing

**Purpose**: Ensures WCAG 2.0 AA compliance across all pages.

**Standards**:
- WCAG 2.0 Level AA
- Section 508

**Pages Tested**:
- Homepage (/)
- About (/about)
- Services (/services)
- Portfolio (/portfolio)
- Contact (/contact)

**Run**: `npm run test:accessibility`

**Requirements**: Application must be running

**Output**: `/docs/testing/accessibility-report.json`

## Configuration

### Test Configuration

Edit `test.config.js` to modify thresholds and settings:

```javascript
module.exports = {
  performance: {
    scores: {
      performance: 90,  // Minimum performance score
      accessibility: 90 // Minimum accessibility score
    }
  },
  // ...more configuration
};
```

### Playwright Configuration

Edit `playwright.config.ts` to modify browser settings and test execution:

```typescript
export default defineConfig({
  testDir: './tests/visual',
  timeout: 30 * 1000,
  // ...more configuration
});
```

### Lighthouse Configuration

Edit `.lighthouserc.json` to modify performance testing:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

## Continuous Integration

### GitHub Actions

Two workflows are configured:

#### 1. Continuous Testing (`continuous-testing.yml`)

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual dispatch

**Jobs**:
- Layout validation
- I18n validation
- Visual/E2E tests
- Performance tests
- Accessibility tests
- Report generation

#### 2. Scheduled Testing (`scheduled-testing.yml`)

**Triggers**:
- Every 2 hours (automated)
- Manual dispatch

**Jobs**:
- Comprehensive test suite
- Performance monitoring
- Accessibility monitoring
- Automated issue creation on failures

### View Results

Test results are uploaded as artifacts and can be viewed in:
- GitHub Actions → Workflow Run → Artifacts
- Pull Request comments (automatic)

## Test Reports

### Dashboard

View the comprehensive dashboard at:
- `/docs/testing/dashboard.html`

The dashboard provides:
- Overall scores for all test suites
- Visual charts and metrics
- Issue summaries
- Historical trends

### Individual Reports

Each test suite generates a JSON report in `/docs/testing/`:

- `layout-report.json`
- `i18n-report.json`
- `performance-report.json`
- `accessibility-report.json`
- `playwright-results.json`

### Summary Report

A markdown summary is generated at:
- `/docs/testing/SUMMARY.md`

## Best Practices

### Before Committing

```bash
# Run quick tests
npm run test:quick

# Run all tests if time permits
npm test
```

### During Development

```bash
# Use watch mode for continuous feedback
npm run test:watch
```

### Before Deployment

```bash
# Run full test suite including performance and accessibility
npm run test:all
npm run test:performance
npm run test:accessibility
npm run test:report
```

### Interpreting Results

**Pass Criteria**:
- Layout: 0 errors
- I18n: 0 missing keys
- Visual: All tests passing
- Performance: Score ≥ 90
- Accessibility: 0 errors

**Action on Failure**:
1. Review the specific error message
2. Check the detailed JSON report
3. Fix the issue
4. Re-run tests to verify fix
5. Commit changes

## Troubleshooting

### Tests Failing Locally

**Issue**: Performance or accessibility tests fail

**Solution**: Ensure the application is running:
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:performance
```

### Playwright Installation Issues

**Issue**: Browser binaries not found

**Solution**: Install Playwright browsers:
```bash
npx playwright install
```

### Port Already in Use

**Issue**: Cannot start test server

**Solution**: Kill existing processes:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill

# Or change port in playwright.config.ts
```

### Out of Memory

**Issue**: Tests crash with memory errors

**Solution**: Increase Node memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm test
```

## Maintenance

### Updating Thresholds

As performance improves, update thresholds in:
- `test.config.js`
- `.lighthouserc.json`
- `playwright.config.ts`

### Adding New Tests

1. Create test file in appropriate directory
2. Follow existing naming conventions
3. Add to test:all script if needed
4. Update documentation

### Adding New Languages

1. Add language files to `/public/locales/[lang]/`
2. Update `test.config.js` → `i18n.requiredLanguages`
3. Run `npm run test:i18n` to verify

## Support

For issues or questions:
- Check GitHub Issues
- Review workflow logs
- Consult individual test suite documentation

## Metrics

Target metrics for production:

| Metric | Target | Critical |
|--------|--------|----------|
| Performance Score | ≥90 | ≥80 |
| Accessibility Score | ≥90 | ≥85 |
| I18n Coverage | 100% | ≥95% |
| Layout Errors | 0 | 0 |
| Visual Test Pass Rate | 100% | ≥95% |

---

**Version**: 1.0.0
**Last Updated**: 2025-10-06
**Maintained By**: Testing Agent

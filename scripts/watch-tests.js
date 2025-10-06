#!/usr/bin/env node

/**
 * Continuous Test Watcher
 * Monitors file changes and runs appropriate tests
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestWatcher {
  constructor() {
    this.lastRun = {};
    this.debounceTimeout = null;
    this.isRunning = false;
  }

  async run() {
    console.log('👀 Starting Continuous Test Watcher...\n');
    console.log('Monitoring for changes in:');
    console.log('  - /src');
    console.log('  - /public');
    console.log('  - /components\n');

    this.watchDirectories();
  }

  watchDirectories() {
    const watchPaths = [
      path.join(process.cwd(), 'src'),
      path.join(process.cwd(), 'public'),
    ];

    watchPaths.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.watch(dir, { recursive: true }, (eventType, filename) => {
          if (filename) {
            this.handleFileChange(path.join(dir, filename));
          }
        });
        console.log(`✅ Watching: ${dir}`);
      }
    });

    console.log('\n🚀 Watcher started. Press Ctrl+C to stop.\n');
  }

  handleFileChange(filePath) {
    if (this.isRunning) {
      console.log('⏳ Tests are running, change queued...');
      return;
    }

    // Debounce file changes
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.runAppropriateTests(filePath);
    }, 500);
  }

  async runAppropriateTests(filePath) {
    const ext = path.extname(filePath);
    const relativePath = path.relative(process.cwd(), filePath);

    console.log(`📝 Change detected: ${relativePath}`);

    // Determine which tests to run based on file type
    const tests = this.getTestsForFile(filePath, ext);

    if (tests.length === 0) {
      console.log('  ℹ️  No tests needed for this file type\n');
      return;
    }

    this.isRunning = true;
    console.log(`  🧪 Running: ${tests.join(', ')}\n`);

    for (const test of tests) {
      await this.runTest(test);
    }

    this.isRunning = false;
    console.log('✅ Test run complete\n');
  }

  getTestsForFile(filePath, ext) {
    const tests = [];

    // Component or page files
    if (ext === '.tsx' || ext === '.jsx' || ext === '.ts' || ext === '.js') {
      tests.push('layout');
    }

    // Translation files
    if (filePath.includes('/locales/') && ext === '.json') {
      tests.push('i18n');
    }

    // Style files
    if (ext === '.css' || ext === '.scss' || ext === '.sass') {
      tests.push('layout');
    }

    // Always run quick layout check for any src changes
    if (filePath.includes('/src/') && tests.length === 0) {
      tests.push('layout');
    }

    return tests;
  }

  runTest(testName) {
    return new Promise((resolve, reject) => {
      const testCommands = {
        layout: 'node scripts/test-layout.js',
        i18n: 'node scripts/test-i18n.js'
      };

      const command = testCommands[testName];
      if (!command) {
        resolve();
        return;
      }

      const [cmd, ...args] = command.split(' ');
      const proc = spawn(cmd, args, { stdio: 'inherit', shell: true });

      proc.on('close', (code) => {
        if (code !== 0) {
          console.log(`⚠️  Test ${testName} failed with code ${code}\n`);
        }
        resolve();
      });

      proc.on('error', (error) => {
        console.error(`❌ Error running ${testName}:`, error.message);
        resolve();
      });
    });
  }
}

// Run the watcher
const watcher = new TestWatcher();
watcher.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping test watcher...');
  process.exit(0);
});

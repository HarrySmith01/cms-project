// File: tests/logger-reporter.js
// Description: Jest reporter that writes test lifecycle events to a timestamped log file.
// Created:     2025-07-26T11:00:00+05:30

const fs = require('fs');
const path = require('path');

class LoggerReporter {
  constructor(globalConfig, options) {
    // build a filename with an ISO timestamp safe for filenames
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const dir = path.resolve(process.cwd(), 'logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this.file = path.join(dir, `test-log-${ts}.log`);
    this.stream = fs.createWriteStream(this.file, { flags: 'a' });
  }

  onRunStart(results, options) {
    this.stream.write(
      `\n===== Test run started: ${new Date().toISOString()} =====\n`
    );
  }

  onTestCaseResult(test, testCaseResult) {
    const status = testCaseResult.status.toUpperCase();
    const name = testCaseResult.fullName;
    this.stream.write(`[${new Date().toISOString()}] ${status}: ${name}\n`);
    if (testCaseResult.failureMessages.length) {
      testCaseResult.failureMessages.forEach((msg) => {
        this.stream.write(
          `  FAILURE: ${msg.replace(/\n/g, '\n           ')}\n`
        );
      });
    }
  }

  onRunComplete(contexts, results) {
    this.stream.write(
      `===== Test run finished: ${new Date().toISOString()} =====\n`
    );
    this.stream.end();
  }
}

module.exports = LoggerReporter;

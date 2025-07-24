// File: tests/jest-setup-console.js
// Description: Intercepts all console.* calls and writes them (with timestamps) to a per-run log file.
// Created:     2025-07-26T12:00:00+05:30
// Updated:     2025-07-26T12:00:00+05:30

const fs = require('fs');
const path = require('path');

// make logs dir if needed
const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// timestamped filename
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const logPath = path.join(logDir, `console-${ts}.log`);
const stream = fs.createWriteStream(logPath, { flags: 'a' });

// helper to format args
function formatArgs(args) {
  return args
    .map((a) => {
      if (a instanceof Error) return a.stack;
      if (typeof a === 'object') {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(' ');
}

// patch each method
['log', 'info', 'warn', 'error', 'debug'].forEach((level) => {
  const orig = console[level].bind(console);
  console[level] = (...args) => {
    const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${formatArgs(args)}\n`;
    stream.write(line);
    orig(...args);
  };
});

// when Jest exits, close the stream
process.on('exit', () => stream.end());

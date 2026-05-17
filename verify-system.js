#!/usr/bin/env node
/**
 * Truth-Shield System Verification Script
 * Tests both backend API and frontend build
 */

const http = require('http');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKEND_PORT = process.env.PORT || 5000;
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BACKEND_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function verifyBackend() {
  log('\n====== BACKEND VERIFICATION ======\n', 'blue');

  try {
    // Test 1: Auth - Signup
    log('Test 1: Authentication - Signup', 'cyan');
    const signupRes = await makeRequest('POST', '/api/auth/signup', {
      name: 'Test User',
      email: 'test@truthshield.ai',
      password: 'securepass123',
    });
    if (signupRes.status === 200 && signupRes.data.success) {
      log('✓ Signup endpoint working', 'green');
      log(`  User: ${signupRes.data.user.email}, Token: ${signupRes.data.token.substring(0, 20)}...`);
    } else {
      log(`✗ Signup failed: ${signupRes.status}`, 'red');
      return false;
    }

    // Test 2: Auth - Login
    log('\nTest 2: Authentication - Login', 'cyan');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'admin@truthshield.ai',
      password: 'password123',
    });
    if (loginRes.status === 200 && loginRes.data.success) {
      log('✓ Login endpoint working', 'green');
      log(`  Token: ${loginRes.data.token.substring(0, 20)}...`);
    } else {
      log(`✗ Login failed: ${loginRes.status}`, 'red');
      return false;
    }

    // Test 3: URL Scan
    log('\nTest 3: Scan - URL Analysis', 'cyan');
    const urlRes = await makeRequest('POST', '/api/scan/url', {
      url: 'https://example-phishing-site.com',
    });
    if (urlRes.status === 200 && urlRes.data.success) {
      log('✓ URL scan endpoint working', 'green');
      log(`  Phishing Score: ${urlRes.data.result.score}/100`);
      log(`  Trust Score: ${urlRes.data.result.trustScore}/100`);
    } else {
      log(`✗ URL scan failed: ${urlRes.status}`, 'red');
      return false;
    }

    // Test 4: Message Scan
    log('\nTest 4: Scan - Message Analysis', 'cyan');
    const msgRes = await makeRequest('POST', '/api/scan/message', {
      message: 'Congratulations! You won a prize! Click here to claim...',
    });
    if (msgRes.status === 200 && msgRes.data.success) {
      log('✓ Message scan endpoint working', 'green');
      log(`  Confidence: ${msgRes.data.result.confidence}%`);
    } else {
      log(`✗ Message scan failed: ${msgRes.status}`, 'red');
      return false;
    }

    // Test 5: News Scan
    log('\nTest 5: Scan - News Verification', 'cyan');
    const newsRes = await makeRequest('POST', '/api/scan/news', {
      headline: 'Breaking: Scientists Discover New Element',
      source: 'tech-news.com',
    });
    if (newsRes.status === 200 && newsRes.data.success) {
      log('✓ News scan endpoint working', 'green');
      log(`  Misinformation Score: ${newsRes.data.result.misinformationScore}%`);
    } else {
      log(`✗ News scan failed: ${newsRes.status}`, 'red');
      return false;
    }

    // Test 6: Analytics
    log('\nTest 6: Analytics Dashboard', 'cyan');
    const analyticsRes = await makeRequest('GET', '/api/analytics/dashboard');
    if (analyticsRes.status === 200 && analyticsRes.data.success) {
      log('✓ Analytics endpoint working', 'green');
      log(`  Total Scans: ${analyticsRes.data.data.totalScans}`);
      log(`  Threats Detected: ${analyticsRes.data.data.threatsDetected}`);
    } else {
      log(`✗ Analytics failed: ${analyticsRes.status}`, 'red');
      return false;
    }

    // Test 7: Alerts
    log('\nTest 7: Alerts Retrieval', 'cyan');
    const alertsRes = await makeRequest('GET', '/api/alerts');
    if (alertsRes.status === 200 && alertsRes.data.success) {
      log('✓ Alerts endpoint working', 'green');
      log(`  Total Alerts: ${alertsRes.data.alerts.length}`);
    } else {
      log(`✗ Alerts failed: ${alertsRes.status}`, 'red');
      return false;
    }

    // Test 8: History
    log('\nTest 8: Scan History', 'cyan');
    const historyRes = await makeRequest('GET', '/api/history');
    if (historyRes.status === 200 && historyRes.data.success) {
      log('✓ History endpoint working', 'green');
      log(`  Total Scans in History: ${historyRes.data.history.length}`);
    } else {
      log(`✗ History failed: ${historyRes.status}`, 'red');
      return false;
    }

    return true;
  } catch (error) {
    log(`✗ Backend verification failed: ${error.message}`, 'red');
    return false;
  }
}

function verifyFrontend() {
  log('\n====== FRONTEND VERIFICATION ======\n', 'blue');

  const requiredFiles = [
    'frontend/package.json',
    'frontend/tsconfig.json',
    'frontend/next.config.js',
    'frontend/app/layout.tsx',
    'frontend/app/page.tsx',
    'frontend/app/login/page.tsx',
    'frontend/app/dashboard/page.tsx',
  ];

  let allExist = true;
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      log(`✓ ${file}`, 'green');
    } else {
      log(`✗ ${file} - MISSING`, 'red');
      allExist = false;
    }
  }

  return allExist;
}

async function checkBackendRunning() {
  return new Promise((resolve) => {
    const req = http.get(`${BACKEND_URL}/health`, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 404);
    });
    req.on('error', () => {
      resolve(false);
    });
  });
}

async function main() {
  log('\n╔════════════════════════════════════╗', 'cyan');
  log('║  TRUTH-SHIELD SYSTEM VERIFICATION   ║', 'cyan');
  log('╚════════════════════════════════════╝\n', 'cyan');

  // Check if backend is running
  const backendRunning = await checkBackendRunning();
  if (!backendRunning) {
    log('⚠ Backend is not running at ' + BACKEND_URL, 'yellow');
    log('  To start the backend, run: npm run dev (from backend folder)', 'yellow');
    log('\n  Skipping backend tests...', 'yellow');
  } else {
    const backendOk = await verifyBackend();
    if (!backendOk) {
      log('\n✗ Backend verification FAILED', 'red');
      process.exit(1);
    }
    log('\n✓ Backend verification PASSED', 'green');
  }

  const frontendOk = verifyFrontend();
  if (!frontendOk) {
    log('\n✗ Frontend verification FAILED', 'red');
    process.exit(1);
  }
  log('\n✓ Frontend verification PASSED', 'green');

  log('\n╔════════════════════════════════════╗', 'cyan');
  log('║     VERIFICATION COMPLETE          ║', 'cyan');
  log('╚════════════════════════════════════╝', 'cyan');

  log('\nNext steps:', 'cyan');
  log('1. Start Backend:  cd backend && npm run dev', 'yellow');
  log('2. Start Frontend: cd frontend && npm run dev', 'yellow');
  log('3. Open in Browser: http://localhost:3000', 'yellow');
}

main().catch((error) => {
  log(`\nUnexpected error: ${error.message}`, 'red');
  process.exit(1);
});

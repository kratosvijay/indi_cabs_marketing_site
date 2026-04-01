import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/**
 * Indicabs API QA Test Suite
 * 
 * Covering:
 * 1. Health Check
 * 2. ONDC Compliance (TRV11)
 * 3. Multimodal Planning
 * 4. Edge Cases
 * 5. Performance (Concurrency)
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:8080';
const DEFAULT_CITY = 'std:080';
const DEFAULT_DOMAIN = 'ONDC:TRV11';

const results = {
  passed: [],
  failed: [],
  issues: []
};

async function logResult(name, passed, details = '', time = 0) {
  if (passed) {
    results.passed.push({ name, time, details });
    console.log(`✅ [PASS] ${name} (${time}ms)`);
  } else {
    results.failed.push({ name, details });
    console.log(`❌ [FAIL] ${name}: ${details}`);
  }
}

// ─── 0. Utility ──────────────────────────────────────────────────────────

function createOndcContext(action) {
  return {
    domain: DEFAULT_DOMAIN,
    country: 'IND',
    city: DEFAULT_CITY,
    action,
    core_version: '2.0.0',
    bap_id: 'api.indicabs.net',
    bap_uri: 'https://indicabs.net/ondc',
    transaction_id: uuidv4(),
    message_id: uuidv4(),
    timestamp: new Date().toISOString(),
    ttl: 'PT30S'
  };
}

// ─── 1. Health Check ──────────────────────────────────────────────────────

async function testHealth() {
  const start = Date.now();
  try {
    const res = await axios.get(`${BASE_URL}/ondc/health`);
    const duration = Date.now() - start;
    const isOk = res.status === 200 && res.data.status === 'ok';
    await logResult('Health Check (GET /ondc/health)', isOk, isOk ? '' : `Expected status 200/ok, got ${res.status}/${res.data.status}`, duration);
  } catch (err) {
    await logResult('Health Check (GET /ondc/health)', false, err.message);
  }
}

// ─── 2. ONDC Endpoints ────────────────────────────────────────────────────

async function testOndcEndpoint(action) {
  const start = Date.now();
  const context = createOndcContext(action);
  const payload = {
    context,
    message: {
      intent: {
        fulfillment: {
          stops: [
            { type: 'START', location: { gps: '12.9928,80.2175' } },
            { type: 'END', location: { gps: '13.0827,80.2707' } }
          ]
        }
      }
    }
  };

  try {
    const res = await axios.post(`${BASE_URL}/ondc/${action}`, payload);
    const duration = Date.now() - start;
    
    // Validation
    const hasContext = !!res.data.context;
    const correctAction = res.data.context?.action === action;
    const correctDomain = res.data.context?.domain === DEFAULT_DOMAIN;
    const correctCity = res.data.context?.city === DEFAULT_CITY;
    const fastEnough = duration < 2000;
    
    const errors = [];
    if (!hasContext) errors.push('Missing context');
    if (!correctAction) errors.push(`Wrong action: ${res.data.context?.action}`);
    if (!correctDomain) errors.push(`Wrong domain: ${res.data.context?.domain}`);
    if (!correctCity) errors.push(`Wrong city: ${res.data.context?.city}`);
    if (!fastEnough) errors.push(`Slow response: ${duration}ms`);

    const passed = errors.length === 0;
    await logResult(`ONDC POST /${action}`, passed, errors.join(', '), duration);
  } catch (err) {
    await logResult(`ONDC POST /${action}`, false, err.response?.data?.message || err.message);
  }
}

// ─── 3. Multimodal Planning ───────────────────────────────────────────────

async function testMultimodal() {
  const start = Date.now();
  const payload = {
    source: { lat: 12.9928, lng: 80.2175 },
    destination: { lat: 13.0827, lng: 80.2707 }
  };

  try {
    const res = await axios.post(`${BASE_URL}/multimodal/plan`, payload);
    const duration = Date.now() - start;
    
    const resultsArr = res.data.results || [];
    const hasOptions = resultsArr.length >= 2;
    const allFieldsPresent = resultsArr.every(opt => opt.type && opt.price && opt.eta && opt.route_steps);
    
    const errors = [];
    if (!hasOptions) errors.push(`Expected >= 2 options, got ${resultsArr.length}`);
    if (!allFieldsPresent) errors.push('Missing fields in route options');

    const passed = errors.length === 0;
    await logResult('Multimodal Plan (POST /multimodal/plan)', passed, errors.join(', '), duration);
  } catch (err) {
    await logResult('Multimodal Plan (POST /multimodal/plan)', false, err.message);
  }
}

// ─── 4. Edge Cases ────────────────────────────────────────────────────────

async function testEdgeCases() {
  // Invalid lat/lng
  try {
    const res = await axios.post(`${BASE_URL}/multimodal/plan`, { source: { lat: 'invalid' } });
    await logResult('Edge Case: Invalid lat/lng', res.status >= 400, `Expected 400+, got ${res.status}`);
  } catch (err) {
    await logResult('Edge Case: Invalid lat/lng', err.response?.status >= 400, `Status: ${err.response?.status}`);
  }

  // Missing fields
  try {
    const res = await axios.post(`${BASE_URL}/multimodal/plan`, {});
    await logResult('Edge Case: Empty body', res.status >= 400, `Expected 400+, got ${res.status}`);
  } catch (err) {
    await logResult('Edge Case: Empty body', err.response?.status >= 400, `Status: ${err.response?.status}`);
  }

  // Large payload (>1MB)
  const largeStr = 'a'.repeat(1.2 * 1024 * 1024);
  try {
    const res = await axios.post(`${BASE_URL}/ondc/search`, { data: largeStr });
    await logResult('Edge Case: Large Payload (>1MB)', res.status === 413 || res.status === 400, `Status: ${res.status}`);
  } catch (err) {
    await logResult('Edge Case: Large Payload (>1MB)', err.response?.status === 413 || err.response?.status === 400, `Status: ${err.response?.status}`);
  }
}

// ─── 5. Performance Test ──────────────────────────────────────────────────

async function testPerformance() {
  console.log('⚡ Starting Performance Burst (20 requests)...');
  const payload = {
    source: { lat: 12.9928, lng: 80.2175 },
    destination: { lat: 13.0827, lng: 80.2707 }
  };

  const start = Date.now();
  const promises = Array.from({ length: 20 }).map(() => 
    axios.post(`${BASE_URL}/multimodal/plan`, payload).catch(e => e.response)
  );
  
  const responses = await Promise.all(promises);
  const totalDuration = Date.now() - start;
  
  const allSuccessful = responses.every(res => res?.status === 200);
  const avgTime = totalDuration / 20;

  await logResult('Performance Burst (20 reqs)', allSuccessful, `Avg: ${avgTime.toFixed(2)}ms, Total: ${totalDuration}ms`, totalDuration);
}

// ─── 6. Security & CORS ────────────────────────────────────────────────────

async function testSecurity() {
  try {
    const res = await axios.options(`${BASE_URL}/multimodal/plan`, {
      headers: {
        'Origin': 'https://test-origin.com',
        'Access-Control-Request-Method': 'POST'
      }
    });
    const corsOk = res.headers['access-control-allow-origin'] === '*';
    await logResult('Security: CORS Options', corsOk, `Got origin: ${res.headers['access-control-allow-origin']}`);
  } catch (err) {
    await logResult('Security: CORS Options', false, err.message);
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────

async function runAllTests() {
  console.log(`🚀 Starting Indicabs QA Test Suite against ${BASE_URL}\n`);

  await testHealth();
  
  console.log('\n--- ONDC Endpoints ---');
  const ondcActions = ['search', 'select', 'init', 'confirm', 'status'];
  for (const action of ondcActions) {
    await testOndcEndpoint(action);
  }

  console.log('\n--- Multimodal API ---');
  await testMultimodal();
  
  console.log('\n--- Edge Cases ---');
  await testEdgeCases();

  console.log('\n--- Performance ---');
  await testPerformance();

  console.log('\n--- Security ---');
  await testSecurity();

  console.log('\n--- SUMMARY ---');
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\nFailures:');
    results.failed.forEach(f => console.log(`- ${f.name}: ${f.details}`));
  }
}

runAllTests();

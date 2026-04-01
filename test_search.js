import 'dotenv/config';
import * as ondcService from './api/ondc/services/ondc.service.js';

/**
 * Verification Script
 * 
 * Simulates a search request from the mobile app to verify
 * that the backend correctly signs the request and attempts 
 * to send it to the Gateway.
 */

const mockRequestBody = {
  context: {
    domain: "ONDC:TRV11",
    country: "IND",
    city: "std:044",
    action: "search",
    core_version: "1.0.0",
    bap_id: "api.indicabs.net",
    bap_uri: "https://api.indicabs.net/ondc",
    transaction_id: "test-transaction-" + Date.now(),
    message_id: "test-message-" + Date.now(),
    timestamp: new Date().toISOString(),
    ttl: "PT30S"
  },
  message: {
    intent: {
      fulfillment: {
        stops: [
          {
            type: "START",
            location: { gps: "13.0827,80.2707" }
          },
          {
            type: "END",
            location: { gps: "13.1506,80.3058" }
          }
        ]
      }
    }
  }
};

async function testSearch() {
  console.log('🧪 Starting ONDC Search Test...');
  try {
    const result = await ondcService.handleSearch(mockRequestBody);
    console.log('✅ Test Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  }
}

testSearch();

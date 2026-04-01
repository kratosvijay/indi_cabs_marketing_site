import 'dotenv/config';
import axios from 'axios';

/**
 * Diagnostic Script
 * 
 * Verifies ONDC configuration and connectivity to the Mock Gateway.
 */

async function checkConfig() {
  console.log('🔍 Checking ONDC Configuration...');
  
  const config = {
    GATEWAY_URL: process.env.ONDC_GATEWAY_URL,
    SUBSCRIBER_ID: process.env.ONDC_SUBSCRIBER_ID,
    UNIQUE_KEY_ID: process.env.ONDC_UNIQUE_KEY_ID,
    BAP_ID: process.env.BAP_ID,
    BAP_URI: process.env.BAP_URI,
    HAS_PRIVATE_KEY: !!process.env.ONDC_SIGNING_PRIVATE_KEY
  };

  console.table(config);

  if (!config.GATEWAY_URL || !config.SUBSCRIBER_ID) {
    console.error('❌ Critical configuration missing in .env');
    return;
  }

  console.log('🌐 Testing Gateway Connectivity...');
  try {
    // Try to reach the gateway with a simple GET (might return 404 or 405, but confirms reachability)
    const response = await axios.get(config.GATEWAY_URL).catch(err => err.response);
    if (response) {
      console.log(`✅ Gateway reachable (Status: ${response.status})`);
    } else {
      console.log('⚠️  Gateway reachable but returned no response.');
    }
  } catch (error) {
    console.error('❌ Gateway unreachable:', error.message);
  }
}

checkConfig();

import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import * as ondcService from './api/ondc/services/ondc.service.js';

/**
 * Final ONDC TRV11 Search Test
 * 
 * Target: Official ONDC Pre-production Gateway
 * Version: 2.0.0 (TRV11)
 */

async function runTest() {
  console.log('🧪 Starting Final ONDC TRV11 Search Test...');

  const transactionId = uuidv4();
  const messageId = uuidv4();

  const mockRequestBody = {
    context: {
      domain: "ONDC:TRV11",
      country: "IND",
      city: "std:080",
      action: "search",
      core_version: "2.0.0",
      bap_id: "api.indicabs.net",
      bap_uri: "https://indicabs.net/ondc",
      transaction_id: transactionId,
      message_id: messageId,
      timestamp: new Date().toISOString(),
      ttl: "PT30S"
    },
    message: {
      intent: {
        fulfillment: {
          stops: [
            {
              type: "START",
              location: { gps: "12.9716,77.5946" } // Bangalore MG Road
            },
            {
              type: "END",
              location: { gps: "12.9279,77.6271" } // Bangalore Koramangala
            }
          ]
        },
        provider: {
          id: "pramaan.ondc.org/beta/preprod/mock/seller"
        },
        category: {
          id: "METRO"
        }
      }
    }
  };

  try {
    console.log(`🆔 Transaction ID: ${transactionId}`);
    console.log(`🆔 Message ID: ${messageId}`);
    
    const result = await ondcService.handleSearch(mockRequestBody);
    console.log('✅ Gateway Response:', JSON.stringify(result, null, 2));
    
    if (result.message?.ack?.status === 'ACK') {
      console.log('\n✨ SUCCESS! The search request was accepted by the Gateway.');
      console.log('🔗 Check your Pramaan dashboard to see the search flow update.');
    } else {
      console.log('\n⚠️  Gateway returned NACK. Check the error details above.');
    }
  } catch (error) {
    console.error('\n❌ Test Execution Failed:', error.message);
    if (error.response) {
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

runTest();

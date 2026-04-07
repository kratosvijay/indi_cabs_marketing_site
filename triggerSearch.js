import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import 'dotenv/config';

/**
 * Script to trigger an ONDC /search transaction from a backend service.
 * Updated for TRV11 (New Mobility/Metro) protocol version 2.0.0.
 * Targets the Pramaan mock seller for verification.
 */

async function triggerSearch() {
  const transactionId = uuidv4();
  const messageId = uuidv4();
  const timestamp = new Date().toISOString();

  // Using the generic /search endpoint (the BAP will now forward Pramaan headers)
  const url = 'http://localhost:8081/search';

  // Use values from .env for BAP configuration
  const bapId = process.env.BAP_ID || 'api.indicabs.net';
  const bapUri = process.env.BAP_URI || 'https://indicabs.net/ondc';

  const requestBody = {
    context: {
      domain: "ONDC:TRV11",
      action: "search",
      country: "IND",
      city: "std:044",
      core_version: "2.0.0", // Updated to 2.0.0 for TRV11 compliance
      bap_id: bapId,
      bap_uri: bapUri,
      transaction_id: transactionId,
      message_id: messageId,
      timestamp: timestamp,
      ttl: "PT30S"
    },
    message: {
      intent: {
        fulfillment: {
          stops: [
            {
              type: "START",
              location: {
                gps: "12.9807,80.1643",
                name: "Chennai International Airport"
              }
            },
            {
              type: "END",
              location: {
                gps: "13.0812,80.2709",
                name: "Chennai Central"
              }
            }
          ]
        },
        provider: {
          // Explicitly targeting the Pramaan mock seller
          id: "pramaan.ondc.org/beta/preprod/mock/seller"
        },
        category: {
          id: "METRO"
        }
      }
    }
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  // Include Pramaan tracking headers if found in .env
  if (process.env.PRAMAAN_INTEREST_ID) {
    headers['X-Pramaan-Interest-Id'] = process.env.PRAMAAN_INTEREST_ID;
  }
  if (process.env.PRAMAAN_TEST_RUN_ID) {
    headers['X-Pramaan-Test-Run-Id'] = process.env.PRAMAAN_TEST_RUN_ID;
  }

  console.log('--- Request Payload ---');
  console.log(JSON.stringify(requestBody, null, 2));
  console.log('--- Headers ---');
  console.log(JSON.stringify(headers, null, 2));
  console.log('-----------------------');
  console.log(`Transaction ID used: ${transactionId}`);

  try {
    const response = await axios.post(url, requestBody, { headers });

    console.log('\n--- Server Response ---');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('-----------------------');

    if (response.data?.message?.ack?.status === 'ACK') {
      console.log('\n✅ Success: ONDC search transaction triggered successfully.');
      console.log('🔗 Check your Pramaan dashboard to see the transaction.');
      
      // 💾 Save the ID for the next steps
      fs.writeFileSync('current_tx.json', JSON.stringify({ transaction_id: transactionId }));
      console.log(`   💾 ID [${transactionId}] saved to current_tx.json`);
    } else {
      console.log('\n⚠️ Warning: Server responded but status might not be ACK.');
    }
  } catch (error) {
    console.error('\n❌ Error triggering ONDC search:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error Message:', error.message);
    }
  }
}

triggerSearch();

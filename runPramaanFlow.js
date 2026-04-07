import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import 'dotenv/config';

/**
 * runPramaanFlow.js
 * 
 * End-to-end ONDC journey automation for Pramaan certification.
 * Supports: SJT (Flow 1), RJT (Flow 2)
 */

// Simple argument parser
const getArgs = () => {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.split('=');
      args[key.slice(2)] = value || true;
    }
  });
  return args;
};

// 💾 Attempt to read the current transaction ID from disk
let savedTxId = null;
try {
  if (fs.existsSync('current_tx.json')) {
    savedTxId = JSON.parse(fs.readFileSync('current_tx.json')).transaction_id;
  }
} catch (e) {
  // Ignore file errors
}

const argv = getArgs();
const step = argv.step || 'search';
const flowId = argv.flow || 'sjt';
const txid = argv.txid || savedTxId || uuidv4();
const msgid = argv.msgid || uuidv4();
const itemId = argv.itemId || 'SJT';
const fulfillId = argv.fulfillId;

// Configuration
const BAP_URL = 'http://localhost:8081'; // BAP internal endpoint
const PRAMAAN_MOCK_SELLER = 'pramaan.ondc.org/beta/preprod/mock/seller';

const commonContext = {
  domain: 'ONDC:TRV11',
  country: 'IND',
  city: 'std:044',
  core_version: '2.0.0',
  bap_id: process.env.BAP_ID || 'api.indicabs.net',
  bap_uri: process.env.BAP_URI || 'https://api.indicabs.net/ondc',
  transaction_id: txid,
  message_id: msgid,
  timestamp: new Date().toISOString(),
  ttl: 'PT30S'
};

const headers = {
  'Content-Type': 'application/json',
  'X-Pramaan-Interest-Id': process.env.PRAMAAN_INTEREST_ID,
  'X-Pramaan-Test-Run-Id': process.env.PRAMAAN_TEST_RUN_ID
};

async function runStep() {
  console.log(`🚀 Executing [${step.toUpperCase()}] for Flow: ${flowId.toUpperCase()}`);
  console.log(`🆔 Transaction ID: ${txid}`);

  try {
    let payload = {};

    switch (step) {
      case 'search':
        payload = {
          context: { ...commonContext, action: 'search' },
          message: {
            intent: {
              fulfillment: {
                stops: [
                  { type: 'START', location: { gps: '12.9807,80.1643', name: 'Chennai International Airport' } },
                  { type: 'END', location: { gps: '13.0812,80.2709', name: 'Chennai Central' } }
                ]
              },
              provider: { id: PRAMAAN_MOCK_SELLER },
              category: { id: flowId === 'sjt' ? 'SJT' : 'RJT' }
            }
          }
        };
        break;

      case 'select':
        if (!itemId) throw new Error('Missing --itemId. Check BAP logs for the ID from on_search.');
        payload = {
          context: { ...commonContext, action: 'select' },
          message: {
            order: {
              provider: { id: PRAMAAN_MOCK_SELLER },
              items: [{ id: itemId }],
              fulfillment: {
                stops: [
                  { type: 'START', location: { gps: '12.9807,80.1643', name: 'Chennai International Airport' } },
                  { type: 'END', location: { gps: '13.0812,80.2709', name: 'Chennai Central' } }
                ]
              }
            }
          }
        };
        break;

      case 'init':
        if (!itemId) throw new Error('Missing --itemId.');
        payload = {
          context: { ...commonContext, action: 'init' },
          message: {
            order: {
              provider: { id: PRAMAAN_MOCK_SELLER },
              items: [{ id: itemId }],
              fulfillment: {
                stops: [
                  { type: 'START', location: { gps: '12.9807,80.1643', name: 'Chennai International Airport' } },
                  { type: 'END', location: { gps: '13.0812,80.2709', name: 'Chennai Central' } }
                ]
              },
              billing: {
                name: 'ONDC Test Buyer',
                email: 'test@example.com',
                phone: '9999999999'
              }
            }
          }
        };
        break;

      case 'confirm':
        if (!itemId) throw new Error('Missing --itemId.');
        payload = {
          context: { ...commonContext, action: 'confirm' },
          message: {
            order: {
              provider: { id: PRAMAAN_MOCK_SELLER },
              items: [{ id: itemId }],
              payment: {
                type: 'POST-FULFILLMENT',
                status: 'NOT-PAID'
              }
            }
          }
        };
        break;

      default:
        console.error('❌ Unknown step:', step);
        process.exit(1);
    }

    const response = await axios.post(`${BAP_URL}/${step}`, payload, { headers });
    console.log('\n✅ Gateway ACK:', JSON.stringify(response.data, null, 2));

    if (step === 'search') {
      console.log('\n💡 NEXT STEP: Check BAP logs for the "item_id" from on_search, then run:');
      console.log(`   node runPramaanFlow.js --step select --txid ${txid} --itemId <item_id>`);
    } else if (step === 'select') {
      console.log('\n💡 NEXT STEP: Check BAP logs for the quote, then run:');
      console.log(`   node runPramaanFlow.js --step init --txid ${txid} --itemId ${itemId}`);
    } else if (step === 'init') {
      console.log('\n💡 NEXT STEP: Check BAP logs for on_init, then run:');
      console.log(`   node runPramaanFlow.js --step confirm --txid ${txid} --itemId ${itemId}`);
    }

  } catch (error) {
    console.error('\n❌ Execution Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

runStep();

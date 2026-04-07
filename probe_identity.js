import axios from 'axios';
import libsodium from 'libsodium-wrappers';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

/**
 * probe_identity.js
 * 
 * Brute-forces common ONDC identity combinations (BAP_ID, BAP_URI, Unique Key ID)
 * to find which one matches the ONDC Registry and returns an ACK from the Gateway.
 */

async function sign(body, subscriberId, uniqueKeyId, privateKey) {
  await libsodium.ready;
  const created = Math.floor(Date.now() / 1000);
  const expires = created + 10 * 60;
  const bodyString = JSON.stringify(body);
  const digest = libsodium.to_base64(libsodium.crypto_generichash(64, bodyString), libsodium.base64_variants.ORIGINAL);
  const signingString = `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digest}`;
  const privateKeyBuffer = Buffer.from(privateKey, 'base64');
  const signature = libsodium.to_base64(libsodium.crypto_sign_detached(signingString, privateKeyBuffer), libsodium.base64_variants.ORIGINAL);
  return `Signature keyId="${subscriberId}|${uniqueKeyId}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
}

async function probe() {
  const GATEWAY_URL = 'https://preprod.gateway.ondc.org/search';
  const PRIVATE_KEY = process.env.ONDC_SIGNING_PRIVATE_KEY;
  const UNIQUE_KEY_ID = '44369ebe-d208-4d7d-bbed-6449db9e4126';

  const ids = ['api.indicabs.net', 'indicabs.net'];
  const uris = [
    'https://api.indicabs.net/ondc',
    'https://api.indicabs.net/ondc/',
    'https://indicabs.net/ondc',
    'https://indicabs.net/ondc/'
  ];

  console.log('🕵️  Starting Identity Probe...');
  
  for (const id of ids) {
    for (const uri of uris) {
      console.log(`\n🔍 Probing: BAP_ID=${id}, BAP_URI=${uri}`);
      
      const body = {
        context: {
          domain: "ONDC:TRV11",
          action: "search",
          country: "IND",
          city: "std:044",
          core_version: "2.0.0",
          bap_id: id,
          bap_uri: uri,
          transaction_id: uuidv4(),
          message_id: uuidv4(),
          timestamp: new Date().toISOString(),
          ttl: "PT30S"
        },
        message: {
          intent: {
            fulfillment: {
              stops: [{ type: "START", location: { gps: "12.9928,80.2175" } }, { type: "END", location: { gps: "13.0827,80.2707" } }]
            },
            provider: { id: "pramaan.ondc.org/beta/preprod/mock/seller" },
            category: { id: "METRO" }
          }
        }
      };

      try {
        const authHeader = await sign(body, id, UNIQUE_KEY_ID, PRIVATE_KEY);
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'X-Pramaan-Interest-Id': process.env.PRAMAAN_INTEREST_ID,
          'X-Pramaan-Test-Run-Id': process.env.PRAMAAN_TEST_RUN_ID
        };

        const response = await axios.post(GATEWAY_URL, body, { headers, timeout: 5000 });
        
        if (response.data?.message?.ack?.status === 'ACK') {
          console.log('✅ SUCCESS! Correct Configuration Found:');
          console.log(`   BAP_ID=${id}`);
          console.log(`   BAP_URI=${uri}`);
          process.exit(0);
        } else {
          console.log(`   🔸 Status: ${response.data?.message?.ack?.status || 'N/A'}`);
        }
      } catch (error) {
        if (error.response) {
          console.log(`   ❌ Error ${error.response.status}: ${error.response.data?.error?.message || 'Unauthorized'}`);
        } else {
          console.log(`   ❌ Error: ${error.message}`);
        }
      }
    }
  }
  
  console.log('\n🛑 Probe complete. No matching configuration found.');
}

probe();

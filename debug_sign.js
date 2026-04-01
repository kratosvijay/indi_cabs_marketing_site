import libsodium from 'libsodium-wrappers';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Diagnostic script to verify signing string construction.
 */

async function debug() {
  await libsodium.ready;
  
  const PRIVATE_KEY = process.env.ONDC_SIGNING_PRIVATE_KEY;
  const created = Math.floor(Date.now() / 1000);
  const expires = created + 600;
  
  const mockBody = { context: { action: 'search' }, message: { intent: {} } };
  const bodyString = JSON.stringify(mockBody);
  
  // 1. Digest
  const digest = libsodium.to_base64(libsodium.crypto_generichash(64, bodyString));
  
  // 2. Signing String
  const signingString = `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digest}`;
  
  console.log('--- SIGNING STRING ---');
  console.log(signingString);
  console.log('----------------------');
  
  // 3. Signature
  const privateKeyBuffer = Buffer.from(PRIVATE_KEY, 'base64');
  console.log('Private Key Length:', privateKeyBuffer.length);
  
  const signature = libsodium.to_base64(libsodium.crypto_sign_detached(signingString, privateKeyBuffer));
  console.log('Signature:', signature);
}

debug();

import 'dotenv/config';
import libsodium from 'libsodium-wrappers';

async function checkKey() {
  await libsodium.ready;
  const key = process.env.ONDC_SIGNING_PRIVATE_KEY;
  console.log('Raw key from env:', key);
  if (!key) return;
  
  try {
    const buffer = Buffer.from(key, 'base64');
    console.log('Buffer.from(key, "base64") length:', buffer.length);
    console.log('Expected for Ed25519 Secret Key:', libsodium.crypto_sign_SECRETKEYBYTES);
    
    // Test if we can sign something with it
    const signKey = new Uint8Array(buffer);
    const signature = libsodium.crypto_sign_detached('test', signKey);
    console.log('✅ Signing test successful');
  } catch (e) {
    console.error('❌ Signing test failed:', e.message);
  }
}
checkKey();

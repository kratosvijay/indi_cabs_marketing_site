import libsodium from 'libsodium-wrappers';
import 'dotenv/config';

async function verifyKeys() {
  await libsodium.ready;
  
  const privateKey = process.env.ONDC_SIGNING_PRIVATE_KEY;
  const publicKey = process.env.ONDC_SIGNING_PUBLIC_KEY;
  
  if (!privateKey || !publicKey) {
    console.error('Missing keys in .env');
    return;
  }
  
  const privBuffer = Buffer.from(privateKey, 'base64');
  const pubBuffer = Buffer.from(publicKey, 'base64');
  
  try {
    // libsodium.crypto_sign_ed25519_sk_to_pk extracts the public key from the secret key (64 bytes)
    // Ed25519 private keys in libsodium are 64 bytes (seed + public key)
    let derivedPub;
    if (privBuffer.length === 64) {
      derivedPub = privBuffer.slice(32);
    } else if (privBuffer.length === 32) {
      // It's a seed
      const keypair = libsodium.crypto_sign_seed_keypair(privBuffer);
      derivedPub = keypair.publicKey;
    }
    
    if (derivedPub) {
      const derivedPubBase64 = libsodium.to_base64(derivedPub, libsodium.base64_variants.ORIGINAL);
      console.log('Provided Public Key:', publicKey);
      console.log('Derived Public Key: ', derivedPubBase64);
      
      if (publicKey === derivedPubBase64) {
        console.log('✅ Keys match!');
      } else {
        console.log('❌ Keys DO NOT match!');
      }
    }
  } catch (err) {
    console.error('Error during verification:', err.message);
  }
}

verifyKeys();

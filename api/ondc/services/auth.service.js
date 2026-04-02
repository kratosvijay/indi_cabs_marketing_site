import libsodium from 'libsodium-wrappers';
import { v4 as uuidv4 } from 'uuid';

/**
 * ONDC Authentication Service
 * 
 * Handles request signing with Ed25519 and Blake2b digest
 * required for ONDC protocol compliance.
 */

/**
 * Sign an outgoing request body
 * @param {object} body - The request body to sign
 * @returns {string} Authorization header value
 */
export async function signRequest(body) {
  try {
    await libsodium.ready;
    
    // 🔍 Dynamically load config to ensure .env updates are caught
    const privateKey = process.env.ONDC_SIGNING_PRIVATE_KEY;
    const subscriberId = process.env.ONDC_SUBSCRIBER_ID || 'api.indicabs.net';
    const uniqueKeyId = process.env.ONDC_UNIQUE_KEY_ID || 'prev-key-id';

    if (!privateKey) {
      console.warn('⚠️  [Auth] ONDC_SIGNING_PRIVATE_KEY NOT FOUND. Using placeholder signature.');
      return `Signature keyId="${subscriberId}|${uniqueKeyId}|ed25519",algorithm="ed25519",headers="(created) (expires) digest",signature="<placeholder>"`;
    }

    const created = Math.floor(Date.now() / 1000);
    const expires = created + 10 * 60; // 10 minutes expiry

    // 1. Create digest: Blake2b-512 hash of the request body (base64 encoded)
    const bodyString = JSON.stringify(body);
    const digest = libsodium.to_base64(libsodium.crypto_generichash(64, bodyString), libsodium.base64_variants.ORIGINAL);

    // 2. Create signing string
    const signingString = `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digest}`;
    
    console.log('📝 [Auth] Signing Details:', {
      created,
      expires,
      digest,
      signingString: signingString.replace(/\n/g, '\\n')
    });

    // 3. Decode private key
    const privateKeyBuffer = Buffer.from(privateKey, 'base64');
    
    if (privateKeyBuffer.length !== libsodium.crypto_sign_SECRETKEYBYTES && privateKeyBuffer.length !== 32) {
      throw new Error(`Invalid private key length: ${privateKeyBuffer.length} bytes`);
    }

    // 4. Generate Signature
    const signature = libsodium.to_base64(libsodium.crypto_sign_detached(signingString, privateKeyBuffer), libsodium.base64_variants.ORIGINAL);

    // 5. Construct Authorization Header
    const authHeader = `Signature keyId="${subscriberId}|${uniqueKeyId}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
    
    console.log('✍️  [Auth] Authorization Header:', authHeader);
    return authHeader;
  } catch (error) {
    console.error('❌ [Auth] Signing Error:', error.message);
    throw error;
  }
}

/**
 * Generate ONDC authentication headers
 * @param {object} body - Request body for signing
 * @returns {object} Headers object with Authorization
 */
export async function getAuthHeaders(body) {
  const signature = await signRequest(body);
  return {
    Authorization: signature,
    'Content-Type': 'application/json',
    'Proxy-Authorization': signature, // Often required for some ONDC gateways
  };
}


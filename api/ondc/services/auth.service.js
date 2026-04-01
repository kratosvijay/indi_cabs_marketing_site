import libsodium from 'libsodium-wrappers';
import { v4 as uuidv4 } from 'uuid';

/**
 * ONDC Authentication Service
 * 
 * Handles request signing with Ed25519 and Blake2b digest
 * required for ONDC protocol compliance.
 */

// Load private key from environment
const PRIVATE_KEY = process.env.ONDC_SIGNING_PRIVATE_KEY;
const SUBSCRIBER_ID = process.env.ONDC_SUBSCRIBER_ID || 'indicabs.net';
const UNIQUE_KEY_ID = process.env.ONDC_UNIQUE_KEY_ID || '884'; // Example key ID from Pramaan

/**
 * Sign an outgoing request body
 * @param {object} body - The request body to sign
 * @returns {string} Authorization header value
 */
export async function signRequest(body) {
  try {
    await libsodium.ready;
    
    if (!PRIVATE_KEY) {
      console.warn('⚠️  [Auth] ONDC_SIGNING_PRIVATE_KEY not found. Using placeholder signature.');
      return 'Signature keyId="indicabs.net|key1|ed25519",algorithm="ed25519",headers="(created) (expires) digest",signature="<placeholder>"';
    }

    const created = Math.floor(Date.now() / 1000);
    const expires = created + 10 * 60; // 10 minutes expiry

    // 1. Create digest: Blake2b hash of the request body (base64 encoded)
    const bodyString = JSON.stringify(body);
    const digest = libsodium.to_base64(libsodium.crypto_generichash(64, bodyString));

    // 2. Create signing string
    const signingString = `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digest}`;

    // 3. Sign the signing string
    const privateKeyBuffer = libsodium.from_base64(PRIVATE_KEY);
    const signature = libsodium.to_base64(libsodium.crypto_sign_detached(signingString, privateKeyBuffer));

    // 4. Format Authorization header
    const authHeader = `Signature keyId="${SUBSCRIBER_ID}|${UNIQUE_KEY_ID}|ed25519",algorithm="ed25519",headers="(created) (expires) digest",signature="${signature}",created="${created}",expires="${expires}"`;
    
    console.log('✍️  [Auth] Request signed successfully');
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


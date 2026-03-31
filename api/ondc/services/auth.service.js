/**
 * ONDC Authentication Service (placeholder)
 *
 * Future: Handles request signing, header generation,
 * and key management for ONDC protocol compliance.
 */

/**
 * Sign an outgoing request body
 * @param {object} body - The request body to sign
 * @returns {string} Authorization header value
 */
async function signRequest(body) {
  // TODO: Implement Ed25519 signing using libsodium
  // 1. Create signing string (blake2b hash of body)
  // 2. Sign with private key
  // 3. Return formatted Authorization header
  console.log('✍️  [Auth] Request signing skipped (sandbox mode)');
  return 'Signature keyId="indicabs.net|key1|ed25519",algorithm="ed25519",headers="(created) (expires) digest",signature="<placeholder>"';
}

/**
 * Generate ONDC authentication headers
 * @param {object} body - Request body for signing
 * @returns {object} Headers object with Authorization
 */
async function getAuthHeaders(body) {
  const signature = await signRequest(body);
  return {
    Authorization: signature,
    'Content-Type': 'application/json',
  };
}

module.exports = { signRequest, getAuthHeaders };

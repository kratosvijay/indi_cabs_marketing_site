/**
 * ONDC Registry Service (placeholder)
 *
 * Future: Handles subscriber lookup, key verification,
 * and registry interactions with ONDC preprod/prod registry.
 */

const REGISTRY_URL = process.env.ONDC_REGISTRY_URL || 'https://preprod.registry.ondc.org';

/**
 * Look up a subscriber in the ONDC registry
 * @param {string} subscriberId - The subscriber ID to look up
 * @returns {object} Subscriber details (mock for now)
 */
export async function lookupSubscriber(subscriberId) {
  // TODO: Implement actual registry lookup
  // POST to REGISTRY_URL/lookup with subscriber_id
  console.log(`🔍 [Registry] Looking up subscriber: ${subscriberId} at ${REGISTRY_URL}`);

  return {
    subscriber_id: subscriberId,
    status: 'SUBSCRIBED',
    signing_public_key: '<placeholder>',
    valid_from: '2024-01-01T00:00:00.000Z',
    valid_until: '2026-12-31T23:59:59.000Z',
  };
}

/**
 * Verify a request signature against the registry
 * @param {object} headers - Request headers containing Authorization
 * @param {string} body - Raw request body
 * @returns {boolean} Whether the signature is valid
 */
export async function verifySignature(headers, body) {
  // TODO: Implement signature verification using libsodium
  // 1. Extract Authorization header
  // 2. Look up sender's public key from registry
  // 3. Verify Ed25519 signature
  console.log('🔐 [Registry] Signature verification skipped (sandbox mode)');
  return true;
}

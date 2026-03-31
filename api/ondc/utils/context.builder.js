import { v4 as uuidv4 } from 'uuid';

/**
 * Builds a standard ONDC context object for the TRV11 (metro/mobility) domain.
 *
 * @param {string} action   - The ONDC action (search, on_search, select, etc.)
 * @param {object} overrides - Optional overrides for context fields
 * @returns {object} ONDC context object
 */
export function buildContext(action, overrides = {}) {
  return {
    domain: process.env.ONDC_DOMAIN || 'ONDC:TRV11',
    country: process.env.ONDC_COUNTRY || 'IND',
    city: overrides.city || process.env.ONDC_CITY || 'std:044',
    action,
    core_version: '1.0.0',
    bap_id: process.env.ONDC_SUBSCRIBER_ID || 'indicabs.net',
    bap_uri: process.env.ONDC_SUBSCRIBER_URL || 'https://api.indicabs.net/ondc',
    transaction_id: overrides.transaction_id || uuidv4(),
    message_id: overrides.message_id || uuidv4(),
    timestamp: new Date().toISOString(),
    ttl: 'PT30S',
    ...overrides,
  };
}

// Named export used above

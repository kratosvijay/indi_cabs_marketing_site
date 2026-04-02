/**
 * ONDC Controllers
 *
 * Handles incoming ONDC API requests and callback endpoints.
 * Each controller logs the request, delegates to the service layer (now async),
 * and returns a properly formatted ONDC response.
 */

import * as ondcService from '../services/ondc.service.js';
import { buildContext } from '../utils/context.builder.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// ─── Buyer-Side Actions (outgoing to BPP via gateway) ───────────────────

/**
 * POST /ondc/trigger-test
 * Initiates a mock search for Pramaan/ONDC testing
 */
export async function triggerTest(req, res) {
  try {
    const transactionId = uuidv4();
    const messageId = uuidv4();
    
    // Create a robust TRV11 search context
    const context = buildContext('search');
    context.transaction_id = transactionId;
    context.message_id = messageId;
    context.timestamp = new Date().toISOString();

    const payload = {
      context,
      message: {
        intent: {
          fulfillment: {
            stops: [
              {
                type: "START",
                location: { gps: "12.9716,77.5946" } // Bangalore MG Road
              },
              {
                type: "END",
                location: { gps: "12.9279,77.6271" } // Bangalore Koramangala
              }
            ]
          },
          provider: {
            id: "pramaan.ondc.org/beta/preprod/mock/seller"
          },
          category: {
            id: "METRO"
          }
        }
      }
    };

    console.log(`🧪 [Trigger] Initiating mock Search transaction: ${transactionId}`);
    
    // Include Pramaan headers if available to help the integration bench match the request
    const customHeaders = {};
    if (process.env.PRAMAAN_INTEREST_ID) {
      customHeaders['X-Pramaan-Interest-Id'] = process.env.PRAMAAN_INTEREST_ID;
    }
    if (process.env.PRAMAAN_TEST_RUN_ID) {
      customHeaders['X-Pramaan-Test-Run-Id'] = process.env.PRAMAAN_TEST_RUN_ID;
    }

    // Update handleSearch to accept customHeaders
    const result = await ondcService.handleSearch(payload, customHeaders);
    
    res.json({
      status: 'success',
      transaction_id: transactionId,
      message_id: messageId,
      gateway_response: result
    });
  } catch (err) {
    console.error('❌ [Trigger] Error:', err.message);
    res.status(500).json({
      error: 'Trigger failed',
      message: err.message
    });
  }
}

/**
 * POST /ondc/search
 * Initiates a search for metro services/routes
 */
export async function search(req, res) {
  try {
    console.log('🔎 [search] Processing search request');
    
    // Forward Pramaan tracking headers if they exist to help the integration bench match the request
    const customHeaders = {};
    if (req.headers['x-pramaan-interest-id']) {
      customHeaders['X-Pramaan-Interest-Id'] = req.headers['x-pramaan-interest-id'];
    }
    if (req.headers['x-pramaan-test-run-id']) {
      customHeaders['X-Pramaan-Test-Run-Id'] = req.headers['x-pramaan-test-run-id'];
    }

    await ondcService.handleSearch(req.body, customHeaders);
    console.log('✅ [search] Gateway ACK received');
    res.json({
      message: {
        ack: {
          status: "ACK"
        }
      }
    });
  } catch (err) {
    console.error('❌ [search] Error:', err.message);
    const context = req.body?.context || buildContext('search');
    res.status(500).json({
      context,
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/select
 * Selects a specific item/service from search results
 */
export async function select(req, res) {
  try {
    console.log('👆 [select] Processing select request');
    console.log('📦 [select] Incoming Body:', JSON.stringify(req.body, null, 2));
    
    const customHeaders = {};
    if (req.headers['x-pramaan-interest-id']) {
      customHeaders['X-Pramaan-Interest-Id'] = req.headers['x-pramaan-interest-id'];
    }
    if (req.headers['x-pramaan-test-run-id']) {
      customHeaders['X-Pramaan-Test-Run-Id'] = req.headers['x-pramaan-test-run-id'];
    }

    const response = await ondcService.handleSelect(req.body, customHeaders);
    console.log('✅ [select] Gateway ACK received');
    res.json(response);
  } catch (err) {
    console.error('❌ [select] Error:', err.message);
    const context = req.body?.context || buildContext('select');
    res.status(500).json({
      context,
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/init
 * Initializes an order with billing/fulfillment details
 */
export async function init(req, res) {
  try {
    console.log('🚀 [init] Processing init request');
    
    const customHeaders = {};
    if (req.headers['x-pramaan-interest-id']) {
      customHeaders['X-Pramaan-Interest-Id'] = req.headers['x-pramaan-interest-id'];
    }
    if (req.headers['x-pramaan-test-run-id']) {
      customHeaders['X-Pramaan-Test-Run-Id'] = req.headers['x-pramaan-test-run-id'];
    }

    const response = await ondcService.handleInit(req.body, customHeaders);
    console.log('✅ [init] Gateway ACK received');
    res.json(response);
  } catch (err) {
    console.error('❌ [init] Error:', err.message);
    const context = req.body?.context || buildContext('init');
    res.status(500).json({
      context,
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/confirm
 * Confirms a booking/order
 */
export async function confirm(req, res) {
  try {
    console.log('✔️  [confirm] Processing confirm request');
    
    const customHeaders = {};
    if (req.headers['x-pramaan-interest-id']) {
      customHeaders['X-Pramaan-Interest-Id'] = req.headers['x-pramaan-interest-id'];
    }
    if (req.headers['x-pramaan-test-run-id']) {
      customHeaders['X-Pramaan-Test-Run-Id'] = req.headers['x-pramaan-test-run-id'];
    }

    const response = await ondcService.handleConfirm(req.body, customHeaders);
    console.log('✅ [confirm] Gateway ACK received');
    res.json(response);
  } catch (err) {
    console.error('❌ [confirm] Error:', err.message);
    const context = req.body?.context || buildContext('confirm');
    res.status(500).json({
      context,
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/status
 * Checks order/booking status
 */
export async function status(req, res) {
  try {
    console.log('📋 [status] Processing status request');
    
    const customHeaders = {};
    if (req.headers['x-pramaan-interest-id']) {
      customHeaders['X-Pramaan-Interest-Id'] = req.headers['x-pramaan-interest-id'];
    }
    if (req.headers['x-pramaan-test-run-id']) {
      customHeaders['X-Pramaan-Test-Run-Id'] = req.headers['x-pramaan-test-run-id'];
    }

    const response = await ondcService.handleStatus(req.body, customHeaders);
    console.log('✅ [status] Gateway ACK received');
    res.json(response);
  } catch (err) {
    console.error('❌ [status] Error:', err.message);
    res.status(500).json({
      context: buildContext('status'),
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

// ─── Callback Endpoints (incoming from BPP via gateway) ─────────────────

/**
 * POST /ondc/on_search — callback from BPP with search results
 */
export function onSearch(req, res) {
  console.log("ON_SEARCH received", JSON.stringify(req.body, null, 2));
  res.json({ message: { ack: { status: "ACK" } } });
}

/**
 * POST /ondc/on_select — callback from BPP with selection details
 */
export function onSelect(req, res) {
  console.log("ON_SELECT received");
  res.json({ message: { ack: { status: "ACK" } } });
}

/**
 * POST /ondc/on_init — callback from BPP with init details
 */
export function onInit(req, res) {
  console.log("ON_INIT received");
  res.json({ message: { ack: { status: "ACK" } } });
}

/**
 * POST /ondc/on_confirm — callback from BPP with confirmation
 */
export function onConfirm(req, res) {
  console.log("ON_CONFIRM received");
  res.json({ message: { ack: { status: "ACK" } } });
}

/**
 * POST /ondc/on_status — callback from BPP with status update
 */
export function onStatus(req, res) {
  console.log("ON_STATUS received");
  res.json({ message: { ack: { status: "ACK" } } });
}

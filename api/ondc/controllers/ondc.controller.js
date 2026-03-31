/**
 * ONDC Controllers
 *
 * Handles incoming ONDC API requests and callback endpoints.
 * Each controller logs the request, delegates to the service layer,
 * and returns a properly formatted ONDC response.
 */

const ondcService = require('../services/ondc.service');
const { buildContext } = require('../utils/context.builder');

// ─── Buyer-Side Actions (outgoing to BPP via gateway) ───────────────────

/**
 * POST /ondc/search
 * Initiates a search for metro services/routes
 */
function search(req, res) {
  try {
    console.log('🔎 [search] Processing search request');
    const response = ondcService.handleSearch(req.body);
    console.log('✅ [search] Response:', JSON.stringify(response.context, null, 2));
    res.json(response);
  } catch (err) {
    console.error('❌ [search] Error:', err.message);
    res.status(500).json({
      context: buildContext('search'),
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/select
 * Selects a specific item/service from search results
 */
function select(req, res) {
  try {
    console.log('👆 [select] Processing select request');
    const response = ondcService.handleSelect(req.body);
    console.log('✅ [select] Response:', JSON.stringify(response.context, null, 2));
    res.json(response);
  } catch (err) {
    console.error('❌ [select] Error:', err.message);
    res.status(500).json({
      context: buildContext('select'),
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/init
 * Initializes an order with billing/fulfillment details
 */
function init(req, res) {
  try {
    console.log('🚀 [init] Processing init request');
    const response = ondcService.handleInit(req.body);
    console.log('✅ [init] Response:', JSON.stringify(response.context, null, 2));
    res.json(response);
  } catch (err) {
    console.error('❌ [init] Error:', err.message);
    res.status(500).json({
      context: buildContext('init'),
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/confirm
 * Confirms a booking/order
 */
function confirm(req, res) {
  try {
    console.log('✔️  [confirm] Processing confirm request');
    const response = ondcService.handleConfirm(req.body);
    console.log('✅ [confirm] Response:', JSON.stringify(response.context, null, 2));
    res.json(response);
  } catch (err) {
    console.error('❌ [confirm] Error:', err.message);
    res.status(500).json({
      context: buildContext('confirm'),
      error: { type: 'CORE-ERROR', code: '50001', message: err.message },
    });
  }
}

/**
 * POST /ondc/status
 * Checks order/booking status
 */
function status(req, res) {
  try {
    console.log('📋 [status] Processing status request');
    const response = ondcService.handleStatus(req.body);
    console.log('✅ [status] Response:', JSON.stringify(response.context, null, 2));
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
function onSearch(req, res) {
  console.log('📥 [on_search] Received search callback from BPP');
  console.log('   Provider:', JSON.stringify(req.body?.message?.catalog?.['bpp/descriptor'] || {}, null, 2));
  // TODO: Forward results to the Indicabs mobile app via WebSocket/FCM
  res.json({ message: { ack: { status: 'ACK' } } });
}

/**
 * POST /ondc/on_select — callback from BPP with selection details
 */
function onSelect(req, res) {
  console.log('📥 [on_select] Received select callback from BPP');
  res.json({ message: { ack: { status: 'ACK' } } });
}

/**
 * POST /ondc/on_init — callback from BPP with init details
 */
function onInit(req, res) {
  console.log('📥 [on_init] Received init callback from BPP');
  res.json({ message: { ack: { status: 'ACK' } } });
}

/**
 * POST /ondc/on_confirm — callback from BPP with confirmation
 */
function onConfirm(req, res) {
  console.log('📥 [on_confirm] Received confirm callback from BPP');
  res.json({ message: { ack: { status: 'ACK' } } });
}

/**
 * POST /ondc/on_status — callback from BPP with status update
 */
function onStatus(req, res) {
  console.log('📥 [on_status] Received status callback from BPP');
  res.json({ message: { ack: { status: 'ACK' } } });
}

module.exports = {
  search,
  select,
  init,
  confirm,
  status,
  onSearch,
  onSelect,
  onInit,
  onConfirm,
  onStatus,
};

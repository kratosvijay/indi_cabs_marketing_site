/**
 * ONDC Routes
 *
 * All routes are mounted under /ondc prefix (set in index.js).
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ondc.controller');

// ─── Health Check ───────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Indicabs ONDC BNP',
    domain: process.env.ONDC_DOMAIN || 'ONDC:TRV11',
    subscriber_id: process.env.ONDC_SUBSCRIBER_ID || 'indicabs.net',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ─── Buyer-Side Actions ─────────────────────────────────────────────────
router.post('/search', controller.search);
router.post('/select', controller.select);
router.post('/init', controller.init);
router.post('/confirm', controller.confirm);
router.post('/status', controller.status);

// ─── Callback Endpoints (BPP → BAP) ────────────────────────────────────
router.post('/on_search', controller.onSearch);
router.post('/on_select', controller.onSelect);
router.post('/on_init', controller.onInit);
router.post('/on_confirm', controller.onConfirm);
router.post('/on_status', controller.onStatus);

module.exports = router;

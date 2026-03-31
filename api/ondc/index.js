const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ondcRoutes = require('./routes/ondc.routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// ─── Middleware ──────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('[:date[iso]] :method :url :status :res[content-length] - :response-time ms'));

// ─── Request Logger ─────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`📥 ONDC Request: ${req.method} ${req.url}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────
// In Vercel, if this file is api/ondc/index.js, 
// the requests to /api/ondc/* will be handled here.
// The routes file expects /search, /select etc.
app.use('/', ondcRoutes);

// ─── Health Check ───────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Indicabs ONDC BNP'
  });
});

// ─── Error Handling ─────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

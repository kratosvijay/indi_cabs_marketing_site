import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ondcRoutes from './routes/ondc.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// ─── Middleware ──────────────────────────────────────────────────────────
const allowedOrigins = [
  'https://pramaan.ondc.org',
  'https://api.indicabs.net',
  'https://www.indicabs.net',
  'http://localhost:5173',
  'http://localhost:8080'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('pramaan.ondc.org')) {
      return callback(null, true);
    }
    return callback(null, true); // Keep it permissive for testing but explicit in logs
  },
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(morgan('[:date[iso]] :method :url :status :res[content-length] - :response-time ms'));

// ─── Request Logger ─────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`📥 ONDC Request: ${req.method} ${req.url}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────
// Compatibility for both root and versioned prefixes in Vercel
app.use('/', ondcRoutes);
app.use('/api/ondc', ondcRoutes);
app.use('/ondc', ondcRoutes);

// ─── Health Check ───────────────────────────────────────────────────────
const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Indicabs ONDC BNP',
    path: req.url
  });
};

app.get('/health', healthCheck);
app.get('/api/ondc/health', healthCheck);
app.get('/ondc/health', healthCheck);

// ─── Error Handling ─────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

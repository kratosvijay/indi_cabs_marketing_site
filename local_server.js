import express from 'express';
import ondcApp from './api/ondc/index.js';
import multimodalPlan from './api/multimodal/plan.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 8081;

app.use(express.json());

// IMPORTANT: Mount Multimodal BEFORE ONDC to avoid ONDC's global 404 handler
app.post('/multimodal/plan', multimodalPlan);

// Mount ONDC app (which handles /search, /health, etc. and has its own 404)
app.use(ondcApp);

app.listen(PORT, () => {
  console.log(`🚀 Comprehensive Local Test Server: http://localhost:${PORT}`);
});

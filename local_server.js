import express from 'express';
import ondcApp from './api/ondc/index.js';
import multimodalPlan from './api/multimodal/plan.js';
import dotenv from 'dotenv';
import path from 'path';

// 🔍 Explicitly load .env from the project root
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
const PORT = 8081;

// 🛡️ ONDC Startup Check
if (process.env.ONDC_SIGNING_PRIVATE_KEY) {
  console.log('✅ ONDC Signing Key found in environment.');
} else {
  console.error('❌ ONDC_SIGNING_PRIVATE_KEY is MISSING in environment. Please check your .env file.');
}

app.use(express.json());

// IMPORTANT: Mount Multimodal BEFORE ONDC to avoid ONDC's global 404 handler
app.post('/multimodal/plan', multimodalPlan);

// Mount ONDC app (which handles /search, /health, etc. and has its own 404)
app.use(ondcApp);

app.listen(PORT, () => {
  console.log(`🚀 Comprehensive Local Test Server: http://localhost:${PORT}`);
});

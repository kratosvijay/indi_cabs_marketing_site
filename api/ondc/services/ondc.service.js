/**
 * ONDC Service Layer
 *
 * Handles outgoing ONDC protocol messages to the Gateway.
 */

import axios from 'axios';
import { buildContext } from '../utils/context.builder.js';
import { getAuthHeaders } from './auth.service.js';

const GATEWAY_URL = process.env.ONDC_GATEWAY_URL || 'https://preprod.gateway.ondc.org';

/**
 * Common function to send ONDC request to Gateway/BPP
 * @param {string} action - ONDC action (search, select, etc)
 * @param {object} body - Request body
 * @returns {promise} Axios response
 */
async function sendToNetwork(action, body) {
  try {
    const url = `${GATEWAY_URL}/${action}`;
    const headers = await getAuthHeaders(body);
    
    console.log(`📡 [Network] Sending /${action} to ${url}`);
    console.log(`📜 [Network] Headers: ${JSON.stringify(headers, null, 2)}`);
    console.log(`📦 [Network] Body: ${JSON.stringify(body, null, 2)}`);
    
    const response = await axios.post(url, body, { headers, timeout: 5000 });
    
    console.log(`✅ [Network] Response from Gateway: ${response.status} ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`❌ [Network] Gateway Error (${error.response.status}):`, JSON.stringify(error.response.data));
    } else {
      console.error(`❌ [Network] Connection Error:`, error.message);
    }
    throw error;
  }
}

/**
 * Handle /search — discover metros, routes, tickets
 */
export async function handleSearch(requestBody) {
  // Use context from app or build a fresh one
  const context = requestBody.context || buildContext('search');
  const message = requestBody.message;

  const ondcBody = { context, message };
  return await sendToNetwork('search', ondcBody);
}

/**
 * Handle /select — select a specific metro item/route
 */
export async function handleSelect(requestBody) {
  const context = requestBody.context || buildContext('select');
  const message = requestBody.message;

  const ondcBody = { context, message };
  return await sendToNetwork('select', ondcBody);
}

/**
 * Handle /init — initialize an order
 */
export async function handleInit(requestBody) {
  const context = requestBody.context || buildContext('init');
  const message = requestBody.message;

  const ondcBody = { context, message };
  return await sendToNetwork('init', ondcBody);
}

/**
 * Handle /confirm — confirm a booking
 */
export async function handleConfirm(requestBody) {
  const context = requestBody.context || buildContext('confirm');
  const message = requestBody.message;

  const ondcBody = { context, message };
  return await sendToNetwork('confirm', ondcBody);
}

/**
 * Handle /status — check order status
 */
export async function handleStatus(requestBody) {
  const context = requestBody.context || buildContext('status');
  const message = requestBody.message;

  const ondcBody = { context, message };
  return await sendToNetwork('status', ondcBody);
}

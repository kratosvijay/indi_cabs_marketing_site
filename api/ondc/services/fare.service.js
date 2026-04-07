import axios from 'axios';

/**
 * Fare Service
 * 
 * Communicates with the Indi Cabs Cloud Functions in Firebase
 * to calculate real-time cab fares.
 */

const FUNCTIONS_BASE_URL = process.env.FIREBASE_FUNCTIONS_URL || 'https://asia-south1-indicabs-prod.cloudfunctions.net';

/**
 * Calculate fares for a given route
 * @param {object} params - Calculation parameters
 * @param {number} params.distanceMeters - distance in meters
 * @param {number} params.durationSeconds - duration in seconds
 * @param {number} params.tollCost - estimated toll cost
 * @param {object} params.pickupLocation - { latitude, longitude }
 * @param {object} params.destinationLocation - { latitude, longitude }
 * @returns {object} Fares map by vehicle type
 */
export async function calculateCabFares(params) {
  try {
    const url = `${FUNCTIONS_BASE_URL}/calculateFares`;
    
    // onCall functions expect a "data" wrapper
    const payload = {
      data: {
        distanceMeters: params.distanceMeters,
        durationSeconds: params.durationSeconds,
        tollCost: params.tollCost || 0,
        pickupLocation: params.pickupLocation,
        destinationLocation: params.destinationLocation,
        // We can pass empty routePolyline or omit if not needed for simple fare check
        routePolyline: params.routePolyline || []
      }
    };

    console.log(`🚖 [FareService] Calling Cloud Function: ${url}`);
    
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // onCall returns { result: { ... } }
    if (response.data && response.data.result) {
      console.log('✅ [FareService] Fares received:', response.data.result.fares);
      return response.data.result.fares;
    }

    console.warn('⚠️  [FareService] Unexpected response format:', response.data);
    return null;
  } catch (error) {
    console.error('❌ [FareService] Error calling Cloud Function:', error.message);
    if (error.response) {
      console.error('   Response Data:', JSON.stringify(error.response.data));
    }
    return null;
  }
}

/**
 * Multimodal Transport Planner
 * 
 * Generates combined transit options: Cab ONLY, Metro ONLY, or Cab + Metro.
 */

import * as fareService from '../services/fare.service.js';
import * as ondcService from '../services/ondc.service.js';
import { calculateDistance, estimateTime } from '../utils/geo.utils.js';

/**
 * Multimodal Transport Planner
 * 
 * Generates combined transit options: Cab ONLY, Metro ONLY, or Cab + Metro.
 */

export async function plan(req, res) {
  const { source, destination } = req.body;

  if (!source || !source.lat || !source.lng || !destination || !destination.lat || !destination.lng) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Source and destination coordinates are required.',
      required_format: { 
        source: { lat: 12.9928, lng: 80.2175 }, 
        destination: { lat: 13.0827, lng: 80.2707 } 
      }
    });
  }

  try {
    const distanceMeters = calculateDistance(source.lat, source.lng, destination.lat, destination.lng);
    const durationSeconds = (distanceMeters / (25 * 1000 / 3600)); // Rough estimate at 25km/h

    // 1. Fetch real-time Cab fares
    const cabFares = await fareService.calculateCabFares({
      distanceMeters,
      durationSeconds,
      pickupLocation: { latitude: source.lat, longitude: source.lng },
      destinationLocation: { latitude: destination.lat, longitude: destination.lng }
    });

    const hatchbackFare = cabFares?.Hatchback || 350; // Fallback
    const autoFare = cabFares?.Auto || 200;

    const options = [
      {
        type: 'cab_only',
        price: hatchbackFare,
        currency: 'INR',
        eta: estimateTime(distanceMeters, 25),
        route_steps: [
          { instruction: 'Cab pickup at your location', duration: 5 },
          { instruction: 'Drive to destination via optimal route', duration: estimateTime(distanceMeters, 25) - 5 }
        ]
      },
      {
        type: 'metro',
        price: 60.0, // Fixed for demo, ONDC integration for real prices below
        currency: 'INR',
        eta: estimateTime(distanceMeters, 35),
        route_steps: [
          { instruction: 'Walk to nearest Metro station', distance: '500m', duration: 10 },
          { instruction: 'Take Metro towards Destination', duration: 35 },
          { instruction: 'Walk to final destination', distance: '800m', duration: 10 }
        ]
      },
      {
        type: 'combo',
        price: Math.round(autoFare + 40), // Auto to station + Metro fare
        currency: 'INR',
        eta: estimateTime(distanceMeters, 30),
        route_steps: [
          { instruction: 'Cab/Auto pickup at source', mode: 'cab', duration: 10 },
          { instruction: 'Drop at nearest Metro station', mode: 'cab', duration: 5 },
          { instruction: 'Take Metro to destination area', mode: 'metro', duration: 20 },
          { instruction: 'Short walk to destination', mode: 'other', duration: 5 }
        ]
      }
    ];

    // Trigger an ONDC search in background for logging/precaching
    // Not awaiting to keep user response fast
    ondcService.handleSearch({
      context: { city: 'std:044' }, // Chennai example
      message: {
        intent: {
          fulfillment: {
            stops: [
              { type: "START", location: { gps: `${source.lat},${source.lng}` } },
              { type: "END", location: { gps: `${destination.lat},${destination.lng}` } }
            ]
          },
          category: { id: "METRO" }
        }
      }
    }).catch(e => console.error('🔍 [Planner] ONDC Search Background Error:', e.message));

    res.json({
      status: 'success',
      count: options.length,
      results: options,
      debug: { distanceMeters: Math.round(distanceMeters) }
    });
  } catch (error) {
    console.error('❌ [Planner] Error:', error.message);
    res.status(500).json({
      error: 'Planning failed',
      message: error.message
    });
  }
}

/**
 * Haversine Formula Utility
 * 
 * Estimates the distance between two points on the Earth's surface
 * given their latitude and longitude coordinates.
 */

/**
 * Calculate distance between two GPS coordinates in meters
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in meters
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}

/**
 * Estimate travel time in minutes based on distance and average speed
 * @param {number} distanceMeters 
 * @param {number} speedKmH 
 * @returns {number} Time in minutes
 */
export function estimateTime(distanceMeters, speedKmH = 25) {
  const distanceKm = distanceMeters / 1000;
  const timeHours = distanceKm / speedKmH;
  return Math.ceil(timeHours * 60) + 5; // adding 5 mins buffer
}

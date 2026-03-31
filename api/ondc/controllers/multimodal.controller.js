/**
 * Multimodal Transport Planner
 * 
 * Generates combined transit options: Cab ONLY, Metro ONLY, or Cab + Metro.
 */

function plan(req, res) {
  const { source, destination } = req.body;

  if (!source || !destination || !source.lat || !source.lng || !destination.lat || !destination.lng) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Source and destination coordinates are required.',
      required_format: { 
        source: { lat: 12.9928, lng: 80.2175 }, 
        destination: { lat: 13.0827, lng: 80.2707 } 
      }
    });
  }

  const options = [
    {
      type: 'cab_only',
      price: 350.0,
      eta: 45, // minutes
      route_steps: [
        { instruction: 'Pickup at your location', duration: 5 },
        { instruction: 'Drive to destination via Anna Salai', duration: 40 }
      ]
    },
    {
      type: 'metro',
      price: 60.0,
      eta: 55,
      route_steps: [
        { instruction: 'Walk to nearest Metro station', distance: '500m', duration: 10 },
        { instruction: 'Take Blue Line towards Central', duration: 35 },
        { instruction: 'Walk to destination', distance: '800m', duration: 10 }
      ]
    },
    {
      type: 'combo',
      price: 180.0,
      eta: 40,
      route_steps: [
        { instruction: 'Cab pickup at source', mode: 'cab', duration: 10 },
        { instruction: 'Drop at Alandur Metro', mode: 'cab', duration: 5 },
        { instruction: 'Take Metro from Alandur to Central', mode: 'metro', duration: 20 },
        { instruction: 'Walk/Auto to destination', mode: 'other', duration: 5 }
      ]
    }
  ];

  res.json({
    status: 'success',
    count: options.length,
    results: options
  });
}

module.exports = { plan };

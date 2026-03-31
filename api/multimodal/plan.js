/**
 * ONDC Multimodal Planner - Serverless Function
 * 
 * Handles POST /multimodal/plan
 */

export default function(req, res) {
  // CORS Headers for cross-origin mobile app access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { source, destination } = req.body;

  if (!source || !destination || !source.lat || !source.lng || !destination.lat || !destination.lng) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Source and destination coordinates are required.',
    });
  }

  // MOCK LOGIC: Calculate dummy options
  const results = [
    {
      type: 'cab_only',
      price: 380.0,
      eta: 42,
      route_steps: [
        { instruction: 'Pickup at source', mode: 'cab', duration: 5 },
        { instruction: 'Direct drive via main road', mode: 'cab', duration: 37 }
      ]
    },
    {
      type: 'metro',
      price: 65.0,
      eta: 50,
      route_steps: [
        { instruction: 'Walk to station', mode: 'walk', duration: 8 },
        { instruction: 'Metro Phase-1 towards Airport', mode: 'metro', duration: 32 },
        { instruction: 'Walk to destination', mode: 'walk', duration: 10 }
      ]
    },
    {
      type: 'combo',
      price: 195.0,
      eta: 38,
      route_steps: [
        { instruction: 'Auto/Cab to nearest station', mode: 'cab', duration: 10 },
        { instruction: 'Metro to destination zone', mode: 'metro', duration: 23 },
        { instruction: 'Last mile connectivity', mode: 'other', duration: 5 }
      ]
    }
  ];

  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    results
  });
};

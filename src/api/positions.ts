import { Router } from 'express';

const router = Router();

// GET /api/positions/current
router.get('/current', (req, res) => {
  // Placeholder: return mock current positions
  res.json([
    { symbol: 'ABC', quantity: 10, averagePrice: 100, currentPrice: 105, unrealizedPnL: 50, algorithm: 'Golden Cross' },
    { symbol: 'XYZ', quantity: 5, averagePrice: 200, currentPrice: 190, unrealizedPnL: -50, algorithm: 'Breakout' }
  ]);
});

export default router;

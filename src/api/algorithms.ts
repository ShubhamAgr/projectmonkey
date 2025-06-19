import { Router } from 'express';

const router = Router();

// GET /api/algorithms/performance
router.get('/performance', (req, res) => {
  // Placeholder: return mock algorithm performance metrics
  res.json([
    { algorithm: 'Golden Cross', trades: 20, winRate: 0.6, avgPnL: 120 },
    { algorithm: 'Breakout', trades: 15, winRate: 0.53, avgPnL: 80 }
  ]);
});

export default router;

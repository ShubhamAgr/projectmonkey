import { Router } from 'express';

const router = Router();

// GET /api/portfolio/metrics
router.get('/metrics', (req, res) => {
  // Placeholder: return mock portfolio metrics
  res.json({
    totalValue: 500000,
    risk: 0.03,
    drawdown: 0.01,
    positions: 5
  });
});

export default router;

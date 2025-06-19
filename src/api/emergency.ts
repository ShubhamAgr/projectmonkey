import { Router } from 'express';

const router = Router();

// POST /api/emergency/stop
router.post('/stop', (req, res) => {
  // Placeholder: emergency stop logic
  res.json({ success: true, message: 'All trading stopped (emergency).' });
});

export default router;

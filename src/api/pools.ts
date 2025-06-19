import { Router } from 'express';

const router = Router();

// GET /api/pools/equity/focused
router.get('/equity/focused', (req, res) => {
  // Placeholder: return mock focused equity stocks
  res.json([
    { symbol: 'ABC', focusScore: 0.9 },
    { symbol: 'XYZ', focusScore: 0.8 }
  ]);
});

// GET /api/pools/fno/focused
router.get('/fno/focused', (req, res) => {
  // Placeholder: return mock focused F&O stocks
  res.json([
    { symbol: 'FNO1', focusScore: 0.85 }
  ]);
});

// POST /api/pools/add-stock
router.post('/add-stock', (req, res) => {
  // Placeholder: add stock to pool
  res.json({ success: true, message: 'Stock added to pool' });
});

// DELETE /api/pools/remove-stock
router.delete('/remove-stock', (req, res) => {
  // Placeholder: remove stock from pool
  res.json({ success: true, message: 'Stock removed from pool' });
});

// POST /api/weights/update
router.post('/weights/update', (req, res) => {
  // Placeholder: trigger weight recalculation
  res.json({ success: true, message: 'Weights updated' });
});

export default router;

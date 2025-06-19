import express from 'express';
import poolsRouter from './pools';
import portfolioRouter from './portfolio';
import positionsRouter from './positions';
import algorithmsRouter from './algorithms';
import emergencyRouter from './emergency';

const app = express();
app.use(express.json());

app.use('/api/pools', poolsRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/positions', positionsRouter);
app.use('/api/algorithms', algorithmsRouter);
app.use('/api/emergency', emergencyRouter);

export default app;

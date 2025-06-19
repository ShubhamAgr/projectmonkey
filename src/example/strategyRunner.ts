// src/example/strategyRunner.ts

import { WeightedLRUPool } from '../core/weightedLRUPool';
import { AlgorithmManager } from '../core/algorithmManager';
import { GoldenCrossAlgorithm } from '../algorithms/goldenCross';
import { RSIMeanReversionAlgorithm } from '../algorithms/rsiMeanReversion';
import { BreakoutAlgorithm } from '../algorithms/breakout';
import { MomentumScalpingAlgorithm } from '../algorithms/momentumScalping';
import { MarketDataManager } from '../core/marketDataManager';
import { PortfolioManager } from '../core/portfolioManager';
import { PooledStock } from '../models/pooledStock';
import { OHLCV } from '../models/marketData';

// 1. Instantiate managers and algorithms
const pool = new WeightedLRUPool('EQUITY', 10);
const algoManager = new AlgorithmManager();
const marketDataManager = new MarketDataManager();
const portfolioManager = new PortfolioManager();

const algoMap = {
  'Golden Cross': new GoldenCrossAlgorithm(),
  'RSI Mean Reversion': new RSIMeanReversionAlgorithm(),
  'Breakout': new BreakoutAlgorithm(),
  'Momentum Scalping': new MomentumScalpingAlgorithm()
};

// 2. Add mock stocks to the pool
const mockStocks: PooledStock[] = [
  { symbol: 'ABC', addedAt: new Date(), lastAccessed: new Date(), currentWeight: 0.8, focusScore: 0.9, marketData: {} as any },
  { symbol: 'XYZ', addedAt: new Date(), lastAccessed: new Date(), currentWeight: 0.7, focusScore: 0.8, marketData: {} as any }
];
mockStocks.forEach(stock => pool.addStock(stock));

// 3. Mock market data generator
function generateMockOHLCV(length: number, base: number): OHLCV[] {
  const arr: OHLCV[] = [];
  let price = base;
  for (let i = 0; i < length; i++) {
    const open = price;
    const close = open + (Math.random() - 0.5) * 2;
    const high = Math.max(open, close) + Math.random();
    const low = Math.min(open, close) - Math.random();
    const volume = 1000 + Math.floor(Math.random() * 500);
    arr.push({ open, high, low, close, volume, timestamp: new Date(Date.now() - (length - i) * 300000) });
    price = close;
  }
  return arr;
}

// 4. Main runner
async function processPool() {
  for (const stock of pool.getAllStocks()) {
    // Assign algorithm
    const algoMeta = algoManager.assignAlgorithm(stock);
    const algo = algoMap[algoMeta.name];

    // Generate mock OHLCV data
    const ohlcv = generateMockOHLCV(120, 100 + Math.random() * 20);

    // Calculate indicators
    const indicators = marketDataManager.calculateTechnicalIndicators(ohlcv);

    // Entry logic
    let shouldEnter = false;
    if (algo.shouldEnter) {
      shouldEnter = algo.shouldEnter(ohlcv, indicators);
    }

    // Check for open position
    const position = portfolioManager.getCurrentPositions().find(p => p.symbol === stock.symbol);

    if (position) {
      // Exit logic
      let shouldExit = false;
      if (algo.shouldExit) {
        shouldExit = algo.shouldExit(ohlcv, indicators, position.averagePrice);
      }
      if (portfolioManager.checkExitConditions(position) || shouldExit) {
        console.log(`[EXIT] ${stock.symbol} by ${algo.name} at price ${ohlcv[ohlcv.length - 1].close}`);
        portfolioManager.removePosition(stock.symbol);
      }
    } else if (shouldEnter) {
      // Entry logic
      const entryPrice = ohlcv[ohlcv.length - 1].close;
      let stopLoss = entryPrice * 0.95;
      if (algo.getStopLoss) {
        stopLoss = algo.getStopLoss(entryPrice, indicators, ohlcv);
      }
      const portfolioValue = 500000;
      let size = 1;
      if (algo.getPositionSize) {
        size = algo.getPositionSize(portfolioValue, entryPrice);
      }
      console.log(`[ENTRY] ${stock.symbol} by ${algo.name}: size=${size}, entry=${entryPrice.toFixed(2)}, stop=${stopLoss.toFixed(2)}`);
      // Add to portfolio
      portfolioManager.upsertPosition({
        symbol: stock.symbol,
        quantity: size,
        averagePrice: entryPrice,
        currentPrice: entryPrice,
        unrealizedPnL: 0,
        algorithm: algo.name,
        entryTime: new Date(),
        stopLoss
      });
    }
  }
}

// Run the example
processPool();
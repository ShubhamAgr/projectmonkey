import { PooledStock } from '../models/pooledStock';
import { StockPool } from '../models/stockPool';
import { WeightFactors } from '../models/weightFactors';

export class DynamicWeightCalculator {
  calculateCompositeWeight(stock: PooledStock, factors: WeightFactors): number {
    // Composite: 25% volume, 20% momentum, 15% volatility, 15% technical, 15% sentiment, 10% opportunity
    return (
      factors.volume * 0.25 +
      factors.momentum * 0.2 +
      factors.volatility * 0.15 +
      factors.technical * 0.15 +
      factors.sentiment * 0.15 +
      factors.opportunity * 0.1
    );
  }

  updateWeights(pool: StockPool) {
    for (const stock of pool.stocks.values()) {
      // Assume factors are available on stock.marketData or stubbed
      const factors: WeightFactors = stock.marketData?.weightFactors || {
        volume: 1, momentum: 1, volatility: 1, technical: 1, sentiment: 1, opportunity: 1
      };
      const newWeight = this.calculateCompositeWeight(stock, factors);
      stock.currentWeight = this.ewma(stock.currentWeight, newWeight, 0.3); // EWMA smoothing
      pool.weights.set(stock.symbol, stock.currentWeight);
      stock.focusScore = stock.currentWeight; // Update focusScore for now
    }
    pool.lastUpdated = new Date();
  }

  ewma(prev: number, curr: number, alpha: number): number {
    return alpha * curr + (1 - alpha) * prev;
  }

  getTopFocusedStocks(pool: StockPool, count: number): PooledStock[] {
    return Array.from(pool.stocks.values())
      .sort((a, b) => b.focusScore - a.focusScore)
      .slice(0, count);
  }
}

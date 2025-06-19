import { PooledStock } from '../models/pooledStock';
import { StockPool } from '../models/stockPool';

export class WeightedLRUPool implements StockPool {
  poolType: 'EQUITY' | 'FNO';
  maxSize: number;
  stocks: Map<string, PooledStock> = new Map();
  weights: Map<string, number> = new Map();
  lastUpdated: Date = new Date();

  constructor(poolType: 'EQUITY' | 'FNO', maxSize: number) {
    this.poolType = poolType;
    this.maxSize = maxSize;
  }

  addStock(stock: PooledStock) {
    if (this.stocks.size >= this.maxSize) {
      this.evictLeastFocused();
    }
    stock.addedAt = new Date();
    stock.lastAccessed = new Date();
    this.stocks.set(stock.symbol, stock);
    this.weights.set(stock.symbol, stock.currentWeight);
    this.lastUpdated = new Date();
  }

  updateWeight(symbol: string, weight: number) {
    if (this.stocks.has(symbol)) {
      this.weights.set(symbol, weight);
      const stock = this.stocks.get(symbol)!;
      stock.currentWeight = weight;
      stock.lastAccessed = new Date();
      this.stocks.set(symbol, stock);
      this.lastUpdated = new Date();
    }
  }

  getFocusedStocks(count: number): PooledStock[] {
    return Array.from(this.stocks.values())
      .sort((a, b) => b.focusScore - a.focusScore)
      .slice(0, count);
  }

  evictLeastFocused() {
    let minScore = Infinity;
    let minSymbol = '';
    for (const [symbol, stock] of this.stocks.entries()) {
      if (stock.focusScore < minScore) {
        minScore = stock.focusScore;
        minSymbol = symbol;
      }
    }
    if (minSymbol) {
      this.stocks.delete(minSymbol);
      this.weights.delete(minSymbol);
    }
  }

  static calculateFocusScore(stock: PooledStock): number {
    // Focus Score = (Weight * 0.6) + (RecentAccess * 0.3) + (Opportunity * 0.1)
    // For demo, RecentAccess and Opportunity are random or stubbed
    const now = Date.now();
    const recentAccess = 1 - Math.min((now - stock.lastAccessed.getTime()) / (1000 * 60 * 60), 1); // 0-1
    const opportunity = Math.random(); // Replace with real opportunity score
    return stock.currentWeight * 0.6 + recentAccess * 0.3 + opportunity * 0.1;
  }
}

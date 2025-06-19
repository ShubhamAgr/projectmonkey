import { PooledStock } from '../models/pooledStock';
import { TradingAlgorithm, StockCharacteristics } from '../models/tradingAlgorithm';

export class AlgorithmManager {
  private performance: Map<string, { algorithm: string; performance: number[] }> = new Map();
  private algorithms: TradingAlgorithm[] = [];

  constructor(algorithms: TradingAlgorithm[] = []) {
    this.algorithms = algorithms;
  }

  assignAlgorithm(stock: PooledStock): TradingAlgorithm {
    // For demo: assign based on stock characteristics or round-robin
    // Replace with real logic
    if (this.algorithms.length === 0) throw new Error('No algorithms registered');
    const idx = Math.floor(Math.random() * this.algorithms.length);
    return this.algorithms[idx];
  }

  trackPerformance(stock: string, algorithm: string, performance: number): void {
    const key = `${stock}:${algorithm}`;
    if (!this.performance.has(key)) {
      this.performance.set(key, { algorithm, performance: [] });
    }
    this.performance.get(key)!.performance.push(performance);
  }

  optimizeAssignments(): void {
    // Placeholder for dynamic reassignment logic
  }
}

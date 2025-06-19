export interface PooledStock {
  symbol: string;
  addedAt: Date;
  lastAccessed: Date;
  currentWeight: number;
  focusScore: number;
  marketData: any; // Replace with MarketData type when defined
  assignedAlgorithm?: string;
}

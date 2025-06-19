export interface RiskLimits {
  maxPortfolioDrawdown: number;     // 15%
  maxPositionSize: number;          // 5% of portfolio
  maxDailyLoss: number;             // 2% of portfolio
  maxPositionsPerPool: number;      // 10 positions
  correlationLimit: number;         // 0.7 max correlation
} 
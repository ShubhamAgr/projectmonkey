export interface StockCharacteristics {
  volatility: 'LOW' | 'MEDIUM' | 'HIGH';
  volume: 'LOW' | 'MEDIUM' | 'HIGH';
  trend: 'TRENDING' | 'SIDEWAYS' | 'REVERSAL';
  priceRange: 'PENNY' | 'MID' | 'HIGH';
}

export interface TradingAlgorithm {
  name: string;
  type: 'MOMENTUM' | 'MEAN_REVERSION' | 'BREAKOUT' | 'SCALPING';
  parameters: Record<string, any>;
  suitableFor: StockCharacteristics;
  shouldEnter?: (...args: any[]) => boolean;
  shouldExit?: (...args: any[]) => boolean;
  getStopLoss?: (...args: any[]) => number;
  getPositionSize?: (...args: any[]) => number;
}

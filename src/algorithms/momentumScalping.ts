import { TradingAlgorithm } from '../models/tradingAlgorithm';
import { OHLCV, TechnicalIndicators } from '../models/marketData';

export class MomentumScalpingAlgorithm implements TradingAlgorithm {
  name = 'Momentum Scalping';
  type: 'SCALPING' = 'SCALPING';
  parameters = { stopLossPct: 0.02 };
  suitableFor = {
    volatility: 'HIGH' as const,
    volume: 'HIGH' as const,
    trend: 'TRENDING' as const,
    priceRange: 'MID' as const,
  };

  shouldEnter(ohlcv: OHLCV[], indicators: TechnicalIndicators): boolean {
    // Entry: Strong momentum + volume spike
    return indicators['momentum'] > 1.5 && indicators['volume'] > indicators['avg_volume'] * 1.5;
  }

  shouldExit(ohlcv: OHLCV[], indicators: TechnicalIndicators, entryTime?: Date): boolean {
    // Exit: Momentum fades or time-based (5-30 minutes)
    const now = new Date();
    if (entryTime) {
      const minutes = (now.getTime() - entryTime.getTime()) / 60000;
      if (minutes > 30) return true;
    }
    return indicators['momentum'] < 1.0;
  }

  getStopLoss(entryPrice: number): number {
    // Tight 1-2%
    return entryPrice * (1 - this.parameters.stopLossPct);
  }
}

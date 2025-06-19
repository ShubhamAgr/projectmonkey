import { TradingAlgorithm } from '../models/tradingAlgorithm';
import { OHLCV, TechnicalIndicators } from '../models/marketData';

export class RSIMeanReversionAlgorithm implements TradingAlgorithm {
  name = 'RSI Mean Reversion';
  type: 'MEAN_REVERSION' = 'MEAN_REVERSION';
  parameters = { rsiEntry: 30, rsiExit: 70 };
  suitableFor = {
    volatility: 'LOW' as const,
    volume: 'MEDIUM' as const,
    trend: 'SIDEWAYS' as const,
    priceRange: 'MID' as const,
  };

  shouldEnter(ohlcv: OHLCV[], indicators: TechnicalIndicators): boolean {
    // Entry: RSI < 30 with price near support
    return indicators['rsi'] < 30 && !!indicators['price_near_support'];
  }

  shouldExit(ohlcv: OHLCV[], indicators: TechnicalIndicators): boolean {
    // Exit: RSI > 70 or price reaches mean
    return indicators['rsi'] > 70 || !!indicators['price_reaches_mean'];
  }

  getStopLoss(entryPrice: number, indicators: TechnicalIndicators, ohlcv: OHLCV[]): number {
    // Stop Loss: Below recent swing low
    const lows = ohlcv.slice(-10).map(c => c.low);
    return Math.min(...lows);
  }
}

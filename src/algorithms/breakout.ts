import { TradingAlgorithm } from '../models/tradingAlgorithm';
import { OHLCV, TechnicalIndicators } from '../models/marketData';

export class BreakoutAlgorithm implements TradingAlgorithm {
  name = 'Breakout';
  type: 'BREAKOUT' = 'BREAKOUT';
  parameters = { atrMultiplier: 2 };
  suitableFor = {
    volatility: 'HIGH' as const,
    volume: 'HIGH' as const,
    trend: 'TRENDING' as const,
    priceRange: 'MID' as const,
  };

  shouldEnter(ohlcv: OHLCV[], indicators: TechnicalIndicators): boolean {
    // Entry: Price breaks above resistance with volume
    return (
      indicators['price'] > indicators['resistance'] &&
      indicators['volume'] > indicators['avg_volume']
    );
  }

  shouldExit(ohlcv: OHLCV[], indicators: TechnicalIndicators, entryPrice: number): boolean {
    // Exit: Price falls below breakout level
    return indicators['price'] < indicators['resistance'];
  }

  getStopLoss(entryPrice: number, indicators: TechnicalIndicators, ohlcv: OHLCV[]): number {
    // Stop Loss: 2 ATR below entry
    return entryPrice - (2 * (indicators['atr'] || 1));
  }
}

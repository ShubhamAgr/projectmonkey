import { TradingAlgorithm } from '../models/tradingAlgorithm';
import { OHLCV, TechnicalIndicators } from '../models/marketData';

export class GoldenCrossAlgorithm implements TradingAlgorithm {
  name = 'Golden Cross';
  type: 'MOMENTUM' = 'MOMENTUM';
  parameters = { shortMA: 50, longMA: 100 };
  suitableFor = {
    volatility: 'MEDIUM' as const,
    volume: 'MEDIUM' as const,
    trend: 'TRENDING' as const,
    priceRange: 'MID' as const,
  };

  shouldEnter(ohlcv: OHLCV[], indicators: TechnicalIndicators): boolean {
    // Entry: 50 MA crosses above 100 MA with volume confirmation
    return (
      indicators['ma50'] > indicators['ma100'] &&
      indicators['prev_ma50'] <= indicators['prev_ma100'] &&
      indicators['volume'] > indicators['avg_volume']
    );
  }

  shouldExit(ohlcv: OHLCV[], indicators: TechnicalIndicators): boolean {
    // Exit: 50 MA crosses below 100 MA
    return indicators['ma50'] < indicators['ma100'];
  }

  getStopLoss(entryPrice: number, indicators: TechnicalIndicators, ohlcv: OHLCV[]): number {
    // Stop Loss: 15% or below 100 MA support
    return Math.min(entryPrice * 0.85, indicators['ma100'] || entryPrice * 0.85);
  }

  getPositionSize(portfolioValue: number, entryPrice: number): number {
    // Risk-based (2% portfolio risk per trade)
    return Math.floor((portfolioValue * 0.02) / entryPrice);
  }
}

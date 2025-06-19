import dotenv from 'dotenv';
dotenv.config();

export const config = {
  KITE_API_KEY: process.env.KITE_API_KEY || '',
  KITE_API_SECRET: process.env.KITE_API_SECRET || '',
  KITE_ACCESS_TOKEN: process.env.KITE_ACCESS_TOKEN || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || '',
  DEFAULT_CAPITAL: Number(process.env.DEFAULT_CAPITAL) || 500000,
  MAX_POOL_SIZE_EQUITY: Number(process.env.MAX_POOL_SIZE_EQUITY) || 100,
  MAX_POOL_SIZE_FNO: Number(process.env.MAX_POOL_SIZE_FNO) || 50,
  WEIGHT_UPDATE_INTERVAL: Number(process.env.WEIGHT_UPDATE_INTERVAL) || 60000,
  RISK_CHECK_INTERVAL: Number(process.env.RISK_CHECK_INTERVAL) || 30000,
  ENABLE_GOLDEN_CROSS: process.env.ENABLE_GOLDEN_CROSS === 'true',
  ENABLE_RSI_MEAN_REVERSION: process.env.ENABLE_RSI_MEAN_REVERSION === 'true',
  ENABLE_BREAKOUT: process.env.ENABLE_BREAKOUT === 'true',
  ENABLE_MOMENTUM_SCALPING: process.env.ENABLE_MOMENTUM_SCALPING === 'true',
  MAX_PORTFOLIO_DRAWDOWN: Number(process.env.MAX_PORTFOLIO_DRAWDOWN) || 0.15,
  MAX_POSITION_SIZE: Number(process.env.MAX_POSITION_SIZE) || 0.05,
  MAX_DAILY_LOSS: Number(process.env.MAX_DAILY_LOSS) || 0.02,
};

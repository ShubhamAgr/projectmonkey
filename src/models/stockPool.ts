import { PooledStock } from './pooledStock';

export interface StockPool {
  poolType: 'EQUITY' | 'FNO';
  maxSize: number;
  stocks: Map<string, PooledStock>;
  weights: Map<string, number>;
  lastUpdated: Date;
}

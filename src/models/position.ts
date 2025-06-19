export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  algorithm: string;
  entryTime: Date;
  stopLoss?: number;
  target?: number;
}

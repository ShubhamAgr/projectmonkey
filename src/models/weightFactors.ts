export interface WeightFactors {
  volume: number;      // Volume spike vs average (25%)
  momentum: number;    // Price momentum indicator (20%)
  volatility: number;  // Recent volatility measure (15%)
  technical: number;   // Technical indicator score (15%)
  sentiment: number;   // Market sentiment score (15%)
  opportunity: number; // Breakout/opportunity score (10%)
}

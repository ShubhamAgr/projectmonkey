import { Position } from '../models/position';

export class PortfolioManager {
  private positions: Position[] = [];

  getCurrentPositions(): Position[] {
    return this.positions;
  }

  upsertPosition(position: Position) {
    const idx = this.positions.findIndex(p => p.symbol === position.symbol);
    if (idx >= 0) {
      this.positions[idx] = position;
    } else {
      this.positions.push(position);
    }
  }

  removePosition(symbol: string) {
    this.positions = this.positions.filter(p => p.symbol !== symbol);
  }

  checkExitConditions(position: Position): boolean {
    // Placeholder: exit if unrealizedPnL < -0.05 * averagePrice
    return position.unrealizedPnL < -0.05 * position.averagePrice;
  }

  calculatePortfolioRisk(): number {
    // Placeholder: sum of all position risks
    return this.positions.reduce((acc, p) => acc + Math.abs(p.unrealizedPnL), 0);
  }

  rebalanceIfNeeded(): void {
    // Placeholder for rebalancing logic
  }
}

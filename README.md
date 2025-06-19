# Trading AI System

## 🚀 Project Overview
A sophisticated Trading AI System with pool-based stock management, dynamic weight calculation, and multi-strategy execution. The system uses a Weighted LRU Cache for efficient stock selection and supports real-time trading with risk controls and portfolio management.

---

## 🏗️ High-Level Design (HLD)

### Architecture Overview
- **API Layer**: RESTful endpoints using Express.js for pools, portfolio, positions, algorithms, and emergency actions.
- **Core Logic**: Manages pools, weights, algorithm assignment, portfolio, risk, orders, and market data.
- **Algorithms**: Implements strategies like Golden Cross, RSI Mean Reversion, Breakout, and Momentum Scalping.
- **Data Layer**: PostgreSQL (via Prisma) for persistence, Redis for caching.
- **Models**: TypeScript interfaces for all domain entities.

### HLD Diagram
```mermaid
flowchart TD
  subgraph API_Layer
    A1["REST API Endpoints"]
    A2["Express Routers"]
  end
  subgraph Core_Logic
    B1["WeightedLRUPool"]
    B2["DynamicWeightCalculator"]
    B3["AlgorithmManager"]
    B4["PortfolioManager"]
    B5["RiskManager"]
    B6["OrderManager"]
    B7["MarketDataManager"]
  end
  subgraph Algorithms
    C1["GoldenCrossAlgorithm"]
    C2["RSIMeanReversionAlgorithm"]
    C3["BreakoutAlgorithm"]
    C4["MomentumScalpingAlgorithm"]
  end
  subgraph Data_Layer
    D1["PrismaClient_PostgreSQL"]
    D2["RedisClient"]
  end
  subgraph Models
    E1["PooledStock"]
    E2["StockPool"]
    E3["WeightFactors"]
    E4["TradingAlgorithm"]
    E5["Position"]
    E6["RiskLimits"]
    E7["MarketData"]
  end

  A1 --> A2
  A2 --> B1
  A2 --> B2
  A2 --> B3
  A2 --> B4
  A2 --> B5
  A2 --> B6
  A2 --> B7
  B1 --> E1
  B1 --> E2
  B2 --> E3
  B3 --> E4
  B4 --> E5
  B5 --> E6
  B7 --> E7
  B3 --> C1
  B3 --> C2
  B3 --> C3
  B3 --> C4
  B4 --> D1
  B1 --> D2
  B2 --> D2
  B7 --> D2
  B6 --> D1
  B6 --> D2
```

---

## 🧩 Low-Level Design (LLD)

### Key Components
- **WeightedLRUPool**: Manages stock pools with LRU and weight-based eviction.
- **DynamicWeightCalculator**: Calculates composite weights for stocks using multiple factors.
- **AlgorithmManager**: Assigns and tracks trading algorithms per stock.
- **PortfolioManager**: Manages open positions and portfolio metrics.
- **RiskManager**: Enforces risk limits and validates trades.
- **OrderManager**: Handles order placement, tracking, and slippage.
- **MarketDataManager**: Integrates with real-time and historical market data.
- **Algorithms**: Each implements entry/exit/stop logic via a common interface.
- **Database/Cache**: Prisma for PostgreSQL, ioredis for Redis.

### LLD Details
- Each manager is a TypeScript class with clear responsibilities and interfaces.
- Models are defined as TypeScript interfaces for type safety.
- API endpoints are modular and route to the appropriate business logic.
- Algorithms are pluggable and follow a shared interface for easy extension.

---

## 🔄 Flow Diagram
```mermaid
flowchart TD
  User["User/API Client"]
  User -->|"REST Request"| API["Express API Endpoint"]
  API -->|"Route"| Core["Core Logic Layer"]
  Core -->|"Pool/Weight/Algo/Portfolio/Risk/Order"| Manager["Manager (WeightedLRUPool, AlgorithmManager, etc.)"]
  Manager -->|"Reads/Writes"| Models["Models"]
  Manager -->|"Executes"| Algo["Trading Algorithm"]
  Manager -->|"Fetch/Store"| Data["Data Layer"]
  Data -->|"PostgreSQL"| DB["PrismaClient"]
  Data -->|"Redis"| Cache["RedisClient"]
  Manager -->|"Market Data"| Market["MarketDataManager"]
  Market -->|"External API"| Kite["Kite Connect API"]
  Market -->|"WebSocket"| WS["WebSocket"]
  API -->|"Response"| User
```

---

## ⚙️ Setup & Running Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` or create a `.env` file with the required variables.
3. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Build for production:**
   ```bash
   npm run build
   ```
6. **Start the production server:**
   ```bash
   npm start
   ```

---

## 📚 Further Reading
- See code comments and each module for more details.
- Extend algorithms or managers as needed for your trading logic.
- For API documentation, see the `/src/api` folder.

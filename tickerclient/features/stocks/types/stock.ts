export interface StockEntity {
  channel_id: String | Number;
  bid: Number;
  bid_size: Number;
  ask: Number;
  ask_size: Number;
  daily_change: Number;
  daily_change_perc: Number;
  last_price: Number;
  volume: Number;
  high: Number;
  low: Number;
}
export interface StreamData {
  stock: StockEntity;
  userInput: Number | null;
  indecator: "more" | "less" | "equal" | null;
}

export interface SocketEvent {
  event: string;
  data: any;
}

export function isStockEntity(obj: any): obj is StockEntity {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "channel_id" in obj &&
    "bid" in obj &&
    "bid_size" in obj &&
    "ask" in obj &&
    "ask_size" in obj &&
    "daily_change" in obj &&
    "daily_change_perc" in obj &&
    "last_price" in obj &&
    "volume" in obj &&
    "high" in obj &&
    "low" in obj
  );
}

export function isStreamData(obj: any): obj is StreamData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "stock" in obj &&
    isStockEntity(obj.stock) && // Delegate to the isStockEntity type guard
    ("userInput" in obj || obj.userInput === null) &&
    ("indecator" in obj || obj.indecator === null)
  );
}

export function isSocketEvent(obj: any): obj is SocketEvent {
  return (
    typeof obj === "object" && obj !== null && "event" in obj && "data" in obj
  );
}

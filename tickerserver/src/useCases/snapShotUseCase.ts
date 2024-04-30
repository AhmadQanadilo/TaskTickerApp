import { StockEntity } from "../entities/stock";

export class SnapshotProcessor {
  static lastProcessedTime = 0;

  static async saveSnapshotJob(
    stockData: StockEntity,
    stockBuilder: (data: StockEntity) => void
  ) {
    setInterval(async () => {
      try {
        if (typeof stockBuilder !== "function") {
          throw new Error("Ticker builder function is required");
        }

        const latestData = stockData;

        const isInvalid = !latestData;
        const currentTime = Date.now();
        const timeSinceLastProcessed = currentTime - this.lastProcessedTime;

        if (isInvalid) {
          console.log("Received invalid data. Skipping processing.");
          return;
        }

        if (timeSinceLastProcessed >= 30000) {
          const newSnapshot = stockBuilder(latestData);

          this.lastProcessedTime = Date.now();

          console.log("snapshot data saved successfully.");
          return newSnapshot;
        }
      } catch (error) {
        console.error("Error saving ticker data:", error);
      }
    }, 1000); 
  }
}



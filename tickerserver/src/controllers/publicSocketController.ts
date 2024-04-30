import WebSocket from "ws";
import { EventEmitter } from "events"; // Import EventEmitter
import { SnapshotProcessor } from "../useCases/snapShotUseCase";
import { StockBuilder } from "../models/stockDataModel";
import { convertStockListToObject } from "../utils/processStockData";
import { ExternalServerError } from "../errors/ExternalSocketError";

export class PublicSocketController extends EventEmitter {
  private initialized = false;
  private bitfinexWs: WebSocket;

  constructor(bitfinexWs: WebSocket) {
    super(); 
    this.bitfinexWs = bitfinexWs;

    this.init();
  }

  private init() {
    this.bitfinexWs.on("open", () => {
      this.bitfinexWs.send(
        JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          pair: "BTCUSD",
        })
      );
    });

    this.bitfinexWs.on("message", (message) => {
      const messageString = message.toString("utf-8");

      if (!this.initialized) {
        const data = JSON.parse(messageString);
        if (data.event === "subscribed" && data.channel === "ticker") {
          this.initialized = true; 
        }
        return; 
      }

      try {
        const data = JSON.parse(messageString);

        if (Array.isArray(data) && data.length > 1) {
          const stockData = convertStockListToObject(data);
          if (!stockData) return;

          this.emit("stockDataRecived", stockData);

          SnapshotProcessor.saveSnapshotJob(stockData, StockBuilder);
        }
      } catch (error) {
        const err =  new ExternalServerError()

        this.emit("error", err);
      }
    });

    this.bitfinexWs.on("close", () => {
      console.log("Connection closed");
    });

     this.bitfinexWs.on("error", (error) => {
      const err =  new ExternalServerError()
      this.emit("error", err);
    });
  }

  closeWebSocket() {
    this.bitfinexWs.close();
    console.log("bitfinexWs Connection closed");
  }
}

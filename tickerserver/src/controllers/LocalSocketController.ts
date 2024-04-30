import EventEmitter from "events";
import { WebSocket, WebSocketServer } from "ws";
import { InternalSocketError } from "../errors/InternalSockerErrer";

export class LocalSocketController extends EventEmitter {
  private ws: WebSocket;
  private Parentws: WebSocketServer;
  public userInput: Number | null;

  constructor(ws: WebSocket, parentws: WebSocketServer) {
    super(); 
    this.ws = ws;
    this.Parentws = parentws;
    this.userInput = null;
    this.init();
  }

  private init() {
    this.ws.on("error", (error) => {
      const err = new InternalSocketError();
      this.emit("error", err);
    });

    this.ws.on("message", (msg, isBinary) => {
      this.Parentws.clients.forEach((client) => {
        try {
          const eventMsg = JSON.parse(msg.toString());
          const { event, data } = eventMsg;

          if (event === "userInput") {
            this.userInput = data.price;
          }
        } catch (error) {
          const err = new InternalSocketError();
          this.emit("error", err);
        }

        if (client.readyState === WebSocket.OPEN) {
          client.send(msg, { binary: isBinary });
        }
      });
    });

    this.ws.on("close", () => {
      console.log("Connection closed");
      this.emit("localWsClosed", true);
    });
  }

  public sendMessage(message: any): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket connection is not open.");
    }
  }
}

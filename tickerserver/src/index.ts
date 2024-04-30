import { WebSocketServer, WebSocket } from "ws";

import { app } from "./app";
import mongoose from "mongoose";
import { PublicSocketController } from "./controllers/publicSocketController";
import { LocalSocketController } from "./controllers/LocalSocketController";
import { ExternalServerError } from "./errors/ExternalSocketError";
import { InternalSocketError } from "./errors/InternalSockerErrer";
import { StreamDataProcessor } from "./useCases/streamDataUsecase";
import jwt from "jsonwebtoken";

function sockerPreError(err: any) {
  console.log(err);
}

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Admin12345@cluster0.m1vauxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/stock"
    );

    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
};

const s = app.listen(8000, () => {
  console.log("Listening on port 8000!!!!!!!!");
});

start();

const wss = new WebSocketServer({ noServer: true });
var cookies: any = {};

s.on("upgrade", (req, socket, head) => {
  socket.on("error", sockerPreError);

  //perform auth
  const { cookie } = req.headers;
  if (req.headers.cookie) {
    req.headers.cookie.split(";").forEach((cookie) => {
      var parts = cookie.match(/(.*?)=(.*)$/);

      if (!parts) {
        return;
      }
      var name = parts[1].trim();
      var value = (parts[2] || "").trim();
      cookies[name] = value;
    });
  }
  if (!cookies.session  ){
    socket.destroy();
    
  }

  wss.on("connection", (ws, req) => {
    //connect to bitfinex public socket
    const bitfinexWs = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    const BitFinexSocketHandler = new PublicSocketController(bitfinexWs);
    const LocalSocketHandler = new LocalSocketController(ws, wss);

    BitFinexSocketHandler.on("error", (err: ExternalServerError) => {
      LocalSocketHandler.sendMessage({ error: err.serializeErrors() });
    });

    LocalSocketHandler.on("error", (err: InternalSocketError) => {
      LocalSocketHandler.sendMessage({ error: err.serializeErrors() });
    });

    //logic when we recive a message from Bitfinex socket
    BitFinexSocketHandler.on("stockDataRecived", (stockData) => {
      // Forward message to connected clients
      StreamDataProcessor.sendUserStram(
        stockData,
        LocalSocketHandler.userInput,
        (message) => {
          LocalSocketHandler.sendMessage(message);
        }
      );
    });

    LocalSocketHandler.on("localWsClosed", (isClosed) => {
      BitFinexSocketHandler.closeWebSocket();
    });
  });

  wss.handleUpgrade(req, socket, head, (ws) => {
    socket.removeListener("error", sockerPreError);
    wss.emit("connection", ws, req);
  });
});

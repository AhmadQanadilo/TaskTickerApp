import React, { useCallback, useEffect, useState } from "react";
import { StreamData, SocketEvent, ConnectionStatus } from "..";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useErrorNotification from "@/hooks/UseNotification";

const useStockWS = () => {
  const [stram, setstram] = useState<StreamData[] | []>([]);
  const [errors, setErrors] = useState();
  const { notify } = useErrorNotification();

  const url = "ws://localhost:8000/";

  const { sendJsonMessage, readyState } = useWebSocket<StreamData>(url, {
    onMessage(event) {
      const newLS = [JSON.parse(event.data) as StreamData, ...stram];
      setstram(newLS);
    },
    onError(Err) {
      notify("Cant connect to websocket");
    },
    onClose(event) {
      notify("websocket connection closed");
    },
    onOpen() {
      notify("websocket connection started");
    },
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 50,
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000),

    share: true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const sendMessageToWebSocket = useCallback((msg: SocketEvent) => {
    sendJsonMessage(msg);
    if (msg.event === "userInput") {
      notify("Message sent to WebSocket");
    }
  }, []);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessageToWebSocket({
        event: "subscribe",
        data: {
          channel: "stock app",
        },
      });
    }
  }, [readyState, sendMessageToWebSocket]);

  return { stram, sendMessageToWebSocket, sendJsonMessage, connectionStatus };
};

export default useStockWS;

import React from "react";
import { useStockWS } from "..";

const ConnectSocketBtn = () => {
  const { sendJsonMessage } = useStockWS();

  const refreshSocket = () => {
    console.log("Refreshing socket");
    sendJsonMessage({
      data: {
        channel: "stock app",
      },
      event: "refresh",
    });
  };
  return <button onClick={refreshSocket}>ConnectSocketBtn</button>;
};

export default ConnectSocketBtn;

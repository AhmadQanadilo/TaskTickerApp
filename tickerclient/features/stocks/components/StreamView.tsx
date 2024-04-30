import React from "react";
import { StockViewHeader, StreamItem, UserInputForm, useStockWS } from "..";

const StockListView = () => {
  const { stram, connectionStatus } = useStockWS();

  return (
    <div className="flex flex-col h-[48vh]  w-full shadow-md bg-white pb-4 rounded-sm">
      <StockViewHeader />

      {connectionStatus === "Open" ? (
        <div className="flex-grow overflow-y-scroll">
          {stram.map((stock, index) => (
            <StreamItem stream={stock} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center text-xl text-red-800">
          <p>faild to connect to the server please refresh the page</p>
        </div>
      )}
    </div>
  );
};

export default StockListView;

import React from "react";
import { IndecatorIcon, StockEntity, isStockEntity } from "..";
type Props = {
  stock: StockEntity;
  indecator: "more" | "less" | "equal" | null;
};

const StockComponent = ({ stock, indecator }: Props) => {
  if (!isStockEntity(stock)) {
    return;
  }
  return (
    <div className="flex w-auto flex-grow">
      <div className="text-base font-normal text-gray-900 min-w-[14%]">{`${stock.bid}`}</div>
      <div className="text-base font-normal text-gray-900 min-w-[14%]">{`${stock.bid_size}`}</div>
      <div className="text-base font-normal text-gray-900 min-w-[14%]">{`${stock.ask}`}</div>
      <div className="text-base font-normal text-gray-900 min-w-[14%]">{`${stock.ask_size}`}</div>
      <div className="text-base font-normal text-gray-900 min-w-[14%]">{`${stock.low}`}</div>
      <div className="text-base font-normal text-gray-900 min-w-[14%]">{`${stock.high}`}</div>
      {indecator ? (
        <div className="text-base font-normal text-gray-900 min-w-[14%]">
          <IndecatorIcon className="h-full aspect-square " value={indecator} />
        </div>
      ) : (
        <div className="text-base font-normal text-gray-900 min-w-[14%]"></div>
      )}
    </div>
  );
};

export default StockComponent;

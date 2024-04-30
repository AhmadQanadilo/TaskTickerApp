import React from "react";

type Props = {};

const StockViewHeader = (props: Props) => {
  return (
    <div className="w-full flex px-4 py-6 bg-gray-100 over">
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        bid
      </div>
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        bid size
      </div>
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        ask
      </div>
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        ask size
      </div>
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        low
      </div>
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        high
      </div>
      <div className="text-sm uppercase font-semibold text-gray-700 min-w-[14%]">
        arrow
      </div>
    </div>
  );
};

export default StockViewHeader;

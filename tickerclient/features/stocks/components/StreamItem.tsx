import React from "react";
import { StreamData, StockComponent, isStreamData } from "..";

type Props = {
  stream: StreamData;
};

const StreamItem = ({ stream }: Props) => {
  if (!isStreamData(stream)) {
    return;
  }
  return (
    <div className="flex px-4 py-4 w-full items-center shadow-sm border-b border-1 border-blue-200 font-medium ">
      <StockComponent stock={stream.stock} indecator={stream.indecator} />
    </div>
  );
};

export default StreamItem;

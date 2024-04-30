import React from "react";
import { Loader } from "@/components";

function Loading() {
  return (
    <div className="w-screen h-screen fixed bg-gray-200 z-20 top-0 left-0 flex justify-center items-center">
      <Loader />
    </div>
  );
}

export default Loading;

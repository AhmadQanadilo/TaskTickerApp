import React from "react";
import { useForm } from "react-hook-form";
import useStockWS from "../hooks/useStockWS";

type Inputs = {
  price: number;
};

const UserInputForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { sendMessageToWebSocket } = useStockWS();
  const submitFunction = (data: Inputs) => {
    sendMessageToWebSocket({
      data: data,
      event: "userInput",
    });
  };
  return (
    <form className="flex gap-6 w-full" onSubmit={handleSubmit(submitFunction)}>
      <input
        className="flex-grow p-2 border border-gray-300 bg-white rounded"
        {...register("price", {
          required: true,
        })}
      />
      {errors.price && <span>This field is required</span>}

      <button
        className="px-6 py-4 bg-blue-400 font-bold rounded-sm shadow-sm"
        type="submit"
      >
        Compare price
      </button>
    </form>
  );
};

export default UserInputForm;

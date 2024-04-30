"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email: string;
  password: string;
};

type Props = {
  submitFunction: (data: Inputs) => void;
  btnText: string;
  RedirectHandler: () => void;
  redirectText: string;
};

const AuthForm = ({
  submitFunction,
  btnText,
  RedirectHandler,
  redirectText,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();



  return (
    <div className="flex flex-col w-full gap-6">
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={handleSubmit(submitFunction)}
      >
        <input
          className="w-full p-2 border border-gray-300 bg-white"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <span>This field is required</span>}

        <input
          className="w-full p-2 border border-gray-300 bg-white"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <button
          className="px-6 py-4 bg-blue-400 rounded-md font-bold text-lg"
          type="submit"
        >
          {btnText}
        </button>
      </form>{" "}
      <div className="w-full border border-gray-300" />
      <button
        onClick={RedirectHandler}
        className="px-6 py-4  rounded-md font-bold text-lg"
      >
        {redirectText}
      </button>
    </div>
  );
};

export default AuthForm;

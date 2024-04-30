"use client";
import useSignout from "@/features/authentication/hooks/useSignOut";
import React from "react";

type Props = {};

const LogOutBtn = (props: Props) => {
  const { signout } = useSignout();
  return (
    <button
      onClick={signout}
      className="px-6 py-2 bg-blue-400 font-bold rounded-sm shadow-sm"
    >
      Log out
    </button>
  );
};

export default LogOutBtn;

"use client";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

const NavBar = ({ children }: Props) => {
  return (
    <nav className="w-full py-4 bg-white shadow-md flex px-4 justify-between items-center">
      <h3 className="font-bold uppercase">Stock</h3>
      <div>{children}</div>
    </nav>
  );
};

export default NavBar;

"use client";
import React, { useEffect } from "react";
import UseIsAuthenticated from "@/hooks/UseIsAuthenticated";
import { StockListView, UserInputForm } from "@/features/stocks";
import NavBar from "@/layouts/NavBar";
import LogOutBtn from "@/layouts/LogOutBtn";
import useErrorNotification from "@/hooks/UseNotification";

export default function Home() {

  const { checkAuth } = UseIsAuthenticated();
  const { Container } = useErrorNotification();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <main className="flex min-h-screen h-screen flex-col  items-end justify-between ">
      <NavBar>
        <LogOutBtn />
      </NavBar>
      {Container}
      <div className="flex flex-col h-full w-full gap-8 pt-12 px-32">
        <div className="flex flex-col">
          <h1 className="text-3xl uppercase font-bold text-blue-800">
            Welcome to the feature of Stocks
          </h1>
          <h5 className="text-lg capitalize font-medium text-blue-950">
            feel free to explore the market stock and compare it with your ask
            price
          </h5>
        </div>
        <UserInputForm />

        <StockListView />
      </div>
    </main>
  );
}

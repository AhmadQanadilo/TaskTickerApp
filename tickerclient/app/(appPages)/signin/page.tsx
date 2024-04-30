"use client";
import React from "react";
import { AuthForm, useSignIn } from "@/features/authentication";
type Props = {};

const SignInPage = (props: Props) => {
  const { signin, email, password, redirectHandler } = useSignIn();
  return (
    <section className="h-screen flex flex-col justify-center">
      <h1 className="text-3xl uppercase font-bold text-blue-800">
        Sign in please
      </h1>
      <AuthForm
        RedirectHandler={redirectHandler}
        btnText="Sign in"
        submitFunction={signin}
        redirectText="Go to sign Up"
      />
    </section>
  );
};

export default SignInPage;

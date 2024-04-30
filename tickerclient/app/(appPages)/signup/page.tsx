"use client";

import React from "react";
import { AuthForm, useSignUp } from "@/features/authentication";

type Props = {};

const SignUpPage = (props: Props) => {
  const { signup, email, password, redirectHandler } = useSignUp();
  return (
    <section className="h-screen flex flex-col justify-center">
      <h1 className="text-3xl uppercase font-bold text-blue-800">
        Sign up please
      </h1>
      <AuthForm
        RedirectHandler={redirectHandler}
        btnText="Sign up"
        submitFunction={signup}
        redirectText="Go to sign in"
      />
    </section>
  );
};

export default SignUpPage;

import React, { useState } from "react";
import UseRequest from "@/hooks/UseRequest";
import { useRouter } from "next/navigation";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { doRequest, errors } = UseRequest({
    url: "http://localhost:8000/api/users/signin",
    method: "POST",
    onSuccess: () => {
      router.push("/");
    },
  });

  const signin = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setEmail(email);
    setPassword(password);
    await doRequest(data);
  };

  const redirectHandler = () => {
    router.push("/signup");
  };

  return { signin, email, password, redirectHandler };
};

export default useSignIn;

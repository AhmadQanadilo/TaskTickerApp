import { useState } from "react";
import UseRequest from "@/hooks/UseRequest";
import { useRouter } from "next/navigation";

const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { doRequest, errors } = UseRequest({
    url: "http://localhost:8000/api/users/signup",
    method: "POST",
    onSuccess: () => {
      router.push("/");
    },
  });

  const signup = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setEmail(email);
    setPassword(password);
    await doRequest(data);
  };

  const redirectHandler = () => {
    router.push("/signin");
  };

  return { signup, email, password, redirectHandler };
};

export default useSignUp;

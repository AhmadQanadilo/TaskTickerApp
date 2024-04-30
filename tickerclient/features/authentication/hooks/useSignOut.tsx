import UseRequest from "@/hooks/UseRequest";
import { useRouter } from "next/navigation";

const useSignout = () => {
  const router = useRouter();

  const { doRequest, errors } = UseRequest({
    url: "http://localhost:8000/api/users/signout",
    method: "POST",
    onSuccess: () => {
      router.push("/signin");
    },
  });

  const signout = async () => {
    await doRequest();
  };

  return { signout };
};

export default useSignout;

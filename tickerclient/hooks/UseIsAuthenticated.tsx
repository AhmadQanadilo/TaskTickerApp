import UseRequest from "@/hooks/UseRequest";
import { useRouter } from "next/navigation";

const UseIsAuthenticated = () => {
  const router = useRouter();
  const { doRequest } = UseRequest({ url: "/auth/me", method: "GET" });

  const checkAuth = async () => {
    const response = await doRequest();
    const { status } = response;
    if (status != 200) {
      router.push("/signin");
    } else {
      return;
    }
  };
  return { checkAuth };
};

export default UseIsAuthenticated;

import axios, { Method } from "axios";
import { useState } from "react";
import useErrorNotification from "./UseNotification";

interface UseRequestProps {
  url: string;
  method: Method;
  onSuccess?: (data: any) => void;
}

const UseRequest = ({ url, method, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState(null);
  const { notify } = useErrorNotification();

  const doRequest = async (body?: any) => {
    try {
      setErrors(null);
      const response = await axios({
        method: method,
        url: url,
        data: body,

        withCredentials: true,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      console.error(err);
      notify(err.message || "some thing went wrong");
    }
  };

  return { doRequest, errors };
};

export default UseRequest;

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const useErrorNotification = () => {
  const Container = (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
      limit={1}
    />
  );
  const notify = (msg: string) => toast(msg);

  useEffect(() => {
    return () => {
      //this comment to indcate any Clean up for listeners or subscriptions will be here
    };
  }, []);

  return { notify, Container };
};

export default useErrorNotification;

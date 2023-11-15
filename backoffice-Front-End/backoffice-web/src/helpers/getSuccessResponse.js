import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getSuccessResponse = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
}
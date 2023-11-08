import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getErrorResponse = (error, string) => {
  if (error.response.status === 404)
    toast.error(`No hay ${string} registrados`, {
      position: "bottom-right",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  if (error.response.status === 401)
    toast.error('No tienes autorización', {
      position: "bottom-right",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
}
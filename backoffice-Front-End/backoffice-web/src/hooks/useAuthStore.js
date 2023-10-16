import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../api/LoginApi";
import {
  onChecking,
  onLogin,
  clearErrorMessage,
  onLogout,
} from "../redux/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  async function startLogin(username, password) {
    // Cambia estado a chequeando
    dispatch(onChecking());

    try {
      // TRAE USER DE LA API
      const response = await LoginApi.get("user/login", {
        params: {
          username: username,
          password: password,
        },
      });
      // En data se almacena el objeto user traido del back
      const data = response.data;

      if (data) {
        // Si la API devuelve datos, el inicio de sesión fue exitoso
        dispatch(onLogin()); // Actualiza el estado con los datos del usuario
      }
    } catch (error) {
      // Ingresa al catch si el fetch no encuentra datos
      console.log(error.message);
    }
  }

  return {
    // Atributos

    // Metodos
    startLogin,
  };
};

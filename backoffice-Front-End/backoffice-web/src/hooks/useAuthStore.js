import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api";
import {
  onChecking,
  onLogin,
  clearErrorMessage,
  onLogout,
} from "../redux/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  async function startLogin(username, password) {
    // Cambia estado a chequeando
    dispatch(onChecking());

    try {
      // Peticion a API para Login
      const response = await authApi.post('/login', { username, password })
      console.log(response)

      if (response.data) {
        // Si la API devuelve datos, el inicio de sesión fue exitoso
        dispatch(onLogin({ username })); // Actualiza el estado con los datos del usuario
      }
    } catch (error) {
      // Ingresa al catch si el fetch no encuentra datos
      console.log(error);
    }
  }

  return {
    // Atributos
    status,
    user,
    errorMessage,
    // Metodos
    startLogin,
  };
};

import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api";
import { onChecking, onLogin, onLogout } from "../redux/auth/authSlice";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  async function startLogin(username, password) {
    // Cambia estado a chequeando
    dispatch(onChecking());

    try {
      // Peticion a API para Login
      const response = await authApi.post("/login", { username, password });

      if (response.data) {
        // Si la API devuelve datos, el inicio de sesión fue exitoso
        dispatch(onLogin({ username })); // Actualiza el estado con los datos del usuario
      }
    } catch (error) {
      // Ingresa al catch si el fetch no encuentra datos
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
      });
    }
  }

  function startLogout() {
    // Cambia estado a deslogueado
    dispatch(onLogout({ user }));
    // Borrar token
    localStorage.removeItem("token");
  }

  return {
    // Atributos
    status,
    user,
    errorMessage,
    // Metodos
    startLogin,
    startLogout,
  };
};

import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api";
import { onChangeAuthUsername, onChecking, onLogin, onLogout } from "../redux/auth/authSlice";
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
        localStorage.setItem('user', JSON.stringify({ username })) // Guarda en localStorage el usuario autenticado
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
  async function startPassRecovery(email) {
    try {
      // Peticion a API para Login
      const response = await authApi.post("/recover", { email });

    } catch (error) {
      // Ingresa al catch si el fetch no encuentra datos
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "E-mail Incorrecto",
      });
    }
  }

  function startLogout() {
    // Cambia estado a deslogueado
    dispatch(onLogout());
    // Borrar token
    localStorage.clear();
  }

  function checkAuthToken() {
    const token = localStorage.getItem('token') // Busca en localStorage el Token.
    const userAuthenticated = JSON.parse(localStorage.getItem('user')) || '' // Busca en localStorage el usuario autenticado.
    if (token === "undefined" || !userAuthenticated.username) return dispatch(onLogout()) // Si no se encuentra el token, despacha la funcion onLogout para cambiar el estado a 'not-authenticated'.
    dispatch(onLogin(userAuthenticated)) // Si se encuentra el token, despacha la funcion onLogin para cambiar el estado con las credenciales del usuario autenticado.
  }

  function changeAuthUsername(username) {
    dispatch(onChangeAuthUsername(username));

  }

  return {
    // Atributos
    status,
    user,
    errorMessage,
    // Metodos
    startLogin,
    startLogout,
    checkAuthToken,
    changeAuthUsername,
    startPassRecovery

  };
};

import { useForm } from "../hooks";
import logoEmpresa from "../assets/images/logoEmpresa.png";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useAuthStore } from '../hooks/useAuthStore'
import Swal from "sweetalert2";

const loginDTO = {
  username: "",
  password: "",
};

export const LoginComponent = () => {

  const { startLogin } = useAuthStore()

  const { username, password, handleInputChange, clearForm, emptyValidation } =
    useForm(loginDTO);
  const [showPassword, setShowPassword] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!emptyValidation()) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Campos vacios",
      });
    }

    // CAMBIO DE ESTADO Y COMPROBACION DE USUARIO
    startLogin(username, password)

    clearForm();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        href="/"
        className="mt-5 container d-flex align-items-center justify-content-center p-0"
      >
        <img src={logoEmpresa} alt="Logo Finnegans" width="70" height="70" />
        <span className="fs-3 d-none d-sm-inline text-dark fw-bold">
          Finnegans
        </span>
      </div>
      <div
        className="container d-flex flex-column align-item-center justify-content-center bg-primary rounded-4 mt-5"
        style={{ width: "380px", height: "330px" }}
      >
        <div className="container d-flex justify-content-center">
          <span className="fw-bold fs-4 mt-0">LOGIN</span>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="d-flex flex-column align-items-center"
        >
          <div
            className="p-3"
            style={{
              width: "95%",
            }}
          >
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label fw-bold m-0 fs-6"
                style={{ paddingLeft: "6px" }}
              >
                Usuario
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Nombre de usuario"
                onChange={handleInputChange}
                value={username}
                className="form-control p-2"
                style={{
                  height: "35px",
                }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fw-bold m-0 fs-6"
                style={{ paddingLeft: "6px" }}
              >
                Contraseña
              </label>
              <div className="d-flex" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={handleInputChange}
                  value={password}
                  className="form-control p-2"
                  style={{
                    height: "35px",
                  }}
                />
                <div
                  className="d-flex align-items-center"
                  style={{
                    position: "absolute",
                    height: "100%",
                    right: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i>{showPassword ? <BiHide /> : <BiShow />}</i>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-1">
                <span style={{ fontSize: "14px", cursor: "pointer" }}>
                  Recuperar contraseña
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn fw-bold fs-6"
              style={{
                backgroundColor: "white",
                height: "30px",
                padding: "0px 8px",
              }}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

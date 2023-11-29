import React, { useEffect } from "react";
import "../assets/styles/headerStyle.css";
import imageLogoFinnegans from "../assets/images/logoEmpresa.png";
import { useAuthStore } from "../hooks/useAuthStore";
import Swal from "sweetalert2";

function HeaderComponent() {
  const { startLogout } = useAuthStore();
  const { user } = useAuthStore();

  function handleLogout(event) {
    event.preventDefault();

    // Muestra una alerta de confirmación al usuario
    Swal.fire({
      title: '¿Estás seguro que quiere cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Sí, cerrar sesión", entonces llama a startLogout
        startLogout();
      }
    })
  }

  return (
    <nav className="navbar navbar-expand-lg header-shadow gradient-sky">
      <div className="container-fluid logo">
        <div className="d-flex align-items-center">
          <img
            src={imageLogoFinnegans}
            alt="Logo Finnegans"
            width="50"
            height="40"
          />
          <div>
            <p className="fs-3 d-none d-sm-block text-dark fw-bold logo-bussiness-text">
              Finnegans
            </p>
            <p
              className="d-none d-sm-block text-dark fw-normal logo-backoffice-text"
              style={{ letterSpacing: ".3rem" }}
            >
              BACKOFFICE
            </p>
          </div>
        </div>
        <div className="btn-group dropstart align-self-center">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="d-none d-sm-inline mx-2 fw-bold">{user.username}</span>

          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/" onClick={(event) => handleLogout(event)}>
              Cerrar sesion
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;

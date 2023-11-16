import React, { useEffect } from "react";
import "../assets/styles/headerStyle.css";
import imageLogoFinnegans from "../assets/images/logoEmpresa.png";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "../hooks/useAuthStore";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useUsersStore } from "../hooks";

function HeaderComponent() {
  const { startLogout } = useAuthStore();
  const { setActiveUser, users, startLoadingUsers } = useUsersStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if(users.length === 0) startLoadingUsers();
  }, []);

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

  function goToUserProfile(){
    const activeUserAux = users.filter((us)=> us.username === user.username);
    setActiveUser(activeUserAux[0]);
  }

  return (
    <nav className="navbar navbar-expand-lg header-shadow gradient-sky">
      <div className="container-fluid ">
        <img
          className="my-2"
          src={imageLogoFinnegans}
          alt="Logo Finnegans"
          width="50"
          height="40"
        />
        <span className="fs-3 me-3 d-none d-sm-inline text-dark fw-bold">
          Finnegans
        </span>
        <span
          className="d-none d-sm-inline mx-auto text-dark fw-normal fs-6 pt-2"
          style={{ letterSpacing: ".3rem" }}
        >
          BACKOFFICE
        </span>
        <div
          href="/"
          className="mt-4 container d-flex align-items-center justify-content-center p-0"
        />
        <div className="btn-group dropstart align-self-center">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FaUserCircle className="userAccountIcon" />
            <span className="d-none d-sm-inline">{/*user.username*/}</span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/" onClick={(event) => handleLogout(event)}>
              Cerrar sesion
            </a>
            <Link to="/userProfile" className="dropdown-item">
              <span onClick={goToUserProfile}>Perfil de Usuario</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;

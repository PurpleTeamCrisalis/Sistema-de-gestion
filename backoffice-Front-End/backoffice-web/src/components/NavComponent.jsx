import { Link } from "react-router-dom";
import imageLogoFinnegans from "../assets/images/logoEmpresa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../assets/styles/navStyle.css";
import "../assets/styles/tableStyle.css";
import { useAuthStore } from "../hooks/useAuthStore";
import Swal from 'sweetalert2';
import { NavLink } from "react-router-dom";

export function NavComponent() {
  const { user } = useAuthStore()
  const { startLogout } = useAuthStore()

  function handleLogout(event) {
    event.preventDefault();

    // Muestra una alerta de confirmación al usuario
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar la sesión?',
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
    <div className="col-auto me-2 px-0 d-flex flex-column align-items-center align-items-sm-start custom-shadow bg-white"
      style={{ minHeight: "88vh" }}>{/*col-md-3 col-xl-2*/}

      <hr className="mb-5" />
      <NavLink to="/" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faHouse}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Inicio
        </span>
      </NavLink >
      <NavLink to="/user" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faUser}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Usuarios
        </span>
      </NavLink>
      <NavLink to="/client" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faUsers}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Clientes
        </span>
      </NavLink>
      <NavLink to="/order" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faList}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Pedidos
        </span>
      </NavLink>
      <NavLink to="/product" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faBox}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Productos
        </span>
      </NavLink>
      <NavLink to="/service" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faBellConcierge}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Servicios
        </span>
      </NavLink>
      <NavLink to="/charge" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faFileInvoiceDollar}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Cargos
        </span>
      </NavLink>
      <NavLink to="/report" activeclassname="active" className="ps-4 py-2 bg-hover container">
        <FontAwesomeIcon
          icon={faChartBar}
          size="xl"
          style={{ color: "#000000", width: "30px" }}
        />
        <span className="d-none d-sm-inline text-dark fw-normal fs-5 align-middle">
          Informes
        </span>
      </NavLink>
    </div>
  );
}

export default NavComponent;

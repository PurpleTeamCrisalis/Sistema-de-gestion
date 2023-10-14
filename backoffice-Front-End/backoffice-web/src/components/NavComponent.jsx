
import imageLogoFinnegans from '../assets/images/logoEmpresa.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../assets/styles/navStyle.css'

export function NavComponent() {
    return (

        <div className="col-auto col-md-3 col-xl-2 px-0 bg-primary min-vh-100 d-flex flex-column align-items-center align-items-sm-start">
            <div href="/" className="mt-4 container d-flex align-items-center justify-content-center p-0">
                <img src={imageLogoFinnegans} alt="Logo Finnegans" width="70" height="60" />
                <span className="fs-3 d-none d-sm-inline text-dark fw-bold">Finnegans</span>
            </div>
            <span className="d-none d-sm-inline mx-auto text-dark fw-normal fs-5" style={{ letterSpacing: ".3rem" }}>BACKOFFICE</span>
            <hr className="mb-5" />
            <a href="/" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faHouse} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Inicio</span>
            </a>
            <a href="/user" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Usuario</span>
            </a>
            <a href="/client" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faUsers} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Clientes</span>
            </a>
            <a href="/order" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faList} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Pedidos</span>
            </a>
            <a href="/product" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faBox} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Productos</span>
            </a>
            <a href="/service" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faBellConcierge} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Servicios</span>
            </a>
            <a href="/charge" className="mb-3 ps-4 py-2 bg-hover container">
                <FontAwesomeIcon icon={faFileInvoiceDollar} size="xl" style={{ color: "#000000", width: "30px" }} />
                <span className="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Cargos</span>
            </a>
            <div class="btn-group dropup align-self-center">
                <button type="button" class="btn btn-secondary dropdown-toggle " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="d-sm-none"><FontAwesomeIcon icon={faArrowUp} /></span>
                    <span class="d-none d-sm-inline">NombreUsuario</span>
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Cerrar sesion</a>
                </div>
            </div>
        </div>
    );
}

export default NavComponent;



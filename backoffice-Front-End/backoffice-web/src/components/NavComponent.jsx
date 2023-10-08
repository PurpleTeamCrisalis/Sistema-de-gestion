import imageLogoFinnegans from '../assets/images/Logo-Finnegans.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

export function NavComponent() {
    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-0 bg-primary min-vh-100 d-flex flex-column align-items-center align-items-sm-start">
                    <div href="/" class="mt-4 container d-flex align-items-center justify-content-center p-0">
                        <img src={imageLogoFinnegans} alt="Logo Finnegans" width="70" height="70" />
                        <span class="fs-3 d-none d-sm-inline text-dark fw-bold">Finnegans</span>
                    </div>
                    <span class="d-none d-sm-inline mx-auto text-dark fw-normal fs-5" style={{ letterSpacing: ".3rem" }}>BACKOFFICE</span>
                    <hr class="mb-5"/>
                    <hr class="mb-3"/>
                    <a href="/" class="mb-3 ps-4 py-2 bg-hover container">
                        <FontAwesomeIcon icon={faHouse} size="xl" style={{ color: "#000000", width: "30px" }} />
                        <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Inicio</span>
                    </a>
                    <a href="/" class="mb-3 ps-4 py-2 bg-hover container">
                        <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#000000", width: "30px" }} />
                        <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Clientes</span>
                    </a>
                    <a href="/" class="mb-3 ps-4 py-2 bg-hover container">
                        <FontAwesomeIcon icon={faUsers} size="xl" style={{ color: "#000000", width: "30px" }} />
                        <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Clientes</span>
                    </a>
                    <a href="/" class="mb-3 ps-4 py-2 bg-hover container">
                        <FontAwesomeIcon icon={faBox} size="xl" style={{ color: "#000000", width: "30px" }} />
                        <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Productos</span>
                    </a>
                    <a href="/" class="mb-3 ps-4 py-2 bg-hover container">
                        <FontAwesomeIcon icon={faBellConcierge} size="xl" style={{ color: "#000000", width: "30px" }} />
                        <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Servicios</span>
                    </a>
                    <a href="/" class="mb-3 ps-4 py-2 bg-hover container">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="xl" style={{ color: "#000000", width: "30px" }} />
                        <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Cargos</span>
                    </a>

                </div>
            </div>
            <div class="col py-3">
            </div>
        </div>
    );
}

export default NavComponent;



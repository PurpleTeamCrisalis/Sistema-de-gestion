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
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <div href="/" class="mt-4 container d-flex align-items-center justify-content-center p-0">
                            <img src={imageLogoFinnegans} alt="Logo Finnegans" width="70" height="70" />
                            <span class="fs-3 d-none d-sm-inline text-dark fw-bold">Finnegans</span>
                        </div>
                        <span class="d-none d-sm-inline mx-auto text-dark fw-normal fs-5" style={{ letterSpacing: ".3rem" }}>BACKOFFICE</span>
                        <div class="container d-flex flex-column mt-5 pt-5">

                            <a href="/" class="mb-3 bg-hover">
                                <FontAwesomeIcon icon={faHouse} size="xl" style={{ color: "#000000", width: "30px" }} />
                                <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Perfil</span>
                            </a>
                            <a href="/" class="mb-3 bg-hover">
                                <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#000000", width: "30px" }} />
                                <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Clientes</span>
                            </a>
                            <a href="/" class="mb-3 bg-hover">
                                <FontAwesomeIcon icon={faUsers} size="xl" style={{ color: "#000000", width: "30px" }} />
                                <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Clientes</span>
                            </a>
                            <a href="/" class="mb-3 bg-hover">
                                <FontAwesomeIcon icon={faBox} size="xl" style={{ color: "#000000", width: "30px" }} />
                                <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Productos</span>
                            </a>
                            <a href="/" class="mb-3 bg-hover">
                                <FontAwesomeIcon icon={faBellConcierge} size="xl" style={{ color: "#000000", width: "30px" }} />
                                <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Servicios</span>
                            </a>
                            <a href="/" class="mb-3 bg-hover">
                                <FontAwesomeIcon icon={faFileInvoiceDollar} size="xl" style={{ color: "#000000", width: "30px" }} />
                                <span class="ms-3 d-none d-sm-inline text-dark fw-normal fs-5 align-middle">Cargos</span>
                            </a>

                        </div>
                        <hr />
                    </div>
                </div>
                <div class="col py-3">
                </div>
            </div>
        </div>
    );
}

export default NavComponent;



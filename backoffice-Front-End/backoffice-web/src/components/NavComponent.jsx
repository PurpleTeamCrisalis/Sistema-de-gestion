import imageLogoFinnegans from '../assets/images/Logo-Finnegans.png'

export function NavComponent() {
    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <div href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <img src={imageLogoFinnegans} alt="Logo Finnegans" width="60" height="75" />
                            <span class="fs-4 d-none d-sm-inline text-dark">Finnegans</span>
                        </div>
                        <span class="d-none d-sm-inline">BACKOFFICE</span>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li class="nav-item">
                                <a href="#menu" class="nav-link align-middle px-0">
                                    <i class="fs-4 bi-house text-dark"></i> <span class="ms-1 d-none d-sm-inline text-dark">Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#menu" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline text-dark">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="#menu" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline text-dark">Orders</span></a>
                            </li>
                            <li>
                                <a href="#menu" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline text-dark">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="#submenu1" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline text-dark">Customers</span> </a>
                            </li>
                        </ul>
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
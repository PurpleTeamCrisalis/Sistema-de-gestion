import React from 'react'
import logoUser from "../assets/images/iconUser.png";
import '../assets/styles/headerStyle.css'
import imageLogoFinnegans from "../assets/images/logoEmpresa.png";
import { FaUserCircle, FaArrowDown } from 'react-icons/fa'

function HeaderComponent()
{
    return (
        <nav className="navbar navbar-expand-lg withShadow gradient-sky" >
            <div className="container-fluid ">
                <img className="my-2" src={imageLogoFinnegans} alt="Logo Finnegans" width="50" height="40" />
                <span className="fs-3 me-3 d-none d-sm-inline text-dark fw-bold">
                    Finnegans
                </span>
                <span className="d-none d-sm-inline mx-auto text-dark fw-normal fs-6 pt-2" style={{ letterSpacing: ".3rem" }}>
                    BACKOFFICE
                </span>
                <div href="/" className="mt-4 container d-flex align-items-center justify-content-center p-0" />
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
                        <a className="dropdown-item" href="/" onClick={() => { }/*event => handleLogout(event)*/}>
                            Cerrar sesion
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderComponent
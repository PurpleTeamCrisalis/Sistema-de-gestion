import React from 'react'
import HeaderComponent from '../HeaderComponent'
import NavComponent from '../NavComponent'
import { FaFilter } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useServicesDiscountStore } from '../../hooks'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FaFilePdf } from "react-icons/fa6";

function ServiceDiscountComponent() {
    const navigate = useNavigate();
    const { servicesDiscount, activeServiceDiscount } = useServicesDiscountStore();

    function showDetails(item) {
        console.log(item)
    }

    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />

                    <div className='container-fluid mt-4'>
                        {/* Boton back */}
                        <div className='mb-2'>
                            <button
                                type="button"
                                className="btn btn-outline-secondary m-0 pt-0"
                                onClick={() => navigate("/report")}
                            >
                                <IoIosArrowBack style={{ fontSize: '1.7em' }} />
                            </button>
                        </div>

                        {/* Filtro */}
                        <div className="accordion" id="accordion">
                            <div className="accordion-item">
                                {/* Boton de despliegue */}
                                <h2 className="accordion-header d-flex align-items-center">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <FaFilter style={{ fontSize: '1em', marginRight: '0.5em' }} />
                                        Filtros
                                    </button>
                                </h2>
                                {/* Inputs */}
                                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="row">
                                            {/* <div className="col-md-6 mb-3">
                                                <label htmlFor="cliente" className="form-label">Cliente</label>
                                                <input type="text" className="form-control" id="cliente" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="servicio" className="form-label">Servicio</label>
                                                <input type="text" className="form-control" id="servicio" />
                                            </div> */}
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="fechaInicio" className="form-label">Fecha de inicio</label>
                                                <input type="date" className="form-control" id="fechaInicio" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="fechaFin" className="form-label">Fecha de fin</label>
                                                <input type="date" className="form-control" id="fechaFin" />
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end'>
                                            <button type="button" className="btn btn-primary">Buscar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabla */}
                        <section
                            className="rounded-3 shadow"
                        >
                            <table className="table table-color m-0 mt-3">
                                {/* Header de la table */}
                                <thead
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        borderBottom: "2px solid black",
                                    }}
                                >
                                    <tr style={{ textAlign: "center" }}>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Servicio</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Descuento</th>
                                        <th scope="col">#</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        servicesDiscount.map((item) => (
                                            <tr
                                                key={item.id}
                                                style={{ marginBottom: "0px", textAlign: "center" }}
                                            >
                                                <td>
                                                    {
                                                        item.isBusiness ? item.businessName : `${item.clientname} ${item.lastname}`
                                                    }

                                                </td>
                                                <td>
                                                    {
                                                        item.servicename
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.startdate.split("T")[0]
                                                    }
                                                </td>
                                                <td>
                                                    ${
                                                        item.totaldiscount.toFixed(2)
                                                    }
                                                </td>
                                                <td>
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        style={{
                                                            color: "#000000",
                                                            cursor: "pointer",
                                                        }}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#detail-modal"
                                                        onClick={() => showDetails(item)}
                                                    />
                                                </td>
                                                <td>
                                                    {/* Descargar informe */}
                                                    <FaFilePdf
                                                        style={{
                                                            color: "#000000",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => console.log("PDF")}
                                                    />

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceDiscountComponent
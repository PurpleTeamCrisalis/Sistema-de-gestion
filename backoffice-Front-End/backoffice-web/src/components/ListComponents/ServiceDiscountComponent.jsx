import React, { useEffect, useState } from 'react'
import HeaderComponent from '../HeaderComponent'
import NavComponent from '../NavComponent'
import { FaFilter } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useServicesDiscountStore } from '../../hooks'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { ServiceDiscountDetailModal } from '../Modal/ServiceDiscountDetailModal';
import { onSetActiveCharge } from '../../redux';

function ServiceDiscountComponent() {
    const navigate = useNavigate();
    const { servicesDiscount, activeServiceDiscount, startLoadingServicesDiscount, setActiveServicesDiscount } = useServicesDiscountStore();

    const [startDate, setStartDate] = useState("1900-01-01");
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        startLoadingServicesDiscount(startDate, endDate);
    }, [])

    function handleInputStartDate(event) {
        setStartDate(event.target.value)
    }

    function handleInputEndDate(event) {
        setEndDate(event.target.value)
    }

    function handleFilterButton() {
        // Con las fechas ingresadas, ya se puede buscar
        if (checkInputs()) {
            startLoadingServicesDiscount(startDate, endDate);
        }
    }

    function checkInputs() {
        // Verifica si los campos no estan vacios y si el rango es correcto
        const startDateValue = document.getElementById("fechaInicio").value;
        const endDateValue = document.getElementById("fechaFin").value;

        if (!startDateValue || !endDateValue) {
            Toastify({
                text: "Complete los campos",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            console.error("Error: Complete los campos");
            return false
        }

        if (startDateValue > endDateValue) {
            Toastify({
                text: "Rango de fechas erróneo",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            console.error("Error: Rango de fechas erróneo");
            return false
        }
        return true
    }

    function showDetails(item) {
        setActiveServicesDiscount(item)
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
                                className="btn btn-outline-secondary m-0 pt-0 fw-bold fs-5"
                                onClick={() => navigate("/report")}
                            >
                                <IoIosArrowBack style={{ fontSize: '1.7em' }} />
                                Volver
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
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="fechaInicio"
                                                    onChange={handleInputStartDate}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="fechaFin" className="form-label">Fecha de fin</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="fechaFin"
                                                    onChange={handleInputEndDate}
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end'>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleFilterButton}
                                            >
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {servicesDiscount.length === 0 ?
                            (
                                <div className='text-center mt-5'>
                                    <h3>Lista Vacía</h3>
                                    <h4 className='lead'>No hubo pedidos con descuentos en estas fechas</h4>
                                </div>
                            )
                            :
                            (< section className="rounded-3 shadow" style={{maxHeight: "75vh", overflow: "auto"}}>
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
                                            {/* <th scope="col">#</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            servicesDiscount?.filter(item => item.totaldiscount !== 0)
                                            .map((item) => (
                                                <tr
                                                    key={item.id}
                                                    style={{ marginBottom: "0px", textAlign: "center" }}
                                                >
                                                    <td>
                                                        {
                                                            item.isbussiness ? item.bussinessname : `${item.clientname} ${item.lastname}`
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.servicename
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.orderdate.split("T")[0]
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
                                                            data-bs-target="#service-discount-detail-modal"
                                                            onClick={() => showDetails(item)}
                                                        />
                                                    </td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                            )
                        }

                        <ServiceDiscountDetailModal />


                    </div>

                </div>
            </div>
        </div >
    )
}

export default ServiceDiscountComponent
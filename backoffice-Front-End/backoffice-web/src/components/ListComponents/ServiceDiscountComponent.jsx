import React from 'react'
import HeaderComponent from '../HeaderComponent'
import NavComponent from '../NavComponent'
import { FaFilter } from "react-icons/fa";


function ServiceDiscountComponent() {
    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />

                    <div className='container-fluid mt-4'>
                        {/* Filtro */}
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                {/* Boton de despliegue */}
                                <h2 class="accordion-header d-flex align-items-center">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <FaFilter style={{ fontSize: '1em', marginRight: '0.5em' }} />
                                        Filtros
                                    </button>
                                </h2>
                                {/* Inputs */}
                                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body col-sm-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cliente" className="form-label">Cliente</label>
                                                <input type="text" className="form-control" id="cliente" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="servicio" className="form-label">Servicio</label>
                                                <input type="text" className="form-control" id="servicio" />
                                            </div>
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

                        <section
                            className="rounded-3 shadow-lg"
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
                                        <th scope="col">Total</th>
                                        <th scope="col">Descuento</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>

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
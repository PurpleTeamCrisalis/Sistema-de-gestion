import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'

function EditClientCompanyComponent() {
    const navigate = useNavigate();

    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Imputs and Buttons */}
                    <div className="col-md-9 col-xl-10">
                        {/* Inputs */}
                        <section className="container bg-primary rounded-3 mt-5 mb-4" style={{ minHeight: "75vh", width: "90%" }}>
                            <div className="text-center py-4">
                                <h3 className="fs-4">Editar Cliente</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row">
                                {/* Persona/Responsable */}
                                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                                    <h2>Persona/Responsable</h2>
                                    <div className="row m-4">
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">Nombre</h5>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">Apellido</h5>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">D.N.I</h5>
                                            <input type="number" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">Teléfono</h5>
                                            <input type="number" className="form-control" />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <h5 className="form-h5">Dirección</h5>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                </div>
                                {/* Empresa */}
                                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center">
                                    <h2>Empresa</h2>
                                    <div className="row m-4">
                                        <div className="mb-3">
                                            <h5 className="form-h5">Nombre</h5>
                                            <input
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <h5 className="form-h5">CUIT</h5>
                                            <input
                                                type="number"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <h5 className="form-h5">Inicio de Actividades</h5>
                                            <input
                                                type="date"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>


                        {/* Buttons */}
                        <section className="d-flex justify-content-center ">
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={() => console.log("Editar")}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={() => navigate("/client")}
                            >
                                Volver
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditClientCompanyComponent
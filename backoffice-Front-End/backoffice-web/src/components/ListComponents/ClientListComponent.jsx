import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

// navigate("/user/newClient")
// navigate("/user/editClient")

function ClientListComponent() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([])
    const [abierto, setAbierto] = useState(false);

    const abrirModal = () => {
        setAbierto(!abierto);
    };

    function editClient(client) {
        console.log("edit")
    }
    function deleteClient() {
        console.log("delete")
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Table and Buttons */}
                    <div className="col-md-9 col-xl-10  ">
                        {/* Button Section */}
                        <section className='d-flex justify-content-center m-3'>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                data-bs-toggle="modal"
                                data-bs-target="#chooseClientModal"
                                onClick={abrirModal}
                            >
                                Nuevo
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={deleteClient}
                            >
                                Eliminar
                            </button>
                        </section>

                        {/* Table Section */}
                        <section className='d-flex justify-content-center rounded-3 shadow-lg' style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <table className="table table-primary ">
                                <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre Cliente</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Acá se va a recorrer la lista de la entidad */}
                                    <tr className='table-primary'>
                                        <td>
                                            <input type="checkbox" className="custom-checkbox" />
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {/* Icono */}
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                style={{ color: "#000000", }}
                                                onClick={() => {
                                                    navigate("/client/editClientCompany")
                                                    // navigate("/client/editClient")
                                                    // Ternario para verficar si es empresa o no.
                                                }
                                                }
                                            />

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div >

            {/* Modal seleccion tipo de cliente */}
            <div className="modal fade" id="chooseClientModal" tabIndex="-1" aria-labelledby="chooseClientModal" aria-hidden="true">
                <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title fs-5">Agregar cliente</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0">
                            <h5 className='m-3'>Elige el tipo de cliente que desea agregar:</h5>
                            <div className="d-flex justify-content-center gap-4">
                                <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary btn-lg fw-bold"
                                    onClick={() => {
                                        navigate('/client/newClient')

                                    }}
                                >
                                    Persona
                                </button>
                                <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary btn-lg fw-bold"
                                    onClick={() => {
                                        navigate('/client/newCompanyClient')
                                    }}
                                >
                                    Empresa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ClientListComponent;

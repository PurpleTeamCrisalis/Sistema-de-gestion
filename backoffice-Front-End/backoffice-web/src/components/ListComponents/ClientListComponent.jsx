import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useClientsStore } from '../../hooks/useClientsStore'
import Swal from 'sweetalert2'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import EmptyList from '../../utils/EmptyList'


function ClientListComponent() {
    const navigate = useNavigate();
    const [abierto, setAbierto] = useState(false);
    const { clients, startLoadingClient, startDeletingClient, activeClient, setActiveClient } = useClientsStore();

    useEffect(() => {
        if (clients.length == 0) {
            // Parte cuando la lista está vacía
            console.log("Vacio")
        } else {
            startLoadingClient()
        }
    }, []);

    // Modal de nuevo cliente
    const abrirModal = () => {
        setAbierto(!abierto);
    };

    function checkActiveClient(event, client) {

        let checkboxes = document.getElementsByClassName("custom-checkbox");
        let checkbox = event.target;
        let tRow = checkbox.closest("tr");
        for (const item of checkboxes) {
            if (item.id == checkbox.id) {
                if (checkbox.checked) {
                    tRow.classList.add("table-active");
                    setActiveClient(client);
                } else {
                    tRow.classList.remove("table-active");
                    setActiveClient(null);
                }
            } else {
                item.checked = false;
                item.closest("tr").classList.remove("table-active");
            }
        }
    }

    function editClient(client) {
        setActiveClient(client);
        if (client.isbussiness) {
            navigate("/client/editClientCompany");
        } else {
            navigate("/client/editClient");
        }
    }

    function deleteClient() {
        if (activeClient) {
            if (activeClient.enabled === true) {
                if (activeClient.isbussiness) {
                    Swal.fire({
                        title: `¿Seguro que quieres eliminar a ${activeClient.bussinessname} ?`,
                        showCancelButton: true,
                        confirmButtonText: 'confirmar',
                        cancelButtonText: 'cancelar',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            startDeletingClient();
                            Swal.fire('Empresa Eliminado', '', 'success')
                        }
                    });
                } else {
                    Swal.fire({
                        title: `¿Seguro que quieres eliminar a ${activeClient.name} ${activeClient.lastname} ?`,
                        showCancelButton: true,
                        confirmButtonText: 'confirmar',
                        cancelButtonText: 'cancelar',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            startDeletingClient();
                            Swal.fire('Cliente Eliminado', '', 'success')
                        }
                    });
                }
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No puede eliminar un cliente que esté deshabilitado",
                });
            }
        } else {
            Toastify({
                text: "Seleccionar un Cliente para eliminar",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
        }
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
                        {clients.length != 0 &&
                            <section className='d-flex justify-content-center rounded-3 shadow-lg' style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                                <table className="table table-primary ">
                                    <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Tipo de Cliente</th>
                                            <th scope="col">DNI/CUIT</th>
                                            <th scope="col">Estado</th>
                                            <th scope='col'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Acá se va a recorrer la lista de la entidad */}
                                        {clients?.map((client) => (

                                            <tr key={client.id}>
                                                {/* Checkbox */}
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        id={client.id}
                                                        style={{
                                                            color: "#000000",
                                                            cursor: "pointer",
                                                        }}
                                                        onChange={(event) => checkActiveClient(event, client)}
                                                        className="custom-checkbox"
                                                    />
                                                </td>

                                                <td>
                                                    {client.isbussiness ? client.bussinessname : client.name}
                                                </td>

                                                <td>
                                                    {client.isbussiness ? "Empresa" : "Persona"}
                                                </td>

                                                <td>
                                                    {client.isbussiness ? client.cuit : client.dni}
                                                </td>

                                                <td>
                                                    {client.enabled ? "Habilitado" : "Deshabilitado"}
                                                </td>

                                                {/* Editar Cliente */}
                                                <td>
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                        style={{
                                                            color: "#000000",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={(event) => editClient(client)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </section>
                        }
                        {clients.length == 0 && <EmptyList name={"Clientes"} />}
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

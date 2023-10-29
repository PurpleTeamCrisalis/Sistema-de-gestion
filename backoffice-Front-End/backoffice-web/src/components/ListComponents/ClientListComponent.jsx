import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useClientsStore } from '../../hooks/useClientsStore'
import Swal from 'sweetalert2'

function ClientListComponent() {
    const navigate = useNavigate();
    const [abierto, setAbierto] = useState(false);
    // users, startLoadingUsers, setActiveUser, startDeletingUser, activeUser 
    const { clients, startLoadingClient, startDeletingClient, activeClient, setActiveClient } = useClientsStore();

    useEffect(() => {
        if (clients.length === 0) {
            console.log("Sin Clientes")
        } else {
            startLoadingClient();
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

    function editClient(event, client) {
        setActiveClient(client);
        if (client.isBussiness) {
            navigate("/client/editClientCompany");
        } else {
            navigate("/client/editClient");
        }
    }

    function deleteClient() {
        if (activeClient) {
            if (activeClient.enabled === true) {
                Swal.fire({
                    title: `¿Seguro que quieres eliminar a ${activeClient.name} ${activeClient.lastName} ?`,
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
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No puede eliminar un usuario que esté deshabilitado",
                });
            }
        } else {
            Toastify({
                text: "Seleccionar un usuario para eliminar",
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
                                                {client.isBussiness ? client.bussinessName : client.name}
                                            </td>

                                            <td>
                                                {client.isBussiness ? "Empresa" : "Persona"}
                                            </td>

                                            <td>
                                                {client.isBussiness ? client.cuit : client.dni}
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
                                                    onClick={(event) => editClient(event, client)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
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

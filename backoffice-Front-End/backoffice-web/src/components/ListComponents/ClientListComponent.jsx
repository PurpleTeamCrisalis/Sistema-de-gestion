import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import HeaderComponent from '../HeaderComponent';

function ClientListComponent() {
    const [clients, setClients] = useState([])

    // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE Clientes
    useEffect(() => {
        console.log("Fetch de Clientes")
    }, [])

    function newClient() {
        console.log("new")
    }
    function editClient(client) {
        console.log("edit")
    }
    function deleteClient() {
        console.log("delete")
    }

    return (
        <>
            
            <HeaderComponent/>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Table and Buttons */}
                    <div className="col-md-9 col-xl-10  bgGrey">
                        {/* Button Section */}
                        <section className='d-flex justify-content-center m-3'>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={newClient}>Nuevo</button>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={deleteClient}>Eliminar</button>
                        </section>

                        {/* Table Section */}
                        <section className='d-flex justify-content-center rounded-3'  style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <table className="table ">
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
                                    <tr className=''>
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
                                                
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ClientListComponent;

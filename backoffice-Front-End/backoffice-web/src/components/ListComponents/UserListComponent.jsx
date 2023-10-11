import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function UserListComponent() {
    const [users, setUsers] = useState([])

    // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE USUARIOS
    useEffect(() => {
        console.log("Fetch de usuarios")
    }, [])

    function newUser() {
        console.log("new")
    }
    function editUser(user) {
        console.log("edit")
    }
    function deleteUser() {
        console.log("delete")
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Table and Buttons */}
                    <div className="col-md-9 col-xl-10">
                        {/* Button Section */}
                        <section className='d-flex justify-content-center m-3'>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={newUser}>Nuevo</button>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={deleteUser}>Eliminar</button>
                        </section>

                        {/* Table Section */}
                        <section className=' d-flex justify-content-center rounded-3' style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <table className="table table-primary">

                                {/* Header de la table */}
                                <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre Usuario</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* Acá se va a recorrer la lista de la entidad */}
                                    <tr >
                                        <td>
                                            <input type="checkbox" className="custom-checkbox" />
                                        </td>
                                        <td>Name</td>
                                        <td>Status</td>
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

export default UserListComponent;

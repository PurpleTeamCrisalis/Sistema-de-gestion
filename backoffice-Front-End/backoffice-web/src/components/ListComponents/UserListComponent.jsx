import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'

function UserListComponent() {
    const [users, setUsers] = useState([])

    // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE USUARIOS
    useEffect( () => {
        console.log("Fetch de usuarios")
    } ,[])

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
                    <div className="col-md-9 col-xl-10  ">
                        {/* Button Section */}
                        <section className='d-flex justify-content-center m-3'>
                            <h2>Usuarios</h2>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={newUser}>Nuevo</button>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={editUser}>Editar</button>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={deleteUser}>Eliminar</button>
                        </section>

                        {/* Table Section */}
                        <section className='d-flex justify-content-center' style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <table className="table">
                                <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
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
                                        <td></td>
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
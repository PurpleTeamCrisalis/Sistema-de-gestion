import React from 'react'

export function ListComponent() {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <div className="col-md-3 col-lg-3 ">

                    </div>

                    {/* Table and Buttons */}
                    <div className="col-md-9 col-lg-9 ">
                        {/* Button Section */}
                        <section className='d-flex justify-content-center m-3'>
                            <button type="button" className="btn btn-info mx-3 fw-bold">Nuevo</button>
                            <button type="button" className="btn btn-info mx-3 fw-bold">Editar</button>
                            <button type="button" className="btn btn-info mx-3 fw-bold">Eliminar</button>
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
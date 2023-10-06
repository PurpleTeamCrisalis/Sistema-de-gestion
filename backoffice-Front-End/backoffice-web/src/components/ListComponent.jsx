import React from 'react'

function ListComponent() {
    return (
        <>
            {/* Header */}
            <header>
                {/* Header de ejemplo sacado de bootstrap docs */}
                <nav className="navbar bg-info-subtle">
                    <div className="container-fluid">
                        {/* boton de volver */}
                        <h5>Go Back</h5>
                    </div>
                </nav>
            </header>

            {/* Body */}
            <body>
                <div className='container'>
                    <div className="m-4">
                        <div className="row gap-0 ">
                            <div className="col p-0">
                                <button className="btn bg-info-subtle border border-dark fw-bold">
                                    Usuarios
                                </button>
                            </div>
                            <div className="col p-0">
                                <button className="btn bg-info-subtle border border-dark fw-bold">
                                    Clientes
                                </button>
                            </div>
                            <div className="col p-0">
                                <button className="btn bg-info-subtle border border-dark fw-bold">
                                    Productos
                                </button>
                            </div>
                            <div className="col p-0">
                                <button className="btn bg-info-subtle border border-dark fw-bold">
                                    Servicios
                                </button>
                            </div>
                            <div className="col p-0">
                                <button className="btn bg-info-subtle border border-dark fw-bold">
                                    Pedidos
                                </button>
                            </div>
                            <div className="col p-0">
                                <button className="btn bg-info-subtle border border-dark fw-bold">
                                    Impuestos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row m-3">
                    {/* Lista principal (columna izquierda) */}
                    <div className="col-md-9">
                        {/* Contenedor de la Lista */}
                        <div className="container">
                            {/* Tabla */}
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="p-0"></th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Estado</th>
                                        <th className="p-0"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center align-middle p-0">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                            // onClick={() => { console.log("dato") }}
                                            />
                                        </td>
                                        <td>Nombre1</td>
                                        <td>Descripcion1</td>
                                        <td>Estado1</td>
                                        <td className="text-center align-middle p-0">
                                            <button type="button" className="btn btn-info p-1">
                                                Info
                                            </button>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Botones funciones (columna derecha) */}
                    <div className="col-md-3">
                        {/* Boton Agregar  */}
                        <div className="text-center m-3">
                            <button type="button" className="btn btn-primary btn-lg rounded">
                                Nuevo
                            </button>
                        </div>

                        {/* Botón Eliminar */}
                        <div className="text-center m-3">
                            <button type="button" className="btn btn-primary btn-lg rounded">
                                Eliminar
                            </button>
                        </div>

                        {/* Botón Editar */}
                        <div className="text-center m-3">
                            <button type="button" className="btn btn-primary btn-lg rounded">
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </body >
        </>
    )
}

export default ListComponent
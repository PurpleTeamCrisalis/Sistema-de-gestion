import React, { useEffect, useState } from 'react'
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function OrderListComponent() {
    const [orders, setOrders] = useState([])

    // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE Pedidos
    useEffect(() => {
        console.log("Fetch de orders/pedidos")
    }, [])

    function newOrder() {
        console.log("new")
    }
    function editOrder(order) {
        console.log("edit")
    }
    function deleteOrder() {
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
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={newOrder}>Nuevo</button>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={deleteOrder}>Eliminar</button>
                        </section>

                        {/* Table Section */}
                        <section className='d-flex justify-content-center rounded-3'  style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <table className="table table-primary">
                                <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Monto Total</th>
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

export default OrderListComponent;
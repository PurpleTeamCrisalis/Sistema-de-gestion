import React, { useEffect, useState } from 'react'
import HeaderComponent from '../HeaderComponent'
import NavComponent from '../NavComponent'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FaFilePdf } from "react-icons/fa6";
import "toastify-js/src/toastify.css";
import { useOrdersHistoryStore } from '../../hooks/useOrdersHistoryStore';
import '../../assets/styles/tableStyle.css'

function ServiceOrdersHistory() {
    const navigate = useNavigate();
    const { ordersHistory, activeOrdersHistory, startLoadingOrdersHistory } = useOrdersHistoryStore();


    useEffect(() => {
        if (ordersHistory.length === 0) startLoadingOrdersHistory();
    }, [])


    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />

                    <div className='container-fluid mt-4'>
                        {/* Boton back */}
                        <div className='mb-2'>
                            <button
                                type="button"
                                className="btn btn-outline-secondary m-0 pt-0"
                                onClick={() => navigate("/report")}
                            >
                                <IoIosArrowBack style={{ fontSize: '1.7em' }} />
                            </button>
                        </div>

                        {/* Tabla */}
                        <div style={{width: "80vw", overflowX:"auto"}}>
                            <table className="table table-color" style={{width: "100%"}}>
                                <thead
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        borderBottom: "2px solid black",
                                    }}
                                >
                                    <tr style={{ textAlign: "center" }}>
                                        <th>
                                            Cliente
                                        </th>
                                        <th>
                                            Producto/Servicio
                                        </th>
                                        <th>
                                            Nro Pedido
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Estado del Pedido
                                        </th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                        <th>Total Impuestos</th>
                                        <th>Total Descuento</th>
                                        <th>Importe total Pedido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ordersHistory.map((item) => (
                                            <tr
                                                key={item.ticket_id}
                                                style={{ marginBottom: "0px", textAlign: "center" }}
                                            >
                                                <td>
                                                    {
                                                        item.is_business ? item.business_name : `${item.client_name} ${item.client_lastname}`
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.product_service_name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.order_id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.order_date.split("T")[0]
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.order_state
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.product_service_quantity
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.base_price
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.sub_total
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.taxes_total_price
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.total_discount
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.total_price
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceOrdersHistory
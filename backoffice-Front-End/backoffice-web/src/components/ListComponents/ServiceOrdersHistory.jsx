import React, { useEffect, useState } from 'react'
import HeaderComponent from '../HeaderComponent'
import NavComponent from '../NavComponent'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import "toastify-js/src/toastify.css";
import { useOrdersHistoryStore } from '../../hooks/useOrdersHistoryStore';
import '../../assets/styles/tableStyle.css'
import SearchBar from "../Utils/SearchBar";

function ServiceOrdersHistory() {
    const navigate = useNavigate();
    const { ordersHistory, activeOrdersHistory, startLoadingOrdersHistory } = useOrdersHistoryStore();

    // const [filteredList, setFilteredList] = useState(ordersHistory);

    useEffect(() => {
        startLoadingOrdersHistory();
    }, [])

    let StateForGroupBy = {
        lastClient: null,
        lastService: null,
        newService: null,
        color: "background-color: white"
    }

    function getName(item) {
        let name = "";
        if (item.is_business)
            name = item.bussiness_name;
        else
            name = item.client_name + " " + item.client_lastname;
        return name
    }

    function initGroupBy(item) {
        let clientName = "";
        let newClient = getName(item);
        if (newClient !== StateForGroupBy.lastClient) {
            StateForGroupBy.lastClient = newClient;
            clientName = newClient;
            StateForGroupBy.newService = item.product_service_name;
            StateForGroupBy.lastService = item.product_service_name;
        }
        else if (StateForGroupBy.lastService !== item.product_service_name) {
            StateForGroupBy.newService = item.product_service_name;
            StateForGroupBy.lastService = item.product_service_name;
        }
        else
            StateForGroupBy.newService = "";
        return clientName;
    }

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
                        {/* <SearchBar
                            rawList={ordersHistory}
                            setFilteredList={setFilteredList}
                            compareTag={"username"}
                        /> */}
                        {ordersHistory.length === 0 ?
                            (
                                <div className='text-center mt-5'>
                                    <h3>Lista Vacía</h3>
                                    <h4 className='lead'>No hay pedidos en el historial.</h4>
                                </div>
                            )
                            :
                            (<section className="rounded-3 shadow" style={{ maxHeight: "75vh", maxWidth: "80vw", overflowY: "auto" }}>
                                <table className="table table-color m-0 mt-3" style={{ tableLayout: "fixed", width: "100%" }}>
                                    {/* Header de la tabla */}
                                    <colgroup>
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        <col style={{ width: "200px" }} />
                                        {/* <col style={{ width: "200px" }} /> */}
                                    </colgroup>
                                    <thead
                                        style={{
                                            position: "sticky",
                                            top: 0,
                                            borderBottom: "2px solid black",
                                        }}
                                    >
                                        <tr style={{ textAlign: "center" }}>
                                            <th scope="col" style={{ width: "200px" }}>Cliente</th>
                                            <th scope="col" style={{ width: "200px" }}>Producto/Servicio</th>
                                            <th scope="col" style={{ width: "200px" }}>Nro Pedido</th>
                                            <th scope="col" style={{ width: "200px" }}>Fecha</th>
                                            <th scope="col" style={{ width: "200px" }}>Estado del Pedido</th>
                                            <th scope="col" style={{ width: "200px" }}>Cantidad</th>
                                            <th scope="col" style={{ width: "200px" }}>Precio unitario</th>
                                            <th scope="col" style={{ width: "200px" }}>Subtotal</th>
                                            <th scope="col" style={{ width: "200px" }}>Total Impuestos</th>
                                            <th scope="col" style={{ width: "200px" }}>Total Descuento</th>
                                            <th scope="col" style={{ width: "200px" }}>Importe total Pedido</th>
                                            {/* <th scope="col" style={{ width: "200px" }}>#</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ordersHistory?.map((item) => (
                                                <tr
                                                    key={item.ticket_id}
                                                    style={{ marginBottom: "0px", textAlign: "center" }}
                                                >
                                                    <td style={{ width: "200px" }}>
                                                        {initGroupBy(item)}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        {StateForGroupBy.newService}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        {item.order_id}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        {item.order_date.split("T")[0]}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        {item.order_state}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        {item.product_service_quantity}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        ${item.base_price}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        ${item.sub_total}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        ${typeof item.taxes_total_price === 'number' ? item.taxes_total_price.toFixed(2) : 0}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        ${typeof item.total_discount === 'number' ? item.total_discount.toFixed(2) : 0}
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        ${typeof item.total_price === 'number' ? item.total_price.toFixed(2) : 0}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceOrdersHistory
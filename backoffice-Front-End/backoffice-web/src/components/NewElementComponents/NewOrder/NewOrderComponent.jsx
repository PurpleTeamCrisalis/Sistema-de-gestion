import {React, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollModalComponent } from "../../ScrollModalComponent/ScrollModalComponent.jsx"
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/AddRemoveButtonsStyle.css"
import { useNewOrderStore } from "../../../hooks";
import { useOrdersStore } from "../../../hooks";
import HeaderComponent from "../../HeaderComponent.jsx";
import NavComponent from "../../NavComponent.jsx";
import { FaPenToSquare } from 'react-icons/fa6';
import "../../../assets/styles/NewOrderStyle.css";
import { Order, Client, Service, Product } from "./Item.js";

export const NewOrderComponent = () =>
{
    const { addClient, newOrder } = useNewOrderStore();

    //const { orders, startLoadingOrders, setActiveOrder, /*startDeletingUser,*/ activeUser } = useOrdersStore();
    var client = new Client("1", "Ivan");
    var product = new Product(0, 0, 25, "Producto25", "Descripcion25", 250);
    var service = new Service(17, "Servicio17", "Descripcion17", 170);
    var anOrder = new Order(client);
    
    //const [order, setOrder] = useState();
    //setOrder(anOrder);
    //const newOrder = { ...order, client, products: [product], services: [service] };

    
   // order.products.push(product);
    //order.services.push(service);

    function selectClient()
    {
        addClient(new Client(1, "Laura Gonzales"));
        /*const updatedClient = new Client(1, "Laura Gonzales");
        const updatedOrder = { ...newOrder, client: updatedClient };
        setOrder(updatedOrder);*/
    }

    function addItem()
    {
    }

    function deleteItems()
    {
        alert("Eliminar items");
    }

    function checkActive(event, item)
    {

        let checkboxes = document.getElementsByClassName("custom-checkbox");
        let checkbox = event.target;
        let tRow = checkbox.closest("tr");
        for (const item of checkboxes)
        {
            if (item.id == checkbox.id)
            {
                if (checkbox.checked)
                {
                    tRow.classList.add("table-active");
                    setActiveUser(user);
                } else
                {
                    tRow.classList.remove("table-active");
                    setActiveUser(null);
                }
            } else
            {
                item.checked = false;
                item.closest("tr").classList.remove("table-active");
            }
        }
    }

    return (
        <>
            <HeaderComponent />
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />
                    <div className="col-md-3 col-xl-10 bgGrey">
                        {/* Add & Remove */}
                        <div>
                            <section className="container shadow p-0 mt-3" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                                <div className="bg-white rounded-3 overflow-hidden d-flex align-items-center" >
                                    <button type="button" className="btn fw-bold btn-lg " onClick={selectClient} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <FaPenToSquare className='penIcon' />
                                    </button>
                                    <div className='clientName'>{newOrder.client.name}</div>
                                    <div className='d-flex justify-content-center m-3 gap-2 ms-auto'>
                                        <button type="button" className="btn fw-bold btn-lg bgAdd circle iconButton" onClick={addItem} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            <FontAwesomeIcon className="gradientWhite" icon={faCirclePlus} color="white" />
                                        </button>
                                        <button type="button" className="btn fw-bold btn-lg bgRemove circle iconButton" onClick={deleteItems}>
                                            <FontAwesomeIcon className="gradientWhite" icon={faTrash} color="white" />
                                        </button>
                                        <ScrollModalComponent list={newOrder.products} />
                                    </div>
                                </div>
                            </section>
                            <section className="container p-0 mt-3" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                                <div className="bg-white rounded-3 overflow-hidden d-flex align-items-center" >
                                    <table className="table table-hover" style={{ minWidth: '100%' }}>
                                        {/* Header de la table */}
                                        <thead
                                            style={{
                                                position: "sticky",
                                                top: 0,
                                                borderBottom: "2px solid black",
                                            }}
                                        >
                                            <tr>
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">Item</th>
                                                <th className="text-center" scope="col">Detalle</th>
                                                <th className="text-center" scope="col">Cantidad</th>
                                                <th className="text-center" scope="col">Precio Unitario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newOrder.products.map((product) => (
                                                <tr key={product.id} style={{ marginBottom: '0px' }}> {/* ¿ Para que usan key ?*/}
                                                    <td>
                                                        <input type="checkbox" id={product.id} className="custom-checkbox"
                                                            onChange={(event) => checkActiveOrder(event, newOrder)} style={{ color: "#000000", cursor: "pointer", }} />
                                                    </td>
                                                    <td>{newOrder.client.id}</td>
                                                    <td>{product.description}</td>
                                                    <td></td>
                                                    <td>{product.basePrice}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

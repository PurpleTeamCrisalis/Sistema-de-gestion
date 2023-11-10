import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useOrdersStore } from "../../hooks";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/AddRemoveButtonsStyle.css";
import { DetailModal } from "../Modal/DetailModal";
import EmptyList from "../../utils/EmptyList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const orderState = {
  Pendiente: "grey",
  Pagado: "#198754",
  Cancelada: "red",
};

function OrderListComponent() {
  const navigate = useNavigate();
  const { orders, startLoadingOrders, setActiveOrder, startLoadingOrderById } =
    useOrdersStore();

  useEffect(() => {
    if (orders.length === 0) startLoadingOrders();
  }, []);

  function checkActiveOrder(event, user) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveOrder(user);
        } else {
          tRow.classList.remove("table-active");
          setActiveOrder(null);
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }
  function showDetails(order) {
    startLoadingOrderById(order.id);
  }
  function newOrder() {
    navigate("/order/newOrder");
  }

  return (
    <div className="bgGrey">
      <ToastContainer />
      <HeaderComponent />
      <div className="container-fluid mainContainer">
        <div className="secondContainer">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="tablePane">
            {/* Button Section */}
            {/*<section className='d-flex justify-content-center m-3 gap-2'>
                <button type="button" className="btn fw-bold btn-lg bgAdd circle iconButton" onClick={()=>{}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <FontAwesomeIcon className="gradientWhite" icon={faCirclePlus} color="white"/>
                </button>
                {/*<button type="button" className="btn fw-bold btn-lg bgRemove circle iconButton" onClick={deleteUser}>
                  <FontAwesomeIcon className="gradientWhite" icon={faTrash} color="white"/>
        </button>}
                <ScrollModalComponent list={orders}/>
            </section>*/}

            <section className="d-flex justify-content-center m-3 gap-2">
              <button
                type="button"
                className="btn fw-bold btn-lg bgAdd circle iconButton"
                onClick={newOrder}
              >
                <FontAwesomeIcon
                  className="gradientWhite"
                  icon={faCirclePlus}
                  color="white"
                />
              </button>
            </section>

            {/* Table Section */}
            {orders.length === 0 ? (
              <EmptyList name={"Ordenes"} />
            ) : (
              <section
                className="d-flex justify-content-center rounded-3 custom-shadow tabla-container-color"
                style={{ maxHeight: "85vh", overflowY: "auto" }}
              >
                <table className="table table-color">
                  {/* Header de la table */}
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      borderBottom: "2px solid black",
                    }}
                  >
                    <tr style={{ textAlign: "center" }}>
                      <th scope="col">#</th>
                      <th scope="col">N°</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Total</th>
                      <th scope="col">Descuento</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Estado</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr
                        key={order.id}
                        style={{ marginBottom: "0px", textAlign: "center" }}
                      >
                        <td>
                          <input
                            type="checkbox"
                            id={order.id}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onChange={(event) => checkActiveOrder(event, order)}
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{order.id}</td>
                        <td>
                          {order.client.isbussiness
                            ? order.client.bussinessname
                            : `${order.client.name} ${order.client.lastname}`}
                        </td>
                        <td>${order.total}</td>
                        <td
                          style={{
                            color: "#198754",
                          }}
                        >
                          {order.discount ? `($${order.discount})` : "---"}
                        </td>
                        <td>{order.date}</td>
                        <td style={{ color: orderState[order.state] }}>
                          {order.state ? order.state : "Pendiente"}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#detail-modal"
                            onClick={() => showDetails(order)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <DetailModal />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderListComponent;

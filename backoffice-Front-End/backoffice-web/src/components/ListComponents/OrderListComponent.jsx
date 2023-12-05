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
  PENDIENT_TO_PAY: "#617474",
  ORDER_DELIVERED: "#198754",
  ORDER_CANCELLED: "#a32525",
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
                style={{ maxHeight: "80vh", overflowY: "auto" }}
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
                        <td>${order.total.toFixed(2)}</td>
                        <td
                          style={{
                            color: "#198754",
                          }}
                        >
                          {order.totalDiscount
                            ? `($${order.totalDiscount.toFixed(2)})`
                            : "---"}
                        </td>
                        <td>{order.date.split("T")[0]}</td>
                        {/* <td style={{ color: orderState[order.state] }}>
                          {order.state ? order.state : "Pendiente"}
                        </td> */}
                        <td
                          style={{
                            color: orderState[order.order_state]
                          }}
                        >
                          {order.order_state}
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

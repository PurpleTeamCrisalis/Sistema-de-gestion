import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientModal, ProductServiceModal } from "../Modal";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/AddRemoveButtonsStyle.css";
import { useNewOrderStore } from "../../hooks";
import { useOrdersStore } from "../../hooks";
import HeaderComponent from "../HeaderComponent.jsx";
import NavComponent from "../NavComponent.jsx";
import { FaPenToSquare } from "react-icons/fa6";
import "../../assets/styles/NewOrderStyle.css";

export const NewOrderComponent = () => {
  const { newOrder, setActiveDetail, deleteDetail } = useNewOrderStore();
  const { startAddingOrder } = useOrdersStore();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    setOrderDetails([...newOrder.products, ...newOrder.services]);
  }, [newOrder.products, newOrder.services]);

  function createOrder() {

  }
  function checkActiveDetail(event, detail) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveDetail(detail)
        } else {
          tRow.classList.remove("table-active");
        }
      } else {
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
              <section
                className="container shadow p-0 mt-3"
                style={{ maxHeight: "85vh", overflowY: "auto" }}
              >
                <div className="bg-white rounded-3 overflow-hidden d-flex align-items-center">
                  <button
                    type="button"
                    className="btn fw-bold btn-lg "
                    data-bs-toggle="modal"
                    data-bs-target="#client-modal"
                  >
                    <FaPenToSquare className="penIcon" />
                  </button>
                  <ClientModal />
                  <div className="clientName">
                    {
                      Object.keys(newOrder.client).length === 0
                      ? ""
                      : (newOrder.client.isBussiness)
                        ? newOrder.client.bussinessName
                        : `${newOrder.client.name} ${newOrder.client.lastName}`
                    }
                  </div>
                  <div className="d-flex justify-content-center m-3 gap-2 ms-auto">
                    <button
                      type="button"
                      className="btn fw-bold btn-lg bgAdd circle iconButton"
                      data-bs-toggle="modal"
                      data-bs-target="#product-service-modal"
                    >
                      <FontAwesomeIcon
                        className="gradientWhite"
                        icon={faCirclePlus}
                        color="white"
                      />
                    </button>
                    <button
                      type="button"
                      className="btn fw-bold btn-lg bgRemove circle iconButton"
                      onClick={deleteDetail}
                    >
                      <FontAwesomeIcon
                        className="gradientWhite"
                        icon={faTrash}
                        color="white"
                      />
                    </button>
                    <ProductServiceModal />
                  </div>
                </div>
              </section>
              <section
                className="container p-0 mt-3"
                style={{ maxHeight: "85vh", overflowY: "auto" }}
              >
                <div className="bg-white rounded-3 overflow-hidden d-flex align-items-center">
                  <table
                    className="table table-hover"
                    style={{ minWidth: "100%" }}
                  >
                    {/* Header de la table */}
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        borderBottom: "2px solid black",
                      }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.map((item) => (
                        <tr key={item.id} style={{ marginBottom: "0px" }}>
                          {" "}
                          {/* ¿ Para que usan key ?*/}
                          <td>
                            <input
                              type="checkbox"
                              id={item.id}
                              className="custom-checkbox"
                              onChange={(event) =>
                                checkActiveDetail(event, item)
                              }
                              style={{ color: "#000000", cursor: "pointer" }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>${item.basePrice}</td>
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
  );
};

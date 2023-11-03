import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientModal, ProductModal } from "../Modal";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/AddRemoveButtonsStyle.css";
import { useNewOrderStore } from "../../hooks";
import { useOrdersStore } from "../../hooks";
import HeaderComponent from "../HeaderComponent.jsx";
import NavComponent from "../NavComponent.jsx";
import { FaPenToSquare } from "react-icons/fa6";
import "../../assets/styles/NewOrderStyle.css";
import { SelectModal } from "../Modal/SelectModal";
import { ServiceModal } from "../Modal/ServiceModal";
import { createOrderRequest } from "../../helpers/createOrderRequest";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";

export const NewOrderComponent = () => {
  const {
    newOrder,
    setActiveDetail,
    pullActiveDetail,
    deleteDetail,
    updateQuantity,
    cleanNewOrder,
  } = useNewOrderStore();
  const { startAddingOrder } = useOrdersStore();
  const navigate = useNavigate()

  function createOrder() {
    if (!newOrder.client.id) {
      Toastify({
        text: "No hay ningún cliente seleccionado",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: No hay ningín cliente seleccionado");
    }
    if (!newOrder.products.length && !newOrder.services.length) {
      Toastify({
        text: "No hay ningún producto o servicio seleccionado",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error(
        "Error: No hay ningún producto o servicio seleccionado"
      );
    }
    const orderRequest = createOrderRequest(newOrder);
    startAddingOrder(orderRequest);
    handleCleanNewOrder();
    Toastify({
      text: "Orden creada exitosamente!",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    navigate("/order")
  }

  function checkActiveDetail(event, detail) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveDetail(detail);
        } else {
          tRow.classList.remove("table-active");
          pullActiveDetail();
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  function handleQuantity(detail, event) {
    updateQuantity({ detail, quantity: Number(event.target.value) });
  }

  function handleCleanNewOrder() {
    cleanNewOrder();
  }

  return (
    <div className="bgGrey">
      <HeaderComponent />
      <div className="container-fluid mainContainer">
        <div className="secondContainer">
          {/* Navbar */}
          <NavComponent />
          <div className="tablePane ps-4 pe-3 mt-2">
            {/* Add & Remove */}
              <section
                className="container mt-3 rounded-3  custom-shadow tabla-container-color"
                style={{ overflowY: "auto" }}
              >
                <div className="bg-white rounded-3 overflow-hidden d-flex align-items-center">
                  <button
                    type="button"
                    className="btn fw-bold btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#client-modal"
                  >
                    <FaPenToSquare className="penIcon" />
                  </button>
                  <ClientModal />
                  <div className="clientName">
                    {Object.keys(newOrder.client).length === 0
                      ? "Seleccioná Cliente"
                      : newOrder.client.isbussiness
                      ? newOrder.client.bussinessname
                      : `${newOrder.client.name} ${newOrder.client.lastname}`}
                  </div>

                  <div style={{ marginLeft: "auto" }}>
                    <button
                      className="btn btn-primary bgAdd text-white"
                      onClick={() => {
                        createOrder();
                      }}
                    >
                      Completar Orden
                    </button>
                    <button
                      className="btn btn-primary bgRemoveLight"
                      style={{ marginLeft: "1rem" }}
                      onClick={handleCleanNewOrder}
                    >
                      Limpiar Campos
                    </button>
                  </div>

                  <div className="d-flex justify-content-center m-3 gap-2 ms-auto">
                    <button
                      type="button"
                      className="btn fw-bold btn-lg bgAdd circle iconButton"
                      data-bs-toggle="modal"
                      data-bs-target="#select-modal"
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
                    <SelectModal />
                    <ProductModal />
                    <ServiceModal />
                  </div>
                </div>
              </section>
              <section
                className="container p-0 mt-3"
                style={{ overflowY: "auto" }}
              >
                <h2 className="fs-5 mt-4">Productos</h2>
                <div className="bg-white rounded-3 overflow-hidden d-flex align-items-center container mt-2 rounded-3  custom-shadow tabla-container-color">
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
                      {newOrder?.products.map((detail) => (
                        <tr key={detail.id} style={{ marginBottom: "0px" }}>
                          <td>
                            <input
                              type="checkbox"
                              id={detail.id}
                              className="custom-checkbox"
                              onChange={(event) =>
                                checkActiveDetail(event, detail)
                              }
                              style={{ color: "#000000", cursor: "pointer" }}
                            />
                          </td>
                          <td>{detail.name}</td>
                          <td>{detail.description}</td>
                          <td>
                            <input
                              type="number"
                              onChange={(event) =>
                                handleQuantity(detail, event)
                              }
                              value={detail.quantity}
                            />
                          </td>
                          <td>${detail.basePrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h2 className="fs-5 mt-5">Servicios</h2>
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
                        <th scope="col">Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newOrder?.services.map((detail) => (
                        <tr key={detail.id} style={{ marginBottom: "0px" }}>
                          <td>
                            <input
                              type="checkbox"
                              id={detail.id}
                              className="custom-checkbox"
                              onChange={(event) =>
                                checkActiveDetail(event, detail)
                              }
                              style={{ color: "#000000", cursor: "pointer" }}
                            />
                          </td>
                          <td>{detail.name}</td>
                          <td>{detail.description}</td>
                          <td>${detail.basePrice}</td>
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
  );
};

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
import { DetailOrderTable } from "../DetailOrderTable";
import { SelectModal } from "../Modal/SelectModal";
import { ServiceModal } from "../Modal/ServiceModal";
import { createOrderRequest } from "../../helpers/createOrderRequest";

export const NewOrderComponent = () => {
  const {
    newOrder,
    setActiveDetail,
    pullActiveDetail,
    deleteDetail,
    updateQuantity,
  } = useNewOrderStore();
  const { startAddingOrder } = useOrdersStore();

  function createOrder() {
    const orderRequest = createOrderRequest(newOrder)
    console.log(orderRequest)
    alert('Orden creada')
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
                    {Object.keys(newOrder.client).length === 0
                      ? ""
                      : newOrder.client.isBussiness
                      ? newOrder.client.businessName
                      : `${newOrder.client.name} ${newOrder.client.lastName}`}
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
                style={{ maxHeight: "85vh", overflowY: "auto" }}
              >
                <h1 className="fs-5">Productos</h1>
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
                      {newOrder?.products.map((detail) => (
                        <DetailOrderTable
                          detail={detail}
                          key={detail.id}
                          checkActiveDetail={checkActiveDetail}
                          updateQuantity={updateQuantity}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <h1 className="fs-5">Servicios</h1>
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
                      {newOrder?.services.map((detail) => (
                        <DetailOrderTable
                          detail={detail}
                          key={detail.id}
                          checkActiveDetail={checkActiveDetail}
                          updateQuantity={updateQuantity}
                        />
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

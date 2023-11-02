import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientModal, ProductModal, ServiceModal } from "../Modal";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/AddRemoveButtonsStyle.css";
import { useNewOrderStore } from "../../hooks";
import { useOrdersStore } from "../../hooks";
import HeaderComponent from "../HeaderComponent.jsx";
import NavComponent from "../NavComponent.jsx";
import { FaPenToSquare } from "react-icons/fa6";
import "../../assets/styles/NewOrderStyle.css";
import { useDispatch } from "react-redux";

export const NewOrderComponent = () =>
{
  const { newOrder, setActiveDetail, deleteDetail, updateProductQuantity } = useNewOrderStore();
  const { startAddingOrder } = useOrdersStore();
  const [productDetails, setProductDetails] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() =>
  {
    setProductDetails([...newOrder.products]);
    setServiceDetails([...newOrder.services]);
  }, [newOrder.products, newOrder.services]);


  function createOrder()
  {
    startAddingOrder(newOrder);
  }

  function checkActiveDetail(event, detail)
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
          setActiveDetail(detail)
        } else
        {
          tRow.classList.remove("table-active");
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
                  <div style={{marginLeft: "auto"}}>
                    <button className="btn btn-primary bgAdd text-white" onClick={()=>{createOrder()}}>
                      Completar Orden
                    </button>
                    <button className="btn btn-primary bgRemoveLight" style={{marginLeft: "1rem"}}>
                      Limpiar Campos
                    </button>
                  </div>
                  <div className="d-flex justify-content-center m-3 gap-2 ms-auto">

                    
                    <button type="button"
                      className="btn fw-bold btn-lg bgAdd circle iconButton"
                      data-bs-toggle="modal"
                      data-bs-target="#select-product-or-service-modal"
                    >
                      <FontAwesomeIcon className="gradientWhite" icon={faCirclePlus} color="white" />
                    </button>
                    <div className="modal fade" id="select-product-or-service-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog ">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">

                          <button
                              type="button"
                              className="btn btn-primary "
                              data-bs-toggle="modal"
                              data-bs-target="#product-modal"
                              data-bs-dismiss="modal"
                            >
                              Productos
                            </button>

                            <button
                              type="button"
                              className="btn btn-primary "
                              data-bs-toggle="modal"
                              data-bs-target="#service-modal"
                              data-bs-dismiss="modal"
                            >
                              Servicios
                            </button>
                          </div>
                          <div className="modal-footer"></div>
                        </div>
                      </div>
                    </div>
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
                    <ProductModal />
                    <ServiceModal />
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
                        borderBottom: "2px solid black"
                      }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetails?.map((product) => (
                        <tr key={product.id} style={{ marginBottom: "0px" }}>
                          {" "}
                          {/* ¿ Para que usan key ?*/}
                          <td>
                            <input
                              type="checkbox"
                              id={product.id}
                              className="custom-checkbox"
                              onChange={(event) =>
                                checkActiveDetail(event, product)
                              }
                              style={{ color: "#000000", cursor: "pointer" }}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td><input onChange={(event) => { updateProductQuantity(event.target.value, product) }} type="number" ></input></td>
                          <td>${product.basePrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                        <th scope="col">Servicio</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceDetails?.map((service) => (
                        <tr key={service.id} style={{ marginBottom: "0px" }}>
                          {" "}
                          {/* ¿ Para que usan key ?*/}
                          <td>
                            <input
                              type="checkbox"
                              id={service.id}
                              className="custom-checkbox"
                              onChange={(event) =>
                                checkActiveDetail(event, service)
                              }
                              style={{ color: "#000000", cursor: "pointer" }}
                            />
                          </td>
                          <td>{service.name}</td>
                          <td>{service.description}</td>
                          <td>${service.basePrice}</td>
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

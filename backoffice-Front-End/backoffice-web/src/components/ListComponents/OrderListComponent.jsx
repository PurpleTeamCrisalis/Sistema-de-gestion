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

function OrderListComponent() {
  const navigate = useNavigate();
  const {
    orders,
    startLoadingOrders,
    setActiveOrder,
    /*startDeletingUser,*/ activeUser,
  } = useOrdersStore();

  useEffect(() => {
    startLoadingOrders();
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
  function showDetails(event, order) {
    alert("Mostrar modal con protuctos y sercicios");
    /*
    setActiveOrder(order);
    navigate("/user/editOrder");*/
  }
  function newOrder() {
    navigate("/order/newOrder");
  }

  return (
    <>
      <HeaderComponent />
      <div className="container-fluid">
        <div className="row">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="col-md-3 col-xl-10 bgGrey">
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
            <section
              className="container shadow-lg p-0"
              style={{ maxHeight: "85vh", overflowY: "auto" }}
            >
              <div className="bg-white rounded-3 overflow-hidden">
                <table className="table table-hover">
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
                      <th scope="col">Cliente</th>
                      <th scope="col">Total</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order.id} style={{ marginBottom: "0px" }}>
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
                        <td>
                          {order.client.isBussiness
                            ? order.client.bussinessName
                            : `${order.client.name} ${order.client.lastName}`}
                        </td>
                        <td>${order.total}</td>
                        <td>{order.date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onClick={(event) => showDetails(event, order)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderListComponent;

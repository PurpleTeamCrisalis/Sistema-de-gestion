import React, { useEffect } from "react";
import { useClientsStore, useOrdersStore } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import '../../assets/styles/modalStyle.css'

const orderState = {
  PENDIENT_TO_PAY: "#617474",
  ORDER_DELIVERED: "#198754",
  ORDER_CANCELLED: "#a32525",
};

export const ClientOrdersAndSubscriptionsModal = () => {
  const {
    clientSubscriptions,
    activeClient,
    startUpdatingClient
  } = useClientsStore();
  const { clientOrders, deleteClientOrders } =
    useOrdersStore();

  function disableSubscription(subId, serviceName) {
    Swal.fire({
      title: `¿Seguro que quieres deshabilitar la subscripción a ${serviceName} ?`,
      showCancelButton: true,
      confirmButtonText: "confirmar",
      cancelButtonText: "cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const clientAux = {
          id: activeClient?.id,
          name: activeClient?.name,
          lastname: activeClient?.lastname,
          dni: parseInt(activeClient?.dni),
          phone: parseInt(activeClient?.phone),
          adress: activeClient?.adress,
          isbussiness: activeClient?.isbussiness,
          bussinessname: activeClient?.bussinessname,
          enabled: activeClient?.enabled,
          startdate: activeClient?.startdate,
          cuit: parseInt(activeClient?.cuit),
          subscriptionId: subId,
        };
        startUpdatingClient(clientAux);
        Swal.fire("Subscripción deshabilitada", "", "success");
      }
    });
  }

  return (
    <div
      className="modal fade"
      id="client-orders-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ height: "90vh" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Historial Cliente
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                deleteClientOrders;
              }}
            ></button>
          </div>

          <div className="modal-body modal-dialog-scrollable">
            <h2 className="fs-5">Pedidos</h2>
            <div
              className="bg-white rounded-3 overflow-auto"
              style={{ height: "40%" }}
            >
              <table className="table table-hover">
                {/* Header de la table */}
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    borderBottom: "2px solid black",
                  }}
                >
                  <tr style={{ textAlign: "center" }}>
                    <th scope="col">N°</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {clientOrders.map((order) => (
                    <tr key={order.id} style={{ textAlign: "center" }}>
                      <td>{order.id}</td>
                      <td>{order.date.split("T")[0]}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td
                        style={{
                          color: orderState[order.order_state]
                        }}
                      >
                        {order.order_state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="fs-5 mt-4">Subscripciones activas</h2>
            <div
              className="bg-white rounded-3 overflow-auto"
              style={{ height: "40%" }}
            >
              <table className="table table-hover">
                {/* Header de la table */}
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    borderBottom: "2px solid black",
                  }}
                >
                  <tr style={{ textAlign: "center" }}>
                    <th scope="col">Servicio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {activeClient?.subscriptionsByServices
                    .map((subscription) => (
                      <tr key={subscription.id} style={{ textAlign: "center" }}>
                        <td className="align-center">{subscription.serviceName}</td>
                        <td 
                        className="align-center"
                        style={{
                          color: subscription.enabled ? "#198754" : "red",
                        }}
                        >
                          {(subscription.enabled)? "Habilitado" : "Deshabilitado"}
                          </td>
                        <td className="align-center"><button className="button-62" onClick={() => disableSubscription(subscription.id,
                          subscription.serviceName)}>Deshabilitar</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

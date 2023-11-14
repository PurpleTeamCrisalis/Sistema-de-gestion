import React, { useEffect } from "react";
import { useClientsStore, useOrdersStore } from "../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Tooltip } from 'react-tooltip'


export const ClientOrdersAndSubscriptionsModal = () => {
  const { clientSubscriptions, deleteClientSubscriptions, startUpdatingClient, activeClient, setActiveClient } = useClientsStore();
  const { clientOrders, startLoadingOrderById, deleteClientOrders } = useOrdersStore();

  function showDetails(order) {
    startLoadingOrderById(order.id);
  }

  function disableSubscription(subId, serviceName) {
    Swal.fire({
      title: `¿Seguro que quieres cancelar la subscripción a ${serviceName} ?`,
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
          subscriptionId: subId
        };
        startUpdatingClient(clientAux);
        deleteClientOrders;
        deleteClientSubscriptions;
        const modal = bootstrap.Modal.getOrCreateInstance('#client-orders-modal');
        modal.hide();
        Swal.fire("Subscripción cancelada", "", "success");
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
      <div className="modal-dialog">
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
              onClick={() => { deleteClientOrders; deleteClientSubscriptions }}
            ></button>
          </div>

          <div className="modal-body modal-dialog-scrollable">
            <h2 className="fs-5">Pedidos</h2>
            <div className="bg-white rounded-3 overflow-auto" style={{ height: "40%" }}>
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
                    <th scope="col">N°</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Total</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {clientOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        {order.id}
                      </td>
                      <td>
                        {order.date}
                      </td>
                      <td>
                        ${order.total}
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
            </div>
            <h2 className="fs-5 mt-4">Subscripciones activas</h2>
            <div className="bg-white rounded-3 overflow-auto" style={{ height: "40%" }}>
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
                    <th scope="col">Servicio</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {clientSubscriptions.filter((subs) => subs.enabled === true).map((subscription) => (
                    <tr key={subscription.id}>
                      <td>
                        {subscription.serviceName}
                      </td>
                      <td>
                        <Tooltip id="my-tooltip" />
                        <FontAwesomeIcon
                          icon={faXmark}
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Cancelar Subscripción"
                          data-tooltip-place="top"
                          style={{
                            color: "#000000",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            disableSubscription(subscription.id, subscription.serviceName);
                          }}
                        />
                      </td>
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

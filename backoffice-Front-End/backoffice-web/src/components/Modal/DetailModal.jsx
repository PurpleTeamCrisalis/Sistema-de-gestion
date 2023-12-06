import React, { useEffect } from "react";
import { useOrdersStore } from "../../hooks";
import Swal from "sweetalert2";

export const DetailModal = () => {
  const { selectedOrder, pullSelectedOrder, startCancelingOrder, startPayingOrder } =
    useOrdersStore();

  const cancelOrder = (id) => {
    Swal.fire({
      title: `¿Seguro que quieres cancelar la orden N°${id}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        startCancelingOrder(id);
        Swal.fire("Orden cancelada", "", "success");
      }
    });
  };

  const payOrder = (id) => {
    Swal.fire({
      title: `¿Marcar orden N°${id} como Pagada?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        startPayingOrder(id);
        Swal.fire("Orden pagada", "", "success");
      }
    });
  };

  return (
    <div
      className="modal fade"
      id="detail-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {`Detalle Orden N°${selectedOrder?.id}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={pullSelectedOrder}
            ></button>
          </div>
          <div className="modal-body modal-dialog-scrollable" style={{ maxHeight: '50vh', overflow: "auto" }}>
            <div className="bg-white rounded-3">
              {selectedOrder?.products.length ? (
                <div>
                  <h1 className="fs-6">Productos</h1>
                  <table className="table table-hover">
                    {/* Header de la table */}
                    <thead
                      style={{
                        top: 0,
                        borderBottom: "2px solid black",
                      }}
                    >
                      <tr style={{ textAlign: "center" }}>
                        <th scope="col" width="10%">
                          Nombre
                        </th>
                        <th scope="col" width="5%">
                          Cantidad
                        </th>
                        <th scope="col" width="15%">
                          Precio Unitario
                        </th>
                        <th scope="col" width="12%">
                          Subtotal A/I
                        </th>
                        <th scope="col" width="10%">
                          Impuestos
                        </th>
                        <th scope="col" width="10%">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.products.map((product) => (
                        <tr key={product.id} style={{ textAlign: "center" }}>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>${product.basePrice.toFixed(2)}</td>
                          <td>
                            ${(product.quantity * product.basePrice).toFixed(2)}
                          </td>
                          <td>{product.taxesApplied}</td>
                          <td>${product.subTotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
              {selectedOrder?.services.length ? (
                <div>
                  <h1 className="fs-6">Servicios</h1>
                  <table className="table table-hover">
                    {/* Header de la table */}
                    <thead
                      style={{
                        top: 0,
                        borderBottom: "2px solid black",
                      }}
                    >
                      <tr style={{ textAlign: "center" }}>
                        <th scope="col" width="10%">
                          Nombre
                        </th>
                        <th scope="col" width="24%">
                          Precio Unitario
                        </th>
                        <th scope="col" width="12%">
                          Subtotal A/I
                        </th>
                        <th scope="col" width="10%">
                          Impuestos
                        </th>
                        <th scope="col" width="10%">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.services.map((service) => (
                        <tr key={service.id} style={{ textAlign: "center" }}>
                          <td>{service.name}</td>
                          <td>${service.basePrice.toFixed(2)}</td>
                          <td>${service.basePrice.toFixed(2)}</td>
                          <td>{service.taxesApplied}</td>
                          <td>${service.subTotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
              {selectedOrder?.taxes.length ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h1 className="fs-6">Impuestos</h1>
                  <table
                    className="table table-hover"
                    style={{ width: "23rem" }}
                  >
                    {/* Header de la table */}
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        borderBottom: "2px solid black",
                      }}
                    >
                      <tr style={{ textAlign: "center" }}>
                        <th scope="col" width="30%">
                          Nombre
                        </th>
                        <th scope="col">
                          Porcentaje
                        </th>
                        <th scope="col" width="40%">
                          Importe
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.taxes.map((tax) => (
                        <tr key={tax.id} style={{ textAlign: "center" }}>
                          <td>{tax.tax.name}</td>
                          <td>{tax.tax.percentage.toFixed(2)}%</td>
                          <td>${tax.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className="modal-footer"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              className="btn btn-danger"
              // data-bs-dismiss="modal"
              onClick={() => cancelOrder(selectedOrder.id)} // Llamar a la funcion para que cambie el estado de la orden a cancelado.
            >
              Cancelar orden
            </button>
            <button
              type="button"
              className="btn btn-primary"
              // data-bs-dismiss="modal"
              onClick={() => {
                payOrder(selectedOrder.id);
              }} // Llamar a la funcion para que cambie el estado de la orden a pagado.
            >
              Pagar orden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

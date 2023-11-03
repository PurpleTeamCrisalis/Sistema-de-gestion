import React, { useEffect } from "react";
import { useOrdersStore } from "../../hooks";

export const DetailModal = () => {
  const { selectedOrder } = useOrdersStore();
  console.log(selectedOrder);
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
      <div className="modal-dialog">
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
            ></button>
          </div>
          <div className="modal-body modal-dialog-scrollable">
            <div className="bg-white rounded-3 overflow-hidden">
              {selectedOrder?.products.length ? (
                <div>
                  <h1 className="fs-6">Productos</h1>
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
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>{product.basePrice}</td>
                          <td>{product.subTotal}</td>
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
                        position: "sticky",
                        top: 0,
                        borderBottom: "2px solid black",
                      }}
                    >
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio Unitario</th>
                        {/* <th scope="col">Subtotal</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.services.map((service) => (
                        <tr key={service.id}>
                          <td>{service.name}</td>
                          <td>{service.basePrice}</td>
                          {/* <td>{service.subTotal}</td> */}
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
